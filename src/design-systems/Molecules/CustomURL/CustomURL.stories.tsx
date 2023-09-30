import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CustomURL } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof CustomURL>>()({
  title: 'Molecules/CustomURL',
  component: CustomURL,
  argTypes: {},
})

const Template: ComponentStory<typeof CustomURL> = () => <CustomURL url="naeemkhan" />

export const CustomURLDefault = Template.bind({})
CustomURLDefault.args = {}
