import { defineQuery, defineTextQuery, type Paginated } from "@/lib/http"
import type { Banner, Faq } from "./types"

export const banners = defineQuery<Paginated<Banner>, { page?: number }>({
  path: "/api/common/banners/",
})

export const faqs = defineQuery<Paginated<Faq>, { page?: number }>({
  path: "/api/common/faqs/",
})

export const terms = defineTextQuery({
  path: "/terms/",
})

export const privacy = defineTextQuery({
  path: "/privacy/",
})
