import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Đếm ngược ngày thi Tốt nghiệp THPT 2025 | Countdown to National Exam 2025",
  description: "A6 22-25 Bình Dương",
  keywords: "THPT 2025, thi tốt nghiệp, đếm ngược, học tập, thi cử, Việt Nam",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-9GWDFFRMRS" />
    </html>
  )
}
