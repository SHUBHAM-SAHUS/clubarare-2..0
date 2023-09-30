import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RangeBar as RangeBarComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof RangeBarComponent>>()({
  title: 'Molecules/RangeBar',
  component: RangeBarComponent,
  argTypes: {
    className: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof RangeBarComponent> = props => <RangeBarComponent {...props}></RangeBarComponent>

export const RangeBar = Template.bind({})
RangeBar.args = {}
