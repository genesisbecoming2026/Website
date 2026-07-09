import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './screens/Home.jsx';
import { Work } from './screens/Work.jsx';
import { Philosophy } from './screens/Philosophy.jsx';
import { Studio } from './screens/Studio.jsx';
import { Services } from './screens/Services.jsx';
import { Contact } from './screens/Contact.jsx';
import { TNTWorld } from './screens/TNTWorld.jsx';
import { GrowWorld } from './screens/GrowWorld.jsx';
import { SlowBloomWorld } from './screens/SlowBloomWorld.jsx';
import { SiteNav } from './components/SiteNav.jsx';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';
import { PROJECTS } from './config.js';

const PAGE_TITLES = {
  home: 'Genesis Becoming — Branding & Immersive Design',
  work: 'Work — Genesis Becoming',
  philosophy: 'Our Approach — Genesis Becoming',
  studio: 'Studio — Genesis Becoming',
  services: 'Services — Genesis Becoming',
  contact: 'Contact — Genesis Becoming',
};

// Real, bookmarkable, shareable URLs for every page — previously
// navigation only changed in-memory state and the address bar never
// moved, which meant no direct links and effectively one indexable URL
// for the entire site. Fixed via the History API, no router dependency.
const PAGE_PATHS = {
  home: '/',
  work: '/work',
  philosophy: '/approach',
  studio: '/studio',
  services: '/services',
  contact: '/contact',
};

function pathForState(page, projectId) {
  if (page === 'project' && projectId) return `/work/${projectId}`;
  return PAGE_PATHS[page] || '/';
}

function parseLocation() {
  if (typeof window === 'undefined') return { page: 'home', projectId: null };
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path.startsWith('/work/')) {
    const id = path.split('/')[2];
    if (PROJECTS.some((p) => p.id === id)) return { page: 'project', projectId: id };
  }
  const entry = Object.entries(PAGE_PATHS).find(([, p]) => p === path);
  if (entry) return { page: entry[0], projectId: null };
  return { page: 'home', projectId: null };
}

const LOGO = '/logo-signature.png';

const WORLD_COMPONENTS = { tnt: TNTWorld, grow: GrowWorld, bloom: SlowBloomWorld };

// Regular page-to-page navigation — a soft cinematic dissolve. The new
// page rises slightly while the old one recedes the opposite way, so it
// reads as one continuous space, not a hard cut.
// NOTE: deliberately no `filter` here — animating filter on this wrapper
// creates a new CSS containing block for any position:fixed descendant,
// which silently breaks every fixed-position ambient effect inside every
// page (confirmed as the cause of Slow Bloom's ambient effects failing).
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -18, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Entering/leaving a project documentary — a distinct, more dramatic
// transition: the world scales up, like stepping through glass into an
// immersive space, rather than a flat page change. No filter, same reason.
const projectVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function App() {
  // page: 'home' | 'work' | 'philosophy' | 'studio' | 'services' | 'contact' | 'project'
  const initial = React.useMemo(() => parseLocation(), []);
  const [page, setPage] = React.useState(initial.page);
  const [projectId, setProjectId] = React.useState(initial.projectId);
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (page === 'project' && projectId) {
      const p = PROJECTS.find((pr) => pr.id === projectId);
      document.title = p ? `${p.title} — Genesis Becoming` : 'Genesis Becoming';
    } else {
      document.title = PAGE_TITLES[page] || 'Genesis Becoming';
    }
  }, [page, projectId]);

  // Keep state in sync with the browser's back/forward buttons.
  React.useEffect(() => {
    function onPopState() {
      const next = parseLocation();
      setPage(next.page);
      setProjectId(next.projectId);
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function navigate(nextPage) {
    setProjectId(null);
    setPage(nextPage);
    window.history.pushState({ page: nextPage, projectId: null }, '', pathForState(nextPage, null));
  }

  function enterProject(id) {
    setProjectId(id);
    setPage('project');
    window.history.pushState({ page: 'project', projectId: id }, '', pathForState('project', id));
  }

  let content;
  if (page === 'project' && projectId) {
    const World = WORLD_COMPONENTS[projectId];
    content = <World onNavigate={navigate} onNavigateProject={enterProject} />;
  } else if (page === 'work') {
    content = <Work onEnterProject={enterProject} />;
  } else if (page === 'philosophy') {
    content = <Philosophy />;
  } else if (page === 'studio') {
    content = <Studio />;
  } else if (page === 'services') {
    content = <Services />;
  } else if (page === 'contact') {
    content = <Contact />;
  } else {
    content = <Home onEnterProject={enterProject} onNavigate={navigate} />;
  }

  // Project pages render their own dark backgrounds edge-to-edge and manage
  // their own back button; every other page sits under the persistent
  // floating glass nav.
  const isProjectPage = page === 'project';

  return (
    <div style={{ background: 'var(--gb-ink)', minHeight: '100vh', position: 'relative' }}>
      {/* Site-wide ambient glow — the same 'water-like' breathing quality
          felt in the project worlds, toned down and neutral so it reads
          as one continuous atmosphere across every ordinary page too. */}
      {!isProjectPage && (
        <motion.div
          aria-hidden="true"
          animate={reducedMotion ? { opacity: 0.4 } : { opacity: [0.35, 0.55, 0.35], x: ['0%', '3%', '0%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: '-20%', pointerEvents: 'none', zIndex: 0,
            backgroundImage: 'radial-gradient(45% 55% at 25% 20%, color-mix(in oklch, var(--gb-gold) 12%, transparent), transparent 70%)',
          }}
        />
      )}
      {!isProjectPage && (
        <div style={{ position: 'sticky', top: 0, zIndex: 200, padding: '18px var(--pad-gutter) 0', pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <SiteNav logoSrc={LOGO} active={page} onNavigate={navigate} />
          </div>
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={isProjectPage ? `project-${projectId}` : page}
            variants={isProjectPage ? projectVariants : pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
