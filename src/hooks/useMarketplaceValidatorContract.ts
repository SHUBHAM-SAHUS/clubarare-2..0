/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useCallback } from 'react'

import useChain from './useChain'

import {
  CLUBRARE_NETWORKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  IS_PRODUCTION,
  MARKETPLACE_CONTRACT_ADDRESS,
  MARKETPLACE_VALIDATOR_CONTRACT_ADDRESS,
} from 'utils'

export const useMarketPlaceValidatorContract = (networkId: ClubRareNetworks) => {
  const itemChainId: SupportedChainIds = useMemo(
    () => (networkId == CLUBRARE_NETWORKS.ETHEREUM ? DEFAULT_ETHEREUM_CHAIN_ID : DEFAULT_KLAYTN_CHAIN_ID),
    []
  )
  const address = MARKETPLACE_VALIDATOR_CONTRACT_ADDRESS[itemChainId]

  const { marketPlaceValidatorServices } = useChain(address, '', '')

  const _verifyOrderSig = useCallback(async (orderTuple: OrderTuple) => {
    try {
      return await marketPlaceValidatorServices._verifyOrderSig(orderTuple)
    } catch (err) {}
  }, [])

  return {
    _verifyOrderSig,
  }
}
