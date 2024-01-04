import { Inter, Courier_Prime } from 'next/font/google'

export const courier = Courier_Prime({
  weight: '400',
  variable: '--font-courier',
  subsets: ['latin'],
  display: 'swap'
})

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})
