/**
 * One-shot asset ingest script.
 * Run once: npm run ingest
 *
 * What it does:
 *  - Copies prints 1–19 → public/artwork/prints/
 *  - Copies Daymade Branding images → public/artwork/daymade/branding/ (HEIC → jpg)
 *  - Copies Chuck images → public/artwork/daymade/chuck/
 *  - Copies portrait → public/portrait.jpg
 *  - Reads intrinsic dimensions for every image via sharp
 *  - Writes src/content/site.generated.ts with populated Print[] and DaymadeImage[] arrays
 *
 * After running:
 *  1. Review site.generated.ts
 *  2. Copy the printed arrays into src/content/site.ts
 *  3. Author alt text for every entry (required before launch)
 */

import { promises as fs } from 'fs'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
import sharp from 'sharp'
import type { Print, DaymadeImage } from '../src/content/site.js'

const execFileAsync = promisify(execFile)

const ROOT = process.cwd()
const IMAGES = path.join(ROOT, 'Images')
const PUBLIC = path.join(ROOT, 'public')

const SRC = {
  prints: path.join(IMAGES, 'Portfolio Prints Export'),
  branding: path.join(IMAGES, 'Marketing Images', 'Daymade', 'Daymade Branding'),
  chuck: path.join(IMAGES, 'Marketing Images', 'Daymade', 'Chuck'),
  portrait: path.join(IMAGES, 'Pics of Me', 'Daymade-7.jpg'),
}

const DEST = {
  prints: path.join(PUBLIC, 'artwork', 'prints'),
  branding: path.join(PUBLIC, 'artwork', 'daymade', 'branding'),
  chuck: path.join(PUBLIC, 'artwork', 'daymade', 'chuck'),
  portrait: path.join(PUBLIC, 'portrait.jpg'),
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff', '.heic', '.heif'])

async function ensureDirs() {
  for (const dir of [DEST.prints, DEST.branding, DEST.chuck]) {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function dimensions(filePath: string): Promise<{ width: number; height: number }> {
  const meta = await sharp(filePath).metadata()
  return { width: meta.width ?? 0, height: meta.height ?? 0 }
}

async function copyImage(src: string, dest: string): Promise<void> {
  const ext = path.extname(src).toLowerCase()
  if (ext === '.heic' || ext === '.heif') {
    // sharp's bundled libheif may not support HEIC decode; fall back to macOS sips
    await execFileAsync('/usr/bin/sips', ['-s', 'format', 'jpeg', src, '--out', dest])
    console.log(`  HEIC→JPG  ${path.basename(src)} → ${path.basename(dest)}`)
  } else {
    await fs.copyFile(src, dest)
    console.log(`  copied    ${path.basename(src)}`)
  }
}

async function ingestPrints(): Promise<Print[]> {
  console.log('\n── Prints ──────────────────────────')
  const files = await fs.readdir(SRC.prints)
  const prints: Print[] = []

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext)) continue

    const num = parseInt(path.basename(file, ext), 10)
    if (isNaN(num)) continue

    const src = path.join(SRC.prints, file)
    const destFile = `${num}${ext}`
    const dest = path.join(DEST.prints, destFile)

    await fs.copyFile(src, dest)
    const { width, height } = await dimensions(src)
    console.log(`  print ${num.toString().padStart(2, ' ')}  ${width}×${height}  ${file}`)

    prints.push({
      number: num,
      src: `/artwork/prints/${destFile}`,
      alt: '',
      width,
      height,
    })
  }

  prints.sort((a, b) => a.number - b.number)
  return prints
}

async function ingestDaymadeBranding(): Promise<DaymadeImage[]> {
  console.log('\n── Daymade Branding ────────────────')
  const files = await fs.readdir(SRC.branding)
  const images: DaymadeImage[] = []

  const PAGE_HEADER_KEYWORD = 'header'

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext)) continue

    const src = path.join(SRC.branding, file)
    const isHeic = ext === '.heic' || ext === '.heif'
    const safeBase = file.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '')
    const destExt = isHeic ? '.jpg' : ext
    const destFile = path.parse(safeBase).name + destExt
    const dest = path.join(DEST.branding, destFile)

    await copyImage(src, dest)
    const { width, height } = await dimensions(src)

    const isFullWidth = file.toLowerCase().includes(PAGE_HEADER_KEYWORD)
    images.push({
      src: `/artwork/daymade/branding/${destFile}`,
      alt: '',
      width,
      height,
      section: 'branding',
      ...(isFullWidth ? { fullWidth: true } : {}),
    })
  }

  return images
}

async function ingestChuck(): Promise<DaymadeImage[]> {
  console.log('\n── Chuck ───────────────────────────')
  const files = await fs.readdir(SRC.chuck)
  const images: DaymadeImage[] = []

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext)) continue

    const src = path.join(SRC.chuck, file)
    const safeFile = file.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '')
    const dest = path.join(DEST.chuck, safeFile)

    await copyImage(src, dest)
    const { width, height } = await dimensions(src)

    images.push({
      src: `/artwork/daymade/chuck/${safeFile}`,
      alt: '',
      width,
      height,
      section: 'chuck',
    })
  }

  return images
}

async function ingestPortrait() {
  console.log('\n── Portrait ────────────────────────')
  await fs.copyFile(SRC.portrait, DEST.portrait)
  const { width, height } = await dimensions(SRC.portrait)
  console.log(`  portrait  ${width}×${height}  Daymade-7.jpg → portrait.jpg`)
}

function toTs(value: unknown, indent = 0): string {
  const pad = ' '.repeat(indent)
  const inner = ' '.repeat(indent + 2)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value.map((v) => `${inner}${toTs(v, indent + 2)}`).join(',\n')
    return `[\n${items},\n${pad}]`
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${inner}${k}: ${toTs(v, indent + 2)}`)
      .join(',\n')
    return `{\n${entries},\n${pad}}`
  }
  return JSON.stringify(value)
}

async function writeGenerated(prints: Print[], branding: DaymadeImage[], chuck: DaymadeImage[]) {
  const out = path.join(ROOT, 'src', 'content', 'site.generated.ts')
  const content = `// AUTO-GENERATED by scripts/ingest-artwork.ts — do not edit directly.
// Review this file, then copy the arrays into src/content/site.ts.
// You MUST author alt text for every entry before launch.

import type { Print, DaymadeImage } from './site'

export const generatedPrints: Print[] = ${toTs(prints)}

export const generatedBranding: DaymadeImage[] = ${toTs(branding)}

export const generatedChuck: DaymadeImage[] = ${toTs(chuck)}
`
  await fs.writeFile(out, content, 'utf8')
  console.log(`\n✓ Wrote ${out}`)
}

async function main() {
  console.log('Starting asset ingest...')
  await ensureDirs()

  const [prints, branding, chuck] = await Promise.all([
    ingestPrints(),
    ingestDaymadeBranding(),
    ingestChuck(),
  ])

  await ingestPortrait()
  await writeGenerated(prints, branding, chuck)

  console.log(`\n✓ Done — ${prints.length} prints, ${branding.length} branding, ${chuck.length} chuck images`)
  console.log('  Next: review site.generated.ts, copy arrays into site.ts, author alt text.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
