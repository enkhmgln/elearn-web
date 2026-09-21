"use client"

import * as React from "react"
import { cn } from "cn"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { Button, buttonVariants } from "@/components/ui/button"
import { formatDateMn, monthNameMn, weekdayNameShortMn } from "@/lib/utils/date"

const VIEW_YEAR = new Date().getFullYear()
const START_MONTH = new Date(VIEW_YEAR - 8, 0)
const END_MONTH = new Date(VIEW_YEAR + 4, 11)

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  labels,
  weekStartsOn = 1,
  startMonth = START_MONTH,
  endMonth = END_MONTH,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={weekStartsOn}
      startMonth={startMonth}
      endMonth={endMonth}
      className={cn(
        "group/calendar bg-background p-4 [--cell-radius:var(--radius-lg)] [--cell-size:--spacing(9)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => monthNameMn(date),
        formatYearDropdown: (date) => String(date.getFullYear()),
        formatCaption: (date) =>
          `${date.getFullYear()} оны ${date.getMonth() + 1}-р сар`,
        formatWeekdayName: (date) => weekdayNameShortMn(date),
        ...formatters,
      }}
      labels={{
        labelPrevious: () => "Өмнөх сар",
        labelNext: () => "Дараагийн сар",
        labelMonthDropdown: () => "Сар сонгох",
        labelYearDropdown: () => "Жил сонгох",
        labelDayButton: (date, modifiers) => {
          const formatted = formatDateMn(date)
          if (modifiers.today) {
            return `Өнөөдөр, ${formatted}`
          }
          if (modifiers.selected) {
            return `Сонгосон, ${formatted}`
          }
          return formatted
        },
        ...labels,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-6 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "cn-calendar-dropdown-root relative rounded-lg hover:bg-muted",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-heading font-medium select-none",
          captionLayout === "label"
            ? "cn-calendar-caption text-sm"
            : "cn-calendar-caption-label flex items-center gap-1 rounded-lg px-2 py-1 text-sm [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn(
          "flex border-b border-border pb-2",
          defaultClassNames.weekdays
        ),
        weekday: cn(
          "flex-1 text-xs font-medium text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-xs text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate rounded-s-(--cell-radius) bg-primary/10",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "rounded-none bg-primary/10",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "relative isolate rounded-e-(--cell-radius) bg-primary/10",
          defaultClassNames.range_end
        ),
        today: cn("text-foreground", defaultClassNames.today),
        outside: cn(
          "text-muted-foreground/50 aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...rootProps}
            />
          )
        },
        Chevron: ({ className, orientation, ...chevronProps }) => {
          switch (orientation) {
            case "left":
              return <ChevronLeftIcon className={className} {...chevronProps} />
            case "right":
              return (
                <ChevronRightIcon className={className} {...chevronProps} />
              )
            case "up":
              return <ChevronUpIcon className={className} {...chevronProps} />
            case "down":
            case undefined:
              return <ChevronDownIcon className={className} {...chevronProps} />
            default: {
              const _never: never = orientation
              return _never
            }
          }
        },
        DayButton: ({ ...dayButtonProps }) => (
          <CalendarDayButton locale={locale} {...dayButtonProps} />
        ),
        WeekNumber: ({ children, ...weekNumberProps }) => {
          return (
            <th {...weekNumberProps}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </th>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: React.ComponentProps<typeof DayPicker>["locale"]
}) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-today={modifiers.today || undefined}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col border-0 leading-none font-normal group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-e-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:after:bg-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-s-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:after:bg-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:font-medium data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:after:bg-primary-foreground data-[today=true]:font-semibold data-[today=true]:after:absolute data-[today=true]:after:bottom-1 data-[today=true]:after:left-1/2 data-[today=true]:after:size-1 data-[today=true]:after:-translate-x-1/2 data-[today=true]:after:rounded-full data-[today=true]:after:bg-primary",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
