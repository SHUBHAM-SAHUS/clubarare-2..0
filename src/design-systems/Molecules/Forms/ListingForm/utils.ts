export const CATEGORY_TYPE_BUTTONS = [
  {
    id: 'auction',
    title: 'TIMED AUCTION',
  },
  {
    id: 'fixed',
    title: 'FIXED PRICE',
  },
]

export const DROPDOWN_OPTIONS_ETH = [
  {
    title: 'ETH',
    value: 'ETH',
  },
  {
    title: 'MPWR',
    value: 'MPWR',
  },

  {
    title: 'WETH',
    value: 'WETH',
  },

  {
    title: 'AGOV',
    value: 'AGOV',
  },

  {
    title: 'USDT',
    value: 'USDT',
  },
]
export const DROPDOWN_OPTIONS_KLAY = [
  {
    title: 'KLAY',
    value: 'KLAY',
  },

  {
    title: 'AGOV',
    value: 'AGOV',
  },

  {
    title: 'USDT',
    value: 'USDT',
  },
]

export const checkType = (value: any): string => {
  if (typeof value === 'string') {
    if (isNaN(Date.parse(value))) {
      return 'string'
    } else {
      return 'date'
    }
  } else if (value instanceof Date) {
    return 'date'
  } else {
    return 'not a string or date'
  }
}
