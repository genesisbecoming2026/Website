import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow } from './Eyebrow.jsx';
import { Button } from './Button.jsx';
import { GlassPanel } from './GlassPanel.jsx';
import { useIsMobile } from '../useIsMobile.js';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion.js';

/**
 * OpeningSequence — the homepage's opening treated as one continuous
 * shot, not stacked pages. A single pinned viewport, one scroll
 * timeline, one evolving atmosphere:
 *
 *   1. Hero holds, then recedes into depth (never just fades away).
 *   2. Three diagnosis truths rise as glass cards.
 *   3. Those same cards dissolve directly into three labeled nodes of
 *      the identity network at the same screen position — the card
 *      doesn't disappear so a new section can start beneath it, it
 *      becomes the next thing. The floating glass mark does the same,
 *      becoming the network's root node.
 *   4. The network resolves into a coherent, organically-branching
 *      system and closes on the brand statement.
 *
 * Previously this was two independent components (UnfoldIntro,
 * IdentitySystemReveal), each with its own pinned container and its own
 * fresh fade-in opening. Merging them into one scroll timeline is what
 * removes the seam between them.
 */

const TRUTHS = [
  { text: 'Your business has grown. Your brand hasn’t kept pace.', becomes: 3 },     // -> Values
  { text: 'People experience your brand before they experience your work.', becomes: 1 }, // -> Trust
  { text: 'Most businesses don’t lack quality. They lack clarity.', becomes: 11 },    // -> Clarity
];

// Organic branching tree — "Purpose" as the root, everything else
// branches outward unevenly (real relationships branch unevenly, not
// on a grid). The scattered coordinates for Purpose, Trust, Values, and
// Clarity are tuned to land where the glass mark and the three
// diagnosis cards sit on screen, so their morph reads as continuous.
// Resolved positions are tuned to average out near the viewBox center
// (500, 300) rather than being weighted right — an earlier version
// averaged x=630, which read as the whole network favoring the right
// side of the screen instead of feeling centered.
const FULL_NODES = [
  { label: 'Purpose',     scattered: { x: 900, y: 300 }, resolved: { x: 540, y: 290 } },
  { label: 'Trust',       scattered: { x: 130, y: 300 }, resolved: { x: 660, y: 190 } },
  { label: 'Voice',       scattered: { x: 120, y: 420 }, resolved: { x: 430, y: 210 } },
  { label: 'Values',      scattered: { x: 130, y: 210 }, resolved: { x: 560, y: 420 } },
  { label: 'Recognition', scattered: { x: 300, y: 520 }, resolved: { x: 760, y: 130 } },
  { label: 'Memory',      scattered: { x: 940, y: 350 }, resolved: { x: 740, y: 260 } },
  { label: 'Story',       scattered: { x: 900, y: 480 }, resolved: { x: 290, y: 140 } },
  { label: 'Presence',    scattered: { x: 60,  y: 260 }, resolved: { x: 310, y: 280 } },
  { label: 'Craft',       scattered: { x: 920, y: 220 }, resolved: { x: 610, y: 510 } },
  { label: 'Culture',     scattered: { x: 760, y: 330 }, resolved: { x: 680, y: 430 } },
  { label: 'Experience',  scattered: { x: 560, y: 470 }, resolved: { x: 780, y: 440 } },
  { label: 'Clarity',     scattered: { x: 130, y: 390 }, resolved: { x: 460, y: 500 } },
  { label: 'Direction',   scattered: { x: 400, y: 560 }, resolved: { x: 360, y: 520 } },
];
const FULL_EDGES = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [1, 5],
  [2, 6], [2, 7],
  [3, 8], [3, 9],
  [9, 10],
  [8, 11],
  [11, 12],
];

// Lighter set for mobile — same story, fewer moving pieces. Purpose,
// Trust, and Values still map to the mark and two of the diagnosis
// cards; the third truth (Clarity) folds into Story for a simpler tree.
const LITE_NODES = [
  { label: 'Purpose', scattered: { x: 860, y: 300 }, resolved: { x: 500, y: 300 } },
  { label: 'Trust',   scattered: { x: 140, y: 260 }, resolved: { x: 640, y: 210 } },
  { label: 'Story',   scattered: { x: 140, y: 380 }, resolved: { x: 340, y: 220 } },
  { label: 'Values',  scattered: { x: 140, y: 200 }, resolved: { x: 500, y: 460 } },
  { label: 'Craft',   scattered: { x: 820, y: 460 }, resolved: { x: 660, y: 460 } },
];
const LITE_EDGES = [[0, 1], [0, 2], [0, 3], [3, 4]];
const LITE_TRUTHS_BECOMES = [3, 1, 2]; // card index -> LITE_NODES index (Values, Trust, Story)

// A gentle orbital arc — nodes drift into their resolved position along
// a slight curve rather than snapping straight there.
function useOrbitalPosition(scrollYProgress, scattered, resolved, start, end, curveAmount) {
  const raw = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(raw, (p) => {
    const lin = scattered.x + (resolved.x - scattered.x) * p;
    const arc = Math.sin(p * Math.PI) * curveAmount;
    return lin + arc;
  });
  const y = useTransform(raw, (p) => {
    const lin = scattered.y + (resolved.y - scattered.y) * p;
    const arc = Math.sin(p * Math.PI) * (curveAmount * 0.6);
    return lin - arc;
  });
  return { x, y };
}

function Node({ node, scrollYProgress, attractStart, attractEnd, appearAt, depth = 1 }) {
  const { x, y } = useOrbitalPosition(scrollYProgress, node.scattered, node.resolved, attractStart, attractEnd, node.curve || 40);
  const opacity = useTransform(scrollYProgress, [appearAt, appearAt + 0.03], [0, 1]);
  const glow = useTransform(scrollYProgress, [attractStart, attractEnd], [0.35, 0.9]);
  const r = 4 + depth * 2;

  return (
    <motion.g style={{ x, y, opacity }}>
      <motion.circle r={r * 3.4} fill="var(--gb-gold)" style={{ opacity: useTransform(glow, (v) => v * 0.16) }} filter="blur(4px)" />
      <motion.circle r={r} fill="var(--gb-gold)" style={{ opacity: glow }} />
      <motion.circle r={r + 8} fill="none" stroke="var(--gb-gold)" strokeWidth={0.75} style={{ opacity: useTransform(glow, (v) => v * 0.4) }} />
      <text x={r + 11} y={4} fontFamily="var(--font-sans)" fontSize="12" letterSpacing="0.08em" fill="var(--gb-stone)" style={{ textTransform: 'uppercase' }}>
        {node.label}
      </text>
    </motion.g>
  );
}

const CLUSTER_CENTERS = [{ x: 220, y: 200 }, { x: 780, y: 160 }, { x: 500, y: 460 }, { x: 850, y: 420 }];
function MicroParticle({ index, scrollYProgress, appearAt }) {
  const cluster = CLUSTER_CENTERS[index % CLUSTER_CENTERS.length];
  const angle = (index * 47) % 360;
  const radius = 30 + (index * 13) % 90;
  const baseX = cluster.x + Math.cos((angle * Math.PI) / 180) * radius;
  const baseY = cluster.y + Math.sin((angle * Math.PI) / 180) * radius;
  const scrollOpacity = useTransform(scrollYProgress, [appearAt, appearAt + 0.08, 0.9], [0, 1, 0.5]);
  return (
    <motion.g style={{ opacity: scrollOpacity }}>
      <motion.circle
        cx={baseX}
        cy={baseY}
        r={1.4}
        fill="var(--gb-sand, var(--gb-gold))"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5 + (index % 4), repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
      />
    </motion.g>
  );
}

function Edge({ a, b, scrollYProgress, start, end }) {
  const posA = useOrbitalPosition(scrollYProgress, a.scattered, a.resolved, start, end, a.curve || 40);
  const posB = useOrbitalPosition(scrollYProgress, b.scattered, b.resolved, start, end, b.curve || 40);
  const opacity = useTransform(scrollYProgress, [end - 0.06, end + 0.1], [0, 0.55]);
  return <motion.line x1={posA.x} y1={posA.y} x2={posB.x} y2={posB.y} stroke="var(--gb-gold)" strokeWidth={0.75} style={{ opacity }} />;
}

function FlowingCurrent({ opacity, reducedMotion }) {
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

/** DiagnosisCard — a truth statement that rises as glass, then dissolves
 * directly into the node it becomes, at the same screen position. */
function DiagnosisCard({ truth, index, scrollYProgress, side }) {
  const riseStart = 0.14 + index * 0.05;
  const riseEnd = 0.27 + index * 0.05;
  const morphStart = riseEnd + 0.02;
  const morphEnd = morphStart + 0.07;

  const opacity = useTransform(scrollYProgress, [riseStart, riseEnd, morphStart, morphEnd], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [riseStart, riseEnd], [60, 0]);
  const rotate = useTransform(scrollYProgress, [riseStart, riseEnd], [side === 'left' ? -2.5 : 2.5, 0]);
  const scale = useTransform(scrollYProgress, [morphStart, morphEnd], [1, 0.4]);

  return (
    <motion.div style={{ opacity, y, rotate, scale, maxWidth: '580px', transformOrigin: 'left center' }}>
      <GlassPanel tilt style={{ padding: 'var(--space-6) var(--space-7)' }}>
        <p style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', lineHeight: 'var(--leading-snug)',
          letterSpacing: 'var(--tracking-tight)', color: 'var(--gb-bone)', textWrap: 'balance',
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 'var(--type-label)',
            letterSpacing: 'var(--tracking-wide)', color: 'var(--gb-gold)',
            verticalAlign: 'super', marginRight: '14px',
          }}>0{index + 1}</span>
          {truth.text}
        </p>
      </GlassPanel>
    </motion.div>
  );
}

export function OpeningSequence({ onEnterProject, firstProjectId }) {
  const containerRef = React.useRef(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const nodes = isMobile ? LITE_NODES : FULL_NODES;
  const edgeList = isMobile ? LITE_EDGES : FULL_EDGES;
  const truthsBecome = isMobile ? LITE_TRUTHS_BECOMES : TRUTHS.map((t) => t.becomes);

  // Hero — holds, then recedes into depth (scale/blur/opacity, not a flat fade).
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.14], [1, 0.86]);
  const heroY = useTransform(scrollYProgress, [0, 0.14], [0, -60]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.14], [0, 6]);
  const heroFilter = useTransform(heroBlur, (v) => `blur(${v}px)`);

  // Floating glass mark — present through the hero and diagnosis, then
  // shrinks/fades at the exact moment it becomes the Purpose node.
  const markOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.3, 0.36], [0, 1, 1, 0]);
  const markScale = useTransform(scrollYProgress, [0.02, 0.3, 0.36], [0.9, 1.02, 0.55]);

  // Ambient atmosphere — one continuous layer for the whole sequence,
  // evolving rather than resetting between "hero" and "network" moods.
  const glowX = useTransform(scrollYProgress, [0, 1], ['22%', '68%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.45, 0.55, 0.35]);
  const dustOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.2]);
  const gridLinesOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 0.14]);
  const currentOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.9], [0, 0.5, 0.15]);

  // Node system phases
  const attractStart = 0.3;
  const attractEnd = 0.72;

  // Closing copy
  const closingOpacity = useTransform(scrollYProgress, [0.86, 1], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.86, 1], [24, 0]);

  if (reducedMotion) {
    return (
      <section style={{ padding: 'var(--space-11) var(--pad-gutter)', background: 'var(--gb-ink)' }}>
        <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Branding &amp; Immersive Design — Columbia, TN · Nashville Area</Eyebrow>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'var(--type-mega)', lineHeight: 0.98, maxWidth: '14ch', color: 'var(--gb-bone)' }}>
          Your work deserves <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>thoughtful design.</em>
        </h1>
        <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)' }}>
          <Button variant="primary" size="lg" onClick={() => onEnterProject(firstProjectId)}>See the Work</Button>
        </div>
        <div style={{ marginTop: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '640px' }}>
          {TRUTHS.map((t, i) => (
            <p key={i} style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--type-title)', color: 'var(--gb-bone)' }}>{t.text}</p>
          ))}
        </div>
        <h2 style={{ marginTop: 'var(--space-10)', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--type-display)', color: 'var(--gb-bone)' }}>
          Before people experience your work, they experience your <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>brand.</em>
        </h2>
      </section>
    );
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', height: isMobile ? '440vh' : '560vh', background: 'var(--gb-ink)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* One continuous atmosphere for the whole sequence */}
        <motion.div
          aria-hidden="true"
          animate={reducedMotion ? { opacity: 0.5 } : { scale: [1, 1.04, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '-15%', pointerEvents: 'none', zIndex: 0,
            backgroundImage: `radial-gradient(45% 55% at var(--gx) 30%, color-mix(in oklch, var(--gb-gold) 14%, transparent), transparent 70%)`,
            '--gx': glowX,
            opacity: glowOpacity,
          }}
        />
        <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: dustOpacity, zIndex: 0 }}>
          {Array.from({ length: isMobile ? 14 : 28 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
              style={{ position: 'absolute', left: `${(i * 137) % 100}%`, top: `${(i * 71) % 100}%`, width: 2, height: 2, borderRadius: '50%', background: 'var(--gb-gold)' }}
            />
          ))}
        </motion.div>
        <FlowingCurrent opacity={currentOpacity} reducedMotion={reducedMotion} />

        {/* Hero — holds, then recedes into depth */}
        <motion.div style={{
          position: 'absolute', inset: 0, padding: 'var(--pad-gutter)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          opacity: heroOpacity, scale: heroScale, y: heroY, filter: heroFilter, zIndex: 2,
        }}>
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Branding &amp; Immersive Design — Columbia, TN · Nashville Area</Eyebrow>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'var(--type-mega)', lineHeight: 0.98, letterSpacing: 'var(--tracking-tight)', maxWidth: '14ch', color: 'var(--gb-bone)' }}>
            Your work deserves <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>thoughtful design.</em>
          </h1>
          <p style={{ marginTop: 'var(--space-7)', maxWidth: 'var(--measure-lead)', fontSize: 'var(--type-lead)', fontWeight: 300, lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)' }}>
            The identity is already there. We help you reveal it — so the way people experience your brand finally matches the quality of what you've actually built.
          </p>
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <Button variant="primary" size="lg" onClick={() => onEnterProject(firstProjectId)}>See the Work</Button>
            <Button variant="link" href="#understanding">Keep Reading</Button>
          </div>
          <div style={{ position: 'absolute', bottom: 'var(--space-7)', left: 'var(--pad-gutter)', fontSize: 'var(--type-micro)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Scroll to move through the space
          </div>
        </motion.div>

        {/* Floating glass mark — becomes the network's Purpose node */}
        <motion.div
          aria-hidden="true"
          style={{ position: 'absolute', right: '9%', top: '50%', opacity: markOpacity, scale: markScale, pointerEvents: 'none', zIndex: 2 }}
          animate={reducedMotion ? {} : { y: ['-50%', '-46%', '-50%'], rotate: [-2, 2, -2] }}
          transition={reducedMotion ? {} : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GlassPanel style={{ padding: 'var(--space-8)', width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
            <img src="/logo-signature.png" alt="" style={{ width: 64, height: 'auto', opacity: 0.95 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--gb-bone)', letterSpacing: '0.01em', textAlign: 'center' }}>
              Genesis Becoming
            </span>
          </GlassPanel>
        </motion.div>

        {/* Diagnosis truths — rise as glass, then dissolve into the network */}
        <div style={{ position: 'absolute', inset: 0, padding: 'var(--pad-gutter)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)', zIndex: 2 }}>
          {TRUTHS.map((t, i) => (
            <DiagnosisCard key={i} truth={t} index={i} scrollYProgress={scrollYProgress} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>

        {/* The identity network — nodes appear exactly as their source
            (mark or card) dissolves, at the same screen position */}
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <motion.svg style={{ opacity: gridLinesOpacity }}>
            <defs>
              <pattern id="opening-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="1" fill="var(--gb-stone)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#opening-grid)" />
          </motion.svg>

          {Array.from({ length: isMobile ? 10 : 22 }).map((_, i) => (
            <MicroParticle key={i} index={i} scrollYProgress={scrollYProgress} appearAt={0.32} />
          ))}

          {edgeList.map(([i, j]) => (
            <Edge key={`${i}-${j}`} a={nodes[i]} b={nodes[j]} scrollYProgress={scrollYProgress} start={attractStart} end={attractEnd} />
          ))}
          {nodes.map((n, i) => {
            // Purpose (index 0) appears as the mark dissolves; the three
            // diagnosis nodes appear as their card dissolves; everything
            // else drifts in as the network takes shape.
            let appearAt = 0.34;
            if (i === 0) appearAt = 0.3;
            else if (truthsBecome.includes(i)) appearAt = 0.27 + truthsBecome.indexOf(i) * 0.05 + 0.02;
            return (
              <Node key={n.label} node={n} scrollYProgress={scrollYProgress} attractStart={attractStart} attractEnd={attractEnd} appearAt={appearAt} depth={0.6 + (i % 3) * 0.4} />
            );
          })}
        </svg>

        {/* Closing copy — lands only after the network resolves */}
        <motion.div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--space-10) var(--pad-gutter)',
          opacity: closingOpacity, y: closingY, zIndex: 3,
          background: 'linear-gradient(to top, color-mix(in oklch, var(--gb-ink) 95%, transparent) 40%, transparent)',
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--type-display)', lineHeight: 1.2, color: 'var(--gb-bone)' }}>
              Before people experience your work, they experience your <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>brand.</em>
            </h2>
            <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--type-small)', fontWeight: 300, lineHeight: 1.7, color: 'var(--gb-stone)' }}>
              Every conversation, every click, every first impression begins long before someone experiences the quality of what you actually do. Your brand introduces your work before you ever have the chance to.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
