import { ShareModalProps } from './interface'
import { generateLink, icons } from './utils'

import { Link } from 'design-systems/Atoms/Link'
import { Typography } from 'design-systems/Atoms/Typography'
import { CloseIcon } from 'design-systems/Atoms/Icons'
import { CustomURL } from 'design-systems/Molecules/CustomURL'
import { classNames } from 'utils'

export const ShareModal: React.FC<ShareModalProps> = ({ url = '', onClose, text }) => {
  return (
    <div
      className={classNames(
        'absolute flex flex-col',
        'left-1/2 top-36 z-[2] h-[292px] w-full -translate-x-1/2 -translate-y-1/2 rounded-md p-4 md:top-60 md:w-[400px] lg:top-60',
        'bg-neutral-800 dark:bg-neutral-200'
      )}
    >
      <div className="flex w-full justify-between ">
        <Typography
          className="letter-spacing font-bold leading-subtitle tracking-paragraph dark:text-neutral-700"
          size="subtitle"
          variant="condensed"
        >
          Share
        </Typography>
        <button type="button" onClick={onClose}>
          <CloseIcon className="cursor-pointer fill-neutral-500" />
        </button>
      </div>

      <div
        className={classNames(
          'my-10 flex h-[119px] w-full flex-1 flex-col items-center justify-center gap-5 rounded-xs p-4',
          'border border-neutral-700 bg-neutral-700 dark:border-neutral-300 dark:bg-neutral-300'
        )}
      >
        <div className="flex gap-6">
          {icons.map(({ Icon, label, param, link, ...rest }) => (
            <Link
              className="flex flex-col items-center justify-center gap-1"
              href={generateLink(label, link, text, param, url)}
              key={label}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="m-auto" fill="fill-neutral-800" {...rest} />
              <Typography
                className={classNames(
                  'letter-spacing mt-2 text-center font-normal leading-subtitle tracking-paragraph',
                  'text-neutral-400 dark:text-neutral-800'
                )}
                size="caption"
                variant="condensed"
              >
                {label}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
      <CustomURL className="!w-full px-4 py-2" url={url} urlClassName="w-[300px]" />
    </div>
  )
}
