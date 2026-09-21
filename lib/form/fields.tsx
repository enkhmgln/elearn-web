"use client"

import { useState, type ReactNode } from "react"
import type { AnyFieldApi } from "@tanstack/react-form"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { useFormContext } from "@/lib/form/form"
import { Checkbox as CheckboxControl } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

function BoundField({
  name,
  defaultValue,
  orientation = "vertical",
  children,
}: {
  name: string
  defaultValue?: unknown
  orientation?: "vertical" | "horizontal"
  children: (
    field: AnyFieldApi,
    meta: {
      id: string
      isInvalid: boolean
      disabled: boolean
    }
  ) => ReactNode
}) {
  const { form, disabled } = useFormContext()
  const fieldDefault =
    defaultValue !== undefined && form.getFieldValue(name) === undefined
      ? defaultValue
      : undefined

  return (
    <form.Field name={name} defaultValue={fieldDefault}>
      {(field) => {
        const isInvalid = field.state.meta.errors.length > 0

        return (
          <Field
            orientation={orientation}
            data-invalid={isInvalid}
            data-disabled={disabled ? true : undefined}
          >
            {children(field, {
              id: field.name,
              isInvalid,
              disabled,
            })}
            {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
          </Field>
        )
      }}
    </form.Field>
  )
}

function TextField({
  name,
  label,
  labelHidden = false,
  id,
  type,
  className,
  disabled,
  ...props
}: {
  name: string
  label?: string
  labelHidden?: boolean
} & Omit<
  React.ComponentProps<typeof Input>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur"
>) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"

  return (
    <BoundField name={name} defaultValue="">
      {(field, meta) => {
        const fieldId = id ?? meta.id
        const fieldDisabled = disabled ?? meta.disabled
        const value = String(field.state.value ?? "")

        return (
          <>
            {label ? (
              <FieldLabel
                htmlFor={fieldId}
                className={labelHidden ? "sr-only" : undefined}
              >
                {label}
              </FieldLabel>
            ) : null}
            {isPassword ? (
              <InputGroup className={className}>
                <InputGroupInput
                  {...props}
                  id={fieldId}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={value}
                  disabled={fieldDisabled}
                  aria-invalid={meta.isInvalid}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    aria-label={
                      showPassword ? "Нууц үг нуух" : "Нууц үг харуулах"
                    }
                    disabled={fieldDisabled}
                    onClick={() => {
                      setShowPassword((current) => !current)
                    }}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            ) : (
              <Input
                {...props}
                id={fieldId}
                name={field.name}
                type={type}
                value={value}
                disabled={fieldDisabled}
                aria-invalid={meta.isInvalid}
                className={className}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value)
                }}
              />
            )}
          </>
        )
      }}
    </BoundField>
  )
}

function Checkbox({
  name,
  label,
  id,
  disabled,
}: {
  name: string
  label: string
  id?: string
  disabled?: boolean
}) {
  return (
    <BoundField name={name} defaultValue={false} orientation="horizontal">
      {(field, meta) => {
        const fieldId = id ?? meta.id
        const fieldDisabled = disabled ?? meta.disabled

        return (
          <>
            <CheckboxControl
              id={fieldId}
              name={field.name}
              checked={field.state.value === true}
              disabled={fieldDisabled}
              onCheckedChange={(checked) => {
                field.handleChange(checked === true)
              }}
            />
            <FieldLabel
              htmlFor={fieldId}
              className="font-normal text-muted-foreground"
            >
              {label}
            </FieldLabel>
          </>
        )
      }}
    </BoundField>
  )
}

export { Checkbox, TextField }
