import React from 'react'
import { useForm } from 'react-hook-form'

import { FormProps } from './interface'

/**
 * @deprecated Try use <form></form> tab instead.
 */
export const Form: React.FC<FormProps> = ({ className, defaultValues, children, onSubmit }) => {
  const { handleSubmit, register } = useForm({ defaultValues })

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child
          })
        : children}
    </form>
  )
}
