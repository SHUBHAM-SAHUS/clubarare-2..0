import { useMemo, useState, useEffect } from 'react'
import { useQuery, useMutation } from 'wagmi'

import { FollowerService } from 'api-services'
import { QUERIES } from 'utils'

export const useFollowers = (userId?: string) => {
  const [followers, setFollowers] = useState<FollowObject>()
  const [isFollow, setFollow] = useState<boolean>()

  useEffect(() => {
    if (userId) {
      try {
        FollowerService.getFollower({ user_id: userId, page_number: 1, page_size: 10 }).then(res =>
          setFollowers(res?.data)
        )
        FollowerService.checkFollow({
          userId: userId,
        }).then(res => setFollow(res?.data?.isFollow))
      } catch (err) {
        console.error(err)
      }
    }
  }, [userId])

  const refetchFollowers = async () => {
    try {
      FollowerService.getFollower({ user_id: userId, page_number: 1, page_size: 10 }).then(res =>
        setFollowers(res?.data)
      )
    } catch (error) {
      console.error(error)
    }
  }

  const refetchIsFollow = async () => {
    try {
      FollowerService.checkFollow({
        userId: userId,
      }).then(res => setFollow(res?.data?.isFollow))
    } catch (error) {
      console.error(error)
    }
  }

  // TODO: this should be updated in the future with clear cache
  // const {
  //   isLoading: isLoadingFollowers,
  //   data: followers,
  //   refetch: refetchFollowers,
  // } = useQuery(
  //   [QUERIES.PRIVATE.GET_FOLLOWER],
  //   () =>
  //     FollowerService.getFollower({
  //       user_id: userId,
  //       page_number: 1,
  //       page_size: 10,
  //     }),
  //   {
  //     select: res => res.data,
  //   }
  // )

  // TODO: this should be updated in the future with clear cache
  // const {
  //   isLoading: isLoadingFollow,
  //   data: isFollow,
  //   refetch: refetchIsFollow,
  // } = useQuery(
  //   [QUERIES.PRIVATE.POST_CHECK_FOLLOW],
  //   () =>
  //     FollowerService.checkFollow({
  //       userId: userId,
  //     }),
  //   {
  //     select: res => res.data.isFollow,
  //   }
  // )

  const { mutate: followUser, mutateAsync: followUserAsync } = useMutation((data: FollowBody) =>
    FollowerService.followUser(data)
  )

  const { mutate: unFollowUser, mutateAsync: unFollowUserAsync } = useMutation((data: FollowBody) =>
    FollowerService.unFollowUser(data)
  )

  return useMemo(
    () => ({
      followers,
      isFollow,
      followUser,
      unFollowUser,
      followUserAsync,
      unFollowUserAsync,
      refetchFollowers,
      refetchIsFollow,
    }),
    [
      followers,
      isFollow,
      followUser,
      unFollowUser,
      followUserAsync,
      unFollowUserAsync,
      refetchFollowers,
      refetchIsFollow,
    ]
  )
}
