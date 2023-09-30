import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Filter as FilterComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof FilterComponent>>()({
  title: 'Organisms/Filter',
  component: FilterComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof FilterComponent> = props => <FilterComponent {...props}></FilterComponent>

export const Filter = Template.bind({})
Filter.args = {}
