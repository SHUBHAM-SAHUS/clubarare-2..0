import { useCallback, useState } from 'react'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { LoadingBoundary } from 'design-systems/Organisms/LoadingBoundary'
import { CollectionPageTemplate } from 'design-systems/Templates/CollectionPageTemplate'
import { SEO } from 'design-systems/Organisms/SEO'
import { PAGE_SEO_CONFIG } from 'appConfig'
import { useCollection } from 'hooks/api/useCollection'
import { useCollectionAssets } from 'hooks/api/useCollectionAssets'
import { useProfile } from 'hooks/api/useProfile'

const CollectionDetailPage: NextPage = () => {
  const router = useRouter()
  const collectionId = router?.query?.collectionId as string

  const [saleType, setSaleType] = useState<SaleType>('all')
  const { isLoadingCollection, collection, listAssetsToCollectionAsync, refetchCollectionDetail } =
    useCollection(collectionId)
  const {
    isLoadingCollectionAssets,
    isFetchingMoreCollectionAssets,
    collectionAssets,
    hasMoreCollectionAssets,
    fetchMoreCollectionAssets,
    refetchCollectionAssets,
    isRefetchingCollectionAssets,
  } = useCollectionAssets(collectionId, saleType)

  const isDefaultCollection = !collection?.walletAddress

  const { isLoadingUserProfile: isLoadingProfile, userProfile: profile } = useProfile(
    collection?.walletAddress as string
  )

  const handleRefetchCollectionAssets = useCallback((sale: SaleType) => {
    setSaleType(sale)
  }, [])

  const handleListAssetsToCollection = useCallback(
    async (assetIds: string[]) => {
      await listAssetsToCollectionAsync({ assetIds, collectionId })
    },
    [collectionId, listAssetsToCollectionAsync]
  )

  return (
    <>
      <SEO config={PAGE_SEO_CONFIG.product} />
      <LoadingBoundary
        loading={isLoadingCollection || !collection || (!isDefaultCollection && (isLoadingProfile || !profile))}
        size="full"
      >
        <CollectionPageTemplate
          assets={collectionAssets}
          collection={collection!}
          creator={profile ?? ({} as ProfileObject)}
          hasMoreAssets={Boolean(hasMoreCollectionAssets)}
          isFetchingMoreAssets={isFetchingMoreCollectionAssets}
          isLoadingAssets={isLoadingCollectionAssets || isRefetchingCollectionAssets}
          refetchCollectionAssets={refetchCollectionAssets}
          onFetchMoreAssets={fetchMoreCollectionAssets}
          onListAssetsToCollection={handleListAssetsToCollection}
          onRefetchAssets={handleRefetchCollectionAssets}
          onRefetchCollectionDetail={refetchCollectionDetail}
        />
      </LoadingBoundary>
    </>
  )
}

export default CollectionDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.collection,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
