export enum FlowType {
  DIGITAL = 'DIGITAL_FLOW',
  PHYGITAL = 'PHYGITAL_FLOW',
  COLLECTION = 'COLLECTION_FLOW',
}

export enum NetworkType {
  ETHEREUM = 'ethereum',
  KLAYTN = 'klaytn',
}

export enum ProductType {
  PHYGITAL = 'PHYGITAL',
  DIGITAL = 'DIGITAL',
}

export enum ListingType {
  AUCTION = 'auction',
  FIXED = 'fixed',
}

export enum CurrencyType {
  ETH = 'ETH',
  WETH = 'WETH',
  MPWR = 'MPWR',
  AGOV = 'AGOV',
  KLAY = 'KLAY',
}

export enum CollectionType {
  ON_CHAIN_COLLECTION = 'on',
  OFF_CHAIN_COLLECTION = 'off',
}

export enum DialogAction {
  NEXT = 'NEXT',
  BACK = 'BACK',
  SET_FLOW_TYPE = 'SET_FLOW_TYPE',
}

export enum CreateNFTFormAction {
  SET_NETWORK = 'SET_NETWORK',
  SET_PRODUCT_TYPE = 'SET_PRODUCT_TYPE',
}

export enum ListingFormAction {
  SET_LISTING_TYPE = 'SET_LISTING_TYPE',
  SET_CURRENCY_TYPE = 'SET_CURRENCY_TYPE',
  SET_BURNABLE = 'SET_BURNABLE',
  SET_IS_TOKEN_GATED = 'SET_IS_TOKEN_GATED',
}

export enum CollectionFormAction {
  CREATE = 'CREATE',
  SELECT_COLLECTION = 'SELECT_COLLECTION',
  SET_ATTRIBUTES = 'SET_ATTRIBUTES',
}

export enum DigitalImageFormAction {
  SET_IMAGE = 'SET_IMAGE',
}

export enum PhygitalImageFormAction {
  SET_IMAGE = 'SET_IMAGE',
}

export enum CollectionTypeFormAction {
  SELECT_COLLECTION_TYPE = 'SELECT_COLLECTION_TYPE',
}

export enum AuthenticationFormAction {
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  SET_AUTH_IMAGES = 'SET_AUTH_IMAGES',
  IS_LUXURY_AUTH_REQ = 'IS_LUXURY_AUTH_REQ',
  SET_BRAND = 'SET_BRAND',
}

export enum ReviewAndCreateFormAction {
  CREATE_ITEM = 'CREATE_ITEM',
}

export enum AllDoneFormAction {
  CREATE_NEW = 'CREATE_NEW',
}
