import '@/styles/globals.css'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { type Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import Container from '@/components/container'
import { DataMenu } from '@/components/data-menu'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { buttonVariants } from '@/components/ui/button'
import { fontSans, fontMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'
export const metadata: Metadata = {
  title: 'Ronald Hatcher',
  description: 'This is a blog.',
}

function Intro(): JSX.Element {
  return (
    <section className="mb-4 mt-2 flex flex-col items-center border-b-2 font-mono md:mb-4 md:flex-row md:justify-between">
      <Link href="/">
        <h1 className="flex-grow text-3xl font-light leading-tight tracking-tighter md:pr-8 md:text-3xl">
          Ronald Hatcher.
        </h1>
      </Link>

      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <nav className="flex items-center">
          <DataMenu />
          <Link
            href="https://github.com/rlhatcher"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0'
              )}
            >
              <GitHubLogoIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/in/ronaldhatcher/"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0'
              )}
            >
              <LinkedInLogoIcon className="h-4 w-4 fill-current" />
              <span className="sr-only">LinkedIn</span>
            </div>
          </Link>
          <ModeToggle />
        </nav>
      </div>
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
