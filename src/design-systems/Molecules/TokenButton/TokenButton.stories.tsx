import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TokenButton } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof TokenButton>>()({
  title: 'Molecules/TokenButton',
  component: TokenButton,
  argTypes: {
    isActive: {
      control: 'boolean',
    },
    token: {
      control: 'select',
      options: ['AGOV', 'MPWR'],
      defaultValue: 'AGOV',
    },
  },
})

const Template: ComponentStory<typeof TokenButton> = props => <TokenButton {...props} />

export const AGOVTokenButton = Template.bind({})
AGOVTokenButton.args = {
  token: 'AGOV',
}

export const MPWRTokenButton = Template.bind({})
MPWRTokenButton.args = {
  token: 'MPWR',
}
