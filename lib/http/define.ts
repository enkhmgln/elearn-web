import { HttpMethod, request } from "./client"
import type { ApiData } from "./types"

const PATH_PARAM = /:([A-Za-z_]\w*)/g

export type Path<TParams> = string | ((params: TParams) => string)

export type DefinedQuery<TData extends object, TParams = void> = {
  readonly path: Path<TParams>
  queryKey(params: TParams): readonly unknown[]
  fetch(params: TParams, init?: { signal?: AbortSignal }): Promise<TData>
}

export type DefinedMutation<TData extends ApiData = object, TBody = void> = {
  readonly method: Exclude<HttpMethod, HttpMethod.GET>
  readonly path: Path<TBody>
  mutate(body: TBody, init?: { signal?: AbortSignal }): Promise<TData>
}

export function defineQuery<TData extends object, TParams = void>(config: {
  path: Path<TParams>
}): DefinedQuery<TData, TParams> {
  return {
    path: config.path,
    queryKey(params) {
      const { path } = resolveRequest(config.path, params)
      return ["http", path, params]
    },
    fetch(params, init) {
      const { path, query } = resolveRequest(config.path, params)

      return request<TData>({
        method: HttpMethod.GET,
        path,
        query,
        signal: init?.signal,
      })
    },
  }
}

export function defineMutation<
  TData extends ApiData = object,
  TBody = void,
>(config: {
  method: Exclude<HttpMethod, HttpMethod.GET>
  path: Path<TBody>
}): DefinedMutation<TData, TBody> {
  return {
    method: config.method,
    path: config.path,
    mutate(body, init) {
      const { path } = resolveRequest(config.path, body)

      return request<TData>({
        method: config.method,
        path,
        body,
        signal: init?.signal,
      })
    },
  }
}

function resolveRequest<T>(
  path: Path<T>,
  params: T
): { path: string; query?: object } {
  if (typeof path === "function") {
    return { path: path(params) }
  }

  if (!params || typeof params !== "object") {
    return { path }
  }

  const used = new Set<string>()
  const resolved = path.replace(PATH_PARAM, (_match, key: string) => {
    used.add(key)
    const value = (params as Record<string, unknown>)[key]
    return value === undefined || value === null ? `:${key}` : String(value)
  })

  const query: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(params)) {
    if (used.has(key)) {
      continue
    }

    query[key] = value
  }

  return {
    path: resolved,
    query,
  }
}
