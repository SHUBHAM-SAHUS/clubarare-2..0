import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NavBar as NavBarComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof NavBarComponent>>()({
  title: 'Organisms/NavBar',
  component: NavBarComponent,
  argTypes: {
    mode: {
      control: 'select',
      options: ['Disconnected', 'Connected', 'Admin'],
      defaultVaule: 'Disconnected',
    },
    className: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof NavBarComponent> = props => <NavBarComponent {...props}></NavBarComponent>

export const NavBar = Template.bind({})
NavBar.args = {}
