import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ShareModal as Content } from './ShareModal'

import { Modal } from 'design-systems/Atoms/Modal'
import { Button } from 'design-systems/Atoms/Button'
import { useModal } from 'design-systems/Atoms/Modal'
import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Molecules/Modals/ShareModal',
})

const Template: ComponentStory<typeof Modal> = () => {
  const { Modal: ShareModal, open } = useModal(
    <Content
      text="Naeem Khan's Profile"
      url={
        'https://clubrare-marketplace-git-develop-clubrare.vercel.app/profile/0x3e217afd2116fc25bb3bd6595985bc3b39426ee5'
      }
    />
  )

  return (
    <div className="h-screen w-screen">
      <Button onClick={open}>Open Dialog</Button>
      <ShareModal />
    </div>
  )
}

export const Blank = Template.bind({})
Blank.args = {}
