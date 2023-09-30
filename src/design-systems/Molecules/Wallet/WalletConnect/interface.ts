export interface WalletConnectProps {
  className?: string
  wallet: WalletTypes
  disabled?: boolean
  isConnecting?: boolean
  onClick: () => void
}
