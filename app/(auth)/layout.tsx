import Image from "next/image"
import Link from "next/link"
import { AuthBanner } from "@/features/auth/banner"
import { constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const legalLinks = [
  { href: "/faq", label: "Түгээмэл асуулт" },
  { href: "/terms", label: "Үйлчилгээний нөхцөл" },
  { href: "/privacy", label: "Нууцлалын бодлого" },
] as const

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh px-4 py-3 lg:h-svh lg:px-6 lg:py-4">
      <div className="hidden min-w-0 flex-5 lg:block xl:flex-6">
        <AuthBanner />
      </div>
      <div className="grid min-w-0 flex-3 grid-rows-[1fr_auto_1fr] px-6">
        <div className="flex items-center justify-between self-start">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.svg" alt="" width={36} height={36} />
            <p className="font-heading text-lg font-semibold tracking-tight">
              {constants.APP_NAME}
            </p>
          </Link>
          <ThemeToggle />
        </div>
        {children}
        <nav className="flex items-center justify-center gap-4 self-end py-4">
          {legalLinks.map((link) => (
            <Button
              key={link.href}
              variant="link"
              nativeButton={false}
              render={<Link href={link.href} />}
              className="h-auto px-0 text-xs font-semibold text-muted-foreground"
            >
              {link.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
