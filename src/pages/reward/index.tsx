import { GetStaticProps, NextPage } from 'next'

import { RewardPageTemplate } from 'design-systems/Templates/RewardPageTemplate'
import { PAGE_SEO_CONFIG } from 'appConfig'

const RewardDetailPage: NextPage = () => {
  return <RewardPageTemplate />
}

export default RewardDetailPage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.reward,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
