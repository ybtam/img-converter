import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

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
          'grid grid-rows-[auto_1fr_auto] gap-16',
          'items-center justify-items-center',
          "bg-neutral-100 font-sans  min-h-screen  sm:p-0"
        )}
      >
        <Header />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
