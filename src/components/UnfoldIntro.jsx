import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow } from './Eyebrow.jsx';
import { Button } from './Button.jsx';
import { GlassPanel } from './GlassPanel.jsx';

/**
 * UnfoldIntro — Section 1 + 2 combined into one pinned, scroll-driven
 * transformation. Instead of the hero scrolling away and a new section
 * scrolling in, the hero dissolves and scales back into depth while the
 * three diagnosis statements rise out of glass behind it. The viewport
 * stays pinned for the length of the transformation, so the motion reads
 * as one continuous event, not two stacked sections.
 *
 * Motion Bible mapping:
 *  - Reveal:   truths appear because the scroll uncovers them, not because
 *              they "slide in" on a timer.
 *  - Depth:    hero recedes (scale/opacity/blur) while cards rise in front,
 *              on a different scroll-speed than the background glow.
 *  - Response: GlassPanel's existing cursor-tilt still works on each card
 *              once revealed — scroll and cursor motion coexist.
 *  - Story:    the transformation itself IS the diagnosis — the visitor
 *              watches the question resolve into the underlying problem.
 */
export function UnfoldIntro({ onEnterProject, firstProjectId }) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hero recedes from 0 → 0.42 of the pinned scroll range.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.32, 0.44], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.44], [1, 0.86]);
  const heroY = useTransform(scrollYProgress, [0, 0.44], [0, -60]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.44], [0, 6]);
  const heroFilter = useTransform(heroBlur, (v) => `blur(${v}px)`);

  // Ambient background light drifts slowly across the whole sequence —
  // a much slower "depth layer" than the foreground content.
  const glowX = useTransform(scrollYProgress, [0, 1], ['20%', '70%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.9, 0.4]);

  const TRUTHS = [
    'Your business has grown. Your brand hasn\u2019t kept pace.',
    'People experience your brand before they experience your work.',
    'Most businesses don\u2019t lack quality. They lack clarity.',
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '260vh' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Depth layer 0 — ambient light, moves slowest */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: '-10%', pointerEvents: 'none',
            backgroundImage: 'radial-gradient(45% 55% at var(--gx) 30%, color-mix(in oklch, var(--gb-gold) 16%, transparent), transparent 70%)',
            '--gx': glowX,
            opacity: glowOpacity,
          }}
        />

        {/* Depth layer 1 — the hero, receding */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, padding: 'var(--pad-gutter)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: heroOpacity, scale: heroScale, y: heroY, filter: heroFilter,
          }}
        >
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Branding &amp; Immersive Design — Columbia, TN</Eyebrow>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'var(--type-mega)', lineHeight: 0.98,
            letterSpacing: 'var(--tracking-tight)', maxWidth: '14ch',
          }}>
            Your work deserves <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>thoughtful design.</em>
          </h1>
          <p style={{
            marginTop: 'var(--space-7)', maxWidth: 'var(--measure-lead)',
            fontSize: 'var(--type-lead)', fontWeight: 300,
            lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)',
          }}>
            The identity is already there. We help you reveal it — so the way people experience your brand finally matches the quality of what you've actually built.
          </p>
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <Button variant="primary" size="lg" onClick={() => onEnterProject(firstProjectId)}>See the Work</Button>
            <Button variant="link" href="#understanding">Keep Reading</Button>
          </div>
          <div style={{
            position: 'absolute', bottom: 'var(--space-7)', left: 'var(--pad-gutter)',
            fontSize: 'var(--type-micro)', letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>Scroll to move through the space</div>
        </motion.div>

        {/* Depth layer 2 — the diagnosis, rising out of glass in front */}
        <div style={{
          position: 'absolute', inset: 0, padding: 'var(--pad-gutter)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)',
        }}>
          {TRUTHS.map((t, i) => {
            // Each card staggers slightly later than the last, and rises
            // from a slightly different depth/rotation so no two feel
            // mechanically identical.
            const start = 0.34 + i * 0.08;
            const end = 0.62 + i * 0.08;
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const y = useTransform(scrollYProgress, [start, end], [70, 0]);
            const rotate = useTransform(scrollYProgress, [start, end], [i % 2 === 0 ? -2.5 : 2.5, 0]);
            const scale = useTransform(scrollYProgress, [start, end], [0.92, 1]);
            return (
              <motion.div key={i} style={{ opacity, y, rotate, scale, maxWidth: '640px', transformOrigin: i % 2 === 0 ? 'left center' : 'right center' }}>
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
                    }}>0{i + 1}</span>
                    {t}
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
