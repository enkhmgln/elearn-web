import "server-only"

import { cache } from "react"
import { cookies } from "next/headers"
import { parseSessionCookie, SESSION_COOKIE } from "./cookie"

export const getServerSession = cache(async () => {
  const cookieStore = await cookies()

  return parseSessionCookie(cookieStore.get(SESSION_COOKIE)?.value)
})
