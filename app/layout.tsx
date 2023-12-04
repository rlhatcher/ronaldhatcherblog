import './globals.css'
import React from 'react'
import { Inter, Red_Hat_Mono } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ronald Hatcher',
  description: 'This is a blog.'
}

const mono = Red_Hat_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap'
})

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' className={`${mono.variable} ${sans.variable}`}>
      <body>
        <main>
          <GoogleAnalytics />
          {children}
        </main>
      </body>
    </html>
  )
}
