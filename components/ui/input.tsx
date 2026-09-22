"use client"

import { useId, useState } from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const inputClassName =
  "w-full min-w-0 rounded-lg border border-border bg-background px-3.5 text-base font-normal transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

const floatLabelClassName =
  "pointer-events-none absolute top-1/2 left-3.5 z-10 origin-left -translate-y-1/2 text-base text-muted-foreground transition-[top,transform,font-size] duration-200 ease-out md:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-disabled:opacity-50"

type InputProps = React.ComponentProps<"input"> & {
  label?: string
}

function FloatLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className={floatLabelClassName}>
      {children}
    </label>
  )
}

function PasswordInput({
  className,
  label,
  placeholder,
  id,
  disabled,
  ...props
}: Omit<InputProps, "type">) {
  const [visible, setVisible] = useState(false)
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hint = placeholder && placeholder !== " " ? placeholder : undefined

  return (
    <div className="relative w-full">
      <InputPrimitive
        {...props}
        id={inputId}
        disabled={disabled}
        type={visible ? "text" : "password"}
        placeholder={label ? (hint ?? " ") : placeholder}
        data-slot="input"
        className={cn(
          inputClassName,
          "peer pr-11",
          label ? "h-14 pt-5 pb-1.5" : "h-10 py-1",
          label && hint
            ? "placeholder:opacity-0 focus:placeholder:opacity-100"
            : undefined,
          className
        )}
      />
      {label ? <FloatLabel htmlFor={inputId}>{label}</FloatLabel> : null}
      <Button
        type="button"
        size="icon-xs"
        variant="ghost"
        aria-label={visible ? "Нууц үг нуух" : "Нууц үг харуулах"}
        disabled={disabled}
        className="absolute top-1/2 right-2 z-20 -translate-y-1/2"
        onClick={() => {
          setVisible((current) => !current)
        }}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
}

function Input({
  className,
  type,
  label,
  placeholder,
  id,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  if (type === "password") {
    return (
      <PasswordInput
        className={className}
        label={label}
        placeholder={placeholder}
        id={inputId}
        {...props}
      />
    )
  }

  if (!label) {
    return (
      <InputPrimitive
        type={type}
        id={id}
        placeholder={placeholder}
        data-slot="input"
        className={cn(inputClassName, "h-10 py-1", className)}
        {...props}
      />
    )
  }

  const hint = placeholder && placeholder !== " " ? placeholder : undefined

  return (
    <div className="relative w-full">
      <InputPrimitive
        type={type}
        id={inputId}
        placeholder={hint ?? " "}
        data-slot="input"
        className={cn(
          inputClassName,
          "peer h-14 pt-5 pb-1.5",
          hint
            ? "placeholder:opacity-0 focus:placeholder:opacity-100"
            : undefined,
          className
        )}
        {...props}
      />
      <FloatLabel htmlFor={inputId}>{label}</FloatLabel>
    </div>
  )
}

export { Input }
export type { InputProps }
