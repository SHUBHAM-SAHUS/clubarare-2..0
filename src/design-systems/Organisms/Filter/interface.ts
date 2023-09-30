import type { PropsWithChildren } from 'react'

export interface FilterProps extends PropsWithChildren {
  className?: string
  initialFilters: AssetFilters
  onChangeFilter: (filters: Array<{ key: keyof AssetFilters; value: string | boolean }>) => void
  onFilterCancel: Function
}
