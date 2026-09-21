import { digitsOnly } from "./string"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const REGISTER_MN_RE = /^[А-ЯЁӨҮа-яёөү]{2}\d{8}$/
const CYRILLIC_RE = /^[\u0400-\u04FF\s]+$/
const LATIN_RE = /^[A-Za-z\s]+$/

export function isNil(value: unknown): value is null | undefined {
  return value == null
}

export function isEmpty(value: unknown) {
  if (value == null) {
    return true
  }

  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0
  }

  return false
}

export function isNotEmpty(value: unknown) {
  return !isEmpty(value)
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function isUrl(value: string) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function isPhoneMn(value: string) {
  const digits = digitsOnly(value)

  if (/^976[89]\d{7}$/.test(digits)) {
    return true
  }

  return /^[89]\d{7}$/.test(digits)
}

export function isRegisterMn(value: string) {
  return REGISTER_MN_RE.test(value.replace(/\s/g, ""))
}

export function isNumeric(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value)
  }

  if (typeof value !== "string" || value.trim() === "") {
    return false
  }

  return Number.isFinite(Number(value.trim().replace(",", ".")))
}

export function isInteger(value: unknown) {
  if (typeof value === "number") {
    return Number.isInteger(value)
  }

  if (typeof value !== "string" || value.trim() === "") {
    return false
  }

  return Number.isInteger(Number(value.trim()))
}

export function isUuid(value: string) {
  return UUID_RE.test(value)
}

export function isCyrillic(value: string) {
  const trimmed = value.trim()
  return trimmed !== "" && CYRILLIC_RE.test(trimmed)
}

export function isLatin(value: string) {
  const trimmed = value.trim()
  return trimmed !== "" && LATIN_RE.test(trimmed)
}
