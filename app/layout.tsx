import type React from "react"
import type { Metadata } from "next"
import { Rajdhani, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CyroGarage - Custom Windshield Stickers & Vinyl Graphics",
  description:
    "Premium plotter-cut windshield banners, car stickers, and custom vinyl graphics. Handcrafted in Thun, Switzerland.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
