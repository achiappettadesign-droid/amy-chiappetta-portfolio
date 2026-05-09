'use client'

import { NoRightClickImage } from './NoRightClickImage'
import type { Print } from '@/content/site'

type Props = {
  print: Print
  index: number
  onClick: (index: number) => void
  priority?: boolean
  loading?: 'eager' | 'lazy'
}

export function PrintTile({ print, index, onClick, priority, loading }: Props) {
  return (
    <button
      onClick={() => onClick(index)}
      data-print-index={index}
      aria-label={`View print ${print.number}${print.alt ? ': ' + print.alt : ''}`}
      className="block w-full cursor-pointer overflow-hidden bg-transparent p-0 text-left"
    >
      <div className="overflow-hidden">
        <NoRightClickImage
          src={print.src}
          alt={print.alt || `Print ${print.number}`}
          width={print.width}
          height={print.height}
          className="w-full transition-transform duration-200 ease-out hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          priority={priority}
          loading={priority ? undefined : loading}
        />
      </div>
    </button>
  )
}
