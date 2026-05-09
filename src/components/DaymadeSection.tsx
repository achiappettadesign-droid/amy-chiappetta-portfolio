import { NoRightClickImage } from './NoRightClickImage'
import type { DaymadeImage } from '@/content/site'

type Props = {
  heading: string
  caption?: string
  images: DaymadeImage[]
  columns?: 2 | 3
  imageSizes?: string
}

export function DaymadeSection({
  heading,
  caption,
  images,
  columns = 2,
  imageSizes = '(max-width: 768px) 100vw, 50vw',
}: Props) {
  const containerClass =
    columns === 3
      ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4'
      : 'columns-1 gap-4 md:columns-2'

  return (
    <section className="px-6 py-12 md:px-12">
      <h2
        className="mb-2 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl"
        style={{ color: 'var(--color-ink)' }}
      >
        {heading}
      </h2>

      {caption && (
        <p
          className="mb-8 max-w-xl text-base font-medium italic"
          style={{ color: 'var(--color-green)' }}
        >
          {caption}
        </p>
      )}

      {!caption && <div className="mb-8" />}

      <div className={containerClass}>
        {images.map((img, i) => (
          <div key={img.src} className="mb-4 break-inside-avoid">
            <NoRightClickImage
              src={img.src}
              alt={img.alt || heading}
              width={img.width}
              height={img.height}
              className="w-full"
              sizes={imageSizes}
              quality={85}
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
