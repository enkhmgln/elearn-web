const locale = "mn"

function splitWords(value: string) {
  return collapseWhitespace(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

export function isBlank(value: string | null | undefined) {
  return value == null || value.trim() === ""
}

export function isNotBlank(value: string | null | undefined) {
  return !isBlank(value)
}

export function trimmedOrNull(value: string | null | undefined) {
  if (value == null) {
    return null
  }

  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

export function collapseWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

export function capitalize(value: string) {
  if (!value) {
    return value
  }

  return value.charAt(0).toLocaleUpperCase(locale) + value.slice(1)
}

export function capitalizeWords(value: string) {
  if (isBlank(value)) {
    return value
  }

  return collapseWhitespace(value)
    .split(" ")
    .map((word) => capitalize(word.toLocaleLowerCase(locale)))
    .join(" ")
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export function toIntOrNull(value: string) {
  const trimmed = value.trim()

  if (!/^[+-]?\d+$/.test(trimmed)) {
    return null
  }

  const parsed = Number.parseInt(trimmed, 10)
  return Number.isSafeInteger(parsed) ? parsed : null
}

export function toDoubleOrNull(value: string) {
  const trimmed = value.trim().replace(",", ".")

  if (trimmed === "" || Number.isNaN(Number(trimmed))) {
    return null
  }

  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

export function truncate(value: string, max: number, ellipsis = "…") {
  if (value.length <= max) {
    return value
  }

  return `${value.slice(0, Math.max(0, max - ellipsis.length))}${ellipsis}`
}

export function excerpt(value: string, max: number, ellipsis = "…") {
  if (value.length <= max) {
    return value
  }

  const sliced = value.slice(0, Math.max(0, max - ellipsis.length))
  const trimmed = sliced.replace(/\s+\S*$/, "").trimEnd()
  return `${trimmed || sliced}${ellipsis}`
}

export function slugify(value: string) {
  return collapseWhitespace(value)
    .toLocaleLowerCase(locale)
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "")
}

export function equalsIgnoreCase(left: string, right: string) {
  return left.toLocaleLowerCase(locale) === right.toLocaleLowerCase(locale)
}

export function includesIgnoreCase(value: string, search: string) {
  return value.toLocaleLowerCase(locale).includes(search.toLocaleLowerCase(locale))
}

export function removePrefix(value: string, prefix: string) {
  return value.startsWith(prefix) ? value.slice(prefix.length) : value
}

export function removeSuffix(value: string, suffix: string) {
  return value.endsWith(suffix) ? value.slice(0, value.length - suffix.length) : value
}

export function ensurePrefix(value: string, prefix: string) {
  return value.startsWith(prefix) ? value : `${prefix}${value}`
}

export function ensureSuffix(value: string, suffix: string) {
  return value.endsWith(suffix) ? value : `${value}${suffix}`
}

export function initials(value: string, max = 2) {
  return collapseWhitespace(value)
    .split(" ")
    .filter(Boolean)
    .slice(0, max)
    .map((word) => word.charAt(0).toLocaleUpperCase(locale))
    .join("")
}

export function mask(value: string, visible = 4, maskChar = "*") {
  if (value.length <= visible) {
    return maskChar.repeat(value.length)
  }

  return `${value.slice(0, visible)}${maskChar.repeat(value.length - visible)}`
}

export function camelCase(value: string) {
  return splitWords(value)
    .map((word, index) => {
      const lower = word.toLocaleLowerCase(locale)
      return index === 0 ? lower : capitalize(lower)
    })
    .join("")
}

export function pascalCase(value: string) {
  return splitWords(value)
    .map((word) => capitalize(word.toLocaleLowerCase(locale)))
    .join("")
}

export function kebabCase(value: string) {
  return splitWords(value)
    .map((word) => word.toLocaleLowerCase(locale))
    .join("-")
}

export function snakeCase(value: string) {
  return splitWords(value)
    .map((word) => word.toLocaleLowerCase(locale))
    .join("_")
}

export function reverse(value: string) {
  return [...value].reverse().join("")
}

export function countOccurrences(value: string, search: string) {
  if (search === "") {
    return 0
  }

  return value.split(search).length - 1
}
