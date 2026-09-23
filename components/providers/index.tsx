"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { SessionCookie } from "@/lib/session/cookie"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  bindSessionAuth,
  SessionProvider,
  syncSessionCookie,
} from "@/lib/session"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"

bindSessionAuth()

export function Providers({
  session,
  children,
}: {
  session: SessionCookie | null
  children: ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    if (syncSessionCookie()) {
      router.refresh()
    }
  }, [router])

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
