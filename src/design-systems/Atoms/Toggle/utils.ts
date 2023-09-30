import { classNames } from 'utils'

/**
 * Get toggle circle element color
 */
const toggleColor = (toggled: boolean, hovered: boolean): string =>
  toggled
    ? classNames('bg-brand-800', hovered && 'opacity-60')
    : classNames('bg-neutral-800 dark:bg-neutral-500', hovered && 'bg-neutral-500 dark:bg-neutral-400')

const disabledToggleColor = (toggled: boolean): string => (toggled ? 'bg-brand-800' : 'bg-neutral-500')

const getToggleColor = (toggled: boolean, disabled: boolean, hovered: boolean): string =>
  disabled ? disabledToggleColor(toggled) : toggleColor(toggled, hovered)

/**
 * Get toggle background color
 */
const getToggleBackgroundColor = (toggled: boolean): string =>
  toggled ? 'bg-neutral-100 dark:bg-neutral-300' : 'bg-neutral-700 dark:bg-neutral-300'

/**
 * Get toggle component border color
 */
const getBorderColor = (toggled: boolean): string =>
  toggled ? 'border-neutral-100' : 'border-neutral-500 dark:border-neutral-100'

/**
 * Get toggle label text color
 */
const getLabelColor = (toggled: boolean): string =>
  toggled ? 'text-neutral-600' : 'text-neutral-100 dark:text-neutral-600'

/**
 * Get toggle circle element position based on/off status
 */
const getPosition = (toggled: boolean): string => (toggled ? 'translate-x-5' : 'translate-x-0')

/**
 * Get different cursor based on disabled status
 */
const getCursor = (disabled: boolean): string => (disabled ? 'cursor-auto' : 'cursor-pointer')

/**
 * Get inner, outer, label styles of toggle component
 * @param toggled on/off status of toggle
 * @param disabled disabled status
 * @param className additional styles
 * @returns string array of toggle component styles
 */
export const getClassNames = (
  toggled: boolean,
  hovered: boolean,
  disabled: boolean,
  className: string | undefined
): string[] => {
  const outerClassName = classNames(
    getToggleBackgroundColor(toggled),
    getBorderColor(toggled),
    getCursor(disabled),
    'relative inline-flex h-6 w-11 items-center rounded-xl border shadow p-0.5',
    className
  )

  const innerClassName = classNames(
    getPosition(toggled),
    getToggleColor(toggled, disabled, hovered),
    'inline-block h-5 w-5 transform rounded-full transition'
  )

  const groupClassName = classNames('flex items-center', disabled && 'opacity-40')

  const labelClassName = classNames('m-1', getLabelColor(toggled))

  return [outerClassName, innerClassName, groupClassName, labelClassName]
}
