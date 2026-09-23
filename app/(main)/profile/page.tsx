import type { Metadata } from "next"
import { ProfileView } from "@/features/user"

export const metadata: Metadata = {
  title: "Профайл",
}

export default function ProfilePage() {
  return <ProfileView />
}
