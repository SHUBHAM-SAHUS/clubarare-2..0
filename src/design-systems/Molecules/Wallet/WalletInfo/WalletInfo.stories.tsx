import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletInfo as WalletInfoComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof WalletInfoComponent>>()({
  title: 'Molecules/Wallet/WalletInfo',
  component: WalletInfoComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    wallet: {
      control: 'text',
      options: ['METAMASK', 'KAIKAS'],
      defaultValue: 'METAMASK',
    },
    walletAddress: {
      control: 'text',
    },
    chain: {
      control: 'text',
      options: ['ETHEREUM', 'KLAYTN'],
      defaultValue: 'ETHEREUM',
    },
  },
})

const Template: ComponentStory<typeof WalletInfoComponent> = props => <WalletInfoComponent {...props} />

export const MetamaskWalletInfo = Template.bind({})
MetamaskWalletInfo.args = {
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
  chain: 'ETHEREUM',
}

export const KaikasWalletInfo = Template.bind({})
KaikasWalletInfo.args = {
  wallet: 'KAIKAS',
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
  chain: 'KLAYTN',
}
