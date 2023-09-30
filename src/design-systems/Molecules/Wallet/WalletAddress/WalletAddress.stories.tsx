import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletAddress } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof WalletAddress>>()({
  title: 'Molecules/Wallet/WalletAddress',
  component: WalletAddress,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    walletAddress: {
      control: 'text',
    },
  },
})

const Template: ComponentStory<typeof WalletAddress> = props => <WalletAddress {...props} />

export const Default = Template.bind({})
Default.args = {
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
}
