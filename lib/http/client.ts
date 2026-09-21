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

export async function request<T extends object>(
  options: ApiRequestOptions
): Promise<T> {
  const url = new URL(options.path, `${constants.API_URL}/`)

  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value === undefined || value === null || value === "") {
        continue
      }

      if (typeof value === "object") {
        continue
      }

      url.searchParams.set(key, String(value))
    }
  }

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
