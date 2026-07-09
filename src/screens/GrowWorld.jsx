import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { ProjectNavFooter } from '../components/ProjectNavFooter.jsx';
import { MediaSlot } from '../components/MediaSlot.jsx';
import { ScrollBloom } from '../components/ScrollBloom.jsx';
import { ProjectCursor } from '../components/ProjectCursor.jsx';
import { CALENDLY_URL, PROJECTS, GROW_BRAND } from '../config.js';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion.js';

const project = PROJECTS.find((p) => p.id === 'grow');
const { colors, fontDisplay, fontBody } = GROW_BRAND;
const ACCENT = colors.sage;

/**
 * GrowWorld — Grow's documentary experience.
 *
 * Motion dialect: "Organic / Breathing." Uses Grow's real brand system
 * (Cormorant Garamond + Manrope, olive/sage/clay/cream palette) and real
 * copy pulled directly from their brand presentation. Per the client's
 * own design notes in that deck — more white space, one idea per section,
 * less copy, subtle purposeful motion — this page stays deliberately
 * spacious rather than dense.
 */
export function GrowWorld({ onNavigate, onNavigateProject }) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const heroOpacity = useTransform(scrollYProgress, [0.28, 0.42], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.28, 0.42], [0, -30]);
  const lineLength = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);

  return (
    <div className="gb-project-cursor-active" style={{ background: '#1c2117', color: colors.morningMist, minHeight: '100%', position: 'relative', overflow: 'hidden', fontFamily: fontBody }}>
      <ProjectCursor variant="grow" accent={ACCENT} />
      <button
        onClick={() => onNavigate('work')}
        style={{
          position: 'fixed', top: 26, left: 'var(--pad-gutter)', zIndex: 50,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(28,33,23,0.65)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
          border: `1px solid ${colors.sage}33`, borderRadius: 'var(--radius-pill)',
          color: colors.morningMist, cursor: 'pointer', padding: '10px 20px',
          fontFamily: fontBody, fontSize: 'var(--type-label)',
          letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
        }}
      >
        ← Back to Work
      </button>

      {/* Continuous breathing ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={reducedMotion ? { opacity: 0.5 } : { scale: [1, 1.04, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed', inset: '-15%', pointerEvents: 'none', zIndex: 1,
          backgroundImage: `radial-gradient(50% 60% at 30% 25%, ${colors.olive}55, transparent 70%)`,
        }}
      />

      <div ref={containerRef} style={{ position: 'relative', height: '240vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

          {/* Real hero photo — the glass office door with Kari Bulman's nameplate */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(90deg, #1c2117F2, #1c211799 55%, #1c211755), url(${project.heroImage})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>

          {/* Real logo icon — the fingerprint/leaf mark, draws in with scroll */}
          <motion.div
            style={{ position: 'absolute', right: '8%', top: '16%', width: 200, opacity: lineLength, scale: lineLength }}
          >
            <img
              src={project.iconImage}
              alt=""
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>

          <motion.div style={{
            position: 'absolute', inset: 0, padding: 'var(--pad-gutter)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: heroOpacity, y: heroY,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: fontBody, fontSize: 'var(--type-label)',
                letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase',
                color: ACCENT, marginBottom: 'var(--space-6)',
              }}>
              02 — Naming · Identity · Motion
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{
                margin: 0, fontFamily, fontWeight: 500,
                fontSize: 'var(--type-mega)', lineHeight: 0.98, letterSpacing: 'var(--tracking-tight)',
                color: colors.morningMist,
              }}>
              Grow
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{
                marginTop: 'var(--space-7)', maxWidth: '34ch',
                fontSize: 'var(--type-lead)', fontWeight: 300,
                lineHeight: 'var(--leading-relaxed)', color: `${colors.morningMist}CC`,
              }}>
              {GROW_BRAND.tagline}. {GROW_BRAND.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* The Grow Experience — one idea, four qualities, spacious */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', borderTop: `1px solid ${colors.sage}22` }}>
        <ScrollBloom style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            The Grow Experience
          </div>
          <p style={{ margin: '0 0 var(--space-9)', fontFamily, fontWeight: 500, fontSize: 'var(--type-title)', lineHeight: 1.35, color: colors.morningMist, textAlign: 'center', maxWidth: '48ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Grow exists to help people discover what is keeping them stuck so they can move forward in freedom, identity, and deeper partnership with God.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-8)' }}>
            {GROW_BRAND.qualities.map((q) => (
              <div key={q.title}>
                <h4 style={{ margin: 0, fontFamily, fontWeight: 600, fontSize: '1.3rem', color: ACCENT }}>{q.title}</h4>
                <p style={{ margin: '8px 0 0', fontSize: 'var(--type-small)', color: `${colors.morningMist}B0`, lineHeight: 1.6 }}>{q.copy}</p>
              </div>
            ))}
          </div>
        </ScrollBloom>
      </div>

      {/* Behind the Logo — real meaning, real mark */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${colors.sage}22` }}>
        <ScrollBloom style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: colors.cream, borderRadius: 16, padding: 'var(--space-7)', width: '100%', maxWidth: 260 }}>
                <img src={project.logoImage} alt="Grow logo" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Behind the Logo</div>
              <p style={{ margin: 0, fontSize: 'var(--type-small)', lineHeight: 1.7, color: `${colors.morningMist}D0` }}>
                {GROW_BRAND.logoMeaning}
              </p>
            </div>
          </div>
        </ScrollBloom>
      </div>

      {/* Color Palette — all six real brand colors */}
      <div style={{ padding: 'var(--space-9) var(--pad-gutter) var(--space-11)', background: 'rgba(255,255,255,0.02)' }}>
        <ScrollBloom style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 'var(--space-6)' }}>Color Palette</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-4)' }}>
            {[
              [colors.olive, 'Olive'],
              [colors.grove, 'Grove'],
              [colors.sage, 'Sage'],
              [colors.morningMist, 'Morning Mist'],
              [colors.earthClay, 'Earth Clay'],
              [colors.cream, 'Cream'],
            ].map(([hex, name]) => (
                <div key={name} style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ background: hex, aspectRatio: '1 / 1' }} />
                  <div style={{ padding: '8px 2px' }}>
                    <div style={{ fontSize: 'var(--type-small)', color: colors.morningMist }}>{name}</div>
                    <div style={{ fontSize: 11, color: `${colors.morningMist}80`, fontFamily: 'monospace' }}>{hex}</div>
                  </div>
                </div>
            ))}
          </div>
        </ScrollBloom>
      </div>

      {/* The Grow Journey — real 5-step process */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', borderTop: `1px solid ${colors.sage}22` }}>
        <ScrollBloom style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 'var(--space-7)', textAlign: 'center' }}>
            The Grow Journey
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-7)' }}>
            {GROW_BRAND.journey.map((step, i) => (
              <div key={step.title}>
                <span style={{ fontFamily: fontBody, fontSize: 'var(--type-label)', color: ACCENT, letterSpacing: 'var(--tracking-wide)' }}>0{i + 1}</span>
                <h4 style={{ margin: '6px 0 0', fontFamily, fontWeight: 600, fontSize: '1.2rem', color: colors.morningMist }}>{step.title}</h4>
                <p style={{ margin: '8px 0 0', fontSize: 'var(--type-small)', color: `${colors.morningMist}A8`, lineHeight: 1.6 }}>{step.copy}</p>
              </div>
            ))}
          </div>
        </ScrollBloom>
      </div>

      {/* Applications — real business card mockups */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${colors.sage}22` }}>
        <ScrollBloom style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 'var(--space-7)', textAlign: 'center' }}>
            Applications
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            <MediaSlot src={project.applicationImages[0]} label="Business Cards" accent={ACCENT} aspectRatio="16 / 10" />
            <MediaSlot src={project.applicationImages[1]} label="Business Cards — Alt Palette" accent={ACCENT} aspectRatio="16 / 10" />
          </div>
        </ScrollBloom>
      </div>

      {/* Final Brand Moment */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center', borderTop: `1px solid ${colors.sage}22` }}>
        <ScrollBloom style={{ margin: 0, fontFamily, fontStyle: 'italic', fontSize: 'var(--type-title)', color: `${colors.morningMist}CC` }}>
          Someone visiting now feels safe before they ever schedule a conversation.
        </ScrollBloom>
      </div>

      {/* Typography */}
      <div style={{ padding: 'var(--space-9) var(--pad-gutter) var(--space-11)' }}>
        <ScrollBloom style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 'var(--space-6)' }}>Typography</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-6)', borderRadius: 8, border: `1px solid ${ACCENT}33` }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: '2.6rem', color: colors.morningMist, lineHeight: 1 }}>Aa</div>
              <div style={{ fontFamily: fontBody, fontSize: 12, letterSpacing: '0.08em', color: ACCENT, textTransform: 'uppercase', marginTop: 10 }}>Cormorant Garamond — Headlines</div>
            </div>
            <div style={{ padding: 'var(--space-6)', borderRadius: 8, border: `1px solid ${ACCENT}33` }}>
              <div style={{ fontFamily: fontBody, fontWeight: 500, fontSize: '2rem', color: `${colors.morningMist}B0`, lineHeight: 1 }}>Aa</div>
              <div style={{ fontFamily: fontBody, fontSize: 12, letterSpacing: '0.08em', color: `${colors.morningMist}B0`, textTransform: 'uppercase', marginTop: 10 }}>Manrope — Body</div>
            </div>
          </div>
        </ScrollBloom>
      </div>

      <ProjectNavFooter currentId="grow" onNavigate={onNavigate} onNavigateProject={onNavigateProject} accent={ACCENT} />
    </div>
  );
}
