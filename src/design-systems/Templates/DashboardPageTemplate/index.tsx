import { useMemo, useState, useEffect, useCallback } from 'react'

import { categories, getCategoryNames, initialUserDetails, TAB } from './utils'
import type { IFilter } from './interface'

import { Layout } from 'design-systems/Organisms/Layout'
import { Tabs } from 'design-systems/Molecules/Tabs'
import { DashboardHeader } from 'design-systems/Molecules/Headers/DashboardHeader'
import { NFTCardList } from 'design-systems/Organisms/List/NFTCardList'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import { CollectionCardList } from 'design-systems/Organisms/List/CollectionCardList'
import { CategoryList } from 'design-systems/Organisms/List/CategoryList'
import { shortWalletAddress } from 'utils'
import { useDashboard } from 'hooks/api/useDashboard'
import { useFavorites } from 'hooks/api/useFavorites'
import { useFollowers } from 'hooks/api/useFollowers'
import { useNFT } from 'hooks/api/useNft'
import { useGlobalState } from 'hooks/store/useGlobalState'

export function DashboardPageTemplate() {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const { authUser: activatingUser } = useGlobalState()
  const { followers } = useFollowers()

  const [filters, setFilters] = useState<IFilter>({
    networkId: activatingUser?.networkId,
    redeemable: false,
    type: 'all',
  })

  const { isLoadingNFT, NFTs, refetchNfts, isRefetchingNfts, hasMoreNfts, isFetchingNextNfts, fetchMoreNfts } =
    useNFT(filters)

  const {
    stats,
    isLoadingCollections,
    collections,
    refetchCollections,
    isRefetchingCollections,
    hasMoreCollections,
    isFetchingNextCollections,
    fetchMoreCollections,
  } = useDashboard(filters?.networkId)

  const {
    isLoadingFavorite,
    Favorites,
    refetchFavorites,
    isRefetchingFavorites,
    hasMoreFavorites,
    isFetchingNextFavorites,
    fetchMoreFavorites,
  } = useFavorites(filters)

  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const activeUserFormate = useMemo(() => {
    return {
      ...initialUserDetails,
      followersCount: followers ? followers?.follower?.length : 0,
      followingCount: followers ? followers?.following?.length : 0,
      nftDetails: {
        collections: stats?.totalCollections || 0,
        nftsListed: stats?.nftListed || 0,
        nftsSold: stats?.nftSold || 0,
        totalSales: stats?.totalSale || 0,
        totalViews: stats?.totalView || 0,
      },
      profileDetails: activatingUser?.bio || 'no bio is there',
      profileName: activatingUser?.name || shortWalletAddress(activatingUser?.walletAddress),
      src: activatingUser?.image || '',
      verification: activatingUser?.isWhiteListedSeller ? 'verified' : '',
      walletAddress: activatingUser?.walletAddress,
    }
  }, [stats, followers, activatingUser])

  const NFTAssetsHandler = useMemo(() => {
    switch (currentTab) {
      case TAB.NFTS.id:
        return {
          NFTAssets: NFTs,
          NFTIsFetchingNextAssets: isFetchingNextNfts,
          NFTisLoading: isLoadingNFT || isRefetchingNfts,
          ScrollingIsLoading: isRefetchingNfts,
          onTrigger: () => !isFetchingNextNfts && hasMoreNfts && fetchMoreNfts?.(),
        }
      case TAB.FAVORITES.id:
        return {
          NFTAssets: Favorites,
          NFTIsFetchingNextAssets: isFetchingNextNfts,
          NFTisLoading: isLoadingFavorite || isRefetchingFavorites,
          ScrollingIsLoading: isRefetchingFavorites,
          onTrigger: () => !isFetchingNextFavorites && hasMoreFavorites && fetchMoreFavorites?.(),
        }
      case TAB.COLLECTIONS.id:
        return {
          ScrollingIsLoading: isRefetchingFavorites,
          onTrigger: () => !isFetchingNextCollections && hasMoreCollections && fetchMoreCollections?.(),
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NFTs, currentTab, Favorites, collections, isLoadingNFT, isLoadingFavorite])

  useEffect(() => {
    if (currentTab === TAB.NFTS.id) refetchNfts?.()
    else if (currentTab === TAB.COLLECTIONS.id) refetchCollections?.()
    else if (currentTab === TAB.FAVORITES.id) refetchFavorites?.()
  }, [currentTab, filters, refetchNfts, refetchFavorites, refetchCollections])

  const handleSelectCategory = useCallback((category: string) => {
    if (!category) {
      setSelectedCategory('')
      setFilters(pre => ({ ...pre, type: 'all' }))
    } else {
      setSelectedCategory(category)
      setFilters(pre => ({
        ...pre,
        type: category === 'auctions' ? 2 : category === 'fixed price' ? 1 : category,
      }))
    }
  }, [])

  const tabHandler = async (tabId: number) => {
    setCurrentTab(tabId)
    if (tabId === TAB.NFTS.id) {
      setFilters(pre => ({
        ...pre,
        type: getCategoryNames().slice(0, 3).includes(selectedCategory.toUpperCase()) ? selectedCategory : 'all',
      }))
    } else if (tabId === TAB.COLLECTIONS.id) {
      setFilters(pre => ({
        ...pre,
        networkId: activatingUser?.networkId,
      }))
    } else if (tabId === TAB.FAVORITES.id) {
      setFilters(pre => ({
        ...pre,
        type: getCategoryNames().slice(3, 5).includes(selectedCategory.toUpperCase())
          ? selectedCategory === 'AUCTIONS'
            ? 2
            : 1
          : 'all',
      }))
    }
  }

  return (
    <Layout className="p-4 pb-16 xl:container xl:mx-auto xl:px-0">
      <DashboardHeader className="font-RobotoCondensed font-normal uppercase" userDetails={activeUserFormate} />
      <div className="mb-4 px-4 md:px-0 lg:px-0">
        <Tabs currentTab={currentTab} tabs={Object.values(TAB).map(({ name }) => name)} onChangeTab={tabHandler} />
      </div>
      {currentTab === TAB.COLLECTIONS.id ? (
        <CollectionCardList
          collections={collections}
          isFetchingNextAssets={isFetchingNextCollections}
          isLoading={isLoadingCollections || isRefetchingCollections}
        />
      ) : (
        <>
          <div className="mb-4 items-center justify-between px-4 md:flex md:items-center md:px-0 lg:flex lg:px-0 ">
            <CategoryList categories={categories[currentTab]} onClick={handleSelectCategory} />
          </div>
          <NFTCardList
            assets={NFTAssetsHandler?.NFTAssets || []}
            className="w-full"
            isFetchingNextAssets={NFTAssetsHandler?.NFTIsFetchingNextAssets}
            isLoading={NFTAssetsHandler?.NFTisLoading}
          />
        </>
      )}
      <ScrollTrigger isLoading={NFTAssetsHandler?.ScrollingIsLoading} onTrigger={NFTAssetsHandler?.onTrigger} />
    </Layout>
  )
}
