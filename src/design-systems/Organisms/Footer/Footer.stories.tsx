import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Footer as FooterComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof FooterComponent>>()({
  title: 'Organisms/Footer',
  component: FooterComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof FooterComponent> = props => <FooterComponent {...props}></FooterComponent>

export const Footer = Template.bind({})
Footer.args = {}
