import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Notion Vibe',
  description:
    'Notion Vibe is your stylish web-organizer!\n' +
    'Create lists, tasks, control notes and deadlines. Everything is simple, fast and convenient. Come in and start using it!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} cz-shortcut-listen='true'>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
