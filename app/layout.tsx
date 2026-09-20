import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const gip = localFont({
  src: [
    { path: "./fonts/GIP-Thin.otf", weight: "100", style: "normal" },
    { path: "./fonts/GIP-UltraLight.otf", weight: "200", style: "normal" },
    { path: "./fonts/GIP-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/GIP-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/GIP-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/GIP-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/GIP-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/GIP-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "./fonts/GIP-Heavy.otf", weight: "900", style: "normal" },
    { path: "./fonts/GIP-Black.otf", weight: "950", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={cn("scroll-smooth! font-sans antialiased", gip.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
