import { HttpMethod, request } from "./client"

export type Path<TParams> = string | ((params: TParams) => string)

export type DefinedQuery<TData extends object, TParams = void> = {
  readonly path: Path<TParams>
  queryKey(params: TParams): readonly unknown[]
  fetch(params: TParams, init?: { signal?: AbortSignal }): Promise<TData>
}

export type DefinedMutation<TData extends object, TBody = void> = {
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
      return ["http", resolve(config.path, params), params]
    },
    fetch(params, init) {
      return request<TData>({
        method: HttpMethod.GET,
        path: resolve(config.path, params),
        query: typeof config.path === "string" ? (params as object) : undefined,
        signal: init?.signal,
      })
    },
  }
}

export function defineMutation<TData extends object, TBody = void>(config: {
  method: Exclude<HttpMethod, HttpMethod.GET>
  path: Path<TBody>
}): DefinedMutation<TData, TBody> {
  return {
    method: config.method,
    path: config.path,
    mutate(body, init) {
      return request<TData>({
        method: config.method,
        path: resolve(config.path, body),
        body,
        signal: init?.signal,
      })
    },
  }
}

function resolve<T>(path: Path<T>, params: T) {
  return typeof path === "function" ? path(params) : path
}
