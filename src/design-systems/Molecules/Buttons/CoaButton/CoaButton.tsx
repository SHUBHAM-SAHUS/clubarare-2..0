import { CoaButtonProps } from './interface'

import { DownloadSimpleIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { getOutlineButtonColors } from 'design-systems/Atoms/Button/utils'

export function CoaButton({ coaLink }: CoaButtonProps) {
  return (
    <>
      <Typography className="w-1/2 lg:w-2/3" size="lg" variant="condensed">
        <button
          className="flex items-center justify-center gap-4 overflow-hidden rounded-md border-neutral-100 bg-transparent px-2xl py-md text-md leading-md tracking-md text-neutral-100 shadow-outlined-light-default active:shadow-outlined-light-active disabled:shadow-outlined-light-disabled dark:shadow-outlined-dark-default dark:active:shadow-outlined-dark-active dark:disabled:shadow-outlined-dark-disabled"
          type="button"
          onClick={() => window.open(String(coaLink), '_blank', 'noopener')}
        >
          <DownloadSimpleIcon className={`${getOutlineButtonColors('primary')} }`} />
          Download Certificate
        </button>
      </Typography>
    </>
  )
}
