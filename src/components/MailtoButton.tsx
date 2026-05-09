import site from '@/content/site'

export function MailtoButton() {
  return (
    <a
      href={`mailto:${site.email}?subject=Hello`}
      className="inline-block border-2 border-ink px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors duration-150 hover:bg-ink hover:text-bg"
    >
      Let&rsquo;s get in touch.
    </a>
  )
}
