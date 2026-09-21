import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Имэйл оруулна уу.")
    .pipe(z.email("Имэйл буруу байна.")),
  password: z.string().min(1, "Нууц үг оруулна уу."),
  remember: z.boolean().default(false),
})

type LoginFormValues = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginFormValues }
