import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Itineraid - Your Cinematic Travel Planner",
  description: "Plan your journey with a cinematic, breathtaking travel itinerary planner",
  icons: {
    icon: [
      {
        url: "https://img.icons8.com/fluency/48/travel-visa.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        url: "https://img.icons8.com/fluency/96/travel-visa.png",
        sizes: "96x96",
        type: "image/png"
      }
    ],
    apple: {
      url: "https://img.icons8.com/fluency/96/travel-visa.png",
      sizes: "180x180",
      type: "image/png"
    },
    shortcut: "https://img.icons8.com/fluency/48/travel-visa.png"
  },
  manifest: "https://itineraid.vercel.app/manifest.json",
  generator: 'v0.dev',
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#5f22d9" }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
