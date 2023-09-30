import { Typography } from 'design-systems/Atoms/Typography'

export interface SectionCardProps {
  className?: string
  icon?: React.ReactElement
  title?: string
  description?: string
  disabled?: boolean
}

export const SectionCard: React.FC<SectionCardProps> = ({ className, icon, title, description, disabled = false }) => {
  const classNames = [
    'rounded-sm max-w-205',
    'border border-neutral-700 dark:border-neutral-300',
    !disabled && 'active:border-neutral-100 dark:active:border-neutral-800',
    'p-4',
    'bg-neutral-800 dark:bg-neutral-100',
    !disabled && 'hover:bg-neutral-700 dark:hover:bg-neutral-300',
    disabled && 'opacity-40',
    className,
  ].join(' ')

  return (
    <div className={classNames}>
      {icon}
      {title && (
        <Typography className="mb-4 mt-2" size="paragraph" variant="condensed">
          {title}
        </Typography>
      )}
      {description && (
        <Typography size="body" variant="condensed">
          {description}
        </Typography>
      )}
    </div>
  )
}
