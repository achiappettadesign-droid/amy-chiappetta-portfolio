'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/about', label: 'ABOUT' },
  { href: '/prints', label: 'PRINTS' },
  { href: '/daymade', label: 'DAYMADE' },
  { href: '/cv', label: 'CV' },
]

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: Props) {
  const pathname = usePathname()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Lock body scroll and move focus to close button when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex flex-col px-6 py-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Close button */}
      <div className="flex justify-end">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close navigation"
          className="p-2 cursor-pointer"
          style={{ color: 'var(--color-ink)' }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="3" x2="21" y2="21" />
            <line x1="21" y1="3" x2="3" y2="21" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col justify-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-5xl font-black uppercase leading-none tracking-tight transition-colors"
            style={{ color: 'var(--color-ink)' }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
