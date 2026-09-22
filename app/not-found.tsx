import type { Metadata } from "next"
import Link from "next/link"
import { FileQuestionIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const metadata: Metadata = {
  title: "Хуудас олдсонгүй",
}

export default function NotFound() {
  return (
    <Empty className="min-h-svh">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionIcon />
        </EmptyMedia>
        <EmptyTitle>Хуудас олдсонгүй</EmptyTitle>
        <EmptyDescription>Энэ хаяг дээр хуудас байхгүй байна.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button nativeButton={false} render={<Link href="/" />}>
          Нүүр хуудас
        </Button>
      </EmptyContent>
    </Empty>
  )
}
