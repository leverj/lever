import {stringify} from 'yaml'

export class ContractInterfacer {
  constructor(contract, errorDecoder) {
    this.contract = contract
    this.errorDecoder = errorDecoder
  }
  get interface() { return this.contract.interface }
  get provider() { return this.contract.runner.provider }
  get target() { return this.contract.target }
  get address() { return this.target }

  connect(signer) {
    this.contract = this.contract.connect(signer)
    return this
  }

  async transact(f) {
    try {
      const receipt = await f().then(_ => _.wait())
      return receipt.status === 1 ?
        {success: true, receipt} : // => successful transaction
        {error: `${receipt.status}: shit happens 🤷`} //fixme: see if we need more detailed reason
    } catch (e) {
      const {reason, type, signature, args} = await this.errorDecoder.decode(e)
      console.log(`${signature} : ${stringify(args, {collectionStyle: 'flow'})}`)
      return {error: `${type}: ${reason}`}
    }
  }

  extractEvent(receipt, name, iface = this.interface) {
    return receipt.logs.
      map(_ => iface.parseLog(_)).
      filter(_ => !!_).
      find(_ => _.name === name)?.args.toObject()
  }
}
