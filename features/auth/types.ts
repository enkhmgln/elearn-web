import type { User } from "@/features/user"

export type TokenPair = {
  token: string
  expires_at: string
}

export type Session = {
  access: TokenPair
  refresh: TokenPair
}

export type AuthResult = {
  session: Session
  user: User
}

export const OtpPurpose = {
  Register: { value: 1, label: "Бүртгүүлэх" },
  ResetPassword: { value: 2, label: "Нууц үг сэргээх" },
  ChangeEmail: { value: 3, label: "Имэйл солих" },
  ChangePhone: { value: 4, label: "Утас солих" },
} as const

export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose]["value"]

export type LoginBody = {
  email: string
  password: string
  fcm_token: string
  device_id: string
}

export type SignupBody = {
  token: string
  password: string
  first_name: string
  last_name: string
  phone: string
  fcm_token: string
  device_id: string
}

export type SendOtpBody = {
  email: string
  type: OtpPurpose
}

export type VerifyOtpBody = {
  token: string
  code: string
}

export type ResetPasswordBody = {
  token: string
  password: string
}

export type ChangePasswordBody = {
  current_password: string
  password: string
}

export type ChangeEmailBody = {
  token: string
}

export type RefreshBody = {
  refresh: string
}
