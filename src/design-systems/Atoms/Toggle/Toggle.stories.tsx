import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Toggle } from './'

import { is } from 'utils'

export default is<ComponentMeta<typeof Toggle>>()({
  title: 'Atoms/Toggle',
  component: Toggle,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: undefined,
    },
    className: {
      table: {
        disabled: true,
      },
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    defaultCheck: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof Toggle> = props => <Toggle {...props} />

export const DefaultToggle = Template.bind({})
DefaultToggle.args = {}

export const ToggleWithLabel = Template.bind({})
ToggleWithLabel.args = {
  label: 'LABEL',
}

export const DisabledToggle = Template.bind({})
DisabledToggle.args = {
  disabled: true,
}

export const DisabledToggleWithLabel = Template.bind({})
DisabledToggleWithLabel.args = {
  defaultCheck: true,
  disabled: true,
  label: 'LABEL',
}
