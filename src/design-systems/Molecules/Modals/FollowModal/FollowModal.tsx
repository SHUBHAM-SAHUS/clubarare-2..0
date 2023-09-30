import { useEffect, useState } from 'react'

import { SelectedFollowModalState } from './SelectedFollowModalState'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { useConnector } from 'context'
import { PAGE_ROUTES, shortWalletAddress } from 'utils'
import { useFollowers } from 'hooks/api/useFollowers'
import { useGlobalState } from 'hooks/store/useGlobalState'

interface FollowerData {
  _id: string
  walletAddress: string
  image: string
  isFollow: boolean
  followerId: string
  name?: string
}

interface FollowModalProps {
  followers?: FollowerData[]
  following?: FollowerData[]
  selectState?: SelectedFollowModalState
  refetchFollowers?: Function
}

export const FollowModal: React.FC<FollowModalProps> = ({ followers, following, selectState, refetchFollowers }) => {
  const [displayList, setDisplayList] = useState<FollowerData[]>([])
  const [tab, setSelectedTab] = useState<string>(selectState || 'following')

  useEffect(() => {
    if (selectState === SelectedFollowModalState.Followings) {
      setDisplayList(following || [])
    } else {
      setDisplayList(followers || [])
    }
  }, [followers, following, selectState])

  return (
    <div className="flex h-[400px] flex-col overflow-auto md:w-[500px]">
      <div className="flex flex-col gap-2 px-4 py-4">
        {displayList.map((followItem, index) => {
          return <FollowUser key={followItem._id} refetchFollowers={refetchFollowers} user={followItem} />
        })}
      </div>
      <div className="flex h-full flex-col items-center justify-center pb-20">
        {displayList.length === 0 && selectState === SelectedFollowModalState.Followings && (
          <Typography className="text-center">You are not following any profiles</Typography>
        )}
        {displayList.length === 0 && selectState === SelectedFollowModalState.Followers && (
          <Typography className="text-center">No followers yet</Typography>
        )}
      </div>
    </div>
  )
}

interface FollowUserProps {
  user: FollowerData
  userProfile?: ProfileObject
  refetchFollowers?: Function
}

export const FollowUser: React.FC<FollowUserProps> = ({ user, refetchFollowers }) => {
  const { isSigned } = useConnector()
  const { authUser: activatingUser } = useGlobalState()
  const { isFollow, followUserAsync, unFollowUserAsync } = useFollowers(user?.followerId)
  const [isFollowUser, setFollowUser] = useState<boolean>(isFollow || false)

  useEffect(() => {
    setFollowUser(isFollow || false)
  }, [isFollow])

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex cursor-pointer items-center justify-center gap-1"
        onClick={() => {
          window.open(`${PAGE_ROUTES.profile(user?.walletAddress)}`)
        }}
      >
        <Avatar className="mr-1" size="small" src={user?.image} />
        <span className="m-0">{user.name || shortWalletAddress(user.walletAddress)}</span>
      </div>

      <div className="">
        {activatingUser?.id !== user.followerId && isSigned && (
          <Button
            className=""
            color="primary"
            size="small"
            variant={isFollowUser ? 'solid' : 'outlined'}
            onClick={async () => {
              if (isFollowUser) {
                setFollowUser(!isFollowUser)
                await unFollowUserAsync({ user_id: user?.followerId })
                await refetchFollowers?.()
              } else {
                setFollowUser(!isFollowUser)
                await followUserAsync({ user_id: user?.followerId })
                await refetchFollowers?.()
              }
            }}
          >
            {isFollowUser ? 'Following' : 'Follow'}
          </Button>
        )}
      </div>
    </div>
  )
}
