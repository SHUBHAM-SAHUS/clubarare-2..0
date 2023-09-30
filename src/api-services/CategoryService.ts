import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils'

class CategoryService {
  getAllCategories = () => CoreAPIService.get<CategoriesResponse>(API_ENDPOINTS.CATEGORY.ALL)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService()
