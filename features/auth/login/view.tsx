"use client"

import { Fragment } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LoginBanner } from "./banner"
import { LoginForm } from "./form"

const legalLinks = [
  { href: "/faq", label: "Түгээмэл асуулт" },
  { href: "/terms", label: "Үйлчилгээний нөхцөл" },
  { href: "/privacy", label: "Нууцлалын бодлого" },
] as const

function LoginView() {
  return (
    <div className="flex min-h-svh px-4 py-3 lg:h-svh lg:px-6 lg:py-4">
      <div className="hidden min-w-0 flex-5 lg:block xl:flex-6">
        <LoginBanner />
      </div>
      <div className="grid min-w-0 flex-3 grid-rows-[1fr_auto_1fr] px-6">
        <div className="self-start justify-self-end">
          <ThemeToggle />
        </div>
        <LoginForm />
        <nav className="flex items-center justify-center gap-3 self-end py-4">
          {legalLinks.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 ? (
                <Separator orientation="vertical" className="h-4" />
              ) : null}
              <Button
                variant="link"
                nativeButton={false}
                render={<Link href={link.href} />}
                className="h-auto px-0 text-xs font-semibold text-muted-foreground"
              >
                {link.label}
              </Button>
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}

export { LoginView }
