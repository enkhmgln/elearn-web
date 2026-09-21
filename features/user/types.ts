export type User = {
  id: number
  email: string
  phone: string | null
  first_name: string
  last_name: string
  birth: string | null
  sex: number
  avatar: string
  last_login: string | null
  date_joined: string
}

export type UpdateMeBody = Omit<
  User,
  "id" | "email" | "last_login" | "date_joined"
>
