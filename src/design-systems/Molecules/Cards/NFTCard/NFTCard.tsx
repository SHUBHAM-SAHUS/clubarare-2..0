import { useCallback, useMemo, useState } from 'react'
import NextLink from 'next/link'

import { PriceCard } from '../PriceCard'

import { NFTCardProps } from './interfaces'

import { Card } from 'design-systems/Atoms/Card'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { DotsThreeVerticalIcon, LazyLeoIcon } from 'design-systems/Atoms/Icons'
import { IconButton } from 'design-systems/Atoms/IconButton'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { File } from 'design-systems/Molecules/File'
import { Timer } from 'design-systems/Atoms/Timer'
import { Dropdown } from 'design-systems/Molecules/Dropdown'
import { AUCTION_TYPES, PAGE_ROUTES, classNames, compareStringsInsentively } from 'utils'
import { useConnector } from 'context'
import { CollectibleService } from 'api-services'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useToast } from 'hooks/useToast'

export const NFTCard: React.FC<NFTCardProps> = ({
  id,
  size = 'medium',
  user,
  product,
  status,
  editable = false,
  auctionDetails,
  refetchAssets,
}) => {
  const [saleStatus, setSaleStatus] = useState<string | undefined>(status)
  const { successToast, warningToast } = useToast()
  const { isSigned } = useConnector()
  const { authUser: activatingUser } = useGlobalState()
  const address = activatingUser?.walletAddress
  const imageClassName = useMemo(
    () =>
      classNames(
        'xs:!min-w-[169px] xs:!max-w-[295px] xs:!min-h-[150px] xs:!min-w-[150px] sm:!min-w-[200px] sm:!min-h-[200px] sm:!max-w-[395px]  md:!max-w-[415px] w-full rounded-xs mb-1 object-cover !min-h-[297px]  !min-w-[295px] !max-h-[395px] !max-w-[292px] xl:!min-h-[310px] xl:!min-w-[310px] xl:!max-w-[325px] xl:!max-h-[310px] xxl:!min-h-[333px] xxl:!max-h-[333px] xxl:!min-w-[340px] xxl:!max-w-[415px] hover:brightness-75 hover:dark:brightness-50 xl:!rounded-xs',
        'hover:scale-110 duration-500 transition-all z-10'
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size, saleStatus]
  )

  const handleClickAvatar = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }, [])

  const nftStatus = useMemo(() => {
    if (saleStatus === 'sold') {
      return <span className="font-RobotoCondensed text-xs md:text-paragraph">Sold</span>
    }

    if (saleStatus === 'listed' || saleStatus === 'future') {
      if (auctionDetails?.auctionType === '1') {
        return (
          <Button className="hidden group-hover:block" color="primary" size="small" variant="solid">
            BUY
          </Button>
        )
      }
      if (auctionDetails?.auctionType === '2' && new Date(auctionDetails?.startingTime) > new Date()) {
        return (
          <>
            <div className="block">
              <Timer
                endTime={new Date(auctionDetails.startingTime)}
                size="medium"
                status="pending"
                updateStatus={setSaleStatus}
              />
            </div>
          </>
        )
      } else if (auctionDetails?.auctionType === '2' && auctionDetails?.closingTime) {
        return (
          <>
            <div className="block group-hover:hidden">
              <Timer endTime={new Date(auctionDetails.closingTime)} size="medium" updateStatus={setSaleStatus} />
            </div>
            <Button className=" hidden group-hover:block" color="primary" size="small" variant="solid">
              PLACE BID
            </Button>
          </>
        )
      }
    }

    if (saleStatus === 'ended' && auctionDetails?.closingTime) {
      return <Timer endTime={new Date(auctionDetails.closingTime)} size="medium" status={saleStatus} />
    }
  }, [auctionDetails?.auctionType, auctionDetails?.closingTime, saleStatus])

  const dropDownOptions = useMemo(() => {
    const options = []
    if (
      isSigned &&
      address &&
      product?.collectibleOwner &&
      ((compareStringsInsentively(activatingUser?.role, 'user') &&
        !activatingUser?.isSuperAdmin &&
        compareStringsInsentively(address, product.collectibleOwner)) ||
        compareStringsInsentively(activatingUser?.role, 'admin') ||
        activatingUser?.isSuperAdmin) &&
      (!product?.onSale ||
        (product?.onSale && auctionDetails?.auctionType === AUCTION_TYPES.FIXED) ||
        (product?.onSale &&
          auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
          product?.history?.bid?.length === 0))
    ) {
      options.push({
        title: product?.isHide ? 'Unhide Item' : 'Hide Item',
        value: product?.isHide ? 'Unhide Item' : 'Hide Item',
      })
    }
    return options
  }, [auctionDetails, address, activatingUser, isSigned])

  const handleHideCollectibleStatus = useCallback(async () => {
    const statusPayload: HideStatusObject = {
      _id: id,
    }
    const hideDataResponse = await CollectibleService.hideCollectible(statusPayload)
    if (hideDataResponse.status) {
      successToast('NFT hide status updated successfully')
    } else {
      warningToast(hideDataResponse.message)
    }
    refetchAssets?.()
  }, [])

  const handleRedirectClick = (event?: React.MouseEvent<HTMLElement>) => {
    if (event?.currentTarget?.classList.contains('no-redirect')) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  return (
    <NextLink className="m-0 w-full p-0" href={PAGE_ROUTES.product(id)}>
      <Card className="relative mb-2 flex flex-col justify-between !p-0">
        {size !== 'small' && (
          <File
            alt={product.file.alt ?? 'clubrare-auctionDetails-file'}
            className={imageClassName}
            height={350}
            src={product.file.src}
            type={product.file.type}
            width={350}
          />
        )}
        <Card className={`z-20 min-h-[105px] flex-none !p-[6px]`} rounded={false}>
          <div className=" mb-1 flex items-center justify-between md:mb-3">
            <div className="flex w-full md:justify-start">
              <NextLink href={PAGE_ROUTES.profile(user.address)} onClick={handleClickAvatar}>
                <Avatar
                  className="hidden min-w-[40px] truncate whitespace-nowrap md:mr-2 md:flex"
                  size="small"
                  src={user.avatar ? user.avatar + '?auto=format&w=40&h=40' : ''}
                  verified={user.verified}
                />
              </NextLink>
              <div className="flex w-4/6 flex-col-reverse md:flex-col">
                <Typography
                  className="hidden truncate text-neutral-400 dark:text-neutral-600 md:flex md:text-caption"
                  variant="condensed"
                >
                  {user.username}
                </Typography>
                <Typography
                  className="truncate text-caption font-normal text-neutral-100 dark:text-neutral-700 md:text-body"
                  variant="condensed"
                >
                  {product.title}
                </Typography>
                {editable && (
                  <IconButton className=" group absolute right-0 top-0" variant="gray">
                    <DotsThreeVerticalIcon className="h-8 w-8 fill-neutral-500 group-active:fill-neutral-100" />
                  </IconButton>
                )}
              </div>
            </div>

            <div
              className="nft-card-dropdown-wrp no-redirect"
              onClick={(e: React.MouseEvent<HTMLElement>) => handleRedirectClick(e)}
            >
              {isSigned &&
                address &&
                product?.collectibleOwner &&
                ((compareStringsInsentively(activatingUser?.role, 'user') &&
                  !activatingUser?.isSuperAdmin &&
                  compareStringsInsentively(address, product.collectibleOwner)) ||
                  compareStringsInsentively(activatingUser?.role, 'admin') ||
                  activatingUser?.isSuperAdmin) &&
                (!product?.onSale ||
                  (product?.onSale && auctionDetails?.auctionType === AUCTION_TYPES.FIXED) ||
                  (product?.onSale &&
                    auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
                    product?.history?.bid?.length === 0)) && (
                  <Dropdown
                    className="dropdown-with-button text-bold active::bg-neutral-500 no-redirect no-redirect  h-8 w-8 fill-neutral-500 !px-0 group-active:fill-neutral-100"
                    dropdownClass="nft-card-dropdown-menu"
                    options={dropDownOptions}
                    placeholder={
                      <DotsThreeVerticalIcon className="h-8 w-8 fill-neutral-300 group-active:fill-neutral-100 dark:fill-neutral-700" />
                    }
                    onChange={handleHideCollectibleStatus}
                  />
                )}
            </div>
          </div>

          <div className="flex min-h-[55px] items-center justify-between">
            {product.price?.label && product.price?.amount && (
              <PriceCard
                label={product.price?.label}
                networkId={product.networkId}
                price={product.price?.amount}
                size="medium"
                token={product?.price?.token}
              />
            )}
            {auctionDetails?.isTokenGated && (
              <div className="flex items-start justify-normal">
                <LazyLeoIcon />
                <Typography className="ml-1" size="body" variant="condensed">
                  LLC Only
                </Typography>
              </div>
            )}
            <div className="flex w-24 items-end justify-end">{nftStatus}</div>
          </div>
        </Card>
      </Card>
    </NextLink>
  )
}
