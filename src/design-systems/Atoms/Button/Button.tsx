import { Spinner } from '../Spinner'

import { ButtonProps } from './interface'
import { getBorderStyles, getButtonColors, getButtonSize, getSpinnerSize, getSpinnerStokeColor } from './utils'

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  variant = 'solid',
  color = 'neon',
  className = '',
  children,
  onClick,
}) => {
  const classNames = [
    getButtonColors(color, variant),
    getButtonSize(size, loading, fullWidth),
    getBorderStyles(color, variant),
    'flex items-center justify-center gap-4',
    'rounded-md overflow-hidden',
    'font-medium',
    fullWidth && 'w-full',
    disabled ? 'cursor-auto' : 'cursor-pointer',
    className,
  ].join(' ')

  const spinnerClasses = [getSpinnerStokeColor(color, variant), getSpinnerSize(size)].join(' ')
  if (loading) disabled = true

  return (
    <button className={classNames} disabled={disabled} type={type} onClick={onClick}>
      {loading ? <Spinner className={spinnerClasses} /> : children}
    </button>
  )
}
