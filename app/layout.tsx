import './globals.css'
import React from 'react'
import { Inter, Courier_Prime } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import { type Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Ronald Hatcher',
  description: 'This is a blog.'
}

const mono = Courier_Prime({
  weight: '400',
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
          <SpeedInsights />
          {children}
        </main>
      </body>
    </html>
  )
}
