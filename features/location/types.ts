export type City = {
  id: number
  name: string
}

export type District = {
  id: number
  name: string
  city_id: number
}

export type Khoroo = {
  id: number
  name: string
  district_id: number
}
