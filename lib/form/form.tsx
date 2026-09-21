"use client"

import {
  createContext,
  useContext,
  type ComponentType,
  type ReactNode,
} from "react"
import type { AnyFieldApi } from "@tanstack/react-form"

type FormInstance = {
  handleSubmit: () => unknown
  getFieldValue: (name: string) => unknown
  Field: ComponentType<{
    name: string
    defaultValue?: unknown
    children: (field: AnyFieldApi) => ReactNode
  }>
}

type FormContextValue = {
  form: FormInstance
  disabled: boolean
}

const FormContext = createContext<FormContextValue | null>(null)

function useFormContext() {
  const value = useContext(FormContext)

  if (!value) {
    throw new Error("Form fields must be rendered inside Form.")
  }

  return value
}

function Form({
  form,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"form"> & {
  form: {
    handleSubmit: () => unknown
  }
  disabled?: boolean
}) {
  return (
    <FormContext.Provider value={{ form: form as FormInstance, disabled }}>
      <form
        {...props}
        noValidate
        onSubmit={(event) => {
          event.preventDefault()

          if (disabled) {
            return
          }

          void form.handleSubmit()
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export { Form, useFormContext }
export type { FormInstance }
