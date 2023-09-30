import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeButton } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ThemeButton>>()({
  title: 'Molecules/Buttons/ThemeButton',
  component: ThemeButton,
  argTypes: {},
})

const Template: ComponentStory<typeof ThemeButton> = props => <ThemeButton {...props} />

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  isDark: true,
}

export const LightTheme = Template.bind({})
LightTheme.args = {
  isDark: false,
}
