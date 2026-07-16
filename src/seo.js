import { PROJECTS, FAQ } from './config.js';

const SITE_URL = 'https://genesisbecoming.com';

// Per-page descriptions — distinct, real, and specific to that page's
// actual content (not the same sentence copy-pasted everywhere), which
// matters for both search ranking and how AI-based search engines
// summarize each page.
export const PAGE_META = {
  home: {
    title: 'Genesis Becoming — Branding & Immersive Design',
    description: "Has your business outgrown the way it's represented? Genesis Becoming builds brand identities and websites that communicate trust before a single conversation begins.",
    path: '/',
  },
  work: {
    title: 'Work — Genesis Becoming',
    description: 'Selected brand identity and website projects by Genesis Becoming, including Grow, Slow Bloom, and TNT Builders — real case studies, not just a logo gallery.',
    path: '/work',
  },
  philosophy: {
    title: 'Our Approach — Genesis Becoming',
    description: 'Great design begins long before the logo. How Genesis Becoming approaches brand identity, strategy, and creative partnership.',
    path: '/approach',
  },
  studio: {
    title: 'Studio — Genesis Becoming',
    description: 'A creative studio built around becoming, based in Columbia, Tennessee, serving the greater Nashville area — our process, who we work with, and why brand identity matters.',
    path: '/studio',
  },
  services: {
    title: 'Services — Genesis Becoming',
    description: 'Brand identity, website design, creative direction, and ongoing creative partnership — services built around outcomes, not deliverables.',
    path: '/services',
  },
  contact: {
    title: "Contact — Genesis Becoming",
    description: 'Book a complimentary discovery call with Genesis Becoming, or reach out directly at info@genesisbecoming.com.',
    path: '/contact',
  },
};

function projectMeta(projectId) {
  const p = PROJECTS.find((pr) => pr.id === projectId);
  if (!p) return null;
  return {
    title: `${p.title} — Genesis Becoming`,
    description: `${p.title}: ${p.summary} A Genesis Becoming brand identity case study — ${p.category}.`,
    path: `/work/${p.id}`,
  };
}

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', `${SITE_URL}${path}`);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * updateSEO — called whenever the page changes. Updates document.title,
 * meta description, Open Graph + Twitter tags, the canonical URL, and a
 * BreadcrumbList so search engines (and AI-based ones) understand where
 * this page sits in the site, not just what it says.
 */
export function updateSEO(page, projectId) {
  const meta = page === 'project' && projectId ? projectMeta(projectId) : PAGE_META[page];
  if (!meta) return;

  document.title = meta.title;
  setMeta('description', meta.description);
  setMeta('og:title', meta.title, 'property');
  setMeta('og:description', meta.description, 'property');
  setMeta('og:url', `${SITE_URL}${meta.path}`, 'property');
  setMeta('twitter:title', meta.title);
  setMeta('twitter:description', meta.description);
  setCanonical(meta.path);

  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }];
  if (page === 'work' || (page === 'project' && projectId)) {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` });
  }
  if (page === 'project' && projectId) {
    const p = PROJECTS.find((pr) => pr.id === projectId);
    if (p) crumbs.push({ '@type': 'ListItem', position: 3, name: p.title, item: `${SITE_URL}/work/${p.id}` });
  } else if (page !== 'home' && page !== 'work') {
    crumbs.push({ '@type': 'ListItem', position: 2, name: meta.title.split(' — ')[0], item: `${SITE_URL}${meta.path}` });
  }
  setJsonLd('breadcrumb-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs,
  });

  // Service schema — only meaningfully relevant on the Services page.
  if (page === 'services') {
    setJsonLd('service-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Brand Identity & Website Design',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'US',
    });
    setJsonLd('faq-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  } else {
    const existing = document.getElementById('service-jsonld');
    if (existing) existing.remove();
    const existingFaq = document.getElementById('faq-jsonld');
    if (existingFaq) existingFaq.remove();
  }
}
