import * as React from "react"
import { cn } from "cn"

function BottomNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="bottom-nav"
      className={cn(
        "flex items-stretch border-t border-border bg-background pb-[env(safe-area-inset-bottom)]",
        className
      )}
      {...props}
    />
  )
}

function BottomNavItem({
  className,
  icon: Icon,
  label,
  active = false,
  ...props
}: React.ComponentProps<"button"> & {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="bottom-nav-item"
      data-active={active}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs text-muted-foreground transition-colors",
        "hover:text-foreground data-[active=true]:text-primary",
        "[&_svg]:size-5",
        className
      )}
      {...props}
    >
      <Icon />
      <span>{label}</span>
    </button>
  )
}

export { BottomNav, BottomNavItem }
