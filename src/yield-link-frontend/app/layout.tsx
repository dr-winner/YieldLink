import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Providers } from "./providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "YieldLink - Fair Prices for Farmers",
  description: "Get fair prices for your crops and track them from farm to table",
  generator: "YieldLink",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${workSans.variable} antialiased`}>
        <Providers>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
