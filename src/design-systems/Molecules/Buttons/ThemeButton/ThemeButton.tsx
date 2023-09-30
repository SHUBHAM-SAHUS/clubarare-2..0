import { ThemeButtonProps } from './interface'

import { ThemeIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { Toggle } from 'design-systems/Atoms/Toggle'

export function ThemeButton({ isDark, onChange }: ThemeButtonProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ThemeIcon className="stroke-neutral-100 dark:stroke-neutral-700" />
        <Typography size="subtitle">Dark Mode</Typography>
      </div>
      <Toggle defaultCheck={isDark} onChange={onChange} />
    </div>
  )
}
