import { ComponentMeta, ComponentStory } from '@storybook/react'

import { QRCodeComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof QRCodeComponent>>()({
  title: 'Atoms/QRCode',
  component: QRCodeComponent,
  argTypes: {
    className: {
      control: 'text',
      defaultValue: '',
    },
    size: {
      control: 'number',
      defaultValue: 100,
    },
    value: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof QRCodeComponent> = props => <QRCodeComponent {...props} />

export const Default = Template.bind({})
Default.args = {
  value: 'https://classic.clubrare.xyz/item/6320a0433f80421bcb844e83',
}
