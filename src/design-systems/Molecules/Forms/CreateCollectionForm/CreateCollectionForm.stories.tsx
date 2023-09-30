import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreateCollectionForm as CreateNFTFormComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof CreateNFTFormComponent>>()({
  title: 'Molecules/Forms/CreateCollectionForm',
  component: CreateNFTFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof CreateNFTFormComponent> = props => (
  <div className="w-[440px]">
    <CreateNFTFormComponent {...props}></CreateNFTFormComponent>
  </div>
)

export const CreateCollectionForm = Template.bind({})
CreateCollectionForm.args = {}
