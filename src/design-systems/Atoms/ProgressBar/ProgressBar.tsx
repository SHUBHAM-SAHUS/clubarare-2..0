import { ProgressBarProps } from './interface'

export function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={`mb-4 h-1.5 w-full rounded-full bg-neutral-600 dark:bg-neutral-400 ${className}`}>
      <div className="h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-700" style={{ width: `${value}%` }}></div>
    </div>
  )
}
