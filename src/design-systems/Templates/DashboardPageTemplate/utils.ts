export const initialUserDetails = {
  walletAddress: '',
  profileName: '',
  profileDetails: '',
  verification: '',
  followingCount: 0,
  followersCount: 0,
  nftDetails: {
    totalSales: 0,
    nftsListed: 0,
    nftsSold: 0,
    totalViews: 0,
    collections: 0,
  },
}

export const TAB = {
  NFTS: {
    id: 0,
    name: 'NFTS',
  },
  COLLECTIONS: {
    id: 1,
    name: 'COLLECTIONS',
  },
  FAVORITES: {
    id: 2,
    name: 'FAVORITES',
  },
}

const NFT_TAB_CATEGORIES: CategoryObject[] = [
  { name: 'CREATED', id: 0 },
  { name: 'ON SALE', id: 1 },
  { name: 'HIDDEN', id: 2 },
]

const COLLECTIONS_TAB_CATEGORIES: CategoryObject[] = []

const FAVORITES_TAB_CATEGORIES: CategoryObject[] = [
  { name: 'AUCTIONS', id: 3 },
  { name: 'FIXED PRICE', id: 4 },
]

export const getCategoryNames = (): string[] =>
  [...NFT_TAB_CATEGORIES, ...COLLECTIONS_TAB_CATEGORIES, ...FAVORITES_TAB_CATEGORIES].map(({ name }) => name)

export const categories = {
  [TAB.NFTS.id]: NFT_TAB_CATEGORIES,
  [TAB.COLLECTIONS.id]: COLLECTIONS_TAB_CATEGORIES,
  [TAB.FAVORITES.id]: FAVORITES_TAB_CATEGORIES,
}
