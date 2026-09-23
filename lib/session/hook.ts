"use client"

import { useSyncExternalStore } from "react"
import { getServerSnapshot, getSnapshot, subscribeSession } from "./store"

function subscribe() {
  return () => {}
}

export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}

export function useSession() {
  return useSyncExternalStore(subscribeSession, getSnapshot, getServerSnapshot)
}
