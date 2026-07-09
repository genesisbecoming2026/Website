import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../useIsMobile.js';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion.js';

/**
 * IdentitySystemReveal — the homepage's signature scroll moment, and the
 * site's single biggest "how did they build that" centerpiece. Every
 * other animated moment on the site (the three documentaries, micro-
 * interactions) exists to create curiosity and support the portfolio —
 * this is the one place built to earn the "aww."
 *
 * Story: scattered fragments of identity drift disconnected, then —
 * driven entirely by scroll position, not a timer — attract, connect,
 * and resolve into a coherent, organically-branching system (not a
 * rigid grid — real relationships branch unevenly, the way ideas
 * actually connect to each other). A single warm light current drifts
 * through the whole scene as a living undercurrent. The closing line
 * lands only after that resolution.
 *
 * Visual language: dark ground, warm ivory/amber/sage glows, fine
 * lines, small coordinate-style marks — scientific editorialism, not
 * sci-fi. No blue neon, no lens flares, no galaxy-effect backgrounds.
 */

// Organic branching tree — "Purpose" as the root, everything else
// branches outward unevenly. Deliberately not a grid: real relationships
// between ideas are not evenly spaced.
const FULL_NODES = [
  { label: 'Purpose',     scattered: { x: 180, y: 120 }, resolved: { x: 620, y: 320 } },
  { label: 'Trust',       scattered: { x: 820, y: 90 },  resolved: { x: 760, y: 210 } },
  { label: 'Voice',       scattered: { x: 120, y: 420 }, resolved: { x: 470, y: 220 } },
  { label: 'Values',      scattered: { x: 500, y: 70 },  resolved: { x: 620, y: 460 } },
  { label: 'Recognition', scattered: { x: 300, y: 520 }, resolved: { x: 890, y: 150 } },
  { label: 'Memory',      scattered: { x: 940, y: 350 }, resolved: { x: 870, y: 290 } },
  { label: 'Story',       scattered: { x: 900, y: 480 }, resolved: { x: 320, y: 150 } },
  { label: 'Presence',    scattered: { x: 60, y: 260 },  resolved: { x: 330, y: 300 } },
  { label: 'Craft',       scattered: { x: 920, y: 220 }, resolved: { x: 700, y: 570 } },
  { label: 'Culture',     scattered: { x: 760, y: 330 }, resolved: { x: 800, y: 480 } },
  { label: 'Experience',  scattered: { x: 560, y: 470 }, resolved: { x: 930, y: 500 } },
  { label: 'Clarity',     scattered: { x: 260, y: 60 },  resolved: { x: 500, y: 560 } },
  { label: 'Direction',   scattered: { x: 400, y: 560 }, resolved: { x: 380, y: 580 } },
];

// Parent -> child branching (indices into FULL_NODES). A tree, not a
// lattice — some nodes branch twice, some once, some are leaves.
const FULL_EDGES = [
  [0, 1], [0, 2], [0, 3],       // Purpose -> Trust, Voice, Values
  [1, 4], [1, 5],               // Trust -> Recognition, Memory
  [2, 6], [2, 7],               // Voice -> Story, Presence
  [3, 8], [3, 9],               // Values -> Craft, Culture
  [9, 10],                      // Culture -> Experience
  [8, 11],                      // Craft -> Clarity
  [11, 12],                     // Clarity -> Direction
];

// Lighter set for mobile — same story, fewer moving pieces.
const LITE_NODES = [
  { label: 'Purpose', scattered: { x: 160, y: 160 }, resolved: { x: 500, y: 300 } },
  { label: 'Trust',   scattered: { x: 780, y: 120 }, resolved: { x: 640, y: 210 } },
  { label: 'Story',   scattered: { x: 200, y: 460 }, resolved: { x: 340, y: 220 } },
  { label: 'Values',  scattered: { x: 500, y: 90 },  resolved: { x: 500, y: 460 } },
  { label: 'Craft',   scattered: { x: 820, y: 460 }, resolved: { x: 660, y: 460 } },
];
const LITE_EDGES = [[0, 1], [0, 2], [0, 3], [3, 4]];

function Node({ node, scrollYProgress, attractStart, attractEnd }) {
  const x = useTransform(scrollYProgress, [attractStart, attractEnd], [node.scattered.x, node.resolved.x]);
  const y = useTransform(scrollYProgress, [attractStart, attractEnd], [node.scattered.y, node.resolved.y]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.24], [0, 1]);
  const glow = useTransform(scrollYProgress, [attractStart, attractEnd], [0.35, 0.9]);

  return (
    <motion.g style={{ x, y, opacity }}>
      <motion.circle r={5} fill="var(--gb-gold)" style={{ opacity: glow }} />
      <motion.circle r={13} fill="none" stroke="var(--gb-gold)" strokeWidth={0.75} style={{ opacity: useTransform(glow, (v) => v * 0.4) }} />
      <text x={16} y={4} fontFamily="var(--font-sans)" fontSize="12" letterSpacing="0.08em" fill="var(--gb-stone)" style={{ textTransform: 'uppercase' }}>
        {node.label}
      </text>
    </motion.g>
  );
}

function Edge({ a, b, scrollYProgress }) {
  const ax = useTransform(scrollYProgress, [0.32, 0.62], [a.scattered.x, a.resolved.x]);
  const ay = useTransform(scrollYProgress, [0.32, 0.62], [a.scattered.y, a.resolved.y]);
  const bx = useTransform(scrollYProgress, [0.32, 0.62], [b.scattered.x, b.resolved.x]);
  const by = useTransform(scrollYProgress, [0.32, 0.62], [b.scattered.y, b.resolved.y]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.62], [0, 0.55]);
  return <motion.line x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--gb-gold)" strokeWidth={0.75} style={{ opacity }} />;
}

// A single warm light current drifting through the whole scene — a
// living undercurrent, not a rigid geometric element. Continuous,
// gated behind reduced-motion like every other looping animation.
function FlowingCurrent({ opacity, reducedMotion }) {
  const pathRef = React.useRef(null);
  return (
    <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="current-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--gb-gold)" stopOpacity="0" />
          <stop offset="45%" stopColor="var(--gb-gold)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--gb-sand, var(--gb-gold))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--gb-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        ref={pathRef}
        d="M -100 340 C 200 260, 350 420, 550 320 S 850 200, 1100 300"
        fill="none"
        stroke="url(#current-gradient)"
        strokeWidth="1.4"
        strokeLinecap="round"
        style={{ opacity }}
        animate={reducedMotion ? {} : { pathOffset: [0, 1] }}
        transition={reducedMotion ? {} : { duration: 9, repeat: Infinity, ease: 'linear' }}
        pathLength={1}
        strokeDasharray="0.22 1"
      />
    </svg>
  );
}

export function IdentitySystemReveal() {
  const ref = React.useRef(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const nodes = isMobile ? LITE_NODES : FULL_NODES;
  const edgeList = isMobile ? LITE_EDGES : FULL_EDGES;

  // Phase-mapped opacities for the surrounding chrome.
  const openingOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14], [1, 1, 0]);
  const gridLinesOpacity = useTransform(scrollYProgress, [0.5, 0.78], [0, 0.14]);
  const dustOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.2]);
  const currentOpacity = useTransform(scrollYProgress, [0.05, 0.3, 0.8], [0, 0.5, 0.15]);
  const closingOpacity = useTransform(scrollYProgress, [0.86, 1], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.86, 1], [24, 0]);
  const sceneFade = useTransform(scrollYProgress, [0.86, 1], [1, 0.25]);

  if (reducedMotion) {
    return (
      <section style={{ padding: 'var(--space-11) var(--pad-gutter)', background: '#14120f', borderTop: '1px solid var(--border-hairline)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--type-display)', color: 'var(--gb-bone)', margin: 0 }}>
            Before people experience your work, they experience your <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>brand.</em>
          </h2>
          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--type-lead)', fontWeight: 300, lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)' }}>
            Every conversation, every click, every first impression begins long before someone experiences the quality of what you actually do. Your brand introduces your work before you ever have the chance to.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative', height: isMobile ? '280vh' : '380vh', background: '#14120f' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Warm ambient haze — deep, restrained, never bright */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(60% 60% at 65% 45%, rgba(201,179,140,0.10), transparent 70%), radial-gradient(40% 50% at 20% 70%, rgba(136,140,93,0.07), transparent 70%)',
        }} />

        {/* Fine drifting dust */}
        <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: dustOpacity }}>
          {Array.from({ length: isMobile ? 14 : 28 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
              style={{
                position: 'absolute',
                left: `${(i * 137) % 100}%`,
                top: `${(i * 71) % 100}%`,
                width: 2, height: 2, borderRadius: '50%',
                background: 'var(--gb-gold)',
              }}
            />
          ))}
        </motion.div>

        {/* Flowing light current — a living undercurrent through the scene */}
        <FlowingCurrent opacity={currentOpacity} reducedMotion={reducedMotion} />

        <motion.div style={{ position: 'absolute', inset: 0, opacity: sceneFade }}>
          {/* Fine grid — becomes visible only as structure emerges */}
          <motion.svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: gridLinesOpacity }} preserveAspectRatio="none">
            <defs>
              <pattern id="identity-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--gb-stone)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#identity-grid)" />
          </motion.svg>

          {/* Node system — organic branching, not a grid */}
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {edgeList.map(([i, j]) => (
              <Edge key={`${i}-${j}`} a={nodes[i]} b={nodes[j]} scrollYProgress={scrollYProgress} />
            ))}
            {nodes.map((n, i) => (
              <Node key={n.label} node={n} scrollYProgress={scrollYProgress} attractStart={0.24} attractEnd={0.66} />
            ))}
          </svg>
        </motion.div>

        {/* Opening headline */}
        <motion.div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--pad-gutter)', opacity: openingOpacity, pointerEvents: 'none',
        }}>
          <h2 style={{
            margin: 0, textAlign: 'center', maxWidth: '16ch',
            fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'var(--type-hero)',
            lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', color: 'var(--gb-bone)',
          }}>
            Every identity begins as <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>information.</em>
          </h2>
        </motion.div>

        {/* Closing copy — lands only after the system resolves */}
        <motion.div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--space-10) var(--pad-gutter)',
          opacity: closingOpacity, y: closingY,
          background: 'linear-gradient(to top, #14120fF2 40%, transparent)',
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'var(--type-display)', lineHeight: 1.2, color: 'var(--gb-bone)',
            }}>
              Before people experience your work, they experience your <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>brand.</em>
            </h2>
            <p style={{
              marginTop: 'var(--space-6)', fontSize: 'var(--type-small)', fontWeight: 300,
              lineHeight: 1.7, color: 'var(--gb-stone)',
            }}>
              Every conversation, every click, every first impression begins long before someone experiences the quality of what you actually do. Your brand introduces your work before you ever have the chance to.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
