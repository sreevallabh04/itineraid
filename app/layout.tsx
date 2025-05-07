import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { NavBar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "ItinerAid - Your Cinematic Travel Planner",
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
  applicationName: 'ItinerAid',
  keywords: ['travel', 'itinerary', 'trip planner', 'vacation', 'journey'],
  authors: [{ name: 'ItinerAid Team' }],
  creator: 'ItinerAid',
  publisher: 'ItinerAid',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#5f22d9" }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} bg-black text-white min-h-screen antialiased`}>
        <AuthProvider>
          <NavBar />
          <div className="flex flex-col fade-in-animation">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
