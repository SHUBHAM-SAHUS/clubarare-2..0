import React, { useState } from 'react'

import { SelectedFollowModalState } from './SelectedFollowModalState'

interface FollowModalButtonsProps {
  state?: string
  followers?: number
  following?: number
  onStateChange?: (state: SelectedFollowModalState) => void
}

export const FollowModalButtons: React.FC<FollowModalButtonsProps> = ({
  state,
  onStateChange,
  followers,
  following,
}) => {
  const [selectedState, setSelectedState] = useState(state || SelectedFollowModalState.Followers)

  const handleClick = (selected: SelectedFollowModalState) => {
    setSelectedState(selected)
    onStateChange?.(selected)
  }

  return (
    <div className="flex space-x-4">
      <button
        className={`border-gray-400 h-7 rounded-full border ${
          selectedState === SelectedFollowModalState.Followings
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-500 opacity-50'
        }`}
        onClick={() => handleClick(SelectedFollowModalState.Followings)}
      >
        <span className="px-4 py-1 text-base">FOLLOWING ({following})</span>
      </button>
      <button
        className={`border-gray-400 h-7 rounded-full border ${
          selectedState === SelectedFollowModalState.Followers
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-500 opacity-50'
        }`}
        onClick={() => handleClick(SelectedFollowModalState.Followers)}
      >
        <span className="px-4 py-1 text-base">FOLLOWERS ({followers})</span>
      </button>
    </div>
  )
}
