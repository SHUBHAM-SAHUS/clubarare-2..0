import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Typography } from '../Typography'

import { Card } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Card>>()({
  title: 'Atoms/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    rounded: {
      control: 'boolean',
      defaultValue: true,
    },
  },
})

const Template: ComponentStory<typeof Card> = props => (
  <Card {...props}>
    <Typography size="subtitle" variant="regular">
      ClubRare Marketplace Design system
    </Typography>
  </Card>
)

export const SmallCard = Template.bind({})
SmallCard.args = {
  variant: 'small',
}

export const MediumCard = Template.bind({})
MediumCard.args = {
  variant: 'medium',
}

export const UnroundedCard = Template.bind({})
UnroundedCard.args = {
  variant: 'large',
  rounded: false,
}
