import { isVideoFile } from 'utils'
import { Image } from 'design-systems/Atoms/Image'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { Video } from 'design-systems/Atoms/Video'

export interface FileProps {
  alt: string
  src: string
  type: string
  className?: string
  isLoading?: boolean
  width?: number
  height?: number
}

export const File: React.FC<FileProps> = ({ alt, src, type, className = '', width, height, isLoading = false }) => {
  const isVideo = isVideoFile(type)

  if (isLoading) {
    return <Skeleton />
  }

  if (isVideo) {
    return <Video center className={className} src={src} type={type} />
  }

  return <Image alt={alt} className={className} height={height} src={src} width={width} />
}
