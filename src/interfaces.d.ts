type UTCString = `${number}-${number}-${number} ${number}:${number}:${number} UTC` // 2022-06-01 16:47:55 UTC

type AnyObject<T = any> = Record<string, T>

type AnyFunction = (...args: any[]) => any

type TokenUtility = 'AGOV' | 'MPWR'

type Currency = 'ETH' | 'AGOV' | 'MPWR' | 'USDT' | 'KLAY' | 'WETH'

type WalletTypes = 'METAMASK' | 'KAIKAS' | 'METAMASK-KAIKAS' | 'WEB3-AUTH'

type WalletType = 'METAMASK' | 'KAIKAS' | 'WEB3-AUTH'

type Modify<T, R extends PartialAny<T>> = Omit<T, keyof R> & R

type ValuesOf<T> = T[keyof T]

type AddressString = `0x${string}`

type AssetFilters = {
  category?: string
  collectionAddress?: AddressString
  fromPrice?: string
  networkId?: ClubRareNetworks
  pageSize?: number
  redeemable?: boolean
  saleOnly?: boolean
  saleType?: SaleType
  search?: string
  sort?: SortByAsset
  token?: TokenType
  toPrice?: string
  walletAddress?: AddressString
}

type WithPaginationQuery = {
  pageNumber: number
  pageSize: number
}

type WithPaginationRequest = {
  page_number: number
  page_size: number
}

type AssetFile = {
  alt?: string
  src: string
  type: string
}

type PageProps = {
  metadata: AppConfigProps
}

type ValueOf<T> = T[keyof T]

declare module '*.pdf'
