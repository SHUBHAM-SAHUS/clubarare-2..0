import moment from 'moment'

import { Action, State } from './interface'
import {
  AllDoneFormAction,
  AuthenticationFormAction,
  CollectionFormAction,
  CollectionType,
  CollectionTypeFormAction,
  CreateNFTFormAction,
  CurrencyType,
  DialogAction,
  DigitalImageFormAction,
  FlowType,
  ListingFormAction,
  ListingType,
  NetworkType,
  PhygitalImageFormAction,
  ProductType,
  ReviewAndCreateFormAction,
} from './enums'
import { COLLECTION_FLOW, DIGITAL_FLOW } from './utils'

export const initialState: State = {
  // modal states
  stepId: 1,

  // Step1: Create NFT Form
  flowType: FlowType.PHYGITAL,
  network: NetworkType.ETHEREUM,
  productType: ProductType.PHYGITAL,
  email: '',
  name: '',
  title: '',
  description: '',

  // Step2: Listing Form
  listingType: ListingType.AUCTION,
  currency: CurrencyType.ETH,
  price: 0,
  startDate: new Date(),
  endDate: moment(new Date()).add(1, 'day').toDate(),
  royalties: 0,
  burnable: false,
  isTokenGated: false,
  // Step3: Attribute & Collection Form
  collection: undefined,
  attributes: {},
  // Step3.1: Collection Type Form
  collectionType: CollectionType.OFF_CHAIN_COLLECTION,

  // Step3.2: Authentication Form
  category: {} as CategoryObject,
  authImages: [],

  // Step4: Images
  attachments: [],
  additionalImages: {},
  // Step5: Authentication
  isLuxuryAuthReq: false,
  brand: undefined,
  // Step6: Review
  agreement: false,
  productId: undefined,
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action
  const { flowType } = state

  if (flowType === FlowType.COLLECTION) {
    const nextFlowType = state.productType === ProductType.DIGITAL ? FlowType.DIGITAL : FlowType.PHYGITAL

    switch (type) {
      // Dialog Actions
      case DialogAction.NEXT:
        if (state.stepId === COLLECTION_FLOW.SELECT_COLLECTION_TYPE.stepId) {
          return { ...state, ...payload, stepId: state.stepId + 1 }
        } else {
          const stepId = DIGITAL_FLOW.ATTRIBUTE_COLLECTIONS.stepId
          return { ...state, ...payload, stepId, flowType: nextFlowType }
        }
      case DialogAction.BACK:
        if (state.stepId === COLLECTION_FLOW.CREATE_COLLECTION.stepId) {
          return { ...state, stepId: state.stepId - 1 }
        } else {
          const stepId = DIGITAL_FLOW.ATTRIBUTE_COLLECTIONS.stepId
          return { ...state, stepId, flowType: nextFlowType }
        }
      // Step3.3: Collection Type
      case CollectionTypeFormAction.SELECT_COLLECTION_TYPE:
        return { ...state, ...payload }
      // No Step, case for closing collection creation flow modal
      case AllDoneFormAction.CREATE_NEW:
        return initialState
      default:
        return state
    }
  } else {
    switch (type) {
      // Dialog Actions
      case DialogAction.NEXT:
        return { ...state, ...payload, stepId: payload?.stepId ? payload?.stepId : state.stepId + 1 }
      case DialogAction.BACK:
        return { ...state, stepId: payload?.stepId ? payload?.stepId : state.stepId - 1 }

      case DialogAction.SET_FLOW_TYPE: // Step1: Create NFT Form
      case CreateNFTFormAction.SET_PRODUCT_TYPE: // Step1: Create NFT Form
      case CreateNFTFormAction.SET_NETWORK: // Step1: Create NFT Form
      case ListingFormAction.SET_LISTING_TYPE: // Step2: Listing Form
      case ListingFormAction.SET_CURRENCY_TYPE: // Step2: Listing Form
      case ListingFormAction.SET_BURNABLE: // Step2: Listing Form
      case ListingFormAction.SET_IS_TOKEN_GATED: // Step2: Listing Form
      case CollectionFormAction.SELECT_COLLECTION: // Step3.1: Collection
      case CollectionFormAction.SET_ATTRIBUTES: // Step3.2: Attribute
      case DigitalImageFormAction.SET_IMAGE: // Step4: Digital NFT Image
      case PhygitalImageFormAction.SET_IMAGE: // Step4: Phygital NFT Image
      case AuthenticationFormAction.SELECT_CATEGORY: // Step5: Authentication Form
      case AuthenticationFormAction.SET_BRAND: // Step5: Authentication Form
      case AuthenticationFormAction.SET_AUTH_IMAGES: // Step5: Authentication Form
      case AuthenticationFormAction.IS_LUXURY_AUTH_REQ: // Step5: Authentication Form
      case ReviewAndCreateFormAction.CREATE_ITEM: // Step6: Review & Create Form
        return { ...state, ...payload }
      // Step6: Review & Create Form
      case CollectionFormAction.CREATE:
        return { ...state, flowType: FlowType.COLLECTION, stepId: COLLECTION_FLOW.SELECT_COLLECTION_TYPE.stepId }
      // Step7: All Done Form
      case AllDoneFormAction.CREATE_NEW:
        return initialState

      default:
        return state
    }
  }
}
