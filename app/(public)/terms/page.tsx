import type { Metadata } from "next"
import { TermsView } from "@/features/common"

export const metadata: Metadata = {
  title: "Үйлчилгээний нөхцөл",
}

export default function TermsPage() {
  return <TermsView />
}
