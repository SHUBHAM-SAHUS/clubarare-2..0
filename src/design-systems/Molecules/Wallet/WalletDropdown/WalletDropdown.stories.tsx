import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletDropdown as WalletDropdownComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof WalletDropdownComponent>>()({
  title: 'Molecules/Wallet/WalletDropdown',
  component: WalletDropdownComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof WalletDropdownComponent> = props => <WalletDropdownComponent {...props} />

const metaMaskOptions = [
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b', chain: 'ETHEREUM', wallet: 'METAMASK' },
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532c', chain: 'ETHEREUM', wallet: 'METAMASK' },
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532d', chain: 'ETHEREUM', wallet: 'METAMASK' },
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532e', chain: 'ETHEREUM', wallet: 'METAMASK' },
]
const kaikasOptions = [
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3123a', chain: 'KLAYTN', wallet: 'KAIKAS' },
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3123c', chain: 'KLAYTN', wallet: 'KAIKAS' },
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3123d', chain: 'KLAYTN', wallet: 'KAIKAS' },
  { walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3123e', chain: 'KLAYTN', wallet: 'KAIKAS' },
]
export const DefaultMetamaskWalletDropdown = Template.bind({})
DefaultMetamaskWalletDropdown.args = {
  options: metaMaskOptions,
  value: '',
  placeholder: 'Select Wallet',
}

export const SelectedMetamaskWalletDropdown = Template.bind({})
SelectedMetamaskWalletDropdown.args = {
  options: metaMaskOptions,
  value: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
  placeholder: 'Select Wallet',
}
export const DefaultKaikasWalletDropdown = Template.bind({})
DefaultKaikasWalletDropdown.args = {
  options: kaikasOptions,
  value: '',
  placeholder: 'Select Wallet',
}

export const SelectedKaikasWalletDropdown = Template.bind({})
SelectedKaikasWalletDropdown.args = {
  options: kaikasOptions,
  value: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3123c',
  placeholder: 'Select Wallet',
}
