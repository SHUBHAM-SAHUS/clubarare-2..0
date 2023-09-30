import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { ProfileService } from 'api-services'
import { QUERIES, compareStringsInsentively } from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'

export const useProfile = (address: string) => {
  const { authUser: currentUser, updateAuthUser: updateActivatingUser } = useGlobalState()

  const isGuest = useMemo(
    () => !compareStringsInsentively(String(currentUser?.walletAddress), address),
    [currentUser?.walletAddress, address]
  )

  const {
    isLoading: isLoadingUserProfile,
    data: userProfile,
    refetch: refetchUserProfile,
  } = useQuery(
    [QUERIES.PRIVATE.GET_USER_PROFILE, address],
    () =>
      ProfileService.getUserProfile({
        user_address: address,
      }),
    {
      enabled: !!address,
      select: res => res.data,
      // eslint-disable-next-line sort-keys
      onSuccess: data => {
        if (isGuest) return

        updateActivatingUser({
          bio: data.bio,
          customUrl: data.customUrl,
          email: data?.email,
          image: data.image,
          name: data?.name,
          originalImage: data.originalImage,
        })
      },
    }
  )

  const { data: userAuthenticationCredit, refetch: refetchUserAuthenticationCredit } = useQuery(
    [QUERIES.PRIVATE.GET_USER_AUTHENTICATION_CREDIT],
    () => ProfileService.getAuthenticationCredit(),
    {
      enabled: !!currentUser?.walletAddress,
      select: res => res.data,
    }
  )

  return useMemo(
    () => ({
      isLoadingUserProfile,
      refetchUserAuthenticationCredit,
      refetchUserProfile,
      userAuthenticationCredit,
      userProfile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoadingUserProfile, userProfile]
  )
}
