export const getLabel = (status: string) => {
  switch (status) {
    case 'placeBid':
      return 'Current Bid'
    case 'buyNow':
      return 'Fixed Price'
    case 'sold':
      return 'Sold'
    case 'owner':
      return 'Last Sale'
    default:
      return 'Current Bid'
  }
}

export const getButtonText = (status: string) => {
  switch (status) {
    case 'placeBid':
      return 'PLACE BID'
    case 'buyNow':
      return 'BUY NOW'
    case 'sold':
      return ''
    case 'owner':
      return 'PUT ON SALE'
    default:
      return 'PLACE BID'
  }
}

export enum AuthenticationStatus {
  AUTHENTICATED = 'AUTHENTICATED',
  NOT_AUTHENTICATED = 'NOT AUTHENTICATED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

/**
 * Returns the authentication status of an asset based on its luxury authentication requirements and status.
 * @param asset - The asset object to check for authentication status.
 * @returns The authentication status of the asset.
 */
export const getAuthenticationStatus = (asset: AssetObject) => {
  const { isLuxuryAuthReq, luxuryStatus, isAuthentic } = asset
  if (isLuxuryAuthReq) {
    if (luxuryStatus === 'COMPLETED' && isAuthentic) return AuthenticationStatus.AUTHENTICATED
    if (luxuryStatus === 'COMPLETED' && !isAuthentic) return AuthenticationStatus.FAILED
    if (luxuryStatus === 'PROCESSING') return AuthenticationStatus.PENDING
  }
  return AuthenticationStatus.NOT_AUTHENTICATED
}

/**
 * Replace all URLs with a tag in given text.
 * @param text - texts with URLs
 * @returns - formatted texts
 */
export const parseAnchorTags = (text: string) => {
  if (!text) {
    return '<a></a>'
  }
  const urlRegex =
    /(((https?:\/\/)|(www\.))[^\s]+)|[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
  return text?.replace(urlRegex, function (url: string) {
    let hyperlink: string = url
    if (!hyperlink.match('^https?://')) {
      hyperlink = 'https://' + hyperlink
    }
    return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
  })
}
