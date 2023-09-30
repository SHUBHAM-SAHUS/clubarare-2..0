import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect } from 'react'

import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { OverlayIds } from 'design-systems/Organisms/Managers/OverlayManager'
import { PAGE_SEO_CONFIG } from 'appConfig'
import BannerImage from 'assets/images/profile_banner.png'
import { useConnector, useOverlay } from 'context'

const MyProfilePage: NextPage = () => {
  const { isSigned, address } = useConnector()
  const router = useRouter()
  const { openOverlay } = useOverlay()
  useEffect(() => {
    if (address && isSigned) {
      router.push(`/profile/${address}`)
    }
  }, [address, isSigned])
  return (
    <div className="flex min-h-[calc(100vh-150px)] w-full flex-col items-center justify-center gap-9 px-6">
      <Image alt="banner image" src={BannerImage} />
      <div className="flex flex-col items-center gap-9">
        <Typography className="text-center" size="subtitle">
          Connect your wallet & create your profile
        </Typography>
        <Button color="neon" onClick={() => openOverlay(OverlayIds.PROFILE)}>
          CONNECT & CREATE NOW
        </Button>
      </div>
    </div>
  )
}

export default MyProfilePage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.profile,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
