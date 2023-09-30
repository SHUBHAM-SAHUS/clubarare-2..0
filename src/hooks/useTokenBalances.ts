import { useQuery } from 'wagmi'
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { Signer } from 'ethers'

import { useTokenInfo } from './useTokenInfo'
import { useRates } from './api/useRates'
import { getGlobalStore } from './store/useGlobalState'

import {
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  KAIKAS_TOKEN_ADDRESS,
  METAMASK_TOKEN_ADDRESS,
  QUERIES,
} from 'utils'
import { currencyOptionProps } from 'design-systems/Organisms/UserWallet/interface'

export const useTokenBalances = (chainId: SupportedChainIds, address: string, signer: Signer) => {
  const { getUSDRatesAsync } = useRates()
  const { getBalance, getTokenBalance } = useTokenInfo()

  const {
    isLoading: isLoadingTokenBalances,
    data: tokenBalances,
    refetch: refetchBalances,
  } = useQuery(
    [QUERIES.TOKEN.GET_BALANCE, chainId, address],
    async () => {
      const { status, data } = await getUSDRatesAsync()
      if (!status) {
        toast.error('Fetching rates has failed')
        return []
      }

      const connector = getGlobalStore().connector
      if (!connector) {
        return []
      }

      if (chainId !== DEFAULT_ETHEREUM_CHAIN_ID && chainId !== DEFAULT_KLAYTN_CHAIN_ID) {
        return []
      }

      const values: currencyOptionProps[] = []
      if (chainId === DEFAULT_ETHEREUM_CHAIN_ID) {
        if (!signer) throw 'No signer'

        /** Get ETH balance */
        const ethBal = await getBalance(chainId, address, connector)
        if (ethBal) {
          values.push({
            rate: data.ethRate,
            USDAmount: Number(ethBal) * data.ethRate,
            token: 'ETH',
            tokenAmount: Number(ethBal),
          })
        }

        /** Get MPWR amount */
        const mpwrBal = await getTokenBalance(
          chainId,
          connector,
          address,
          signer,
          METAMASK_TOKEN_ADDRESS.MPWR,
          'MPWR',
          true,
          false
        )
        if (mpwrBal) {
          values.push({
            rate: data.mpwrRate,
            USDAmount: Number(mpwrBal) * data.mpwrRate,
            token: 'MPWR',
            tokenAmount: Number(mpwrBal),
          })
        }

        /** Get AGOV amount */
        const agovBal = await getTokenBalance(
          chainId,
          connector,
          address,
          signer,
          METAMASK_TOKEN_ADDRESS.AGOV,
          'AGOV',
          true,
          false
        )
        if (agovBal) {
          values.push({
            rate: data.agovEthRate,
            USDAmount: Number(agovBal) * data.agovEthRate,
            token: 'AGOV',
            tokenAmount: Number(agovBal),
          })
        }

        /** Get wETH amount */
        const wETHBal = await getTokenBalance(
          chainId,
          connector,
          address,
          signer,
          METAMASK_TOKEN_ADDRESS.WETH,
          'wETH',
          true,
          false
        )
        if (wETHBal) {
          values.push({
            rate: data.ethRate,
            USDAmount: Number(wETHBal) * data.ethRate,
            token: 'wETH',
            tokenAmount: Number(wETHBal),
          })
        }

        /** Get USDT amount */
        const USDTBal = await getTokenBalance(
          chainId,
          connector,
          address,
          signer,
          METAMASK_TOKEN_ADDRESS.USDT,
          'USDT',
          true,
          false
        )
        if (USDTBal) {
          values.push({
            rate: data.ethUsdtRate,
            USDAmount: Number(USDTBal) * data.ethUsdtRate,
            token: 'USDT',
            tokenAmount: Number(USDTBal),
          })
        }
      } else {
        /** Get KLAY balance */
        const klayBal = await getBalance(chainId, address, connector)
        if (klayBal) {
          values.push({
            rate: data.klayRate,
            USDAmount: Number(klayBal) * data.klayRate,
            token: 'KLAY',
            tokenAmount: Number(klayBal),
          })
        }

        /** Get AGOV amount */
        const agovBal = await getTokenBalance(
          chainId,
          connector,
          address,
          null,
          KAIKAS_TOKEN_ADDRESS.AGOV,
          'AGOV',
          true,
          false
        )
        if (agovBal) {
          values.push({
            rate: data.agovRate,
            USDAmount: Number(agovBal) * data.agovRate,
            token: 'AGOV',
            tokenAmount: Number(agovBal),
          })
        }

        /** Get USDT amount */
        const USDTBal = await getTokenBalance(
          chainId,
          connector,
          address,
          null,
          KAIKAS_TOKEN_ADDRESS.USDT,
          'USDT',
          true,
          false
        )
        if (USDTBal) {
          values.push({
            rate: data.klaytnUsdtRate,
            USDAmount: Number(USDTBal) * data.klaytnUsdtRate,
            token: 'USDT',
            tokenAmount: Number(USDTBal),
          })
        }
      }

      return values
    },
    {
      enabled: Boolean(chainId) && Boolean(address) && (chainId === DEFAULT_ETHEREUM_CHAIN_ID ? Boolean(signer) : true),
      cacheTime: 60 * 60,
    }
  )

  return useMemo(
    () => ({
      isLoadingTokenBalances,
      tokenBalances,
      refetchBalances,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoadingTokenBalances, tokenBalances]
  )
}
