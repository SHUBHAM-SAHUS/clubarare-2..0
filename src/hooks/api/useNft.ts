import { NftService } from 'api-services'
import { QUERIES, PAGE_SIZE } from 'utils'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'

const QUERY_KEY = [QUERIES.PRIVATE.GET_DASHBOARD_NFT]

export const useNFT = (query: { network_id?: ClubRareNetworks; type?: string | number; redeemable?: boolean }) => {
  const {
    isLoading: isLoadingNFT,
    data: nftsData,
    refetch: refetchNfts,
    isRefetching: isRefetchingNfts,
    hasNextPage: hasMoreNfts,
    isFetchingNextPage: isFetchingNextNfts,
    fetchNextPage: fetchMoreNfts,
  } = usePaginatedQuery(
    QUERY_KEY,
    ({ page_number, page_size, ...props }) =>
      NftService.getAllNFT({
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

  const NFTs =
    nftsData
      ?.filter(nfts => Boolean(nfts?.data))
      .map(nfts => nfts?.data as AssetObject[])
      ?.flat() ?? []

  return {
    NFTs,
    fetchMoreNfts,
    hasMoreNfts,
    isFetchingNextNfts,
    isLoadingNFT,
    isRefetchingNfts,
    refetchNfts,
  }
}
