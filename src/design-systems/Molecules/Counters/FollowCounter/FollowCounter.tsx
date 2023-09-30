import { Typography } from 'design-systems/Atoms/Typography'

export interface FollowCounterProps {
  className?: string
  count?: number
  label?: string
}

export const FollowCounter: React.FC<FollowCounterProps> = ({ className, label, count = 0 }) => {
  const classNames = [className, 'flex items-center gap-2'].join(' ')

  return (
    <div className={classNames}>
      <Typography size="lg" variant="condensed">
        {count}
      </Typography>
      <Typography className="text-neutral-400 dark:text-neutral-600" size="small" variant="condensed">
        {label}
      </Typography>
    </div>
  )
}
