import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'

import { ListItemProps, ProductPageTemplateProps } from './interface'
import { VALIDATED_DATE_FORMAT } from './utils'

import { ActivityIcon, InfoIcon, SliderIcon } from 'design-systems/Atoms/Icons'
import { DataCard } from 'design-systems/Molecules/Cards/DataCard'
import { NftCarousel } from 'design-systems/Molecules/NftCarousel'
import { ProductCard } from 'design-systems/Molecules/Cards/ProductCard'
import { LoadingBoundary } from 'design-systems/Organisms/LoadingBoundary'
import { OverlayIds } from 'design-systems/Organisms/Managers/OverlayManager'
import { Table } from 'design-systems/Organisms/Table'
import { NFTCardSkeleton } from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { Typography } from 'design-systems/Atoms/Typography'
import { TableRow } from 'design-systems/Organisms/Table/interface'
import { CoaButton } from 'design-systems/Molecules/Buttons/CoaButton'
import { AuthenticationStatus, getAuthenticationStatus } from 'design-systems/Molecules/Cards/ProductCard/utils'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { Badge, BadgeVariant } from 'design-systems/Atoms/Badge'
import { MOCK_TABLE_HEADER, PLATFORM_FEE, shortWalletAddress } from 'utils'
import { useConnector, useOverlay } from 'context'
import { useLike } from 'hooks/api/useLikes'
import { useSingleActivity } from 'hooks/api/useSingleActivity'
import { useSingleAsset } from 'hooks/api/useSingleAsset'

const ListItem = ({ label, value }: ListItemProps) => (
  <div className="flex">
    <Typography className="w-1/2 text-neutral-500 lg:w-1/3" size="lg" variant="condensed">
      {label}
    </Typography>
    <Typography className="w-1/2 text-neutral-100 dark:text-neutral-800 lg:w-2/3" size="lg" variant="condensed">
      {value}
    </Typography>
  </div>
)

const NFTCardPlaceholderList: React.FC = () => {
  return (
    <>
      {Array.from(new Array(12)).map((_, index) => (
        <NFTCardSkeleton key={index} />
      ))}
    </>
  )
}

export function ProductPageTemplate({ productId }: ProductPageTemplateProps) {
  const { address, isSigned } = useConnector()
  // TODO add placeholder in loading state
  const { isLoadingAsset, asset } = useSingleAsset(productId, address)
  const { activity } = useSingleActivity(productId)
  const { createLikeAsync } = useLike()
  const [isLike, setIsLike] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [history, setHistory] = useState<TableRow[] | [] | undefined>(activity)
  const { openOverlay } = useOverlay()

  const [checked, setChecked] = useState<string[]>([])
  const coaLink = useMemo(() => (asset.isCoa && asset.urlCoa) ?? asset.urlCoa, [asset])
  const imgWithType = useMemo(() => ({ type: asset && asset.fileContentType, url: asset && asset.s3Url }), [asset])

  // NOTE: get asset authenticated status
  const authenticated = useMemo(() => {
    const status = getAuthenticationStatus(asset)
    const visible = [
      AuthenticationStatus.AUTHENTICATED,
      AuthenticationStatus.FAILED,
      AuthenticationStatus.PENDING,
    ].includes(status)

    let variant: BadgeVariant = 'authenticated'
    let label = 'AUTHENTICATED'
    switch (status) {
      case AuthenticationStatus.AUTHENTICATED:
        variant = 'authenticated'
        label = 'AUTHENTICATED'
        break
      case AuthenticationStatus.FAILED:
        variant = 'failed'
        label = 'AUTHENTICATION FAILED'
        break
      case AuthenticationStatus.PENDING:
        variant = 'authenticated'
        label = 'AUTHENTICATION PENDING'
        break
    }

    return {
      label,
      variant,
      visible,
    }
  }, [asset])

  useMemo(() => {
    setLikeCount(asset?.totalLike)
    setIsLike(asset?.isLike)
  }, [asset?.totalLike, asset?.isLike])

  const collectibleImageList: ImageRuleObject[] = useMemo(() => {
    const additionalImages =
      asset?.additionalImages && asset?.additionalImages?.length > 0
        ? asset?.additionalImages?.map((imgUrl, index) => ({
            description: '',
            id: '',
            imageRuleId: index,
            isRequired: false,
            name: '',
            type: 'image/',
            url: imgUrl,
          }))
        : []

    const imgRules = asset?.imageRules?.length
      ? asset?.imageRules.map(item => {
          item.type = 'image/'
          return item
        })
      : []
    return [...imgRules, ...additionalImages]
  }, [asset])

  const creatorName = useMemo(
    () =>
      asset && asset?.ownerObj?.name
        ? asset?.ownerObj?.name
        : asset?.ownerObj?.walletAddress
        ? shortWalletAddress(asset?.ownerObj?.walletAddress)
        : asset?.collectibleOwner
        ? shortWalletAddress(asset?.collectibleOwner)
        : '',
    [asset]
  )

  const onClickLike = async () => {
    if (isSigned) {
      const { data } = await createLikeAsync({ productId })
      setIsLike(data.isLike)
      setLikeCount(data.totalLike)
    } else {
      openOverlay(OverlayIds.PROFILE)
    }
  }

  const checkHandler = (state: boolean, label = '') => {
    if (checked.includes(label)) {
      const newCheckedList = checked.filter((val: string) => val !== label)
      setChecked(newCheckedList)
    } else {
      setChecked((pre: any) => [...pre, label])
    }
  }

  useEffect(() => {
    // TODO: this code block should be refactored
    if (checked.length !== 0) {
      let arr: any = []
      for (let i = 0; i < checked.length; i++) {
        const newData: any = activity?.filter((e: any) => e.type === checked[i])
        arr = [...arr, ...newData]
      }
      setHistory(arr)
    } else {
      setHistory(activity)
    }
  }, [activity, checked])

  return (
    <LoadingBoundary loading={isLoadingAsset} size="full">
      <div className="relative m-auto flex max-w-1600 flex-col gap-4 px-4 py-4 md:py-8 md:pr-24">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            {asset ? (
              <NftCarousel defaultFile={imgWithType} imageArray={collectibleImageList} />
            ) : (
              <NFTCardPlaceholderList />
            )}
          </div>
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            <ProductCard
              asset={asset}
              creatorName={creatorName}
              isLike={isLike}
              likeCount={likeCount}
              onClickLike={onClickLike}
            />
            {/* Attributes section */}
            <DataCard icon={<SliderIcon className="h-6 w-6" />} label="ATTRIBUTES">
              <div className="grid grid-cols-2 gap-3 px-2 py-2 text-neutral-100">
                {asset.customFields?.map((item: CustomFieldsObject) => (
                  <div
                    className="flex flex-col items-center justify-center gap-2 rounded-xs bg-neutral-700 p-6"
                    key={item.id}
                  >
                    <Typography className="text-center" size="caption">
                      {item.key}
                    </Typography>
                    <Typography className="text-center" size="lg">
                      {item.value}
                    </Typography>
                  </div>
                ))}
              </div>
            </DataCard>

            {/* Details Section */}
            <DataCard
              icon={
                <InfoIcon
                  className="h-6 w-6"
                  fill="stroke-neutral-100 dark:stroke-neutral-600"
                  stroke="stroke-neutral-100 dark:stroke-neutral-600"
                />
              }
              label="DETAILS"
            >
              <div className="flex flex-col gap-3 px-2 py-2 lg:px-6">
                <ListItem label="Network" value={asset.networkId === '1' ? 'Ethereum' : 'Klaytn'} />
                <ListItem label="Creator Royalties" value={`${Number(asset.royalties)}%`} />
                <ListItem label="Platform Fee" value={`${PLATFORM_FEE}%`} />
                <ListItem label="Token Address" value={shortWalletAddress(asset.collectionAddress)} />
              </div>
            </DataCard>
            {/*
            <div className="w-full sm:block md:hidden">
              <DataCard
                label="PRICE HISTORY"
                icon={<ChartLineUpIcon className="h-6 stroke-neutral-100 dark:stroke-neutral-800" />}
              >
                <Typography className="text-center">Coming soon</Typography>
              </DataCard>
            </div> 
            */}

            {/* Authentication section */}
            {authenticated.visible && (
              <DataCard
                icon={<Badge className="flex items-center justify-center" variant={authenticated.variant} />}
                label={authenticated.label}
              >
                <div className="flex flex-col gap-3 px-2 py-2 lg:px-6">
                  <ListItem label="Location" value="Delaware, MD" />
                  <ListItem
                    label="Date"
                    value={moment(new Date(asset.validatedOn ?? asset.createdOn))
                      .format(VALIDATED_DATE_FORMAT)
                      .toString()}
                  />

                  <div className="flex">
                    <Typography className="w-1/2 text-neutral-500 lg:w-1/3" size="lg" variant="condensed">
                      COA
                    </Typography>
                    {coaLink ? <CoaButton coaLink={coaLink} /> : '-'}
                  </div>
                </div>
              </DataCard>
            )}
          </div>
        </div>

        {/* <div className="w-full lg:w-1/2">
          <DataCard
            label="PRICE HISTORY"
            icon={<ChartLineUpIcon className="h-6 w-6 stroke-neutral-100 dark:stroke-neutral-800" />}
          >
            TODO add price analytics history chart
            <Typography className="text-center">Coming soon</Typography>
          </DataCard>
        </div> 
        */}

        {/* Activity history section */}
        <DataCard icon={<ActivityIcon className="h-6 w-6" />} label="ACTIVITY">
          <div className="flex flex-col items-center justify-center gap-3 px-8 py-3">
            <Typography className="hidden lg:flex" size="body">
              FILTER
            </Typography>
            <div className="hidden gap-16 lg:flex">
              <Checkbox label="PURCHASED" onChange={checkHandler} />
              <Checkbox label="LISTED" onChange={checkHandler} />
              <Checkbox label="TRANSFER" onChange={checkHandler} />
              <Checkbox label="BID" onChange={checkHandler} />
            </div>

            {/* TODO update headers instead of using MOCK */}
            {/* TODO table is not responsive at all */}
            <Table headers={MOCK_TABLE_HEADER} networkId={asset?.networkId} rowData={history || []} />
          </div>
        </DataCard>

        {/* <div className="absolute right-6 top-8 hidden flex-col items-center gap-4 lg:flex">
          <Avatar />
          <IconButton variant="transparent">
            <TruckIcon />
          </IconButton>
          <IconButton variant="transparent">
            <QuestionIcon />
          </IconButton>
        </div> */}
      </div>
    </LoadingBoundary>
  )
}
