import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { FeaturedStrip } from '@/components/FeaturedStrip'
import { PrintsPreloader } from '@/components/PrintsPreloader'
import site from '@/content/site'

export const metadata: Metadata = {
  title: 'Amy Chiappetta — Print & Design',
  description:
    'Amy Chiappetta is a printmaker and designer based in Illinois. Hand-pulled prints, identity work, and creative direction.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedStrip />
      <PrintsPreloader prints={site.prints} />
    </>
  )
}
