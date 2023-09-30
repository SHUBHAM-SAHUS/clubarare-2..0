import { CLUBRARE_NETWORKS, SORT_BY_OPTIONS } from './constants'

export const InitialFilters: AssetFilters = {
  category: '',
  fromPrice: '',
  networkId: CLUBRARE_NETWORKS.ALL,
  redeemable: true,
  saleType: 'all',
  search: '',
  sort: SORT_BY_OPTIONS[1].value,
  toPrice: '',
  token: 'ETH',
}
