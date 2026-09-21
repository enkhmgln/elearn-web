"use client"

import * as React from "react"
import { Lottie } from "lottie-react"
import { cn } from "cn"

import errorAnimation from "@/assets/lottie/alert-error.json"
import successAnimation from "@/assets/lottie/alert-success.json"
import warningAnimation from "@/assets/lottie/alert-warning.json"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ANIMATIONS = {
  success: successAnimation,
  error: errorAnimation,
  warning: warningAnimation,
} as const

export type DialogFeedbackVariant = keyof typeof ANIMATIONS

function DialogFeedback({
  variant,
  title,
  description,
  confirmLabel = "Ойлголоо",
  cancelLabel,
  onConfirm,
  onCancel,
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof DialogContent>,
  "children" | "showCloseButton"
> & {
  variant: DialogFeedbackVariant
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
}) {
  return (
    <DialogContent
      showCloseButton={false}
      className={cn("gap-8 p-8 sm:max-w-sm", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="size-36">
          <Lottie
            src={animationFor(variant)}
            loop={false}
            autoplay
            className="size-full"
          />
        </div>
        <DialogHeader className="items-center gap-2.5">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-pretty">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>
      </div>
      <DialogFooter
        className={cn(
          "gap-2",
          cancelLabel
            ? "flex-row sm:flex-row sm:justify-stretch"
            : "flex-col sm:flex-col"
        )}
      >
        <DialogClose
          render={
            <Button
              size="lg"
              className={cn("w-full", cancelLabel && "flex-1")}
            />
          }
          onClick={onConfirm}
        >
          {confirmLabel}
        </DialogClose>
        {cancelLabel ? (
          <DialogClose
            render={
              <Button variant="outline" size="lg" className="w-full flex-1" />
            }
            onClick={onCancel}
          >
            {cancelLabel}
          </DialogClose>
        ) : null}
      </DialogFooter>
    </DialogContent>
  )
}

function animationFor(variant: DialogFeedbackVariant) {
  switch (variant) {
    case "success":
      return ANIMATIONS.success
    case "error":
      return ANIMATIONS.error
    case "warning":
      return ANIMATIONS.warning
    default: {
      const _never: never = variant
      return _never
    }
  }
}

export { DialogFeedback }
