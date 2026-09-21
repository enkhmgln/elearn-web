"use client"

import {
  useMutation as useBaseMutation,
  useQuery as useBaseQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query"

import type { DefinedMutation, DefinedQuery } from "./define"
import type { ApiError } from "./error"

type QueryOptions<TData extends object> = Omit<
  UseQueryOptions<TData, ApiError, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>

type MutationOptions<TData extends object, TBody> = Omit<
  UseMutationOptions<TData, ApiError, TBody>,
  "mutationFn"
>

export function useQuery<TData extends object, TParams = void>(
  endpoint: DefinedQuery<TData, TParams>,
  params: TParams,
  options?: QueryOptions<TData>
) {
  return useBaseQuery({
    queryKey: endpoint.queryKey(params),
    queryFn: ({ signal }) => endpoint.fetch(params, { signal }),
    ...options,
  })
}

export function useMutation<TData extends object, TBody = void>(
  endpoint: DefinedMutation<TData, TBody>,
  options?: MutationOptions<TData, TBody>
) {
  return useBaseMutation({
    mutationFn: (body: TBody) => endpoint.mutate(body),
    ...options,
  })
}
