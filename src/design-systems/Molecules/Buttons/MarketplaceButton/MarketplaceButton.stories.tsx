import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MarketplaceButton } from '.'

import { hideControl, is } from 'utils'

export default is<ComponentMeta<typeof MarketplaceButton>>()({
  title: 'Molecules/Buttons/MarketplaceButton',
  component: MarketplaceButton,
  argTypes: {
    isListed: {
      control: 'boolean',
      defaultValue: false,
    },
    isOwner: {
      control: 'boolean',
      defaultValue: false,
    },
    onClick: hideControl,
  },
})

const Template: ComponentStory<typeof MarketplaceButton> = props => <MarketplaceButton {...props} />

export const BidButton = Template.bind({})
BidButton.args = {
  isListed: true,
  isOwner: false,
}

export const ListButton = Template.bind({})
ListButton.args = {
  isListed: false,
  isOwner: true,
}

export const UnListButton = Template.bind({})
UnListButton.args = {
  isListed: true,
  isOwner: true,
}
