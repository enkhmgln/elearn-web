const locale = "mn-MN"
const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const

function pad2(value: number) {
  return String(value).padStart(2, "0")
}

function groupThousands(value: string) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function formatThousands(value: number) {
  const negative = value < 0
  const absolute = Math.abs(value).toFixed(0)
  return `${negative ? "-" : ""}${groupThousands(absolute)}`
}

export function formatMoney(value: number, suffix = "₮") {
  return `${formatThousands(value)}${suffix}`
}

export function formatMoneyMn(
  value: number,
  options?: { decimals?: number; suffix?: string }
) {
  const decimals = options?.decimals ?? 0
  const suffix = options?.suffix ?? "₮"
  const negative = value < 0
  const [whole = "0", fraction] = Math.abs(value).toFixed(decimals).split(".")
  const grouped = groupThousands(whole)
  const rest = fraction != null ? `.${fraction}` : ""
  return `${negative ? "-" : ""}${grouped}${rest}${suffix}`
}

export function asMmSs(value: number) {
  const total = Math.abs(Math.trunc(value))
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${pad2(minutes)}:${pad2(seconds)}`
}

export function asHhMmSs(value: number) {
  const total = Math.abs(Math.trunc(value))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`
}

export function compactNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    ...options,
  }).format(value)
}

export function formatPercent(value: number, decimals = 0) {
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatBytes(value: number, decimals = 1) {
  if (!Number.isFinite(value) || value === 0) {
    return "0 B"
  }

  const abs = Math.abs(value)
  const index = Math.min(Math.floor(Math.log(abs) / Math.log(1024)), BYTE_UNITS.length - 1)
  const amount = abs / 1024 ** index
  const formatted = Number(amount.toFixed(decimals))
  return `${value < 0 ? "-" : ""}${formatted} ${BYTE_UNITS[index]}`
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}

export function roundTo(value: number, decimals = 0) {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export function inRange(value: number, min: number, max: number) {
  return value >= min && value <= max
}

export function isEven(value: number) {
  return Number.isInteger(value) && value % 2 === 0
}

export function isOdd(value: number) {
  return Number.isInteger(value) && value % 2 !== 0
}

export function parseNumber(value: string) {
  const normalized = value.replace(/\s/g, "").replace(",", ".")
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

export function randomInt(min: number, max: number) {
  const low = Math.ceil(Math.min(min, max))
  const high = Math.floor(Math.max(min, max))
  return Math.floor(Math.random() * (high - low + 1)) + low
}

export function percentage(part: number, total: number) {
  if (total === 0) {
    return 0
  }

  return (part / total) * 100
}
