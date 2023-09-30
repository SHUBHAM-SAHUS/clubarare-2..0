import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AttributeCollectionForm as AttributeCollectionFormComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof AttributeCollectionFormComponent>>()({
  title: 'Molecules/Forms/AttributeCollectionForm',
  component: AttributeCollectionFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof AttributeCollectionFormComponent> = props => (
  <div className="w-[440px]">
    <AttributeCollectionFormComponent {...props}></AttributeCollectionFormComponent>
  </div>
)

export const AttributeCollectionForm = Template.bind({})
AttributeCollectionForm.args = {}
