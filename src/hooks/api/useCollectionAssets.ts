import { useMemo } from 'react'

import { usePaginatedQuery } from 'hooks/usePaginatedQuery'
import { PAGE_SIZE, QUERIES } from 'utils'
import { AssetService } from 'api-services'

export const useCollectionAssets = (collectionId: string, saleType: SaleType) => {
  const {
    isLoading: isLoadingCollectionAssets,
    data: paginatedCollectionAssetData,
    isFetchingNextPage: isFetchingMoreCollectionAssets,
    isRefetching: isRefetchingCollectionAssets,
    hasNextPage: hasMoreCollectionAssets,
    fetchNextPage: fetchMoreCollectionAssets,
    refetch: refetchCollectionAssets,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.NFT.GET_ALL_BY_COLLECTION, collectionId, saleType],
    ({ page_number, page_size, ...props }) =>
      AssetService.getAssets({
        ...props,
        page_size: page_size ?? PAGE_SIZE,
        page_number: page_number ?? 1,
      }),
    res => res.data,
    {
      cacheTime: 0,
      enabled: Boolean(collectionId) && Boolean(saleType),
    },
    {
      collection_address: collectionId,
      sale_type: saleType,
    }
  )

  const collectionAssets = useMemo(
    () =>
      paginatedCollectionAssetData
        ?.filter(collectionAssetData => Boolean(collectionAssetData?.data))
        ?.map(collectionAssetData => collectionAssetData?.data)
        .flat() ?? [],
    [paginatedCollectionAssetData]
  )

  return useMemo(
    () => ({
      isLoadingCollectionAssets,
      hasMoreCollectionAssets,
      collectionAssets,
      isFetchingMoreCollectionAssets,
      fetchMoreCollectionAssets,
      refetchCollectionAssets,
      isRefetchingCollectionAssets,
    }),
    [
      isLoadingCollectionAssets,
      hasMoreCollectionAssets,
      collectionAssets,
      isFetchingMoreCollectionAssets,
      isRefetchingCollectionAssets,
    ]
  )
}
