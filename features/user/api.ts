import { defineMutation, defineQuery, HttpMethod } from "@/lib/http"
import type { UpdateMeBody, User } from "./types"

export const me = defineQuery<User>({
  path: "/api/users/me/",
})

export const updateMe = defineMutation<User, UpdateMeBody>({
  method: HttpMethod.POST,
  path: "/api/users/me/",
})
