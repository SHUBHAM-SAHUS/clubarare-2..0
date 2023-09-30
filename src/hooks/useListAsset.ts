import { useMemo } from 'react'
import { BigNumber, ethers } from 'ethers'
import { useMutation } from 'wagmi'
import { signTypedData, signMessage } from '@wagmi/core'
import Caver from 'caver-js'

import { useGlobalState } from './store/useGlobalState'

import { useConnector } from 'context'
import { MarketplaceService } from 'api-services'
import {
  SETTINGS,
  MARKETPLACE_VALIDATOR_CONTRACT_ADDRESS,
  LISTING_SIGN_ABI,
  getSignPayloadFromListingData,
} from 'utils'

export const useListAsset = () => {
  const { address, chainId } = useConnector()
  const { connector: activatingConnector } = useGlobalState()

  const { isLoading: isListing, mutateAsync: onListAsset } = useMutation(
    async ({
      listing,
      nonce,
      hashOrderSignature,
    }: {
      listing: ListingObject
      nonce: BigNumber
      hashOrderSignature?: any
    }) => {
      if (activatingConnector === 'KAIKAS') {
        return new Promise<object>(async (resolve, reject) => {
          const method = 'klay_sign'
          const params = [address, hashOrderSignature]
          const provider = new Caver((window as any).klaytn)
          //@ts-ignore

          await provider.klay.currentProvider.sendAsync(
            {
              method,
              params,
              from: address,
            },
            async (err: any, result: any) => {
              if (err || result.error) {
                reject({ signature: '', listing: '' })
              } else {
                const signature = result.result
                const res = await MarketplaceService.listAsset({
                  _id: listing.objId,
                  auctionType: listing.auctionType,
                  amount: listing.price,
                  erc20_address: listing.paymentTokenType,
                  nonce: nonce.toString(),
                  signature,
                  startingTime: listing.startTime,
                  closingTime: listing.endTime,
                  isTokenGated: listing.isTokenGated,
                  tokenGateAddress: listing.tokenGateAddress,
                })
                resolve({
                  signature,
                  listing: res,
                })
              }
            }
          )
        })
      } else {
        if (activatingConnector === 'METAMASK-KAIKAS') {
          try {
            const msgHash = ethers.utils.arrayify(hashOrderSignature)
            const signature = await signMessage({ message: msgHash })
            const res = await MarketplaceService.listAsset({
              _id: listing.objId,
              auctionType: listing.auctionType,
              amount: listing.price,
              erc20_address: listing.paymentTokenType,
              nonce: nonce.toString(),
              signature,
              startingTime: listing.startTime,
              closingTime: listing.endTime,
              isTokenGated: listing.isTokenGated,
              tokenGateAddress: listing.tokenGateAddress,
              isMetamask: true,
            })

            return {
              signature,
              listing: res,
            }
          } catch (error) {
            console.error('Listing Error: ', error)
          }
        } else {
          try {
            const signature = await signTypedData({
              domain: {
                name: SETTINGS.name,
                version: SETTINGS.version,
                chainId,
                verifyingContract: MARKETPLACE_VALIDATOR_CONTRACT_ADDRESS[chainId],
              },
              types: {
                Order: LISTING_SIGN_ABI,
              },
              value: getSignPayloadFromListingData(listing, nonce),
            })
            const res = await MarketplaceService.listAsset({
              _id: listing.objId,
              auctionType: listing.auctionType,
              amount: listing.price,
              erc20_address: listing.paymentTokenType,
              nonce: nonce.toString(),
              signature,
              startingTime: listing.startTime,
              closingTime: listing.endTime,
              isTokenGated: listing.isTokenGated,
              tokenGateAddress: listing.tokenGateAddress,
            })

            return {
              signature,
              listing: res,
            }
          } catch (error) {
            console.error('Listing Error: ', error)
          }
        }
      }
    }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({ isListing, onListAsset }), [isListing])
}
