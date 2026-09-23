"use client"

import { useSession } from "@/lib/session"
import { initials } from "@/lib/utils/string"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ProfileView() {
  const { session } = useSession()

  if (!session?.user) {
    return null
  }

  const { user } = session
  const name = [user.last_name, user.first_name].filter(Boolean).join(" ")

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-6 py-10 md:px-8">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Профайл
      </h1>
      <Avatar size="lg">
        {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
      <dl className="grid gap-4">
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted-foreground">Нэр</dt>
          <dd className="font-medium">{name}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted-foreground">Имэйл</dt>
          <dd className="font-medium">{user.email}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted-foreground">Утас</dt>
          <dd className="font-medium">{user.phone ?? "—"}</dd>
        </div>
      </dl>
    </div>
  )
}

export { ProfileView }
