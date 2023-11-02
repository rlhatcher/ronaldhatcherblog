import './globals.css'
import React from 'react'
import { Inter, Red_Hat_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

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
        <section className='min-h-screen'>
          <main>{children}</main>
        </section>
        <Analytics />
      </body>
    </html>
  )
}
