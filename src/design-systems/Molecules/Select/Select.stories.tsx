import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Select as SelectComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof SelectComponent>>()({
  title: 'Molecules/Select',
  component: SelectComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof SelectComponent> = props => <SelectComponent {...props}></SelectComponent>

export const Select = Template.bind({})
Select.args = {
  options: [],
}
