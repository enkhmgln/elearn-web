import { ShowcaseBlock } from "./showcase-block"

const SIZES = [
  { name: "text-xs", className: "text-xs" },
  { name: "text-sm", className: "text-sm" },
  { name: "text-base", className: "text-base" },
  { name: "text-lg", className: "text-lg" },
  { name: "text-xl", className: "text-xl" },
  { name: "text-2xl", className: "text-2xl" },
  { name: "text-3xl", className: "text-3xl" },
  { name: "text-4xl", className: "text-4xl" },
] as const

const WEIGHTS = [
  { name: "Thin", className: "font-thin" },
  { name: "Light", className: "font-light" },
  { name: "Regular", className: "font-normal" },
  { name: "Medium", className: "font-medium" },
  { name: "Semibold", className: "font-semibold" },
  { name: "Bold", className: "font-bold" },
  { name: "Extrabold", className: "font-extrabold" },
  { name: "Black", className: "font-black" },
] as const

export function TypographySection() {
  return (
    <section id="type" className="scroll-mt-24 flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Үсэг
        </h2>
        <p className="text-sm text-muted-foreground">
          GIP нэг гэр бүл — гарчиг, бие, моно бүгд ижил.
        </p>
      </header>

      <ShowcaseBlock title="Хэмжээ">
        <div className="flex flex-col gap-3">
          {SIZES.map((size) => (
            <p key={size.name} className={size.className}>
              <span className="mr-3 text-muted-foreground">{size.name}</span>
              Сургалтын систем
            </p>
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Жин">
        <div className="flex flex-col gap-2">
          {WEIGHTS.map((weight) => (
            <p key={weight.name} className={`text-xl ${weight.className}`}>
              {weight.name} — Энэ хичээлд 24 сурагч бүртгэлтэй.
            </p>
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Гарчиг ба бие">
        <div className="flex max-w-xl flex-col gap-3">
          <h3 className="font-heading text-3xl font-semibold tracking-tight">
            Математик 7-р анги
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            Энэ хичээлд 24 сурагч бүртгэлтэй. Дараагийн шалгалт пүрэв гарагт
            болно. Багш дүнг 2024/12/31-нд хаах ёстой.
          </p>
        </div>
      </ShowcaseBlock>
    </section>
  )
}
