export type DateInput = Date | string | number

const MONTH_NAMES_MN = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
] as const

const WEEKDAY_NAMES_MN = [
  "Даваа",
  "Мягмар",
  "Лхагва",
  "Пүрэв",
  "Баасан",
  "Бямба",
  "Ням",
] as const

const WEEKDAY_NAMES_SHORT_MN = [
  "Да",
  "Мя",
  "Лх",
  "Пү",
  "Ба",
  "Бя",
  "Ня",
] as const

const DAY_MS = 86_400_000
const HOUR_MS = 3_600_000
const MINUTE_MS = 60_000

function toDate(value: DateInput) {
  return value instanceof Date ? new Date(value.getTime()) : new Date(value)
}

function pad2(value: number) {
  return String(value).padStart(2, "0")
}

function mondayIndex(value: Date) {
  return (value.getDay() + 6) % 7
}

export function parseDate(value: DateInput) {
  const date = toDate(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function formatDate(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return ""
  }

  return `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}`
}

export function formatTime(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return ""
  }

  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

export function formatDateTime(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return ""
  }

  return `${formatDate(date)} ${formatTime(date)}`
}

export function formatDateMn(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return ""
  }

  return `${date.getFullYear()} оны ${date.getMonth() + 1}-р сарын ${date.getDate()}`
}

export function formatDateTimeMn(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return ""
  }

  return `${formatDateMn(date)} ${formatTime(date)}`
}

export function toIsoDate(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return ""
  }

  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

export function toApi(value: DateInput) {
  const date = parseDate(value)
  return date ? date.toISOString() : ""
}

export function monthNameMn(value: DateInput) {
  const date = parseDate(value)
  return date ? MONTH_NAMES_MN[date.getMonth()] : ""
}

export function weekdayNameMn(value: DateInput) {
  const date = parseDate(value)
  return date ? WEEKDAY_NAMES_MN[mondayIndex(date)] : ""
}

export function weekdayNameShortMn(value: DateInput) {
  const date = parseDate(value)
  return date ? WEEKDAY_NAMES_SHORT_MN[mondayIndex(date)] : ""
}

export function timeAgo(value: DateInput, now: DateInput = new Date()) {
  const date = parseDate(value)
  const current = parseDate(now)

  if (!date || !current) {
    return ""
  }

  const diffMs = current.getTime() - date.getTime()
  const diffSeconds = Math.trunc(diffMs / 1000)
  const diffMinutes = Math.trunc(diffMs / MINUTE_MS)
  const diffHours = Math.trunc(diffMs / HOUR_MS)
  const diffDays = Math.trunc(diffMs / DAY_MS)

  if (diffSeconds < 60) {
    return "Саяхан"
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} минутын өмнө`
  }

  if (diffHours < 24) {
    return `${diffHours} цагийн өмнө`
  }

  if (isYesterday(date, current)) {
    return "Өчигдөр"
  }

  if (diffDays < 7) {
    return `${diffDays} өдрийн өмнө`
  }

  if (diffDays < 30) {
    return `${Math.trunc(diffDays / 7)} долоо хоногийн өмнө`
  }

  if (diffDays < 365) {
    return `${Math.trunc(diffDays / 30)} сарын өмнө`
  }

  return formatDateMn(date)
}

export function durationMn(value: DateInput, now: DateInput = new Date()) {
  const date = parseDate(value)
  const current = parseDate(now)

  if (!date || !current) {
    return ""
  }

  let months =
    (current.getFullYear() - date.getFullYear()) * 12 +
    (current.getMonth() - date.getMonth())

  if (current.getDate() < date.getDate()) {
    months -= 1
  }

  if (months < 1) {
    return "1 сар"
  }

  if (months < 12) {
    return `${months} сар`
  }

  return `${Math.trunc(months / 12)} жил`
}

export function isSameDay(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return false
  }

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isSameWeek(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return false
  }

  return startOfWeek(a).getTime() === startOfWeek(b).getTime()
}

export function isSameMonth(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return false
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function isSameYear(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return false
  }

  return a.getFullYear() === b.getFullYear()
}

export function isToday(value: DateInput, now: DateInput = new Date()) {
  return isSameDay(value, now)
}

export function isYesterday(value: DateInput, now: DateInput = new Date()) {
  const current = parseDate(now)
  return current ? isSameDay(value, addDays(current, -1)) : false
}

export function isTomorrow(value: DateInput, now: DateInput = new Date()) {
  const current = parseDate(now)
  return current ? isSameDay(value, addDays(current, 1)) : false
}

export function isThisWeek(value: DateInput, now: DateInput = new Date()) {
  return isSameWeek(value, now)
}

export function isThisMonth(value: DateInput, now: DateInput = new Date()) {
  return isSameMonth(value, now)
}

export function isThisYear(value: DateInput, now: DateInput = new Date()) {
  return isSameYear(value, now)
}

export function isPast(value: DateInput, now: DateInput = new Date()) {
  const date = parseDate(value)
  const current = parseDate(now)
  return Boolean(date && current && date.getTime() < current.getTime())
}

export function isFuture(value: DateInput, now: DateInput = new Date()) {
  const date = parseDate(value)
  const current = parseDate(now)
  return Boolean(date && current && date.getTime() > current.getTime())
}

export function isWeekend(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return false
  }

  const day = date.getDay()
  return day === 0 || day === 6
}

export function isWeekday(value: DateInput) {
  const date = parseDate(value)
  return Boolean(date && !isWeekend(date))
}

export function startOfDay(value: DateInput) {
  const date = toDate(value)
  date.setHours(0, 0, 0, 0)
  return date
}

export function endOfDay(value: DateInput) {
  const date = toDate(value)
  date.setHours(23, 59, 59, 999)
  return date
}

export function startOfWeek(value: DateInput) {
  const date = startOfDay(value)
  date.setDate(date.getDate() - mondayIndex(date))
  return date
}

export function endOfWeek(value: DateInput) {
  const date = startOfWeek(value)
  date.setDate(date.getDate() + 6)
  return endOfDay(date)
}

export function startOfMonth(value: DateInput) {
  const date = startOfDay(value)
  date.setDate(1)
  return date
}

export function endOfMonth(value: DateInput) {
  const date = startOfDay(value)
  date.setMonth(date.getMonth() + 1, 0)
  return endOfDay(date)
}

export function startOfYear(value: DateInput) {
  const date = startOfDay(value)
  date.setMonth(0, 1)
  return date
}

export function endOfYear(value: DateInput) {
  const date = startOfDay(value)
  date.setMonth(11, 31)
  return endOfDay(date)
}

export function daysInMonth(value: DateInput) {
  const date = parseDate(value)

  if (!date) {
    return 0
  }

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function addDays(value: DateInput, days: number) {
  const date = toDate(value)
  date.setDate(date.getDate() + days)
  return date
}

export function addWeeks(value: DateInput, weeks: number) {
  return addDays(value, weeks * 7)
}

export function addMonths(value: DateInput, months: number) {
  const date = toDate(value)
  const day = date.getDate()
  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(day, daysInMonth(date)))
  return date
}

export function addYears(value: DateInput, years: number) {
  return addMonths(value, years * 12)
}

export function addHours(value: DateInput, hours: number) {
  const date = toDate(value)
  date.setHours(date.getHours() + hours)
  return date
}

export function addMinutes(value: DateInput, minutes: number) {
  const date = toDate(value)
  date.setMinutes(date.getMinutes() + minutes)
  return date
}

export function diffInDays(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return 0
  }

  return Math.trunc((a.getTime() - b.getTime()) / DAY_MS)
}

export function diffInHours(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return 0
  }

  return Math.trunc((a.getTime() - b.getTime()) / HOUR_MS)
}

export function diffInMinutes(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return 0
  }

  return Math.trunc((a.getTime() - b.getTime()) / MINUTE_MS)
}

export function diffInMonths(left: DateInput, right: DateInput = new Date()) {
  const a = parseDate(left)
  const b = parseDate(right)

  if (!a || !b) {
    return 0
  }

  let months =
    (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth())

  if (a.getTime() >= b.getTime() && a.getDate() < b.getDate()) {
    months -= 1
  }

  if (a.getTime() < b.getTime() && a.getDate() > b.getDate()) {
    months += 1
  }

  return months
}

export function minDate(...values: DateInput[]) {
  const dates = values
    .map(parseDate)
    .filter((date): date is Date => date != null)

  if (dates.length === 0) {
    return null
  }

  return dates.reduce((min, date) =>
    date.getTime() < min.getTime() ? date : min
  )
}

export function maxDate(...values: DateInput[]) {
  const dates = values
    .map(parseDate)
    .filter((date): date is Date => date != null)

  if (dates.length === 0) {
    return null
  }

  return dates.reduce((max, date) =>
    date.getTime() > max.getTime() ? date : max
  )
}

export function clampDate(value: DateInput, min: DateInput, max: DateInput) {
  const date = parseDate(value)
  const low = parseDate(min)
  const high = parseDate(max)

  if (!date || !low || !high) {
    return date
  }

  if (date.getTime() < low.getTime()) {
    return low
  }

  if (date.getTime() > high.getTime()) {
    return high
  }

  return date
}

export function toUnix(value: DateInput) {
  const date = parseDate(value)
  return date ? Math.floor(date.getTime() / 1000) : null
}

export function fromUnix(seconds: number) {
  return new Date(seconds * 1000)
}
