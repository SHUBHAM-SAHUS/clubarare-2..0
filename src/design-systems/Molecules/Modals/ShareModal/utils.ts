import { FacebookIcon, TelegramIcon, TwitterIcon } from 'design-systems/Atoms/Icons'

export const icons = [
  {
    label: 'Twitter',
    Icon: TwitterIcon,
    width: 40,
    height: 40,
    rectFill: 'fill-neutral-400',
    param: 'url',
    link: 'https://twitter.com/intent/tweet/?text=',
  },
  {
    label: 'Facebook',
    Icon: FacebookIcon,
    width: 40,
    height: 40,
    param: 'u',
    link: 'https://www.facebook.com/sharer/sharer.php?quote=',
  },
  {
    label: 'Telegram',
    Icon: TelegramIcon,
    width: 40,
    height: 40,
    rectFill: 'fill-neutral-400',
    param: 'url',
    link: 'https://telegram.me/share/?title=',
  },
]

export const generateLink = (label: string, link: string, text: string, param: string, url: string) => {
  const uri = `${link}${encodeURIComponent(text)}&${param}=${encodeURIComponent(url)}`

  // Telegram has cache for og metadata itself, so set the random number at the end of url to refresh
  if (label === 'Telegram') return `${uri.slice(0, -3)}?v=${Date.now()}`

  return uri
}
