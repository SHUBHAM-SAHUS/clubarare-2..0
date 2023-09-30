import { BigNumber, ethers } from 'ethers'
import { FieldValues } from 'react-hook-form'

import { KAIKAS_TOKEN_ADDRESS, METAMASK_TOKEN_ADDRESS } from './contract'
import { AUCTION_TYPES, CLUBRARE_NETWORKS } from './constants'

import { NFTPriceObject } from 'design-systems/Molecules/Cards/NFTCard'
import moment from 'moment'

export const logInfo = (title: string, desc = '', background = '#222', color = '#bada55') => {
  // eslint-disable-next-line no-console
  console.log(`%c ${title} - ${desc} `, `background: ${background}; color: ${color}`)
}

export const getQueries = (obj: AnyObject): string => {
  return Object.keys(obj ?? {}).reduce((val, key) => (obj[key] ? `${val}${key}=${obj[key]}&` : val), '')
}

export const compareStringsInsentively = (str1: string, str2: string): boolean => {
  return str1?.toLowerCase() === str2?.toLowerCase()
}

export const convertToHex = (value: number) => {
  return `0x${value.toString(16)}`
}

export const camelToSnake = (object: FieldValues) => {
  const snake = new FormData()
  for (const [key, value] of Object.entries(object)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    snake.append(snakeKey, value)
  }
  return snake
}

export const camelToSnakeWithout = (object: FieldValues, exceptions: string[]) => {
  const snake = new FormData()
  for (const [key, value] of Object.entries(object)) {
    const snakeKey = exceptions.includes(key) ? key : key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    snake.append(snakeKey, value)
  }
  return snake
}

export const snakeToCamel = (object: FieldValues) => {
  const camel = new FormData()
  for (const [key, value] of Object.entries(object)) {
    const camelKey = key.replace(/_([a-z])/g, (m, p1) => p1.toUpperCase())
    camel.append(camelKey, value)
  }
  return camel
}

export const getTokenKey = (networkId: ClubRareNetworks, tokenAddress: string) => {
  if (networkId == CLUBRARE_NETWORKS.ETHEREUM) {
    if (tokenAddress?.toLowerCase() === METAMASK_TOKEN_ADDRESS.AGOV?.toLowerCase()) return 'AGOV'
    else if (tokenAddress?.toLowerCase() === METAMASK_TOKEN_ADDRESS.USDT?.toLowerCase()) return 'USDT'
    else if (tokenAddress?.toLowerCase() === METAMASK_TOKEN_ADDRESS.MPWR?.toLowerCase()) return 'MPWR'
    else if (tokenAddress?.toLowerCase() === METAMASK_TOKEN_ADDRESS.WETH?.toLowerCase()) return 'wETH'
    else return 'ETH'
  } else {
    if (tokenAddress?.toLowerCase() === KAIKAS_TOKEN_ADDRESS.AGOV?.toLowerCase()) return 'AGOV'
    else if (tokenAddress?.toLowerCase() === KAIKAS_TOKEN_ADDRESS.USDT?.toLowerCase()) return 'USDT'
    else return 'KLAY'
  }
}

export const shortWalletAddress = (walletAddress: string | undefined) => {
  return walletAddress ? walletAddress.substring(0, 5) + '...' + walletAddress.substring(walletAddress.length - 4) : ''
}

export const formatUnits = (amount: string | number | BigNumber | BigNumberish, token: string, toFixed = true) => {
  const toFixVal = token === 'USDT' ? 1 : ['ETH', 'KLAY', 'wETH'].includes(token) ? 6 : 0

  if (toFixed) {
    if (token == 'USDT') {
      return String(Number(ethers.utils.formatUnits(amount.toString(), 'mwei'))?.toFixed(toFixVal) ?? 0)
    } else {
      return String(Number(ethers.utils.formatUnits(amount.toString(), 'ether'))?.toFixed(toFixVal) ?? 0)
    }
  } else {
    if (token == 'USDT') {
      return Number(ethers.utils.formatUnits(amount.toString(), 'mwei'))
    } else {
      return Number(ethers.utils.formatUnits(amount.toString(), 'ether'))
    }
  }
}

export const parseUnits = (amount: string | number, token: string) => {
  if (token == 'USDT') {
    return ethers.utils.parseUnits(amount.toString(), 'mwei').toString()
  } else {
    return ethers.utils.parseUnits(amount.toString(), 'ether').toString()
  }
}

export const convertDate2UTCTimeStamp = (date: Date) => {
  const utc: number = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  )
  return Math.ceil(utc.valueOf() / 1000)
}

export const getNftPrice = (asset: AssetObject): NFTPriceObject => {
  const nftPrice: NFTPriceObject = {}

  if (!asset) return nftPrice

  if (asset.onSale && asset.auctionDetails && asset.auctionDetails.erc20Token) {
    const token = getTokenKey(asset.networkId, asset.auctionDetails.erc20Token)
    if (asset.auctionDetails?.buyPrice && asset.auctionDetails?.buyPrice !== '0') {
      nftPrice.label = 'Buy Price'
      nftPrice.token = token
      nftPrice.amount = formatUnits(asset.auctionDetails.buyPrice, token)
    } else if (asset.auctionDetails?.currentBid && asset.auctionDetails?.currentBid !== '0') {
      nftPrice.label = 'Current Bid'
      nftPrice.token = token
      nftPrice.amount = formatUnits(asset.auctionDetails.currentBid, token)
    } else if (asset.auctionDetails?.startingPrice && asset.auctionDetails?.startingPrice !== '0') {
      nftPrice.label = 'Starting Price'
      nftPrice.token = token
      nftPrice.amount = formatUnits(asset.auctionDetails.startingPrice, token)
    }
  } else if (asset.lastPrice && asset.lastPrice !== '0' && asset.lastErc20Address) {
    const token = getTokenKey(asset.networkId, asset.lastErc20Address)
    nftPrice.label = 'Last Price'
    nftPrice.token = token
    nftPrice.amount = formatUnits(asset.lastPrice, token)
  } else if (asset.history?.buy && asset.history?.buy?.length > 0) {
    const lastBuy = asset.history?.buy[asset.history.buy.length - 1]
    if (lastBuy && lastBuy?.amount && lastBuy?.erc20Address) {
      const token = getTokenKey(asset.networkId, lastBuy.erc20Address)
      nftPrice.label = 'Last Price'
      nftPrice.token = token
      nftPrice.amount = formatUnits(lastBuy.amount, token)
    }
  }

  return nftPrice
}

export const getSaleStatus = (asset: AssetObject | undefined) => {
  if (asset?.onSale && asset?.auctionDetails) {
    if (asset?.auctionDetails?.auctionType === AUCTION_TYPES.FIXED) {
      return 'listed'
    } else if (
      asset?.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
      asset?.auctionDetails?.closingTime &&
      new Date(asset?.auctionDetails?.closingTime) >= new Date()
    ) {
      return new Date(asset?.auctionDetails?.startingTime) > new Date() ? 'future' : 'listed'
    } else if (
      asset?.auctionDetails?.auctionType === AUCTION_TYPES.AUCTION &&
      asset?.auctionDetails?.closingTime &&
      new Date(asset?.auctionDetails?.closingTime) <= new Date()
    ) {
      return 'ended'
    }
  } else {
    if (asset?.history?.buy?.length) {
      return 'sold'
    }
  }

  return ''
}

// time
export const convertTimeToAgo = (date: number) => {
  const newDate: any = new Date()
  const seconds = Math.floor((newDate - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago'
  }
  return Math.floor(seconds) + ' seconds ago'
}

/**
 * @description open link on new tab
 */
export const openLink = (link: string) => {
  window.open(link, '_blank')
}

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const validateImagePixel = (
  file: File,
  minWidth: number,
  minHeight: number,
  callback: (isValid: boolean, error?: string) => void
) => {
  if (!file) return
  const img = new Image()
  img.onload = function () {
    if (img.width >= minWidth && img.height >= minHeight) {
      callback(true)
    } else {
      callback(false, `Image dimensions must be at least ${minWidth}x${minHeight}`)
    }
  }
  img.src = URL.createObjectURL(file)
}

/**
 * Parse JWT token
 */
export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  const data = JSON.parse(jsonPayload)
  return data
}

// Function to merge array objects with the same createdOn key
export const mergeAIImageArrayObjects = (data: AIImageObject[]): AIImageObject[] => {
  const mergedData: AIImageObject[] = data.reduce((acc: AIImageObject[], obj: AIImageObject) => {
    const existingObjIndex = acc.findIndex(
      item => moment(item.createdOn).format('MMM Do YY') === moment(obj.createdOn).format('MMM Do YY')
    )

    if (existingObjIndex !== -1) {
      // Merge the images into the existing object
      acc[existingObjIndex].images = [...acc[existingObjIndex].images, ...obj.images]
    } else {
      // Push the new object into the accumulator
      acc.push(obj)
    }

    return acc
  }, [])

  return mergedData
}
