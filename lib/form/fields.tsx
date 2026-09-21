"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import type { AnyFieldApi } from "@tanstack/react-form"
import { cn } from "cn"
import { useFormContext } from "@/lib/form/form"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import {
  Field as FieldRoot,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { InputOTP } from "@/components/ui/input-otp"
import { RadioGroup } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

type FieldMeta = {
  id: string
  isInvalid: boolean
  disabled: boolean
}

type Binder = {
  defaultValue?: unknown
  props: (field: AnyFieldApi, meta: FieldMeta) => Record<string, unknown>
}

const binders = new Map<unknown, Binder>()

function bindText(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    name: field.name,
    value: String(field.state.value ?? ""),
    disabled: meta.disabled,
    "aria-invalid": meta.isInvalid,
    onBlur: field.handleBlur,
    onChange: (event: { target: { value: string } }) => {
      field.handleChange(event.target.value)
    },
  }
}

function bindChecked(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    name: field.name,
    checked: field.state.value === true,
    disabled: meta.disabled,
    onCheckedChange: (checked: boolean) => {
      field.handleChange(checked === true)
    },
  }
}

function bindSelect(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    name: field.name,
    value: field.state.value ?? null,
    disabled: meta.disabled,
    onValueChange: (value: unknown) => {
      field.handleChange(value)
    },
  }
}

function bindChoice(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    name: field.name,
    value: field.state.value ?? "",
    disabled: meta.disabled,
    onValueChange: (value: unknown) => {
      field.handleChange(value)
    },
  }
}

function bindDate(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    value: field.state.value,
    disabled: meta.disabled,
    onChange: (value: unknown) => {
      field.handleChange(value)
    },
  }
}

function bindOtp(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    name: field.name,
    value: String(field.state.value ?? ""),
    disabled: meta.disabled,
    onChange: (value: string) => {
      field.handleChange(value)
    },
  }
}

function bindSlider(field: AnyFieldApi, meta: FieldMeta) {
  return {
    id: meta.id,
    name: field.name,
    value: field.state.value,
    disabled: meta.disabled,
    onValueChange: (value: unknown) => {
      field.handleChange(value)
    },
  }
}

binders.set(Input, { defaultValue: "", props: bindText })
binders.set(InputGroupInput, { defaultValue: "", props: bindText })
binders.set(InputGroupTextarea, { defaultValue: "", props: bindText })
binders.set(Textarea, { defaultValue: "", props: bindText })
binders.set(Checkbox, { defaultValue: false, props: bindChecked })
binders.set(Switch, { defaultValue: false, props: bindChecked })
binders.set(Select, { defaultValue: null, props: bindSelect })
binders.set(RadioGroup, { defaultValue: "", props: bindChoice })
binders.set(DatePicker, { props: bindDate })
binders.set(DateRangePicker, { props: bindDate })
binders.set(InputOTP, { defaultValue: "", props: bindOtp })
binders.set(Slider, { props: bindSlider })

function findBinder(node: ReactNode): Binder | undefined {
  if (!isValidElement(node)) {
    return undefined
  }

  const binder = binders.get(node.type)

  if (binder) {
    return binder
  }

  let found: Binder | undefined

  Children.forEach(
    (node.props as { children?: ReactNode }).children,
    (child) => {
      if (found) {
        return
      }

      found = findBinder(child)
    }
  )

  return found
}

function bindNode(
  node: ReactNode,
  field: AnyFieldApi,
  meta: FieldMeta
): ReactNode {
  if (!isValidElement(node)) {
    return node
  }

  const binder = binders.get(node.type)

  if (binder) {
    const childDisabled = Boolean(
      (node.props as { disabled?: boolean }).disabled
    )

    return cloneElement(
      node as ReactElement,
      {
        ...binder.props(field, meta),
        disabled: childDisabled || meta.disabled,
      } as never
    )
  }

  const nested = (node.props as { children?: ReactNode }).children

  if (nested == null) {
    return node
  }

  return cloneElement(
    node as ReactElement,
    {
      children: Children.map(nested, (child) => bindNode(child, field, meta)),
    } as never
  )
}

function Field({
  name,
  label,
  labelHidden = false,
  orientation = "vertical",
  defaultValue,
  id,
  disabled,
  children,
}: {
  name: string
  label?: string
  labelHidden?: boolean
  orientation?: "vertical" | "horizontal"
  defaultValue?: unknown
  id?: string
  disabled?: boolean
  children: ReactElement
}) {
  const { form, disabled: formDisabled } = useFormContext()
  const binder = findBinder(children)

  if (!binder) {
    throw new Error(`Field "${name}" has no bindable control.`)
  }

  const resolvedDefault =
    defaultValue !== undefined ? defaultValue : binder.defaultValue
  const fieldDefault =
    resolvedDefault !== undefined && form.getFieldValue(name) === undefined
      ? resolvedDefault
      : undefined

  return (
    <form.Field name={name} defaultValue={fieldDefault}>
      {(field) => {
        const isInvalid = field.state.meta.errors.length > 0
        const meta: FieldMeta = {
          id: id ?? field.name,
          isInvalid,
          disabled: disabled ?? formDisabled,
        }
        const control = bindNode(children, field, meta)

        const labelNode = label ? (
          <FieldLabel
            htmlFor={meta.id}
            className={cn(
              labelHidden ? "sr-only" : undefined,
              orientation === "horizontal"
                ? "font-normal text-muted-foreground"
                : undefined
            )}
          >
            {label}
          </FieldLabel>
        ) : null

        return (
          <FieldRoot
            orientation={orientation}
            data-invalid={isInvalid}
            data-disabled={meta.disabled ? true : undefined}
          >
            {orientation === "horizontal" ? (
              <>
                {control}
                {labelNode}
              </>
            ) : (
              <>
                {labelNode}
                {control}
              </>
            )}
            {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
          </FieldRoot>
        )
      }}
    </form.Field>
  )
}

export { Field }
