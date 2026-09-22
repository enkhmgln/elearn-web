import { constants } from "@/lib/constants"
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
}

export async function request<T>(options: ApiRequestOptions): Promise<T> {
  const url = buildUrl(options.path, options.query)
  const method = options.method ?? HttpMethod.GET
  const hasBody = options.body !== undefined && method !== HttpMethod.GET

  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: hasBody ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })

  const json = (await response.json()) as ApiEnvelope<T>

  if (!json.success) {
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
  const url = new URL(path, `${constants.API_URL}/`)

  if (!query) {
    return url
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") {
      continue
    }

    if (typeof value === "object") {
      continue
    }

    url.searchParams.set(key, String(value))
  }

  return url
}
