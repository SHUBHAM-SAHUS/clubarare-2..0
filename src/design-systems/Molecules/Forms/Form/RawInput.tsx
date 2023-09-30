import type { FormInputProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { InfoIcon } from 'design-systems/Atoms/Icons'
import {
  getBackgroundStyles,
  getBorderStyles,
  getPaddingStyles,
  getPlaceholderStyles,
} from 'design-systems/Atoms/Input/utils'
import { classNames } from 'utils'

export const RawFormInput: React.FC<FormInputProps> = ({
  id,
  name = '',
  variant = 'primary',
  label = '',
  type = 'text',
  placeholder = '',
  className = '',
  error = '',
  inputMode,
  autoFocus = false,
  icon,
  action,
  onChange,
  onBlur,
  required = false,
  labelClassName,
  innerClassName,
  inputRef,
  ...props
}) => {
  const labelTextClassName = ['mb-1 font-semibold text-neutral-100 dark:text-neutral-600', labelClassName].join(' ')

  const inputClassNames = classNames(
    'outline-none w-full',
    getBackgroundStyles(variant),
    getBorderStyles(variant),

    // border
    error
      ? 'border-error-800 dark:border-error-800'
      : 'border-neutral-600 dark:border-neutral-400 active:border-neutral-100 dark:active:border-neutral-700',

    // text-color
    getPlaceholderStyles(variant),
    'hover:placeholder:text-neutral-100 dark:hover:placeholder:text-neutral-700',
    'active:placeholder:text-neutral-100 dark:active:placeholder:text-neutral-700',
    error ? 'text-error-800' : 'text-neutral-100 dark:text-neutral-700',

    // font
    'font-RobotoCondensed font-normal',
    variant === 'fill'
      ? 'text-paragraph font-normal leading-paragraph tracking-paragraph'
      : 'text-body leading-body tracking-body',
    getPaddingStyles(variant, !!icon, !!action),
    innerClassName
  )

  return (
    <div className={className}>
      {label && (
        <Typography className={labelTextClassName} size="caption" variant="condensed">
          {label}
          {required && <span className="font-bold text-[#FF0000]">*</span>}
        </Typography>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute bottom-1 left-0 h-30 w-30 rounded-full bg-neutral-100 dark:bg-neutral-200">
            {icon}
          </div>
        )}
        <input
          autoFocus={autoFocus}
          className={inputClassNames}
          id={id || name}
          inputMode={inputMode}
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          required={required}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          {...props}
        />
        {action && <div className={`absolute right-2 top-0 flex h-full items-center`}>{action}</div>}
      </div>
      {error && (
        <Typography className="mt-1 flex items-center gap-1 text-error-800" size="small">
          <>
            <InfoIcon className="stroke-error-800" height={12} width={12} />
            {error}
          </>
        </Typography>
      )}
    </div>
  )
}
