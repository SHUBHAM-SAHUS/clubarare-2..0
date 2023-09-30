import { ComponentMeta, ComponentStory } from '@storybook/react'

import { mockCollectionItem } from './utils'

import { CollectionModel as Content } from '.'

import { Modal } from 'design-systems/Atoms/Modal'
import { Button } from 'design-systems/Atoms/Button'
import { useModal } from 'design-systems/Atoms/Modal'
import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Molecules/Modals/CollectionModal',
})

const Template: ComponentStory<typeof Modal> = props => {
  const { Modal: CollectionModal, open } = useModal(<Content {...mockCollectionItem} />, ' ')

  return (
    <div className="h-screen w-screen">
      <Button onClick={open}>Open Dialog</Button>
      <CollectionModal />
    </div>
  )
}

export const Blank = Template.bind({})
Blank.args = {}
