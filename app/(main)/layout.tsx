"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/session"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { session, ready } = useSession()

  useEffect(() => {
    if (ready && !session) {
      router.replace("/login")
    }
  }, [ready, session, router])

  return children
}
