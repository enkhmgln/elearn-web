import { ApiError } from "./error"
import type { ApiEnvelope } from "./types"

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type ApiRequestOptions = {
  method?: HttpMethod
  path: string
  query?: object
  body?: unknown
  signal?: AbortSignal
  headers?: HeadersInit
  auth?: boolean
}

type AuthAdapter = {
  getAccessToken: () => string | null
  refreshAccessToken: () => Promise<string | null>
}

let auth: AuthAdapter | null = null

export function configureAuth(adapter: AuthAdapter) {
  auth = adapter
}

export async function request<T>(options: ApiRequestOptions): Promise<T> {
  const skipAuth = options.auth === false
  let token: string | null = null

  if (!skipAuth && auth) {
    token = auth.getAccessToken()

    if (!token) {
      token = await auth.refreshAccessToken()
    }
  }

  return perform<T>(options, token, skipAuth, false)
}

async function perform<T>(
  options: ApiRequestOptions,
  token: string | null,
  skipAuth: boolean,
  retried: boolean
): Promise<T> {
  const url = buildUrl(options.path, options.query)
  const method = options.method ?? HttpMethod.GET
  const hasBody = options.body !== undefined && method !== HttpMethod.GET

  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: hasBody ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })

  const json = (await response.json()) as ApiEnvelope<T>

  if (!json.success) {
    if (!skipAuth && !retried && response.status === 401 && auth) {
      const next = await auth.refreshAccessToken()

      if (next && next !== token) {
        return perform(options, next, skipAuth, true)
      }
    }

    throw new ApiError(json.message, response.status, json)
  }

  return json.data
}

export async function requestText(
  options: Omit<ApiRequestOptions, "body" | "method">
): Promise<string> {
  const response = await fetch(buildUrl(options.path, options.query), {
    method: HttpMethod.GET,
    headers: {
      Accept: "text/html",
      ...options.headers,
    },
    signal: options.signal,
  })

  if (!response.ok) {
    throw new ApiError(
      response.statusText || String(response.status),
      response.status
    )
  }

  return response.text()
}

function buildUrl(path: string, query?: object) {
  if (!query) {
    return path
  }

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") {
      continue
    }

    if (typeof value === "object") {
      continue
    }

    params.set(key, String(value))
  }

  const search = params.toString()

  return search ? `${path}?${search}` : path
}
