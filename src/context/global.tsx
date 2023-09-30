import React, { PropsWithChildren, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { Spinner } from 'design-systems/Atoms/Spinner'
import { useCategories } from 'hooks/api/useCategories'
import { LOCAL_THEME } from 'utils'

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoadingCategories } = useCategories(true)
  const { setTheme } = useTheme()

  // Add more loading states
  const isLoading = isLoadingCategories

  useEffect(() => {
    // eslint-disable-next-line no-constant-condition
    if (!typeof window !== undefined) {
      let localTheme = localStorage.getItem(LOCAL_THEME)
      if (!localTheme) {
        localTheme = 'dark'
        localStorage.setItem(LOCAL_THEME, localTheme)
      }
      setTheme(localTheme ?? 'dark')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <Spinner className="h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />
      </div>
    )
  }

  return <>{children}</>
}
