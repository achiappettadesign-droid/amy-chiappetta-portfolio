import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Page Not Found' }

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center px-6 md:px-12">
      <p
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: 'var(--color-green)' }}
      >
        404
      </p>
      <h1
        className="mt-3 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl"
        style={{ color: 'var(--color-ink)' }}
      >
        Page not found
      </h1>
      <Link
        href="/"
        className="mt-8 text-sm font-bold uppercase tracking-widest underline underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-ink)' }}
      >
        ← Back home
      </Link>
    </section>
  )
}
