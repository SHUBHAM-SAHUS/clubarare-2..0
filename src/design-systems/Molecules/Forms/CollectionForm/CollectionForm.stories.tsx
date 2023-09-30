import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CollectionForm as CollectionFormComponent } from './CollectionForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof CollectionFormComponent>>()({
  title: 'Molecules/Forms/CollectionForm',
  component: CollectionFormComponent,
  argTypes: {},
})

const MOCK_COLLECTION = {
  displayName: 'My Collection',
  customUrl: 'my-collection',
  description: 'This is my collection',
} as CollectionAssetObject

const Template: ComponentStory<typeof CollectionFormComponent> = props => (
  <div className="w-[375px]">
    <CollectionFormComponent collection={MOCK_COLLECTION} />
  </div>
)

export const CollectionForm = Template.bind({})
CollectionForm.args = {}
