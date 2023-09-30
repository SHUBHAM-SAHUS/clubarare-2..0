import { useEffect, useState } from 'react'
import { useQuery } from 'wagmi'

import { SpaceService } from 'api-services'
import { QUERIES } from 'utils'

export const useGetSpaceAssets = (address: string) => {
  const [spaceData, setSpaceData] = useState<GetSpaceServicesObject>()
  // TODO: this should be updated in the future with clear cache
  // const { data: spaceData } = useQuery(
  //   [QUERIES.PRIVATE.GET_SPACE],
  //   () =>
  //     SpaceService.getSpace({
  //       wallet_address: address,
  //     }),
  //   { select: res => res.data, staleTime: 0 }
  // )
  useEffect(() => {
    try {
      SpaceService.getSpace({ wallet_address: address }).then(res => setSpaceData(res.data))
    } catch (err) {
      console.error(err)
    }
  }, [])

  return {
    spaceData,
  }
}
