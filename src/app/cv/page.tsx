import type { Metadata } from 'next'
import { MailtoButton } from '@/components/MailtoButton'
import site from '@/content/site'

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum vitae — Amy Chiappetta, printmaker and designer.',
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-6 border-b pb-3 text-xs font-bold uppercase tracking-widest print:border-gray-300"
      style={{ borderColor: 'var(--color-green)', color: 'var(--color-green)' }}
    >
      {children}
    </h2>
  )
}

export default function CvPage() {
  const { education, exhibitions, selectedWork } = site.cv

  return (
    <>
      <section className="px-6 pb-16 pt-16 md:px-12">
        {/* Name / header */}
        <h1
          className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl"
          style={{ color: 'var(--color-ink)' }}
        >
          Amy Chiappetta
        </h1>
        <p
          className="mt-3 text-lg font-medium italic"
          style={{ color: 'var(--color-green)' }}
        >
          Printmaker &amp; Designer
        </p>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="max-w-2xl space-y-14">

          {/* Education */}
          <div>
            <SectionHeading>Education</SectionHeading>
            <ul className="space-y-4">
              {education.map((ed) => (
                <li key={`${ed.degree}-${ed.field}`}>
                  <p
                    className="font-bold"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {ed.degree}, {ed.field}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-green)' }}
                  >
                    {ed.institution}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Exhibitions */}
          <div>
            <SectionHeading>Recent Exhibitions</SectionHeading>
            <ul className="space-y-3">
              {exhibitions.map((ex) => (
                <li key={ex.title}>
                  <p
                    className="font-medium leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {ex.title}
                  </p>
                  {(ex.year || ex.venue) && (
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-green)' }}
                    >
                      {[ex.year, ex.venue].filter(Boolean).join(' — ')}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Work */}
          <div>
            <SectionHeading>Selected Work</SectionHeading>
            <ul className="space-y-3">
              {selectedWork.map((w) => (
                <li key={w.title}>
                  <p
                    className="font-bold"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {w.title}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-green)' }}
                  >
                    {w.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <SectionHeading>Contact</SectionHeading>
            <ul className="space-y-2 text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Instagram — @chiappettaamy
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  LinkedIn — amy-chiappetta
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="print:hidden">
            <MailtoButton />
          </div>
        </div>
      </section>
    </>
  )
}
