import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MOCK_BUTTONS } from './utils'

import { ButtonGroup } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ButtonGroup>>()({
  title: 'Molecules/ButtonGroups/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultVaule: 'small',
    },
    className: {
      table: {
        disabled: true,
      },
    },
    buttons: {
      table: {
        disabled: true,
      },
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof ButtonGroup> = props => (
  <ButtonGroup {...props} buttons={MOCK_BUTTONS}>
    Click Me
  </ButtonGroup>
)

export const PrimaryButtonGroup = Template.bind({})
PrimaryButtonGroup.args = {
  variant: 'primary',
}

export const SecondaryButtonGroup = Template.bind({})
SecondaryButtonGroup.args = {
  variant: 'secondary',
}
