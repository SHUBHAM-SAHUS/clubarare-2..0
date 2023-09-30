import { ComponentMeta, ComponentStory } from '@storybook/react'
import type { ComponentType } from 'react'

import { InstagramIcon } from '../Icons'

import { IconButton } from './IconButton'

import { is } from 'utils'

export default is<ComponentMeta<typeof IconButton>>()({
  title: 'Atoms/IconButton',
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    variant: {
      controls: 'select',
      options: ['black', 'gray', 'transparent'],
      defaultValue: 'black',
    },
  },
})

const Template: ComponentStory<typeof IconButton> = props => <IconButton {...props} />

export const BlackIconButton = Template.bind({})
BlackIconButton.args = {
  variant: 'black',
  children: <InstagramIcon className="h-8 w-8 stroke-neutral-800" />,
}

export const GrayIconButton = Template.bind({})
GrayIconButton.args = {
  variant: 'gray',
  className: 'group',
  children: <InstagramIcon className="h-8 w-8 stroke-neutral-800 group-active:stroke-neutral-100" />,
}

export const TransparentIconButton = Template.bind({})
TransparentIconButton.args = {
  variant: 'transparent',
  children: <InstagramIcon className="h-8 w-8 stroke-neutral-100 dark:stroke-neutral-800" />,
}
