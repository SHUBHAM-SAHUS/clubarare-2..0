import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useCallback } from 'react'

import { BidModal as Content } from './BidModal'
import { mockItem } from './utils'

import { Modal } from 'design-systems/Atoms/Modal'
import { Button } from 'design-systems/Atoms/Button'
import { useModal } from 'design-systems/Atoms/Modal'
import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Molecules/Modals/BidModal',
})

const Template: ComponentStory<typeof Modal> = props => {
  const onCloseModal = useCallback(() => {
    closeModal()
  }, [])

  const {
    Modal: BidModal,
    open,
    close: closeModal,
  } = useModal(<Content asset={mockItem} onClose={onCloseModal} />, 'Place Bid')

  return (
    <div className="h-screen w-screen">
      <Button onClick={open}>Open Dialog</Button>
      <BidModal />
    </div>
  )
}

export const Blank = Template.bind({})
Blank.args = {}
