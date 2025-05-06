import {getCreationBlock} from '@leverj/lever.common'
import {InMemoryCompoundKeyStore} from '@leverj/lever.storage'
import exitHook from 'async-exit-hook'
import {Contract} from 'ethers'
import {List, Map} from 'immutable'
import {merge} from 'lodash-es'
import {ContractTracker} from './ContractTracker.js'

/**
 * a MultiContractTracker connects to multiple contracts deployed in an Ethereum-like chain and tracks their respective events
 */
export class MultiContractTracker {
  static async of(config, chainId, provider, store, onEvent = console.log) {
    if (!store.has(chainId)) await store.update(chainId, {
      marker: {block: 0, logIndex: -1, blockWasProcessed: false},
      abis: [],
      contracts: [],
      toOnboard: [],
    })
    return new this(config, chainId, provider, store, onEvent, store.get(chainId))
  }

  constructor(config, chainId, provider, store, onEvent, data) {
    this.config = config
    this.logger = config.logger ?? console
    this.chainId = chainId
    this.provider = provider
    this.store = store
    this.onEvent = onEvent
    this.contracts = {}
    this.interfaces = {}
    this.topicsByKind = {}
    this.topics = [[]]
    this.isRunning = false
    const {marker, toOnboard, abis, contracts} = data
    this.marker = marker
    this.toOnboard = toOnboard
    const ifaces = Map(abis).toObject()
    Map(contracts).forEach(
      (kind, address) => this._addContract_(new Contract(address, ifaces[kind], provider), kind)
    )
    exitHook(() => this.stop())
  }
  get lastBlock() { return this.marker.block }
  get polling() { return this.config.polling }

  async update(state) { await this.store.update(this.chainId, state) }
  async updateMarker(state) { await this.update({marker: merge(this.marker, state)}) }

  _addContract_(contract, kind) {
    const {runner: {provider}, target: address, interface: iface} = contract
    if (provider !== this.provider) throw Error(`contract @ ${address} has incompatible provider`)
    if (!this.contracts[address]) this.contracts[address] = kind
    if (!this.interfaces[kind]) this.interfaces[kind] = iface
    if (!this.topicsByKind[kind]) {
      const topics = iface.fragments.filter(_ => _.type === 'event').map(_ => _.topicHash)
      this.topicsByKind[kind] = topics
      this.topics = [Array.from(new Set(this.topics[0].concat(topics)))]
    }
  }

  async addContract(contract, kind) {
    this._addContract_(contract, kind)
    return this.isRunning ?
      this.onboard(contract, await getCreationBlock(this.provider, contract.target, 100)) :
      this.scheduleToOnboard(contract.target, kind)
  }

  scheduleToOnboard(address, kind) {
    this.toOnboard.push({address, kind})
    this.update({toOnboard: this.toOnboard})
  }

  async onboard(contract, creationBlock) {
    const {chainId, polling, onEvent, logger, lastBlock} = this
    const tracker = await ContractTracker.of({logger, polling}, chainId, contract, creationBlock, new InMemoryCompoundKeyStore(), onEvent)
    await tracker.processLogs(creationBlock, lastBlock)
    this.update({
      contracts: Map(this.contracts).toArray(),
      abis: Map(this.interfaces).map(_ => _.format()).toArray(),
    })
  }

  async start() {
    if (this.isRunning) return

    this.logger.log(`starting tracker [${this.chainId}]`)
    while (this.toOnboard.length > 0)  {
      const {address, kind} = this.toOnboard.shift()
      const contract = new Contract(address, this.interfaces[kind], this.provider)
      await this.onboard(contract, await getCreationBlock(this.provider, contract.target, 100))
    }
    this.isRunning = true
    await this.store.open()
    await this.pollForEvents()
  }

  async stop() {
    if (!this.isRunning) return

    this.logger.log(`stopping tracker [${this.chainId}]`)
    this.isRunning = false
    if (this.pollingTimer) clearTimeout(this.pollingTimer)
    await this.store.close()
  }

  async fail(e) {
    this.logger.error(e, e.cause ?? '')
    await this.stop()
  }

  async pollForEvents(retries = 1) {
    //fixme: consider using p-retry: https://github.com/sindresorhus/p-retry
    try {
      await this.poll()
    } catch (e) {
      if (retries === 1) this.logger.error(`tracker [${this.chainId}] failed during polling for events`, e, e.cause ?? '')
      return retries === this.polling.retries ? this.fail(e) : this.pollForEvents(retries + 1)
    }
    if (this.isRunning) this.pollingTimer = setTimeout(_ => this.pollForEvents(_), this.polling.interval)
  }

  async poll() {
    const fromBlock = this.lastBlock + (this.marker.blockWasProcessed ? 1 : 0)
    const toBlock = await this.provider.getBlockNumber()
    if (fromBlock <= toBlock) await this.processLogs(fromBlock, toBlock)
  }

  async processLogs(fromBlock, toBlock) {
    const logs = await this.getLogsFor(fromBlock, toBlock, this.topics)
    const {block, logIndex, blockWasProcessed} = this.marker
    const logsPerBlock = List(logs).
      groupBy(_ => _.blockNumber).
      filter((_, key) => key >= fromBlock).
      map((value, key) => key === block && !blockWasProcessed ? value.filter(_ => _.logIndex > logIndex) : value).
      map((value, _) => value.sortBy(_ => _.logIndex).toArray()).
      toKeyedSeq()
    for (let [block, blockLogs] of logsPerBlock) await this.onNewBlock(block, blockLogs)
    if (this.lastBlock < toBlock) await this.updateMarker({block: toBlock, blockWasProcessed: true})
  }

  async getLogsFor(fromBlock, toBlock, topics) {
    const filter = {fromBlock, toBlock, topics}
    try {
      return await this.provider.getLogs(filter).then(_ => _.filter(_ => !_.removed))
    } catch (e) {
      if (fromBlock === toBlock) return this.getSingleBlockLogsFallback(fromBlock)
      else {
        this.logger.info(`splitting blocks to read logs from:${fromBlock} to:${toBlock}`, e?.error?.message)
        const midway = fromBlock + Math.floor((toBlock - fromBlock) / 2)
        await this.processLogs(fromBlock, midway)
        await this.processLogs(midway + 1, toBlock)
      }
    }
  }

  async getSingleBlockLogsFallback(block) {
    this.logger.info(`falling back on getting logs per each contract at block ${block}`)
    const logs = []
    for (let [address, kind] of Object.entries(this.interfaces)) logs.push(
      await this.getLogsForContract(block, block, [this.topicsByKind[kind]], address)
    )
    return logs
  }

  async getLogsForContract(fromBlock, toBlock, topics, address) {
    return this.provider.getLogs({fromBlock, toBlock, address, topics}).then(_ => _.filter(_ => !_.removed))
  }

  async onNewBlock(block, logs) {
    await this.updateMarker(block > this.lastBlock ? {block, logIndex: -1, blockWasProcessed: false} : {blockWasProcessed: false})
    for (let each of logs) if (this.contracts[each.address]) {
      const event = this.toEvent(each)
      await this.onEvent(event)
      await this.updateMarker({logIndex: each.logIndex})
    }
    await this.updateMarker({blockWasProcessed: true})
  }

  toEvent(log) {
    const {address} = log
    const kind = this.contracts[address]
    const {name, args} = this.interfaces[kind].parseLog(log)
    return {address, name, args}
  }
}

