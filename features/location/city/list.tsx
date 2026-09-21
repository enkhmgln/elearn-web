"use client"

import { useState } from "react"
import { CircleAlertIcon, MapPinIcon } from "lucide-react"
import { cities } from "@/features/location/api"
import { useQuery } from "@/lib/http"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

function CityList() {
  const [page, setPage] = useState(1)
  const { data, isPending, isFetching, error, refetch } = useQuery(cities, {
    page,
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Хотууд</CardTitle>
        <CardDescription>
          {data ? `Нийт ${data.count}` : "Байршлын жагсаалт"}
        </CardDescription>
      </CardHeader>
      <CardContent>{renderBody()}</CardContent>
      {data && data.count > 0 ? (
        <CardFooter className="justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Өмнөх
          </Button>
          <span className="text-sm text-muted-foreground">{page}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={!data.next || isFetching}
            onClick={() => setPage((current) => current + 1)}
          >
            Дараах
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )

  function renderBody() {
    if (isPending) {
      return (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>Алдаа гарлаа</AlertTitle>
          <AlertDescription>
            <div className="flex flex-col gap-3">
              <p>{error.message}</p>
              <Button
                variant="outline"
                size="sm"
                disabled={isFetching}
                onClick={() => {
                  void refetch()
                }}
              >
                {isFetching ? <Spinner data-icon="inline-start" /> : null}
                Дахин оролдох
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )
    }

    if (!data || data.results.length === 0) {
      return (
        <Empty className="border p-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MapPinIcon />
            </EmptyMedia>
            <EmptyTitle>Хот олдсонгүй</EmptyTitle>
            <EmptyDescription>
              Одоогоор харуулах хот байхгүй байна.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    }

    return (
      <ItemGroup className="gap-2">
        {data.results.map((city) => (
          <Item key={city.id} variant="outline" size="sm">
            <ItemMedia variant="icon">
              <MapPinIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{city.name}</ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    )
  }
}

export { CityList }
