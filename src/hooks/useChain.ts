import { useMemo } from 'react'

import { DEFAULT_KLAYTN_CHAIN_ID } from '../utils'

import { useGlobalState } from './store/useGlobalState'

import {
  MarketplaceChainService,
  ClubrareCollectionService,
  CollectionFactoryChainService,
  TokenChainService,
  MarketplaceValidatorService,
} from 'services'
import { useConnector } from 'context'
import ABIs from 'abis'

const useChain = (_address: string, collectionAddress: string, tokenAddress: string) => {
  const { address, chainId, signer } = useConnector()
  const { connector } = useGlobalState()

  const marketPlaceAbi = chainId === DEFAULT_KLAYTN_CHAIN_ID ? ABIs.MarketplaceKlaytnABI : ABIs.MarketplaceABI
  const validatorAbi =
    chainId === DEFAULT_KLAYTN_CHAIN_ID ? ABIs.MarketplaceklaytnValidator : ABIs.MarketplaceValidatorABI

  const marketPlaceServices = new MarketplaceChainService(chainId, connector, _address, marketPlaceAbi, signer, address)

  const marketPlaceValidatorServices = new MarketplaceValidatorService(
    chainId,
    connector,
    _address,
    validatorAbi,
    signer,
    address
  )

  const collectionServices = new ClubrareCollectionService(chainId, connector, collectionAddress, signer, address)

  const tokenServices = new TokenChainService(chainId, connector, tokenAddress, signer, address)

  const collectionFactoryService = new CollectionFactoryChainService(chainId, connector, _address, signer, address)

  return {
    chainId,
    collectionFactoryService,
    collectionServices,
    marketPlaceServices,
    marketPlaceValidatorServices,
    address,
    tokenServices,
  }
}

export default useChain
