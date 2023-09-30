import { Signer, BigNumberish, BigNumber } from 'ethers'

import ContractChainService from './ContractChainService'

import { SupportedChainIds } from 'utils'
import ABIs from 'abis'

class MarketplaceValidatorService extends ContractChainService {
  constructor(
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes | undefined,
    address: string,
    abi: any,
    signer: Signer,
    operator: AddressString | any
  ) {
    super(chainId, activatingConnector, address, ABIs.MarketplaceValidatorABI, signer, operator)
  }

  // View functions
  async _verifyOrderSig(orderTuple: OrderTuple): Promise<AnyObject> {
    return this.isKlaytnNetwork()
      ? await this.getMethods()._verifyOrderSig(orderTuple).call()
      : await this.getMethods()._verifyOrderSig(orderTuple)
  }
}

export default MarketplaceValidatorService
