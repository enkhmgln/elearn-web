"use client"

import {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import type { SessionCookie } from "./cookie"
import { getSnapshot, subscribeSession, type SessionState } from "./store"

const SessionContext = createContext<SessionCookie | null>(null)

function SessionProvider({
  session,
  children,
}: {
  session: SessionCookie | null
  children: ReactNode
}) {
  const snapshot = useRef(session)
  const currentId = snapshot.current ? snapshot.current.user.id : null
  const nextId = session ? session.user.id : null

  if (currentId !== nextId) {
    snapshot.current = session
  }

  return (
    <SessionContext.Provider value={snapshot.current}>
      {children}
    </SessionContext.Provider>
  )
}

let cachedSession: SessionCookie | null = null
let cachedSnapshot: SessionState | null = null

function serverSession(session: SessionCookie | null) {
  if (cachedSession === session) {
    return cachedSnapshot
  }

  cachedSession = session
  cachedSnapshot = session ? ({ user: session.user } as SessionState) : null
  return cachedSnapshot
}

function useSession() {
  const serverSessionValue = useContext(SessionContext)
  const session = useSyncExternalStore(subscribeSession, getSnapshot, () =>
    serverSession(serverSessionValue)
  )

  return { session }
}

export { SessionProvider, useSession }
