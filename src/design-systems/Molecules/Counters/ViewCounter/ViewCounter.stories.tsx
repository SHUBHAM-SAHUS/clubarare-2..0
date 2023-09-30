import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ViewCounter as ViewCounterComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ViewCounterComponent>>()({
  title: 'Molecules/Counters/ViewCounter',
  component: ViewCounterComponent,
  argTypes: {
    count: {
      control: 'number',
      defaultValue: 7935,
    },
    className: {
      table: {
        disabled: true,
      },
    },
    icon: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof ViewCounterComponent> = props => <ViewCounterComponent {...props} />

export const ViewCounter = Template.bind({})
ViewCounter.args = {}
