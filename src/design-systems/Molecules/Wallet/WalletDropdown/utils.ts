import { WalletDropdownOptionsProps } from './interface'

export const getClassNames = (className?: string) => {
  return ['bg-light dark:bg-dark inline-flex w-full items-center rounded-full px-2 py-2', className].join(' ')
}

export const getDropdownOptionClasses = (selectedOpt: WalletDropdownOptionsProps | null, address: string) => {
  if (selectedOpt && selectedOpt.walletAddress.toLowerCase() == address.toLowerCase())
    return 'bg-neutral-700 dark:bg-neutral-200 flex justify-between items-center px-2 py-2.5 rounded hover:bg-neutral-700 dark:hover:bg-neutral-200 hover:rounded'
  else
    return 'bg-neutral-600 dark:bg-neutral-100 px-2 py-2.5 hover:bg-neutral-700 dark:hover:bg-neutral-200 hover:rounded'
}

export const getSelectedOption = (options: WalletDropdownOptionsProps[], value: string) => {
  const selectedIndex = value
    ? options.findIndex((obj: WalletDropdownOptionsProps) => {
        return obj.walletAddress.toLowerCase() === value.toLowerCase()
      })
    : -1
  return selectedIndex !== -1 ? options[selectedIndex] : null
}
