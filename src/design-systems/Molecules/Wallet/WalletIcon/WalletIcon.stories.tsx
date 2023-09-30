import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletIcon as WalletIconComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof WalletIconComponent>>()({
  title: 'Molecules/Wallet/WalletIcon',
  component: WalletIconComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    withLabel: {
      control: 'boolean',
      defaultValue: false,
    },
    wallet: {
      control: 'text',
      options: ['METAMASK', 'KAIKAS'],
      defaultValue: 'METAMASK',
    },
  },
})

const Template: ComponentStory<typeof WalletIconComponent> = props => <WalletIconComponent {...props} />

export const MetamaskIcon = Template.bind({})
MetamaskIcon.args = {}

export const KaikasIcon = Template.bind({})
KaikasIcon.args = {
  wallet: 'KAIKAS',
}

export const MetamaskIconWithLabel = Template.bind({})
MetamaskIconWithLabel.args = {
  withLabel: true,
}

export const KaikasIconWithLabel = Template.bind({})
KaikasIconWithLabel.args = {
  wallet: 'KAIKAS',
  withLabel: true,
}
