import { useMemo, useState } from 'react'

import { Overlay } from '../Overlay'

import { MenuOverlayProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Link } from 'design-systems/Atoms/Link'
import { TwitterIcon, DiscordIcon, MediumIcon, TelegramIcon, LinkedInIcon } from 'design-systems/Atoms/Icons'
import { ThemeButton } from 'design-systems/Molecules/Buttons/ThemeButton'
import { CLUBRARE_SOCIAL_LINKS, UNISWAP_POOL_LINKS, KLAYSWAP_POOL_LINKS, openLink, PAGE_ROUTES } from 'utils'
import { useConnector, useOverlay } from 'context'
import { useDarkSide } from 'hooks/useDarkSide'

export const MenuOverlay: React.FC<MenuOverlayProps> = () => {
  const [colorTheme, setTheme] = useDarkSide()
  const [isDark, setIsDark] = useState(colorTheme === 'light')
  const { closeOverlay } = useOverlay()
  const { chainId } = useConnector()

  const swapLinks = useMemo(() => {
    if (chainId === 1001 || chainId === 8217) return KLAYSWAP_POOL_LINKS
    return UNISWAP_POOL_LINKS
  }, [chainId])

  const handleChangeTheme = () => {
    setTheme(colorTheme)
    setIsDark(!isDark)
  }

  return (
    <Overlay>
      <div className="flex w-full flex-col justify-between gap-4 px-4">
        <div className="flex flex-col gap-3 text-neutral-100 dark:text-neutral-600">
          {/*
           * NOTE: use v1 about page link or should have new page
           */}
          {/*
          <Link href={CLUBRARE_SOCIAL_LINKS.about} rel="noreferrer" target="_blank">
            About
          </Link>
          */}
          <Link href={CLUBRARE_SOCIAL_LINKS.guide} rel="noreferrer" target="_blank">
            How it works
          </Link>
          <Link href={PAGE_ROUTES.support} onClick={closeOverlay}>
            Support
          </Link>
          {/*
           * NOTE: use v1 career page link or should have new page
           */}
          {/* <Link href="">Careers</Link> */}
          <Link href={CLUBRARE_SOCIAL_LINKS.docs} rel="noreferrer" target="_blank">
            Docs & Guides
          </Link>
          {/*
           * NOTE: use v1 roadmap link or should have new page
           */}
          {/*
          <Link href={CLUBRARE_SOCIAL_LINKS.roadmap} rel="noreferrer" target="_blank">
            Roadmap
          </Link>
          */}
        </div>
        <div className="flex flex-col gap-6">
          <ThemeButton isDark={isDark} onChange={handleChangeTheme} />
          <div className="flex items-center justify-center gap-4">
            <Button
              className="w-full whitespace-nowrap font-Roboto font-medium"
              color="primary"
              size="medium"
              variant="outlined"
              onClick={() => openLink(swapLinks.AGOV)}
            >
              BUY AGOV
            </Button>
            <Button
              className="w-full whitespace-nowrap font-Roboto font-medium"
              color="primary"
              size="medium"
              variant="outlined"
              onClick={() => openLink(swapLinks.MPWR)}
            >
              BUY MPWR
            </Button>
          </div>
          <div className="flex justify-between">
            <Link href={CLUBRARE_SOCIAL_LINKS.twitter} rel="noreferrer" target="_blank">
              <TwitterIcon className={heightWeight} />
            </Link>
            <Link href={CLUBRARE_SOCIAL_LINKS.discord} rel="noreferrer" target="_blank">
              <DiscordIcon className={heightWeight} />
            </Link>
            <Link href={CLUBRARE_SOCIAL_LINKS.telegram} rel="noreferrer" target="_blank">
              <TelegramIcon className={heightWeight} />
            </Link>
            <Link href={CLUBRARE_SOCIAL_LINKS.linkedin} rel="noreferrer" target="_blank">
              <LinkedInIcon className={heightWeight} />
            </Link>
            <Link href={CLUBRARE_SOCIAL_LINKS.medium} rel="noreferrer" target="_blank">
              <MediumIcon className={heightWeight} />
            </Link>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

const heightWeight = ['h-8 w-8'].join(' ')
