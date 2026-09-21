"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ComponentsSection } from "./components-section"
import { TokensSection } from "./tokens-section"
import { TypographySection } from "./typography-section"

export const SECTIONS = [
  { id: "colors", label: "Өнгө" },
  { id: "type", label: "Үсэг" },
  { id: "actions", label: "Үйлдэл" },
  { id: "feedback", label: "Хариу" },
  { id: "forms", label: "Форм" },
  { id: "surfaces", label: "Гадаргуу" },
  { id: "overlays", label: "Давхарга" },
  { id: "nav", label: "Навигаци" },
] as const

export function ShowcasePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex min-w-0 flex-col">
            <p className="font-heading text-lg font-semibold tracking-tight">
              Edu
            </p>
            <p className="truncate text-sm text-muted-foreground">
              Дизайн систем
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-10 px-4 py-8 md:px-8 lg:py-12">
        <nav
          aria-label="Хэсгүүд"
          className="sticky top-24 hidden h-fit w-40 shrink-0 lg:flex lg:flex-col lg:gap-1"
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-14">
          <nav
            aria-label="Хэсгүүд"
            className="flex gap-2 overflow-x-auto lg:hidden"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </nav>

          <TokensSection />
          <Separator />
          <TypographySection />
          <Separator />
          <ComponentsSection />
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
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
