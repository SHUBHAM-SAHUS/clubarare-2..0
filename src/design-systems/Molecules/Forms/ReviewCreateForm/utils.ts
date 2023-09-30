export const IMAGE_WIDTH = 80
export const IMAGE_HEIGHT = 80

export const formatDate = (date = new Date()) => new Intl.DateTimeFormat('en-US').format(new Date(date))
const authenticatedCategory = ['handbags', 'clothing', 'watches', 'jewelry', 'shoes']

export const validateAuthenticateCategory = (category: string) => {
  return !authenticatedCategory.includes(category.toLowerCase())
}
