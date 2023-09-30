import React, { PropsWithChildren } from 'react'

import { Spinner } from 'design-systems/Atoms/Spinner'

export interface LoadingBoundaryProps extends PropsWithChildren {
  loading: boolean
  size: 'full'
}

export const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({ loading, size, children }) => {
  if (loading) {
    if (size === 'full') {
      return (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center">
          <Spinner className="h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />
        </div>
      )
    }

    // TODO add more size
    return <></>
  }

  return <>{children}</>
}
