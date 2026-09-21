"use client"

import { useForm as useBaseForm } from "@tanstack/react-form"
import type { z } from "zod"

const EMPTY_VALUES = {} as Record<string, never>

type UseFormProps<TSchema extends z.ZodType> = {
  schema: TSchema
  defaultValues?: z.input<TSchema>
  onSubmit: (props: { value: z.output<TSchema> }) => unknown | Promise<unknown>
}

function useForm<TSchema extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormProps<TSchema>) {
  return useBaseForm({
    defaultValues: (defaultValues ?? EMPTY_VALUES) as z.input<TSchema>,
    validators: {
      onSubmit: schema as never,
    },
    onSubmit({ value }) {
      return onSubmit({ value: schema.parse(value) })
    },
  })
}

export { useForm }
export type { UseFormProps }
