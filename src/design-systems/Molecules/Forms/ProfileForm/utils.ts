import { InstagramIcon, TwitterIcon, YoutubeIcon } from 'design-systems/Atoms/Icons'
import { Input } from 'design-systems/Atoms/Input'
import { TextArea } from 'design-systems/Atoms/TextArea'

export const strings = {
  DISPLAY_NAME: 'Display Name',
  CUSTOM_URL: 'Custom URL',
  EMAIL: 'Email',
  BIO: 'Bio',
  UPLOAD: 'UPLOAD',
  SAVE_CHANGES: 'SAVE CHANGES',
  SOCIAL_PROFILES: 'Social Profiles',
}

export const socials = [
  {
    name: 'instagram',
    Icon: InstagramIcon,
  },
  {
    name: 'youtube',
    Icon: YoutubeIcon,
  },
  {
    name: 'twitter',
    Icon: TwitterIcon,
  },
]

export const profile = [
  { name: 'name', label: strings.DISPLAY_NAME, InputField: Input },
  { name: 'url', label: strings.CUSTOM_URL, InputField: Input },
  { name: 'email', label: strings.EMAIL, InputField: Input },
  { name: 'bio', label: strings.BIO, rows: 7, InputField: TextArea },
]
