import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { DashboardPageTemplate } from 'design-systems/Templates/DashboardPageTemplate'
import { Typography } from 'design-systems/Atoms/Typography'
import { PAGE_SEO_CONFIG } from 'appConfig'
import { IS_DASHBOARD_ENABLED, PAGE_ROUTES } from 'utils'

const DashboardDetailPage: NextPage = () => {
  const router = useRouter()
  if (!IS_DASHBOARD_ENABLED) {
    router.push(PAGE_ROUTES.home)
    return (
      <Typography className="text-center">This page is not allowed to access. Redirecting to home page.</Typography>
    )
  }

  return <DashboardPageTemplate />
}

export default DashboardDetailPage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.dashboard,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
