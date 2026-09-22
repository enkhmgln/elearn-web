"use client"

import { useQuery } from "@/lib/http"
import { Skeleton } from "@/components/ui/skeleton"
import { privacy } from "../api"

function PrivacyView() {
  const { data, isPending } = useQuery(privacy, undefined)

  if (isPending) {
    return <Skeleton className="h-svh w-full rounded-none" />
  }

  return (
    <iframe
      title="Нууцлалын бодлого"
      srcDoc={data?.html}
      className="block w-full border-0"
      onLoad={(event) => {
        const frame = event.currentTarget
        const height = frame.contentDocument?.documentElement.scrollHeight
        if (height) {
          frame.style.height = `${height}px`
        }
      }}
    />
  )
}

export { PrivacyView }
