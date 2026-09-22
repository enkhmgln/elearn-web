"use client"

import Image from "next/image"
import Link from "next/link"
import { constants } from "@/lib/constants"
import { Button } from "@/components/ui/button"

const columns = {
  main: {
    title: "Үндсэн цэс",
    links: [
      { href: "/about", label: "Бидний тухай" },
      { href: "/contact", label: "Холбоо барих" },
    ],
  },
  help: {
    title: "Тусламж",
    links: [
      { href: "/faq", label: "Түгээмэл асуултууд" },
      { href: "/terms", label: "Үйлчилгээний нөхцөл" },
    ],
  },
} as const

const socials = [
  { href: "https://facebook.com", src: "/icons/facebook.svg" },
  { href: "https://instagram.com", src: "/icons/instagram.svg" },
] as const

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:items-start">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
          <p className="text-2xl font-semibold tracking-tight">
            {constants.APP_NAME}
          </p>
        </div>
        {Object.values(columns).map((column) => (
          <FooterColumn
            key={column.title}
            title={column.title}
            links={column.links}
          />
        ))}
        <div>
          <p className="text-sm font-semibold">Бидэнтэй нэгдээрэй</p>
          <div className="mt-4 flex gap-3">
            {socials.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={social.src} alt="" width={40} height={40} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-8">
          <p className="text-xs text-muted-foreground">
            © {constants.APP_NAME}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <Button
            variant="ghost"
            size="xs"
            className="text-muted-foreground"
            onClick={() => {
              window.scrollTo({ top: 0 })
            }}
          >
            Дээшээ ↑
          </Button>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: readonly { href: string; label: string }[]
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Footer }
