import type { AuthResult, Session } from "@/features/auth/types"
import type { User } from "@/features/user/types"
import { hasCookie, removeCookie } from "@/lib/utils/cookie"
import { isPast, parseDate } from "@/lib/utils/date"
import { getStorage, removeStorage, setStorage } from "@/lib/utils/storage"
import { SESSION_COOKIE, writeSessionCookie } from "./cookie"

const KEY = "session"

export type SessionState = Session & {
  user: User | null
}

let current: SessionState | null | undefined
let didSyncCookie = false
const listeners = new Set<() => void>()

export function getSession() {
  return read()
}

export function getSnapshot() {
  return read()
}

export function setSession({ session, user }: AuthResult) {
  save({
    ...session,
    user,
  })
}

export function setToken(session: Session) {
  const previous = read()

  save({
    ...session,
    user: previous?.user ?? null,
  })
}

export function setUser(user: User) {
  const previous = read()

  if (!previous) {
    return
  }

  save({
    ...previous,
    user,
  })
}

export function clearSession() {
  current = null
  removeStorage(KEY)
  removeCookie(SESSION_COOKIE)
  emit()
}

export function syncSessionCookie() {
  if (didSyncCookie) {
    return false
  }

  didSyncCookie = true

  const session = getSession()
  const expires = session ? parseDate(session.refresh.expires_at) : null

  if (
    !session?.user ||
    !expires ||
    isPast(expires) ||
    hasCookie(SESSION_COOKIE)
  ) {
    return false
  }

  writeSessionCookie(session.user, session.refresh.expires_at)
  return true
}

export function subscribeSession(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function save(session: SessionState) {
  current = session
  setStorage(KEY, session)
  writeSessionCookie(session.user, session.refresh.expires_at)
  emit()
}

function read() {
  if (current !== undefined) {
    return current
  }

  current = getStorage<SessionState>(KEY)
  return current
}

function emit() {
  for (const listener of listeners) {
    listener()
  }
}
