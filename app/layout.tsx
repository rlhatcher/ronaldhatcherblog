import '@/styles/globals.css'
import { type Metadata } from 'next'
import React from 'react'

import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/components/theme-provider'
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
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
