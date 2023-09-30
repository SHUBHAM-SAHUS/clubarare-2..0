import { useQuery } from 'wagmi'

import { ActivityService } from 'api-services'
import { QUERIES } from 'utils'

export const useSingleActivity = (productId: string) => {
  const { isLoading: isLoadingActivity, data: activity } = useQuery(
    [QUERIES.PUBLIC.GET_SINGLE_HISTORY_NFT, productId],
    () =>
      ActivityService.getActivity({
        collectible_id: productId,
      }),
    { enabled: !!productId, select: res => res.data }
  )

  return {
    isLoadingActivity,
    activity,
  }
}
