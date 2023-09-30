import { useInfiniteQuery } from 'wagmi'

import { PAGE_SIZE } from 'utils'

export const usePaginatedQuery = <T>(
  key: Array<T>,
  fetcher: AnyFunction,
  formatter: AnyFunction,
  options?: AnyObject,
  fetcherParams?: AnyObject
) => {
  const result = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) => {
      return fetcher({ page_size: PAGE_SIZE, page_number: pageParam, ...fetcherParams })
    },
    {
      getNextPageParam: (lastResponse, allResponses) => {
        const page = allResponses.length
        if ((formatter(lastResponse)?.length ?? 0) === PAGE_SIZE) {
          return page + 1
        } else {
          return
        }
      },
      ...options,
    }
  )

  return { ...result, data: result?.data?.pages }
}
