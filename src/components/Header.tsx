'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'
import { MobileNav } from './MobileNav'

const navLinks = [
  { href: '/about', label: 'ABOUT' },
  { href: '/prints', label: 'PRINTS' },
  { href: '/daymade', label: 'DAYMADE' },
  { href: '/cv', label: 'CV' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1px solid rgba(47,41,43,0.12)',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="text-sm font-black uppercase tracking-widest"
          style={{ color: 'var(--color-ink)' }}
        >
          AMY CHIAPPETTA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest transition-colors duration-150"
              style={{ color: 'var(--color-ink)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-green)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-ink)')
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="p-2 cursor-pointer md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          style={{ color: 'var(--color-ink)' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      <MobileNav isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
