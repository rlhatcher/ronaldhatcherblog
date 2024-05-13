import '@/app/ui/globals.css'
import { type Metadata } from 'next'
import React from 'react'

import GoogleAnalytics from '@/app/ui/GoogleAnalytics'
import { fontSans, fontMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Ronald Hatcher',
  description: 'This is a blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html
      lang="en"
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body>
        <main>
          <GoogleAnalytics />
          {children}
        </main>
      </body>
    </html>
  )
}
