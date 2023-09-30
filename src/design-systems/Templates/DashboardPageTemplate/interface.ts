export interface IFilter {
  type?: number | string
  redeemable?: boolean
  networkId?: ClubRareNetworks
}

export interface DashboardPageTemplateProps {
  userId?: string
}
