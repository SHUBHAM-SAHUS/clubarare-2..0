import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PhygitalNFTImageForm as PhygitalNFTImageFormComponent } from './PhygitalNFTImageForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof PhygitalNFTImageFormComponent>>()({
  title: 'Molecules/Forms/PhygitalNFTImageForm',
  component: PhygitalNFTImageFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof PhygitalNFTImageFormComponent> = props => (
  <div className="md:w-[568px]">
    <PhygitalNFTImageFormComponent {...props}></PhygitalNFTImageFormComponent>
  </div>
)

export const PhygitalNFTImageForm = Template.bind({})
PhygitalNFTImageForm.args = {}
