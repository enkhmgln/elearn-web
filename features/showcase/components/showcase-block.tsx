import { type ReactNode } from "react"

export function ShowcaseBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-heading text-sm font-semibold tracking-tight">
        {title}
      </h3>
      {children}
    </section>
  )
}
