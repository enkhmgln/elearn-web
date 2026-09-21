"use client"

import * as React from "react"
import { cn } from "cn"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate, isSameDay } from "@/lib/utils/date"

function DatePicker({
  value,
  onChange,
  placeholder = "Огноо сонгох",
  disabled,
  className,
  id,
}: {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date>(value ?? new Date())

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) {
          setMonth(value ?? new Date())
        }
      }}
    >
      <DatePickerTrigger
        id={id}
        disabled={disabled}
        hasValue={Boolean(value)}
        className={className}
      >
        {value ? formatDate(value) : placeholder}
      </DatePickerTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-auto p-0">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
          fixedWeeks
        />
        <DatePickerFooter
          valueLabel={value ? formatDate(value) : "Огноо сонгоно уу"}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const today = new Date()
              onChange?.(today)
              setMonth(today)
              setOpen(false)
            }}
          >
            Өнөөдөр
          </Button>
        </DatePickerFooter>
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({
  value,
  onChange,
  placeholder = "Хугацаа сонгох",
  disabled,
  className,
  id,
}: {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date>(value?.from ?? new Date())

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) {
          setMonth(value?.from ?? new Date())
        }
      }}
    >
      <DatePickerTrigger
        id={id}
        disabled={disabled}
        hasValue={Boolean(value?.from)}
        className={className}
      >
        {formatDateRange(value) || placeholder}
      </DatePickerTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-auto p-0">
        <Calendar
          mode="range"
          month={month}
          onMonthChange={setMonth}
          selected={value}
          defaultMonth={value?.from}
          numberOfMonths={2}
          captionLayout="label"
          showOutsideDays={false}
          onSelect={(range) => {
            onChange?.(range)
            if (range?.from && range.to && !isSameDay(range.from, range.to)) {
              setOpen(false)
            }
          }}
          fixedWeeks
        />
        <DatePickerFooter valueLabel={rangeFooterLabel(value)}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setMonth(new Date())
              onChange?.(undefined)
            }}
          >
            Цэвэрлэх
          </Button>
        </DatePickerFooter>
      </PopoverContent>
    </Popover>
  )
}

function DatePickerTrigger({
  id,
  disabled,
  hasValue,
  className,
  children,
}: {
  id?: string
  disabled?: boolean
  hasValue: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <PopoverTrigger
      disabled={disabled}
      render={
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-between font-normal",
            !hasValue && "text-muted-foreground",
            className
          )}
        />
      }
    >
      <CalendarIcon data-icon="inline-start" />
      <span className="min-w-0 flex-1 truncate text-left tabular-nums">
        {children}
      </span>
      <ChevronDownIcon data-icon="inline-end" />
    </PopoverTrigger>
  )
}

function DatePickerFooter({
  children,
  valueLabel,
}: {
  children: React.ReactNode
  valueLabel: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2">
      <div className="flex items-center gap-1">{children}</div>
      <p className="text-xs text-muted-foreground tabular-nums">{valueLabel}</p>
    </div>
  )
}

function formatDateRange(range?: DateRange) {
  if (!range?.from) {
    return ""
  }

  if (!range.to || isSameDay(range.from, range.to)) {
    return formatDate(range.from)
  }

  return `${formatDate(range.from)} – ${formatDate(range.to)}`
}

function rangeFooterLabel(range?: DateRange) {
  if (!range?.from) {
    return "Эхлэх өдөр сонгоно уу"
  }

  if (!range.to || isSameDay(range.from, range.to)) {
    return "Дуусах өдөр сонгоно уу"
  }

  return formatDateRange(range)
}

export { DatePicker, DateRangePicker }
export type { DateRange }
