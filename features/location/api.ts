import { defineQuery, type Paginated } from "@/lib/http"

export type City = {
  id: number
  name: string
}

export const locationCities = defineQuery<Paginated<City>, { page?: number }>({
  path: "/api/location/cities/",
})
