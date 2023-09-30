import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { CustomURLProps } from './interface'

import { CopyIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export const CustomURL: React.FC<CustomURLProps> = ({
  url = '',
  className = '',
  urlClassName = '',
  hostClassName = '',
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const urlClassNames = classNames(
    'truncate border-neutral-600 text-neutral-100 focus-within:border-neutral-100 focus-within:bg-neutral-700 dark:text-neutral-800',
    urlClassName
  )

  const hostClassNames = classNames('mr-0.5 flex font-RobotoCondensed text-neutral-500', hostClassName)

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1000)
    }
  }, [isCopied])

  return (
    <div
      className={classNames(
        'focus-within tabindex:0 relative flex w-236 items-center rounded-20 border px-3 py-1',
        'border-neutral-600 bg-neutral-800 hover:bg-neutral-700 dark:border-neutral-400 dark:bg-neutral-200 dark:hover:bg-neutral-400',
        className
      )}
    >
      <Typography className={hostClassNames} size="body">
        <Typography className={urlClassNames}>{url}</Typography>
      </Typography>
      {isCopied && (
        <Typography
          className="absolute bottom-6 right-0 inline-flex rounded bg-neutral-100 px-2 py-1 text-neutral-700"
          size="small"
          variant="condensed"
        >
          Copied
        </Typography>
      )}
      <div className="group ml-auto">
        <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
          <CopyIcon
            className="cursor-pointer stroke-neutral-500 group-hover:stroke-neutral-100 dark:group-hover:stroke-neutral-700 "
            height={20}
            width={20}
          />
        </CopyToClipboard>
      </div>
    </div>
  )
}
