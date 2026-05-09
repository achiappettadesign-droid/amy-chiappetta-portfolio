import Image from 'next/image'
import type { Print } from '@/content/site'

export function PrintsPreloader({ prints }: { prints: Print[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed h-0 w-0 overflow-hidden opacity-0">
      {prints.map((print) => (
        <Image
          key={print.number}
          src={print.src}
          alt=""
          width={print.width}
          height={print.height}
          sizes="33vw"
          quality={85}
          priority
        />
      ))}
    </div>
  )
}
