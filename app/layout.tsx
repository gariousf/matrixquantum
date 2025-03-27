import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '$MQT',
  description: 'Matrix Quantum Terminal - Explore the quantum realm with contract CA: 12ajpBibVyBiiyK7jCamwk2KxBGSfszUL7nqoMFJpump',
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
