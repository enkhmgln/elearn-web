"use client"

import { useQuery } from "@/lib/http"
import { Skeleton } from "@/components/ui/skeleton"
import { terms } from "../api"

function TermsView() {
  const { data, isPending } = useQuery(terms, undefined)

  if (isPending || !data) {
    return <Skeleton className="h-svh w-full rounded-none" />
  }

  return (
    <iframe
      title="Үйлчилгээний нөхцөл"
      srcDoc={data.html}
      className="block h-svh w-full border-0"
    />
  )
}

export { TermsView }
