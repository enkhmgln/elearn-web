import type { User } from "@/features/user"
import { defineMutation, HttpMethod } from "@/lib/http"
import type {
  AuthResult,
  ChangeEmailBody,
  ChangePasswordBody,
  LoginBody,
  RefreshBody,
  ResetPasswordBody,
  SendOtpBody,
  Session,
  SignupBody,
  VerifyOtpBody,
} from "./types"

export const login = defineMutation<AuthResult, LoginBody>({
  method: HttpMethod.POST,
  path: "/api/auth/login/",
})

export const signup = defineMutation<AuthResult, SignupBody>({
  method: HttpMethod.POST,
  path: "/api/auth/signup/",
})

export const sendOtp = defineMutation<string, SendOtpBody>({
  method: HttpMethod.POST,
  path: "/api/auth/otp/send/",
})

export const verifyOtp = defineMutation<null, VerifyOtpBody>({
  method: HttpMethod.POST,
  path: "/api/auth/otp/verify/",
})

export const resetPassword = defineMutation<AuthResult, ResetPasswordBody>({
  method: HttpMethod.POST,
  path: "/api/auth/password/reset/",
})

export const changePassword = defineMutation<null, ChangePasswordBody>({
  method: HttpMethod.POST,
  path: "/api/auth/password/change/",
})

export const changeEmail = defineMutation<User, ChangeEmailBody>({
  method: HttpMethod.POST,
  path: "/api/auth/email/change/",
})

export const refresh = defineMutation<Session, RefreshBody>({
  method: HttpMethod.POST,
  path: "/api/auth/refresh/",
})
