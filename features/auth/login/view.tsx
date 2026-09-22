"use client"

import Link from "next/link"
import { login } from "@/features/auth/api"
import { Field, Form, SubmitButton, useForm } from "@/lib/form"
import { useMutation } from "@/lib/http"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/sonner"
import { loginSchema } from "./schema"

function LoginView() {
  const { mutate, isPending } = useMutation(login, {
    onSuccess() {
      toast.success("Амжилттай.")
    },
  })
  const form = useForm({
    schema: loginSchema,
    onSubmit({ value }) {
      mutate({
        email: value.email,
        password: value.password,
        fcm_token: "",
        device_id: "",
      })
    },
  })

  return (
    <Form
      form={form}
      pending={isPending}
      className="mx-auto flex w-full max-w-88 flex-col gap-6"
    >
      <h1 className="text-3xl font-bold tracking-tight">Нэвтрэх</h1>

      <FieldGroup className="gap-4">
        <Field name="email">
          <Input
            type="email"
            label="Имэйл хаяг"
            autoComplete="email"
            className="border-transparent bg-muted"
          />
        </Field>
        <Field name="password">
          <Input
            type="password"
            label="Нууц үг"
            autoComplete="current-password"
            className="border-transparent bg-muted"
          />
        </Field>
        <div className="flex justify-end">
          <Button
            variant="link"
            nativeButton={false}
            render={<Link href="/reset-password" />}
            className="h-auto px-0 text-sm text-muted-foreground"
          >
            Нууц үг мартсан
          </Button>
        </div>
        <SubmitButton size="lg" className="mt-1 w-full">
          Нэвтрэх
        </SubmitButton>
      </FieldGroup>

      <p className="text-center text-muted-foreground">
        Шинэ хэрэглэгч?{" "}
        <Button
          variant="link"
          nativeButton={false}
          render={<Link href="/signup" />}
          className="h-auto px-0"
        >
          Бүртгүүлэх
        </Button>
      </p>
    </Form>
  )
}

export { LoginView }
