import './globals.css'
import React from 'react'
import { inter, courier } from '@/lib/fonts'
import GoogleAnalytics from './components/GoogleAnalytics'
import { type Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Ronald Hatcher',
  description: 'This is a blog.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' className={`${courier.variable} ${inter.variable}`}>
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
