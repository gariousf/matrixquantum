import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '$MQT',
  description: 'Matrix Quantum Terminal',
  generator: 'MQT',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
