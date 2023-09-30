import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import { useEffect, useState } from 'react'

import { AlertProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export const Alert: React.FC<AlertProps> = ({
  alertTime,
  alertType,
  buttonColor,
  className = '',
  icon,
  isShowAlert = true,
  isShowButton = false,
  message = '',
  onClose,
}) => {
  const [showAlert, setShowHideAlert] = useState<boolean>()
  const alertClassNames = [
    className,
    'px-4 rounded-xs border py-2 items-center',
    alertType === 'warning'
      ? 'bg-warning-500 border-l-4 border-warning-500 text-warning-800'
      : alertType === 'success'
      ? 'bg-mpwr-500 border-l-4 border-mpwr-500 text-mpwr-800'
      : alertType === 'error'
      ? 'bg-error-800 border-l-4 border-error-500 text-neutral-700'
      : '',
  ].join(' ')

  const buttonClasses = classNames(
    'mr-2 hidden w-20 font-Roboto uppercase md:block',
    buttonColor === 'neon'
      ? 'dark:shadow-outlined-brand-default dark:active:shadow-outlined-brand-active disabled:shadow-outlined-brand-disabled dark:text-brand-800'
      : ''
  )

  if (alertTime) {
    setTimeout(() => {
      setShowHideAlert(false)
    }, alertTime)
  }

  const handleClose = () => {
    setShowHideAlert(false)
    onClose?.()
  }

  useEffect(() => {
    setShowHideAlert(isShowAlert)
  }, [isShowAlert])

  return showAlert ? (
    <div className={alertClassNames} role="alert">
      <div className="flex flex-row">
        <div className="flex w-full flex-row items-start md:items-center">
          {icon || <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 p-1" />}
          <Typography className="ml-2 w-11/12 select-none font-RobotoCondensed font-bold" size="body">
            {message}
          </Typography>
        </div>
        <div className="flex justify-end md:items-start">
          {isShowButton && (
            <Button className={buttonClasses} color="primary" size="small" variant="outlined">
              Button
            </Button>
          )}
          <XMarkIcon
            aria-hidden="true"
            className="h-8 w-8 cursor-pointer stroke-neutral-500 hover:scale-110"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
