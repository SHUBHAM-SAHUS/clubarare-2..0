import { AppConfigProps } from 'design-systems/Organisms/SEO'

type PAGE_NAMES = 'explore' | 'support' | 'product' | 'home' | 'collection' | 'profile' | 'dashboard' | 'reward'

export const GLOBAL_PAGE_SEO: AppConfigProps = {
  description:
    'Discover a new world of digital collectibles with our phygital NFT marketplace. Buy, sell and collect unique and one-of-a-kind digital assets linked to real physical items. Explore now!',
  favicon: '/favicon.ico',
  image: 'https://d1gqvtt7oelrdv.cloudfront.net/space/1682662450561_SocialCoverImage.jpg',
  keywords:
    'NFTs, Marketplace, Collectibles, Creators, Phygital, Digital Collectibles, Buy, Sell, Rare, Unique, physical products.',
  name: 'ClubRare Phygital NFT Marketplace',
  // image: '/icon-512x512.png',
  themeColor: '#FFFFFF',
  themeColorDark: '#000000',
  title:
    'ClubRare Phygital NFT Marketplace | Buy, sell and collect unique digital assets linked to real world collectibles.',
  twitter: '@clubrare_nft',
  url: 'https://app.clubrare.xyz',
} as const

export const PAGE_SEO_CONFIG: {
  [key in PAGE_NAMES]: AppConfigProps
} = {
  collection: {
    ...GLOBAL_PAGE_SEO,
    description:
      'The Most Trusted NFT Marketplace to Buy, Sell, and Trade Collectibles like Sneakers, Handbags, Apparel, Watches, and more.',
    keywords:
      'NFT, Marketplace, ClubRare, Collection, Collectibles, Sneakers, Handbags, Watches, Apparel, Luxury, Rare, Unique, Buy, Sell, Trade, Products, Physical, Phygital.',
    title: 'ClubRare | The Trusted Phygital Marketplace for Buyers and Sellers| Rare Collection',
    url: 'https://app.clubrare.xyz',
  },
  dashboard: {
    ...GLOBAL_PAGE_SEO,
  },
  explore: {
    ...GLOBAL_PAGE_SEO,
    description:
      'Explore a vast collection of phygital NFTs and discover unique digital collectibles. Find one-of-a-kind assets from artists and creators around the world.',
    keywords:
      'NFTs, Marketplace, Collectibles, Collection, Search, Explore, Trending, Creators, Phygital, Digital Collectibles, Buy, Sell',
    title: 'ClubRare | Explore Phygital NFTs | Discover unique collectibles',
    url: 'https://app.clubrare.xyz/explore',
  },
  reward: {
    ...GLOBAL_PAGE_SEO,
  },
  home: GLOBAL_PAGE_SEO,
  product: {
    ...GLOBAL_PAGE_SEO,
    description:
      'Buy, Sell, and Trade Collectibles - Sneakers, Handbags, Apparel, and Watches with the most trusted Phygital NFT Marketplace.',
    keywords:
      'NFT, Marketplace, ClubRare, Collectibles, Sneakers, Handbags, Watches, Apparel, Luxury, Rare, Unique, Buy, Sell, Trade, Products, Physical, Phygital.',
    title: 'ClubRare | Phygital NFT Product Details | Buy unique collectibles',
    url: 'https://app.clubrare.xyz',
  },
  profile: {
    ...GLOBAL_PAGE_SEO,
    description: '',
    keywords:
      'NFT, Marketplace, ClubRare, Collection, Collectibles, Sneakers, Handbags, Watches, Apparel, Luxury, Rare, Unique, Buy, Sell, Trade, Products, Physical, Phygital.',
    title: 'ClubRare | View Profile',
    url: 'https://app.clubrare.xyz',
  },
  support: {
    ...GLOBAL_PAGE_SEO,
    description:
      'Get help with your phygital NFT listing and purchases. Learn how to list, buy or receive any collectibles in the ClubRare marketplace. Contact our support team for assistance.',
    keywords:
      'NFTs, Marketplace, Collectibles, Creators, Support, Help, FAQs, Phygital, Digital Collectibles, Authenticate, Certify.',
    title: 'ClubRare Support | Get help with our marketplace',
    url: 'https://app.clubrare.xyz/support',
  },
} as const

export const FAQS = [
  {
    contents: [
      'During the bidding process you have the option to send your collectible to our secure vault or to the address you desire.',
      'At the end of the auction, you will receive updates with your product delivery status, whether its in transit, being authenticated, or delivered.',
      'Any collectible stored in our secure vault may be redeemed at any point.',
    ],
    title: 'How Do I Redeem My NFT?',
  },
  {
    contents: [
      "All products sold by our partners are authenticated. Products sold by verified and unverified sellers do not need to be authenticated but it's recommended. Products will have an authenticated label if ClubRare has verified the products authenticity.",
    ],
    title: 'Are All Items Authenticated?',
  },
  {
    contents: [
      'A No Return, No Refund Policy meaning that all sales are final, meaning there are no refunds or returns. There is an escrow process to ensure your product is legit as stated, as well an authentication process to ensure your protection.',
      'You approve the release of funds and confirm the products quality is stated as listed upon product delivery. If you believe fraud has been committed, please escalate your case with support.',
    ],
    title: 'Can I Return My Item Once Delivered?',
  },
  {
    contents: [
      'Once you create your listing, the NFT mint has started. We use a process called lazy minting, therefor NFTs are not populated on-chain until the sale happens. This is to reduce upfront gas fees.',
    ],
    title: 'How does minting work?',
  },
  {
    contents: [
      'When using the Etherum Network you can use: ETH, AGOV, MPWR & USDT.',
      'When using the Klaytn Network you can use: ETH, AGOV, USDT.',
    ],
    title: 'What Currencies Can I Pay With?',
  },
]

export const GUIDES = [
  {
    href: 'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help/buying-on-the-marketplace',
    title: 'BUYER GUIDE',
  },
  {
    href: 'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help/selling-on-the-marketplace',
    title: 'SELLER GUIDE',
  },
  {
    href: 'https://docs.clubrare.xyz/clubrare-documentation/clubrare-marketplace-user-guides-and-help',
    title: 'MARKETPLACE GUIDE',
  },
] as const
