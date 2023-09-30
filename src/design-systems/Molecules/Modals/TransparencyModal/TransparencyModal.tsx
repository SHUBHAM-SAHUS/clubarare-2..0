import React, { useEffect, useMemo, useState } from 'react'
import { useActiveObject, useEditor } from '@layerhub-io/react'
import { ILayer } from '@layerhub-io/types'

import { rangeWrpClassName } from './utils/class-names'
import { TransparencyModalProps } from './interface'

import { CloseIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { RangeBar } from 'design-systems/Molecules/RangeBar'
import { LOCAL_ADDON_THEME, LOCAL_THEME } from 'utils'

export const TransparencyModal: React.FC<TransparencyModalProps> = ({ classNames, handleTransparencyModal }) => {
  const editor = useEditor()
  const activeObject = useActiveObject() as Required<ILayer>

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [state, setState] = useState<string>('')
  const [rangeBarValues, setRangeBarValues] = useState<number>(100)
  const [trackerBg, setTrackerBg] = useState<string>('')

  useEffect(() => {
    let localStorageValue = localStorage.getItem(LOCAL_THEME)
    if (localStorageValue === null) {
      localStorageValue = localStorage.getItem(LOCAL_ADDON_THEME)
    }
    setState(localStorageValue || 'light')

    // Add event listener for changes to local storage
    window.addEventListener('storage', handleStorageChange)

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    let currVal: string | object
    try {
      const res = JSON.parse(state)
      currVal = res.current
    } catch (e) {
      currVal = state
    }
    setIsDarkMode(currVal === 'dark' ? true : false)
  }, [state])

  useEffect(() => {
    setTrackerBg(
      `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} 0%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${rangeBarValues}%, #F6F6F6 ${rangeBarValues}%, #F6F6F6 100%)`
    )
  }, [isDarkMode, rangeBarValues])

  const handleStorageChange = (event: any) => {
    if (event.key === LOCAL_ADDON_THEME || event.key === LOCAL_THEME) {
      setState(event.newValue || '')
    }
  }

  const handleRangeBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = Number(event.target.value)
    const newPercentage = ((inputValue - 0) / (100 - 0)) * 100
    setTrackerBg(
      `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} 0%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${newPercentage}%, #F6F6F6 ${newPercentage}%, #F6F6F6 100%)`
    )
    // Check if the input value is greater than 100
    if (inputValue > 100) {
      // If it is, set the input value to 100
      inputValue = 100
    }

    // Update the state with the new input value
    setRangeBarValues(inputValue)
    editor.objects.update({ opacity: inputValue / 100 })
  }

  const shadowClassName = useMemo(
    () => [classNames, 'w-full md:w-200 rounded-sm bg-neutral-800 py-3 px-3 dark:bg-neutral-300'].join(' '),
    [classNames]
  )

  useEffect(() => {
    if (activeObject) {
      setRangeBarValues(activeObject.opacity * 100)
    }
  }, [activeObject])

  return (
    <div className={shadowClassName}>
      <div className="flex w-full items-center justify-between">
        <div className="">
          <Typography
            className={`uppercase leading-subtitle text-neutral-300 dark:text-neutral-600`}
            size="caption"
            variant="condensed"
          >
            TRANSPARENCY
          </Typography>
        </div>
        <div className="md:hidden" onClick={handleTransparencyModal}>
          <CloseIcon stroke="#B4B4B4" />
        </div>
      </div>
      <div className={rangeWrpClassName}>
        <RangeBar
          id="range-1"
          maxValue={100}
          minValue={0}
          rangeTrackColor={trackerBg}
          rangeValue={rangeBarValues}
          text="Intensity"
          onChange={handleRangeBarChange}
        />
      </div>
    </div>
  )
}
