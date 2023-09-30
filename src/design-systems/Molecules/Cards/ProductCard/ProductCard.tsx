import { useMemo, useCallback, useState } from 'react'
import NextLink from 'next/link'
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon'
import parse from 'html-react-parser'

import { PriceCard } from '../PriceCard'

import { AuthenticationStatus, getAuthenticationStatus, parseAnchorTags } from './utils'

import { Badge } from 'design-systems/Atoms/Badge'
import { Button } from 'design-systems/Atoms/Button'
import {
  CaretDoubleDownIcon,
  CaretDoubleUpIcon,
  DotsThreeVerticalIcon,
  ShareIcon,
  EyeIcon,
  HeartIcon,
  StackIcon,
  LazyLeoIcon,
} from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { Timer } from 'design-systems/Atoms/Timer'
import { useModal } from 'design-systems/Atoms/Modal'
import { ViewCounter } from 'design-systems/Molecules/Counters/ViewCounter'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { Dropdown } from 'design-systems/Molecules/Dropdown'
import { ShareModal } from 'design-systems/Molecules/Modals/ShareModal'
import { BidModal as BidModalContent } from 'design-systems/Molecules/Modals/BidModal'
import { BuyModal as BuyModalContent } from 'design-systems/Molecules/Modals/BuyModal'
import { PutOnSaleModal as PutOnSaleContent } from 'design-systems/Molecules/Modals/PutOnSaleModal'
import { MarketplaceActions } from 'design-systems/Molecules/Buttons/MarketplaceButton'
import { ReceivedItemModal as ReceivedItemContent } from 'design-systems/Molecules/Modals/ReceivedItemModal'
import {
  AUCTION_TYPES,
  classNames,
  CLUBRARE_NETWORKS,
  compareStringsInsentively,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  getNftPrice,
  getSaleStatus,
  LIVE_URL_V2,
  MARKETPLACE_CONTRACT_ADDRESS,
  NULL_TOKEN_ADDRESS,
  PAGE_ROUTES,
} from 'utils'
import { useConnector } from 'context'
import { CollectibleService } from 'api-services'
import { useCollectible } from 'hooks/api/useCollectible'
import { useSingleAsset } from 'hooks/api/useSingleAsset'
import { useToggle } from 'hooks/useToggle'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useClaimService } from 'hooks/useClaimService'
import { useDelistService } from 'hooks/useDelistService'
import { useToast } from 'hooks/useToast'

export interface ProductCardProps {
  asset: AssetObject
  className?: string
  creatorName?: string
  likeCount?: number
  isLike?: boolean
  onClickLike: () => Promise<void>
}

export const ProductCard: React.FC<ProductCardProps> = ({
  asset,
  className = '',
  creatorName = '',
  likeCount = 0,
  isLike = false,
  onClickLike,
}) => {
  const { successToast, warningToast } = useToast()
  const { delistCollectible } = useDelistService(asset)
  const { collectibleClaim } = useClaimService(asset)
  const [isLoading, toggleLoading] = useToggle(false)
  const { chainId, isSigned, connect } = useConnector()
  const { authUser: activatingUser } = useGlobalState()
  const [showShareModal, setShowShareModal] = useToggle(false)
  const address = activatingUser?.walletAddress
  const [istLoading, , , showLoading, hideLoading] = useToggle(false)
  const { refetchAssetDetails, getVaultItemStatus, refetchGetVaultItemStatus } = useSingleAsset(asset?.id, address)
  const [viewCount, setViewCount] = useState<number>(asset.viewCount)
  const { createCollectibleViewAsync } = useCollectible()
  const [status, setStatus] = useState<string>()

  useMemo(async () => {
    setStatus(getSaleStatus(asset))
  }, [asset])

  useMemo(async () => {
    if (isSigned && address && asset.id) {
      const dataResponse = await createCollectibleViewAsync({ _id: asset.id })
      if (dataResponse.status && dataResponse.data.viewCount) {
        setViewCount(dataResponse.data.viewCount)
      }
    }
  }, [])

  const details = useMemo(() => {
    const isAuthenticated =
      (asset.isLuxuryAuthReq && asset.luxuryStatus === 'COMPLETED') ||
      activatingUser?.role === 'admin' ||
      activatingUser?.isSuperAdmin
    const priceDetail = getNftPrice(asset)

    return {
      auctionDetails: asset.auctionDetails,
      avatar: asset.ownerObj?.image ?? asset.userObj?.image,
      isAuthenticated,
      isEscrow: Boolean(asset?.auctionDetails?.isEscrow),
      networkId: asset.networkId,
      ownerAddress: asset.ownerObj.walletAddress,
      priceDetail,
      type: asset.redeemable ? 'phygital' : 'digital',
      verified: isAuthenticated,
      viewCount: asset.viewCount,
    }
  }, [asset, status, activatingUser])

  const onCloseModal = useCallback(() => {
    closeBuyModal()
    closeBidModal()
    closeReceivedItemModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    Modal: BuyModal,
    open: openBuyModal,
    close: closeBuyModal,
  } = useModal(<BuyModalContent asset={asset} onClose={onCloseModal} />, 'Buy Now')

  const {
    Modal: BidModal,
    open: openPlaceBidModal,
    close: closeBidModal,
  } = useModal(<BidModalContent asset={asset} onClose={onCloseModal} />, 'Place Bid')

  const {
    Modal: ReceivedItemModal,
    open: openReceivedItemModal,
    close: closeReceivedItemModal,
  } = useModal(
    <ReceivedItemContent asset={asset} refetchVaultDetails={refetchGetVaultItemStatus} onClose={onCloseModal} />,
    'Receive My Item'
  )

  const handleConnect = useCallback(
    async (connector: WalletTypes) => {
      await connect(connector)
    },
    [connect]
  )

  const handleCheckNetwork = (event: string) => {
    if (!isSigned) {
      const wallet = asset.networkId === CLUBRARE_NETWORKS.ETHEREUM ? 'METAMASK' : 'KAIKAS'
      handleConnect(wallet)
    } else {
      const currentItemChainId =
        asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM ? DEFAULT_ETHEREUM_CHAIN_ID : DEFAULT_KLAYTN_CHAIN_ID
      if (chainId != currentItemChainId) {
        if (asset?.networkId === CLUBRARE_NETWORKS.KLAYTN) {
          return warningToast(`Please connect with klaytn network to ${event} this item.`)
        } else {
          return warningToast(`Please connect with ethereum network to ${event} this item.`)
        }
      } else {
        if (event === 'buy') {
          openBuyModal()
        } else if (event === 'bid') {
          openPlaceBidModal()
        }
      }
    }
  }

  const onCloseSaleModal = useCallback(() => {
    closeSaleModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    Modal: PutOnSaleModal,
    open: openPutOnSaleModal,
    close: closeSaleModal,
  } = useModal(
    <PutOnSaleContent asset={asset} onClose={onCloseSaleModal} />,
    <ArrowLeftIcon className={`box-content h-6 w-6 cursor-pointer text-neutral-400 dark:text-neutral-700 sm:hidden`} />
  )

  const handlePutOfSale = useCallback(() => {
    showLoading()
    delistCollectible(hideLoading)
  }, [asset])

  const handleClaim = useCallback(() => {
    showLoading()
    collectibleClaim(hideLoading, details.isEscrow)
  }, [details])

  const wrapperClassNames = useMemo(
    () =>
      classNames(
        className,
        'bg-neutral-700 dark:bg-neutral-300',
        'rounded-sm',
        'border border-neutral-600 dark:border-neutral-300',
        'px-4 py-4',
        'cursor-pointer relative'
      ),
    [className]
  )

  const dropDownOptions = useMemo(() => {
    const options = []
    if (
      isSigned &&
      address &&
      ((compareStringsInsentively(activatingUser?.role, 'user') &&
        !activatingUser?.isSuperAdmin &&
        compareStringsInsentively(address?.toUpperCase(), asset?.collectibleOwner?.toUpperCase())) ||
        compareStringsInsentively(activatingUser?.role, 'admin') ||
        activatingUser?.isSuperAdmin) &&
      (!asset?.onSale ||
        (asset?.onSale && asset?.auctionDetails?.auctionType === AUCTION_TYPES.FIXED) ||
        (asset?.onSale &&
          asset?.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
          asset?.history?.bid?.length === 0))
    ) {
      options.push({ title: asset.isHide ? 'Unhide NFT' : 'Hide NFT', value: asset.isHide ? 'Unhide NFT' : 'Hide NFT' })
    }
    return options
  }, [asset, address, activatingUser, isSigned])

  const [isMore, toggleIsMore] = useToggle(false)

  const nftDescription = useMemo(() => {
    return (
      (isMore || String(asset?.description).length <= 300
        ? parse(parseAnchorTags(asset?.description))
        : `${asset?.description?.slice(0, 300)}...`) ?? ''
    )
  }, [asset?.description, isMore])

  const currentUser = useMemo(() => {
    const adminAddress = MARKETPLACE_CONTRACT_ADDRESS[chainId]
    return activatingUser?.role === 'admin' || activatingUser?.isSuperAdmin
      ? adminAddress.toString()
      : address?.toString()
  }, [asset, address])

  const handleClickLike = useCallback(async () => {
    toggleLoading()
    await onClickLike()
    toggleLoading()
  }, [onClickLike])

  const handleHideCollectibleStatus = useCallback(async () => {
    const statusPayload: HideStatusObject = {
      _id: asset?.id,
    }
    const hideDataResponse = await CollectibleService.hideCollectible(statusPayload)
    if (hideDataResponse.status) {
      successToast('NFT hide status updated successfully')
    } else {
      warningToast(hideDataResponse.message)
    }
    refetchAssetDetails()
  }, [])

  /**
   * Renders the authentication status badge based on the authentication status of an asset.
   * @returns The element representing the authentication status badge.
   */
  const renderAuthStatusBadge = useCallback(() => {
    switch (getAuthenticationStatus(asset)) {
      case AuthenticationStatus.AUTHENTICATED:
        return (
          <Badge size="small" variant="authenticated">
            <Typography size="sm" variant="condensed">
              AUTHENTICATED
            </Typography>{' '}
          </Badge>
        )
      case AuthenticationStatus.FAILED:
        return (
          <Badge size="small" variant="failed">
            <Typography size="sm" variant="condensed">
              AUTHENTICATION FAILED
            </Typography>
          </Badge>
        )
      default:
        break
    }
  }, [asset])

  const renderReceiveItemButtons = useCallback(() => {
    if (
      isSigned &&
      currentUser &&
      compareStringsInsentively(asset?.collectibleOwner, currentUser) &&
      asset.itemCurrentLocation &&
      asset.itemCurrentLocation === 'vault' &&
      (!getVaultItemStatus || getVaultItemStatus?.orderStatus === 'created')
    ) {
      return (
        <Button
          className="mb-3 w-full"
          color="primary"
          size="medium"
          variant="outlined"
          onClick={openReceivedItemModal}
        >
          RECEIVE ITEM
        </Button>
      )
    } else if (getVaultItemStatus && getVaultItemStatus.orderStatus === 'pending') {
      return (
        <Button className="mb-3 w-full" color="primary" disabled={true} size="medium" variant="outlined">
          You have requested to receive item.
        </Button>
      )
    } else if (getVaultItemStatus && getVaultItemStatus.orderStatus === 'dispatched') {
      return (
        <Button className="mb-3 w-full" color="primary" disabled={true} size="medium" variant="outlined">
          Your item has been dispatched
        </Button>
      )
    }
  }, [asset, isSigned, currentUser, getVaultItemStatus, openReceivedItemModal])

  /**
   * Renders Timer Component
   * @returns The element representing the Timer Component
   */
  const renderTimer = useCallback(() => {
    return (
      status &&
      (status === 'sold' ? (
        <Typography variant="condensed">Sold</Typography>
      ) : status === 'listed' && details.auctionDetails?.auctionType === AUCTION_TYPES.FIXED ? (
        <Typography variant="condensed">&nbsp;</Typography>
      ) : status === 'future' &&
        details.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
        new Date(details.auctionDetails?.startingTime) > new Date() ? (
        <div className="block">
          <Timer
            endTime={new Date(details.auctionDetails.startingTime)}
            size="large"
            status="pending"
            updateStatus={handleStatusUpdate}
          />
        </div>
      ) : status === 'listed' &&
        details.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
        details.auctionDetails?.closingTime ? (
        <div className="block">
          <Timer
            endTime={new Date(details.auctionDetails.closingTime)}
            size="large"
            status="in"
            updateStatus={handleStatusUpdate}
          />
        </div>
      ) : (
        status === 'ended' &&
        details.auctionDetails?.closingTime && (
          <Timer endTime={new Date(details.auctionDetails.closingTime)} size="large" status={status} />
        )
      ))
    )
  }, [asset, status, details])

  const handleStatusUpdate = useCallback((status: string) => {
    setStatus(status)
  }, [])

  return (
    <div className={wrapperClassNames}>
      <div className="absolute right-4 top-4 flex items-center justify-end gap-4 lg:absolute lg:right-6 lg:top-4">
        <ViewCounter count={viewCount} icon={<EyeIcon className="stroke-neutral-400 dark:stroke-neutral-800" />} />
        <ViewCounter
          count={likeCount}
          disabled={isLoading}
          icon={
            <HeartIcon
              className="stroke-neutral-400 dark:stroke-neutral-800"
              fill={isLike ? 'red' : 'none'}
              height={20}
              width={20}
            />
          }
          onClick={handleClickLike}
        />

        <div className="flex cursor-pointer flex-col items-center" onClick={() => setShowShareModal()}>
          <ShareIcon className="h-5 w-5 stroke-neutral-400 dark:stroke-neutral-800" />
        </div>

        {showShareModal && (
          <div className=" filterOverlayOverFlowHidden lg:backdrop-neutral fixed inset-0 z-[2999] bg-neutral-800 dark:bg-neutral-300 md:bg-transparent md:backdrop-blur-lg md:dark:bg-transparent lg:bg-transparent">
            <ShareModal
              text={asset?.title}
              url={`${LIVE_URL_V2}/product/${asset?.id}`}
              onClose={() => setShowShareModal()}
            />
          </div>
        )}

        <Dropdown
          className="dropdown-with-button text-bold active::bg-neutral-500 h-8 w-8  fill-neutral-500 !px-0 group-active:fill-neutral-100"
          dropdownClass="hide-menu-wrp"
          options={dropDownOptions}
          placeholder={
            <DotsThreeVerticalIcon className="h-8 w-8 fill-neutral-300 group-active:fill-neutral-100  dark:fill-neutral-700 " />
          }
          onChange={handleHideCollectibleStatus}
        />
      </div>

      <NextLink
        className="mb-6 flex w-full items-center gap-1 lg:w-8/12"
        href={PAGE_ROUTES.profile(details.ownerAddress)}
      >
        <Avatar
          alt={`avatar-${creatorName}`}
          className={`h-8 w-8 md:h-12 md:w-12`}
          src={details.avatar ? details.avatar + '?auto=format&w=40&h=40' : ''}
          verified={details.verified}
        />
        <Typography size="paragraph" variant="condensed">
          {creatorName}
        </Typography>
      </NextLink>

      <div className="mb-6 flex gap-4">
        {/* Note: Digital NFT is not available */}
        {/*
        <Badge variant={details.type === 'phygital' ? 'phygital' : 'digital'}>
          {details.type === 'phygital' ? 'PHYGITAL NFT' : 'DIGITAL NFT'}
        </Badge>
        */}
        {/* Note: render product authentication status with badge and label */}
        {renderAuthStatusBadge()}
        {/* Note: open collection detail page */}
        {asset.collectionId && (
          <NextLink className="flex items-center" href={PAGE_ROUTES.collection(asset.collectionId)}>
            <StackIcon className="h-6 w-6 stroke-neutral-400 dark:stroke-neutral-800" />
            &nbsp;&nbsp;
            <Typography size="body" variant="condensed">
              View Collection
            </Typography>
          </NextLink>
        )}
      </div>

      <Typography size="h4" variant="condensed">
        {asset?.title}
      </Typography>
      <div className="mt-2">
        <Typography className="whitespace-pre-wrap" size="body" variant="condensed">
          {nftDescription}
        </Typography>
        <div
          className={`mt-2 flex items-center gap-4 ${asset && asset.description?.length < 300 && 'hidden'}`}
          onClick={toggleIsMore}
        >
          <Typography className="text-neutral-400 dark:text-neutral-500" size="body" variant="condensed">
            Show {!isMore ? 'More' : 'Less'}
          </Typography>
          {!isMore ? (
            <CaretDoubleDownIcon className="stroke-neutral-400 dark:stroke-neutral-500" />
          ) : (
            <CaretDoubleUpIcon className="stroke-neutral-400 dark:stroke-neutral-500" />
          )}
        </div>
      </div>
      <div className="mt-16 flex flex-col rounded-sm bg-neutral-700 p-4 shadow-lg dark:bg-neutral-200">
        <div className="flex items-center justify-between">
          <PriceCard
            label={details.priceDetail?.label}
            networkId={details.networkId}
            price={details.priceDetail?.amount}
            size="large"
            token={details.priceDetail?.token}
          />
          {details.auctionDetails?.isTokenGated && (
            <div className="flex items-center">
              <LazyLeoIcon />
              <Typography className="ml-1" size="body" variant="condensed">
                LLC Only
              </Typography>
            </div>
          )}
          {renderTimer()}
        </div>
        {/*
         * Title: Buy Button Display Conditions
         * escrow: item should not in escrow
         * status: on sale status should be true
         * auctionType: item should on sale with fixed price
         * isSigned: if User logged in then his role should be user and he is not owner of this item
         * or buy button will be always visible for visitor
         */}
        {!asset.escrow &&
          status &&
          status === 'listed' &&
          details.auctionDetails?.auctionType === AUCTION_TYPES.FIXED &&
          ((isSigned &&
            address &&
            compareStringsInsentively(activatingUser?.role, 'user') &&
            !activatingUser?.isSuperAdmin &&
            !compareStringsInsentively(asset?.collectibleOwner, address)) ||
            !isSigned) && (
            <Button
              classID="w-full"
              color="neon"
              size="medium"
              variant="solid"
              onClick={() => handleCheckNetwork('buy')}
            >
              BUY
            </Button>
          )}
        {/*
         * Title: Place Bid Button Display Conditions
         * status: on sale status should be true
         * escrow: item should not in escrow
         * auctionType: item should on sale with auction
         * closingTime: Auction should not over
         * isSigned: if User logged in then his role should be user and he is not owner of this item or already bid on this item
         * or button will be always visible for visitor
         */}
        {status === 'listed' &&
        !asset.escrow &&
        details.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
        new Date(details.auctionDetails?.closingTime) > new Date() &&
        ((isSigned &&
          address &&
          !compareStringsInsentively(asset?.collectibleOwner, address) &&
          !compareStringsInsentively(asset?.auctionDetails?.highestBidder, address)) ||
          !isSigned) ? (
          <Button classID="w-full" color="neon" size="medium" variant="solid" onClick={() => handleCheckNetwork('bid')}>
            PLACE BID
          </Button>
        ) : (
          ''
        )}

        {/*
         * Title: Receive Item
         * isSigned: User should logged in and owner of the item
         * itemCurrentLocation: it should vault
         */}
        {renderReceiveItemButtons()}

        {/*
         * Title: Put On Sale Button Display Conditions
         * escrow: item should not in escrow
         * isSigned: User should logged in and owner of the item
         * status: on sale status should not be true or if its auction and no bids and auction time should end
         * isApprove: item status should be approved
         * isHide: item should not hidden
         * isLuxuryAuthReq: if its required lux auth and item still not authenticated then do not allow put on sale
         */}
        {!asset.escrow &&
          (!getVaultItemStatus?.orderStatus || getVaultItemStatus?.orderStatus === 'delivered') &&
          isSigned &&
          currentUser &&
          (!asset?.onSale ||
            (asset?.onSale &&
              compareStringsInsentively(details?.auctionDetails?.highestBidder, NULL_TOKEN_ADDRESS) &&
              details?.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
              new Date(details?.auctionDetails?.closingTime).getTime() < new Date().getTime())) &&
          compareStringsInsentively(asset?.collectibleOwner, currentUser) &&
          asset?.isApprove &&
          !asset?.isHide &&
          (!asset.isLuxuryAuthReq || (asset.isLuxuryAuthReq && details.isAuthenticated)) && (
            <Button classID="w-full mt-2" color="neon" size="medium" variant="solid" onClick={openPutOnSaleModal}>
              PUT ON SALE
            </Button>
          )}

        {/*
         * Title: Authentication In process Button Display Conditions
         * isSigned: User should logged in and owner of the item
         * isLuxuryAuthReq: if its required lux auth and item still not authenticated then show this text
         */}
        {isSigned &&
          currentUser &&
          compareStringsInsentively(asset?.collectibleOwner, currentUser) &&
          asset.isLuxuryAuthReq &&
          !details.isAuthenticated && (
            <Button classID="w-full mt-3" color="neon" disabled={true} size="medium" variant="solid">
              Authentication In process
            </Button>
          )}

        {/*
         * Title: Delist Button Display Conditions
         * escrow: item should not in escrow
         * isHide: item should not hidden
         * status: on sale status should be true
         * auctionType: if sell type is auction and there is any bid then do not allow delist
         * isSigned: User should logged in and owner of the item
         */}
        {isSigned &&
          !asset.escrow &&
          !asset?.isHide &&
          asset?.onSale &&
          currentUser &&
          compareStringsInsentively(asset.collectibleOwner, currentUser) &&
          (details?.auctionDetails?.auctionType === AUCTION_TYPES.FIXED ||
            (details?.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
              new Date(details?.auctionDetails?.closingTime).getTime() > new Date().getTime() &&
              compareStringsInsentively(details?.auctionDetails?.highestBidder, NULL_TOKEN_ADDRESS))) && (
            <Button
              classID="w-full mt-2"
              color="neon"
              fullWidth
              loading={istLoading}
              size="medium"
              variant="solid"
              onClick={handlePutOfSale}
            >
              Delist Item
            </Button>
          )}
        {/*
         * Title: Escrow InProcess  Display Conditions
         * escrow: item should in escrow
         * isSigned: User should logged in and buyer or seller
         */}
        {asset.escrow &&
          address &&
          (compareStringsInsentively(asset.escrow.buyerWalletAddress, address) ||
            compareStringsInsentively(asset?.escrow?.sellerWalletAddress, address)) && (
            <Button classID="w-full mt-2" color="neon" disabled size="medium" variant="solid">
              Escrow InProcess
            </Button>
          )}
        {/*
         * Title: Claim Button Display Conditions
         * escrow: item should not in escrow
         * isSigned: User should logged in and highestBidder bidder or owner of the item
         * auctionType: it is in auction and it auction should be end
         */}
        {!asset.escrow &&
          isSigned &&
          address &&
          (compareStringsInsentively(asset?.collectibleOwner, address) ||
            compareStringsInsentively(details?.auctionDetails?.highestBidder, address)) &&
          !compareStringsInsentively(details?.auctionDetails?.highestBidder, NULL_TOKEN_ADDRESS) &&
          details?.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
          details?.auctionDetails?.buyer &&
          new Date(details?.auctionDetails?.closingTime).getTime() < new Date().getTime() && (
            <Button
              classID="w-full mt-2"
              color="neon"
              fullWidth
              loading={istLoading}
              size="medium"
              variant="solid"
              onClick={handleClaim}
            >
              Claim
            </Button>
          )}

        <BuyModal />
        <BidModal />
        <PutOnSaleModal />
        <ReceivedItemModal />
      </div>
    </div>
  )
}
