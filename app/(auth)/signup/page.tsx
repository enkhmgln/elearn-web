import { Metadata } from "next"
import { SignupView } from "@/features/auth"

export const metadata: Metadata = {
  title: "Бүртгүүлэх",
}

export default function SignupPage() {
  return <SignupView />
}
