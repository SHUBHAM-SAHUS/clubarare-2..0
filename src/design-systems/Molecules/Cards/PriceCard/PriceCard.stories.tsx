import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PriceCard } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof PriceCard>>()({
  title: 'Molecules/Cards/PriceCard',
  component: PriceCard,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    label: {
      control: 'text',
      defaultValue: 'Current Bid',
    },
    price: {
      control: 'text',
      defaultValue: '0.05333',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
  },
})

const Template: ComponentStory<typeof PriceCard> = props => <PriceCard {...props} />

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}
