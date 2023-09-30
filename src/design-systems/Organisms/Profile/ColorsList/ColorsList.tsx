import { HexColorPicker } from 'react-colorful'
import React, { useState } from 'react'

import { ColorsListProps } from './interface'

export const ColorsList: React.FC<ColorsListProps> = ({ onClick }) => {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff')
  const handleSelectColor = (color: string) => {
    setSelectedColor(color)
    onClick?.(color)
  }
  return (
    <div className="m-4">
      <HexColorPicker className="!w-full" color={selectedColor} onChange={handleSelectColor} />
    </div>
  )
}
