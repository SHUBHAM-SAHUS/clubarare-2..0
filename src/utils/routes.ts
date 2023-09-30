export const PAGE_ROUTES = {
  home: '/',
  explore: '/explore',
  reward: '/reward',
  support: '/support',
  dashboard: '/dashboard',
  profile: (profileId: string) => `/profile/${profileId}`,
  product: (productId: string) => `/product/${productId}`,
  collection: (collectionId: string) => `/collection/${collectionId}`,
}

export const PUBLIC_ROUTES = [
  PAGE_ROUTES.home,
  PAGE_ROUTES.explore,
  PAGE_ROUTES.reward,
  PAGE_ROUTES.support,
  PAGE_ROUTES.collection('[collectionId]'),
  PAGE_ROUTES.profile('[userIdOrAddress]'),
  PAGE_ROUTES.product('[productId]'),
]
