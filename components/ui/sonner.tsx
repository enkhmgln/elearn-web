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

import { cn } from "cn"

function StatusIcon({
  icon: Icon,
  className,
}: {
  icon: typeof CircleCheckIcon
  className: string
}) {
  return (
    <span
      className={cn(
        "flex size-5 items-center justify-center rounded-full",
        className
      )}
    >
      <Icon />
    </span>
  )
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
        success: (
          <StatusIcon
            icon={CircleCheckIcon}
            className="bg-success/15 text-success"
          />
        ),
        error: (
          <StatusIcon
            icon={CircleXIcon}
            className="bg-destructive/15 text-destructive"
          />
        ),
        warning: (
          <StatusIcon
            icon={CircleAlertIcon}
            className="bg-warning/15 text-warning"
          />
        ),
        info: (
          <StatusIcon icon={InfoIcon} className="bg-primary/15 text-primary" />
        ),
        loading: <Loader2Icon className="animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { toast, Toaster }
