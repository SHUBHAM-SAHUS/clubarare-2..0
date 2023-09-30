import { useSigner } from 'wagmi'
import { useCallback } from 'react'
import { BigNumber } from 'ethers'

import { useTokenInfo } from './useTokenInfo'
import { useGlobalState } from './store/useGlobalState'
import { useCollectionContract } from './useCollectionContract'
import { useTokenServices } from './useTokenServices'

import { useConnector } from 'context'
import { CLUBRARE_NETWORKS, getTokenKey, parseUnits } from 'utils'
import { useToast } from 'hooks/useToast'

export const useTokenApproval = (asset: AssetObject) => {
  const { isSigned, address, chainId } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { data: ethSigner } = useSigner()
  const { approve, allowance } = useTokenServices(asset?.auctionDetails?.erc20Token)
  const { getTokenBalance, getBalance } = useTokenInfo()
  const { warningToast } = useToast()
  const isTokenGated = asset?.auctionDetails?.isTokenGated
  const tokenGateAddress = asset?.auctionDetails?.tokenGateAddress
  const { balanceOf } = useCollectionContract(tokenGateAddress)
  const contractAddress = asset?.auctionDetails?.contractAddress
  const token = getTokenKey(asset.networkId, asset.auctionDetails.erc20Token)

  const getUserBalance = async () => {
    if (isSigned && chainId && address && activatingConnector) {
      if (token === 'ETH' || token === 'KLAY') {
        return await getBalance(chainId, address, activatingConnector, false)
      } else {
        return await getTokenBalance(
          chainId,
          activatingConnector,
          address,
          ethSigner ?? null,
          asset.auctionDetails.erc20Token,
          token,
          false
        )
      }
    }
  }

  const beforeBuyValidation = useCallback(async (onClose: () => void, hideLoading: () => void) => {
    try {
      const price = asset.auctionDetails.buyPrice
      const userBalance = await getUserBalance()
      if (BigNumber.from(String(price)).gt(BigNumber.from(String(userBalance)))) {
        warningToast(`You don't have enough balance to buy this item`)
        hideLoading()
        onClose()
        return false
      }

      if (isTokenGated) {
        const checkTokenGateBalance = await balanceOf(address)
        if (+checkTokenGateBalance === 0) {
          warningToast('Only LazyLeo NFT holders can buy this item')
          hideLoading()
          onClose()
          return false
        }
      }
      if (token != 'ETH' && token !== 'KLAY') {
        if (token === 'USDT') {
          const checkAllowance = await allowance(address, contractAddress)
          if (BigNumber.from(String(price)).gt(BigNumber.from(String(checkAllowance)))) {
            const hash = await approve(
              contractAddress,
              '115792089237316195423570985008687907853269984665640564039457584007913129639935'
            )
            if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
              await hash?.wait()
            }
          }
        } else {
          const hash = await approve(contractAddress, price)
          if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
            await hash?.wait()
          }
        }
      }
      return true
    } catch (err) {
      hideLoading()
      onClose()
      warningToast(String(err))
      return false
    }
  }, [])

  const beforeBidValidation = useCallback(async (amount: number, onClose: () => void, hideLoading: () => void) => {
    try {
      const price = parseUnits(amount, token)

      if (
        BigNumber.from(String(asset.auctionDetails.currentBid)).gt(0) &&
        BigNumber.from(String(asset.auctionDetails.currentBid)).gt(BigNumber.from(String(price)))
      ) {
        warningToast(`Bid value must be greater than current bid value.`)
        hideLoading()
        return false
      } else if (BigNumber.from(String(asset.auctionDetails.startingPrice)).gte(BigNumber.from(String(price)))) {
        warningToast(`Bid value must be greater than starting price value.`)
        hideLoading()
        return false
      }

      const userBalance = await getUserBalance()
      if (BigNumber.from(String(price)).gt(BigNumber.from(String(userBalance)))) {
        warningToast(`You don't have enough balance to bid on this item`)
        hideLoading()
        return false
      }

      if (isTokenGated) {
        const checkTokenGateBalance = await balanceOf(address)
        if (+checkTokenGateBalance === 0) {
          warningToast('Only LazyLeo NFT holders can bid on this item')
          hideLoading()
          onClose()
          return false
        }
      }
      if (token != 'ETH' && token !== 'KLAY') {
        if (token === 'USDT') {
          const checkAllowance = await allowance(address, contractAddress)
          if (BigNumber.from(String(price)).gt(BigNumber.from(String(checkAllowance)))) {
            const hash = await approve(
              contractAddress,
              '115792089237316195423570985008687907853269984665640564039457584007913129639935'
            )
            if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
              await hash?.wait()
            }
          }
        } else {
          const hash = await approve(contractAddress, price)
          if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
            await hash?.wait()
          }
        }
      }
      return true
    } catch (err: any) {
      hideLoading()
      onClose()
      warningToast(err)
      return false
    }
  }, [])

  return {
    beforeBidValidation,
    beforeBuyValidation,
  }
}
