import { z } from "zod"

const signupEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Имэйл оруулна уу.")
    .pipe(z.email("Имэйл буруу байна.")),
})

const signupCodeSchema = z.object({
  code: z.string().length(6, "6 оронтой код оруулна уу."),
})

const signupProfileSchema = z
  .object({
    last_name: z.string().trim().min(1, "Овог оруулна уу."),
    first_name: z.string().trim().min(1, "Нэр оруулна уу."),
    phone: z.string().trim().min(1, "Утасны дугаар оруулна уу."),
    password: z.string().min(1, "Нууц үг оруулна уу."),
    confirm_password: z.string().min(1, "Нууц үг давтана уу."),
  })
  .refine((value) => value.password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Нууц үг таарахгүй байна.",
  })

export { signupCodeSchema, signupEmailSchema, signupProfileSchema }
