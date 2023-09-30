/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useCallback } from 'react'
import { BigNumber } from 'ethers'

import useChain from './useChain'

import {
  CLUBRARE_NETWORKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  MARKETPLACE_CONTRACT_ADDRESS,
} from 'utils'

/**
 * Hook to interact with the ClubRare marketplace smart contract.
 * @param networkId The ID of the ClubRare network to connect to.
 * @returns An object containing functions for interacting with the marketplace contract.
 */
export const useMarketPlaceContract = (networkId: ClubRareNetworks) => {
  // Determine the chain ID based on the selected network ID.
  const itemChainId: SupportedChainIds = useMemo(
    () => (networkId == CLUBRARE_NETWORKS.ETHEREUM ? DEFAULT_ETHEREUM_CHAIN_ID : DEFAULT_KLAYTN_CHAIN_ID),
    [networkId]
  )

  // Get the address of the marketplace contract on the selected chain.
  const marketplaceAddress = MARKETPLACE_CONTRACT_ADDRESS[itemChainId]

  // Connect to the marketplace contract using the useChain hook.
  const { marketPlaceServices } = useChain(marketplaceAddress, '', '')

  /**
   * Get the current nonce for the given address.
   * @param address The address to retrieve the nonce for.
   * @returns The current nonce value.
   */
  const getNonce = useCallback(
    async (address: string) => {
      try {
        const result: BigNumber = await marketPlaceServices.getCurrentOrderNonce(address)
        return result
      } catch (err) {
        console.error(err)
      }
      return BigNumber.from(0)
    },
    [marketPlaceServices]
  )

  /**
   * Check if the given order has been cancelled or finalized.
   * @param signature The signature of the order to check.
   * @returns True if the order has been cancelled or finalized, false otherwise.
   */

  const cancelledOrFinalized = useCallback(
    async (signature: string) => {
      return await marketPlaceServices.cancelledOrFinalized(signature)
    },
    [marketPlaceServices]
  )

  /**
   * create hash of orderTupple, its for klaytn network
   * @param OrderTuple Listing object
   * @returns Hash.
   */
  const hashOrder = useCallback(
    async (OrderTuple: OrderTuple) => {
      try {
        const result = await marketPlaceServices.hashOrder(OrderTuple)
        return result
      } catch (er) {
        console.error('marketPlaceServices.hashOrder error', er)
      }
    },
    [marketPlaceServices]
  )

  /**
   * Buy a token on the marketplace.
   * @param tokenAddress The address of the token to buy.
   * @param tokenId The ID of the token to buy.
   * @param amount The amount of the token to buy.
   * @param order The order tuple representing the token to buy.
   * @returns The transaction hash of the buy transaction.
   */
  const buy = useCallback(
    async (tokenAddress: AddressString, tokenId: BigNumberish, amount: BigNumberish, order: OrderTuple) => {
      return await marketPlaceServices.buy(tokenAddress, tokenId, amount, order)
    },
    [marketPlaceServices]
  )

  const invalidateSignedOrder = async (delistArray: OrderTuple) => {
    return await marketPlaceServices.invalidateSignedOrder(delistArray)
  }

  // Return an object containing the marketplace functions.
  const bid = useCallback(
    async (bidTupple: OrderTuple, amount: BigNumberish) => {
      return await marketPlaceServices.bid(bidTupple, amount)
    },
    [marketPlaceServices]
  )

  const claim = useCallback(
    async (claimTupple: OrderTuple) => {
      return await marketPlaceServices.claim(claimTupple)
    },
    [marketPlaceServices]
  )

  return {
    bid,
    buy,
    cancelledOrFinalized,
    claim,
    getNonce,
    invalidateSignedOrder,
    hashOrder,
  }
}
