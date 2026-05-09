// Single source of truth for all site content.
// To add a new print: drop the file into public/artwork/prints/, add an entry below.
// BEFORE LAUNCH: author alt text for every print and daymade image entry.

export type Print = {
  number: number
  src: string
  alt: string // required — describe the artwork for screen readers
  width: number
  height: number
}

export type DaymadeImage = {
  src: string
  alt: string // required — describe the image for screen readers
  width: number
  height: number
  section: 'branding' | 'chuck'
  fullWidth?: boolean // renders edge-to-edge on the Daymade page
}

export type Exhibition = {
  title: string
  year?: string
  venue?: string
}

export type Education = {
  degree: string
  field: string
  institution: string
}

export type SelectedWork = {
  title: string
  role: string
}

const site = {
  name: 'Amy Chiappetta',
  tagline: 'Print & Design',
  heroLine: 'Want to put something cool on your walls?',
  bio: 'I am a printmaker and designer with a deep passion for storytelling. I hold a Bachelor of Science in Art Education and a Bachelor of Fine Arts in Printmaking from Illinois State University. With a strong foundation in both theory and practice, my creative process blends traditional techniques with contemporary design sensibilities. Whether through hand-pulled prints or digital compositions, I aim to spark connection, reflection, and the occasional laugh.',
  email: 'achiappettadesign@gmail.com',
  instagram: 'https://instagram.com/chiappettaamy',
  linkedin: 'https://www.linkedin.com/in/amy-chiappetta',

  // Numbers correspond to print filenames (1.png – 19.png).
  // Change these three numbers to control which prints appear in the homepage strip.
  featured: [1, 2, 3] as const,

  prints: [
    { number: 1, src: '/artwork/prints/1.png', alt: '', width: 2025, height: 2531 },
    { number: 2, src: '/artwork/prints/2.png', alt: '', width: 2025, height: 2531 },
    { number: 3, src: '/artwork/prints/3.png', alt: '', width: 2025, height: 2531 },
    { number: 4, src: '/artwork/prints/4.png', alt: '', width: 2025, height: 2531 },
    { number: 5, src: '/artwork/prints/5.png', alt: '', width: 2025, height: 2531 },
    { number: 6, src: '/artwork/prints/6.png', alt: '', width: 2025, height: 2531 },
    { number: 7, src: '/artwork/prints/7.png', alt: '', width: 2025, height: 2531 },
    { number: 8, src: '/artwork/prints/8.png', alt: '', width: 2025, height: 2531 },
    { number: 9, src: '/artwork/prints/9.png', alt: '', width: 2025, height: 2531 },
    { number: 10, src: '/artwork/prints/10.png', alt: '', width: 2025, height: 2531 },
    { number: 11, src: '/artwork/prints/11.png', alt: '', width: 2025, height: 2531 },
    { number: 12, src: '/artwork/prints/12.png', alt: '', width: 2025, height: 2531 },
    { number: 13, src: '/artwork/prints/13.png', alt: '', width: 2025, height: 2531 },
    { number: 14, src: '/artwork/prints/14.png', alt: '', width: 2025, height: 2531 },
    { number: 15, src: '/artwork/prints/15.png', alt: '', width: 2531, height: 2025 },
    { number: 16, src: '/artwork/prints/16.png', alt: '', width: 2531, height: 2025 },
    { number: 17, src: '/artwork/prints/17.png', alt: '', width: 2531, height: 2025 },
    { number: 18, src: '/artwork/prints/18.png', alt: '', width: 2531, height: 2531 },
    { number: 19, src: '/artwork/prints/19.png', alt: '', width: 2531, height: 2531 },
  ] as Print[],

  daymade: {
    // Replace this placeholder with your Daymade intro copy before launch.
    intro: 'Branding, social, and creative direction for Daymade.',
    branding: [
      {
        src: '/artwork/daymade/branding/Daymade-Branding-page-header.jpg',
        alt: '',
        width: 5775,
        height: 3850,
        section: 'branding' as const,
        fullWidth: true,
      },
      {
        src: '/artwork/daymade/branding/Daymade-mood-board.png',
        alt: '',
        width: 1920,
        height: 1080,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/Daymade-mood-boards.png',
        alt: '',
        width: 2025,
        height: 2531,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/Your-brand-is-talking.png',
        alt: '',
        width: 2295,
        height: 2869,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/Skilled-artist-creative-direction.png',
        alt: '',
        width: 1890,
        height: 1890,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/_Daymade-Postcards.png',
        alt: '',
        width: 2888,
        height: 2100,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/Daymade-BTS-photoshoot.png',
        alt: '',
        width: 1080,
        height: 1350,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/Client-Testimonial.png',
        alt: '',
        width: 1755,
        height: 2194,
        section: 'branding' as const,
      },
      {
        src: '/artwork/daymade/branding/IMG_5563.jpg',
        alt: '',
        width: 3024,
        height: 4032,
        section: 'branding' as const,
      },
    ] as DaymadeImage[],
    chuck: [
      {
        src: '/artwork/daymade/chuck/Chuck_YRB_Large.png',
        alt: '',
        width: 2892,
        height: 4167,
        section: 'chuck' as const,
      },
      {
        src: '/artwork/daymade/chuck/Chuck_Alt1_Brown.png',
        alt: '',
        width: 2892,
        height: 3249,
        section: 'chuck' as const,
      },
      {
        src: '/artwork/daymade/chuck/Chuck-with-flag_BR.png',
        alt: '',
        width: 3253,
        height: 3918,
        section: 'chuck' as const,
      },
    ] as DaymadeImage[],
  },

  cv: {
    education: [
      { degree: 'BFA', field: 'Printmaking', institution: 'Illinois State University' },
      { degree: 'BS', field: 'Art Education', institution: 'Illinois State University' },
    ] as Education[],
    // Add year / venue for each exhibition before launch.
    exhibitions: [
      { title: 'Impressions' },
      { title: 'Uncanny Portraits of Women and Birds' },
      { title: 'SIXTY SQUARE INCHES XXI' },
      { title: 'The 39th Bradley International Print and Drawing Exhibition' },
      { title: 'Good Impressions' },
      { title: 'No Adultz Allowed!!!' },
      { title: 'Annual McLean County Arts Center Amateur Exhibit' },
    ] as Exhibition[],
    selectedWork: [
      { title: 'Daymade', role: 'Branding, Socials, & Creative Direction' },
    ] as SelectedWork[],
  },
}

export default site
