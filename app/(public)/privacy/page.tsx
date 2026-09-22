import type { Metadata } from "next"
import { PrivacyView } from "@/features/common"

export const metadata: Metadata = {
  title: "Нууцлалын бодлого",
}

export default function PrivacyPage() {
  return <PrivacyView />
}
