import Image from "next/image"
import Link from "next/link"
import { constants } from "@/lib/constants"
import { AccountMenu } from "./account"

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.svg"
            alt=""
            width={36}
            height={36}
            loading="eager"
          />
          <p className="font-heading text-lg font-semibold tracking-tight">
            {constants.APP_NAME}
          </p>
        </Link>
        <div className="flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}

export { Navbar }
