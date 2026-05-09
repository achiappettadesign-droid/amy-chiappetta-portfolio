# PRD — Amy Chiappetta Digital Portfolio

## 1. Context

Amy Chiappetta is a printmaker and designer (BFA Printmaking, BS Art Education, Illinois State University) who needs a permanent, professional home on the web for her artwork. Currently her work lives in physical print runs, on Instagram, and in local files — there is no curated, high-fidelity place to send a gallery, collector, commission client, or hiring manager.

**The site exists to:**
- Showcase her artwork at the fidelity the originals deserve (artwork is the hero, UI is the frame).
- Provide a professional surface — bio, CV, contact — for collectors, galleries, and commission clients.
- Be a single link she can put on business cards, Instagram, and applications.

**Success looks like:** a stranger lands on the homepage, immediately understands what Amy does, browses her prints in two clicks, and can email her about a commission within five clicks.

---

## 2. Locked decisions

| Area | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, TypeScript, React 19) |
| Styling | **Tailwind CSS v4** with palette tokens in `globals.css` |
| Font loading | **`next/font/local`** pointing at the Archivo variable .ttf already in the project folder |
| Content source | **Local TypeScript file** (`src/content/site.ts`). No CMS. |
| Hosting | **Vercel** (free tier) |
| Domain | **amychiappetta.com** (Amy already owns it; point at Vercel) |
| Analytics | **None** |
| Contact | **Mailto link**, generic subject `"Hello"` everywhere |
| Mobile nav | **Hamburger** → fullscreen overlay |
| Page transitions | **Subtle 200ms fade** between route changes |
| Image protection | **Disable right-click** on all `<img>` elements in artwork contexts |
| Open Graph image | **Single static OG**: `2.png` from Portfolio Prints Export, used site-wide |
| Image quality | **Originals retained**; `next/image` generates AVIF/WebP at multiple widths. Lightbox loads full-resolution. |

---

## 3. Source assets (canonical paths)

All under `/Users/amychiappetta/Documents/Digital Portfolio Amy/`:

| Asset | Path | Use |
|---|---|---|
| Print artworks | `Images/Portfolio Prints Export/1.png` – `19.png` (4–11MB each, 141MB total) | The 19 prints on `/prints`. Numbered, not titled. |
| Daymade branding | `Images/Marketing Images/Daymade/Daymade Branding/` (8 PNGs + 1 HEIC) | Mood boards, postcards, page header, BTS, testimonial — main Daymade case study content. |
| Chuck the Rooster | `Images/Marketing Images/Daymade/Chuck/` (3 PNGs + `Meet Chuck the Rooster.pdf`) | Daymade mascot section. PDF is reference only — do not link from site v1. |
| Portrait | `Images/Pics of Me/Daymade-7.jpg` | About page portrait. |
| Font | `Design/Archivo/Archivo-VariableFont_wdth,wght.ttf` | Site-wide font via `next/font/local`. |
| Copy | `Design/amy Portfolio Copy.pdf` | All site text + palette + CV content. |

**Explicitly excluded from v1:** BidLightning folder, Texture Images, Marketing Images outside `/Daymade/`, all italic Archivo variants (regular variable font is sufficient), `~/Desktop/Amy Print files/` (separate folder, do not use).

**HEIC handling:** the one `IMG_5563.HEIC` in Daymade Branding must be converted to `.jpg` during ingest. Safari handles HEIC; Chrome/Firefox don't.

---

## 4. Information architecture

```
/                  Homepage (hero + 3-tile featured strip)
/about             Bio, portrait, mailto CTA, Instagram feed embed
/prints            Masonry grid of all 19 prints + lightbox
/daymade           Single-scroll case study (Branding + Chuck sections)
/cv                CV (with print stylesheet)
```

Persistent header on every page: text wordmark "AMY CHIAPPETTA" top-left; nav top-right (`ABOUT / PRINTS / DAYMADE / CV`). Mobile: wordmark + hamburger only.

Persistent footer on every page (see §10).

---

## 5. Design system

### Colors (CSS variables in `globals.css`)

```css
--color-bg:     #f7f6f5;  /* page background */
--color-ink:    #2f292b;  /* primary text */
--color-green:  #4a5b58;  /* links, hover, secondary surfaces, focus ring */
--color-yellow: #e8c85e;  /* accent only — never as text on bg (fails contrast) */
```

Confirmed contrast: ink-on-bg and green-on-bg both pass WCAG AA.

### Typography

- **Family:** Archivo, loaded once via `next/font/local` from the variable .ttf. No external font requests.
- **Display / project titles:** ExtraBold (weight 800), often UPPERCASE, very large.
- **Subheads:** Medium Italic (weight 500, italic). The italic variable file is *not* loaded in v1; if italic is needed, fall back to CSS `font-style: italic` on the regular variable file (Archivo's variable font supports italic axis).
- **Body:** Medium (weight 500), 16–18px, line-height 1.55.

### Aesthetic direction

Inspiration: `ahyeonryu.com` screenshots in `Design/Inspo Design/`.
- Heavy, confident type. White space is a feature.
- Print tiles: image fills the tile, no chrome, no rounded corners, no shadows.
- Restrained interactions: subtle fades, no flourish.

---

## 6. Page specs

### 6.1 Homepage `/`

- Hero block: large Archivo ExtraBold name + tagline.
  - "AMY CHIAPPETTA"
  - "Print & Design"
  - "Want to put something cool on your walls?"
- Featured strip: 3 print tiles in one row at desktop, stacked on mobile. Default to `1.png`, `2.png`, `3.png` from `Portfolio Prints Export/` — Amy will swap by editing `featured: [1, 2, 3]` in `site.ts`.
- Each featured tile links to `/prints` (with optional URL hash to scroll-into-view, e.g. `/prints#print-2`).

### 6.2 About `/about`

- H1: "A little about me"
- Bio paragraph (verbatim from PDF):
  > I am a printmaker and designer with a deep passion for storytelling. I hold a Bachelor of Science in Art Education and a Bachelor of Fine Arts in Printmaking from Illinois State University. With a strong foundation in both theory and practice, my creative process blends traditional techniques with contemporary design sensibilities. Whether through hand-pulled prints or digital compositions, I aim to spark connection, reflection, and the occasional laugh.
- Portrait: `Daymade-7.jpg`
- Mailto CTA button: "Let's get in touch." → `mailto:achiappettadesign@gmail.com?subject=Hello`
- **Instagram feed embed**: live grid of recent posts from `@chiappettaamy`. Implementation note: Instagram's official oEmbed requires a Facebook business account & app review. Use a third-party widget (e.g. **LightWidget** or **EmbedSocial** free tier) that polls the public profile. Lazy-load below the fold so it doesn't block initial paint. **Document the chosen provider in README.** If the chosen widget fails or is rate-limited, the fallback is a static "Follow on Instagram →" link.

### 6.3 Prints `/prints`

- H1: "Prints" (Archivo ExtraBold, large)
- **Layout**: 3-column CSS masonry (Pinterest-style), 2-column on tablet (640–1024px), 1-column on mobile (<640px). Use CSS columns or a small headless masonry hook (`react-masonry-css`).
- Tiles: native aspect ratio, no chrome. No caption shown at rest.
- **Hover (desktop only)**: image scales `1.03` over 200ms ease-out. Cursor: pointer.
- **Click**: opens lightbox.
- Source: enumerate `1.png` → `19.png` from `public/artwork/prints/`. Order is numerical 1–19 in v1; Amy can reorder by editing `prints` array in `site.ts`.

### 6.4 Lightbox (component used on `/prints`)

- **Trigger:** click any tile.
- **Overlay:** full-viewport, dimmed backdrop (`#2f292b` at 92% opacity).
- **Image:** centered, max-width 95vw, max-height 90vh. Loads the full-resolution image (next/image with explicit `quality={90}`, no width cap on `sizes`). A small spinner shows for the first ~200ms while loading.
- **Counter:** bottom-center, small Archivo Medium "X / 19" in `--color-bg`.
- **Right-click** is suppressed on the lightbox image.
- **Interactions:**
  - `←` / `→` arrow keys: prev / next print (wraps around).
  - `Esc`: close.
  - Click on backdrop (anywhere outside the image): close.
  - Touch swipe left/right on mobile: prev/next.
  - Visible close ✕ button top-right for explicit affordance.
- **Focus management:** when opened, focus moves to the close button. When closed, focus returns to the originating tile. Focus trap inside the lightbox. ARIA: `role="dialog"`, `aria-modal="true"`, `aria-label="Print {N} of 19"`.
- Body scroll is locked while lightbox is open.

### 6.5 Daymade `/daymade`

- Single long scrolling case study. Sections:
  1. **Intro** — H1 "Daymade", short paragraph (Amy will provide; placeholder: "Branding, social, and creative direction for Daymade.").
  2. **Branding** — gallery of the 8 PNGs in `Daymade Branding/` (mood boards, postcards, page header, BTS, testimonial, "Your brand is talking", "Skilled artist, creative direction"). One column on mobile, 2-column on desktop, full-width for the page header image.
  3. **Meet Chuck** — H2 "Meet Chuck the Rooster", short caption, then the 3 Chuck PNGs (`Chuck with flag_BR.png`, `Chuck_Alt1_Brown.png`, `Chuck_YRB_Large.png`). The PDF is reference-only; do not link.
- Right-click suppressed on all artwork images.
- No lightbox on Daymade in v1 (decision: keep the page a single linear read).

### 6.6 CV `/cv`

Sourced verbatim from `amy Portfolio Copy.pdf`. Sections:
- **Education**
  - BFA, Printmaking — Illinois State University
  - BS, Art Education — Illinois State University
- **Recent Exhibitions** (titles only from PDF; Amy will add dates/venues during build):
  - Impressions
  - Uncanny Portraits of Women and Birds
  - SIXTY SQUARE INCHES XXI
  - The 39th Bradley International Print and Drawing Exhibition
  - Good Impressions
  - No Adultz Allowed!!!
  - Annual McLean County Arts Center Amateur Exhibit
- **Selected Work**
  - Daymade — Branding, Socials, & Creative Direction
- **Contact**
  - achiappettadesign@gmail.com
  - Instagram: @chiappettaamy
  - LinkedIn: linkedin.com/in/amy-chiappetta

Page-level styles include a `@media print` block that:
- Hides header/footer/nav.
- Drops backgrounds to white.
- Forces black text.
- Sets `font-size: 10pt`, single-column.
- Targets one US-Letter page.

---

## 7. Data model

Single source of truth: `src/content/site.ts`

```ts
export type Print = {
  number: number;           // 1–19, matches filename
  src: string;              // "/artwork/prints/1.png"
  alt: string;              // human-authored, REQUIRED
  width: number;            // intrinsic px, captured at ingest
  height: number;
};

export type DaymadeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  section: 'branding' | 'chuck';
  fullWidth?: boolean;      // true for the page header image
};

export type Exhibition = { title: string; year?: string; venue?: string; };

export const site = {
  name: 'Amy Chiappetta',
  tagline: 'Print & Design',
  heroLine: 'Want to put something cool on your walls?',
  bio: '...',                            // verbatim from PDF
  email: 'achiappettadesign@gmail.com',
  instagram: 'https://instagram.com/chiappettaamy',
  linkedin: 'https://www.linkedin.com/in/amy-chiappetta',
  featured: [1, 2, 3],                   // homepage strip
  prints: Print[],                       // 19 entries
  daymade: {
    intro: '...',
    branding: DaymadeImage[],
    chuck: DaymadeImage[],
  },
  cv: {
    education: [...],
    exhibitions: Exhibition[],
    selectedWork: [...],
  },
};
```

No DB. No API routes. Site is statically generated.

---

## 8. Asset pipeline

The trickiest requirement (high quality vs. fast loads). Strategy:

1. **Ingest script** `scripts/ingest-artwork.ts` (one-shot, run once at scaffold time):
   - Copies `Images/Portfolio Prints Export/*.png` → `public/artwork/prints/`.
   - Copies `Images/Marketing Images/Daymade/Daymade Branding/*` → `public/artwork/daymade/branding/`.
   - Converts the one HEIC file to JPG using `sharp` (`.jpeg({ quality: 92 })`).
   - Copies `Images/Marketing Images/Daymade/Chuck/*.png` → `public/artwork/daymade/chuck/`.
   - Copies `Images/Pics of Me/Daymade-7.jpg` → `public/portrait.jpg`.
   - For every image, reads intrinsic dimensions via `sharp` and emits a starter `prints` and `daymade` array into `src/content/site.generated.ts` (developer then merges into `site.ts` and authors `alt` text by hand).
2. **`next/image`** does runtime optimization:
   - Generates AVIF + WebP at widths `[640, 828, 1200, 1920, 2400]`.
   - Serves the right size via `srcset`.
   - Lazy-loads below-the-fold by default. The hero and the first row of the Prints grid use `priority`.
   - Quality `85` for grid, `90` for lightbox.
3. **Originals retained** in `public/artwork/` (Vercel serves them on demand for the lightbox at full resolution).
4. **Performance budget**:
   - Homepage above-the-fold transfer < 600 KB.
   - Prints page initial load < 1 MB (only first row of tiles, rest lazy).
   - Lightbox open: full image arrives in < 1.5s on broadband.
5. **`next.config.ts`**: `images.formats: ['image/avif', 'image/webp']`, `images.minimumCacheTTL: 31536000`.

---

## 9. UI structure (component inventory)

```
src/
  app/
    layout.tsx              // <Header/> + <Footer/> wrap, font, metadata, OG
    page.tsx                // Homepage
    about/page.tsx
    prints/page.tsx         // grid + lightbox
    daymade/page.tsx
    cv/page.tsx
    not-found.tsx           // 404 with link home
  components/
    Header.tsx              // wordmark + desktop text nav
    MobileNav.tsx           // hamburger + fullscreen overlay
    Footer.tsx              // © + IG + LinkedIn
    Hero.tsx                // homepage display block
    FeaturedStrip.tsx       // 3-tile row of featured prints
    PrintGrid.tsx           // masonry, opens Lightbox
    PrintTile.tsx           // image with hover zoom
    Lightbox.tsx            // dialog, keyboard + swipe + counter
    DaymadeSection.tsx      // section header + image group
    MailtoButton.tsx        // styled <a href="mailto:...">
    InstagramFeed.tsx       // third-party widget wrapper, lazy
    PageFade.tsx            // 200ms fade on route change
    NoRightClickImage.tsx   // <img> wrapper that suppresses contextmenu
  content/
    site.ts                 // canonical content
    site.generated.ts       // emitted by ingest, manually merged into site.ts
  styles/
    globals.css             // Tailwind + CSS vars + print stylesheet
  lib/
    fonts.ts                // next/font/local Archivo setup
public/
  artwork/                  // copied by ingest
  portrait.jpg
  og.png                    // = artwork/prints/2.png at 1200×630 crop
  favicon.svg
scripts/
  ingest-artwork.ts
```

---

## 10. Footer spec

Single component, on every page:

```
[Let's get in touch.]                         © 2026 Amy Chiappetta
achiappettadesign@gmail.com
Instagram → instagram.com/chiappettaamy
LinkedIn  → linkedin.com/in/amy-chiappetta
```

Year auto-updates via `new Date().getFullYear()`. Layout: 2-column on desktop (CTA + contacts left, copyright right), 1-column stacked on mobile.

---

## 11. SEO / metadata

- `<title>` per page: "Amy Chiappetta — {Page}" (e.g. "Amy Chiappetta — Prints").
- `<meta description>`: page-specific, ~155 chars. Homepage default: "Amy Chiappetta is a printmaker and designer based in Illinois. Hand-pulled prints, identity work, and creative direction."
- `og:image`: `/og.png` (= `2.png` cropped to 1200×630 via `sharp` at build time).
- `og:type`: `website`.
- `twitter:card`: `summary_large_image`.
- `robots.txt`: allow all.
- `sitemap.xml`: auto-generated by `next-sitemap` post-build.
- `favicon.svg`: simple "AC" wordmark in green on bg.
- All links internal/external use semantic `<a>` (no JS link hijack).

---

## 12. Accessibility

- All artwork images carry `alt` text written by Amy (not auto-generated, not blank). Schema enforces required `alt`.
- Color contrast verified at AA: ink/bg, green/bg pass; yellow used for non-text accents only.
- Keyboard nav: every link/button reachable via Tab. Focus ring is `2px solid var(--color-green)` with 2px offset.
- Lightbox: focus trap, ESC close, ARIA dialog semantics, focus restoration to originating tile.
- Mobile hamburger: `aria-expanded`, `aria-controls`, fullscreen overlay receives focus on open.
- `prefers-reduced-motion`: disables the page fade, hover zoom, and lightbox swipe animation.

---

## 13. Tech stack & dependencies

```
next@^15           react@^19           react-dom@^19
typescript@^5      tailwindcss@^4      @tailwindcss/postcss
sharp                                    // image processing in ingest + next
react-masonry-css                        // 3-col masonry on /prints
next-sitemap                             // sitemap.xml at build
```

Dev: `eslint`, `eslint-config-next`, `prettier`. No test framework needed for v1 (see §15).

---

## 14. Testing approach

This is a visual product; the test surface is intentionally narrow.

### Manual (primary)

1. `npm run dev` → walk every route on three viewports (1440, 768, 375). The 3-col grid must collapse 3 → 2 → 1 cleanly. Hamburger must appear at <768px and disappear above.
2. **Lighthouse on `/` and `/prints`**: target Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
3. **Image fidelity check**: open every print in the lightbox at desktop and visually confirm it's sharp. Confirm homepage above-the-fold transfer < 600 KB in the network panel.
4. **Interaction checks**:
   - Click each nav link, each footer link, each tile, each mailto.
   - Open the lightbox; navigate with arrows; close with ESC, with backdrop click, with the ✕.
   - Swipe through prints on a real iOS + Android device.
   - Right-click an artwork image — context menu should be suppressed.
   - Tab through the homepage — focus ring is visible and follows logical order.
   - Reduce motion in OS settings → confirm page fade and zoom animations stop.
5. **Cross-browser**: Safari (macOS + iOS), Chrome, Firefox. Spot-check Edge.
6. **Print preview** the `/cv` page in Chrome → confirm it formats to a single US-Letter page.
7. **Email-client check**: click the mailto in macOS Mail and Gmail web — the draft must open with `to:` and `subject: Hello` correctly populated.

### Automated (just guardrails, no full suite)

- `tsc --noEmit` — must pass.
- `next build` — must succeed with zero errors and zero warnings about images, fonts, or metadata.
- One Playwright smoke test (optional v1, recommended v1.1) that loads `/`, `/about`, `/prints`, `/daymade`, `/cv` and asserts no console errors and each page contains its expected H1.

### What we're explicitly not testing

- No visual regression suite.
- No unit tests (no logic to unit-test).
- No load testing (Vercel CDN handles this).

---

## 15. Build phases

1. **Scaffold (~2h)** — Next.js init, Tailwind, Archivo via `next/font/local`, color palette CSS vars, Header + MobileNav + Footer + Layout. Smoke deploy to Vercel. Point amychiappetta.com at it.
2. **Asset ingest (~1h)** — run `scripts/ingest-artwork.ts`. Verify `public/artwork/` is populated. HEIC converted to JPG. Generated `site.generated.ts` reviewed.
3. **Content shell (~2h)** — `site.ts` populated from PDF (bio, CV, contact). About + CV pages built and styled. CV print stylesheet verified.
4. **Prints + Lightbox (~3h)** — masonry grid, hover zoom, lightbox with all interactions (keyboard, swipe, counter, focus trap). Right-click suppression. Performance pass.
5. **Daymade (~2h)** — single-scroll case study with Branding + Chuck sections. Page header full-bleed.
6. **Homepage (~1h)** — Hero + featured strip wired to `site.featured`.
7. **Polish (~2h)** — page fade transition, focus rings, reduced-motion handling, OG image generation, favicon, sitemap. Lighthouse to ≥90/95/95/95.
8. **Alt-text pass with Amy (~30min)** — Amy authors `alt` for all 19 prints + Daymade images.
9. **Launch** — DNS confirms, run through manual test checklist, share link.

Total estimate: ~13–14h of focused work.

---

## 16. Open content gaps Amy will fill during build

These don't block scaffolding but must be resolved before launch:
- `alt` text for all 19 prints + every Daymade image (accessibility blocker).
- Daymade intro paragraph (currently a placeholder).
- "Meet Chuck" section caption (currently a placeholder).
- Final `featured: [...]` selection (currently `[1, 2, 3]` placeholders).
- Per-exhibition year and venue for the CV (PDF only has titles).
- Confirmation of Instagram embed provider after testing LightWidget vs. EmbedSocial free tiers.
- Optional: page-specific SEO meta descriptions beyond the homepage.

---

## 17. Verification — definition of "v1 done"

- All 5 routes (`/`, `/about`, `/prints`, `/daymade`, `/cv`) render with real, non-placeholder content.
- All 19 prints display in the masonry grid in numerical order, full-resolution available via lightbox.
- Daymade page shows Branding + Chuck sections in correct order.
- Lighthouse Performance ≥ 90 on `/` and `/prints`.
- A friend on a phone can browse Prints, open a print, swipe through three, close, and tap "Let's get in touch" to open their mail app — without instruction.
- amychiappetta.com resolves, serves over HTTPS, with the favicon and OG image visible when pasted into iMessage.
- Amy can add a new print tomorrow by: drop file into `public/artwork/prints/`, append a `Print` entry in `site.ts`, `git push`. < 10 minutes.
