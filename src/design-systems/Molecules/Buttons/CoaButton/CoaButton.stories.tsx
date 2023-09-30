import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CoaButton } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof CoaButton>>()({
  title: 'Molecules/Buttons/CoaButton',
  component: CoaButton,
  argTypes: {},
})

const Template: ComponentStory<typeof CoaButton> = props => <CoaButton {...props} />

export const coaButtons = Template.bind({})
coaButtons.args = {
  coaLink: 'https://app.clubrare.xyz',
}
