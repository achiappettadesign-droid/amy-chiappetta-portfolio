import type { Metadata } from 'next'
import { NoRightClickImage } from '@/components/NoRightClickImage'
import { DaymadeSection } from '@/components/DaymadeSection'
import site from '@/content/site'

export const metadata: Metadata = {
  title: 'Daymade',
  description: 'Branding, social, and creative direction for Daymade — by Amy Chiappetta.',
}

export default function DaymadePage() {
  const { intro, branding, chuck } = site.daymade

  const pageHeader = branding.find((img) => img.fullWidth)
  const galleryImages = branding.filter((img) => !img.fullWidth)

  return (
    <>
      {/* ── Intro ─────────────────────────── */}
      <section className="px-6 pb-12 pt-16 md:px-12">
        <h1
          className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl"
          style={{ color: 'var(--color-ink)' }}
        >
          Daymade
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg font-medium leading-relaxed"
          style={{ color: 'var(--color-ink)' }}
        >
          {intro}
        </p>
      </section>

      {/* ── Page header — full-bleed ──────── */}
      {pageHeader && (
        <div className="w-full">
          <NoRightClickImage
            src={pageHeader.src}
            alt={pageHeader.alt || 'Daymade branding header'}
            width={pageHeader.width}
            height={pageHeader.height}
            className="w-full"
            sizes="100vw"
            quality={85}
            priority
          />
        </div>
      )}

      {/* ── Branding gallery — 2-col ──────── */}
      <DaymadeSection
        heading="Branding"
        images={galleryImages}
        columns={2}
        imageSizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* ── Meet Chuck ────────────────────── */}
      <DaymadeSection
        heading="Meet Chuck the Rooster"
        caption="A mascot character developed for the Daymade brand."
        images={chuck}
        columns={3}
        imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </>
  )
}
