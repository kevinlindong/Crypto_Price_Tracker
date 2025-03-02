import type React from "react"
import type { Metadata } from "next"
import { Outfit, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const outfitFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetbrainsMonoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Crypto Price Tracker",
  description: "Track cryptocurrency prices in real-time",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* You can add additional head elements here if needed */}
      </head>
      <body className={`${outfitFont.variable} ${jetbrainsMonoFont.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}