import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  description: 'Created by Yi and Mateusz',
  title: 'Image Converter',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          'grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-0',
        )}
      >
        <Header />
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
