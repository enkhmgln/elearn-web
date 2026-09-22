"use client"

import { useQuery } from "@/lib/http"
import { Skeleton } from "@/components/ui/skeleton"
import { terms } from "../api"

function TermsView() {
  const { data, isPending } = useQuery(terms, undefined)

  if (isPending) {
    return <Skeleton className="h-svh w-full rounded-none" />
  }

  return (
    <iframe
      title="Үйлчилгээний нөхцөл"
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

export { TermsView }
