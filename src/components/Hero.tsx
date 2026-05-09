import site from '@/content/site'

export function Hero() {
  return (
    <section className="px-6 pb-16 pt-20 md:px-12 md:pt-28">
      <h1
        className="text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-9xl"
        style={{ color: 'var(--color-ink)' }}
      >
        {site.name}
      </h1>

      <p
        className="mt-5 text-xl font-medium italic md:text-2xl"
        style={{ color: 'var(--color-green)' }}
      >
        {site.tagline}
      </p>

      <p
        className="mt-4 max-w-md text-lg font-medium leading-snug md:text-xl"
        style={{ color: 'var(--color-ink)' }}
      >
        {site.heroLine}
      </p>
    </section>
  )
}
