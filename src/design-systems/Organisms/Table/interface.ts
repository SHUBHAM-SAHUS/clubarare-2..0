import type { PropsWithChildren } from 'react'

export interface TableRow {
  type: string
  token?: string
  amount?: number
  from: string
  to: string
  time: string
  seller: string
  erc20Address: string
  bidder: string
  buyer: string
}
export interface TableProps extends PropsWithChildren {
  className?: string
  headers: string[]
  rowData: TableRow[]
  networkId?: ClubRareNetworks
}
