import { FavoritesService } from 'api-services'
import { QUERIES, PAGE_SIZE } from 'utils'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'

const QUERY_KEY = [QUERIES.PRIVATE.GET_FAVORITES]

export const useFavorites = (query: {
  network_id?: ClubRareNetworks
  type?: string | number
  redeemable?: boolean
}) => {
  const {
    isLoading: isLoadingFavorite,
    data: FavoritesData,
    refetch: refetchFavorites,
    isRefetching: isRefetchingFavorites,
    hasNextPage: hasMoreFavorites,
    isFetchingNextPage: isFetchingNextFavorites,
    fetchNextPage: fetchMoreFavorites,
  } = usePaginatedQuery(
    QUERY_KEY,
    ({ page_number, page_size, ...props }) =>
      FavoritesService.getFavorites({
        ...props,
        page_size: page_size ?? PAGE_SIZE,
        page_number: page_number ?? 1,
      }),
    res => res?.data,
    {},
    {
      type: query?.type,
      redeemable: query?.redeemable,
    }
  )

  const Favorites =
    FavoritesData?.filter(Favorites => Boolean(Favorites?.data))
      .map(Favorites => Favorites?.data as AssetObject[])
      ?.flat() ?? []

  return {
    isLoadingFavorite,
    Favorites,
    refetchFavorites,
    isRefetchingFavorites,
    hasMoreFavorites,
    isFetchingNextFavorites,
    fetchMoreFavorites,
  }
}
