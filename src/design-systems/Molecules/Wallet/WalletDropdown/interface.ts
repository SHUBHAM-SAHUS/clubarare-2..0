import type { PropsWithChildren } from 'react'

export interface WalletDropdownOptionsProps {
  walletAddress: string
  chain: string
  wallet: string
}

export interface WalletDropdownProps extends PropsWithChildren {
  className?: string
  options: WalletDropdownOptionsProps[]
  value: string
  direction?: string
  placeholder?: string
  onChange: (val: WalletDropdownOptionsProps) => void
}
