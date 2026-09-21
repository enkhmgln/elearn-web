import { ShowcaseBlock } from "./showcase-block"

const COLOR_TOKENS = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "popover", className: "bg-popover" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "ring", className: "bg-ring" },
  { name: "sidebar", className: "bg-sidebar" },
  { name: "chart-1", className: "bg-chart-1" },
  { name: "chart-2", className: "bg-chart-2" },
  { name: "chart-3", className: "bg-chart-3" },
  { name: "chart-4", className: "bg-chart-4" },
  { name: "chart-5", className: "bg-chart-5" },
] as const

const RADIUS_TOKENS = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "3xl", className: "rounded-3xl" },
  { name: "4xl", className: "rounded-4xl" },
] as const

export function TokensSection() {
  return (
    <section id="colors" className="scroll-mt-24 flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Өнгө
        </h2>
        <p className="text-sm text-muted-foreground">
          Семантик токен. Анги нь `bg-primary` шиг үндсэн нэртэй.
        </p>
      </header>

      <ShowcaseBlock title="Өнгөний токен">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {COLOR_TOKENS.map((token) => (
            <div key={token.name} className="flex flex-col gap-2">
              <div
                className={`h-16 rounded-xl border border-border ${token.className}`}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{token.name}</span>
                <span className="text-xs text-muted-foreground">
                  {token.className}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Радиус">
        <div className="flex flex-wrap items-end gap-4">
          {RADIUS_TOKENS.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-2">
              <div
                className={`size-16 border border-border bg-primary ${token.className}`}
              />
              <span className="text-xs text-muted-foreground">{token.name}</span>
            </div>
          ))}
        </div>
      </ShowcaseBlock>
    </section>
  )
}
