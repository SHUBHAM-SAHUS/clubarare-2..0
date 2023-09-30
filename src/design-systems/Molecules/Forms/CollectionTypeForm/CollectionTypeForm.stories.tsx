import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CollectionTypeForm as CollectionTypeFormComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof CollectionTypeFormComponent>>()({
  title: 'Molecules/Forms/CollectionTypeForm',
  component: CollectionTypeFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof CollectionTypeFormComponent> = props => (
  <div className="w-[440px]">
    <CollectionTypeFormComponent {...props}></CollectionTypeFormComponent>
  </div>
)

export const CollectionTypeForm = Template.bind({})
CollectionTypeForm.args = {}
