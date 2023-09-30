/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import { useMarketPlaceContract } from './useMarketplaceContract'
import { useSingleAsset } from './api/useSingleAsset'
import { useGlobalState } from './store/useGlobalState'

import { MarketplaceService } from 'api-services'
import { useToast } from 'hooks/useToast'
import { useConnector } from 'context'
import { CLUBRARE_NETWORKS } from 'utils'

export const useClaimService = (asset: AssetObject) => {
  const { claim } = useMarketPlaceContract(asset?.networkId)
  const { address } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { refetchAssetDetails } = useSingleAsset(asset?.id, address)
  const { successToast, warningToast } = useToast()

  const saveTransactionDetails = useCallback(
    async (
      hash: string,
      networkId: string,
      contractAddress: string,
      isEscrow: boolean,
      hideLoading: () => void,
      objId: string,
      auction_id: string
    ) => {
      //TODO : Need to handle escrow
      if (asset.redeemable) {
        const claimAction: EscrowWithClaimRequest = {
          transaction_hash: hash,
          collectible_id: objId,
          auction_detail_id: auction_id,
        }
        await MarketplaceService.claimWithEscrow(claimAction)
      }

      if (!isEscrow) {
        const claimAction: SaveEventByTransactionRequest = {
          transaction_hash: hash,
          contract_address: contractAddress,
          network_id: networkId,
        }
        await MarketplaceService.saveEventByTransaction(claimAction)
      }
      hideLoading()
      successToast(`You've successfully claim this item`)
      refetchAssetDetails()
    },
    [asset]
  )

  const collectibleClaim = async (hideLoading: () => void, isEscrow: boolean) => {
    const contractAddress = asset?.auctionDetails?.contractAddress
    const endTime = Math.round(new Date(asset?.auctionDetails?.initialClosingTime).getTime() / 1000)
    const listTime = Math.round(new Date(asset?.auctionDetails?.startingTime).getTime() / 1000)

    const OrderTuple: OrderTuple = {
      seller: asset?.collectibleOwner,
      contractAddress: asset?.auctionDetails?.collectionAddress,
      royaltyFee: Number(asset?.royalties ?? 0) * 100,
      royaltyReceiver: asset?.userObj?.walletAddress,
      paymentToken: asset?.auctionDetails?.erc20Token,
      basePrice: asset?.auctionDetails?.startingPrice,
      listingTime: listTime,
      expirationTime: endTime ?? 0,
      nonce: Number(asset?.auctionDetails?.nonce),
      tokenId: asset?.tokenId ?? 0,
      orderType: asset?.redeemable ? 1 : 0,
      signature: asset?.auctionDetails?.signature,
      uri: asset?.ipfsHash,
      objId: asset?.id.toString(),
      isTokenGated: asset?.auctionDetails?.isTokenGated,
      tokenGateAddress: asset?.auctionDetails?.tokenGateAddress,
      // isEscrow: isEscrow, //TODO: need to check escrow here
      // isMetamask: asset?.auctionDetails?.isMetamask ?? false,
    }
    try {
      const brokerTransactionHash: any = await claim(OrderTuple)
      if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
        await brokerTransactionHash?.wait()
      }
      if (brokerTransactionHash?.transactionHash || brokerTransactionHash?.hash) {
        saveTransactionDetails(
          brokerTransactionHash?.transactionHash || brokerTransactionHash?.hash,
          asset.networkId,
          contractAddress,
          isEscrow,
          hideLoading,
          OrderTuple.objId,
          asset?.auctionDetails.id
        )
      } else {
        warningToast(brokerTransactionHash)
        hideLoading()
      }
    } catch (err: any) {
      hideLoading()
      warningToast(err)
    }
  }

  return {
    collectibleClaim,
  }
}
