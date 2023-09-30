import { useMemo } from 'react'

import { usePaginatedQuery } from 'hooks/usePaginatedQuery'
import { PAGE_SIZE, QUERIES } from 'utils'
import { AssetService } from 'api-services'

/**
 * Filter nfts
 */
export const useAssets = (filters: AssetFilters) => {
  const {
    isLoading: isLoadingAssets,
    data: assetData,
    refetch: refetchAssets,
    isRefetching: isRefetchingAssets,
    hasNextPage: hasMoreAssets,
    isFetchingNextPage: isFetchingNextAssets,
    fetchNextPage: fetchMoreAssets,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.EXPLORE, ...Object.values(filters)],
    ({ page_number, page_size, ...props }) =>
      AssetService.getAssets({
        ...props,
        page_number: page_number ?? 1,
        page_size: page_size ?? PAGE_SIZE,
      }),
    res => res.data,
    {
      cacheTime: 0,
    },
    {
      category: filters.category,
      max_price: filters.toPrice,
      min_price: filters.fromPrice,
      network_id: filters.networkId,
      redeemable: filters.redeemable,
      sale_only: filters.saleOnly,
      sale_type: filters.saleType,
      search: filters.search,
      sort: filters.sort,
      token: filters.fromPrice || filters.toPrice ? filters.token : '',
    }
  )

  const assets =
    assetData
      ?.filter(asset => Boolean(asset.data))
      .map(asset => asset.data as AssetObject)
      ?.flat() ?? []

  return useMemo(
    () => ({
      assets,
      fetchMoreAssets,
      hasMoreAssets,
      isFetchingNextAssets,
      isLoadingAssets,
      isRefetchingAssets,
      refetchAssets,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [assets, hasMoreAssets, isFetchingNextAssets, isLoadingAssets, isRefetchingAssets]
  )
}
