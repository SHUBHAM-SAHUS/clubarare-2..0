export const parseBoolean = (value?: string) => {
  return value && value.toLowerCase() === 'true'
}

// Social Links
export const CLUBRARE_SOCIAL_LINKS = {
  about: 'https://classic.clubrare.xyz/about',
  agreement: '/docs/creator-agreement.pdf',
  contactUs: 'https://app.clubrare.xyz/support',
  discord: 'https://discord.gg/clubrare',
  docs: 'https://vital-hint.gitbook.io/clubrare-documentation',
  email: 'mailto:support@clubrare.xyz',
  faq: 'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help/faqs',
  guide: 'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help',
  linkedin: 'https://www.linkedin.com/company/clubrare/',
  medium: 'https://medium.com/clubrare-universe',
  node: 'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help/policy-updates-node-integration',
  privacy: 'https://docs.clubrare.xyz/clubrare-documentation/terms-and-conditions',
  promotion:
    'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help/policy-updates-node-integration/clubrare-authentication-launch-promotion-may-30-2023',
  roadmap: 'https://docs.clubrare.xyz/clubrare-documentation/roadmap',
  telegram: 'https://t.me/ANSWER_GOVERNANCE',
  twitter: 'https://twitter.com/clubrare_nft',
  leaderBoardReward: 'https://docs.clubrare.xyz/clubrare-documentation/usdmpwr-utility-token/mpwr-reward-and-burn',
}

/**
 * The default amount of fetching items per request
 */
export const PAGE_SIZE = 12
export const HOME_PAGE_SIZE = 5

export const PAGE_SCROLL_TRIGGER_DELAY = 250
export const EDITOR_EXPORT_TRIGGER_DELAY = 3000

export const COLLECTIBLE_TYPES = [
  'phygital',
  'digital',
  // 'metaverse'
]

export const SORT_BY_OPTIONS = [
  {
    title: 'Trending',
    value: 'trending',
  },
  {
    title: 'Recently added',
    value: 'recently_added',
  },
  {
    title: 'Ending soon',
    value: 'auction_ending_soon',
  },
  {
    title: 'Price low to high',
    value: 'price_low_to_high',
  },
  {
    title: 'Price high to low',
    value: 'price_high_to_low',
  },
]

export const SORT_BY_VALUES = SORT_BY_OPTIONS.map(({ value }) => value)

export const SALE_TYPES = ['not_for_sale', 'fixed_price', 'timed_auction', 'all']

export const TOKEN_BY_OPTIONS = [
  {
    title: 'ETH',
    value: 'ETH',
  },
  {
    title: 'KLAY',
    value: 'KLAY',
  },
  {
    title: 'MPWR',
    value: 'MPWR',
  },
  {
    title: 'AGOV',
    value: 'AGOV',
  },

  {
    title: 'USDT',
    value: 'USDT',
  },
  {
    title: 'wETH',
    value: 'wETH',
  },
]

export const TOKEN_BY_VAULES = TOKEN_BY_OPTIONS.map(({ value }) => value)

/**
 * .env variables
 */
export const IS_PRODUCTION = parseBoolean(process.env.NEXT_PUBLIC_IS_PRODUCTION)
export const LIVE_URL_V1 = IS_PRODUCTION ? 'https://classic.clubrare.xyz/' : 'https://testnet.clubrare.xyz/'
export const LIVE_URL_V2 = IS_PRODUCTION
  ? 'https://app.clubrare.xyz'
  : 'https://clubrare-marketplace-git-develop-clubrare.vercel.app'

export const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_ID ?? ''
export const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? ''
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''

/** Flags */
export const IS_DASHBOARD_ENABLED = parseBoolean(process.env.NEXT_PUBLIC_ENABLE_DASHBOARD)
export const IS_SOCIAL_AUTH_ENABLED = parseBoolean(process.env.NEXT_PUBLIC_ENABLE_SOCIAL_AUTH)

export const BASE_API_ENDPOINT = IS_PRODUCTION ? 'https://api.clubrare.xyz/api' : 'https://testnetapi.clubrare.xyz/api'

export enum CLUBRARE_NETWORKS {
  ETHEREUM = '1',
  KLAYTN = '2',
  ALL = 'all',
}

export enum AUCTION_TYPES {
  FIXED = '1',
  AUCTION = '2',
}

/**
 * Declare global interface
 */
declare global {
  type CollectibleType = (typeof COLLECTIBLE_TYPES)[number]
  type SortByAsset = (typeof SORT_BY_VALUES)[number]
  type SortByAssetOption = (typeof SORT_BY_OPTIONS)[number]
  type SaleType = (typeof SALE_TYPES)[number]
  type TokenType = (typeof TOKEN_BY_VAULES)[number]
  // TODO define enum globally
  type ClubRareNetworks = CLUBRARE_NETWORKS
  type AuctionTypes = AUCTION_TYPES
}

export const UNISWAP_POOL_LINKS = {
  AGOV: 'https://app.uniswap.org/#/swap?chain=mainnet&outputCurrency=0xd1420af453fd7bf940573431d416cace7ff8280c',
  MPWR: 'https://app.uniswap.org/#/swap?chain=mainnet&outputCurrency=0x6731827Cb6879a2091ce3ab3423f7bf20539b579',
  WETH: 'https://app.uniswap.org/#/swap?chain=mainnet&outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
} as const

export const KLAYSWAP_POOL_LINKS = {
  AGOV: 'https://klayswap.com/exchange/swap?outputCurrency=0x588c62ed9aa7367d7cd9c2a9aaac77e44fe8221b',
  MPWR: 'https://klayswap.com/exchange/swap?outputCurrency=0xad27ace6f0f6cef2c192a3c8f0f3fa2611154eb3',
} as const

export const PLATFORM_FEE = 2.5

export const SETTINGS = {
  name: 'Clubrare Marketplace',
  platformFee: 2.5,
  version: '1.0.1',
} as const

export enum META_ENTITIES {
  PRODUCT = 'product',
  PROFILE = 'profile',
}

export const KLAYTN_SIGN =
  '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
