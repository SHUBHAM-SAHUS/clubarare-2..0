import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { LoadingBoundary } from 'design-systems/Organisms/LoadingBoundary'
import { ProductPageTemplate } from 'design-systems/Templates/ProductPageTemplate'
import { META_ENTITIES, getMetadata } from 'utils'
import { PAGE_SEO_CONFIG } from 'appConfig'

const ProductDetailPage: NextPage = () => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <LoadingBoundary loading={!productId} size="full">
      <ProductPageTemplate productId={productId} />
    </LoadingBoundary>
  )
}

export default ProductDetailPage

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const productId = context.query?.productId as string
  const metadata = await getMetadata(META_ENTITIES.PRODUCT, productId)

  return {
    props: {
      metadata: {
        ...PAGE_SEO_CONFIG.product,
        ...metadata,
      },
    },
  }
}
