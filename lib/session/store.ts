import type { AuthResult, Session } from "@/features/auth/types"
import type { User } from "@/features/user/types"
import { getStorage, removeStorage, setStorage } from "@/lib/utils/storage"

const KEY = "session"

export type SessionState = Session & {
  user: User | null
}

let current: SessionState | null | undefined
const listeners = new Set<() => void>()

export function getSession() {
  return read()
}

export function getSnapshot() {
  return read()
}

export function getServerSnapshot() {
  return null
}

export function setSession({ session, user }: AuthResult) {
  current = {
    ...session,
    user,
  }
  setStorage(KEY, current)
  emit()
}

export function setToken(session: Session) {
  const previous = read()

  current = {
    ...session,
    user: previous?.user ?? null,
  }
  setStorage(KEY, current)
  emit()
}

export function setUser(user: User) {
  const previous = read()

  if (!previous) {
    return
  }

  current = {
    ...previous,
    user,
  }
  setStorage(KEY, current)
  emit()
}

export function clearSession() {
  current = null
  removeStorage(KEY)
  emit()
}

export function subscribeSession(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
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
