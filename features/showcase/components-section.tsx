"use client"

import { useState } from "react"
import {
  BellIcon,
  BookOpenIcon,
  CircleAlertIcon,
  ClipboardListIcon,
  HouseIcon,
  InboxIcon,
  PlusIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react"
import { toast } from "@/components/ui/sonner"
import { type DateRange } from "react-day-picker"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav"
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
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
import { DialogFeedback } from "@/components/ui/dialog-feedback"
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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Label } from "@/components/ui/label"
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
  SheetFooter,
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
import { ShowcaseBlock } from "./showcase-block"

const SUBJECTS = [
  { label: "Хичээл сонгох", value: null },
  { label: "Математик", value: "math" },
  { label: "Монгол хэл", value: "mongolian" },
  { label: "Физик", value: "physics" },
] as const

const STUDENTS = [
  { name: "Бат-Эрдэнэ", city: "Улаанбаатар", score: 96 },
  { name: "Сарангэрэл", city: "Дархан", score: 88 },
  { name: "Төмөрбаатар", city: "Эрдэнэт", score: 74 },
] as const

export function ComponentsSection() {
  return (
    <div className="flex flex-col gap-14">
      <ActionsDemos />
      <FeedbackDemos />
      <FormsDemos />
      <SurfacesDemos />
      <OverlaysDemos />
      <NavDemos />
    </div>
  )
}

function ActionsDemos() {
  return (
    <section id="actions" className="flex scroll-mt-24 flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Үйлдэл
        </h2>
        <p className="text-sm text-muted-foreground">
          Товч, сэлгүүр, бүлэг сонголт.
        </p>
      </header>

      <ShowcaseBlock title="Button">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button>Хадгалах</Button>
            <Button variant="secondary">Хувилах</Button>
            <Button variant="outline">Цуцлах</Button>
            <Button variant="ghost">Дэлгэрэнгүй</Button>
            <Button variant="destructive">Устгах</Button>
            <Button variant="link">Холбоос</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">default</Button>
            <Button size="lg">lg</Button>
            <Button size="icon" aria-label="Нэмэх">
              <PlusIcon />
            </Button>
            <Button disabled>
              <Spinner data-icon="inline-start" />
              Хадгалж байна
            </Button>
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Toggle">
        <div className="flex flex-wrap gap-2">
          <Toggle defaultPressed>
            <BookOpenIcon data-icon="inline-start" />
            Хичээл
          </Toggle>
          <Toggle variant="outline">Даалгавар</Toggle>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="ToggleGroup">
        <ToggleGroup defaultValue={["week"]}>
          <ToggleGroupItem value="day">Өдөр</ToggleGroupItem>
          <ToggleGroupItem value="week">7 хоног</ToggleGroupItem>
          <ToggleGroupItem value="month">Сар</ToggleGroupItem>
        </ToggleGroup>
      </ShowcaseBlock>
    </section>
  )
}

function FeedbackDemos() {
  return (
    <section id="feedback" className="flex scroll-mt-24 flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Хариу
        </h2>
        <p className="text-sm text-muted-foreground">
          Төлөв, анхааруулга, ачаалал.
        </p>
      </header>

      <ShowcaseBlock title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Идэвхтэй</Badge>
          <Badge variant="secondary">Хүлээгдэж буй</Badge>
          <Badge variant="outline">Ноорог</Badge>
          <Badge variant="destructive">Хоцорсон</Badge>
          <Badge variant="ghost">Нэмэлт</Badge>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Toast">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast.success("Хадгаллаа")}>
            Амжилттай
          </Button>
          <Button variant="outline" onClick={() => toast.error("Алдаа гарлаа")}>
            Алдаа
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Шинэ даалгавар")}
          >
            Мэдээлэл
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Хугацаа дуусч байна")}
          >
            Анхааруулга
          </Button>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Alert">
        <div className="flex flex-col gap-3">
          <Alert>
            <BellIcon />
            <AlertTitle>Шинэ даалгавар</AlertTitle>
            <AlertDescription>
              Математикийн 3-р даалгаврыг пүрэв гэхэд илгээнэ үү.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>Хугацаа дууссан</AlertTitle>
            <AlertDescription>
              Физикийн тайланг хугацаанд нь илгээгээгүй.
            </AlertDescription>
          </Alert>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Progress">
        <Progress value={64} className="max-w-md">
          <ProgressLabel>Хичээлийн явц</ProgressLabel>
          <ProgressValue />
        </Progress>
      </ShowcaseBlock>

      <ShowcaseBlock title="Spinner">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner />
          Ачааллаж байна
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Skeleton">
        <div className="flex max-w-md flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Empty">
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>Даалгавар алга</EmptyTitle>
            <EmptyDescription>
              Энэ хичээлд одоогоор даалгавар нэмээгүй байна.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </ShowcaseBlock>
    </section>
  )
}

function FormsDemos() {
  return (
    <section id="forms" className="flex scroll-mt-24 flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Форм
        </h2>
        <p className="text-sm text-muted-foreground">
          Оролт, сонголт, баталгаажуулалт.
        </p>
      </header>

      <ShowcaseBlock title="Field + Input">
        <FieldGroup className="max-w-md">
          <Field>
            <FieldLabel htmlFor="student-name">Сурагчийн нэр</FieldLabel>
            <Input id="student-name" placeholder="Бат-Эрдэнэ" />
            <FieldDescription>Бүртгэлийн нэрээр хайна.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="note">Тэмдэглэл</FieldLabel>
            <Textarea id="note" placeholder="Багшийн тэмдэглэл…" />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="notify" />
            <FieldLabel htmlFor="notify">Эцэг эхэд мэдэгдэх</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Switch id="publish" />
            <Label htmlFor="publish">Нийтлэх</Label>
          </Field>
        </FieldGroup>
      </ShowcaseBlock>

      <ShowcaseBlock title="RadioGroup">
        <FieldSet className="max-w-md">
          <FieldLegend variant="label">Түвшин</FieldLegend>
          <RadioGroup defaultValue="mid">
            <FieldLabel>
              <RadioGroupItem value="easy" />
              Хялбар
            </FieldLabel>
            <FieldLabel>
              <RadioGroupItem value="mid" />
              Дунд
            </FieldLabel>
            <FieldLabel>
              <RadioGroupItem value="hard" />
              Хүнд
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </ShowcaseBlock>

      <ShowcaseBlock title="Slider">
        <Field className="max-w-md">
          <FieldLabel>Дүнгийн босго</FieldLabel>
          <Slider defaultValue={60} max={100} step={1} />
        </Field>
      </ShowcaseBlock>

      <ShowcaseBlock title="Select">
        <Select items={[...SUBJECTS]} defaultValue={null}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {SUBJECTS.filter((item) => item.value != null).map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ShowcaseBlock>

      <ShowcaseBlock title="InputGroup">
        <InputGroup className="max-w-md">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Сурагч хайх" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Хайх</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </ShowcaseBlock>

      <ShowcaseBlock title="InputOTP">
        <Field className="max-w-md">
          <FieldLabel htmlFor="otp">Баталгаажуулах код</FieldLabel>
          <InputOTP id="otp" maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>Утсанд ирсэн 6 оронтой код.</FieldDescription>
        </Field>
      </ShowcaseBlock>

      <DatePickerDemos />
    </section>
  )
}

function DatePickerDemos() {
  const [date, setDate] = useState<Date>()
  const [range, setRange] = useState<DateRange>()

  return (
    <ShowcaseBlock title="DatePicker">
      <FieldGroup className="max-w-md">
        <Field>
          <FieldLabel htmlFor="due-date">Дуусах огноо</FieldLabel>
          <DatePicker
            id="due-date"
            value={date}
            onChange={setDate}
            placeholder="Огноо сонгох"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="lesson-range">Хичээлийн хугацаа</FieldLabel>
          <DateRangePicker
            id="lesson-range"
            value={range}
            onChange={setRange}
            placeholder="Хугацаа сонгох"
          />
        </Field>
      </FieldGroup>
    </ShowcaseBlock>
  )
}

function SurfacesDemos() {
  return (
    <section id="surfaces" className="flex scroll-mt-24 flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Гадаргуу
        </h2>
        <p className="text-sm text-muted-foreground">
          Карт, жагсаалт, хүснэгт.
        </p>
      </header>

      <ShowcaseBlock title="Card">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Математик 7-р анги</CardTitle>
            <CardDescription>24 сурагч · Багш Д. Болормаа</CardDescription>
          </CardHeader>
          <CardContent>
            Дараагийн шалгалт пүрэв гарагт. Дундаж дүн 86.
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Нээх</Button>
            <Button size="sm" variant="outline">
              Засах
            </Button>
          </CardFooter>
        </Card>
      </ShowcaseBlock>

      <ShowcaseBlock title="Separator">
        <div className="flex max-w-md items-center gap-3 text-sm">
          <span>Хичээл</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-muted-foreground">Даалгавар</span>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Item">
        <ItemGroup className="max-w-md">
          {STUDENTS.map((student) => (
            <Item key={student.name} variant="outline">
              <ItemMedia variant="icon">
                <Avatar>
                  <AvatarFallback>{student.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{student.name}</ItemTitle>
                <ItemDescription>
                  {student.city} · {student.score} оноо
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </ShowcaseBlock>

      <ShowcaseBlock title="Avatar">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>Б</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>С</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>Т</AvatarFallback>
          </Avatar>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Accordion">
        <Accordion defaultValue={["grades"]} className="max-w-md">
          <AccordionItem value="grades">
            <AccordionTrigger>Дүнгийн бүтэц</AccordionTrigger>
            <AccordionContent>
              Шалгалт 40%, даалгавар 40%, ирц 20%.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rules">
            <AccordionTrigger>Дүрэм</AccordionTrigger>
            <AccordionContent>
              Хоцорсон даалгавар 10% хасагдана.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseBlock>

      <ShowcaseBlock title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Сурагч</TableHead>
              <TableHead>Хот</TableHead>
              <TableHead>Дүн</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STUDENTS.map((student) => (
              <TableRow key={student.name}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.city}</TableCell>
                <TableCell>{student.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseBlock>
    </section>
  )
}

function OverlaysDemos() {
  return (
    <section id="overlays" className="flex scroll-mt-24 flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Давхарга
        </h2>
        <p className="text-sm text-muted-foreground">Диалог, цэс, зөвлөмж.</p>
      </header>

      <ShowcaseBlock title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button />}>Дүн оруулах</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Дүн оруулах</DialogTitle>
              <DialogDescription>
                Бат-Эрдэнийн математикийн дүнг шинэчилнэ.
              </DialogDescription>
            </DialogHeader>
            <Field>
              <FieldLabel htmlFor="score">Оноо</FieldLabel>
              <Input id="score" defaultValue="96" />
            </Field>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Цуцлах
              </DialogClose>
              <Button>Хадгалах</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowcaseBlock>

      <ShowcaseBlock title="DialogFeedback">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button />}>Амжилттай</DialogTrigger>
            <DialogFeedback
              variant="success"
              title="Хадгаллаа"
              description="Дүн амжилттай шинэчлэгдлээ."
            />
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button variant="destructive" />}>
              Алдаа
            </DialogTrigger>
            <DialogFeedback
              variant="error"
              title="Алдаа гарлаа"
              description="Сервертэй холбогдож чадсангүй."
              confirmLabel="Хаах"
              cancelLabel="Буцах"
            />
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Анхааруулга
            </DialogTrigger>
            <DialogFeedback
              variant="warning"
              title="Хугацаа дуусч байна"
              description="Физикийн тайланг маргааш гэхэд илгээнэ үү."
              cancelLabel="Цуцлах"
            />
          </Dialog>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Sheet">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            Сурагчийн хуудас
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Бат-Эрдэнэ</SheetTitle>
              <SheetDescription>7-р анги · Улаанбаатар</SheetDescription>
            </SheetHeader>
            <div className="px-6 text-sm text-muted-foreground">
              Сүүлийн дүн 96. Ирц 98%.
            </div>
            <SheetFooter>
              <Button>Засах</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ShowcaseBlock>

      <ShowcaseBlock title="Popover">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Шүүлтүүр
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Анги шүүх</PopoverTitle>
              <PopoverDescription>
                Зөвхөн 7-р ангийг харуулна.
              </PopoverDescription>
            </PopoverHeader>
            <Button size="sm">Хэрэглэх</Button>
          </PopoverContent>
        </Popover>
      </ShowcaseBlock>

      <ShowcaseBlock title="HoverCard">
        <HoverCard>
          <HoverCardTrigger render={<Button variant="link" />}>
            Д. Болормаа
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="font-medium">Д. Болормаа</p>
            <p className="text-muted-foreground">Математик багш · 12 хичээл</p>
          </HoverCardContent>
        </HoverCard>
      </ShowcaseBlock>

      <ShowcaseBlock title="Tooltip">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Ирц
          </TooltipTrigger>
          <TooltipContent>Энэ сарын ирц 98%</TooltipContent>
        </Tooltip>
      </ShowcaseBlock>

      <ShowcaseBlock title="DropdownMenu">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Үйлдлүүд
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Хичээл</DropdownMenuLabel>
              <DropdownMenuItem>Засах</DropdownMenuItem>
              <DropdownMenuItem>Хувилах</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Устгах</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseBlock>
    </section>
  )
}

function NavDemos() {
  return (
    <section id="nav" className="flex scroll-mt-24 flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Навигаци
        </h2>
        <p className="text-sm text-muted-foreground">Таб, мөрийн зам.</p>
      </header>

      <ShowcaseBlock title="Tabs">
        <Tabs defaultValue="lessons">
          <TabsList>
            <TabsTrigger value="lessons">Хичээл</TabsTrigger>
            <TabsTrigger value="tasks">Даалгавар</TabsTrigger>
            <TabsTrigger value="grades">Дүн</TabsTrigger>
          </TabsList>
          <TabsContent value="lessons">
            Энэ долоо хоногт 4 хичээл үлдсэн.
          </TabsContent>
          <TabsContent value="tasks">2 даалгавар хүлээгдэж байна.</TabsContent>
          <TabsContent value="grades">Ангийн дундаж 86.</TabsContent>
        </Tabs>
      </ShowcaseBlock>

      <ShowcaseBlock title="BottomNav">
        <BottomNavDemo />
      </ShowcaseBlock>

      <ShowcaseBlock title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/showcase">Нүүр</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/showcase">Хичээл</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Математик</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ShowcaseBlock>
    </section>
  )
}

type BottomNavTab = "home" | "lessons" | "tasks" | "profile"

function BottomNavDemo() {
  const [tab, setTab] = useState<BottomNavTab>("home")

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        {bottomNavLabel(tab)}
      </div>
      <BottomNav>
        <BottomNavItem
          icon={HouseIcon}
          label="Нүүр"
          active={tab === "home"}
          onClick={() => setTab("home")}
        />
        <BottomNavItem
          icon={BookOpenIcon}
          label="Хичээл"
          active={tab === "lessons"}
          onClick={() => setTab("lessons")}
        />
        <BottomNavItem
          icon={ClipboardListIcon}
          label="Даалгавар"
          active={tab === "tasks"}
          onClick={() => setTab("tasks")}
        />
        <BottomNavItem
          icon={UserRoundIcon}
          label="Профайл"
          active={tab === "profile"}
          onClick={() => setTab("profile")}
        />
      </BottomNav>
    </div>
  )
}

function bottomNavLabel(tab: BottomNavTab) {
  switch (tab) {
    case "home":
      return "Нүүр"
    case "lessons":
      return "Хичээл"
    case "tasks":
      return "Даалгавар"
    case "profile":
      return "Профайл"
    default: {
      const _never: never = tab
      return _never
    }
  }
}
