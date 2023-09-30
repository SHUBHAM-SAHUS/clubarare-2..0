import { useCallback } from 'react'

import { METAMASK_TOKEN_ADDRESS } from 'utils'

export const useCustomStableCoin = () => {
  const ethUSDTTokenAddress = METAMASK_TOKEN_ADDRESS?.USDT?.toLowerCase()
  const klaytnUSDTTokenAddress = '' //import from utils

  const customFromWei = useCallback(async (amount: string | number, ethers: any, ercAddress = '') => {
    const USDTAddress = [ethUSDTTokenAddress]
    if (ercAddress && ercAddress != '' && USDTAddress.includes(ercAddress.toLowerCase())) {
      const result = ethers.utils.formatEther(amount.toString())
      return result
    } else {
      const result = String(ethers.utils.formatEther(amount))
      return result
    }
  }, [])

  const customToWei = useCallback(async (amount: string | number | any, ethers: any, ercAddress = '') => {
    const USDTAddress = [ethUSDTTokenAddress]
    if (ercAddress && ercAddress != '' && USDTAddress.includes(ercAddress.toLowerCase())) {
      const result = ethers.utils.parseUnits(amount.toString())
      return result
    } else {
      const result = String(ethers.utils.parseEther(String(amount)))
      return result
    }
  }, [])

  return {
    customFromWei,
    customToWei,
  }
}

export default useCustomStableCoin
