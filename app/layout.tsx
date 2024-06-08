import '@/styles/globals.css'
import { type Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import Container from '@/components/container'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/components/theme-provider'
import { fontSans, fontMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Ronald Hatcher',
  description: 'This is a blog.',
}

function Intro(): JSX.Element {
  return (
    <section className="mb-4 mt-2 flex flex-col items-center bg-secondary font-mono md:mb-4 md:flex-row md:justify-between">
      <Link href="/">
        <h1 className="flex-grow text-3xl font-bold leading-tight tracking-tighter md:pr-8 md:text-3xl">
          Ronald Hatcher.
        </h1>
      </Link>
      <h2 className="mt-2 text-center text-xl md:pl-8 md:text-left">
        Personal notes and projects.
      </h2>
    </section>
  )
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
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
        <div>
          <GoogleAnalytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {' '}
            <Container>
              <Intro />
              {modal}
              {children}
            </Container>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
