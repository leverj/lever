import {stringify} from 'yaml'

export const extractEvent = (receipt, name, iface) => receipt.logs.
  map(_ => iface.parseLog(_)).
  filter(_ => !!_).
  find(_ => _.name === name)?.args.toObject()

export class ContractInterfacer {
  constructor(contract, errorDecoder, logger = console) {
    this.contract = contract
    this.errorDecoder = errorDecoder
    this.logger = logger
  }
  get interface() { return this.contract.interface }
  get runner() { return this.contract.runner }
  get provider() { return this.runner.provider }
  get target() { return this.contract.target }
  get address() { return this.target }

  extractEvent(receipt, name) { return extractEvent(receipt, name, this.interface) }

  connect(signer) {
    this.contract = this.contract.connect(signer.connect(this.contract.runner.provider))
    return this
  }

  async transact(f, onReceipt = _ => { if (_.error) this.logger.error(_.error); return _ }) {
    return this._transact_(f).then(_ => onReceipt(_))
  }

  async _transact_(f) {
    try {
      const receipt = await f().then(_ => _.wait())
      return receipt.status === 1 ?
        {success: true, receipt} : // => successful transaction
        {error: `${receipt.status}: shit happens 🤷`} //fixme: see if we need more detailed reason
    } catch (e) {
      this.logger.error(e)
      const {reason, type, signature, args} = await this.errorDecoder.decode(e)
      this.logger.log(`${signature} : ${stringify(args, {collectionStyle: 'flow'})}`)
      return {error: `${type}: ${reason}`}
    }
  }
}
