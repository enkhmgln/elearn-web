"use client"

import { useId } from "react"
import { cn } from "cn"

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string
}

function Textarea({
  className,
  label,
  placeholder,
  id,
  ...props
}: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  if (!label) {
    return (
      <textarea
        id={id}
        placeholder={placeholder}
        data-slot="textarea"
        className={cn(
          "flex field-sizing-content min-h-16 w-full resize-none rounded-lg border border-border bg-background px-3.5 py-3 text-base font-normal transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:aria-invalid:border-destructive/50",
          className
        )}
        {...props}
      />
    )
  }

  const hint = placeholder && placeholder !== " " ? placeholder : undefined

  return (
    <div className="relative w-full">
      <textarea
        id={textareaId}
        placeholder={hint ?? " "}
        data-slot="textarea"
        className={cn(
          "peer flex field-sizing-content min-h-20 w-full resize-none rounded-lg border border-border bg-background px-3.5 pt-6 pb-2 text-base font-normal transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:aria-invalid:border-destructive/50",
          hint
            ? "placeholder:opacity-0 focus:placeholder:opacity-100"
            : undefined,
          className
        )}
        {...props}
      />
      <label
        htmlFor={textareaId}
        className="pointer-events-none absolute top-3.5 left-3.5 z-10 origin-left text-base text-muted-foreground transition-[top,font-size] duration-200 ease-out peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-xs peer-disabled:opacity-50 peer-aria-invalid:text-destructive md:text-sm"
      >
        {label}
      </label>
    </div>
  )
}

export { Textarea }
export type { TextareaProps }
