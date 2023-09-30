import { useState, useEffect } from 'react'

import { LOCAL_THEME } from 'utils'

export const useDarkSide = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem(LOCAL_THEME) as string)
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.setItem(LOCAL_THEME, theme)
  }, [theme, colorTheme])

  return [colorTheme, setTheme] as const
}
