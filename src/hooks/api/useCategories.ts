import { useQuery, useQueryClient } from 'wagmi'

import { CategoryService } from 'api-services'
import { QUERIES } from 'utils'

export const GET_ALL_CATEGORIES_QUERY_KEY = [QUERIES.CATEGORY.ALL]

/**
 * Fetch Asset Categories
 */
export const useCategories = (reload = false) => {
  const queryClient = useQueryClient()
  const { isLoading: isLoadingCategories } = useQuery(GET_ALL_CATEGORIES_QUERY_KEY, CategoryService.getAllCategories, {
    enabled: reload,
  })

  const categories = queryClient.getQueryData<CategoriesResponse>(GET_ALL_CATEGORIES_QUERY_KEY)?.data ?? []

  return {
    isLoadingCategories,
    categories,
  }
}
