import { IconButtonProps } from './interface'
import { getBackgroundStyles } from './utils'

export const IconButton: React.FC<IconButtonProps> = ({ id, className = '', variant = 'black', children, onClick }) => {
  const classNames = ['w-8 h-8', 'rounded-full', getBackgroundStyles(variant), className].join(' ')

  return (
    <button className={classNames} id={id} onClick={onClick}>
      {children}
    </button>
  )
}
