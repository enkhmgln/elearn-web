import { parseJson } from "./object"

type CookieOptions = {
  maxAge: number
}

export function getCookie<T>(key: string): T | null {
  const value = readCookie(key)

  if (value == null) {
    return null
  }

  const parsed = parseCookieValue(value)

  if (parsed == null) {
    return null
  }

  return parsed as T
}

export function setCookie<T>(key: string, value: T, options: CookieOptions) {
  if (typeof document === "undefined") {
    return
  }

  const encoded = encodeURIComponent(JSON.stringify(value))

  document.cookie = `${key}=${encoded}; ${attributes(options.maxAge)}`
}

export function removeCookie(key: string) {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = `${key}=; ${attributes(0)}`
}

export function hasCookie(key: string) {
  return readCookie(key) != null
}

export function parseCookieValue(value: string) {
  const direct = parseJson(value)

  if (direct != null) {
    return direct
  }

  try {
    return parseJson(decodeURIComponent(value))
  } catch {
    return null
  }
}

function readCookie(key: string) {
  if (typeof document === "undefined") {
    return null
  }

  const part = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`))

  if (!part) {
    return null
  }

  return part.slice(key.length + 1)
}

function attributes(maxAge: number) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""

  return `Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`
}
