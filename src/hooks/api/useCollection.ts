import { useMemo } from 'react'
import { useMutation, useQuery } from 'wagmi'
import { FieldValues } from 'react-hook-form'

import { CollectionService } from 'api-services'
import { QUERIES } from 'utils'

export const useCollection = (collectionId: string) => {
  const {
    isLoading: isLoadingCollection,
    data: collection,
    refetch: refetchCollectionDetail,
  } = useQuery(
    [QUERIES.PUBLIC.GET_COLLECTION_DETAILS, collectionId],
    () => CollectionService.getCollection({ collection_address: collectionId }),
    { enabled: Boolean(collectionId), select: res => res.data.collectionsInfo }
  )

  const { mutate: listAssetsToCollection, mutateAsync: listAssetsToCollectionAsync } = useMutation(
    ({ collectionId, assetIds }: { collectionId: string; assetIds: string[] }) =>
      CollectionService.changeCollectionOfNFT({ id: collectionId, nfts: assetIds })
  )

  const { mutateAsync: onValidateCustomURLAsync } = useMutation(
    ({ id, customUrl }: { id: string; customUrl: string }) =>
      CollectionService.validateCustomURLCollection({
        custom_url: customUrl,
        id,
      })
  )

  const { mutateAsync: onUpdateCollectionDetailAsync } = useMutation(
    ({ id, data }: { id: string; data: FieldValues | FormData }) => CollectionService.updateCollectionDetail(id, data)
  )

  return useMemo(
    () => ({
      isLoadingCollection,
      collection,
      refetchCollectionDetail,
      listAssetsToCollection,
      listAssetsToCollectionAsync,
      onValidateCustomURLAsync,
      onUpdateCollectionDetailAsync,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoadingCollection, collection]
  )
}
