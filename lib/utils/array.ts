export function unique<T>(items: T[]) {
  return [...new Set(items)]
}

export function uniqueBy<T>(items: T[], key: (item: T) => PropertyKey) {
  const seen = new Set<PropertyKey>()

  return items.filter((item) => {
    const id = key(item)

    if (seen.has(id)) {
      return false
    }

    seen.add(id)
    return true
  })
}

export function groupBy<T>(items: T[], key: (item: T) => PropertyKey) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const id = String(key(item))
    groups[id] ??= []
    groups[id].push(item)
    return groups
  }, {})
}

export function chunk<T>(items: T[], size: number) {
  if (size <= 0) {
    return []
  }

  const result: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size))
  }

  return result
}

export function compact<T>(items: (T | null | undefined)[]) {
  return items.filter((item): item is T => item != null)
}

export function range(start: number, end: number) {
  const length = Math.max(0, end - start)
  return Array.from({ length }, (_, index) => start + index)
}

export function isNullOrEmpty<T>(items: readonly T[] | null | undefined) {
  return items == null || items.length === 0
}

export function isNotNullOrEmpty<T>(items: readonly T[] | null | undefined) {
  return !isNullOrEmpty(items)
}

export function first<T>(items: readonly T[]) {
  return items[0]
}

export function last<T>(items: readonly T[]) {
  return items[items.length - 1]
}

export function firstOrNull<T>(items: readonly T[]) {
  return items[0] ?? null
}

export function lastOrNull<T>(items: readonly T[]) {
  return items[items.length - 1] ?? null
}

export function getOrNull<T>(items: readonly T[], index: number) {
  if (index < 0 || index >= items.length) {
    return null
  }

  return items[index] ?? null
}

export function separatedBy<T>(items: readonly T[], separator: T) {
  if (items.length === 0) {
    return []
  }

  return items.flatMap((item, index) =>
    index === 0 ? [item] : [separator, item]
  )
}

export function toggle<T>(items: readonly T[], item: T) {
  const index = items.indexOf(item)

  if (index === -1) {
    return [...items, item]
  }

  return items.filter((_, current) => current !== index)
}

export function move<T>(items: readonly T[], from: number, to: number) {
  if (from < 0 || from >= items.length) {
    return [...items]
  }

  const next = [...items]
  const [item] = next.splice(from, 1)
  const at = Math.max(0, Math.min(to, next.length))
  next.splice(at, 0, item as T)
  return next
}

export function insertAt<T>(items: readonly T[], index: number, item: T) {
  const next = [...items]
  const at = Math.max(0, Math.min(index, next.length))
  next.splice(at, 0, item)
  return next
}

export function take<T>(items: readonly T[], count: number) {
  return items.slice(0, Math.max(0, count))
}

export function takeLast<T>(items: readonly T[], count: number) {
  return items.slice(Math.max(0, items.length - Math.max(0, count)))
}

export function drop<T>(items: readonly T[], count: number) {
  return items.slice(Math.max(0, count))
}

export function sortBy<T>(
  items: readonly T[],
  key: (item: T) => string | number | Date
) {
  return [...items].sort((left, right) => {
    const a = key(left)
    const b = key(right)

    if (a < b) {
      return -1
    }

    if (a > b) {
      return 1
    }

    return 0
  })
}

export function minBy<T>(items: readonly T[], key: (item: T) => number) {
  if (items.length === 0) {
    return undefined
  }

  return items.reduce((best, item) => (key(item) < key(best) ? item : best))
}

export function maxBy<T>(items: readonly T[], key: (item: T) => number) {
  if (items.length === 0) {
    return undefined
  }

  return items.reduce((best, item) => (key(item) > key(best) ? item : best))
}

export function sumBy<T>(items: readonly T[], key: (item: T) => number) {
  return items.reduce((sum, item) => sum + key(item), 0)
}

export function countBy<T>(items: readonly T[], key: (item: T) => PropertyKey) {
  return items.reduce<Record<string, number>>((counts, item) => {
    const id = String(key(item))
    counts[id] = (counts[id] ?? 0) + 1
    return counts
  }, {})
}

export function partition<T>(
  items: readonly T[],
  predicate: (item: T) => boolean
) {
  const pass: T[] = []
  const fail: T[] = []

  for (const item of items) {
    if (predicate(item)) {
      pass.push(item)
    } else {
      fail.push(item)
    }
  }

  return [pass, fail] as const
}

export function difference<T>(left: readonly T[], right: readonly T[]) {
  const exclude = new Set(right)
  return left.filter((item) => !exclude.has(item))
}

export function intersection<T>(left: readonly T[], right: readonly T[]) {
  const keep = new Set(right)
  return unique(left.filter((item) => keep.has(item)))
}

export function union<T>(left: readonly T[], right: readonly T[]) {
  return unique([...left, ...right])
}

export function shuffle<T>(items: readonly T[]) {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    const current = next[index] as T
    next[index] = next[swap] as T
    next[swap] = current
  }

  return next
}

export function sample<T>(items: readonly T[]): T | undefined
export function sample<T>(items: readonly T[], count: number): T[]
export function sample<T>(items: readonly T[], count?: number) {
  if (count == null) {
    if (items.length === 0) {
      return undefined
    }

    return items[Math.floor(Math.random() * items.length)]
  }

  return shuffle(items).slice(0, Math.max(0, Math.min(count, items.length)))
}
