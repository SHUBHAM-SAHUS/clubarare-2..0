import { TabProps } from './interface'

import { classNames } from 'utils'

export function Tab({ label, active, onClick }: TabProps) {
  const tabClass = classNames(
    'break-all cursor-pointer sm:text-body md:text-paragraph text-neutral-100 dark:text-neutral-600 hover:border-b-2 uppercase ',
    active ? 'border-b-2' : ''
  )
  return (
    <div className={tabClass} onClick={onClick}>
      {label}
    </div>
  )
}
