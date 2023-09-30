import { FooterProps } from './interface'

import { TwitterIcon, DiscordIcon, MediumIcon, ClubrareIcon } from 'design-systems/Atoms/Icons'
import { Link } from 'design-systems/Atoms/Link'
import { Typography } from 'design-systems/Atoms/Typography'
import { PAGE_ROUTES, CLUBRARE_SOCIAL_LINKS } from 'utils'

const footerMenuItemClassName = 'px-3 text-neutral-400 dark:text-neutral-600'
const footerMenuItemTextClassName = 'whitespace-nowrap font-Roboto text-caption font-normal leading-small'

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-neutral-700 px-2 py-4 dark:bg-neutral-200 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 xl:container md:flex-row md:items-start md:gap-0 xl:mx-auto ">
        <div className="flex items-center md:flex-1">
          <ClubrareIcon />
          <Typography
            className="ml-3 hidden font-Roboto text-caption font-normal leading-small text-neutral-100 dark:text-caption dark:text-neutral-700 md:block"
            variant="regular"
          >
            Craft, Showcase, Connect, Trade: Your Ultimate Collectibles.
          </Typography>
        </div>
        <div className="order-last pt-0 md:order-none">
          <ul className="mb-2 flex justify-center">
            <li className="px-2">
              <a href={CLUBRARE_SOCIAL_LINKS.twitter} rel="noreferrer" target="_blank">
                <TwitterIcon />
              </a>
            </li>
            <li className="px-2">
              <a href={CLUBRARE_SOCIAL_LINKS.discord} rel="noreferrer" target="_blank">
                <DiscordIcon />
              </a>
            </li>
            <li className="px-2">
              <a href={CLUBRARE_SOCIAL_LINKS.medium} rel="noreferrer" target="_blank">
                <MediumIcon />
              </a>
            </li>
          </ul>
          <Typography className="text-center font-Roboto text-caption text-neutral-500" variant="regular">
            Copyright © {new Date().getFullYear()} ClubRare
          </Typography>
        </div>
        <div className="flex pt-0 md:flex-1">
          <ul className="flex w-full justify-center md:justify-end">
            <li className={footerMenuItemClassName}>
              <Link href={PAGE_ROUTES.support}>
                <Typography className={footerMenuItemTextClassName}>Support</Typography>
              </Link>
            </li>
            <li className={footerMenuItemClassName}>
              <Link href={CLUBRARE_SOCIAL_LINKS.docs} rel="noreferrer" target="_blank">
                <Typography className={footerMenuItemTextClassName}>Docs</Typography>
              </Link>
            </li>
            <li className={footerMenuItemClassName}>
              <Link href={CLUBRARE_SOCIAL_LINKS.privacy} rel="noreferrer" target="_blank">
                <Typography className={footerMenuItemTextClassName}>Terms</Typography>
              </Link>
            </li>
            <li className={footerMenuItemClassName}>
              <Link href={CLUBRARE_SOCIAL_LINKS.privacy} rel="noreferrer" target="_blank">
                <Typography className={footerMenuItemTextClassName}>Privacy</Typography>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
