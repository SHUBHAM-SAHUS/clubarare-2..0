import { ComponentMeta, ComponentStory } from '@storybook/react'
import type { ComponentType } from 'react'

import { IconProps, CheckIconProps } from './interface'
import {
  CircleIcon,
  ClubrareIcon,
  DiscordIcon,
  EthereumIcon,
  MediumIcon,
  PlusIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedInIcon,
  InfoIcon,
  CheckIcon,
  BadgeIcon,
  DefaultProfileIcon,
  PhygitalIcon,
  DigitalIcon,
  AuthenticationIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ChartLineUpIcon,
  PencilIcon,
  InstagramIcon,
  YoutubeIcon,
  EyeIcon,
  SearchIcon,
  CopyIcon,
  DotsThreeVerticalIcon,
  RewardsCoinsIcon,
  BinocularsIcon,
  ClubrareNavBarIcon,
  SliderHorizontalIcon,
  TickIcon,
  PowerIcon,
  USDTIcon,
  WETHIcon,
  KlayIcon,
  CloseIcon,
  SwapIcon,
  SaleIcon,
  ListIcon,
  HandIcon,
  HeartIcon,
  CaretDoubleDownIcon,
  CaretDoubleUpIcon,
  BookIcon,
  ActivityIcon,
  TruckIcon,
  QuestionIcon,
  ShareIcon,
  DeleteIcon,
  FileTextIcon,
  SaveIcon,
  BackgroundTabIcon,
  NFTTabIcon,
  BorderTabIcon,
  ElementTabIcon,
  DownloadSimpleIcon,
  RightAnnouncementIcon,
  LeftAnnouncementIcon,
  LazyLeoIcon,
  WalletIcon,
} from './icons'

import { is } from 'utils'

export default is<ComponentMeta<any>>()({
  title: 'Atoms/Icons/Resources',
  argTypes: {
    className: {
      defaultValue: 'w-8 h-8',
      table: {
        disabled: true,
      },
    },
  },
})

interface ComponentProps extends IconProps, CheckIconProps {
  Icon: ComponentType<IconProps | CheckIconProps>
}

const Template: ComponentStory<React.FC<ComponentProps>> = ({ Icon, ...iconProps }) => (
  <Icon height={32} width={32} {...iconProps} />
)

export const Info = Template.bind({})
Info.args = { Icon: InfoIcon }

export const Badge = Template.bind({})
Badge.args = { Icon: BadgeIcon }

export const DefaultProfile = Template.bind({})
DefaultProfile.args = { Icon: DefaultProfileIcon }

export const Phygital = Template.bind({})
Phygital.args = { Icon: PhygitalIcon }

export const Authentication = Template.bind({})
Authentication.args = { Icon: AuthenticationIcon }

export const Digital = Template.bind({})
Digital.args = { Icon: DigitalIcon }

export const Check = Template.bind({})
Check.args = {
  Icon: CheckIcon,
  fill: 'fill-neutral-100 dark:fill-neutral-800',
  border: 'stroke-neutral-100 dark:stroke-neutral-800',
  check: 'fill-neutral-800 dark:fill-neutral-100',
}

export const Plus = Template.bind({})
Plus.args = {
  Icon: PlusIcon,
  className: 'w-8 h-8 stroke-neutral-100 dark:stroke-neutral-800',
}

export const Circle = Template.bind({})
Circle.args = {
  Icon: CircleIcon,
  className: 'w-8 h-8 stroke-neutral-100 dark:stroke-neutral-800',
}

export const Ethereum = Template.bind({})
Ethereum.args = {
  Icon: EthereumIcon,
  className: 'w-8 h-8',
}

export const Twitter = Template.bind({})
Twitter.args = {
  Icon: TwitterIcon,
  className: '',
}

export const LinkedIn = Template.bind({})
LinkedIn.args = {
  Icon: LinkedInIcon,
  className: '',
}

export const Telegram = Template.bind({})
Telegram.args = {
  Icon: TelegramIcon,
  className: '',
}

export const Discord = Template.bind({})
Discord.args = {
  Icon: DiscordIcon,
  className: '',
}

export const Medium = Template.bind({})
Medium.args = {
  Icon: MediumIcon,
  className: '',
}

export const Clubrare = Template.bind({})
Clubrare.args = {
  Icon: ClubrareIcon,
  className: '',
}

export const ArrowUp = Template.bind({})
ArrowUp.args = {
  Icon: ArrowUpIcon,
}

export const ArrowDown = Template.bind({})
ArrowDown.args = {
  Icon: ArrowDownIcon,
}

export const ArrowRight = Template.bind({})
ArrowRight.args = {
  Icon: ArrowRightIcon,
}

export const ChartLineUp = Template.bind({})
ChartLineUp.args = {
  Icon: ChartLineUpIcon,
}

export const Pencil = Template.bind({})
Pencil.args = {
  Icon: PencilIcon,
}

export const Instagram = Template.bind({})
Instagram.args = {
  Icon: InstagramIcon,
  className: 'w-8 h-8 stroke-neutral-100 dark:stroke-neutral-800',
}

export const Youtube = Template.bind({})
Youtube.args = {
  Icon: YoutubeIcon,
}

export const Eye = Template.bind({})
Eye.args = {
  Icon: EyeIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-800',
}

export const Search = Template.bind({})
Search.args = {
  Icon: SearchIcon,
  className: 'fill-neutral-100 dark:fill-neutral-800',
}

export const Copy = Template.bind({})
Copy.args = {
  Icon: CopyIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-800',
}

export const DotsThreeVertical = Template.bind({})
DotsThreeVertical.args = {
  Icon: DotsThreeVerticalIcon,
  className: 'fill-neutral-100 dark:fill-neutral-800',
}

export const RewardsCoins = Template.bind({})
RewardsCoins.args = {
  Icon: RewardsCoinsIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-800',
}

export const Binoculars = Template.bind({})
Binoculars.args = {
  Icon: BinocularsIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-800',
}

export const ClubrareNavBar = Template.bind({})
ClubrareNavBar.args = {
  Icon: ClubrareNavBarIcon,
  className: 'stroke-brand-800 fill-brand-800 dark:stroke-neutral-100 dark:fill-neutral-100',
}

export const SliderHorizontal = Template.bind({})
SliderHorizontal.args = {
  Icon: SliderHorizontalIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-800',
}

export const Tick = Template.bind({})
Tick.args = {
  Icon: TickIcon,
  className: '',
}

export const Power = Template.bind({})
Power.args = {
  Icon: PowerIcon,
  className: '',
}

export const USDT = Template.bind({})
USDT.args = {
  Icon: USDTIcon,
  className: '',
}

export const WETH = Template.bind({})
WETH.args = {
  Icon: WETHIcon,
  className: '',
}

export const Klay = Template.bind({})
Klay.args = {
  Icon: KlayIcon,
  className: '',
}

export const Close = Template.bind({})
Close.args = {
  Icon: CloseIcon,
  className: '',
}

export const Swap = Template.bind({})
Swap.args = {
  Icon: SwapIcon,
  className: '',
}

export const Sale = Template.bind({})
Sale.args = {
  Icon: SaleIcon,
  className: '',
}

export const List = Template.bind({})
List.args = {
  Icon: ListIcon,
  className: '',
}

export const Hand = Template.bind({})
Hand.args = {
  Icon: HandIcon,
  className: '',
}

export const Heart = Template.bind({})
Heart.args = {
  Icon: HeartIcon,
  className: '',
}

export const CaretDoubleDown = Template.bind({})
CaretDoubleDown.args = {
  Icon: CaretDoubleDownIcon,
  className: '',
}

export const CaretDoubleUp = Template.bind({})
CaretDoubleUp.args = {
  Icon: CaretDoubleUpIcon,
  className: '',
}

export const Book = Template.bind({})
Book.args = {
  Icon: BookIcon,
  className: '',
}

export const Activity = Template.bind({})
Activity.args = {
  Icon: ActivityIcon,
  className: '',
}

export const Truck = Template.bind({})
Truck.args = {
  Icon: TruckIcon,
  className: '',
}

export const Question = Template.bind({})
Question.args = {
  Icon: QuestionIcon,
  className: '',
}

export const ShareButton = Template.bind({})
ShareButton.args = {
  Icon: ShareIcon,
  className: 'stroke-neutral-600 dark:stroke-neutral-400',
}

export const RemoveIcon = Template.bind({})
RemoveIcon.args = {
  Icon: DeleteIcon,
  className: 'stroke-neutral-600 dark:stroke-neutral-400',
}

export const FileText = Template.bind({})
FileText.args = {
  Icon: FileTextIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}

export const SaveButton = Template.bind({})
SaveButton.args = {
  Icon: SaveIcon,
  className: '',
}

export const BackgroundTab = Template.bind({})
BackgroundTab.args = {
  Icon: BackgroundTabIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}

export const NFTTab = Template.bind({})
NFTTab.args = {
  Icon: NFTTabIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}

export const BorderTab = Template.bind({})
BorderTab.args = {
  Icon: BorderTabIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}
export const ElementTab = Template.bind({})
ElementTab.args = {
  Icon: ElementTabIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}

export const DownloadSample = Template.bind({})
DownloadSample.args = {
  Icon: DownloadSimpleIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}
export const RightAnnouncement = Template.bind({})
RightAnnouncement.args = {
  Icon: RightAnnouncementIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}
export const LeftAnnouncement = Template.bind({})
LeftAnnouncement.args = {
  Icon: LeftAnnouncementIcon,
  className: 'stroke-neutral-100 dark:stroke-neutral-400',
}
export const LazyLeo = Template.bind({})
LazyLeo.args = {
  Icon: LazyLeoIcon,
}

export const Wallet = Template.bind({})
Wallet.args = {
  Icon: WalletIcon,
}
