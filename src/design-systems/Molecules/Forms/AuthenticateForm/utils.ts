export const userTypes = {
  BRANDS: {
    text: 'You are a whitelisted Brand, and your items are authenticated automatically',
    type: 'brands',
  },
  NON_VERIFIED: {
    text: 'You are a non-verified seller and must go through our authentication process',
    type: 'non verified',
  },
  VERIFIED: {
    text: ' Switch the toggle on to authenticate your item',
    type: 'verified',
  },
}
export const categories = [
  {
    brands: [],
    categoryId: 1,
    id: '62c7c1c0f2437a16e392a890',
    imageRules: [],
    luxuryName: 'string',
    name: 'Shoes',
  },
  {
    brands: [],
    categoryId: 2,
    id: '62c7c1c0f2437a16e392a858',
    imageRules: [],
    luxuryName: 'string',
    name: 'Jewelry',
  },
  {
    brands: [],
    categoryId: 3,
    id: '62c7c1c0f2437a16e392a8f1',
    imageRules: [],
    luxuryName: 'string',
    name: 'Watches',
  },
  {
    brands: [],
    categoryId: 1,
    id: '63b3f54d8eafd9d5adfbec75',
    imageRules: [],
    luxuryName: 'string',
    name: 'Clothing',
  },
  {
    brands: [],
    categoryId: 1,
    id: '62c7c1c0f2437a16e392a928',
    imageRules: [],
    luxuryName: 'string',
    name: 'Handbags',
  },
  {
    brands: [],
    categoryId: 1,
    id: '62c7dca75147dbaa27b330c8',
    imageRules: [],
    luxuryName: 'string',
    name: 'Art',
  },

  {
    brands: [],
    categoryId: 1,
    id: '64132787553249f5341a8733',
    imageRules: [],
    luxuryName: 'string',
    name: 'Collectibles',
  },
]

const imageRules = ['authenticationimage1', 'authenticationimage2', 'authenticationimage3']

export const filteredImageRules = (data?: ImageRuleObject[]) => {
  const result = data?.filter(
    (object: ImageRuleObject) => !imageRules.includes(object['name'].replace(/_/g, '').toLowerCase())
  )
  return result ?? []
}
export const renameKeyOfBrand = (data: any) => {
  const filtered = data?.map((object: any) => ({ ...object, displayName: object?.name }))
  return filtered
}

export const validateImageRequired = (imageRulesObject: ImageRuleObject[], authImages: AnyObject) =>
  imageRulesObject
    ?.filter((imageRules: ImageRuleObject) => imageRules.isRequired)
    .map((imageRulesData: ImageRuleObject) => authImages[imageRulesData?.name] ?? false)
    .includes(false)
