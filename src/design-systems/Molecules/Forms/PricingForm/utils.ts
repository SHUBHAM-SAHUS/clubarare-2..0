import { NULL_TOKEN_ADDRESS, KAIKAS_TOKEN_ADDRESS, METAMASK_TOKEN_ADDRESS } from 'utils'

export const CATEGORY_TYPE_BUTTONS = [
  {
    id: 'timed-auctions',
    title: 'TIMED AUCTION',
  },
  {
    id: 'fixed-price',
    title: 'FIXED PRICE',
  },
]

export const DROPDOWN_OPTIONS_ETH = [
  {
    title: 'ETH',
    value: NULL_TOKEN_ADDRESS as AddressString,
  },
  {
    title: 'MPWR',
    value: METAMASK_TOKEN_ADDRESS.MPWR as AddressString,
  },

  {
    title: 'WETH',
    value: METAMASK_TOKEN_ADDRESS.WETH as AddressString,
  },

  {
    title: 'AGOV',
    value: METAMASK_TOKEN_ADDRESS.AGOV as AddressString,
  },

  {
    title: 'USDT',
    value: METAMASK_TOKEN_ADDRESS.USDT as AddressString,
  },
]

export const DROPDOWN_OPTIONS_KLAY = [
  {
    title: 'KLAY',
    value: NULL_TOKEN_ADDRESS,
  },
  {
    title: 'AGOV',
    value: KAIKAS_TOKEN_ADDRESS.AGOV as AddressString,
  },
  {
    title: 'USDT',
    value: KAIKAS_TOKEN_ADDRESS.USDT as AddressString,
  },
]
