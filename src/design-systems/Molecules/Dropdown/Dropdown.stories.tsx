import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Dropdown } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Dropdown>>()({
  title: 'Molecules/Dropdown',
  component: Dropdown,
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right'],
      defaultValue: 'right',
    },
  },
})

const Template: ComponentStory<typeof Dropdown> = props => <Dropdown {...props} />

const options = [
  {
    title: 'Dropdown Item 1',
    value: 'Dropdown Item 1',
  },
  {
    title: 'Dropdown Item 2',
    value: 'Dropdown Item 2',
  },
  {
    title: 'Dropdown Item 3',
    value: 'Dropdown Item 3',
  },
  {
    title: 'Dropdown Item 4',
    value: 'Dropdown Item 4',
  },
]

export const LeftDropDown = Template.bind({})
LeftDropDown.args = {
  options: options,
  placeholder: 'ButtonIcon',
  direction: 'left',
}

export const RightDropDown = Template.bind({})
RightDropDown.args = {
  options: options,
  placeholder: 'ButtonIcon',
  direction: 'right',
}
