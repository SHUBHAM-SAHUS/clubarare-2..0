/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import { useMarketPlaceValidatorContract } from './useMarketplaceValidatorContract'
import { useMarketPlaceContract } from './useMarketplaceContract'
import { useSingleAsset } from './api/useSingleAsset'
import { useGlobalState } from './store/useGlobalState'

import { MarketplaceService } from 'api-services'
import { useToast } from 'hooks/useToast'
import { CLUBRARE_NETWORKS } from 'utils'
import { DeliverFormProps } from 'design-systems/Molecules/Forms/BuyForm'
import { useConnector } from 'context'

export const useBuyService = (asset: AssetObject) => {
  const { address } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { _verifyOrderSig } = useMarketPlaceValidatorContract(asset?.networkId)
  const { buy, cancelledOrFinalized } = useMarketPlaceContract(asset?.networkId)
  const { refetchAssetDetails } = useSingleAsset(asset?.id, address)
  const { successToast, warningToast } = useToast()

  const brokerValidatorHandler = useCallback(async (orderTuple: OrderTuple) => {
    const brokerValidRes = await _verifyOrderSig(orderTuple)
    if (brokerValidRes && brokerValidRes[0]) {
      const isSigInvalid = await cancelledOrFinalized(brokerValidRes[0])
      return isSigInvalid
    } else {
      return true
    }
  }, [])
  // change it
  const saveTransactionDetails = useCallback(
    async (
      hash: string,
      objId: string,
      auction_id: string,
      amount: string,
      networkId: string,
      contractAddress: string,
      isEscrow: boolean,
      inputValues: DeliverFormProps,
      currency: string,
      deliveryType: string,
      orderType: number,
      onClose: () => void,
      hideLoading: () => void
    ) => {
      //if item redeemable then only create escrow order
      if (orderType === 1) {
        const buyAction: CreateEscrowOrderRequest = {
          collectible_id: objId,
          auction_id: auction_id,
          amount: amount,
          network_id: networkId,
          currency: currency,
          delivery_type: deliveryType,
          full_name: inputValues.name,
          email: inputValues.email,
          address: inputValues.address,
          state: inputValues.state,
          country: inputValues?.country,
          zip_code: inputValues?.zip,
          city: inputValues?.city,
          phone_number: inputValues?.phone,
          transaction_hash: hash,
          isEscrow: isEscrow,
        }
        await MarketplaceService.createEscrowOrder(buyAction)
      }
      if (!isEscrow) {
        const data: SaveEventByTransactionRequest = {
          transaction_hash: hash,
          contract_address: contractAddress,
          network_id: networkId,
        }
        await MarketplaceService.saveEventByTransaction(data)
      }
      onClose()
      hideLoading()
      successToast("You've successfully buy this item")
      refetchAssetDetails()
    },
    []
  )
  //  handle buy
  const handleBuy = useCallback(
    async (
      inputValues: DeliverFormProps | any,
      buyModelData: any,
      deliveryType: string,
      isEscrow: boolean,
      onClose: () => void,
      hideLoading: () => void
    ) => {
      const price = asset?.auctionDetails?.buyPrice
      const collectionAddress = asset?.auctionDetails?.collectionAddress
      const contractAddress = asset.auctionDetails.contractAddress
      const listTime = Math.round(new Date(asset?.auctionDetails?.startingTime).getTime() / 1000)
      const nonceData = Number(asset?.auctionDetails?.nonce)
      const tokenId = asset?.tokenId ?? 0
      const isTokenGated = asset?.auctionDetails?.isTokenGated
      const tokenGateAddress = asset?.auctionDetails?.tokenGateAddress
      const signature = asset?.auctionDetails?.signature
      const orderType = asset?.redeemable ? 1 : 0

      //  order Tuple
      const OrderTuple: OrderTuple = {
        seller: asset?.collectibleOwner,
        contractAddress: collectionAddress,
        royaltyFee: Number(asset?.royalties ?? 0) * 100,
        royaltyReceiver: asset?.userObj?.walletAddress,
        paymentToken: asset?.auctionDetails?.erc20Token,
        basePrice: price.toString(),
        listingTime: listTime,
        expirationTime: 0,
        nonce: nonceData,
        tokenId: tokenId,
        orderType: orderType,
        signature: signature,
        uri: asset?.ipfsHash,
        objId: asset?.id.toString(),
        isTokenGated: isTokenGated,
        tokenGateAddress: tokenGateAddress,
        // isEscrow: false, //TODO : Need to handle escrow
        // isMetamask: asset?.auctionDetails?.isMetamask ?? false,
      }

      const isSigInvalid = await brokerValidatorHandler(OrderTuple)
      if (isSigInvalid) {
        warningToast('There is some issue, Please try again later')
        onClose()
        hideLoading()

        return
      }
      try {
        const brokerTransactionHash: any = await buy(collectionAddress, tokenId, price.toString(), OrderTuple)
        if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
          await brokerTransactionHash?.wait()
        }
        if (brokerTransactionHash?.hash || brokerTransactionHash?.transactionHash) {
          saveTransactionDetails(
            brokerTransactionHash.hash || brokerTransactionHash?.transactionHash,
            OrderTuple.objId,
            asset.auctionDetails.id,
            price,
            asset.networkId,
            contractAddress,
            isEscrow, //TODO : isEscrow Need to handle escrow
            inputValues,
            buyModelData.currency,
            deliveryType,
            orderType,
            onClose,
            hideLoading
          )
        } else {
          warningToast(brokerTransactionHash)
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

  return { handleBuy }
}
