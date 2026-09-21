"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { LoginBanner } from "./banner"
import { LoginForm } from "./form"

function LoginView() {
  return (
    <div className="flex min-h-svh bg-background px-4 py-3 lg:h-svh lg:px-6 lg:py-4">
      <div className="hidden min-w-0 flex-5 lg:flex xl:flex-6">
        <LoginBanner />
      </div>
      <div className="relative flex min-w-0 flex-3 flex-col">
        <div className="absolute top-2 right-2 lg:top-0 lg:right-0">
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-16 lg:py-0">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={isDark ? "Цайвар горим" : "Харанхуй горим"}
      onClick={() => {
        setTheme(isDark ? "light" : "dark")
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export { LoginView }
