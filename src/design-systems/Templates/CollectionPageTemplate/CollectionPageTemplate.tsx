import React, { useCallback, useMemo } from 'react'

import { CollectionPageTemplateProps } from './interfaces'

import { CollectionBanner } from 'design-systems/Organisms/Banners/CollectionBanner'
import { CollectionHeader } from 'design-systems/Molecules/Headers/CollectionHeader'
import { CollectionModel } from 'design-systems/Molecules/Modals/CollectionModal'
import { Layout } from 'design-systems/Organisms/Layout'
import { NFTCardList } from 'design-systems/Organisms/List/NFTCardList'
import { OverlayIds } from 'design-systems/Organisms/Managers/OverlayManager'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import { useModal } from 'design-systems/Atoms/Modal'
import { useOverlay } from 'context'
import { compareStringsInsentively } from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useToggle } from 'hooks/useToggle'

export const CollectionPageTemplate: React.FC<CollectionPageTemplateProps> = ({
  collection,
  creator,
  assets,
  hasMoreAssets,
  isLoadingAssets,
  isFetchingMoreAssets,
  onFetchMoreAssets,
  // onRefetchAssets,
  onListAssetsToCollection,
  onRefetchCollectionDetail,
  refetchCollectionAssets,
}) => {
  const { authUser: currentUser } = useGlobalState()
  const { openOverlay } = useOverlay()

  // const [saleType, setSaleType] = useState<SaleType>('all')
  const [showModal, toggleShowModal] = useToggle(false)

  const isCollectionCreator = useMemo(
    () => Boolean(currentUser?.id) && currentUser?.id === creator.id,
    [currentUser, creator]
  )
  const isDeployed = Boolean(collection.collectionAddress)

  const collectibleAssets = useMemo(
    () =>
      assets?.filter(
        asset => currentUser && compareStringsInsentively(currentUser.walletAddress, asset.ownerObj?.walletAddress)
      ) ?? [],
    [assets, currentUser]
  )

  const handleListNFTsToCollection = useCallback(
    async ({ nfts }: { nfts: string[] }) => {
      await onListAssetsToCollection(nfts)
    },
    [onListAssetsToCollection]
  )

  const handleEditCollection = useCallback(() => {
    openOverlay(OverlayIds.EDIT_COLLECTION, {
      collection: {
        ...collection,
        avatar: collection.avatar || creator.image,
      },
      refetchCollection: onRefetchCollectionDetail,
    })
  }, [collection, creator.image, onRefetchCollectionDetail, openOverlay])

  // const handleSelectOption = useCallback(
  //   (option?: SaleType) => {
  //     if (option === saleType) return
  //     setSaleType(option!)
  //     onRefetchAssets(option!)
  //   },
  //   [onRefetchAssets, saleType]
  // )

  const { Modal: CollectionModal } = useModal(
    <CollectionModel
      NFTDetails={collectibleAssets}
      changeNFT={handleListNFTsToCollection}
      collectionId={collection.id}
      onClose={toggleShowModal}
    />,
    'add/remove nfts'
  )

  return (
    <>
      <CollectionBanner alt="collection banner image" collectionBannerImage={collection.bannerImage} />
      <Layout className="px-4 pb-16 xl:container xl:mx-auto xl:px-0">
        <div className="container relative z-10 mx-auto -mt-10 !max-w-1184">
          <CollectionHeader
            collectionName={collection.displayName}
            description={collection.description}
            editable={isCollectionCreator && !isDeployed}
            id={collection.id}
            user={{
              avatar: creator.image,
              creatorName: creator.name,
              verified: collection.ownerVerified,
            }}
            viewCount={collection.totalView}
            onEdit={handleEditCollection}
          />
        </div>
        {/* <div className="items-center justify-between py-8 sm:block md:flex ">
          <BadgeList<SaleType>
            options={SaleTypes}
            initialSelectedOption={saleType}
            onSelectOption={handleSelectOption}
          />
          {isCollectionCreator && !isDeployed && (
            <Button
              variant="outlined"
              color="primary"
              className="whitespace-nowrap uppercase sm:ml-auto sm:mr-0"
              onClick={toggleShowModal}
            >
              ADD / REMOVE
            </Button>
          )}
        </div> */}
        <NFTCardList
          assets={assets}
          isFetchingNextAssets={isFetchingMoreAssets}
          isLoading={isLoadingAssets}
          refetchAssets={refetchCollectionAssets}
        />
        <ScrollTrigger
          isLoading={isLoadingAssets || isFetchingMoreAssets}
          onTrigger={() => !isLoadingAssets && !isFetchingMoreAssets && hasMoreAssets && onFetchMoreAssets?.()}
        />

        {/* TODO move to modal manager */}
        {showModal && (
          <div className="h-full w-full">
            <CollectionModal />
          </div>
        )}
      </Layout>
    </>
  )
}

// const SaleTypes = SALE_TYPE_BUTTONS.map(sale => ({
//   value: sale.id,
//   title: sale.title,
// }))
