import { useState, useCallback, useEffect } from 'react'

import { ButtonGroupProps } from './interface'
import { getButtonGroupBgStyles } from './utils'

import { Button } from 'design-systems/Atoms/Button'

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  variant = 'primary',
  className = '',
  size = 'small',
  disabled = false,
  value = undefined,
  buttons,
  clickHandler,
  onClick,
}) => {
  const classNames = [
    getButtonGroupBgStyles(variant),
    'inline-flex p-xs gap-md items-center',
    'rounded-xl overflow-hidden',
    className,
  ].join(' ')

  const [activeButton, setActiveButton] = useState<string>(value ? String(value) : buttons?.[0]?.id)

  const getButtonStyle = (id: string) => {
    if (activeButton === id) {
      return 'cursor-auto !bg-neutral-100 !text-neutral-600 dark:!bg-neutral-700 dark:!text-neutral-100'
    }
    return '!bg-transparent !text-neutral-100 dark:!text-neutral-600'
  }

  const handleClick = useCallback(
    (id: string) => () => {
      setActiveButton(id)
      onClick?.(id)
      clickHandler?.(id)
    },
    [onClick, clickHandler]
  )

  useEffect(() => {
    if (value) {
      setActiveButton(String(value))
    }
  }, [value])

  return (
    <div className={classNames}>
      {buttons?.map(button => (
        <Button
          className={getButtonStyle(button.id)}
          color="primary"
          disabled={disabled}
          key={button.id}
          size={size}
          variant="solid"
          onClick={handleClick(button.id)}
        >
          {button.title}
        </Button>
      ))}
    </div>
  )
}
