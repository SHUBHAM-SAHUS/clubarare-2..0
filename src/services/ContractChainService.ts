import { Signer, Contract } from 'ethers'
import Caver, { Contract as CaverContract } from 'caver-js'

import CoreChainService from './CoreChainService'

import { NULL_TOKEN_ADDRESS, SupportedChainIds } from 'utils'

class ContractChainService extends CoreChainService {
  contract: Contract | CaverContract
  caver: Caver
  operator?: any
  constructor(
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes | any,
    address: string,
    abi: any,
    signer: Signer | null,
    operator?: string
  ) {
    super(chainId, activatingConnector, signer)
    this.caver = this.isKlaytnNetwork() ? new Caver((window as any).klaytn) : new Caver()

    if (address) {
      this.contract = this.newContract(address, abi, signer)
    } else {
      this.contract = this.newContract(NULL_TOKEN_ADDRESS, abi, signer)
    }
    this.operator = operator
  }

  /**
   * Return all methods of contract
   * @returns methods
   */

  protected getMethods = () => (this.isKlaytnNetwork() ? this.contract.methods : this.contract)

  /**
   * Return contract instance
   * @param address
   * @param abi
   * @param signer
   * @returns contract
   */
  protected newContract = (address: string, abi: any, signer: Signer | null): Contract | CaverContract => {
    if (this.isKlaytnNetwork()) {
      return new this.caver.klay.Contract(abi, address)
    } else if (signer) {
      return new Contract(address, abi, signer)
    } else {
      return new Contract(address, abi)
    }
  }
}

export default ContractChainService
