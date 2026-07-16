// Genesis Becoming — site-wide contact config.
// Update these two values here and every button/link across the site
// (homepage + all three case study worlds) stays in sync automatically.

export const CONTACT_EMAIL = 'info@genesisbecoming.com';

export const CALENDLY_URL = 'https://calendly.com/genesisbecoming-info/30min';

export const INSTAGRAM_URL = 'https://instagram.com/genesisbecoming';

// Ordered project list — powers the Work page grid AND Previous/Next
// navigation inside each project page. Order matters here.
export const PROJECTS = [
  {
    id: 'grow',
    title: 'Grow',
    category: 'Naming · Identity · Motion',
    summary: 'A ministry built on presence — now the brand feels as safe as the work itself.',
    accentColor: '#688C5D', // sage — Grow's established accent (GROW_BRAND.colors.sage)
    heroImage: '/images/grow/grow-hero.jpg',
    logoImage: '/images/grow/grow-logo-primary.png',
    iconImage: '/images/grow/grow-icon.png',
    applicationImages: ['/images/grow/grow-cards-1.jpg', '/images/grow/grow-cards-2.jpg'],
    // Real screenshots of the live site, cleaned up (browser chrome and a
    // third-party chat widget removed). Pre-launch as of this writing —
    // Kari is still finishing content before it goes live.
    siteImages: [
      { src: '/images/grow/grow-site-hero.jpg', label: 'Home' },
      { src: '/images/grow/grow-site-who-we-serve.jpg', label: 'Who We Serve' },
      { src: '/images/grow/grow-site-philosophy.jpg', label: 'Our Philosophy' },
    ],
  },
  {
    id: 'bloom',
    title: 'Slow Bloom',
    category: 'Brand Identity · Editorial Site',
    summary: 'Trusted in person, invisible online — now the site feels like walking in.',
    accentColor: '#B08A53', // gold — Slow Bloom's established accent (SLOW_BLOOM_BRAND.colors.gold)
    heroImage: '/images/bloom/bloom-hero.jpg',
    logoImage: '/images/bloom/bloom-logo-primary.png',
    applicationImages: ['/images/bloom/bloom-mugs.jpg', '/images/bloom/bloom-stationery.jpg', '/images/bloom/bloom-packaging.jpg', '/images/bloom/bloom-website-mockup.jpg'],
  },
  {
    id: 'tnt',
    title: 'TNT Builders',
    category: 'Brand Identity · Print & Digital',
    summary: 'Twenty years of trust, hiding behind a brand that looked brand new — now it matches the reputation.',
    accentColor: '#D93D3D', // hero red — TNT's established accent (TNT_BRAND.colors.heroRed)
    heroImage: '/images/tnt/tnt-truck-black.jpg',
    thumbnailImage: '/images/tnt/tnt-thumbnail-composed.jpg',
    logoImage: '/images/tnt/tnt-logo-primary.png',
    crewImage: '/images/tnt/tnt-crew-jobsite.jpg',
    applicationImages: ['/images/tnt/tnt-brand-in-the-field.jpg', '/images/tnt/tnt-trailer.jpg', '/images/tnt/tnt-cards.jpg', '/images/tnt/tnt-branded-gear.jpg'],
  },
];

export function getAdjacentProjects(currentId) {
  const idx = PROJECTS.findIndex((p) => p.id === currentId);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
}

// Problem-led: each card leads with the customer's problem (not the
// service name) so a visitor identifies with the pain point before
// noticing Genesis Becoming is the solution. `title` is the service
// name (rendered as the small label), `problem` is the headline.
export const SERVICES = [
  {
    title: 'Brand Identity',
    problem: 'People don\u2019t remember your business.',
    description: 'A clear, memorable identity that helps people recognize, trust, and choose your business.',
    outcome: 'Become recognizable instead of forgettable.',
  },
  {
    title: 'Website Design',
    problem: 'Your website isn\u2019t helping your business grow.',
    description: 'A website that communicates your value, builds trust, and makes it easy for people to take the next step.',
    outcome: 'Turn visitors into inquiries.',
  },
  {
    title: 'Creative Direction',
    problem: 'Your business feels inconsistent.',
    description: 'A cohesive visual system that makes every customer interaction feel intentional and professional.',
    outcome: 'Present your business with confidence.',
  },
];

// Testimonials — real quotes from real clients, gathered directly.
// Never fabricate a quote and attribute it to a real person.
export const TESTIMONIALS = [
  {
    name: 'Toby & Trina Hathaway',
    role: 'Founders',
    project: 'TNT Builders',
    quote: 'Our company has been built on quality work and word of mouth for years, but our branding never reflected the reputation we had earned. We knew we needed something more professional, but we didn’t know how to get there. Working with Ty made the process simple. He took the time to understand who we are, what makes our company different, and how we wanted people to feel when they saw our name. Every design decision had a purpose, and he explained the thinking behind each one. The new identity feels like us—just elevated. From the logo and color system to the truck graphics and business materials, everything is consistent and gives us a level of confidence we didn’t have before. It finally feels like our brand matches the quality of the work we’ve been doing for years. Genesis Becoming didn’t just give us a new logo. They gave us a professional foundation that we’ll be proud to build on for years to come.',
  },
  {
    name: 'Kari Bulman',
    role: 'Lead Coach',
    project: 'Grow',
    quote: 'Working with Ty at Genesis Becoming was one of the best decisions I made for my business. He guided me through an incredibly insightful process that helped uncover and clarify the core values of my company and how to communicate them in a way that truly reflects who we are. What stood out most was how thoughtfully Ty listened. He took the time to understand not just what I do, but the heart and vision behind it. Throughout the entire process, I felt genuinely seen and understood. It was clear that he was committed to representing both me and my company with accuracy, authenticity, and excellence. The result was a brand and website that feel completely aligned with my vision and communicate it far better than I could have on my own. I recommend Ty and Genesis Becoming without hesitation to anyone looking to elevate their brand, refine their message, and create a website that truly represents who they are.',
  },
  {
    name: 'Emma Steel',
    role: 'Founder',
    project: 'Slow Bloom',
    quote: 'Before working with Ty, Slow Bloom had an idea but not an identity. I knew the feeling I wanted people to experience, but I couldn’t translate that into something visual that felt cohesive or memorable. Every design decision felt like a guess. Ty asked questions I hadn’t even considered. Instead of jumping straight into a logo, he took the time to understand the story, values, and atmosphere behind the brand. The process never felt rushed or overwhelming—it felt collaborative, thoughtful, and intentional. What impressed me most was how every piece connected. The logo, colors, typography, packaging, and brand system all reinforced the same feeling. Nothing was designed just because it looked good; every decision had a purpose. By the end of the project, I wasn’t just confident in how Slow Bloom looked—I was confident in how it would be experienced. Genesis Becoming gave the brand a clear foundation that finally felt authentic, memorable, and ready to grow.',
  },
];

export const FAQ = [
  {
    q: 'What does Genesis Becoming actually do?',
    a: 'Genesis Becoming is a creative studio specializing in brand identity, website design, and creative direction. Rather than inventing identities from scratch, the studio uncovers what already makes a business distinct and builds a visual and digital system around it.',
  },
  {
    q: 'How much does a project cost?',
    a: 'Pricing depends on the scope of the project \u2014 whether it\u2019s brand identity alone, a full website, or an ongoing creative partnership. The best next step is booking a complimentary discovery call for a quote specific to your project.',
  },
  {
    q: 'Who does Genesis Becoming work with?',
    a: 'Founders, businesses, ministries, churches, nonprofits, organizations, creative professionals, and teams \u2014 what unites them is not industry but a shared belief that meaningful work deserves to be represented with clarity and intention.',
  },
  {
    q: 'Does Genesis Becoming only design logos?',
    a: 'No. Services span brand strategy and positioning, full website design and development, print and packaging applications, signage, social media, and ongoing creative direction as a business grows.',
  },
  {
    q: 'Where is Genesis Becoming based?',
    a: 'Columbia, Tennessee \u2014 part of the greater Nashville area.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a complimentary discovery call, or email info@genesisbecoming.com directly if you\u2019d rather introduce yourself and your project first.',
  },
];

export const PROCESS = [
  { title: 'Understand the problem.', detail: 'Before any design work begins, we sit with what\u2019s actually happening — what\u2019s working, what isn\u2019t, and why the current identity doesn\u2019t yet match the quality of the work behind it.' },
  { title: 'Find the opportunity.', detail: 'Every business has something genuinely different about it. This step is about finding that thing clearly enough to build an entire identity around it.' },
  { title: 'Create the strategy.', detail: 'A one-page direction: positioning, tone, and the core idea every future decision — color, type, motion, copy — has to answer to.' },
  { title: 'Build the system.', detail: 'Logo, color, typography, and voice, built together as one coherent system rather than separate deliverables checked off a list.' },
  { title: 'Refine the experience.', detail: 'Where the identity actually lives — website, signage, print, social — refined until every touchpoint reinforces the same story.' },
  { title: 'Launch with confidence.', detail: 'A finished identity, plus the reasoning behind every decision, so it holds up as the business grows rather than needing to be redone.' },
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
