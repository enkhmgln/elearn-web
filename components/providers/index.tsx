"use client"

import { type ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { bindSessionAuth } from "@/lib/session"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"

bindSessionAuth()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
