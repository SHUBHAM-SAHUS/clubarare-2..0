import { useCallback, useMemo } from 'react'
import { useMutation } from 'wagmi'
import { FieldValues } from 'react-hook-form'

import { CollectionService } from 'api-services'
import { CollectionType } from 'design-systems/Organisms/Managers/NFTCreationManager'
import { CLUBRARE_NETWORKS } from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useCollectionFactoryContract } from 'hooks/useCollectionFactoryContract'

export const useCreateCollection = () => {
  const { authUser: activatingUser } = useGlobalState()
  const { createCollectionFromFactory } = useCollectionFactoryContract(activatingUser?.networkId)

  const { mutate: createCollection, mutateAsync: createCollectionAsync } = useMutation((data: FormData | FieldValues) =>
    CollectionService.createCollection(data)
  )

  const { mutate: updateCollection, mutateAsync: updateCollectionAsync } = useMutation((data: UpdateCollectionQuery) =>
    CollectionService.updateCollection(data)
  )

  /**
   * Creates an on-chain or off-chain collection and returns the collection data.
   *
   * @param values - The form data for the collection.
   * @returns The collection data.
   */
  const createNewCollection = useCallback(
    async (values: FieldValues) => {
      try {
        // If the collection is an on-chain collection, create it on-chain and update its data.
        if (values.chain === CollectionType.ON_CHAIN_COLLECTION) {
          let collectionAddress
          let transaction
          // Create the collection on-chain using the display name, symbol, and IPFS hash.
          const onChainCollectionResponse = await createCollectionFromFactory(
            values.displayName,
            values.symbol,
            values.ipfsHash
          )
          if (values.networkId === CLUBRARE_NETWORKS.ETHEREUM) {
            const { events, transactionHash } = await onChainCollectionResponse.wait()
            collectionAddress = events[5]?.args[1]
            transaction = transactionHash
          } else {
            collectionAddress = onChainCollectionResponse.events.CollectionCreated.returnValues.collection
            transaction = onChainCollectionResponse.transactionHash
          }
          const onChainCollection: CreateCollectionResponse = await createCollectionAsync({
            ...values,
            collectionAddress,
          })
          return onChainCollection
        } else {
          // If the collection is off-chain, return the collection data.
          const offChainCollection: CreateCollectionResponse = await createCollectionAsync(values)
          return offChainCollection
        }
      } catch (error) {
        console.error(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createCollectionFromFactory]
  )

  return useMemo(
    () => ({
      createCollection,
      createCollectionAsync,
      createNewCollection,
      updateCollection,
      updateCollectionAsync,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createCollection, createCollectionAsync, createNewCollection, updateCollection, updateCollectionAsync]
  )
}
