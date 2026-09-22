"use client"

import type { CSSProperties } from "react"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast, Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="text-success" />,
        error: <CircleXIcon className="text-destructive" />,
        warning: <CircleAlertIcon className="text-warning" />,
        info: <InfoIcon className="text-primary" />,
        loading: <Loader2Icon className="animate-spin" />,
      }}
      richColors
      style={
        {
          "--success-text": "var(--foreground)",
          "--error-text": "var(--foreground)",
          "--warning-text": "var(--foreground)",
          "--info-text": "var(--foreground)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { toast, Toaster }
