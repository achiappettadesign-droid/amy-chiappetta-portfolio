import type { Metadata } from 'next'
import { PrintGrid } from '@/components/PrintGrid'
import site from '@/content/site'

export const metadata: Metadata = {
  title: 'Prints',
  description:
    'Hand-pulled prints and digital works by Amy Chiappetta — screenprints, relief prints, and more.',
}

export default function PrintsPage() {
  return (
    <section className="px-6 py-16 md:px-12">
      <h1
        className="mb-10 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl"
        style={{ color: 'var(--color-ink)' }}
      >
        Prints
      </h1>

      <PrintGrid prints={site.prints} />
    </section>
  )
}
