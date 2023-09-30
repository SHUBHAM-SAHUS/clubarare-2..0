/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import useChain from './useChain'

export const useTokenServices = (address: string) => {
  const { tokenServices } = useChain('', '', address)

  const allowance = useCallback(async (owner: string, spender: string) => {
    const result = await tokenServices.allowance(owner, spender)
    return result
  }, [])

  const approve = useCallback(async (address: string, price: string) => {
    return await tokenServices.approve(address, price)
  }, [])

  return {
    allowance,
    approve,
  }
}
