"use client"

import { useSyncExternalStore } from "react"
import { getServerSnapshot, getSnapshot, subscribeSession } from "./store"

function subscribe() {
  return () => {}
}

export function useSession() {
  const session = useSyncExternalStore(
    subscribeSession,
    getSnapshot,
    getServerSnapshot
  )
  const ready = useSyncExternalStore(subscribe, () => true, () => false)

  return { session, ready }
}
