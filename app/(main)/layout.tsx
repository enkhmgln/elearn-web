import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/session/server"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return children
}
