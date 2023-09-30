import NextLink from 'next/link'

import { LinkProps } from './interface'
import { getStyles } from './utils'

import { Typography } from 'design-systems/Atoms/Typography'

export const Link: React.FC<LinkProps> = ({
  className = '',
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  ...props
}) => {
  const [linkClassName, disabledClassName] = getStyles(className)

  if (disabled)
    return (
      <Typography className={disabledClassName} size="subtitle" variant="condensed">
        {children}
      </Typography>
    )

  return (
    <NextLink className={linkClassName} {...props}>
      {leftIcon && <span>{leftIcon}</span>}
      <Typography size="subtitle" variant="condensed">
        {children}
      </Typography>
      {rightIcon && <span>{rightIcon}</span>}
    </NextLink>
  )
}
