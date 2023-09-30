import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FollowCounter as FollowCounterComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof FollowCounterComponent>>()({
  title: 'Molecules/Counters/FollowCounter',
  component: FollowCounterComponent,
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
  },
})

const Template: ComponentStory<typeof FollowCounterComponent> = props => <FollowCounterComponent {...props} />

export const FollowingCounter = Template.bind({})
FollowingCounter.args = {
  count: 100,
  label: 'Following',
}

export const FollowerCounter = Template.bind({})
FollowerCounter.args = {
  count: 10,
  label: 'Followers',
}
