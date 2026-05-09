'use client'

import { useState } from 'react'
import Masonry from 'react-masonry-css'
import { PrintTile } from './PrintTile'
import { Lightbox } from './Lightbox'
import type { Print } from '@/content/site'

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
}

type Props = {
  prints: Print[]
}

export function PrintGrid({ prints }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-3 md:gap-4"
        columnClassName="flex flex-col gap-3 md:gap-4"
      >
        {prints.map((print, i) => (
          <PrintTile
            key={print.number}
            print={print}
            index={i}
            onClick={setLightboxIndex}
            priority={i < 6}
            loading="eager"
          />
        ))}
      </Masonry>

      {lightboxIndex !== null && (
        <Lightbox
          prints={prints}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
