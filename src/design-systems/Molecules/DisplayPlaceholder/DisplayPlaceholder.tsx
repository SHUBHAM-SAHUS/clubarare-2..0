import Link from 'next/link'

import { Typography } from 'design-systems/Atoms/Typography'
import { Image } from 'design-systems/Atoms/Image'
import DarkDisplayPlaceholder from 'assets/images/dark-display-placeholder.png'
import LigthDisplayPlaceholder from 'assets/images/light-display-placeholder.png'

export interface DisplayPlaceholderProps {
  mode?: string
  href?: string
  alt: string
  className?: string
  width?: number
  height?: number
}
export const DisplayPlaceholder: React.FC<DisplayPlaceholderProps> = ({
  mode = 'light',
  alt,
  className = '',
  width,
  height,
  href = 'https://google.com',
}) => {
  return (
    <div className="min-h-[60vh] items-center justify-center rounded border border-dashed border-neutral-600 text-center text-sm sm:min-w-full">
      <div className="w-full p-8">
        <Image
          alt={alt}
          className={`mx-auto ${className}`}
          height={height}
          src={mode === 'light' ? LigthDisplayPlaceholder : DarkDisplayPlaceholder}
          width={width}
        />
      </div>
      <div className={mode === 'light' ? 'text-netural-400' : 'text-netural-500'}>
        <Typography>
          My Room -
          <Link className={mode === 'light' ? 'text-secondary-800' : 'text-brand-800'} href={href}>
            Coming Soon
          </Link>
          <br /> A space to create your personalized window display and showcase your phygital NFTs
        </Typography>
      </div>
    </div>
  )
}
