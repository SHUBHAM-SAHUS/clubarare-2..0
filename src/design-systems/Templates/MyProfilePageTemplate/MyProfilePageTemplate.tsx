import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useActiveObject } from '@layerhub-io/react'

import { FilterType, MyProfilePageTemplateProps } from './interface'
import {
  countClassName,
  emojiReaction,
  initialUserDetails,
  itemCenterClassName,
  listClassName,
  textClassName,
} from './utils'

import { useConnector, useOverlay, useSpace } from 'context'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { Button } from 'design-systems/Atoms/Button'
import { CardCarousel } from 'design-systems/Molecules/Carousel'
import { CustomURL } from 'design-systems/Molecules/CustomURL'
import { EditControl } from 'design-systems/Molecules/EditControl'
import { EmojiButtonGroup } from 'design-systems/Molecules/ButtonGroups/EmojiButtonGroup'
import { Image } from 'design-systems/Atoms/Image'
import { NFTCard } from 'design-systems/Molecules/Cards/NFTCard'
import { NFTCardSkeleton } from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { NotFound } from 'design-systems/Molecules/NotFound'
import { OverlayIds } from 'design-systems/Organisms/Managers/OverlayManager'
import { ShareModal } from 'design-systems/Molecules/Modals/ShareModal'
import { Space } from 'design-systems/Organisms/Profile/Space'
import { Typography } from 'design-systems/Atoms/Typography'
import { WalletAddress } from 'design-systems/Molecules/Wallet/WalletAddress'
import { FollowModal as FollowModalContent } from 'design-systems/Molecules/Modals/FollowModal'
import { useModal } from 'design-systems/Atoms/Modal'
import { SelectedFollowModalState } from 'design-systems/Molecules/Modals/FollowModal'
import { HeartIcon, ShareIcon, CaretDoubleDownIcon, CaretDoubleUpIcon, SpaceIcon } from 'design-systems/Atoms/Icons'
import {
  shortWalletAddress,
  getNftPrice,
  getSaleStatus,
  classNames,
  compareStringsInsentively,
  LIVE_URL_V2,
} from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { FollowModalButtons } from 'design-systems/Molecules/Modals/FollowModal/FollowModalButtons'
import { useExportSpace } from 'hooks/api/useExportSpace'
import { useFollowers } from 'hooks/api/useFollowers'
import { useGetSpaceAssets } from 'hooks/api/useGetSpaceAssets'
import { useToggle } from 'hooks/useToggle'

export const MyProfilePageTemplate: React.FC<MyProfilePageTemplateProps> = ({
  filterType,
  isLoadingUserAssets,
  userAssets,
  userIdOrAddress,
  userProfile,
  onChangeFilterType,
  refetchUserAssets,
}) => {
  /* Context */
  const { openOverlay } = useOverlay()
  const { openEditor, setOpenEditor } = useSpace()
  const { isSigned } = useConnector()
  const { authUser: currentUser } = useGlobalState()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const activeObject = useActiveObject()

  const [showEmojis, setShowEmojis] = useState<boolean>(false)
  const [showEditorControl, setShowEditorControl] = useState<boolean>(false)
  const [showShareModal, setShowShareModal] = useToggle(false)
  const [selectedFollowState, setSelectedFollowState] = useState<SelectedFollowModalState>()

  const { spaceData } = useGetSpaceAssets(userIdOrAddress)
  const { isSaving, exportSpaceAsync } = useExportSpace(spaceData?.id)
  const { isFollow, followUserAsync, unFollowUserAsync, followers, refetchFollowers, refetchIsFollow } = useFollowers(
    userProfile?.id
  )
  const [isFollowUser, setFollowUser] = useState<boolean>(isFollow || false)
  const [followersCount, setFollowersCount] = useState<number>(followers ? followers?.follower?.length : 0)
  const [followingsCount, setFollowingsCount] = useState<number>(followers ? followers?.following?.length : 0)
  const [isMore, toggleIsMore] = useToggle(false)

  const isGuest = useMemo(
    () =>
      !compareStringsInsentively(String(currentUser?.walletAddress), userIdOrAddress) &&
      !compareStringsInsentively(String(currentUser?.customUrl), userIdOrAddress),
    [currentUser?.customUrl, currentUser?.walletAddress, userIdOrAddress]
  )

  useEffect(() => {
    setFollowersCount(followers ? followers?.follower?.length : 0)
    setFollowingsCount(followers ? followers?.following?.length : 0)
  }, [followers])

  useEffect(() => {
    setFollowUser(isFollow || false)
  }, [isFollow])

  const activeUserProfile = useMemo(
    () => ({
      ...initialUserDetails,
      bio: userProfile?.bio || '',
      customUrl: userProfile?.customUrl || userProfile?.walletAddress,
      id: userProfile?.id || '',
      profileName: userProfile?.name || shortWalletAddress(userProfile?.walletAddress),
      src: userProfile?.image || '',
      verification: userProfile?.isWhiteListedSeller ? 'verified' : '',
      walletAddress: userProfile?.walletAddress || '',
    }),
    [userProfile]
  )

  const profileBio = useMemo(() => {
    return !isMore && userProfile?.bio
      ? `${userProfile.bio?.slice(0, 150)}${String(userProfile.bio).length > 150 ? '...' : ''}`
      : userProfile?.bio
  }, [userProfile, isMore])

  useEffect(() => {
    if (activeObject) {
      setShowEditorControl(true)
    } else setShowEditorControl(false)
  }, [activeObject])

  const renderNFTCards = useCallback((isLoading: boolean, userAssets: AssetObject[], refetchData?: AnyFunction) => {
    if (isLoading) {
      return Array(6).fill(<NFTCardSkeleton />)
    }

    return (
      userAssets?.map(asset => (
        <NFTCard
          auctionDetails={asset?.auctionDetails}
          editable={false}
          id={asset?.id}
          key={asset?.id}
          product={{
            collectibleOwner: asset?.collectibleOwner,
            file: {
              alt: asset?.title,
              src: asset?.previewUrl,
              type: asset?.fileContentType,
            },
            history: asset?.history,
            isHide: asset?.isHide,
            networkId: asset?.networkId,
            onSale: asset?.onSale,
            price: getNftPrice(asset),
            title: asset?.title,
          }}
          refetchAssets={refetchData}
          size="large"
          status={getSaleStatus(asset)}
          user={{
            address: asset?.userObj.walletAddress,
            avatar: asset?.userObj?.image || asset?.previewUrl,
            username: asset?.userObj?.name ? asset?.userObj?.name : shortWalletAddress(asset?.userObj.walletAddress),
          }}
        />
      )) ?? []
    )
  }, [])

  const userNFTElements = useMemo(() => {
    return renderNFTCards(isLoadingUserAssets, userAssets, refetchUserAssets)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUserAssets, userAssets])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setShowEmojis(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [dropdownRef])

  const handleIconClick = () => {
    setShowEmojis(!showEmojis)
  }

  const handleFollow = async () => {
    if (!isFollowUser) {
      setFollowUser(!isFollowUser)
      setFollowersCount(prev => prev + 1)

      await followUserAsync({ user_id: userProfile?.id })
      await refetchFollowers?.()
      await refetchIsFollow?.()
    } else {
      setFollowUser(!isFollowUser)
      setFollowersCount(prev => prev - 1)
      await unFollowUserAsync({ user_id: userProfile?.id })
      await refetchFollowers?.()
      await refetchIsFollow?.()
    }
  }

  const { Modal: FollowModal, open: openFollowModal } = useModal(
    <FollowModalContent
      followers={followers?.follower}
      following={followers?.following}
      refetchFollowers={refetchFollowers}
      selectState={selectedFollowState}
    />,
    <FollowModalButtons
      followers={followers?.follower?.length}
      following={followers?.following?.length}
      state={selectedFollowState}
      onStateChange={setSelectedFollowState}
    />,
    undefined
  )

  return (
    <div>
      <div className="relative mx-2 mb-5 bg-neutral-800 p-2 dark:bg-neutral-300 md:mx-auto md:rounded-xs md:p-8 lg:w-1008">
        <div className="flex flex-col-reverse justify-between md:flex-row">
          <div className="">
            <div className={`${itemCenterClassName} justify-between md:justify-start`}>
              <div className="flex items-center">
                {activeUserProfile.src ? (
                  <Image
                    alt="Profile"
                    className="h-12 w-12 rounded-md"
                    height={48}
                    src={activeUserProfile.src + '?auto=format&w=40&h=40'}
                    width={48}
                  />
                ) : (
                  <Avatar size="medium" />
                )}
                <Typography className="ml-2 text-body leading-body dark:text-neutral-800">
                  {activeUserProfile.profileName}
                </Typography>
              </div>
              <WalletAddress className="ml-12" walletAddress={activeUserProfile.walletAddress} />
            </div>
          </div>
          {isSigned && (
            <div className="mb-4 flex justify-end md:mb-0 md:items-center">
              {isGuest ? (
                <Button
                  className="h-7 font-medium dark:!text-neutral-600 dark:shadow-outlined-dark-default hover:dark:!text-neutral-100"
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={handleFollow}
                >
                  {isFollowUser ? 'FOLLOWING' : 'FOLLOW'}
                </Button>
              ) : (
                <Button
                  className="h-7 font-medium dark:!text-neutral-800 dark:shadow-outlined-dark-default"
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={() => openOverlay(OverlayIds.EDIT_PROFILE, { userIdOrAddress })}
                >
                  EDIT PROFILE
                </Button>
              )}
            </div>
          )}
        </div>
        <div>
          <Typography className={`${itemCenterClassName} mt-2 break-all dark:text-neutral-800`} size="paragraph">
            {profileBio}
          </Typography>
          <div
            className={`mt-2 flex cursor-pointer items-center gap-4 ${
              activeUserProfile && activeUserProfile.bio?.length < 150 && 'hidden'
            }`}
            onClick={toggleIsMore}
          >
            <Typography className="text-neutral-400 dark:text-neutral-500" size="body" variant="condensed">
              View {!isMore ? 'More' : 'Less'}
            </Typography>
            {!isMore ? (
              <CaretDoubleDownIcon className="stroke-neutral-400 dark:stroke-neutral-500" />
            ) : (
              <CaretDoubleUpIcon className="stroke-neutral-400 dark:stroke-neutral-500" />
            )}
          </div>
        </div>

        <div className={`${itemCenterClassName} mt-2`}>
          <div
            className={`${itemCenterClassName} cursor-pointer`}
            onClick={() => {
              setSelectedFollowState(SelectedFollowModalState.Followings)
              openFollowModal()
            }}
          >
            <Typography className={countClassName} size="paragraph">
              {followingsCount}
            </Typography>
            <Typography className={textClassName} size="small">
              Following
            </Typography>
          </div>
          <div
            className={`${itemCenterClassName} ml-16 cursor-pointer`}
            onClick={() => {
              setSelectedFollowState(SelectedFollowModalState.Followers)
              openFollowModal()
            }}
          >
            <Typography className={countClassName} size="paragraph">
              {followersCount}
            </Typography>
            <Typography className={textClassName} size="small">
              Followers
            </Typography>
          </div>
          <FollowModal />
        </div>
        <Space
          className="mt-2 lg:!w-full"
          isConnected={isSigned}
          isEmptySpace={userProfile?.isEmptySpace}
          isGuest={isGuest}
          spaceImage={userProfile?.spaceImage}
          spaceUrl={spaceData?.spaceUrl}
          userIdOrAddress={userIdOrAddress}
        />
        <div className="mt-4 flex items-center justify-end md:justify-between ">
          {showEditorControl && !isGuest && openEditor ? (
            <div className="fixed bottom-0 left-0 right-0 z-[299] md:static">
              <EditControl />
            </div>
          ) : (
            <div className="hidden w-1/2 md:block">
              <CustomURL url={`${LIVE_URL_V2}/profile/${activeUserProfile.customUrl}/`} urlClassName="w-187" />
            </div>
          )}
          <div className="flex w-1/2 items-center justify-end">
            <div className="group relative">
              {showEmojis && (
                <div
                  className="fixed bottom-0 left-0 right-0 z-50 md:absolute md:bottom-12 md:left-auto md:right-2"
                  ref={dropdownRef}
                >
                  <EmojiButtonGroup
                    initialCount={emojiReaction}
                    isSigned={isSigned}
                    userProfileId={activeUserProfile?.id}
                    walletAddress={activeUserProfile.walletAddress}
                  />
                </div>
              )}
              <div className="group flex cursor-pointer flex-col items-center pr-4" onClick={handleIconClick}>
                <HeartIcon
                  className="stroke-neutral-500 group-hover:stroke-neutral-400 dark:stroke-neutral-500 dark:group-hover:stroke-neutral-600"
                  height="22"
                  width="22"
                />
                <Typography
                  className="text-neutral-500 group-hover:text-neutral-400 dark:text-neutral-500 dark:group-hover:text-neutral-600"
                  size="small"
                >
                  React
                </Typography>
              </div>
            </div>

            <div className="group flex cursor-pointer flex-col items-center" onClick={() => setShowShareModal()}>
              <ShareIcon className="stroke-neutral-500 group-hover:stroke-neutral-400 dark:stroke-neutral-500 dark:group-hover:stroke-neutral-600" />
              <Typography
                className="text-neutral-500 group-hover:text-neutral-400 dark:text-neutral-500 dark:group-hover:text-neutral-600"
                size="small"
              >
                Share
              </Typography>
            </div>
            {showShareModal && (
              <div className=" filterOverlayOverFlowHidden lg:backdrop-neutral fixed inset-0 z-[2999] bg-neutral-800 dark:bg-neutral-300 md:bg-transparent md:backdrop-blur-lg md:dark:bg-transparent lg:bg-transparent">
                <ShareModal
                  text={activeUserProfile.profileName}
                  url={`${LIVE_URL_V2}/profile/${activeUserProfile.customUrl}/`}
                  onClose={() => setShowShareModal()}
                />
              </div>
            )}
            {!isGuest && (
              <div
                className="ml-4 hidden md:block"
                onClick={() => {
                  openOverlay(OverlayIds.TOOLBOX)
                  setOpenEditor(true)
                }}
              >
                <SpaceIcon
                  className="h-10 w-10 cursor-pointer items-center rounded-full bg-neutral-100"
                  fill="bg-neutral-100"
                  stroke="#F6F6F6"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mx-4 mt-[80px] md:mx-0 md:mt-[0px] md:p-12">
        <div className="flex items-center justify-start">
          <Typography className="md:text-h4 md:font-bold md:leading-h4 md:tracking-h4" size="body">
            NFTs by {activeUserProfile.profileName}
          </Typography>
          {/*
           * NOTE: hide dashboard button since some features are not ready yet
           * TODO: activate dashboard page when escrow feature is enabled
           */}
          {/*
          <Button
            size="small"
            color="primary"
            variant="outlined"
            className="h-7 font-medium dark:!text-neutral-600 dark:shadow-outlined-dark-default hover:dark:!text-neutral-100"
            onClick={() => router.push(PAGE_ROUTES.dashboard)}
          >
            DASHBOARD
          </Button>
          */}
        </div>
        <div className="flex items-end justify-between px-0 py-4 md:block  md:items-center md:px-0 lg:flex lg:px-0">
          <ul className="flex gap-6">
            <li
              className={classNames(listClassName, filterType === 'on space' && 'border-b-2')}
              onClick={() => onChangeFilterType(FilterType.Space)}
            >
              ON SPACE
            </li>
            <li
              className={classNames(listClassName, filterType === 'on sale' && 'border-b-2')}
              onClick={() => onChangeFilterType(FilterType.Sale)}
            >
              ON SALE
            </li>
            <li
              className={classNames(listClassName, filterType === 'all' && 'border-b-2')}
              onClick={() => onChangeFilterType(FilterType.All)}
            >
              ALL
            </li>
          </ul>
          {/*
           * NOTE: Hide toggle button since marketplace is supporting only physical nft
           */}
          {/*
          <div className="flex items-center justify-end">
            <Toggle label="PHYGITAL ONLY" onChange={onToggleOnlyPhygitalAsset} defaultCheck={onlyPhygitalAsset} />
          </div>
          */}
        </div>
        {!userAssets?.[0] ? (
          <NotFound className="!min-h-[40vh]">
            <Typography className="text-paragraph text-neutral-400" variant="condensed">
              No NFTS Found
            </Typography>
          </NotFound>
        ) : (
          <CardCarousel
            className={'xs:px-0 xs:py-8 md:px-6'}
            cols={4}
            elements={userNFTElements}
            mobileCols={2}
            removeArrowOnDeviceType={['mobile', 'tablet']}
          />
        )}
      </div>
    </div>
  )
}
