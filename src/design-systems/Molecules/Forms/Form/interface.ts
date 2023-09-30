import { Control, FieldValues } from 'react-hook-form'
import { LegacyRef } from 'react'
import type { PropsWithChildren } from 'react'

import type { TextAreaProps } from 'design-systems/Atoms/TextArea'
import type { InputProps } from 'design-systems/Atoms/Input'

/**
 * `primary` is squared & only bottom bordered input
 * `secondary` is rounded & bordered input
 * `fill` is rounded & bordered & backgrounded input
 */

export type FormRulesType = {
  minLength: { value: number; message: string }
}

export type FormInputProps = Modify<
  InputProps,
  {
    innerClassName?: string

    inputRef?: LegacyRef<HTMLInputElement> | undefined
    control?: Control
    error?: string
    rules?: Object
  }
>

export type FormTextAreaProps = Modify<
  TextAreaProps,
  {
    innerClassName?: string

    inputRef?: LegacyRef<HTMLTextAreaElement> | undefined
    control?: Control
  }
>

export interface FormProps extends PropsWithChildren {
  className?: string
  defaultValues?: any
  onSubmit: (data: FieldValues) => void
}
