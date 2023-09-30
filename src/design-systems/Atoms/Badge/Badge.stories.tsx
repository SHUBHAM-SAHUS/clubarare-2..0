import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Badge } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Badge>>()({
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    showBadgeIcon: {
      control: 'boolean',
      defaultValue: false,
    },
    variant: {
      control: 'select',
      options: ['sale-type', 'phygital', 'digital', 'authenticated'],
      defaultValue: 'authenticated',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
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
  },
})

const Template: ComponentStory<typeof Badge> = props => (
  <Badge {...props}>
    {props?.variant === 'phygital'
      ? 'Phygital NFT'
      : props?.variant === 'digital'
      ? 'Digital NFT'
      : props?.variant === 'authenticated'
      ? 'Authenticated'
      : 'Badge Name'}
  </Badge>
)

export const BadgeLabel = Template.bind({})
BadgeLabel.args = {
  variant: 'sale-type',
}
