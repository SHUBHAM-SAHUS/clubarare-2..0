/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import { useMarketPlaceContract } from './useMarketplaceContract'
import { useSingleAsset } from './api/useSingleAsset'
import { useGlobalState } from './store/useGlobalState'

import { MarketplaceService } from 'api-services'
import { useToast } from 'hooks/useToast'
import { CLUBRARE_NETWORKS, getTokenKey, parseUnits } from 'utils'
import { useConnector } from 'context'
import { DeliverFormProps } from 'design-systems/Molecules/Forms/BuyForm'

export const useBidService = (asset: AssetObject) => {
  const { successToast, warningToast } = useToast()
  const { address } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { bid } = useMarketPlaceContract(asset?.networkId)
  const { refetchAssetDetails } = useSingleAsset(asset?.id, address)

  const saveTransactionDetails = useCallback(
    async (
      hash: string,
      objId: string,
      auction_detail_id: string,
      amount: string,
      networkId: string,
      contractAddress: string,
      isEscrow: boolean,
      inputValues: DeliverFormProps,
      currency: string,
      deliveryType: string,
      onClose: () => void,
      hideLoading: () => void
    ) => {
      if (asset.redeemable) {
        const bidAction: EscrowBidDetailRequest = {
          address: inputValues.address,
          auction_detail_id: auction_detail_id,
          bid_amount: amount,
          bid_transaction_hash: hash,
          city: inputValues?.city,
          collectible_id: objId,
          country: inputValues?.country,
          currency: currency,
          delivery_type: deliveryType,
          email: inputValues.email,
          full_name: inputValues.name,
          isEscrow: isEscrow,
          network_id: networkId,
          phone_number: inputValues?.phone,
          state: inputValues.state,
          zip_code: inputValues?.zip,
        }
        await MarketplaceService.escrowBidDetail(bidAction)
      }

      if (!isEscrow) {
        const bidAction: SaveEventByTransactionRequest = {
          contract_address: contractAddress,
          network_id: networkId,
          transaction_hash: hash,
        }
        await MarketplaceService.saveEventByTransaction(bidAction)
      }
      onClose()
      hideLoading()
      successToast('You have successfully bid in this item.')
      refetchAssetDetails()
    },
    []
  )

  const handleBid = useCallback(
    async (
      inputValues: DeliverFormProps | any,
      deliveryType: string,
      isEscrow: boolean,
      onClose: () => void,
      hideLoading: () => void
    ) => {
      const contractAddress = asset.auctionDetails.contractAddress
      const token = getTokenKey(asset.networkId, asset.auctionDetails.erc20Token)
      const closingTime = Math.round(new Date(asset?.auctionDetails?.initialClosingTime).getTime() / 1000)
      const listTime = Math.round(new Date(asset?.auctionDetails?.startingTime).getTime() / 1000)
      const bidAmountWei = parseUnits(inputValues.bidAmount, token)

      const OrderTuple: OrderTuple = {
        basePrice: asset?.auctionDetails?.startingPrice,
        contractAddress: asset?.auctionDetails?.collectionAddress,
        expirationTime: closingTime,
        isTokenGated: asset?.auctionDetails?.isTokenGated,
        listingTime: listTime,
        nonce: Number(asset?.auctionDetails?.nonce),
        objId: asset?.id.toString(),
        orderType: asset?.redeemable ? 1 : 0,
        paymentToken: asset?.auctionDetails?.erc20Token,
        royaltyFee: Number(asset?.royalties ?? 0) * 100,
        royaltyReceiver: asset?.userObj?.walletAddress,
        seller: asset?.collectibleOwner,
        signature: asset?.auctionDetails?.signature,
        tokenGateAddress: asset?.auctionDetails?.tokenGateAddress,
        tokenId: asset?.tokenId ?? 0,
        uri: asset?.ipfsHash,
        // isEscrow: false, //TODO : Need to handle escrow
        // isMetamask: asset?.auctionDetails?.isMetamask ?? false,
      }

      try {
        const brokerTransactionHash: any = await bid(OrderTuple, bidAmountWei)
        if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
          await brokerTransactionHash?.wait()
        }
        if (brokerTransactionHash?.transactionHash || brokerTransactionHash.hash) {
          saveTransactionDetails(
            brokerTransactionHash?.transactionHash || brokerTransactionHash.hash,
            OrderTuple.objId,
            asset.auctionDetails.id,
            bidAmountWei,
            asset.networkId,
            contractAddress,
            isEscrow,
            inputValues,
            token,
            deliveryType,
            onClose,
            hideLoading
          )
        } else {
          warningToast(brokerTransactionHash)
          onClose()
          hideLoading()
        }
      } catch (err: any) {
        warningToast(err)
        onClose()
        hideLoading()
      }
    },
    []
  )

  return {
    handleBid,
  }
}
