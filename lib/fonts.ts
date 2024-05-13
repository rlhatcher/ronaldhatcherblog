import { Inter, Courier_Prime } from 'next/font/google'

export const fontMono = Courier_Prime({
  weight: '400',
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})
