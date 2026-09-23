import { gip } from "@/assets/fonts"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"
import "./globals.css"

export { metadata } from "@/lib/metadata"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="mn"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn("scroll-smooth! font-sans antialiased", gip.variable)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
