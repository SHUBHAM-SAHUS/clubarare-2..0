export const NFT_ERROR_MESSAGE = 'Please upload your main NFT image before proceeding'
export const CATEGORY_ERROR_MESSAGE = 'Select category before proceeding.'

const authenticatedCategory = ['handbags', 'clothing', 'watches', 'jewelry', 'shoes']
export const validateAuthenticateCategory = (category: string) => {
  return !authenticatedCategory.includes(category.toLowerCase())
}

export const validImageType = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml']
