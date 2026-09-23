"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOutIcon, UserIcon } from "lucide-react"
import { clearSession, useSession } from "@/lib/session"
import { initials } from "@/lib/utils/string"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AccountMenu() {
  const { session } = useSession()
  const router = useRouter()
  const user = session?.user ?? null
  const name = user
    ? [user.last_name, user.first_name].filter(Boolean).join(" ")
    : ""

  function signOut() {
    clearSession()
    router.push("/")
  }

  if (!user) {
    return (
      <>
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href="/signup" />}
          className="font-bold"
        >
          Бүртгүүлэх
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/login" />}
          className="font-bold"
        >
          Нэвтрэх
        </Button>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full" aria-label="Хэрэглэгч">
        <Avatar>
          {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
          <AvatarFallback>{name ? initials(name) : ""}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">{name}</span>
            <span>{user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/profile" />}>
          <UserIcon />
          Профайл
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          <LogOutIcon />
          Гарах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { AccountMenu }
