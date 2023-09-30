import { useMemo, useCallback } from 'react'

import useChain from './useChain'

import {
  CLUBRARE_NETWORKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  COLLECTION_FACTORY_CONTRACT_ADDRESS,
} from 'utils'

export const useCollectionFactoryContract = (networkId?: ClubRareNetworks) => {
  const itemChainId: SupportedChainIds = useMemo(
    () => (networkId == CLUBRARE_NETWORKS.ETHEREUM ? DEFAULT_ETHEREUM_CHAIN_ID : DEFAULT_KLAYTN_CHAIN_ID),
    [networkId]
  )

  const address = COLLECTION_FACTORY_CONTRACT_ADDRESS[itemChainId]

  const { collectionFactoryService } = useChain(address, '', '')

  const createCollectionFromFactory = useCallback(
    async (displayName: string, symbol: string, IpfsHash: string) => {
      return await collectionFactoryService.createCollection(displayName, symbol, IpfsHash)
    },
    [collectionFactoryService]
  )

  return {
    createCollectionFromFactory,
  }
}
