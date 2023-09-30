import { BigNumberish } from 'ethers'

export interface PutOnSaleModalProps {
  className?: string
  asset: AssetObject | any
  onClose: () => void
}

export interface PutOnSaleRequest {
  _id: string
  auctionType: string
  amount: string
  erc20_address: string
  nonce: string
  signature: string
  startingTime: number
  closingTime: number
  isTokenGated: boolean
  tokenGateAddress: string
  isMetamask?: boolean
}
