import { defineQuery, type Paginated } from "@/lib/http"
import type { City, District, Khoroo } from "./types"

export const cities = defineQuery<Paginated<City>, { page?: number }>({
  path: "/api/location/cities/",
})

export const districts = defineQuery<
  Paginated<District>,
  { cityId: number; page?: number }
>({
  path: "/api/location/cities/:cityId/districts/",
})

export const khoroos = defineQuery<
  Paginated<Khoroo>,
  { districtId: number; page?: number }
>({
  path: "/api/location/districts/:districtId/khoroos/",
})
