import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Button>>()({
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outlined'],
      defaultValue: 'solid',
    },
    color: {
      control: 'select',
      options: ['neon', 'primary'],
      defaultValue: 'neon',
    },
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof Button> = props => <Button {...props}>Click Me</Button>

export const NeonSolidButton = Template.bind({})
NeonSolidButton.args = {
  color: 'neon',
  variant: 'solid',
}

export const SmallButton = Template.bind({})
SmallButton.args = {
  color: 'neon',
  variant: 'solid',
  size: 'small',
}

export const MediumButton = Template.bind({})
MediumButton.args = {
  color: 'neon',
  variant: 'solid',
  size: 'medium',
}

export const LargeButton = Template.bind({})
LargeButton.args = {
  color: 'neon',
  variant: 'solid',
  size: 'large',
}

export const OutlinedButton = Template.bind({})
OutlinedButton.args = {
  color: 'neon',
  variant: 'outlined',
  size: 'large',
}

export const FullWidthButton = Template.bind({})
FullWidthButton.args = {
  color: 'primary',
  variant: 'solid',
  size: 'large',
  fullWidth: true,
}

export const DisabledButton = Template.bind({})
DisabledButton.args = {
  color: 'neon',
  variant: 'solid',
  disabled: true,
}
