import React, { useEffect, useMemo, useState } from 'react'
import { ILayer } from '@layerhub-io/types'
import { useActiveObject, useEditor } from '@layerhub-io/react'
import { HexAlphaColorPicker } from 'react-colorful'

import { getRangePercent } from './utils'
import type { CustomILayer, ShowModalProps } from './interface'

import { CloseIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { RangeBar } from 'design-systems/Molecules/RangeBar'
import { LOCAL_ADDON_THEME, LOCAL_THEME } from 'utils'
import { useShallowState } from 'hooks/useShallowState'

export const ShadowModal: React.FC<ShowModalProps> = ({ classNames, handleShadowModal }) => {
  const editor = useEditor()
  const activeObject = useActiveObject() as Required<ILayer & CustomILayer>

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [state, setState] = useState<string>('light')
  const [rangeBarValues, setRangeBarValues] = useShallowState({
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    transparency: 255,
  })

  const [trackerBg, setTrackerBg] = useShallowState({
    offsetX: '',
    offsetY: '',
    blur: '',
    transparency: '',
  })

  const [shadowOption, setShadowOption] = useShallowState({
    enabled: true,
    blur: activeObject?.shadow?.blur || 0,
    color: activeObject?.shadow?.color || '#000000ff',
    offsetX: activeObject?.shadow?.offsetX || 0,
    offsetY: activeObject?.shadow?.offsetY || 0,
  })

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
    setTrackerBg({
      offsetX: `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} 0%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${(rangeBarValues['offsetX'] + 100) / 2}%, #F6F6F6 ${(rangeBarValues['offsetX'] + 100) / 2}%, #F6F6F6 100%)`,
      offsetY: `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} 0%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${(rangeBarValues['offsetY'] + 100) / 2}%, #F6F6F6 ${(rangeBarValues['offsetY'] + 100) / 2}%, #F6F6F6 100%)`,
      blur: `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} 0%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${rangeBarValues['blur']}%, #F6F6F6 ${rangeBarValues['blur']}%, #F6F6F6 100%)`,
      transparency: `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} 0%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${rangeBarValues['transparency'] / 2.55}%, #F6F6F6 ${rangeBarValues['transparency'] / 2.55}%, #F6F6F6 %)`,
    })
  }, [isDarkMode, rangeBarValues])

  const handleStorageChange = (event: any) => {
    if (event.key === LOCAL_ADDON_THEME || event.key === LOCAL_THEME) {
      setState(event.newValue || '')
    }
  }

  const handleRangeBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target
    const inputValue = Number(event.target.value)
    const newPercentage = ((inputValue - 0) / (100 - 0)) * 100
    setTrackerBg(prevState => ({
      ...prevState,
      [id]: `linear-gradient(to right, ${isDarkMode ? '#EAFB06' : '#141414'} -100%, ${
        isDarkMode ? '#EAFB06' : '#141414'
      } ${getRangePercent(id, newPercentage)}%, #F6F6F6 ${getRangePercent(id, newPercentage)}%, #F6F6F6 100%)`,
    }))
    setRangeBarValues(prevState => ({
      ...prevState,
      [id]: inputValue,
    }))
    if (!activeObject) return
    if (id === 'offsetX') {
      setShadowOption({ ...shadowOption, offsetX: inputValue })
    } else if (id === 'offsetY') {
      setShadowOption({ ...shadowOption, offsetY: inputValue })
    } else if (id === 'blur') {
      setShadowOption({ ...shadowOption, blur: inputValue })
    }
  }

  useEffect(() => {
    editor.objects.update({
      shadow: {
        ...shadowOption,
      },
    })
  }, [shadowOption])

  const shadowClassName = useMemo(
    () => [classNames, 'w-full md:w-200 rounded-sm bg-neutral-800 py-3 px-3 dark:bg-neutral-300'].join(' '),
    [classNames]
  )

  const getShadowOpacity = (color: string) => {
    const lastValue = color.substring(color.length - 2)
    return parseInt(lastValue, 16)
  }

  useEffect(() => {
    if (activeObject) {
      setRangeBarValues({
        offsetX: activeObject?.shadow?.offsetX ? activeObject.shadow.offsetX : 0,
        offsetY: activeObject?.shadow?.offsetY ? activeObject.shadow.offsetY : 0,
        blur: activeObject?.shadow?.blur ? activeObject.shadow.blur : 0,
        transparency: activeObject?.shadow?.color ? getShadowOpacity(activeObject.shadow.color) : 255,
      })
      setShadowOption(activeObject?.shadow)
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
            Shadow
          </Typography>
        </div>
        <div className="md:hidden" onClick={handleShadowModal}>
          <CloseIcon stroke="#B4B4B4" />
        </div>
      </div>
      <div className="mt-3">
        <RangeBar
          id="offsetX"
          maxValue={100}
          minValue={-100}
          rangeTrackColor={trackerBg['offsetX']}
          rangeValue={rangeBarValues['offsetX']}
          text="Offset X"
          onChange={handleRangeBarChange}
        />
      </div>
      <div className="mt-3">
        <RangeBar
          id="offsetY"
          maxValue={100}
          minValue={-100}
          rangeTrackColor={trackerBg['offsetY']}
          rangeValue={rangeBarValues['offsetY']}
          text="Offset Y"
          onChange={handleRangeBarChange}
        />
      </div>
      <div className="mt-3">
        <RangeBar
          id="blur"
          maxValue={100}
          minValue={0}
          rangeTrackColor={trackerBg['blur']}
          rangeValue={rangeBarValues['blur']}
          text="blur"
          onChange={handleRangeBarChange}
        />
      </div>
      <div className={`mt-3 flex flex-col gap-4`}>
        <Typography
          className="text-start font-normal capitalize leading-subtitle text-neutral-300 dark:text-neutral-600"
          size="small"
          variant="condensed"
        >
          Color
        </Typography>

        <HexAlphaColorPicker
          className="!w-auto"
          color={shadowOption.color}
          onChange={color => {
            setShadowOption({ ...shadowOption, color: color })
          }}
        />
      </div>
      {/* <div className="mt-3">
        <RangeBar
          text="transparency"
          id="transparency"
          onChange={handleRangeBarChange}
          maxValue={255}
          minValue={0}
          rangeTrackColor={trackerBg['transparency']}
          rangeValue={rangeBarValues['transparency']}
        />
      </div> */}
    </div>
  )
}
