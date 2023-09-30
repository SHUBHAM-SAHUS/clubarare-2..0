import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Checkbox } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Checkbox>>()({
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'checkbox',
    },
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    value: {
      table: {
        disabled: true,
      },
    },
    label: {
      control: 'text',
      defaultValue: 'Label Here',
    },
  },
})

const Template: ComponentStory<typeof Checkbox> = props => <Checkbox {...props} />

export const Normal = Template.bind({})
Normal.args = {}
