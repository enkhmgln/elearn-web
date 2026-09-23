"use client"

import {
  createContext,
  useContext,
  type ComponentType,
  type ReactNode,
} from "react"
import type { AnyFieldApi } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

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
  pending: boolean
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
  pending = false,
  children,
  ...props
}: React.ComponentProps<"form"> & {
  form: {
    handleSubmit: () => unknown
  }
  disabled?: boolean
  pending?: boolean
}) {
  const isLocked = disabled || pending

  return (
    <FormContext.Provider
      value={{ form: form as FormInstance, disabled: isLocked, pending }}
    >
      <form
        {...props}
        method="post"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()

          if (isLocked) {
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

function SubmitButton({
  children,
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { pending, disabled: formDisabled } = useFormContext()

  return (
    <Button {...props} type="submit" disabled={disabled || formDisabled}>
      {pending ? <Spinner data-icon="inline-start" /> : null}
      {children}
    </Button>
  )
}

export { Form, SubmitButton, useFormContext }
export type { FormInstance }
