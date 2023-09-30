import type { NextPage, GetStaticProps } from 'next'

import { SupportPageTemplate } from 'design-systems/Templates/SupportPageTemplate'
import { PAGE_SEO_CONFIG } from 'appConfig'

const SupportPage: NextPage = () => {
  return <SupportPageTemplate />
}

export default SupportPage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: PAGE_SEO_CONFIG.support,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
