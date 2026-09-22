import localFont from "next/font/local"

export const gip = localFont({
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
