"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

const iconMotion =
  "[animation-delay:-0.3s] motion-reduce:animate-none [[data-theme-motion]_&]:[animation-delay:0s]"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="relative"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }}
    >
      <SunIcon
        className={cn(
          "absolute animate-theme-icon-hide dark:animate-theme-icon-show motion-reduce:scale-0 motion-reduce:dark:scale-100",
          iconMotion
        )}
      />
      <MoonIcon
        className={cn(
          "animate-theme-icon-show dark:animate-theme-icon-hide motion-reduce:dark:scale-0",
          iconMotion
        )}
      />
      <span className="sr-only">Горим солих</span>
    </Button>
  )
}

export { ThemeToggle }
