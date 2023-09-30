import dynamic from 'next/dynamic'
import { ethers } from 'ethers'
import moment from 'moment'

import { CollectionType, FlowType, ListingType, ProductType } from './enums'
import type { BodyType, Step, State } from './interface'

import {
  AUCTION_TYPES,
  DEFAULT_COLLECTION_ADDRESS,
  METAMASK_TOKEN_ADDRESS,
  convertDate2UTCTimeStamp,
  DATE_TIME_FORMAT,
  NULL_TOKEN_ADDRESS,
  CLUBRARE_NETWORKS,
  KAIKAS_TOKEN_ADDRESS,
  DEFAULT_KLAYTN_CHAIN_ID,
  parseUnits,
  compareStringsInsentively,
  TOKEN_BASED_ADDRESS,
} from 'utils'

const CreateNFTForm = dynamic(() =>
  import('design-systems/Molecules/Forms/CreateNFTForm').then(({ CreateNFTForm }) => ({
    default: CreateNFTForm,
  }))
)

const ListingForm = dynamic(() =>
  import('design-systems/Molecules/Forms/ListingForm').then(({ ListingForm }) => ({
    default: ListingForm,
  }))
)

const AttributeCollectionForm = dynamic(() =>
  import('design-systems/Molecules/Forms/AttributeCollectionForm').then(({ AttributeCollectionForm }) => ({
    default: AttributeCollectionForm,
  }))
)

const AuthenticateForm = dynamic(() =>
  import('design-systems/Molecules/Forms/AuthenticateForm').then(({ AuthenticateForm }) => ({
    default: AuthenticateForm,
  }))
)

const CollectionTypeForm = dynamic(() =>
  import('design-systems/Molecules/Forms/CollectionTypeForm').then(({ CollectionTypeForm }) => ({
    default: CollectionTypeForm,
  }))
)

const CreateCollectionForm = dynamic(() =>
  import('design-systems/Molecules/Forms/CreateCollectionForm').then(({ CreateCollectionForm }) => ({
    default: CreateCollectionForm,
  }))
)

const DigitalNFTImageForm = dynamic(() =>
  import('design-systems/Molecules/Forms/DigitalNFTImageForm').then(({ DigitalNFTImageForm }) => ({
    default: DigitalNFTImageForm,
  }))
)

const PhygitalNFTImageForm = dynamic(() =>
  import('design-systems/Molecules/Forms/PhygitalNFTImageForm').then(({ PhygitalNFTImageForm }) => ({
    default: PhygitalNFTImageForm,
  }))
)

const ReviewCreateForm = dynamic(() =>
  import('design-systems/Molecules/Forms/ReviewCreateForm').then(({ ReviewCreateForm }) => ({
    default: ReviewCreateForm,
  }))
)

const AllDoneForm = dynamic(() =>
  import('design-systems/Molecules/Forms/AllDoneForm').then(({ AllDoneForm }) => ({
    default: AllDoneForm,
  }))
)

export const PHYGITAL_FLOW: Record<string, Step> = {
  CREATE_NFT: {
    stepId: 1,
    Body: CreateNFTForm as BodyType,
  },
  LISTING: {
    stepId: 2,
    Body: ListingForm as BodyType,
  },
  ATTRIBUTE_COLLECTIONS: {
    stepId: 3,
    Body: AttributeCollectionForm as BodyType,
  },
  NFT_IMAGE: {
    stepId: 4,
    Body: PhygitalNFTImageForm as BodyType,
  },
  AUTHENTICATE: {
    stepId: 5,
    Body: AuthenticateForm as BodyType,
  },
  REVIEW: {
    stepId: 6,
    Body: ReviewCreateForm as BodyType,
  },
  DONE: {
    stepId: 7,
    Body: AllDoneForm as BodyType,
  },
}

export const DIGITAL_FLOW: Record<string, Step> = {
  CREATE_NFT: {
    stepId: 1,
    Body: CreateNFTForm as BodyType,
  },
  LISTING: {
    stepId: 2,
    Body: ListingForm as BodyType,
  },
  ATTRIBUTE_COLLECTIONS: {
    stepId: 3,
    Body: AttributeCollectionForm as BodyType,
  },
  NFT_IMAGE: {
    stepId: 4,
    Body: DigitalNFTImageForm as BodyType,
  },
  REVIEW: {
    stepId: 5,
    Body: ReviewCreateForm as BodyType,
  },
  DONE: {
    stepId: 6,
    Body: AllDoneForm as BodyType,
  },
}

export const COLLECTION_FLOW: Record<string, Step> = {
  SELECT_COLLECTION_TYPE: {
    stepId: 1,
    Body: CollectionTypeForm as BodyType,
  },
  CREATE_COLLECTION: {
    stepId: 2,
    Body: CreateCollectionForm as BodyType,
  },
}

export const getCurrentFlow = (flowType: FlowType) => {
  switch (flowType) {
    case FlowType.DIGITAL:
      return DIGITAL_FLOW
    case FlowType.PHYGITAL:
      return PHYGITAL_FLOW
    case FlowType.COLLECTION:
      return COLLECTION_FLOW
  }
}

export const getCurrentStep = (flowType: FlowType, id: number): Step => {
  const flow = getCurrentFlow(flowType)
  const step: Step = Object.values(flow).find(({ stepId }) => stepId === id) ?? flow[0]

  return step
}

export const getStepLength = (flowType: FlowType): number => {
  const flow = getCurrentFlow(flowType)
  const { length } = Object.values(flow)
  return length
}

const DigitalProductFields = [
  'attachments',
  'attributes',
  'burnable',
  'collection',
  'description',
  'email',
  'isLuxuryAuthReq',
  'name',
  'network',
  'productType',
  'royalties',
  'title',
  'isOtherBrand',
]

const PhygitalProductFields = [
  ...DigitalProductFields,
  'additionalImages',
  'category',
  'authFiles',
  'brand',
  'isLuxuryAuthReq',
]

const listToMatrix = (list: [], elementsPerSubArray: number) => {
  const matrix = []

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++
      matrix[k] = []
    }

    matrix[k].push(list[i])
  }

  return matrix
}

const formatFormData = (store: AnyObject, productType: ProductType) => {
  const attributes = listToMatrix(Object.values(store?.attributes).filter(element => element !== undefined) as [], 2)
  const data = new FormData()
  data.append('attachment', store.attachments[0])
  data.append('collection_id', store.collection?.id)
  data.append('creator_name', store.name)
  data.append('customFields', JSON.stringify([Object.fromEntries(attributes)]))
  data.append('description', store.description)
  data.append('email', store.email)
  data.append('network_id', store.network === 'ethereum' ? '1' : '2')
  data.append('redeem_type', store.redeem_type === false ? '1' : '2')
  data.append('redeemable', store.redeemable === 'DIGITAL' ? 'false' : 'true')
  data.append('royalties', store.royalties)
  data.append('title', store?.title)

  if (productType === ProductType.PHYGITAL) {
    const authImage = Object.keys(store.authFiles)
    const additionalImages = Object.values(store?.additionalImages) ?? []
    const isOther = compareStringsInsentively(store.brand?.name, 'other')
    data.append('isLuxuryAuthReq', isOther ? 'false' : store?.isLuxuryAuthReq)
    data.append('nft_type', store.category?.name)
    store.brand && data.append('brand', isOther ? store.brand?.id : store.brand?.name)
    data.append('category_id', store.category?.id)
    additionalImages?.map((file: any) => {
      data.append('additionalImages', file)
    })
    authImage?.map((name: string) => {
      data.append(name, store.authFiles[name])
    })
  }
  return data
}

const getProductKeys = (productType: string) => {
  switch (productType) {
    case ProductType.DIGITAL:
      return DigitalProductFields
    case ProductType.PHYGITAL:
      return PhygitalProductFields
  }
  return []
}

export const convertStoreToFormData = async (store: State) => {
  const { productType } = store
  const productKeys = getProductKeys(productType)
  const productData = Object.keys(store)
    .filter(key => productKeys.includes(key))
    .reduce((obj: Record<string, ValueOf<State>>, key: string) => {
      obj[key] = store[key as keyof State]
      return obj
    }, {})
  return formatFormData(productData, productType)
}

export const getListingObjectForSig = (
  store: State,
  collectible: CreateCollectibleResponse,
  walletAddress: AddressString,
  chainId: SupportedChainIds
) => {
  const networkId = chainId === DEFAULT_KLAYTN_CHAIN_ID ? CLUBRARE_NETWORKS.KLAYTN : CLUBRARE_NETWORKS.ETHEREUM
  const currentDate = moment(new Date()).format(DATE_TIME_FORMAT)

  const listingObject: ListingObject = {
    auctionType: store.listingType === ListingType.FIXED ? AUCTION_TYPES.FIXED : AUCTION_TYPES.AUCTION,
    collectibleOwner: walletAddress,
    contractAddress:
      store.collection?.chain === CollectionType.ON_CHAIN_COLLECTION
        ? (store.collection?.collectionAddress as AddressString)
        : (DEFAULT_COLLECTION_ADDRESS[chainId] as AddressString),
    creatorAddress: walletAddress,
    endTime: store.listingType === ListingType.FIXED ? 0 : convertDate2UTCTimeStamp(new Date(store.endDate)),
    isTokenGated: store.isTokenGated,
    objId: collectible?.data.id,
    orderType: store.productType === ProductType.DIGITAL ? 0 : 1,
    paymentTokenType: tokenAddress(networkId, store?.currency),
    price: parseUnits(String(store.price), store?.currency),
    royalty: store.royalties ? store.royalties * 100 : 0,
    startTime: store?.startDate
      ? convertDate2UTCTimeStamp(new Date(store.startDate))
      : convertDate2UTCTimeStamp(new Date(currentDate)),
    tokenGateAddress: store.isTokenGated ? TOKEN_BASED_ADDRESS[chainId] : NULL_TOKEN_ADDRESS,
    tokenId: 0,
    uri: collectible?.data.ipfsHash,
  }
  return listingObject
}

export const tokenAddress = (networkId: ClubRareNetworks, selectedToken: string) => {
  if (networkId === CLUBRARE_NETWORKS.KLAYTN) {
    switch (selectedToken) {
      case 'AGOV':
        return KAIKAS_TOKEN_ADDRESS.AGOV
      case 'USDT':
        return KAIKAS_TOKEN_ADDRESS.USDT
      default:
        return ethers.constants.AddressZero
    }
  } else {
    switch (selectedToken) {
      case 'WETH':
        return METAMASK_TOKEN_ADDRESS.WETH
      case 'MPWR':
        return METAMASK_TOKEN_ADDRESS.MPWR
      case 'AGOV':
        return METAMASK_TOKEN_ADDRESS.AGOV
      case 'USDT':
        return METAMASK_TOKEN_ADDRESS.USDT
      default:
        return ethers.constants.AddressZero
    }
  }
}

export const pointerArrowClassName =
  'box-content h-7 w-7 pb-4 md:pb-0 cursor-pointer text-neutral-400 dark:text-neutral-700'

export const isBackArrowHidden = (flowType: FlowType, stepId: number) => {
  const isDigitalFlowDoneStep = flowType === FlowType.DIGITAL && stepId === DIGITAL_FLOW.DONE.stepId
  const isPhygitalFlowDoneStep = flowType === FlowType.PHYGITAL && stepId === PHYGITAL_FLOW.DONE.stepId

  switch (stepId) {
    case PHYGITAL_FLOW.CREATE_NFT.stepId:
      return true
    case DIGITAL_FLOW.DONE.stepId:
      return isDigitalFlowDoneStep
    case PHYGITAL_FLOW.DONE.stepId:
      return isPhygitalFlowDoneStep
    default:
      return false
  }
}

export const handleKlaytnHashOrder = (
  listingObject: ListingObject,
  nonceRes: BigNumber,
  activatingConnector: WalletTypes
) => {
  const hashData: OrderTuple = {
    seller: listingObject.collectibleOwner,
    contractAddress: listingObject.contractAddress,
    royaltyFee: listingObject.royalty,
    royaltyReceiver: listingObject.creatorAddress,
    paymentToken: listingObject.paymentTokenType,
    basePrice: listingObject.price,
    listingTime: listingObject.startTime,
    expirationTime: listingObject.endTime,
    nonce: nonceRes,
    tokenId: listingObject.tokenId,
    orderType: listingObject.orderType,
    signature:
      '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    uri: listingObject.uri,
    objId: listingObject.objId,
    isTokenGated: listingObject.isTokenGated,
    tokenGateAddress: listingObject.tokenGateAddress,
    // isEscrow: false, //TODO : Need to handle escrow
    // isMetamask: activatingConnector === 'METAMASK-KAIKAS' ? true : false,
  }
  return hashData
}
