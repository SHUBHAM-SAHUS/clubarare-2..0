import React from 'react'

import { RangeBarProps } from './interface'

import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'

export const RangeBar: React.FC<RangeBarProps> = ({
  id,
  minValue = 0,
  maxValue = 100,
  onChange,
  rangeValue = '100',
  text = 'Text',
  rangeTrackColor,
}) => {
  const trackerStyle = {
    background: rangeTrackColor,
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Typography
          className="text-center font-normal capitalize leading-subtitle text-neutral-300 dark:text-neutral-600"
          size="small"
          variant="condensed"
        >
          {text}
        </Typography>
        <Input
          disabled
          id={id}
          inputClassName="!h-4 !w-30 cursor-pointer gap-3 rounded-xl border border-transparent !bg-neutral-700 p-1 text-center font-normal text-sm !leading-h5 text-neutral-100 hover:!bg-neutral-600 focus:border-neutral-500 focus:bg-neutral-600 disabled:bg-neutral-700 dark:!bg-neutral-400 dark:text-neutral-700 dark:hover:!bg-neutral-500 dark:focus:border-neutral-600 dark:focus:bg-neutral-500 dark:disabled:bg-neutral-400"
          max="100"
          min="0"
          type="number"
          value={rangeValue}
          onChange={onChange}
        />
      </div>
      <input
        className="custom-rangebar h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-neutral-700 py-0.5"
        id={id}
        max={maxValue}
        min={minValue}
        style={trackerStyle}
        type="range"
        value={rangeValue}
        onChange={onChange}
      />
    </div>
  )
}
