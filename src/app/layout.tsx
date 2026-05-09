import type { Metadata } from 'next'
import { archivo } from '@/lib/fonts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageFade } from '@/components/PageFade'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Amy Chiappetta',
    template: 'Amy Chiappetta — %s',
  },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  description:
    'Amy Chiappetta is a printmaker and designer based in Illinois. Hand-pulled prints, identity work, and creative direction.',
  openGraph: {
    type: 'website',
    siteName: 'Amy Chiappetta',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
      </body>
    </html>
  )
}
