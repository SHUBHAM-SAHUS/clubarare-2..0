import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UserWallet as UserWalletComponent } from '.'

import { is } from 'utils'
export default is<ComponentMeta<typeof UserWalletComponent>>()({
  title: 'Organisms/UserWallet',
  component: UserWalletComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof UserWalletComponent> = props => (
  <UserWalletComponent {...props}></UserWalletComponent>
)

export const UserWallet = Template.bind({})
UserWallet.args = {
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
  chain: 'Ethereum',
  currencyOptions: [
    { rate: 1, tokenAmount: 0.253, token: 'ETH', USDAmount: 120.02 },
    { rate: 1, tokenAmount: 0.452, token: 'MPWR', USDAmount: 452.02 },
    { rate: 1, tokenAmount: 0.253, token: 'AGOV', USDAmount: 41.02 },
    { rate: 1, tokenAmount: 20.02, token: 'USDT', USDAmount: 20.02 },
    { rate: 1, tokenAmount: 1.02, token: 'wETH', USDAmount: 1202.02 },
  ],
}

export const UserKaikasWallet = Template.bind({})
UserKaikasWallet.args = {
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3123a',
  chain: 'Klaytn',
  wallet: 'KAIKAS',
  currencyOptions: [
    { rate: 1, tokenAmount: 0.253, token: 'KLAY', USDAmount: 120.02 },
    { rate: 1, tokenAmount: 0.253, token: 'AGOV', USDAmount: 41.02 },
    { rate: 1, tokenAmount: 20.02, token: 'USDT', USDAmount: 20.02 },
  ],
}
