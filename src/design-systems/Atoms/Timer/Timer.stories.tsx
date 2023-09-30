import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Timer } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Timer>>()({
  title: 'Atoms/Timer',
  component: Timer,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    className: {
      table: {
        disabled: true,
      },
    },
    status: {
      control: 'select',
      options: ['in', 'ended', 'sold'],
      defaultValue: 'in',
    },
  },
})

const Template: ComponentStory<typeof Timer> = props => <Timer {...props} />

export const SmallTimer = Template.bind({})
SmallTimer.args = {
  size: 'small',
  endTime: new Date('2023/1/23'),
  status: 'in',
}

export const MediumTimer = Template.bind({})
MediumTimer.args = {
  size: 'medium',
  endTime: new Date('2023/1/23'),
  status: 'in',
}

export const LargeTimer = Template.bind({})
LargeTimer.args = {
  size: 'large',
  endTime: new Date('2023-01-19T06:44:00.000Z'),
  status: 'in',
}
