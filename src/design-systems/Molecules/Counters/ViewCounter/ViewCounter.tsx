import { Typography } from 'design-systems/Atoms/Typography'
import { EyeIcon } from 'design-systems/Atoms/Icons'

export interface ViewCounterProps {
  className?: string
  icon?: React.ReactElement
  count?: number
  disabled?: boolean
  onClick?: () => void
}

export const ViewCounter: React.FC<ViewCounterProps> = ({ className, disabled = false, icon, count = 0, onClick }) => {
  const classNames = [className, 'flex items-center gap-1'].join(' ')

  return (
    <div className={classNames}>
      {icon ? (
        <a aria-disabled={disabled} onClick={() => !disabled && onClick?.()}>
          {icon}
        </a>
      ) : (
        <EyeIcon className="stroke-neutral-400 dark:stroke-neutral-800" />
      )}
      <Typography size="caption" variant="regular">
        {count}
      </Typography>
    </div>
  )
}
