import { useQuery } from 'wagmi'

import { AssetService, MarketplaceService } from 'api-services'
import { QUERIES } from 'utils'

export const useSingleAsset = (productId: string, address: string | undefined) => {
  const {
    isLoading: isLoadingAsset,
    data: asset,
    refetch: refetchAssetDetails,
  } = useQuery(
    [QUERIES.PUBLIC.GET_SINGLE_NFT, productId],
    () =>
      AssetService.getAsset({
        collectible_id: productId,
        wallet_address: address,
      }),
    { enabled: !!productId, select: res => res.data }
  )

  const {
    isLoading: isLoadingGetVaultItemStatus,
    data: getVaultItemStatus,
    refetch: refetchGetVaultItemStatus,
  } = useQuery(
    [QUERIES.PRIVATE.GET_VAULT_ITEM_STATUS, productId],
    () =>
      MarketplaceService.checkVaultItemStatus({
        collectible_id: productId,
      }),
    { enabled: !!productId, select: res => res.data }
  )

  return {
    asset: asset ?? ({} as SingleAssetResponse['data']),
    getVaultItemStatus,
    isLoadingAsset,
    isLoadingGetVaultItemStatus,
    refetchAssetDetails,
    refetchGetVaultItemStatus,
  }
}
