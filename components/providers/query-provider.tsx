"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClientOptions = {
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: 1,
      },
    },
  }

  const [queryClient] = useState(() => new QueryClient(queryClientOptions))

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
