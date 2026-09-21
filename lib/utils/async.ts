export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function retry<T>(
  fn: () => Promise<T>,
  times = 3,
  delay = 250
): Promise<T> {
  let lastError: unknown

  for (let attempt = 0; attempt < times; attempt += 1) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (attempt < times - 1) {
        await sleep(delay)
      }
    }
  }

  throw lastError
}

export function debounce<T extends (...args: never[]) => void>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

export function throttle<T extends (...args: never[]) => void>(fn: T, wait: number) {
  let last = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - last)

    if (remaining <= 0) {
      clearTimeout(timer)
      timer = undefined
      last = now
      fn(...args)
      return
    }

    if (timer) {
      return
    }

    timer = setTimeout(() => {
      last = Date.now()
      timer = undefined
      fn(...args)
    }, remaining)
  }
}

export async function withTimeout<T>(promise: Promise<T>, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error("Timeout"))
    }, ms)
  })

  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timer)
  }
}

export function once<T extends (...args: never[]) => unknown>(fn: T) {
  let called = false
  let result: ReturnType<T> | undefined

  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = fn(...args) as ReturnType<T>
    }

    return result
  }) as T
}

export async function sequential<T>(fns: (() => Promise<T>)[]) {
  const results: T[] = []

  for (const fn of fns) {
    results.push(await fn())
  }

  return results
}

export async function pMap<T, R>(
  items: readonly T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency = 5
) {
  if (concurrency < 1) {
    return []
  }

  const results = new Array<R>(items.length)
  let next = 0

  async function worker() {
    while (next < items.length) {
      const index = next
      next += 1
      results[index] = await fn(items[index] as T, index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  )

  return results
}

export function deferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: unknown) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

export function memoize<T extends (...args: never[]) => unknown>(fn: T) {
  let cachedArgs: unknown[] | undefined
  let cached: ReturnType<T>

  return ((...args: Parameters<T>) => {
    if (
      cachedArgs &&
      cachedArgs.length === args.length &&
      cachedArgs.every((arg, index) => Object.is(arg, args[index]))
    ) {
      return cached
    }

    cachedArgs = args
    cached = fn(...args) as ReturnType<T>
    return cached
  }) as T
}
