import { Signer } from 'ethers'
import { useSigner } from 'wagmi'

import { useRates } from './api/useRates'

import { TokenChainService, CoreChainService } from 'services'
import { formatUnits, KAIKAS_TOKEN_ADDRESS, METAMASK_TOKEN_ADDRESS } from 'utils'

export const useTokenInfo = () => {
  const { getUSDRatesAsync } = useRates()
  const { data: ethSigner } = useSigner()

  const getBalance = async (
    chainId: SupportedChainIds,
    address: string,
    activatingConnector: WalletTypes,
    needToFormat = true
  ) => {
    try {
      const coreService = new CoreChainService(chainId, activatingConnector, null)
      const provider = await coreService.getPublicProvider()
      const balance = await provider.getBalance(address)
      if (needToFormat) return formatUnits(balance, 'ETH')
      else return balance
    } catch (error) {
      return 0
    }
  }

  const getTokenBalance = async (
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes,
    address: string,
    ethSigner: Signer | null,
    tokenAddress: string,
    token: string,
    needToFormat = true,
    toFixed = true
  ) => {
    try {
      const tokenService = new TokenChainService(chainId, activatingConnector, tokenAddress, ethSigner, address)
      const balance = await tokenService.balanceOf(address)

      if (needToFormat) return formatUnits(balance, token, toFixed)
      return balance
    } catch (error) {
      return 0
    }
  }

  const getUserTokenInfo = async (
    chainId: SupportedChainIds,
    address: string,
    activatingConnector: WalletTypes,
    currency: Currency
  ) => {
    const currencyOption: any = {
      USDAmount: 0,
      token: currency,
      tokenAmount: 0,
    }
    try {
      const { status, data } = await getUSDRatesAsync()
      if (status) {
        if ((chainId == 1 || chainId == 5) && ethSigner) {
          switch (currency) {
            case 'ETH': {
              const ethBal = await getBalance(chainId, address, activatingConnector)
              currencyOption['tokenAmount'] = Number(ethBal)
              currencyOption['token'] = 'ETH'
              currencyOption['USDAmount'] = Number(ethBal) * data.ethRate
              break
            }
            case 'AGOV': {
              /** Get AGOV amount */
              const agovBal = await getTokenBalance(
                chainId,
                activatingConnector,
                address,
                ethSigner,
                METAMASK_TOKEN_ADDRESS.AGOV,
                'AGOV'
              )
              currencyOption['tokenAmount'] = Number(agovBal)
              currencyOption['token'] = 'AGOV'
              currencyOption['USDAmount'] = Number(agovBal) * data.agovEthRate
              break
            }
            case 'MPWR': {
              /** Get AGOV amount */
              const mpwrBal = await getTokenBalance(
                chainId,
                activatingConnector,
                address,
                ethSigner,
                METAMASK_TOKEN_ADDRESS.MPWR,
                'MPWR'
              )
              currencyOption['tokenAmount'] = Number(mpwrBal)
              currencyOption['token'] = 'MPWR'
              currencyOption['USDAmount'] = Number(mpwrBal) * data.mpwrRate
              break
            }
            case 'USDT': {
              /** Get USDT amount */
              const usdtBalance = await getTokenBalance(
                chainId,
                activatingConnector,
                address,
                ethSigner,
                METAMASK_TOKEN_ADDRESS.USDT,
                'USDT'
              )
              currencyOption['tokenAmount'] = Number(usdtBalance)
              currencyOption['token'] = 'USDT'
              currencyOption['USDAmount'] = Number(usdtBalance) * data.ethUsdtRate
              break
            }
          }
        } else {
          /** Get KLAY balance */
          switch (currency) {
            case 'KLAY': {
              const klayBal = await getBalance(chainId, address, activatingConnector)
              currencyOption['tokenAmount'] = Number(klayBal)
              currencyOption['token'] = 'KLAY'
              currencyOption['USDAmount'] = Number(klayBal) * data.klayRate
              break
            }
            case 'AGOV': {
              /** Get AGOV amount */
              const agovBal = await getTokenBalance(
                chainId,
                activatingConnector,
                address,
                null,
                KAIKAS_TOKEN_ADDRESS.AGOV,
                'AGOV'
              )
              currencyOption['tokenAmount'] = Number(agovBal)
              currencyOption['token'] = 'AGOV'
              currencyOption['USDAmount'] = Number(agovBal) * data.agovRate
              break
            }
            case 'USDT': {
              /** Get USDT amount */
              const usdtBalance = await getTokenBalance(
                chainId,
                activatingConnector,
                address,
                null,
                KAIKAS_TOKEN_ADDRESS.USDT,
                'USDT'
              )
              currencyOption['tokenAmount'] = Number(usdtBalance)
              currencyOption['token'] = 'USDT'
              currencyOption['USDAmount'] = Number(usdtBalance) * data.klaytnUsdtRate
              break
            }
          }
        }
        return currencyOption
      }
    } catch (error) {
      console.error(error)
    }
    return currencyOption
  }

  return {
    getBalance,
    getTokenBalance,
    getUserTokenInfo,
  }
}
