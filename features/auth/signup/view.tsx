"use client"

import { useState } from "react"
import Link from "next/link"
import { sendOtp, signup, verifyOtp } from "@/features/auth/api"
import { OtpPurpose } from "@/features/auth/types"
import { Field, Form, SubmitButton, useForm } from "@/lib/form"
import { useMutation } from "@/lib/http"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { toast } from "@/components/ui/sonner"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  signupCodeSchema,
  signupEmailSchema,
  signupProfileSchema,
} from "./schema"

const inputClassName = "border-transparent bg-muted"

function SignupEmailForm({
  onSent,
}: {
  onSent: (email: string, token: string) => void
}) {
  const { mutate, isPending } = useMutation(sendOtp, {
    onSuccess(token, variables) {
      onSent(variables.email, token)
    },
  })
  const form = useForm({
    schema: signupEmailSchema,
    onSubmit({ value }) {
      mutate({
        email: value.email,
        type: OtpPurpose.Register.value,
      })
    },
  })

  return (
    <Form form={form} pending={isPending} className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Бүртгүүлэх</h1>
      <FieldGroup className="gap-4">
        <Field name="email">
          <Input
            type="email"
            label="Имэйл хаяг"
            autoComplete="email"
            className={inputClassName}
          />
        </Field>
        <SubmitButton size="lg" className="mt-1 w-full">
          Үргэлжлүүлэх
        </SubmitButton>
      </FieldGroup>
    </Form>
  )
}

function SignupCodeForm({
  email,
  token,
  onVerified,
  onChangeEmail,
}: {
  email: string
  token: string
  onVerified: () => void
  onChangeEmail: () => void
}) {
  const { mutate, isPending } = useMutation(verifyOtp, {
    onSuccess() {
      onVerified()
    },
  })
  const form = useForm({
    schema: signupCodeSchema,
    onSubmit({ value }) {
      mutate({
        token,
        code: value.code,
      })
    },
  })

  return (
    <Form form={form} pending={isPending} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Баталгаажуулах</h1>
        <p className="text-sm text-muted-foreground">
          <span className="font-bold">{email}</span> хаяг руу илгээсэн 6 оронтой
          код оруулна уу.
        </p>
      </div>
      <FieldGroup className="gap-4">
        <Field name="code">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="grid w-full grid-cols-6 gap-2">
              <InputOTPSlot className="aspect-square w-full" index={0} />
              <InputOTPSlot className="aspect-square w-full" index={1} />
              <InputOTPSlot className="aspect-square w-full" index={2} />
              <InputOTPSlot className="aspect-square w-full" index={3} />
              <InputOTPSlot className="aspect-square w-full" index={4} />
              <InputOTPSlot className="aspect-square w-full" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
        <SubmitButton size="lg" className="mt-1 w-full">
          Баталгаажуулах
        </SubmitButton>
      </FieldGroup>
      <Button
        type="button"
        variant="link"
        className="h-auto px-0"
        onClick={onChangeEmail}
      >
        Имэйл солих
      </Button>
    </Form>
  )
}

function SignupProfileForm({ token }: { token: string }) {
  const { mutate, isPending } = useMutation(signup, {
    onSuccess() {
      toast.success("Бүртгэл амжилттай.")
    },
  })
  const form = useForm({
    schema: signupProfileSchema,
    onSubmit({ value }) {
      mutate({
        token,
        password: value.password,
        first_name: value.first_name,
        last_name: value.last_name,
        phone: value.phone,
        fcm_token: "",
        device_id: "",
      })
    },
  })

  return (
    <Form form={form} pending={isPending} className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Бүртгэл дуусгах</h1>
      <FieldGroup className="gap-4">
        <Field name="last_name">
          <Input
            label="Овог"
            autoComplete="family-name"
            className={inputClassName}
          />
        </Field>
        <Field name="first_name">
          <Input
            label="Нэр"
            autoComplete="given-name"
            className={inputClassName}
          />
        </Field>
        <Field name="phone">
          <Input
            type="tel"
            label="Утасны дугаар"
            autoComplete="tel"
            className={inputClassName}
          />
        </Field>
        <Field name="password">
          <Input
            type="password"
            label="Нууц үг"
            autoComplete="new-password"
            className={inputClassName}
          />
        </Field>
        <Field name="confirm_password">
          <Input
            type="password"
            label="Нууц үг давтах"
            autoComplete="new-password"
            className={inputClassName}
          />
        </Field>
        <SubmitButton size="lg" className="mt-1 w-full">
          Бүртгүүлэх
        </SubmitButton>
      </FieldGroup>
    </Form>
  )
}

type SignupState = {
  step: "email" | "code" | "profile"
  email: string
  token: string
}

function SignupView() {
  const [signup, setSignup] = useState<SignupState>({
    step: "email",
    email: "",
    token: "",
  })

  const forms = {
    email: (
      <SignupEmailForm
        onSent={(email, token) => {
          setSignup({ step: "code", email, token })
        }}
      />
    ),
    code: (
      <SignupCodeForm
        email={signup.email}
        token={signup.token}
        onVerified={() => {
          setSignup((current) => ({ ...current, step: "profile" }))
        }}
        onChangeEmail={() => {
          setSignup((current) => ({ ...current, step: "email" }))
        }}
      />
    ),
    profile: <SignupProfileForm token={signup.token} />,
  }

  return (
    <div className="mx-auto flex w-full max-w-88 flex-col gap-6">
      {forms[signup.step]}
      <p className="text-center text-muted-foreground">
        Бүртгэлтэй юу?{" "}
        <Button
          variant="link"
          nativeButton={false}
          render={<Link href="/login" />}
          className="h-auto px-0"
        >
          Нэвтрэх
        </Button>
      </p>
    </div>
  )
}

export { SignupView }
