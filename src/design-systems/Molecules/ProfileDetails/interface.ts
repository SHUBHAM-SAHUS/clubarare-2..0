import { PropsWithChildren } from 'react'

export interface socialMediaLinks {
  instagram: string
  twitter: string
  youtube: string
}

export interface userDetails {
  walletAddress: string | undefined
  profileName: string | undefined
  profileDetails: string | undefined
  verification: string | undefined
  followingCount: number
  followersCount: number
  socialMediaLink: socialMediaLinks
}

export interface ProfileDetailsProps extends PropsWithChildren {
  className?: string
  mode: 'Empty' | 'Filled'
  view: 'Owner' | 'Visitor'
  userDetails: userDetails
  showModal: boolean
  setShowModal: Function
}
