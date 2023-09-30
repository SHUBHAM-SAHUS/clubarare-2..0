import { FieldValues } from 'react-hook-form'

import {
  AllDoneFormAction,
  AuthenticationFormAction,
  CollectionFormAction,
  CollectionType,
  CollectionTypeFormAction,
  CreateNFTFormAction,
  DialogAction,
  DigitalImageFormAction,
  ListingFormAction,
  PhygitalImageFormAction,
  CurrencyType,
  FlowType,
  ListingType,
  NetworkType,
  ProductType,
  ReviewAndCreateFormAction,
} from './enums'

import { AttributeCollectionForm } from 'design-systems/Molecules/Forms/AttributeCollectionForm'
import { AuthenticateForm } from 'design-systems/Molecules/Forms/AuthenticateForm'
import { CollectionTypeForm } from 'design-systems/Molecules/Forms/CollectionTypeForm'
import { CreateCollectionForm } from 'design-systems/Molecules/Forms/CreateCollectionForm'
import { CreateNFTForm } from 'design-systems/Molecules/Forms/CreateNFTForm'
import { DigitalNFTImageForm } from 'design-systems/Molecules/Forms/DigitalNFTImageForm'
import { PhygitalNFTImageForm } from 'design-systems/Molecules/Forms/PhygitalNFTImageForm'
import { ListingForm } from 'design-systems/Molecules/Forms/ListingForm'
import { ReviewCreateForm } from 'design-systems/Molecules/Forms/ReviewCreateForm'

export type BodyType =
  | typeof CreateNFTForm
  | typeof ListingForm
  | typeof AttributeCollectionForm
  | typeof CollectionTypeForm
  | typeof CreateCollectionForm
  | typeof AuthenticateForm
  | typeof DigitalNFTImageForm
  | typeof PhygitalNFTImageForm
  | typeof ListingForm
  | typeof ReviewCreateForm

export type Step = {
  stepId: number
  Body: BodyType
}

export type ActionTypes =
  | DialogAction
  | CreateNFTFormAction
  | ListingFormAction
  | CollectionFormAction
  | CollectionTypeFormAction
  | DigitalImageFormAction
  | PhygitalImageFormAction
  | AuthenticationFormAction
  | ReviewAndCreateFormAction
  | AllDoneFormAction

export type State = {
  stepId: number
  flowType: FlowType
  // Step1: Create NFT Form
  network: NetworkType
  productType: ProductType
  email: string
  name: string
  title: string
  description: string
  // Step2: Listing
  listingType: ListingType
  currency: CurrencyType
  price: number
  royalties: number
  startDate: Date
  endDate: Date
  burnable: boolean
  isTokenGated: boolean
  // Step3: Attribute & Collection
  collection?: CollectionAssetObject
  attributes: {
    [key: string]: string
  }
  // Step3.1: Collection Type Form
  collectionType: CollectionType
  // Step3.2: Authentication Form
  category: CategoryObject
  authImages: File[]

  // Step4: NFT Image
  attachments: File[]
  additionalImages: AdditionalImages
  // Step5: Authentication
  isLuxuryAuthReq: boolean
  brand?: CollectionAssetObject
  agreement: boolean
  // Step6: Review
  productId?: string
}

export type Action = { type: ActionTypes; payload?: FieldValues | Partial<State> }

export interface NFTCreationManagerProps {}

export interface AdditionalImages {
  [key: string]: File
}
