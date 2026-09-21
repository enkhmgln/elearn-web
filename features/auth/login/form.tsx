"use client"

import Link from "next/link"
import { login } from "@/features/auth/api"
import { Checkbox, Form, TextField, useForm } from "@/lib/form"
import { useMutation } from "@/lib/http"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/sonner"

import { loginSchema } from "./schema"

function LoginForm() {
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
      disabled={isPending}
      className="flex w-full max-w-88 flex-col gap-6"
    >
      <h1 className="text-3xl font-bold tracking-tight">Нэвтрэх</h1>

      <FieldGroup className="gap-3">
        <TextField
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Нэвтрэх нэр"
          label="Нэвтрэх нэр"
          labelHidden
          className="h-11 border-transparent bg-muted"
        />
        <TextField
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Нууц үг"
          label="Нууц үг"
          labelHidden
          className="h-11 border-transparent bg-muted"
        />
        <Checkbox name="remember" label="Нэвтрэх нэр сануулах" />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : null}
          Нэвтрэх
        </Button>
      </FieldGroup>

      <p className="text-center text-sm text-muted-foreground">
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

export { LoginForm }
