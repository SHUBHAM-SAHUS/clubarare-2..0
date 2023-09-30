/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { DashboardStats, CollectionService } from 'api-services'
import { QUERIES, PAGE_SIZE } from 'utils'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'

export const useDashboard = (networkId?: ClubRareNetworks) => {
  const { isLoading: isLoadingStats, data: stats } = useQuery(
    [QUERIES.PRIVATE.GET_USER_DASHBOARD_STATS],
    () => DashboardStats.getStats(),
    {
      select: res => res.data,
    }
  )

  const {
    isLoading: isLoadingCollections,
    data: collectionsData,
    refetch: refetchCollections,
    isRefetching: isRefetchingCollections,
    hasNextPage: hasMoreCollections,
    isFetchingNextPage: isFetchingNextCollections,
    fetchNextPage: fetchMoreCollections,
  } = usePaginatedQuery(
    [QUERIES.PRIVATE.GET_ALL_COLLECTIONS],
    ({ page_number, page_size, ...props }) =>
      CollectionService.getAllCollections({
        ...props,
        page_size: page_size ?? PAGE_SIZE,
        page_number: page_number ?? 1,
      }),
    res => res?.data,
    {},
    {
      network_id: networkId,
    }
  )

  const collections =
    collectionsData
      ?.filter(nfts => Boolean(nfts?.data))
      .map(nfts => nfts.data as CollectionAssetObject)
      ?.flat() ?? []

  return useMemo(
    () => ({
      isLoadingStats,
      stats,
      // get all collection use in dashboard page
      isLoadingCollections,
      collections,
      refetchCollections,
      isRefetchingCollections,
      hasMoreCollections,
      isFetchingNextCollections,
      fetchMoreCollections,
    }),
    [
      collections,
      hasMoreCollections,
      isFetchingNextCollections,
      isLoadingCollections,
      isLoadingStats,
      isRefetchingCollections,
      stats,
    ]
  )
}
