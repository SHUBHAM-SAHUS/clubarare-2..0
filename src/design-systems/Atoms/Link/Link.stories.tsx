import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Link } from './'

import { is } from 'utils'

export default is<ComponentMeta<typeof Link>>()({
  title: 'Atoms/Link',
  component: Link,
  argTypes: {
    href: {
      control: 'text',
      defaultValue: '/home',
    },
    className: {
      table: {
        disabled: true,
      },
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof Link> = props => <Link {...props}>MENULINK</Link>

export const LinkWithText = Template.bind({})
LinkWithText.args = {}

export const DisabledLink = Template.bind({})
DisabledLink.args = {
  disabled: true,
}
