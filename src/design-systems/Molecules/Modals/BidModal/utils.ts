import { CLUBRARE_NETWORKS } from 'utils'

export const mockItem: AssetObject = {
  id: '63be97a8d0ac88a1ee371e4a',
  collectionId: '63be97a8d0ac88a1ee371e4a',
  collectionAddress: '0x55b19fc38204848f7092459c2ad8813651c37608',
  networkId: CLUBRARE_NETWORKS.ETHEREUM,
  contractType: 'clubrare',
  isApproved: true,
  file: 'https://clubrare2.mypinata.cloud/ipfs/QmQkXbRMmNHWCxWb4wZ3zwrG1ArHH1SrvaFSFRaWnBg1jD',
  s3Url: 'https://d1gqvtt7oelrdv.cloudfront.net/nftdata/1673435036449_drops_packs.mp4',
  fileContentType: 'video/mp4',
  redeemable: true,
  redeemVerified: true,
  redeemType: 1,
  nftType: 'test category',
  transactionHash: '',
  collectibleOwner: '0x7a65f539d5eb5b3b84e757d4582413718365577e',
  title: 'video_093',
  description: '',
  ipfsHash: 'Qmdpb1bKqkDG5us4UC42JFuuEvctgTFnPgxh9Wmk3a5rWa',
  collectibleType: 'clubrare',
  royalties: 11,
  usdAmount: 1.80752,
  customFields: [],
  onSale: true,
  isHide: false,
  createdBy: '63493caf498f601c59e2761a',
  isActive: true,
  previewUrl: 'https://d1gqvtt7oelrdv.cloudfront.net/nftdata/compressed_1673435036449_drops_packs.mp4',
  history: {
    transfer: [],
    approval: [],
    bid: [],
    offers: [],
    buy: [],
    collect: [],
    onSale: [],
    offSale: [],
    priceUpdated: [],
  },
  viewCount: 4,
  tokenId: '44',
  userObj: {
    id: '',
    networkId: CLUBRARE_NETWORKS.ETHEREUM,
    createdOn: '',
    isSuperAdmin: false,
    isWhiteListedSeller: false,
    role: 'user',
    name: "Roberto's ",
    image: 'https://d1gqvtt7oelrdv.cloudfront.net/profile/1680002845679_thumbnail_1680002845663_image_2_.png',
    walletAddress: '0xcfc7d1609ff28970d206c3b0c3ab348bca040d0d',
  },
  auctionDetails: {
    _id: '642ac925fbadcac088fe3451',
    collection_address: '0x55b19fc38204848f7092459c2ad8813651c37608',
    token_id: '44',
    contract_address: '0xcfc7d1609ff28970d206c3b0c3ab348bca040d0d',
    nonce: '1',
    collectible_id: '63be97a8d0ac88a1ee371e4a',
    signature:
      '0x2c806cc6c0c07645ec1b92855c158a84a8d4f7db3b2306b5598b39f3216549df2b278a1fa8fb021f137f8523921f327ebbfa27bc4032edc578472f7683302d3d1c',
    lastOwner: '0x7a65f539d5eb5b3b84e757d4582413718365577e',
    bid_time: '2023-04-03T12:40:05.397Z',
    currentBid: '0',
    highestBidder: '0x0000000000000000000000000000000000000000',
    auctionType: '1',
    startingPrice: '0',
    buyPrice: '1000000000000000',
    buyer: '0x0000000000000000000000000000000000000000',
    startingTime: '2023-04-03T12:39:00.000Z',
    closingTime: '1970-01-01T00:00:00.000Z',
    initialClosingTime: '1970-01-01T00:00:00.000Z',
    isTokenGated: false,
    tokenGateAddress: '0x0000000000000000000000000000000000000000',
    erc20Token: '0x0000000000000000000000000000000000000000',
    is_active: true,
  },
  createdOn: `${1}-${1}-${1} ${1}:${1}:${1} UTC`,
  // redeem_id: null,1
  // item_authenticated: true,
  ownerVerified: true,
  ownerObj: {
    name: 'null',
    image:
      'https://d1gqvtt7oelrdv.cloudfront.net/profile/1672924618318_thumbnail_62595b50628441614a0e68a0_preview_1672924618314.jpg',
    walletAddress: '0x7a65f539d5eb5b3b84e757d4582413718365577e',
  },
  // eth_price: '0.001',
  lastPrice: '4325000000000000000',
  lastErc20Address: '0x58cCfaCCd1922c233D6F3748915b948C7077d1F7',
  totalLike: 1,
  isLike: false,
  WalletAddress: function (walletAddress: string | undefined, WalletAddress: any): unknown {
    throw new Error('Function not implemented.')
  },
}
