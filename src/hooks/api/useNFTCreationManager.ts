import { useQuery } from 'wagmi'
import { useMemo } from 'react'

import { CollectionService } from 'api-services'
import { QUERIES } from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'

export const useNFTCreationManager = () => {
  const { authUser: activatingUser } = useGlobalState()
  const networkId = activatingUser?.networkId

  const {
    isLoading: isLoadingCollectionList,
    data: collectionList,
    refetch: refetchCollectionList,
  } = useQuery(
    [QUERIES.PRIVATE.GET_ALL_COLLECTIONS, networkId],
    () => CollectionService.getAllCollections({ network_id: networkId }),
    { enabled: Boolean(networkId), select: res => res.data }
  )

  const collectionListAssets = collectionList?.map(
    (data: CollectionAssetObject) =>
      ({
        id: data?.id,
        collectionAddress: data?.collectionAddress,
        chain: data?.chain,
        displayName: data?.displayName,
      } as CollectionAssetObject)
  )

  return useMemo(
    () => ({
      isLoadingCollectionList,
      collectionListAssets,
      refetchCollectionList,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoadingCollectionList, collectionList, refetchCollectionList]
  )
}
