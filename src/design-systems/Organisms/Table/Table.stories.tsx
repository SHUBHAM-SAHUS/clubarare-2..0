import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Table as TableComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof TableComponent>>()({
  title: 'Organisms/Table',
  component: TableComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof TableComponent> = props => <TableComponent {...props}></TableComponent>

export const Table = Template.bind({})
Table.args = {
  headers: ['EVENT', 'PRICE', 'FROM', 'TO', 'TIME'],
  rowData: [
    {
      type: 'Sale',
      amount: 0.05333,
      token: 'ETH',
      from: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      to: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      time: '48 mins ago',
      seller: 'string',
      erc20Address: 'string',
      bidder: 'string',
      buyer: 'string',
    },
    {
      type: 'Listing',
      amount: 0.05333,
      token: 'ETH',
      from: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      to: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      time: '48 mins ago',
      seller: 'string',
      erc20Address: 'string',
      bidder: 'string',
      buyer: 'string',
    },
    {
      type: 'Transfer',
      from: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      to: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      time: '48 mins ago',
      seller: 'string',
      erc20Address: 'string',
      bidder: 'string',
      buyer: 'string',
    },
    {
      type: 'Offer',
      amount: 0.05333,
      token: 'ETH',
      from: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      to: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      time: '48 mins ago',
      seller: 'string',
      erc20Address: 'string',
      bidder: 'string',
      buyer: 'string',
    },
    {
      type: 'Bid',
      amount: 0.05333,
      token: 'ETH',
      from: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      to: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      time: '48 mins ago',
      seller: 'string',
      erc20Address: 'string',
      bidder: 'string',
      buyer: 'string',
    },
    {
      type: 'Transfer',
      from: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      to: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
      time: '48 mins ago',
      seller: 'string',
      erc20Address: 'string',
      bidder: 'string',
      buyer: 'string',
    },
  ],
}
