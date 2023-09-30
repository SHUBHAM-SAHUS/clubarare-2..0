import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddImage } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof AddImage>>()({
  title: 'Molecules/Buttons/AddImage',
  component: AddImage,
  argTypes: {
    width: {
      control: 'number',
      defaultValue: 120,
    },
    height: {
      control: 'number',
      defaultValue: 120,
    },
  },
})

const Template: ComponentStory<typeof AddImage> = props => <AddImage {...props} />

export const DefaultAddImage = Template.bind({})
DefaultAddImage.args = {}
