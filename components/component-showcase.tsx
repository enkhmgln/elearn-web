"use client"

import {
  AlertCircleIcon,
  BoldIcon,
  ChevronRightIcon,
  InboxIcon,
  ItalicIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const colorTokens = [
  { name: "background", bg: "bg-background", fg: "text-foreground" },
  { name: "foreground", bg: "bg-foreground", fg: "text-background" },
  { name: "card", bg: "bg-card", fg: "text-card-foreground" },
  { name: "popover", bg: "bg-popover", fg: "text-popover-foreground" },
  { name: "primary", bg: "bg-primary", fg: "text-primary-foreground" },
  { name: "secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "muted", bg: "bg-muted", fg: "text-muted-foreground" },
  { name: "accent", bg: "bg-accent", fg: "text-accent-foreground" },
  { name: "destructive", bg: "bg-destructive", fg: "text-primary-foreground" },
  { name: "border", bg: "bg-border", fg: "text-foreground" },
  { name: "input", bg: "bg-input", fg: "text-foreground" },
  { name: "ring", bg: "bg-ring", fg: "text-primary-foreground" },
  { name: "chart-1", bg: "bg-chart-1", fg: "text-foreground" },
  { name: "chart-2", bg: "bg-chart-2", fg: "text-primary-foreground" },
  { name: "chart-3", bg: "bg-chart-3", fg: "text-primary-foreground" },
  { name: "chart-4", bg: "bg-chart-4", fg: "text-primary-foreground" },
  { name: "chart-5", bg: "bg-chart-5", fg: "text-primary-foreground" },
  { name: "sidebar", bg: "bg-sidebar", fg: "text-sidebar-foreground" },
  {
    name: "sidebar-primary",
    bg: "bg-sidebar-primary",
    fg: "text-sidebar-primary-foreground",
  },
  {
    name: "sidebar-accent",
    bg: "bg-sidebar-accent",
    fg: "text-sidebar-accent-foreground",
  },
] as const

const radii = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "3xl", className: "rounded-3xl" },
  { name: "4xl", className: "rounded-4xl" },
] as const

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

const buttonSizes = ["xs", "sm", "default", "lg"] as const
const badgeVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

const selectItems = [
  { label: "Сонголт хийх", value: null },
  { label: "Нэгдүгээр", value: "a" },
  { label: "Хоёрдугаар", value: "b" },
  { label: "Гуравдугаар", value: "c" },
]

const buttonLabels = {
  default: "Үндсэн",
  secondary: "Хоёрдогч",
  outline: "Хүрээ",
  ghost: "Сүүдэр",
  destructive: "Устгах",
  link: "Холбоос",
} as const

const badgeLabels = {
  default: "Үндсэн",
  secondary: "Хоёрдогч",
  outline: "Хүрээ",
  ghost: "Сүүдэр",
  destructive: "Алдаа",
  link: "Холбоос",
} as const

export function ComponentShowcase() {
  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <p className="font-heading text-sm font-semibold tracking-tight">
            shadcn үзүүлэн
          </p>
          <p className="text-xs text-muted-foreground">
            Харанхуй горим: <kbd>d</kbd>
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10">
        <ColorsSection />
        <TypographySection />
        <RadiusSection />
        <ButtonSection />
        <BadgeSection />
        <AlertSection />
        <CardSection />
        <FormSection />
        <OverlaySection />
        <DataSection />
        <FeedbackSection />
      </main>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <Separator />
      </div>
      {children}
    </section>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs text-muted-foreground">{children}</p>
}

function ColorsSection() {
  return (
    <Section title="Colors">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {colorTokens.map((token) => (
          <div key={token.name} className="flex flex-col gap-2">
            <div
              className={cn(
                "flex h-20 items-end rounded-xl p-3 ring-1 ring-foreground/10",
                token.bg,
                token.fg
              )}
            >
              <span className="text-xs font-medium">{token.name}</span>
            </div>
            <Caption>{token.bg}</Caption>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TypographySection() {
  return (
    <Section title="Typography">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Caption>font-heading / 4xl</Caption>
          <p className="font-heading text-4xl font-semibold tracking-tight text-balance">
            Монгол хэлээр суралц
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>font-heading / 2xl</Caption>
          <p className="font-heading text-2xl font-semibold tracking-tight">
            Өндөр ууланд хөх тэнгэр
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>font-heading / xl</Caption>
          <p className="font-heading text-xl font-semibold tracking-tight">
            Хөөрхөн хүүхэд цэцэрлэгт тоглоно
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>font-sans / lg</Caption>
          <p className="text-lg">
            Ертөнцийн өндөр ууланд хөх тэнгэр гялалзана.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>font-sans / base</Caption>
          <p>
            Өвлийн цас ширүүн орж, хүүхдүүд цэцэрлэгт цэцэг түүнэ. Бүжгийн дуу
            дуулж, өөдөө өгсөн зам даган явна. Үсэг: өө үү ё ь ъ ы э ю я.
          </p>
          <p className="text-muted-foreground">
            Нэмэлт тайлбар текст ингэж харагдана.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>font-sans / sm</Caption>
          <p className="text-sm">
            Жижиг бичвэр: Хөх тэнгэрийн дор нүүдэлчин монголчууд аж төрөн сууна.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>font-mono / xs</Caption>
          <p className="font-mono text-xs">const token = &quot;primary&quot;</p>
        </div>
        <div className="flex flex-col gap-1">
          <Caption>GIP weights</Caption>
          <div className="flex flex-col gap-1 text-lg">
            <p className="font-thin">100 Thin — Монгол хэлээр суралц</p>
            <p className="font-extralight">
              200 UltraLight — Монгол хэлээр суралц
            </p>
            <p className="font-light">300 Light — Монгол хэлээр суралц</p>
            <p className="font-normal">400 Regular — Монгол хэлээр суралц</p>
            <p className="font-medium">500 Medium — Монгол хэлээр суралц</p>
            <p className="font-semibold">600 SemiBold — Монгол хэлээр суралц</p>
            <p className="font-bold">700 Bold — Монгол хэлээр суралц</p>
            <p className="font-extrabold">
              800 ExtraBold — Монгол хэлээр суралц
            </p>
            <p className="font-black">900 Heavy — Монгол хэлээр суралц</p>
            <p className="font-[950]">950 Black — Монгол хэлээр суралц</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

function RadiusSection() {
  return (
    <Section title="Radius">
      <div className="flex flex-wrap gap-4">
        {radii.map((radius) => (
          <div key={radius.name} className="flex flex-col items-center gap-2">
            <div className={cn("size-16 bg-primary", radius.className)} />
            <Caption>{radius.name}</Caption>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ButtonSection() {
  return (
    <Section title="Button">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Caption>variant</Caption>
          <div className="flex flex-wrap gap-2">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {buttonLabels[variant]}
              </Button>
            ))}
            <Button disabled>Идэвхгүй</Button>
            <Button disabled>
              <Spinner data-icon="inline-start" />
              Ачаалж байна
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>size</Caption>
          <div className="flex flex-wrap items-center gap-2">
            {buttonSizes.map((size) => (
              <Button key={size} size={size}>
                {size}
              </Button>
            ))}
            <Button size="icon">
              <StarIcon />
            </Button>
            <Button size="icon-sm">
              <StarIcon />
            </Button>
            <Button size="icon-xs">
              <StarIcon />
            </Button>
            <Button size="icon-lg">
              <StarIcon />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

function BadgeSection() {
  return (
    <Section title="Badge">
      <div className="flex flex-wrap gap-2">
        {badgeVariants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {badgeLabels[variant]}
          </Badge>
        ))}
      </div>
    </Section>
  )
}

function AlertSection() {
  return (
    <Section title="Alert">
      <div className="flex flex-col gap-3">
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>Мэдэгдэл</AlertTitle>
          <AlertDescription>
            Хичээл амжилттай хадгалагдлаа. Үргэлжлүүлэн суралцана уу.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Алдаа гарлаа</AlertTitle>
          <AlertDescription>
            Холболт тасарсан тул дахин оролдоно уу.
          </AlertDescription>
        </Alert>
      </div>
    </Section>
  )
}

function CardSection() {
  return (
    <Section title="Card">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Хичээлийн карт</CardTitle>
            <CardDescription>Богино тайлбар энд харагдана</CardDescription>
            <CardAction>
              <Badge>Шинэ</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>Картын үндсэн агуулга монгол хэлээр.</CardContent>
          <CardFooter className="border-t">
            <Button size="sm">Үргэлжлүүлэх</Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Жижиг карт</CardTitle>
            <CardDescription>Нарийн зайтай хувилбар</CardDescription>
          </CardHeader>
          <CardContent>Картын үндсэн агуулга.</CardContent>
        </Card>
      </div>
    </Section>
  )
}

function FormSection() {
  return (
    <Section title="Form controls">
      <div className="grid gap-8 lg:grid-cols-2">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="input">Нэр</FieldLabel>
            <Input id="input" placeholder="Жишээ: Энх-Амгалан" />
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="invalid">Имэйл</FieldLabel>
            <Input id="invalid" aria-invalid placeholder="ner@example.mn" />
            <FieldDescription>Имэйл хаяг буруу байна.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="search">Хайх</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput id="search" placeholder="Хичээл хайх" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="textarea">Тайлбар</FieldLabel>
            <Textarea id="textarea" placeholder="Энд бичнэ үү..." />
          </Field>
          <Field>
            <FieldLabel>Сонголт</FieldLabel>
            <Select items={selectItems} defaultValue={null}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectItems.map((item) => (
                    <SelectItem key={String(item.value)} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Чекбокс</FieldLegend>
            <Field orientation="horizontal">
              <Checkbox id="check" defaultChecked />
              <FieldLabel htmlFor="check" className="font-normal">
                Сонгосон
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="check-off" />
              <FieldLabel htmlFor="check-off" className="font-normal">
                Сонгоогүй
              </FieldLabel>
            </Field>
          </FieldSet>
          <FieldSet>
            <FieldLegend variant="label">Радио</FieldLegend>
            <RadioGroup defaultValue="a">
              <Field orientation="horizontal">
                <RadioGroupItem value="a" id="radio-a" />
                <FieldLabel htmlFor="radio-a" className="font-normal">
                  Шууд хичээл
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="b" id="radio-b" />
                <FieldLabel htmlFor="radio-b" className="font-normal">
                  Бичлэгээр үзэх
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="switch">Мэдэгдэл</FieldLabel>
            <Switch id="switch" defaultChecked />
          </Field>
          <Field>
            <FieldLabel>Түвшин</FieldLabel>
            <Slider defaultValue={40} max={100} />
          </Field>
          <div className="flex flex-col gap-2">
            <Caption>Toggle / ToggleGroup</Caption>
            <div className="flex flex-wrap gap-2">
              <Toggle aria-label="Bold">
                <BoldIcon />
              </Toggle>
              <Toggle variant="outline" aria-label="Italic">
                <ItalicIcon />
              </Toggle>
              <ToggleGroup defaultValue={["a"]} variant="outline">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </FieldGroup>
      </div>
    </Section>
  )
}

function OverlaySection() {
  return (
    <Section title="Overlays">
      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Цонх
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Профайл засах</DialogTitle>
              <DialogDescription>
                Өөрийн мэдээллийг шинэчлэн хадгална уу.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Болих
              </DialogClose>
              <Button>Хадгалах</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            Хажуу цэс
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Тохиргоо</SheetTitle>
              <SheetDescription>Хажуу панелын жишээ текст.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Попап
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Товч мэдээлэл</PopoverTitle>
              <PopoverDescription>Жижиг цонхны тайлбар энд.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Цэс
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Бүртгэл</DropdownMenuLabel>
              <DropdownMenuItem>Профайл</DropdownMenuItem>
              <DropdownMenuItem>Тохиргоо</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">Гарах</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Зөвлөмж
          </TooltipTrigger>
          <TooltipContent>Нэмэлт тайлбар</TooltipContent>
        </Tooltip>

        <HoverCard>
          <HoverCardTrigger render={<Button variant="outline" />}>
            Дээр нь аваачина уу
          </HoverCardTrigger>
          <HoverCardContent>
            Багшийн товч танилцуулга энд харагдана.
          </HoverCardContent>
        </HoverCard>
      </div>
    </Section>
  )
}

function DataSection() {
  return (
    <Section title="Data display">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Caption>Avatar / AvatarGroup</Caption>
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>ЭА</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>НТ</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>ББ</AvatarFallback>
            </Avatar>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>МЦ</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>ТМ</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+8</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Caption>Tabs</Caption>
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">Нэг</TabsTrigger>
              <TabsTrigger value="two">Хоёр</TabsTrigger>
              <TabsTrigger value="three">Гурав</TabsTrigger>
            </TabsList>
            <TabsContent value="one">Эхний табын агуулга.</TabsContent>
            <TabsContent value="two">Хоёр дахь табын агуулга.</TabsContent>
            <TabsContent value="three">Гурав дахь табын агуулга.</TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2">
          <Caption>Accordion</Caption>
          <Accordion defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Хэрхэн бүртгүүлэх вэ?</AccordionTrigger>
              <AccordionContent>
                Хичээлээ сонгоод бүртгүүлэх товчийг дарна. Имэйлээр
                баталгаажуулалт ирнэ.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Төлбөр хэрхэн төлөх вэ?</AccordionTrigger>
              <AccordionContent>
                Карт, банкны шилжүүлэг, эсвэл сарын багцаар төлж болно.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex flex-col gap-2">
          <Caption>Table</Caption>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Хичээл</TableHead>
                <TableHead>Төлөв</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>С. Мөнхцэцэг</TableCell>
                <TableCell>Математик</TableCell>
                <TableCell>Идэвхтэй</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>О. Тэмүүлэн</TableCell>
                <TableCell>Англи хэл</TableCell>
                <TableCell>Хүлээгдэж буй</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-2">
          <Caption>Item</Caption>
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <StarIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Б. Энх-Амгалан</ItemTitle>
                <ItemDescription>
                  Математикийн багш, 10 жилийн туршлага
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  Харах
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Caption>Breadcrumb</Caption>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Нүүр</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Бүрэлдэхүүн</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Үзүүлэн</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </Section>
  )
}

function FeedbackSection() {
  return (
    <Section title="Feedback">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Caption>Progress</Caption>
          <Progress value={64} className="max-w-sm">
            <ProgressLabel>Явц</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Skeleton</Caption>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="size-10 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Spinner</Caption>
          <Spinner />
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Empty</Caption>
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>Хичээл олдсонгүй</EmptyTitle>
              <EmptyDescription>
                Шүүлтийг цэвэрлээд дахин хайна уу.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                Буцах
                <ChevronRightIcon data-icon="inline-end" />
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </Section>
  )
}
