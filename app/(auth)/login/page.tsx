import { Metadata } from "next"
import { LoginView } from "@/features/auth"

export const metadata: Metadata = {
  title: "Нэвтрэх",
}
export default function LoginPage() {
  return <LoginView />
}
