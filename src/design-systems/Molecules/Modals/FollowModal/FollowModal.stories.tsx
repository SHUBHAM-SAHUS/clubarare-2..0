import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { FollowModalButtons } from './FollowModalButtons'
import { SelectedFollowModalState } from './SelectedFollowModalState'

import { FollowModal as Content } from './index'

import { Modal } from 'design-systems/Atoms/Modal'
import { Button } from 'design-systems/Atoms/Button'
import { useModal } from 'design-systems/Atoms/Modal'
import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Molecules/Modals/FollowModal',
})

const Template: ComponentStory<typeof Modal> = () => {
  const [selectedState, setSelectedState] = useState<SelectedFollowModalState>()

  const handleStateChange = (state: SelectedFollowModalState) => {
    setSelectedState(state)
  }

  const { Modal: FollowModal, open } = useModal(
    <Content followers={dumpFollowers} following={dumpFollowing} selectState={selectedState} />,
    undefined,
    <FollowModalButtons onStateChange={handleStateChange} />
  )

  return (
    <div className="h-screen w-screen">
      <Button onClick={open}>Open Modal</Button>
      <FollowModal />
    </div>
  )
}

export const Blank = Template.bind({})
Blank.args = {}

export const dumpFollowers = [
  {
    _id: '6409c0516cf1348d8daa6053',
    walletAddress: '0x4217fdf48b24a69ec74973b4189b43d7591cf88f',
    image: 'https://d1gqvtt7oelrdv.cloudfront.net/profile/1679474517394_thumbnail_1679474517387_anonymous_1068x709.jpg',
    name: 'jitesh bro',
    isFollow: false,
    followerId: '',
  },
  {
    _id: '624ff5ee0b80da74c4b79322',
    walletAddress: '0xcab2a4a13434d9d67c5c8dfc2e53c94d05e92aaa',
    image: 'https://d1gqvtt7oelrdv.cloudfront.net/profile/1679474517394_thumbnail_1679474517387_anonymous_1068x709.jpg',
    isFollow: false,
    followerId: '',
  },
]

export const dumpFollowing = [
  {
    _id: '6409c0516cf1348d8daa6053',
    walletAddress: '0x4217fdf48b24a69ec74973b4189b43d7591cf89f',
    image: 'https://d1gqvtt7oelrdv.cloudfront.net/assets/avatar/avatar1.png',
    name: 'jitesh bro',
    isFollow: true,
    followerId: '',
  },
  {
    _id: '624ff5ee0b80da74c4b79322',
    walletAddress: '0xcab2a4a13434d9d67c5c8dfc2e53c94d05e92aab',
    image:
      'https://d1gqvtt7oelrdv.cloudfront.net/profile/1672924567009_thumbnail_624ff5ee0b80da74c4b79322_preview_1672924566970.jpg',

    isFollow: true,
    followerId: '',
  },
]
