import { defineQuery, type Paginated } from "@/lib/http"
import type { Banner, Faq } from "./types"

export const commonBanners = defineQuery<Paginated<Banner>, { page?: number }>({
  path: "/api/common/banners/",
})

export const commonFaqs = defineQuery<Paginated<Faq>, { page?: number }>({
  path: "/api/common/faqs/",
})
