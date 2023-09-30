import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DigitalNFTImageForm as DigitalNFTImageFormComponent } from './DigitalNFTImageForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof DigitalNFTImageFormComponent>>()({
  title: 'Molecules/Forms/DigitalNFTImageForm',
  component: DigitalNFTImageFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof DigitalNFTImageFormComponent> = props => (
  <div className="md:w-[440px]">
    <DigitalNFTImageFormComponent {...props}></DigitalNFTImageFormComponent>
  </div>
)

export const DigitalNFTImageForm = Template.bind({})
DigitalNFTImageForm.args = {}
