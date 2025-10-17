import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalProvider } from '@/lib/GlobalProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ToastProvider'
import AuthProvider from '@/components/AuthProvider'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Store Next.js',
  description: 'A modern book store built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights/>
        <AuthProvider>
          <GlobalProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </ToastProvider>
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
