import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '$MQT',
  description: 'Matrix Quantum Terminal - Explore the quantum realm with advanced algorithms like Cauchy\'s integral formula for matrix functions. Contract CA: 12ajpBibVyBiiyK7jCamwk2KxBGSfszUL7nqoMFJpump',
  generator: 'MQT',
  keywords: ['quantum computing', 'matrix functions', 'Cauchy integral', 'blockchain'],
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
