export function pick<T extends object, K extends keyof T>(value: T, keys: K[]) {
  return keys.reduce(
    (result, key) => {
      result[key] = value[key]
      return result
    },
    {} as Pick<T, K>
  )
}

export function omit<T extends object, K extends keyof T>(value: T, keys: K[]) {
  const excluded = new Set<PropertyKey>(keys)

  return Object.fromEntries(
    Object.entries(value).filter(([key]) => !excluded.has(key))
  ) as Omit<T, K>
}

export function isEmptyObject(value: object) {
  return Object.keys(value).length === 0
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value == null || typeof value !== "object") {
    return false
  }

  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...(target as Record<string, unknown>) }

  for (const [key, value] of Object.entries(source)) {
    const current = result[key]

    if (isPlainObject(current) && isPlainObject(value)) {
      result[key] = deepMerge(current, value)
      continue
    }

    if (value !== undefined) {
      result[key] = value
    }
  }

  return result as T
}

export function deepClone<T>(value: T): T {
  return structuredClone(value)
}

export function getPath(value: unknown, path: string) {
  if (path === "") {
    return value
  }

  return path.split(".").reduce<unknown>((current, key) => {
    if (current == null || typeof current !== "object") {
      return undefined
    }

    return (current as Record<string, unknown>)[key]
  }, value)
}

export function setPath<T extends object>(value: T, path: string, next: unknown): T {
  if (path === "") {
    return value
  }

  const keys = path.split(".")
  const clone = structuredClone(value) as Record<string, unknown>
  let current = clone

  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index] as string
    const child = current[key]

    if (!isPlainObject(child)) {
      current[key] = {}
    }

    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1] as string] = next
  return clone as T
}

export function mapValues<T extends object, R>(
  value: T,
  fn: (value: T[keyof T], key: keyof T) => R
) {
  return Object.fromEntries(
    Object.entries(value).map(([key, current]) => [
      key,
      fn(current as T[keyof T], key as keyof T),
    ])
  ) as { [K in keyof T]: R }
}

export function shallowEqual(left: object, right: object) {
  if (left === right) {
    return true
  }

  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)

  if (leftKeys.length !== rightKeys.length) {
    return false
  }

  return leftKeys.every((key) =>
    Object.is(
      (left as Record<string, unknown>)[key],
      (right as Record<string, unknown>)[key]
    )
  )
}
