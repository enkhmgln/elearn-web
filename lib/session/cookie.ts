import type { User } from "@/features/user/types"
import { isPast, parseDate } from "@/lib/utils/date"
import { isPlainObject } from "@/lib/utils/object"
import { parseCookieValue, removeCookie, setCookie } from "@/lib/utils/cookie"

export const SESSION_COOKIE = "session"

export type SessionCookie = {
  user: User
  refresh_expires_at: string
}

export function parseSessionCookie(value: string | undefined | null) {
  if (!value) {
    return null
  }

  const parsed = asSessionCookie(parseCookieValue(value))

  if (!parsed || !parseDate(parsed.refresh_expires_at)) {
    return null
  }

  if (isPast(parsed.refresh_expires_at)) {
    return null
  }

  return parsed
}

export function writeSessionCookie(
  user: User | null,
  refreshExpiresAt: string
) {
  const expires = parseDate(refreshExpiresAt)

  if (!user || !expires || isPast(expires)) {
    removeCookie(SESSION_COOKIE)
    return
  }

  const maxAge = Math.floor((expires.getTime() - Date.now()) / 1000)

  if (maxAge <= 0) {
    removeCookie(SESSION_COOKIE)
    return
  }

  setCookie(
    SESSION_COOKIE,
    {
      user,
      refresh_expires_at: refreshExpiresAt,
    } satisfies SessionCookie,
    { maxAge }
  )
}

function asSessionCookie(value: unknown): SessionCookie | null {
  if (!isPlainObject(value)) {
    return null
  }

  if (
    typeof value.refresh_expires_at !== "string" ||
    !isPlainObject(value.user)
  ) {
    return null
  }

  return value as SessionCookie
}
