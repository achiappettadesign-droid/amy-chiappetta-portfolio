import Link from 'next/link'
import { NoRightClickImage } from './NoRightClickImage'
import site from '@/content/site'
import type { Print } from '@/content/site'

export function FeaturedStrip() {
  const featuredPrints = site.featured
    .map((num) => site.prints.find((p) => p.number === num))
    .filter((p): p is Print => p !== undefined)

  if (featuredPrints.length === 0) return null

  return (
    <section className="px-6 pb-20 md:px-12">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {featuredPrints.map((print) => (
          <Link
            key={print.number}
            href="/prints"
            className="group block overflow-hidden"
            aria-label={`View print ${print.number} — go to prints`}
          >
            <NoRightClickImage
              src={print.src}
              alt={print.alt || `Print ${print.number}`}
              width={print.width}
              height={print.height}
              className="w-full transition-transform duration-200 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={85}
              priority
            />
          </Link>
        ))}
      </div>

      <div className="mt-6 text-right">
        <Link
          href="/prints"
          className="text-xs font-bold uppercase tracking-widest transition-colors duration-150"
          style={{ color: 'var(--color-green)' }}
        >
          View all prints →
        </Link>
      </div>
    </section>
  )
}
