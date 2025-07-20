import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CropCare AI - Smart Crop Disease Detection",
  description: "AI-powered crop disease detection app for farmers with multilingual support",
  generator: "v0.dev",
  keywords: ["crop disease", "AI detection", "farming", "agriculture", "multilingual"],
  authors: [{ name: "Battu Pallavi & Battu Pavani" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#10b981",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
