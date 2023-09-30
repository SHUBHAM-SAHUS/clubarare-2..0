import React, { ChangeEvent } from 'react'
import { StarIcon, ArrowRightIcon } from 'design-systems/Atoms/Icons'
import { Input } from 'design-systems/Atoms/Input'
import { Button } from 'design-systems/Atoms/Button'

interface AIInputProps {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
  onClick: () => void
}

export function AIInput({ value, onChange, onClick, placeholder }: AIInputProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-xs bg-neutral-800 px-2 py-1 dark:bg-neutral-300">
      <StarIcon className="" />
      <Input
        variant="secondary"
        className="grow"
        inputClassName="rounded-none text-xs !px-2 border-none"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
      <Button color="primary" className="rounded-xs !px-1 !py-1" size="small" variant="solid" onClick={onClick}>
        <ArrowRightIcon className="stroke-neutral-800 dark:stroke-neutral-100" />
      </Button>
    </div>
  )
}
