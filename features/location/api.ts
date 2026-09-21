import { defineQuery, type Paginated } from "@/lib/http"
import type { City, District, Khoroo } from "./types"

export const locationCities = defineQuery<Paginated<City>, { page?: number }>({
  path: "/api/location/cities/",
})

export const locationDistricts = defineQuery<
  Paginated<District>,
  { cityId: number; page?: number }
>({
  path: "/api/location/cities/:cityId/districts/",
})

export const locationKhoroos = defineQuery<
  Paginated<Khoroo>,
  { districtId: number; page?: number }
>({
  path: "/api/location/districts/:districtId/khoroos/",
})
