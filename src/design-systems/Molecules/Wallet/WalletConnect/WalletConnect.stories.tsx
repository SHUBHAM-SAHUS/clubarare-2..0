import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletConnect } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof WalletConnect>>()({
  title: 'Molecules/Wallet/WalletConnect',
  component: WalletConnect,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    wallet: {
      control: 'select',
      options: ['METAMASK', 'KAIKAS'],
      defaultValue: 'METAMASK',
    },
  },
})

const Template: ComponentStory<typeof WalletConnect> = props => <WalletConnect {...props} />

export const WalletConnectIcon = Template.bind({})
