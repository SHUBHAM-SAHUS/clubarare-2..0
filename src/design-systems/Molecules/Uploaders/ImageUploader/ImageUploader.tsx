import { InfoIcon, PlusIcon } from 'design-systems/Atoms/Icons'
import { Image } from 'design-systems/Atoms/Image'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'

export interface ImageUploaderProps {
  className?: string
  uploading?: boolean
  error?: string
  src?: string
  label?: string
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  className,
  uploading,
  error,
  src,
  label = 'Add Image',
}) => {
  const isImported = !!src

  const classNames = [className, 'w-full'].join(' ')
  const textClassNames = [
    'flex items-center gap-1',
    error ? 'text-error-800' : 'text-neutral-400 dark:text-neutral-500',
  ].join(' ')

  const dropdownZoneClassName = [
    'rounded-sm',
    !isImported && 'border-2 border-dashed border-neutral-600 dark:border-neutral-400 overflow-hidden',
    !isImported && 'hover:bg-neutral-700 dark:hover:bg-neutral-300',
    !isImported && 'cursor-pointer',
    'h-[200px]',
    'flex flex-col items-center justify-center gap-2',
    'mb-md',
    classNames,
  ].join(' ')

  return (
    <div>
      <div className={dropdownZoneClassName}>
        {isImported ? (
          <Image alt="imported-image" className="h-full w-auto" src={src} />
        ) : uploading ? (
          <>
            <Spinner className="h-8 w-8 stroke-neutral-100 dark:stroke-neutral-800" />
            <Typography
              className="text-center text-neutral-100 dark:text-neutral-500"
              size="caption"
              variant="condensed"
            >
              Uploading...
            </Typography>
          </>
        ) : (
          <>
            <PlusIcon className="h-8 w-8 stroke-neutral-400 dark:stroke-neutral-500" />
            <Typography
              className="text-center text-neutral-400 dark:text-neutral-500"
              size="caption"
              variant="condensed"
            >
              {label}
            </Typography>
          </>
        )}
      </div>

      {error && !isImported && (
        <Typography className={textClassNames} size="small" variant="condensed">
          <InfoIcon
            className="h-4 w-4"
            fill={error ? 'fill-error-800' : 'fill-neutral-400 dark:fill-neutral-500'}
            stroke={error ? 'stroke-error-800' : 'stroke-neutral-400 dark:stroke-neutral-500'}
          />
          {error ||
            'We recommend you use square format at least 1080 x 1080px. Use .mp4 for video and .png or.jpg for images'}
        </Typography>
      )}
    </div>
  )
}
