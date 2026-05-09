import type { Metadata } from 'next'
import { NoRightClickImage } from '@/components/NoRightClickImage'
import { MailtoButton } from '@/components/MailtoButton'
import site from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Amy Chiappetta is a printmaker and designer based in Illinois. BFA Printmaking, BS Art Education — Illinois State University.',
}

export default function AboutPage() {
  return (
    <>
      {/* ── Intro block ───────────────────── */}
      <section className="px-6 pb-12 pt-16 md:px-12">
        <h1
          className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl"
          style={{ color: 'var(--color-ink)' }}
        >
          A little about me
        </h1>
      </section>

      {/* ── Portrait + Bio ────────────────── */}
      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Portrait */}
          <div className="overflow-hidden">
            <NoRightClickImage
              src="/portrait.jpg"
              alt="Amy Chiappetta"
              width={3367}
              height={5050}
              className="w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              priority
            />
          </div>

          {/* Bio + CTA */}
          <div className="flex flex-col justify-center">
            <p
              className="text-lg font-medium leading-relaxed md:text-xl"
              style={{ color: 'var(--color-ink)' }}
            >
              {site.bio}
            </p>

            <div className="mt-10">
              <MailtoButton />
            </div>
          </div>
        </div>
      </section>

      {/* ── Instagram ─────────────────────── */}
      <section className="px-6 pb-20 md:px-12">
        <p
          className="text-sm font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-green)' }}
        >
          On Instagram
        </p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-lg font-medium underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
          style={{ color: 'var(--color-ink)' }}
        >
          @chiappettaamy →
        </a>
      </section>
    </>
  )
}
