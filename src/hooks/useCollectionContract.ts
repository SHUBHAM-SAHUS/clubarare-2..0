/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import useChain from './useChain'

export const useCollectionContract = (address: string) => {
  const { collectionServices } = useChain('', address, '')

  const getApproved = useCallback(async (tokenId: string) => {
    const result = await collectionServices.getApproved(tokenId)
    return result
  }, [])

  const approve = useCallback(
    async (address: string, tokenId: string) => collectionServices.approve(address, tokenId),
    []
  )

  const balanceOf = useCallback(async (address: string) => collectionServices.balanceOf(address), [])

  return {
    getApproved,
    approve,
    balanceOf,
  }
}
