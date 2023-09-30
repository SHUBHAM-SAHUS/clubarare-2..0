import { ImageListProps } from './interface'

import { CheckIcon } from 'design-systems/Atoms/Icons'
import { ClubRareImage } from 'design-systems/Atoms/Image'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { classNames } from 'utils'
import { useSpace } from 'context'

export const ImageList: React.FC<ImageListProps> = ({ isLoading, images, onClick, transparency = true, cols = 2 }) => {
  const { selectedObject, setSelectedObject } = useSpace()
  const handleSelectImage = (image: ImageObject) => {
    if (selectedObject === image)
      setSelectedObject({
        id: '',
        imageUrl: '',
        thumbnailImage: '',
        fileType: '',
        originalMedia: '',
        tokenId: '',
        tokenAddress: '',
      })
    else {
      setSelectedObject(image)
      onClick && onClick(image)
    }
  }
  return (
    <div className={classNames('grid gap-3', cols === 4 ? 'grid-cols-4' : 'grid-cols-2')}>
      {isLoading
        ? Array(30)
            .fill('')
            .map((_, i) => (
              <div className="h-[120px] w-[120px]" key={`loading-${i}`}>
                <Skeleton />
              </div>
            ))
        : images?.map((image, i) => (
            <div className="relative flex h-full w-full" key={i}>
              <ClubRareImage
                alt={`image-${i}`}
                className={classNames(
                  `cursor-pointer hover:opacity-30`,
                  cols === 4 ? '!h-16' : '!h-32',
                  !transparency && 'bg-neutral-100',
                  selectedObject === image
                    ? 'border-2 border-neutral-100 dark:border-neutral-800'
                    : 'border-2 border-transparent'
                )}
                src={image.thumbnailImage || image.originalMedia || image.imageUrl}
                onClick={() => handleSelectImage(image)}
              />
              {selectedObject === image && (
                <CheckIcon check="fill-neutral-100" className="absolute right-1 top-1 flex h-5 w-5 fill-brand-800" />
              )}
            </div>
          ))}
    </div>
  )
}
