import { parseJson } from "./object"

function store() {
  if (typeof window === "undefined") {
    return null
  }

  return window.localStorage
}

export function getStorage<T>(key: string): T | null {
  const storage = store()

  if (!storage) {
    return null
  }

  const value = storage.getItem(key)

  if (value == null) {
    return null
  }

  const parsed = parseJson(value)

  if (parsed == null) {
    return null
  }

  return parsed as T
}

export function getStorageOr<T>(key: string, fallback: T) {
  return getStorage<T>(key) ?? fallback
}

export function setStorage<T>(key: string, value: T) {
  store()?.setItem(key, JSON.stringify(value))
}

export function removeStorage(key: string) {
  store()?.removeItem(key)
}

export function hasStorage(key: string) {
  return store()?.getItem(key) != null
}
