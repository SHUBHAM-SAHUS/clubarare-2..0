/* eslint-disable react-hooks/exhaustive-deps */
import type { GetStaticProps, NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module'

import { NFTCardList } from 'design-systems/Organisms/List/NFTCardList'
import { Layout } from 'design-systems/Organisms/Layout'
import { CategoryList } from 'design-systems/Organisms/List/CategoryList'
import { Filter } from 'design-systems/Organisms/Filter'
import { SEO } from 'design-systems/Organisms/SEO'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import { IconButton } from 'design-systems/Atoms/IconButton'
import { SliderHorizontalIcon } from 'design-systems/Atoms/Icons'
import { Dropdown } from 'design-systems/Molecules/Dropdown'
import { Typography } from 'design-systems/Atoms/Typography'
import { SpaceCard } from 'design-systems/Molecules/Cards/SpaceCard'
import { NFTCardSkeleton } from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { Button } from 'design-systems/Atoms/Button'
import { CardCarousel } from 'design-systems/Molecules/Carousel'
import { classNames, InitialFilters, IS_PRODUCTION, PAGE_ROUTES, shortWalletAddress, SORT_BY_OPTIONS } from 'utils'
import { PAGE_SEO_CONFIG } from 'appConfig'
import { useAssets } from 'hooks/api/useAssets'
import { useCategories } from 'hooks/api/useCategories'
import { useSpaceAssets } from 'hooks/api/useSpaceAssets'
import { useShallowState } from 'hooks/useShallowState'
import { useToggle } from 'hooks/useToggle'

const ExplorePage: NextPage = () => {
  const router = useRouter()
  const search = (router.query.search as string) ?? ''

  const { categories } = useCategories()
  const [showMore, setShowMore] = useState<boolean>(false)
  const [showFilter, toggleShowFilter] = useToggle(false)
  const [filters, setFilters] = useShallowState<AssetFilters>({
    ...InitialFilters,
    search,
  })
  const {
    assets,
    isLoadingAssets,
    isRefetchingAssets,
    isFetchingNextAssets,
    fetchMoreAssets,
    refetchAssets,
    hasMoreAssets,
  } = useAssets(filters)
  const { isLoadingLatestSpaceAssets, latestSpaceAssets } = useSpaceAssets()
  const renderSpaceCards = useCallback((isLoading: boolean, spaceAssets: SpaceObject[]) => {
    if (isLoading) {
      return Array(6).fill(<NFTCardSkeleton />)
    }

    return spaceAssets
      ?.filter(asset => Boolean(asset))
      .map(asset => (
        <SpaceCard
          address={asset.users.walletAddress}
          avatar={asset.users.image}
          key={`space-${asset.id}`}
          name={asset.users.name || shortWalletAddress(asset.users.walletAddress)}
          spaceImage={asset.spaceImage}
        />
      ))
  }, [])

  const handleChangeSortBy = useCallback((selection: SortByAssetOption) => {
    setFilters({ sort: selection.value })
  }, [])

  const handleChangeFilter = useCallback((changes: Array<{ key: keyof AssetFilters; value: string | boolean }>) => {
    const values = changes.reduce((val, change) => ({ ...val, [change.key]: change.value }), {})
    setFilters(values)
  }, [])

  const handleChangeCategory = useCallback((category: string) => {
    setFilters({ category })
  }, [])

  // const handleChangeNftType = useCallback((index: number) => {
  //   setFilters({ redeemable: index === 0 ? true : false })
  // }, [])

  const handleViewAllAssets = useCallback(() => {
    router.push(PAGE_ROUTES.explore, { query: '' })
  }, [])

  useEffect(() => {
    setFilters({ ...InitialFilters, search })
  }, [search])

  useEffect(() => {
    if (!IS_PRODUCTION) return

    const tagManagerArgs = {
      dataLayer: filters,
      gtmId: 'GTM-55R8KGB',
    }
    TagManager.initialize(tagManagerArgs)
  }, [filters])

  return (
    <>
      <SEO config={PAGE_SEO_CONFIG.explore} />
      <Layout
        className={classNames(
          showFilter ? 'px-0 xl:container md:px-4 xl:mx-auto' : 'px-4 xl:container xl:mx-auto',
          'pb-16 xl:px-0'
        )}
      >
        {/* 
        <CollectibleTypeList
          initialSortBy={filters.sort}
          onToggleFilter={toggleShowFilter}
          onChangeSortBy={handleChangeSortBy}
          onChangeNftType={handleChangeNftType}
        />
        */}
        <div className="flex flex-col gap-4 py-16">
          <Typography className="text-start uppercase" size="h4">
            LATEST SPACES
          </Typography>

          <div className="hidden grid-cols-3 gap-4 md:grid">
            {renderSpaceCards(
              isLoadingLatestSpaceAssets,
              showMore ? latestSpaceAssets : latestSpaceAssets?.slice(0, 3)
            )}
          </div>
          <div className="flex justify-end">
            <Button color="primary" size="small" variant="outlined" onClick={() => setShowMore(!showMore)}>
              Show {showMore ? 'Less' : 'More'}
            </Button>
          </div>
          <CardCarousel
            className="show md:hidden"
            cols={1}
            elements={renderSpaceCards(isLoadingLatestSpaceAssets, latestSpaceAssets)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Typography className="text-start uppercase" size="h4">
            ITEMS
          </Typography>
          <div className="mb-2 flex w-full items-center justify-end">
            <CategoryList categories={categories} onClick={handleChangeCategory} />

            <div className="flex items-center gap-6">
              <IconButton variant="transparent" onClick={toggleShowFilter}>
                <SliderHorizontalIcon className="stroke-neutral-100 dark:stroke-neutral-800" />
              </IconButton>
              <div className="hidden min-w-[120px] md:block">
                <Dropdown
                  direction="right"
                  options={SORT_BY_OPTIONS}
                  placeholder="Sort by"
                  value={filters.sort}
                  onChange={handleChangeSortBy}
                />
              </div>
            </div>
          </div>
          {/* <CategoryList categories={categories} onClick={handleChangeCategory} /> */}

          <div className="w-full md:flex md:gap-0">
            {showFilter && (
              <div className={`${showFilter ? 'md:basis-1/5' : ''} `}>
                <Filter
                  initialFilters={filters}
                  onChangeFilter={handleChangeFilter}
                  onFilterCancel={toggleShowFilter}
                />
              </div>
            )}
            <div className={classNames(showFilter ? 'mt-10 md:mt-0 md:basis-4/5 ' : 'w-full')}>
              <NFTCardList
                assets={assets}
                isFetchingNextAssets={isFetchingNextAssets}
                isLoading={isLoadingAssets || isRefetchingAssets}
                refetchAssets={refetchAssets}
                showFilter={showFilter}
                onViewAll={handleViewAllAssets}
              />
            </div>
          </div>
          <ScrollTrigger
            isLoading={isFetchingNextAssets}
            onTrigger={() => !isLoadingAssets && !isFetchingNextAssets && hasMoreAssets && fetchMoreAssets?.()}
          />
        </div>
      </Layout>
    </>
  )
}

export default ExplorePage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.explore,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
