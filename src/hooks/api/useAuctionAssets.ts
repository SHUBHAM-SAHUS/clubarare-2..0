import { useMemo } from 'react'

import { AuctionService } from 'api-services'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'
import { QUERIES, HOME_PAGE_SIZE } from 'utils'

export enum AuctionAssetListTypes {
  RECENT = 'recent',
  LIVE = 'live',
  MOST_VIEWED = 'most-viewed',
  PREV_SALES = 'prev-sales',
}

export const useAuctionAssets = (type: AuctionAssetListTypes) => {
  const {
    isLoading: isLoadingRecentAuctionAssets,
    data: recentAuctionsData,
    refetch: refetchAuctionsData,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.RECENT_AUCTIONS_NFT_LIST],
    ({ page_number, ...props }) =>
      AuctionService.getRecentAuctions({ ...props, page_number: page_number ?? 1, page_size: HOME_PAGE_SIZE }),
    res => res.data,
    { enabled: type === 'recent' }
  )

  const {
    isLoading: isLoadingLiveAuctionAssets,
    data: liveAuctionsData,
    refetch: refetchLiveAuctionsData,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.LIVE_AUCTIONS_NFT_LIST],
    ({ page_number, ...props }) =>
      AuctionService.getLiveAuctions({ ...props, page_number: page_number ?? 1, page_size: HOME_PAGE_SIZE }),
    res => res.data,
    { enabled: type === 'live' }
  )

  const {
    isLoading: isLoadingMostViewedAssets,
    data: mostViewedAssetsData,
    refetch: refetchMostViewedAssets,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.MOST_VIEWED_NFT_LIST],
    ({ page_number, ...props }) =>
      AuctionService.getMostViewedAuctions({
        ...props,
        page_number: page_number ?? 1,
        page_size: HOME_PAGE_SIZE,
      }),
    res => res.data,
    { enabled: type === 'most-viewed' }
  )

  const {
    isLoading: isLoadingPrevSaleAssets,
    data: prevSaleAssetsData,
    refetch: refetchPrevSaleAuctions,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.PREV_SALES_LIST],
    ({ page_number, ...props }) =>
      AuctionService.getPrevSaleAuctions({
        ...props,
        page_number: page_number ?? 1,
        page_size: HOME_PAGE_SIZE,
      }),
    res => res.data,
    { enabled: type === 'prev-sales' }
  )

  const recentAuctionAssets = useMemo(
    () => recentAuctionsData?.map(recentAuction => recentAuction.data as AssetObject[]).flat() ?? [],
    [recentAuctionsData]
  )

  const liveAuctionAssets = useMemo(
    () =>
      liveAuctionsData
        ?.map(liveAuction => liveAuction.data as AssetObject[])
        .flat()
        .filter(Boolean) ?? [],
    [liveAuctionsData]
  )

  const mostViewedAssets = useMemo(
    () => mostViewedAssetsData?.map(assets => assets?.data).flat() ?? [],
    [mostViewedAssetsData]
  )

  const prevSaleAssets = useMemo(
    () => prevSaleAssetsData?.map(assets => assets?.data).flat() ?? [],
    [prevSaleAssetsData]
  )

  return {
    isLoadingLiveAuctionAssets,
    isLoadingMostViewedAssets,
    isLoadingPrevSaleAssets,
    isLoadingRecentAuctionAssets,
    liveAuctionAssets,
    mostViewedAssets,
    prevSaleAssets,
    recentAuctionAssets,
    refetchAuctionsData,
    refetchLiveAuctionsData,
    refetchMostViewedAssets,
    refetchPrevSaleAuctions,
  }
}
