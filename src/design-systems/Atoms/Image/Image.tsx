import NextImage from 'next/image'

import { Skeleton } from '../Skeleton'

import { ImageProps } from './interface'

import { SpinnerCard } from 'design-systems/Molecules/Cards/SpinnerCard'
import { useToggle } from 'hooks/useToggle'

/**
 * @deprecated Try use ClubRareImage component
 */
export const Image: React.FC<ImageProps> = ({
  width,
  height,
  className = '',
  alt,
  src,
  isLoading = false,
  onClick,
  style,
}) => {
  const [isLoaded, , , turnOn] = useToggle()
  return (
    <>
      {isLoading ? (
        <div style={{ height: `${height}px`, width: `${width}px` }}>
          <Skeleton></Skeleton>
        </div>
      ) : (
        <div className="relative flex justify-center">
          <NextImage
            alt={alt}
            className={className}
            height={height}
            src={src}
            style={style}
            width={width}
            onClick={onClick}
            onError={turnOn}
            onLoadingComplete={turnOn}
          />
          {!isLoaded && <SpinnerCard className={`absolute left-0 right-0 w-auto bg-neutral-600`} />}
        </div>
      )}
    </>
  )
}
