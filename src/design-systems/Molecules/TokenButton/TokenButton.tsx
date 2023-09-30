import { TokenButtonProps } from './interface'

import { AGOVIcon, MPWRIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export function TokenButton({ isActive = false, token = 'AGOV' }: TokenButtonProps) {
  const classes = classNames(
    'flex items-center gap-2 rounded-full border-2 bg-neutral-700 px-4 py-3 hover:border-neutral-100 dark:bg-neutral-300 dark:hover:border-neutral-600',
    isActive
      ? 'border-neutral-100 dark:border-neutral-600 text-neutral-100 dark:text-neutral-500'
      : 'border-neutral-700 dark:border-neutral-300 text-neutral-500 dark:text-neutral-500'
  )
  return (
    <button className={classes}>
      {token === 'AGOV' ? <AGOVIcon isActive={isActive} /> : <MPWRIcon isActive={isActive} />}
      <Typography size="caption">{token}</Typography>
    </button>
  )
}
