import { useMemo } from 'react'
import { useQuery } from 'wagmi'
import { useRouter } from 'next/router'

import { SpaceService } from 'api-services'
import { PAGE_ROUTES, QUERIES } from 'utils'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'

export const useSpaceAssets = () => {
  const router = useRouter()

  const {
    isLoading: isLoadingBackgroundTemplates,
    data: backgroundTemplates,
    refetch: refetchBackgroundTemplates,
  } = useQuery([QUERIES.PUBLIC.GET_SPACE_BACKGROUND_TEMPLATES], () => SpaceService.getBackgroundTemplates(), {
    select: res => res.data,
    enabled: router.asPath.includes('/profile'),
  })

  const {
    isLoading: isLoadingElementObjects,
    data: elementObjects,
    refetch: refetchElementObjects,
  } = useQuery([QUERIES.PUBLIC.GET_SPACE_ELEMENT_OBJECTS], () => SpaceService.getElementObjects(), {
    select: res => res.data,
    enabled: router.asPath.includes('/profile'),
  })

  const {
    isLoading: isLoadingElementLightings,
    data: elementLightings,
    refetch: refetchElementLightings,
  } = useQuery([QUERIES.PUBLIC.GET_SPACE_ELEMENT_LIGHTINGS], () => SpaceService.getElementLightings(), {
    select: res => res.data,
    enabled: router.asPath.includes('/profile'),
  })

  const {
    isLoading: isLoadingBorders,
    data: borders,
    refetch: refetchBorders,
  } = useQuery([QUERIES.PUBLIC.GET_SPACE_BORDERS], () => SpaceService.getBorders(), {
    select: res => res.data,
    enabled: router.asPath.includes('/profile'),
  })

  const {
    isLoading: isLoadingPhygitalNfts,
    data: phygitalNfts,
    refetch: refetchPhygitalNfts,
  } = useQuery([QUERIES.PRIVATE.GET_SPACE_NFTS], () => SpaceService.getPhygitalNFTs(), {
    select: res => res.data,
    enabled: router.asPath.includes('/profile'),
  })

  const {
    isLoading: isLoadingDigitalNfts,
    data: digitalNfts,
    refetch: refetchDigitalNfts,
  } = useQuery([QUERIES.PRIVATE.GET_DIGITAL_NFTS], () => SpaceService.getDigitalNFTs(), {
    select: res => res.data,
    enabled: router.asPath.includes('/profile'),
  })

  const { isLoading: isLoadingLatestSpaceAssets, data: latestSpaceAssetsData } = useQuery(
    [QUERIES.PUBLIC.GET_LATEST_SPACES],
    () => SpaceService.getLatestSpaces(),
    {
      select: res => res.data,
      enabled: router.asPath === PAGE_ROUTES.explore,
    }
  )

  const { isLoading: isLoadingBestSpaceAssets, data: bestSpaceAssetsData } = usePaginatedQuery(
    [QUERIES.PUBLIC.GET_BEST_SPACES],
    ({ page_number, ...props }) =>
      SpaceService.getBestSpaces({
        ...props,
        page_number: page_number ?? 1,
      }),
    res => res.data,
    { enabled: router.asPath === PAGE_ROUTES.home }
  )

  const bestSpaceAssets = useMemo(
    () => bestSpaceAssetsData?.map(assets => assets?.data?.rows as SpaceObject).flat() ?? [],
    [bestSpaceAssetsData]
  )

  const latestSpaceAssets = useMemo(
    () => latestSpaceAssetsData?.map(assets => assets as SpaceObject).flat() ?? [],
    [latestSpaceAssetsData]
  )

  return useMemo(
    () => ({
      backgroundTemplates,
      bestSpaceAssets,
      latestSpaceAssets,
      borders,
      elementLightings,
      elementObjects,
      isLoadingBackgroundTemplates,
      isLoadingBestSpaceAssets,
      isLoadingLatestSpaceAssets,
      isLoadingBorders,
      isLoadingElementLightings,
      isLoadingElementObjects,
      isLoadingDigitalNfts,
      isLoadingPhygitalNfts,
      digitalNfts,
      phygitalNfts,
      refetchBackgroundTemplates,
      refetchBorders,
      refetchElementLightings,
      refetchElementObjects,
      refetchDigitalNfts,
      refetchPhygitalNfts,
    }),
    [
      backgroundTemplates,
      bestSpaceAssets,
      latestSpaceAssets,
      borders,
      elementLightings,
      elementObjects,
      isLoadingBestSpaceAssets,
      isLoadingLatestSpaceAssets,
      isLoadingBackgroundTemplates,
      isLoadingBorders,
      isLoadingElementLightings,
      isLoadingElementObjects,
      isLoadingDigitalNfts,
      isLoadingPhygitalNfts,
      digitalNfts,
      phygitalNfts,
      refetchBackgroundTemplates,
      refetchBorders,
      refetchElementLightings,
      refetchElementObjects,
      refetchDigitalNfts,
      refetchPhygitalNfts,
    ]
  )
}
