import { useMemo } from 'react'

import { CollectionCard } from 'design-systems/Molecules/Cards/CollectionCard'
import { NFTCardSkeleton } from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { NotFound } from 'design-systems/Molecules/NotFound'
export interface CollectionCardListProps {
  isLoading?: boolean
  isFetchingNextAssets?: boolean
  collections: CollectionAssetObject[]
  showFilter?: boolean
}

const CollectionCardPlaceholderList: React.FC = () => {
  return (
    <>
      {Array.from(new Array(12)).map((_, index) => (
        <NFTCardSkeleton key={index} />
      ))}
    </>
  )
}

export const CollectionCardList: React.FC<CollectionCardListProps> = ({
  collections,
  isLoading = false,
  showFilter,
  isFetchingNextAssets = false,
}) => {
  const hasNFTs = !!collections?.length
  const className = useMemo(
    () =>
      showFilter
        ? 'grid grid-cols-2 mt-6 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
        : 'grid w-full grid-cols-2 mt-6 gap-4 lg:grid-cols-3 xl:grid-cols-4',
    [showFilter]
  )

  if (!isLoading && !hasNFTs) {
    return <NotFound />
  }

  return (
    <div className={className}>
      {isLoading ? (
        <CollectionCardPlaceholderList />
      ) : (
        collections?.map(collection => (
          <CollectionCard
            editable={true}
            id={collection.collectionAddress ?? collection.id}
            key={collection.id}
            product={{
              networkId: collection?.networkId,
              title: collection?.displayName,
              file: {
                alt: collection?.displayName,
                src: collection?.bannerImage ?? '',
                type: 'image/jpeg',
              },
            }}
            size="large"
            user={{
              avatar: collection?.imageId,
              username: collection?.displayName,
            }}
          />
        ))
      )}
      {isFetchingNextAssets ? <CollectionCardPlaceholderList /> : ''}
    </div>
  )
}
