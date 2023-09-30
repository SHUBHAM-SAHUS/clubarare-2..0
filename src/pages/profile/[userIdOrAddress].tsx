import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'

import { LoadingBoundary } from 'design-systems/Organisms/LoadingBoundary'
import { MyProfilePageTemplate, FilterType } from 'design-systems/Templates/MyProfilePageTemplate'
import { useToggle } from 'hooks/useToggle'
import { useProfile } from 'hooks/api/useProfile'
import { useUserNFTAssets } from 'hooks/api/useUserNFTAssets'
import { META_ENTITIES, getMetadata } from 'utils'
import { PAGE_SEO_CONFIG } from 'appConfig'

const Profile: NextPage = () => {
  const router = useRouter()
  const userIdOrAddress = router.query?.userIdOrAddress as string

  const [onlyPhygitalAsset, toggleOnlyPhygitalAsset] = useToggle(false)
  const [filterType, setFilterType] = useState(FilterType.All)

  const { isLoadingUserProfile, userProfile } = useProfile(userIdOrAddress)

  const { isLoadingUserNFTAssets, userNFTAssets, refetchUserAssets } = useUserNFTAssets(
    userProfile?.walletAddress ?? userIdOrAddress?.toLocaleLowerCase(),
    filterType,
    onlyPhygitalAsset
  )

  return (
    <LoadingBoundary loading={!userIdOrAddress || isLoadingUserProfile} size="full">
      <MyProfilePageTemplate
        filterType={filterType}
        isLoadingUserAssets={isLoadingUserNFTAssets}
        onlyPhygitalAsset={onlyPhygitalAsset}
        refetchUserAssets={refetchUserAssets}
        userAssets={userNFTAssets}
        userIdOrAddress={userIdOrAddress}
        userProfile={userProfile}
        onChangeFilterType={setFilterType}
        onToggleOnlyPhygitalAsset={toggleOnlyPhygitalAsset}
      />
    </LoadingBoundary>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  try {
    const address = context.query?.userIdOrAddress as string
    const metadata = await getMetadata(META_ENTITIES.PROFILE, address)

    return {
      props: {
        metadata: {
          ...PAGE_SEO_CONFIG.profile,
          ...metadata,
        },
      },
    }
  } catch (error) {
    return {
      notFound: true,
      props: {},
    }
  }
}
