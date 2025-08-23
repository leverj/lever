import exitHook from 'async-exit-hook'
import {List} from 'immutable'
import {merge} from 'lodash-es'

/**
 * a ContractTracker connects to a contract deployed in an Ethereum-like chain and tracks its events
 */
export class ContractTracker {
  static of(config, chainId, contract, creationBlock, store, onEvent, topics) {
    if (!topics) topics = [contract.interface.fragments.filter(_ => _.type === 'event').map(_ => _.topicHash)]
    const key = [chainId, contract.target]
    if (!store.has(key)) store.set(key, {
      marker: {block: creationBlock, logIndex: -1, blockWasProcessed: false}
    })
    return new this(config, chainId, contract, topics, store, onEvent, store.get(key))
  }

  constructor(config, chainId, contract, topics, store, onEvent, data) {
    this.config = config
    this.logger = config.logger ?? console
    this.chainId = chainId
    this.contract = contract
    this.topics = topics
    this.store = store
    this.onEvent = onEvent
    this.isRunning = false
    const {marker} = data
    this.marker = marker
    exitHook(() => this.stop())
  }
  get key() { return [this.chainId, this.address] }
  get address() { return this.contract.target }
  get provider() { return this.contract.runner.provider }
  get interface() { return this.contract.interface }
  get polling() { return this.config.polling }

  update(state) { this.store.update(this.key, state) }
  updateMarker(state) { this.update({marker: merge(this.marker, state)}) }

  async start() {
    if (this.isRunning) return

    this.logger.log(`starting tracker [${this.key}]`)
    this.isRunning = true
    this.store.open()
    await this.pollForEvents()
  }

  stop() {
    if (!this.isRunning) return

    this.logger.log(`stopping tracker [${this.key}]`)
    this.isRunning = false
    if (this.pollingTimer) clearTimeout(this.pollingTimer)
    this.store.close()
  }

  fail(e) {
    this.logger.error(e, e.cause ?? '')
   this.stop()
  }

  async pollForEvents(retries = 1) {
    //fixme: consider using p-retry: https://github.com/sindresorhus/p-retry
    try {
      await this.poll()
    } catch (e) {
      if (retries === 1) this.logger.error(`tracker [${this.key}] failed during polling for events`, e, e.cause ?? '')
      return retries === this.polling.retries ? this.fail(e) : this.pollForEvents(retries + 1)
    }
    if (this.isRunning) this.pollingTimer = setTimeout(_ => this.pollForEvents(_), this.polling.interval)
  }

  async poll() {
    const {block, blockWasProcessed} = this.marker
    const fromBlock = block + (blockWasProcessed ? 1 : 0)
    const toBlock = await this.provider.getBlockNumber()
    if (fromBlock <= toBlock) await this.processLogs(fromBlock, toBlock)
  }

  async processLogs(fromBlock, toBlock) {
    const logs = await this.getLogsFor(fromBlock, toBlock)
    const {block, logIndex, blockWasProcessed} = this.marker
    const logsPerBlock = List(logs).
      groupBy(_ => _.blockNumber).
      filter((_, key) => key >= fromBlock).
      map((value, key) => key === block && !blockWasProcessed ? value.filter(_ => _.logIndex > logIndex) : value).
      map((value, _) => value.sortBy(_ => _.logIndex).toArray()).
      toKeyedSeq()
    for (let [block, blockLogs] of logsPerBlock) await this.onNewBlock(block, blockLogs)
    if (this.marker.block < toBlock) await this.updateMarker({block: toBlock, blockWasProcessed: true})
  }

  async getLogsFor(fromBlock, toBlock) {
    try {
      return await this.getLogsForContract(fromBlock, toBlock)
    } catch (e) {
      if (fromBlock === toBlock) {
        this.logger.info(`falling back on getting logs per each contract at block ${fromBlock}`)
        return this.getLogsForContract(fromBlock, fromBlock)
      }
      else {
        this.logger.info(`splitting blocks to read logs from:${fromBlock} to:${toBlock}`, e?.error?.message)
        const midway = fromBlock + Math.floor((toBlock - fromBlock) / 2)
        await this.processLogs(fromBlock, midway)
        await this.processLogs(midway + 1, toBlock)
      }
    }
  }

  async getLogsForContract(fromBlock, toBlock) {
    return this.provider.getLogs({
      fromBlock, toBlock, address: this.address, topics: this.topics
    }).then(_ => _.filter(_ => !_.removed))
  }

  async onNewBlock(block, logs) {
    await this.updateMarker(
      block > this.marker.block ? {block, logIndex: -1, blockWasProcessed: false} : {blockWasProcessed: false}
    )
    for (let each of logs) {
      const event = this.toEvent(each)
      await this.onEvent(event)
      await this.updateMarker({logIndex: each.logIndex})
    }
    await this.updateMarker({blockWasProcessed: true})
  }

  toEvent(log) {
    const address = this.address
    const {name, args} = this.interface.parseLog(log)
    return {address, name, args}
  }
}
