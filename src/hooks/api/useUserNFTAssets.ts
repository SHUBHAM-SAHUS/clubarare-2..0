import { useMemo } from 'react'

import { UserNFTService } from 'api-services'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'
import { QUERIES, HOME_PAGE_SIZE } from 'utils'

export const useUserNFTAssets = (walletAddress: string, type: string, redeemable: boolean) => {
  const {
    isLoading: isLoadingUserNFTAssets,
    data: UserNFTData,
    refetch: refetchUserAssets,
    isRefetching: isRefetchingUserAssets,
    hasNextPage: hasMoreUserAssets,
    isFetchingNextPage: isFetchingNextUserAssets,
    fetchNextPage: fetchMoreAssets,
  } = usePaginatedQuery(
    [QUERIES.PRIVATE.GET_USER_NFT, walletAddress, type, redeemable],
    ({ page_number, page_size, ...props }) =>
      UserNFTService.getAllUserNFT({
        ...props,
        page_size: HOME_PAGE_SIZE,
        page_number: page_number ?? 1,
        wallet_address: walletAddress,
        redeemable: redeemable,
        type: type,
      }),
    res => res.data,
    { enabled: Boolean(walletAddress) }
  )

  const userNFTAssets = useMemo(
    () => UserNFTData?.map(userNFT => userNFT.data as AssetObject[]).flat() ?? [],
    [UserNFTData]
  )

  return useMemo(
    () => ({
      isLoadingUserNFTAssets,
      userNFTAssets,
      isRefetchingUserAssets,
      hasMoreUserAssets,
      isFetchingNextUserAssets,
      refetchUserAssets,
      fetchMoreAssets,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasMoreUserAssets, isFetchingNextUserAssets, isLoadingUserNFTAssets, isRefetchingUserAssets, userNFTAssets]
  )
}
