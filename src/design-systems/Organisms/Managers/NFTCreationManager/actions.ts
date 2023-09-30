import { Dispatch } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action, AdditionalImages } from './interface'
import {
  CurrencyType,
  NetworkType,
  ProductType,
  ListingType,
  FlowType,
  CollectionFormAction,
  CollectionTypeFormAction,
  CreateNFTFormAction,
  DialogAction,
  ListingFormAction,
  CollectionType,
  DigitalImageFormAction,
  PhygitalImageFormAction,
  AuthenticationFormAction,
  AllDoneFormAction,
  ReviewAndCreateFormAction,
} from './enums'

const dialogActions = (dispatch: Dispatch<Action>) => ({
  onNext: (values: FieldValues) => dispatch({ type: DialogAction.NEXT, payload: { ...values } }),
  onBack: (values?: { stepId: number } | {}) => dispatch({ type: DialogAction.BACK, payload: { ...values } }),
  onSelectFlowType: (flowType: FlowType) => dispatch({ type: DialogAction.SET_FLOW_TYPE, payload: { flowType } }),
})

const createNFTFormActions = (dispatch: Dispatch<Action>) => ({
  onSelectProductType: (productType: ProductType) =>
    dispatch({ type: CreateNFTFormAction.SET_PRODUCT_TYPE, payload: { productType } }),
  onSelectNetwork: (network: NetworkType) => dispatch({ type: CreateNFTFormAction.SET_NETWORK, payload: { network } }),
})

const listingFormActions = (dispatch: Dispatch<Action>) => ({
  onSelectListingType: (listingType: ListingType) =>
    dispatch({ type: ListingFormAction.SET_LISTING_TYPE, payload: { listingType } }),
  onSelectCurrency: (currency: CurrencyType) =>
    dispatch({ type: ListingFormAction.SET_CURRENCY_TYPE, payload: { currency } }),
  onSelectBurnable: (burnable: boolean) => dispatch({ type: ListingFormAction.SET_BURNABLE, payload: { burnable } }),
  onSelectIsTokenGated: (isTokenGated: boolean) =>
    dispatch({ type: ListingFormAction.SET_IS_TOKEN_GATED, payload: { isTokenGated } }),
})

const collectionFormActions = (dispatch: Dispatch<Action>) => ({
  onCreateCollection: () => dispatch({ type: CollectionFormAction.CREATE }),
  onSelectCollection: (collection: CollectionAssetObject) =>
    dispatch({ type: CollectionFormAction.SELECT_COLLECTION, payload: { collection } }),
  onChangeAttribute: (attributes: string[]) =>
    dispatch({ type: CollectionFormAction.SET_ATTRIBUTES, payload: { attributes } }),
})

const collectionTypeFormActions = (dispatch: Dispatch<Action>) => ({
  onSelectCollectionType: (collectionType: CollectionType) =>
    dispatch({ type: CollectionTypeFormAction.SELECT_COLLECTION_TYPE, payload: { collectionType } }),
})

const digitalImageFormActions = (dispatch: Dispatch<Action>) => ({
  onAddDigitalImage: (attachments: File[]) =>
    dispatch({ type: DigitalImageFormAction.SET_IMAGE, payload: { attachments } }),
})

const phygitalImageFormActions = (dispatch: Dispatch<Action>) => ({
  onAddPhygitalImage: (attachments: File[]) =>
    dispatch({ type: PhygitalImageFormAction.SET_IMAGE, payload: { attachments } }),
  onAddPhygitalAdditionalImages: (additionalImages?: AdditionalImages) =>
    dispatch({ type: PhygitalImageFormAction.SET_IMAGE, payload: { additionalImages } }),
})

const authenticateFormActions = (dispatch: Dispatch<Action>) => ({
  onSelectCategory: (category: CategoryObject) =>
    dispatch({ type: AuthenticationFormAction.SELECT_CATEGORY, payload: { category } }),
  onChangeBrand: (brand: CollectionAssetObject) =>
    dispatch({ type: AuthenticationFormAction.SET_BRAND, payload: { brand } }),
  onChangeIsLuxuryAuthReq: (isLuxuryAuthReq: boolean) =>
    dispatch({ type: AuthenticationFormAction.IS_LUXURY_AUTH_REQ, payload: { isLuxuryAuthReq } }),
  onAddAuthImages: (authFiles: AdditionalImages) =>
    dispatch({ type: AuthenticationFormAction.SET_AUTH_IMAGES, payload: { authFiles } }),
})

const reviewAndCreateFormActions = (dispatch: Dispatch<Action>) => ({
  onCreateItem: (productId: string) =>
    dispatch({ type: ReviewAndCreateFormAction.CREATE_ITEM, payload: { productId } }),
})

const allDoneFormActions = (dispatch: Dispatch<Action>) => ({
  onCreateNew: () => dispatch({ type: AllDoneFormAction.CREATE_NEW }),
})

export const getActions = (dispatch: (value: Action) => void) => ({
  ...dialogActions(dispatch),
  ...createNFTFormActions(dispatch),
  ...listingFormActions(dispatch),
  ...collectionFormActions(dispatch),
  ...collectionTypeFormActions(dispatch),
  ...digitalImageFormActions(dispatch),
  ...phygitalImageFormActions(dispatch),
  ...authenticateFormActions(dispatch),
  ...reviewAndCreateFormActions(dispatch),
  ...allDoneFormActions(dispatch),
})
