export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto px-6 py-12 md:px-12"
      style={{ borderTop: '1px solid rgba(47,41,43,0.12)' }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Left: CTA + contact links */}
        <div className="flex flex-col gap-3">
          <p
            className="text-2xl font-black uppercase tracking-tight"
            style={{ color: 'var(--color-ink)' }}
          >
            Let&apos;s get in touch.
          </p>
          <a
            href="mailto:achiappettadesign@gmail.com?subject=Hello"
            className="text-sm underline underline-offset-4 transition-colors duration-150"
            style={{ color: 'var(--color-green)' }}
          >
            achiappettadesign@gmail.com
          </a>
          <a
            href="https://instagram.com/chiappettaamy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-150"
            style={{ color: 'var(--color-ink)' }}
          >
            Instagram → @chiappettaamy
          </a>
          <a
            href="https://www.linkedin.com/in/amy-chiappetta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-150"
            style={{ color: 'var(--color-ink)' }}
          >
            LinkedIn → amy-chiappetta
          </a>
        </div>

        {/* Right: copyright */}
        <p
          className="text-xs tracking-wide"
          style={{ color: 'rgba(47,41,43,0.5)' }}
        >
          © {year} Amy Chiappetta
        </p>
      </div>
    </footer>
  )
}
