import { AuthenticationIcon, AuthenticationFailedIcon } from '../Icons'

import { BadgeProps } from './interface'
import { getBadgeType, getBadgeIconColor, getBadgeSize, renderIcon, getIconSize } from './utils'

export const Badge: React.FC<BadgeProps> = ({
  disabled = false,
  className = '',
  showBadgeIcon = false,
  variant = 'authenticated',
  size = 'medium',
  children,
}) => {
  const classNames = [
    getBadgeType(variant),
    variant !== 'authenticated' && disabled ? 'opacity-40' : '',
    getBadgeSize(size),
    'uppercase rounded-full',
    className,
  ].join(' ')

  const RenderBadgeIcon = renderIcon(variant)

  const badgeIconClassName = [
    getIconSize(size),
    'rounded-full justify-center items-center flex',
    getBadgeIconColor(variant),
    variant !== 'authenticated' && disabled ? 'opacity-40' : '',
    className,
  ].join(' ')

  const authenticationClassName = [getIconSize(size), 'mr-1'].join(' ')

  const BadgeIcon = variant === 'authenticated' ? AuthenticationIcon : AuthenticationFailedIcon

  return (
    <div className="flex items-center text-center">
      {showBadgeIcon ? (
        <span className={badgeIconClassName}>
          {variant != 'sale-type' ? <RenderBadgeIcon className={getIconSize(size)} /> : ''}
        </span>
      ) : (
        <span className={classNames}>
          {variant === 'authenticated' || variant === 'failed' ? (
            <span className="flex items-center">
              <BadgeIcon className={authenticationClassName} />
              {children}
            </span>
          ) : (
            children
          )}
        </span>
      )}
    </div>
  )
}
