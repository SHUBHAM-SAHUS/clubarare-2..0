import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'

import { Button } from 'design-systems/Atoms/Button'
import { File } from 'design-systems/Molecules/File'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { Typography } from 'design-systems/Atoms/Typography'
import { SpaceCard } from 'design-systems/Molecules/Cards/SpaceCard'
import { NFTCard } from 'design-systems/Molecules/Cards/NFTCard'
import { NFTCardSkeleton } from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { CardCarousel } from 'design-systems/Molecules/Carousel'
import { OverlayIds } from 'design-systems/Organisms/Managers/OverlayManager'
import { Hero } from 'design-systems/Organisms/Hero'
import { Layout } from 'design-systems/Organisms/Layout'
import { getNftPrice, getSaleStatus, shortWalletAddress, PAGE_ROUTES, CLUBRARE_SOCIAL_LINKS } from 'utils'
import NftCardsImg from 'assets/images/Nftcards.png'
import { useConnector, useNFTCreation, useOverlay } from 'context'

export interface HomePageTemplateProps {
  isLoadingBestSpaceAssets: boolean
  isLoadingLiveAuctionAssets: boolean
  isLoadingMostViewedAssets: boolean
  isLoadingPrevSaleAssets: boolean
  isLoadingRecentAddedAssets: boolean
  bestSpaceAssets: SpaceObject[]
  liveAuctionAssets: AssetObject[]
  mostViewedAssets: AssetObject[]
  prevSaleAssets: AssetObject[]
  recentAddedAssets: AssetObject[]
  refetchPrevSaleAuctions?: AnyFunction
  refetchAssets: AnyFunction
  refetchMostViewedAssets: AnyFunction
  refetchLiveAuctionsData: AnyFunction
}

export const HomePageTemplate: React.FC<HomePageTemplateProps> = ({
  bestSpaceAssets,
  isLoadingBestSpaceAssets,
  isLoadingLiveAuctionAssets,
  isLoadingMostViewedAssets,
  isLoadingPrevSaleAssets,
  isLoadingRecentAddedAssets,
  liveAuctionAssets,
  mostViewedAssets,
  prevSaleAssets,
  recentAddedAssets,
  refetchPrevSaleAuctions,
  refetchAssets,
  refetchMostViewedAssets,
  refetchLiveAuctionsData,
}) => {
  const { openOverlay } = useOverlay()
  const { openNFTCreation } = useNFTCreation()
  const { isSigned } = useConnector()

  /**
   * Handles the action when the "Get Started" button is clicked.
   * If the user is signed in, opens the NFT creation interface,
   * otherwise opens the profile overlay to prompt the user to sign in with wallet.
   */
  const handleGetStarted = () => {
    if (isSigned) openNFTCreation()
    else openOverlay(OverlayIds.PROFILE)
  }

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
          key={`space-{asset.id}`}
          name={asset.users.name || shortWalletAddress(asset.users.walletAddress)}
          spaceImage={asset.spaceImage}
        />
      ))
  }, [])

  const renderNFTCards = useCallback((isLoading: boolean, auctionAssets: AssetObject[], refetchData?: AnyFunction) => {
    if (isLoading) {
      return Array(6).fill(<NFTCardSkeleton />)
    }

    return (
      auctionAssets
        ?.filter(asset => Boolean(asset))
        .map(asset => (
          <NFTCard
            auctionDetails={asset?.auctionDetails}
            editable={false}
            id={asset.id}
            key={asset.id}
            product={{
              file: {
                alt: asset.title,
                src: asset.previewUrl || asset.s3Url,
                type: asset.fileContentType,
              },
              networkId: asset?.networkId,
              price: getNftPrice(asset),
              title: asset.title,
              onSale: asset?.onSale,
              collectibleOwner: asset?.collectibleOwner,
              isHide: asset?.isHide,
              history: asset?.history,
            }}
            refetchAssets={refetchData}
            size="large"
            status={getSaleStatus(asset)}
            user={{
              address: asset?.userObj.walletAddress,
              avatar: asset.ownerObj?.image ?? asset.userObj?.image,
              username: asset?.userObj?.name ? asset?.userObj?.name : shortWalletAddress(asset?.userObj?.walletAddress),
            }}
          />
        )) ?? []
    )
  }, [])

  const renderNFTImageCards = useCallback(
    (isLoading: boolean, auctionAssets: AssetObject[], refetchData?: AnyFunction) => {
      if (isLoading) {
        return Array(6).fill(<Skeleton />)
      }

      return (
        auctionAssets
          ?.filter(asset => Boolean(asset))
          .map(asset => (
            <Link href={PAGE_ROUTES.product(asset?.id)} key={asset?.id}>
              <File
                alt={asset?.title ?? 'clubrare-asset-file'}
                className="mb-1 h-[320px] w-[320px] object-cover md:!h-[230px] md:!w-[230px] lg:!h-[310px] lg:!w-[310px] xl:!h-[400px] xl:!w-[400px] xxl:!h-[465px] xxl:!w-[465px]"
                height={465}
                src={asset?.previewUrl || asset?.s3Url}
                type={asset?.fileContentType}
                width={465}
              />
            </Link>
          )) ?? []
      )
    },
    []
  )

  const mostViewedElements = useMemo(() => {
    return renderNFTImageCards(isLoadingMostViewedAssets, mostViewedAssets, refetchMostViewedAssets)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingMostViewedAssets, mostViewedAssets])

  const liveAuctionElements = useMemo(() => {
    return renderNFTCards(isLoadingLiveAuctionAssets, liveAuctionAssets, refetchLiveAuctionsData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingLiveAuctionAssets, liveAuctionAssets])

  const recentAddedElements = useMemo(() => {
    return renderNFTCards(isLoadingRecentAddedAssets, recentAddedAssets.slice(0, 5), refetchAssets)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingRecentAddedAssets, recentAddedAssets])

  const prevSaleElements = useMemo(() => {
    return renderNFTCards(isLoadingPrevSaleAssets, prevSaleAssets, refetchPrevSaleAuctions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPrevSaleAssets, prevSaleAssets])

  const bestSpaceElements = useMemo(() => {
    return renderSpaceCards(isLoadingBestSpaceAssets, bestSpaceAssets)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingBestSpaceAssets, bestSpaceAssets])

  return (
    <Layout>
      <Hero details={mostViewedAssets} elements={mostViewedElements} onGetStarted={handleGetStarted} />

      <div className="px-0 py-16 xl:container xl:mx-auto">
        {!!bestSpaceElements?.length && (
          <div className="mb-20">
            <Typography className="text-center uppercase" size="h4">
              SPACES
            </Typography>
            <CardCarousel cols={3} elements={bestSpaceElements} />
          </div>
        )}
        <div className="mb-20">
          <Typography className="text-center uppercase" size="h4">
            NEW ITEMS
          </Typography>
          <CardCarousel cols={4} elements={recentAddedElements} />
        </div>
      </div>

      <div className="bg-neutral-100">
        <div className="lg-px-0 relative flex flex-col items-center justify-between px-4 xl:container lg:flex-row xl:mx-auto">
          <NextImage
            alt="nftCards"
            className="ml-0 h-[350px] w-[400px] py-7 md:h-[500px] md:w-[500px] lg:-mt-20
             lg:ml-5 lg:py-0"
            height={500}
            src={NftCardsImg}
            width={500}
          />
          <div className="ml-auto flex w-full flex-col items-center justify-center pb-9 text-neutral-800 lg:w-1/2 lg:pb-0">
            <div className="w-full md:w-4/5">
              <Typography className="!text-h4 uppercase md:!text-h3" size="h3">
                Find rare and limited items
              </Typography>
              <Typography className="mt-3" size="body">
                Explore our marketplace to find the rare and limited items you are looking for
              </Typography>
              <Link href={PAGE_ROUTES.explore}>
                <Button
                  className="mr-4 mt-4 w-full !px-4 uppercase md:w-1/3"
                  color="neon"
                  size="small"
                  type="button"
                  variant="solid"
                >
                  EXPLORE NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-0 py-16 xl:container md:px-4 xl:mx-auto">
        {liveAuctionAssets?.length > 0 && (
          <div className="mb-20">
            <Typography className="text-center uppercase" size="h4">
              LIVE AUCTIONS
            </Typography>
            <CardCarousel cols={4} elements={liveAuctionElements} />
          </div>
        )}
        <div className="mb-20">
          <Typography className="text-center uppercase" size="h4">
            PREVIOUS SALES
          </Typography>
          <CardCarousel cols={4} elements={prevSaleElements} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-neutral-100 px-6 py-6 text-neutral-800 md:mx-8 md:rounded-lg md:py-28 md:pl-10 md:pr-14 lg:px-28">
        <Typography className="text-center" size="h4">
          Craft Your Ultimate Collection
        </Typography>
        <Typography className="mt-3 text-center" size="body">
          Create an Epic Showcase, Boost Asset Value, and Join The Best Collector Community!
        </Typography>
        <Link className="mt-4" href={CLUBRARE_SOCIAL_LINKS.discord} target="_blank">
          <Button className="px-8 uppercase" color="neon" size="small" type="button" variant="solid">
            Join Us
          </Button>
        </Link>
      </div>
    </Layout>
  )
}
