import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

import { FileRule, NftCarouselProps } from './interface'

import { ClubRareImage } from 'design-systems/Atoms/Image'
import { Image } from 'design-systems/Atoms/Image'
import { Video } from 'design-systems/Atoms/Video'
import musicIcon from 'assets/images/musicIcon.png'
import { classNames } from 'utils'

export const NftCarousel: React.FC<NftCarouselProps> = ({ imageArray, defaultFile }) => {
  const [defaultImage, setDefaultImage] = useState<FileRule>(defaultFile)

  useEffect(() => {
    setDefaultImage(defaultFile)
  }, [defaultFile])

  const onImageChange = (file: FileRule) => () => {
    setDefaultImage(file)
  }

  return (
    <div className="w-full text-center lg:w-full">
      <div
        className={`h-full w-full overflow-hidden lg:h-full lg:w-full ${
          defaultImage?.type?.includes('image') ? 'flex' : ''
        }`}
      >
        {defaultImage?.type ? (
          defaultImage?.type?.startsWith('audio') ? (
            <div className="tex-center mt-0 lg:mt-20">
              <Image
                alt="Music Icon"
                className="mx-auto mb-4 h-400 w-52 lg:w-400"
                height={0}
                src={musicIcon}
                width={0}
              />
              <audio className="w-full" controls src={defaultImage?.url} />
            </div>
          ) : defaultImage?.type?.includes('video') ? (
            <div className="sm:h-[550px]">
              <Video center={true} className="h-400 w-full" controls height={400} src={defaultImage?.url} width={400} />
            </div>
          ) : (
            <div className="flex h-[550px] w-full items-center justify-center">
              <div className="h-full w-[1000px]">
                <ClubRareImage
                  alt="NFT"
                  className="w-auto"
                  src={defaultImage && defaultImage.url ? defaultImage.url : ''}
                  styles={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )
        ) : (
          <div className="tex-center flex w-full items-center justify-center">
            <Image
              alt="NFT"
              className="h-400 w-auto"
              height={400}
              src={defaultImage && defaultImage.url ? defaultImage.url : ''}
              width={400}
            />
          </div>
        )}
      </div>
      <Carousel
        arrows={true}
        className="nft-thumbnail-carousel mx-auto md:w-full lg:w-full"
        draggable={true}
        responsive={responsive}
        slidesToSlide={5}
        swipeable={true}
      >
        {[defaultImage, ...imageArray].map((image, index) => (
          <div
            className={classNames(
              'mx-auto mt-2 flex h-115 w-115 cursor-pointer items-center justify-center lg:mt-4 lg:h-120 lg:w-120',
              'transition-all duration-300 hover:scale-105 hover:contrast-125',
              (image?.url === defaultImage?.url || (defaultImage?.url === defaultFile.url && index === 0)) &&
                'border-2 border-neutral-100 dark:border-neutral-700'
            )}
            key={index}
          >
            {index === 0 ? (
              defaultFile?.type ? (
                defaultFile?.type?.includes('video') ? (
                  <Video
                    className="h-115 w-115"
                    controls={false}
                    height={115}
                    src={defaultFile?.url}
                    width={115}
                    onClick={onImageChange(defaultFile)}
                  />
                ) : defaultFile?.type?.includes('audio') ? (
                  <Image
                    alt="music-icon"
                    className="h-115 w-115"
                    height={115}
                    src={defaultFile && defaultFile.url ? defaultFile.url : ''}
                    width={115}
                    onClick={onImageChange(defaultFile)}
                  />
                ) : (
                  <Image
                    alt="NFT"
                    className="h-115 w-115 object-cover p-[2px] md:p-0"
                    height={115}
                    src={defaultFile && defaultFile.url ? defaultFile.url : ''}
                    width={115}
                    onClick={onImageChange(defaultFile)}
                  />
                )
              ) : (
                ''
              )
            ) : (
              <Image
                alt="NFT"
                className="h-115 w-115 object-cover p-[2px] lg:p-0"
                height={115}
                src={String(image?.url)}
                width={115}
                onClick={onImageChange(image)}
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

const responsive = {
  desktop: {
    breakpoint: { max: 1400, min: 1200 },
    items: 4,
  },
  landscape: {
    breakpoint: { max: 669, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1200, min: 669 },
    items: 3,
  },
}
