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
      className="block h-svh w-full border-0"
    />
  )
}

export { PrivacyView }
