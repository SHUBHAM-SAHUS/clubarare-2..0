import { PropsWithChildren, useMemo } from 'react'

import { useToggle } from 'hooks/useToggle'
import { ArrowUpIcon, ArrowDownIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'

export interface DataCardProps extends PropsWithChildren {
  className?: string
  headerClassName?: string
  initialShowContent?: boolean
  icon?: React.ReactElement
  label: string
}

export const iconClassName = 'stroke-neutral-100 dark:stroke-neutral-600'

const bodyClassName = [
  'w-full',
  'bg-neutral-800 dark:bg-neutral-300',
  'pt-2 rounded-b-sm',
  'border border-t-0',
  'border-neutral-600 dark:border-neutral-400',
].join(' ')

export const DataCard: React.FC<DataCardProps> = ({
  className = '',
  headerClassName: _headerClassName = '',
  initialShowContent = false,
  icon,
  label,
  children,
}) => {
  const [showContent, toggle] = useToggle(initialShowContent)

  const wrapperClassName = useMemo(() => [className, 'w-full group'].join(' '), [className])

  const headerClassName = useMemo(
    () =>
      [
        'bg-neutral-700 dark:bg-neutral-200',
        'border border-neutral-600 group-hover:border-neutral-100 dark:border-neutral-400 dark:group-hover:border-neutral-600',
        'p-2 overflow-hidden w-full',
        showContent ? 'rounded-t-sm' : 'rounded-sm',
        'flex items-center justify-between',
        _headerClassName,
      ].join(' '),
    [showContent, _headerClassName]
  )

  return (
    <div className={wrapperClassName}>
      <button className={headerClassName} type="button" onClick={toggle}>
        <div className="flex items-center gap-2">
          {icon}
          <Typography size="paragraph" variant="condensed">
            {label}
          </Typography>
        </div>
        {showContent ? (
          <ArrowUpIcon className={iconClassName} height={30} width={30} />
        ) : (
          <ArrowDownIcon className={iconClassName} height={30} width={30} />
        )}
      </button>
      {showContent && (
        <div className={bodyClassName}>
          <div className="p-2">{children}</div>
        </div>
      )}
    </div>
  )
}
