import type { GetStaticProps, NextPage } from 'next'

import { HomePageTemplate } from 'design-systems/Templates/HomePageTemplate'
import { PAGE_SEO_CONFIG } from 'appConfig'
import { InitialFilters } from 'utils'
import { useAssets } from 'hooks/api/useAssets'
import { useAuctionAssets, AuctionAssetListTypes } from 'hooks/api/useAuctionAssets'
import { useSpaceAssets } from 'hooks/api/useSpaceAssets'

const HomePage: NextPage = () => {
  const { isLoadingLiveAuctionAssets, liveAuctionAssets, refetchLiveAuctionsData } = useAuctionAssets(
    AuctionAssetListTypes.LIVE
  )
  const { isLoadingMostViewedAssets, mostViewedAssets, refetchMostViewedAssets } = useAuctionAssets(
    AuctionAssetListTypes.MOST_VIEWED
  )
  const { isLoadingPrevSaleAssets, prevSaleAssets, refetchPrevSaleAuctions } = useAuctionAssets(
    AuctionAssetListTypes.PREV_SALES
  )
  const { isLoadingBestSpaceAssets, bestSpaceAssets } = useSpaceAssets()
  const {
    isLoadingAssets: isLoadingRecentAddedAssets,
    assets: recentAddedAssets,
    refetchAssets: refetchAssets,
  } = useAssets(InitialFilters)

  return (
    <HomePageTemplate
      bestSpaceAssets={bestSpaceAssets}
      isLoadingBestSpaceAssets={isLoadingBestSpaceAssets}
      isLoadingLiveAuctionAssets={isLoadingLiveAuctionAssets}
      isLoadingMostViewedAssets={isLoadingMostViewedAssets}
      isLoadingPrevSaleAssets={isLoadingPrevSaleAssets}
      isLoadingRecentAddedAssets={isLoadingRecentAddedAssets}
      liveAuctionAssets={liveAuctionAssets}
      mostViewedAssets={mostViewedAssets}
      prevSaleAssets={prevSaleAssets}
      recentAddedAssets={recentAddedAssets}
      refetchAssets={refetchAssets}
      refetchLiveAuctionsData={refetchLiveAuctionsData}
      refetchMostViewedAssets={refetchMostViewedAssets}
      refetchPrevSaleAuctions={refetchPrevSaleAuctions}
    />
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.home,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
