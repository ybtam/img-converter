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
          'flex flex-col justify-between items-center justify-items-center',
          'min-h-screen bg-neutral-100 font-sans sm:p-0',
        )}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
