"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { banners } from "@/features/common/api"
import { constants } from "@/lib/constants"
import { useQuery } from "@/lib/http"
import { cn, isHttpUrl, isNotBlank } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const BANNER_INTERVAL_MS = 10000

function AuthBanner() {
  const [index, setIndex] = useState(0)
  const { data, isPending } = useQuery(banners, { page: 1 })
  const slides = data?.results ?? []

  useEffect(() => {
    if (slides.length < 2) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, BANNER_INTERVAL_MS)

    return () => {
      window.clearInterval(timer)
    }
  }, [slides.length])

  const current = slides.length > 0 ? index % slides.length : 0

  return (
    <div className="size-full min-h-0">
      {isPending ? (
        <Skeleton className="size-full rounded-lg" />
      ) : slides.length === 0 ? (
        <BannerFallback />
      ) : (
        <div className="relative size-full overflow-hidden rounded-lg bg-muted">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
          >
            {slides.map((banner, bannerIndex) => {
              const image = (
                <Image
                  src={banner.image}
                  alt={`Баннер ${bannerIndex + 1}`}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority={bannerIndex === 0}
                />
              )

              return (
                <div
                  key={banner.id}
                  className="relative h-full w-full shrink-0"
                >
                  {isNotBlank(banner.link) && isHttpUrl(banner.link) ? (
                    <Link
                      href={banner.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Баннер"
                      className="absolute inset-0"
                    >
                      {image}
                    </Link>
                  ) : (
                    image
                  )}
                </div>
              )
            })}
          </div>

          {slides.length > 1 ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                aria-label="Өмнөх"
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full shadow-sm"
                onClick={() => {
                  setIndex(
                    (current) => (current - 1 + slides.length) % slides.length
                  )
                }}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                aria-label="Дараах"
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full shadow-sm"
                onClick={() => {
                  setIndex((current) => (current + 1) % slides.length)
                }}
              >
                <ChevronRightIcon />
              </Button>
              <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {slides.map((banner, bannerIndex) => {
                  const isCurrent = bannerIndex === current

                  return (
                    <Button
                      key={banner.id}
                      type="button"
                      variant="secondary"
                      size="icon-xs"
                      aria-label={`Зураг ${bannerIndex + 1}`}
                      aria-current={isCurrent ? true : undefined}
                      className={cn(
                        "size-2 min-h-0 rounded-full border-0 p-0 shadow-none",
                        isCurrent ? "bg-primary" : "bg-muted-foreground"
                      )}
                      onClick={() => {
                        setIndex(bannerIndex)
                      }}
                    />
                  )
                })}
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}

function BannerFallback() {
  return (
    <div className="flex size-full items-center justify-center rounded-lg bg-muted">
      <p className="text-2xl font-semibold tracking-tight text-foreground">
        {constants.APP_NAME}
      </p>
    </div>
  )
}

export { AuthBanner }
