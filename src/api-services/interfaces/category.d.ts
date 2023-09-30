interface BrandObject {
  id: string
  name: string
}

interface ImageRuleObject {
  id: string
  imageRuleId: number
  name: string
  description: string
  isRequired: boolean
  type: string
  url: string
}

interface CategoryObject {
  id?: string | number
  luxuryName?: string
  name: string
  categoryId?: number
  brands?: BrandObject[]
  imageRules?: ImageRuleObject[]
}

interface CategoriesResponse {
  status: boolean
  message: string
  code: number
  data: CategoryObject[]
}
