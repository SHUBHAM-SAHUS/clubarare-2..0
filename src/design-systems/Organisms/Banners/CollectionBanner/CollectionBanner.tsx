import { CollectionBannerProps } from './interface'
import { styles } from './utils'

import { ClubRareImage } from 'design-systems/Atoms/Image'
import { classNames } from 'utils'

export const CollectionBanner: React.FC<CollectionBannerProps> = ({
  className = '',
  collectionBannerImage = '',
  alt = '',
}) => {
  return (
    <div className={classNames(styles.banner, className)}>
      <ClubRareImage
        alt={alt || 'collection-banner-image'}
        className="cursor-auto"
        src={collectionBannerImage || '/collectionBackgroundBanner.svg'}
        styles={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  )
}
