import { PropsWithChildren } from 'react'

export interface nftDetails {
  totalSales: number
  nftsListed: number
  nftsSold: number
  totalViews: number
  collections: number
}

export interface userDetails {
  walletAddress: string | undefined
  profileName: string | undefined
  profileDetails: string | undefined
  verification: string
  followingCount: number
  followersCount: number
  nftDetails: nftDetails
  src?: string
}

export interface DashboardHeaderProps extends PropsWithChildren {
  className?: string
  userDetails: userDetails
}
