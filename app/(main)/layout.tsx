"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useHydrated, useSession } from "@/lib/session"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const session = useSession()
  const ready = useHydrated()

  useEffect(() => {
    if (ready && !session) {
      router.replace("/login")
    }
  }, [ready, session, router])

  if (!ready || !session) {
    return null
  }

  return children
}
