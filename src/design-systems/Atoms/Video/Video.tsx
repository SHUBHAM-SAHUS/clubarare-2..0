import { useMemo } from 'react'

import { classNames } from 'utils'
import { useToggle } from 'hooks/useToggle'
import { SpinnerCard } from 'design-systems/Molecules/Cards/SpinnerCard'

export interface VideoProps extends React.HTMLProps<HTMLVideoElement> {
  className?: string
  center?: boolean
}

export const Video: React.FC<VideoProps> = ({ className, src, type, center = false, ...props }) => {
  const [isLoaded, , , turnOn] = useToggle(false)
  const videoClassNames = useMemo(
    () => classNames('relative flex h-full w-full', `${center ? 'flex items-center justify-center' : ''}`),
    [center]
  )

  return (
    <div className={videoClassNames}>
      <video
        {...props}
        autoPlay={true}
        className={className}
        loop={true}
        muted={true}
        playsInline={true}
        onError={turnOn}
        onLoadedData={turnOn}
        onLoadedMetadata={turnOn}
      >
        <source src={src + '#t=0.001'} type={type === 'video/quicktime' ? 'video/mp4' : type} />
      </video>
      {!isLoaded && <SpinnerCard className="bg-netural-600 absolute left-0 right-0 w-auto" />}
    </div>
  )
}
