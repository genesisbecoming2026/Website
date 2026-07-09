// Genesis Becoming — site-wide contact config.
// Update these two values here and every button/link across the site
// (homepage + all three case study worlds) stays in sync automatically.

export const CONTACT_EMAIL = 'info@genesisbecoming.com';

export const CALENDLY_URL = 'https://calendly.com/genesisbecoming-info/30min';

// Ordered project list — powers the Work page grid AND Previous/Next
// navigation inside each project page. Order matters here.
export const PROJECTS = [
  {
    id: 'grow',
    title: 'Grow',
    category: 'Naming · Identity · Motion',
    summary: 'A ministry built on presence — now the brand feels as safe as the work itself.',
    heroImage: '/images/grow/grow-hero.jpg',
    logoImage: '/images/grow/grow-logo-primary.png',
    iconImage: '/images/grow/grow-icon.png',
    applicationImages: ['/images/grow/grow-cards-1.jpg', '/images/grow/grow-cards-2.jpg'],
  },
  {
    id: 'bloom',
    title: 'Slow Bloom',
    category: 'Brand Identity · Editorial Site',
    summary: 'Trusted in person, invisible online — now the site feels like walking in.',
    heroImage: '/images/bloom/bloom-hero.jpg',
    logoImage: '/images/bloom/bloom-logo-primary.png',
    applicationImages: ['/images/bloom/bloom-mugs.jpg', '/images/bloom/bloom-stationery.jpg', '/images/bloom/bloom-packaging.jpg'],
  },
  {
    id: 'tnt',
    title: 'TNT Builders',
    category: 'Brand Identity · Print & Digital',
    summary: 'Twenty years of trust, hiding behind a brand that looked brand new — now it matches the reputation.',
    heroImage: '/images/tnt/tnt-hero.jpg',
    logoImage: '/images/tnt/tnt-logo-primary.png',
    applicationImages: ['/images/tnt/tnt-truck-black.jpg', '/images/tnt/tnt-trailer.jpg', '/images/tnt/tnt-cards.jpg'],
  },
];

export function getAdjacentProjects(currentId) {
  const idx = PROJECTS.findIndex((p) => p.id === currentId);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
}

export const SERVICES = [
  {
    label: 'Discover',
    title: 'Discover Your Identity',
    description: 'Together we\u2019ll uncover what makes your business genuinely different and build the foundation every future decision can grow from.',
    outcome: 'Your business finally feels like itself.',
  },
  {
    label: 'Design',
    title: 'Build Your Digital Presence',
    description: 'A website designed to communicate trust, tell your story, and turn curiosity into confidence.',
    outcome: 'Visitors understand your value before they ever reach out.',
  },
  {
    label: 'Launch',
    title: 'Bring Your Brand to Life',
    description: 'From packaging to print, signage to social media, we create the details that make your identity feel real everywhere people encounter it.',
    outcome: 'Every interaction reinforces the same story.',
  },
  {
    label: 'Grow',
    title: 'Become an Ongoing Partner',
    description: 'As your business evolves, your brand evolves with it through ongoing creative direction, design support, and strategic guidance.',
    outcome: 'A creative partner instead of another vendor.',
  },
];

export const PROCESS = [
  'Understand the problem.',
  'Find the opportunity.',
  'Create the strategy.',
  'Build the system.',
  'Refine the experience.',
  'Launch with confidence.',
];

// Grow's real brand spec, pulled directly from their brand presentation.
export const GROW_BRAND = {
  colors: {
    olive: '#48611A',
    grove: '#452F17',
    sage: '#688C5D',
    morningMist: '#E8EFE6',
    earthClay: '#C35E28',
    cream: '#F7EDCD',
  },
  // Cormorant Garamond + Manrope are the specified typefaces (the
  // wordmark itself uses a bespoke modification of Cormorant Garamond).
  fontDisplay: "'Cormorant Garamond', 'Fraunces', serif",
  fontBody: "'Manrope', 'Archivo', sans-serif",
  tagline: 'Cultivating Meaningful Growth',
  subtitle: 'A coaching ministry helping people move forward in freedom, identity, and deeper partnership with God.',
  // The client's own words on why the fingerprint mark works.
  logoMeaning: 'Every fingerprint is unique — it cannot be duplicated or mistaken for someone else\u2019s. In the same way, every person who comes to Grow has inherent worth, a unique story, and a God-given purpose. Transformation doesn\u2019t begin by becoming someone else. It begins by discovering and growing into who you were created to be.',
  qualities: [
    { title: 'Safe', copy: 'A place free from pressure, judgment, and performance.' },
    { title: 'Intentional', copy: 'Growth is cultivated through meaningful relationships, not quick solutions.' },
    { title: 'Personal', copy: 'Every story is unique, and every journey deserves individual care.' },
    { title: 'For Everyone', copy: 'Anyone, any age, at any place in their journey.' },
  ],
  // The real Grow Journey process, replacing the generic 5-step template.
  journey: [
    { title: 'Listen', copy: 'Every person has a story worth hearing. We begin by creating space to listen without judgment, pressure, or assumptions.' },
    { title: 'Discern', copy: 'Rather than simply addressing symptoms, we prayerfully identify the deeper patterns, beliefs, and obstacles that may be keeping you stuck.' },
    { title: 'Cultivate', copy: 'Through intentional coaching, encouragement, and practical guidance, we begin cultivating healthier ways of thinking, living, and relating to others.' },
    { title: 'Practice', copy: 'Growth becomes lasting when it\u2019s lived. Each conversation includes practical next steps for meaningful progress between sessions.' },
    { title: 'Flourish', copy: 'The goal isn\u2019t simply solving today\u2019s problem. It\u2019s helping you become the person God created you to be.' },
  ],
};

// TNT Builders' real brand spec, pulled directly from their brand
// presentation — used in place of invented placeholder colors/fonts.
// Slow Bloom's real brand spec, pulled directly from their brand
// presentation. Kepler Std (their specified typeface) is a paid Adobe
// font not available to load on the web — substituted with Spectral,
// a free editorial serif with a similarly refined, moderate-contrast
// feel. Swap this the moment a licensed web-font version exists.
export const SLOW_BLOOM_BRAND = {
  colors: {
    espresso: '#2B2622',
    teal: '#1E5A5B',
    gold: '#B08A53',
    cream: '#FAF8F5',
    sand: '#D8CCBE',
    mocha: '#8A7568',
    wine: '#6D2F38',
  },
  fontDisplay: "'Spectral', 'Fraunces', serif",
  fontBody: "'Archivo', sans-serif",
  // The three roast/product lines, each carrying one accent color —
  // matches how the real packaging and site mockup use color to
  // differentiate Single Origin (teal), Blends (gold), and Decaf (wine).
  roasts: [
    { name: 'Single Origin', color: '#1E5A5B' },
    { name: 'Blends', color: '#B08A53' },
    { name: 'Decaf', color: '#6D2F38' },
  ],
};

export const TNT_BRAND = {
  colors: {
    heroRed: '#D93D3D',
    charcoalBlack: '#121717',
    seaSaltWhite: '#F1F3F3',
    riverStoneGray: '#CFD8D8',
  },
  // Sora/Inter are the specified digital typefaces (Shackleton/Roca are
  // used only inside the static logo artwork itself, not as web fonts).
  fontDisplay: "'Sora', 'Archivo', sans-serif",
  fontBody: "'Inter', 'Archivo', sans-serif",
  founders: 'Toby and Trina',
  quote: "The strongest foundations aren't made of concrete. They're built on trust.",
  principles: [
    { title: 'Integrity', copy: 'Doing what\u2019s right, even when no one is watching.' },
    { title: 'Craftsmanship', copy: 'Every detail reflects pride in the work.' },
    { title: 'Relationships', copy: 'Projects come and go. Trust lasts.' },
    { title: 'Confidence', copy: 'Strong without being aggressive. Professional without feeling corporate.' },
    { title: 'Legacy', copy: 'Building homes. Building families. Building communities.' },
    { title: 'Recognition', copy: 'A memorable identity that stands apart in a crowded industry.' },
  ],
};
