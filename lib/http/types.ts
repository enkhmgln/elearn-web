export type ApiData = object | string | null

export type ApiSuccess<T = object> = {
  success: true
  message: string
  data: T
}

export type ApiFailure = {
  success: false
  message: string
  data: null
}

export type ApiEnvelope<T = object> = ApiSuccess<T> | ApiFailure

export type Paginated<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
