import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NotFound } from './NotFound'

import { hideControl, is } from 'utils'

export default is<ComponentMeta<typeof NotFound>>()({
  title: 'Molecules/NotFound',
  component: NotFound,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'BUYER GUIDE',
    },
    href: {
      control: 'text',
      defaultValue: 'https://google.com',
    },
    className: hideControl,
    buttonLabel: hideControl,
    buttonVariant: hideControl,
    buttonColor: hideControl,
    buttonAction: hideControl,
  },
})

const Template: ComponentStory<typeof NotFound> = props => {
  return (
    <NotFound
      {...props}
      buttonAction={() => {}}
      buttonColor="primary"
      buttonLabel="View All"
      buttonVariant="outlined"
    />
  )
}

export const DefaultNotFound = Template.bind({})
DefaultNotFound.args = {}
