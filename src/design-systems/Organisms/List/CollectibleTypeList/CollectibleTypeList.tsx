import { useCallback, useState } from 'react'

import { SliderHorizontalIcon } from 'design-systems/Atoms/Icons'
import { IconButton } from 'design-systems/Atoms/IconButton'
import { Dropdown } from 'design-systems/Molecules/Dropdown'
import { SORT_BY_OPTIONS } from 'utils'

export interface CollectibleTypeListProps {
  initialSortBy?: SortByAsset
  onChangeSortBy: (sortBy: SortByAsset) => void
  onToggleFilter: () => void
  onChangeNftType: (index: number) => void
}

export const CollectibleTypeList: React.FC<CollectibleTypeListProps> = ({
  initialSortBy,
  onChangeSortBy,
  onToggleFilter,
  onChangeNftType,
}) => {
  const [selectedSortBy, setSelectedSortBy] = useState<SortByAsset>(initialSortBy ?? SORT_BY_OPTIONS[0].value)
  const [selectedNftType, setSelectedNftType] = useState<number>(0)

  const handleChangeSortBy = useCallback(
    (selection: SortByAssetOption) => {
      setSelectedSortBy(selection.title)
      onChangeSortBy?.(selection.value)
    },
    [onChangeSortBy]
  )

  const handleChangeNftType = useCallback(
    (index: number) => {
      setSelectedNftType(index)
      onChangeNftType?.(index)
    },
    [onChangeNftType]
  )

  return (
    <div className="mb-2 flex w-full items-center justify-end">
      {/* <Tabs tabs={COLLECTIBLE_TYPES} currentTab={selectedNftType} onChangeTab={handleChangeNftType} /> */}
      <div className="flex items-center gap-6">
        <IconButton variant="transparent" onClick={onToggleFilter}>
          <SliderHorizontalIcon className="stroke-neutral-100 dark:stroke-neutral-800" />
        </IconButton>
        <div className="hidden md:block">
          <Dropdown
            direction="right"
            options={SORT_BY_OPTIONS}
            placeholder="Sort by"
            value={selectedSortBy}
            onChange={handleChangeSortBy}
          />
        </div>
      </div>
    </div>
  )
}
