'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { Print } from '@/content/site'

type Props = {
  prints: Print[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ prints, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closingIndexRef = useRef(currentIndex)
  const touchStartX = useRef(0)

  const current = prints[currentIndex]
  const total = prints.length

  const goPrev = useCallback(() => {
    setIsLoading(true)
    setCurrentIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIsLoading(true)
    setCurrentIndex((i) => (i + 1) % total)
  }, [total])

  const handleClose = useCallback(() => {
    const idx = closingIndexRef.current
    onClose()
    // Restore focus to the tile that opened the lightbox
    requestAnimationFrame(() => {
      const tile = document.querySelector<HTMLElement>(`[data-print-index="${idx}"]`)
      tile?.focus()
    })
  }, [onClose])

  // Keep the closing-index ref up to date
  useEffect(() => {
    closingIndexRef.current = currentIndex
  }, [currentIndex])

  // Keyboard: ESC to close, arrow keys to navigate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [handleClose, goPrev, goNext])

  // Lock body scroll and move focus to close button on open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Focus trap — Tab cycles only within the dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Print ${currentIndex + 1} of ${total}`}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(47, 41, 43, 0.92)' }}
      // Click anywhere on the backdrop closes — but not clicks on the image area
      onClick={handleClose}
    >
      {/* ✕ Close */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 z-10 cursor-pointer p-2"
        style={{ color: 'var(--color-bg)' }}
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

      {/* ← Prev — hidden on mobile (swipe instead) */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        aria-label="Previous print"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 cursor-pointer p-4 text-2xl font-light md:block"
        style={{ color: 'var(--color-bg)' }}
      >
        ←
      </button>

      {/* → Next — hidden on mobile (swipe instead) */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        aria-label="Next print"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 cursor-pointer p-4 text-2xl font-light md:block"
        style={{ color: 'var(--color-bg)' }}
      >
        →
      </button>

      {/* Image — click stops propagation so it doesn't close the lightbox */}
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 50) {
            diff > 0 ? goNext() : goPrev()
          }
        }}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div
            className="absolute h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: 'var(--color-bg)', borderTopColor: 'transparent' }}
            aria-hidden="true"
          />
        )}

        <Image
          src={current.src}
          alt={current.alt || `Print ${current.number}`}
          width={current.width}
          height={current.height}
          style={{
            maxWidth: '95vw',
            maxHeight: '90vh',
            width: 'auto',
            height: 'auto',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.15s ease',
          }}
          sizes="95vw"
          quality={90}
          priority
          onLoad={() => setIsLoading(false)}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>

      {/* X / N counter */}
      <p
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest"
        style={{ color: 'var(--color-bg)' }}
        aria-live="polite"
        aria-atomic="true"
      >
        {currentIndex + 1} / {total}
      </p>
    </div>
  )
}
