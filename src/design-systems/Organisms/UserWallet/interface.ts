import type { PropsWithChildren } from 'react'

export interface currencyOptionProps {
  rate: number
  tokenAmount: number
  token: string
  USDAmount: number
}

export interface UserWalletProps extends PropsWithChildren {
  isLoading?: boolean
  className?: string
  wallet?: WalletTypes
  walletAddress: string | undefined
  chain: 'Ethereum' | 'Klaytn'
  currencyOptions: currencyOptionProps[]
  onDisconnect: () => void
  onWithdraw: (token: string) => void
}
