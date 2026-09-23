import { gip } from "@/assets/fonts"
import { Providers } from "@/components/providers"
import { getServerSession } from "@/lib/session/server"
import { cn } from "@/lib/utils"
import "./globals.css"

export { metadata } from "@/lib/metadata"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html
      lang="mn"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn("scroll-smooth! font-sans antialiased", gip.variable)}
    >
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
