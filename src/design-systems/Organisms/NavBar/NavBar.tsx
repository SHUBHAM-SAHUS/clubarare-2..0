import { useState, useCallback, useMemo, useEffect } from 'react'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import EllipsisHorizontalIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon'
import { useRouter } from 'next/router'

import { OverlayIds } from '../Managers/OverlayManager'

import { NavBarProps } from './interface'
import { DROPDOWN_OPTIONS_VERSION } from './utils'

import { useConnector, useNFTCreation, useOverlay } from 'context'
import { CLUBRARE_SOCIAL_LINKS, PAGE_ROUTES, disableAnnouncement, getAnnouncement, parseBoolean } from 'utils'
import { Alert } from 'design-systems/Molecules/Alert'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { Dropdown } from 'design-systems/Molecules/Dropdown'
import { Typography } from 'design-systems/Atoms/Typography'
import { Input } from 'design-systems/Atoms/Input'
import { Button } from 'design-systems/Atoms/Button'
import { Link } from 'design-systems/Atoms/Link'
import {
  CloseIcon,
  LeftAnnouncementIcon,
  BinocularsIcon,
  SearchIcon,
  ClubrareNavBarIcon,
  RewardsCoinsIcon,
} from 'design-systems/Atoms/Icons'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useToggle } from 'hooks/useToggle'

export const NavBar: React.FC<NavBarProps> = ({ className = '' }) => {
  const router = useRouter()
  const [isShowAlert, , showAlert, , hideAlert] = useToggle(false)
  const initialSearch = router.query?.search
  const { openOverlay } = useOverlay()
  const { openNFTCreation } = useNFTCreation()
  const { isSigned } = useConnector()
  const { authUser: activatingUser } = useGlobalState()
  const [search, setSearch] = useState<string>((router.query.search as string) ?? '')
  const [currentV, setCurrentV] = useState<string>(DROPDOWN_OPTIONS_VERSION[1].value)

  const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const handleSearch = useCallback(
    (reset: boolean) => {
      router.push({
        pathname: PAGE_ROUTES.explore,
        query: reset
          ? {}
          : {
              search,
            },
      })

      if (reset) {
        setSearch('')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch(false)
      }
    },
    [handleSearch]
  )

  const searchAction = useMemo(() => {
    return initialSearch ? (
      <button type="button" onClick={() => handleSearch(true)}>
        <CloseIcon className="fill-neutral-500" />
      </button>
    ) : (
      <button type="button" onClick={() => handleSearch(false)}>
        <SearchIcon className="fill-neutral-500" />
      </button>
    )
  }, [handleSearch, initialSearch])

  const handleChangeVersion = (data: { title: string; value: string }) => {
    setCurrentV(data?.title)
    router.push(data?.value)
  }

  useEffect(() => {
    setSearch((router.query.search as string) ?? '')
  }, [router.query.search])

  useEffect(() => {
    if (isSigned && router.route === PAGE_ROUTES.home) showAlert(!parseBoolean(getAnnouncement()))
    else hideAlert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSigned, router.route])

  const handleCloseAnnouncement = () => {
    hideAlert()
    disableAnnouncement()
  }

  return (
    <div className="md:fixed md:left-0 md:right-0 md:top-0 md:z-[1001]">
      <Alert
        buttonColor="neon"
        className="!rounded-none border-0 border-neutral-100 bg-brand-800 text-neutral-100 dark:border-brand-800 dark:bg-neutral-100 dark:text-brand-800 "
        icon={
          <LeftAnnouncementIcon
            className="stroke-neutral-100 dark:stroke-brand-800"
            stroke="stroke-neutral-100 dark:stroke-brand-800"
          />
        }
        isShowAlert={isShowAlert}
        isShowButton={false}
        message={
          <>
            Authentication Launch Promotion Valid Through July 31st - Receive your first Authentication for Free, a
            value of $50!
            <a className="mx-1 underline" href={CLUBRARE_SOCIAL_LINKS.promotion} rel="noreferrer" target="_blank">
              Learn More
            </a>
          </>
        }
        onClose={handleCloseAnnouncement}
      />
      <header
        className={`flex w-full items-center justify-between bg-neutral-700 py-4 dark:bg-neutral-200 md:justify-center  ${className} px-4 xl:px-0`}
      >
        <div className="flex w-full justify-between xl:container xl:mx-auto">
          <div className="clubrare-icon-and-text flex items-center justify-center">
            <Link
              href={PAGE_ROUTES.home}
              leftIcon={
                <ClubrareNavBarIcon className="fill-brand-800 stroke-brand-800 dark:fill-neutral-100 dark:stroke-neutral-100" />
              }
            >
              <Typography
                className="ml-1 hidden font-Roboto text-body font-medium text-neutral-100 dark:text-neutral-700 md:block"
                variant="regular"
              >
                ClubRare
              </Typography>
            </Link>
          </div>
          <div className="hidden w-full items-center justify-between md:flex">
            <div className="ml-6 md:basis-2/5 lg:basis-3/5">
              <Input
                action={searchAction}
                className="navBarInput text-left"
                label=""
                placeholder={`Search items...`}
                value={search}
                variant="secondary"
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex cursor-pointer items-center justify-around border-neutral-600 dark:border-neutral-400">
              {/*
              <Link
                className={exploreRewardsCreateButton}
                href={PAGE_ROUTES.reward}
                leftIcon={<RewardsCoinsIcon className="h-5 w-5" />}
              >
                <Typography size="body" variant="condensed">
                  Reward
                </Typography>
              </Link>
              */}
              <Link
                className={exploreRewardsCreateButton}
                href={PAGE_ROUTES.explore}
                leftIcon={<BinocularsIcon className="h-5 w-5" />}
              >
                <Typography size="body" variant="condensed">
                  Explore
                </Typography>
              </Link>

              {isSigned && (
                <button className={exploreRewardsCreateButton} onClick={openNFTCreation}>
                  <PlusIcon aria-hidden="true" className="h-5 w-5" />
                  <Typography size="body" variant="condensed">
                    Create
                  </Typography>
                </button>
              )}
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center space-x-3">
            <MagnifyingGlassIcon aria-hidden="true" className="block h-6 w-6 md:hidden" />

            {isSigned ? (
              <div className="cursor-pointer" onClick={() => openOverlay(OverlayIds.PROFILE)}>
                <Avatar
                  alt={activatingUser?.walletAddress}
                  className={`h-6 w-6 md:h-10 md:w-10`}
                  size="extra small"
                  src={activatingUser?.image ? activatingUser?.image + '?auto=format&w=40&h=40' : ''}
                />
              </div>
            ) : (
              <Button
                className="ml-5 uppercase"
                color="neon"
                size="medium"
                type="button"
                variant="solid"
                onClick={() => openOverlay(OverlayIds.PROFILE)}
              >
                Connect
              </Button>
            )}
            {isSigned && (activatingUser?.role === 'admin' || activatingUser?.isSuperAdmin) ? (
              <Cog6ToothIcon aria-hidden="true" className="h-8 w-8" onClick={() => openOverlay(OverlayIds.ADMIN)} />
            ) : (
              ''
            )}
            <Bars3Icon aria-hidden="true" className="h-8 w-8 md:hidden" onClick={() => openOverlay(OverlayIds.MENU)} />
            <EllipsisHorizontalIcon
              aria-hidden="true"
              className="hidden h-8 w-8 md:block"
              onClick={() => openOverlay(OverlayIds.MENU)}
            />
          </div>
          <div className="hidden md:block">
            <Dropdown
              direction="right"
              options={DROPDOWN_OPTIONS_VERSION}
              placeholder="V2"
              value={currentV}
              onChange={handleChangeVersion}
            />
          </div>
        </div>
      </header>
    </div>
  )
}

const exploreRewardsCreateButton = [
  'hidden font-Roboto font-normal text-neutral-100 hover:text-neutral-400 dark:text-neutral-600 md:flex items-center justify-center mx-3',
].join(' ')
