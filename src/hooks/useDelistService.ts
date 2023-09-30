import { useGlobalState } from './store/useGlobalState'
import { useSingleAsset } from './api/useSingleAsset'
import { useMarketPlaceContract } from './useMarketplaceContract'

import { useToast } from 'hooks/useToast'
import { AUCTION_TYPES, CLUBRARE_NETWORKS, DEFAULT_KLAYTN_CHAIN_ID } from 'utils'
import { useConnector } from 'context'
import { MarketplaceService } from 'api-services'

export const useDelistService = (asset: AssetObject) => {
  const { address, chainId } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { invalidateSignedOrder } = useMarketPlaceContract(asset?.networkId)
  const { refetchAssetDetails } = useSingleAsset(asset?.id, address)
  const { successToast, warningToast } = useToast()

  const delistCollectible = async (hideLoading: () => void) => {
    const contractAddress = asset?.auctionDetails?.contractAddress
    const collectionAddress = asset?.auctionDetails?.collectionAddress
    const auctionType: string = asset?.auctionDetails?.auctionType
    const priceVal =
      auctionType === AUCTION_TYPES.FIXED ? asset?.auctionDetails?.buyPrice : asset?.auctionDetails?.startingPrice
    const closingTime: any = Math.round(new Date(asset?.auctionDetails?.initialClosingTime).getTime() / 1000)
    const listTime = Math.round(new Date(asset?.auctionDetails?.startingTime).getTime() / 1000)
    const endTime = auctionType === AUCTION_TYPES.FIXED ? 0 : closingTime

    const deListQuery: OrderTuple = {
      seller: asset?.collectibleOwner,
      contractAddress: collectionAddress,
      royaltyFee: Number(asset?.royalties ?? 0) * 100,
      royaltyReceiver: asset?.userObj?.walletAddress,
      paymentToken: asset?.auctionDetails?.erc20Token,
      basePrice: priceVal,
      listingTime: listTime,
      expirationTime: endTime,
      nonce: Number(asset?.auctionDetails?.nonce),
      tokenId: asset?.tokenId ? asset.tokenId : 0,
      orderType: asset?.redeemable ? 1 : 0,
      signature: asset?.auctionDetails?.signature,
      uri: asset?.ipfsHash,
      objId: asset?.id.toString(),
      isTokenGated: asset?.auctionDetails?.isTokenGated,
      tokenGateAddress: asset?.auctionDetails?.tokenGateAddress,
      // isEscrow: false, //TODO: need to check escrow here
      // isMetamask: asset?.auctionDetails?.isMetamask ?? false,
    }

    try {
      const brokerTransactionHash: any = await invalidateSignedOrder(deListQuery)
      if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
        await brokerTransactionHash?.wait()
      }
      let hash = brokerTransactionHash?.hash //in eth case
      if (brokerTransactionHash?.transactionHash) {
        // in Klaytn Case
        hash = brokerTransactionHash.transactionHash
      }
      if (hash) {
        const delistAction = {
          transaction_hash: hash,
          contract_address: contractAddress,
          network_id: chainId === DEFAULT_KLAYTN_CHAIN_ID ? CLUBRARE_NETWORKS.KLAYTN : CLUBRARE_NETWORKS.ETHEREUM,
        }
        await MarketplaceService.saveEventByTransaction(delistAction)
        hideLoading()
        refetchAssetDetails()
        successToast('Item delist successfully')
      } else {
        hideLoading()
        warningToast('Error: while delist item!')
      }
    } catch (err: any) {
      hideLoading()
      warningToast(
        'There is something wrong!, Check if you have enough balance to pay transaction fee? or Please try again later'
      )
    }
  }

  return {
    delistCollectible,
  }
}
