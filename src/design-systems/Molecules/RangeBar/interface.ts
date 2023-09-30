export interface RangeBarProps {
  className?: string
  minValue?: number
  maxValue?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: number
  id?: string
  text?: string
  rangeValue: number
  rangeTrackColor: string
}
