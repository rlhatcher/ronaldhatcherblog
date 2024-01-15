import '@/app/ui/globals.css'
import React from 'react'
import { inter, courier } from '@/app/lib/fonts'
import GoogleAnalytics from '@/app/ui/GoogleAnalytics'
import { type Metadata } from 'next'

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
    <html lang='en' className={`${courier.variable} antialiased ${inter.variable} antialiased`}>
      <body>
        <main>
          <GoogleAnalytics />
          {children}
        </main>
      </body>
    </html>
  )
}
