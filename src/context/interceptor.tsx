import React, { PropsWithChildren, useEffect } from 'react'
import { Router } from 'next/router'

import { useToggle } from 'hooks/useToggle'
import { classNames } from 'utils'
import { Spinner } from 'design-systems/Atoms/Spinner'

export const Interceptor: React.FC<PropsWithChildren> = ({ children }) => {
  const [isRouting, , , turnOnRouting, turnOffRouting] = useToggle(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', turnOnRouting)
    Router.events.on('routeChangeError', turnOffRouting)
    Router.events.on('routeChangeComplete', turnOffRouting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isRouting && (
        <div
          className={classNames(
            'filterOverlayOverFlowHidden',
            'z-[2023]',
            'fixed left-0 top-0',
            'h-screen w-screen',
            'bg-neutral-800 !bg-opacity-50 dark:bg-neutral-200',
            'flex items-center justify-center'
          )}
        >
          <Spinner className="h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />
        </div>
      )}
      {children}
    </>
  )
}
