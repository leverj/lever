import {getCreationBlock} from '@leverj/lever.common'
import exitHook from 'async-exit-hook'
import {List} from 'immutable'
import {merge} from 'lodash-es'

/**
 * a ContractTracker connects to a contract deployed in an Ethereum-like chain and tracks its events
 */
export class ContractTracker {
  static async of(config, chainId, contract, creationBlock = 0, store, onEvent = console.log) {
    const throttle = 100 //fixme: temporary; creationBlock must be supplied
    const block = creationBlock || await getCreationBlock(contract.runner.provider, contract.target, throttle)
    await store.update([chainId, contract.target], {
      marker: {block, logIndex: -1, blockWasProcessed: false}
    })
    return new this(config, chainId, contract, store, onEvent)
  }

  constructor(config, chainId, contract, store, onEvent) {
    this.config = config
    this.logger = config.logger || console
    this.chainId = chainId
    this.contract = contract
    this.topics = [contract.interface.fragments.filter(_ => _.type === 'event').map(_ => _.topicHash)]
    this.store = store
    this.onEvent = onEvent
    this.isRunning = false
    exitHook(() => this.stop())
  }
  get key() { return [this.chainId, this.address] }
  get address() { return this.contract.target }
  get provider() { return this.contract.runner.provider }
  get interface() { return this.contract.interface }
  get marker() { return this.store.get(this.key).marker }
  get lastBlock() { return this.marker.block }
  get polling() { return this.config.polling }

  update(state) { this.store.update(this.key, state) }
  updateMarker(state) { this.update({marker: merge(this.marker, state)}) }

  async start() {
    if (this.isRunning) return

    this.logger.log(`starting tracker [${this.key}]`)
    this.isRunning = true
    await this.pollForEvents()
  }

  stop() {
    if (!this.isRunning) return

    this.logger.log(`stopping tracker [${this.key}]`)
    this.isRunning = false
    if (this.pollingTimer) clearTimeout(this.pollingTimer)
  }

  fail(e) {
    this.logger.error(e, e.cause || '')
    this.stop()
  }

  async pollForEvents(retries = 1) {
    //fixme: consider using p-retry: https://github.com/sindresorhus/p-retry
    try {
      await this.poll()
    } catch (e) {
      if (retries === 1) this.logger.error(`tracker [${this.key}] failed during polling for events`, e, e.cause || '')
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
    if (this.lastBlock < toBlock) this.updateMarker({block: toBlock, blockWasProcessed: true})
  }

  async getLogsFor(fromBlock, toBlock, topics) {
    return this.getLogsForContract(fromBlock, toBlock, topics, this.address)
  }

  async getLogsForContract(fromBlock, toBlock, topics, address) {
    return this.provider.getLogs({fromBlock, toBlock, address, topics}).then(_ => _.filter(_ => !_.removed))
  }

  async onNewBlock(block, logs) {
   this.updateMarker(block > this.lastBlock ? {block, logIndex: -1, blockWasProcessed: false} : {blockWasProcessed: false})
    for (let each of logs) {
      const event = this.toEvent(each)
      await this.onEvent(event)
      this.updateMarker({logIndex: each.logIndex})
    }
    this.updateMarker({blockWasProcessed: true})
  }

  toEvent(log) {
    const address = this.address
    const {name, args} = this.interface.parseLog(log)
    return {address, name, args}
  }
}
