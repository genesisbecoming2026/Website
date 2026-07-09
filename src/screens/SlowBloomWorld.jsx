import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { ProjectNavFooter } from '../components/ProjectNavFooter.jsx';
import { MediaSlot } from '../components/MediaSlot.jsx';
import { ScrollSteamReveal } from '../components/ScrollSteamReveal.jsx';
import { ProjectCursor } from '../components/ProjectCursor.jsx';
import { CALENDLY_URL, PROJECTS, SLOW_BLOOM_BRAND } from '../config.js';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion.js';

const project = PROJECTS.find((p) => p.id === 'bloom');
const { colors, fontDisplay, fontBody } = SLOW_BLOOM_BRAND;
const ACCENT = colors.gold;

/**
 * SlowBloomWorld — Slow Bloom's documentary experience.
 *
 * Motion dialect: "Steam / Ceramic / Paper." The slowest of all three
 * worlds, deliberately. Uses the real brand palette (Espresso, Teal,
 * Gold, Cream, Sand, Mocha, Wine) and Spectral as a licensed-free
 * substitute for the specified Kepler Std.
 */
export function SlowBloomWorld({ onNavigate, onNavigateProject }) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const heroOpacity = useTransform(scrollYProgress, [0.34, 0.52], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.34, 0.52], [0, -20]);

  return (
    <div className="gb-project-cursor-active" style={{ background: colors.espresso, color: colors.cream, minHeight: '100%', position: 'relative', overflow: 'hidden', fontFamily: fontBody }}>
      <ProjectCursor variant="bloom" accent={ACCENT} />
      <button
        onClick={() => onNavigate('work')}
        style={{
          position: 'fixed', top: 26, left: 'var(--pad-gutter)', zIndex: 50,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(43,38,34,0.65)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
          border: `1px solid ${colors.mocha}44`, borderRadius: 'var(--radius-pill)',
          color: colors.cream, cursor: 'pointer', padding: '10px 20px',
          fontFamily: fontBody, fontSize: 'var(--type-label)',
          letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
        }}
      >
        ← Back to Work
      </button>

      {/* Warm café light — slow breathing pulse across the whole scene */}
      <motion.div
        aria-hidden="true"
        animate={reducedMotion ? { opacity: 0.5 } : { opacity: [0.4, 0.62, 0.4], x: ['0%', '5%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed', inset: '-15%', pointerEvents: 'none', zIndex: 1,
          backgroundImage: `linear-gradient(115deg, transparent 25%, ${colors.gold}44 50%, transparent 75%)`,
        }}
      />

      {/* Steam wisps */}
      {!reducedMotion && [0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{
            y: ['0%', '-150%'],
            x: ['0%', `${i % 2 === 0 ? 8 : -8}%`, '0%', `${i % 2 === 0 ? -6 : 6}%`],
            opacity: [0, 0.45, 0.4, 0],
          }}
          transition={{ duration: 7 + i * 1.3, repeat: Infinity, ease: 'easeInOut', delay: i * 1.6 }}
          style={{
            position: 'fixed', left: `${52 + i * 5}%`, bottom: '15%', zIndex: 1,
            width: 22, height: 260, borderRadius: '50%',
            background: `linear-gradient(to top, ${colors.cream}44, transparent)`,
            filter: 'blur(9px)', pointerEvents: 'none',
          }}
        />
      ))}

      <div ref={containerRef} style={{ position: 'relative', height: '260vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          {/* Real hero photo, veiled for text legibility */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(90deg, ${colors.espresso}F2, ${colors.espresso}99 60%, ${colors.espresso}55), url(${project.heroImage})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>
          <motion.div style={{
            position: 'absolute', inset: 0, padding: 'var(--pad-gutter)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: heroOpacity, y: heroY,
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: fontBody, fontSize: 'var(--type-label)',
                letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase',
                color: ACCENT, marginBottom: 'var(--space-6)',
              }}>
              01 — Brand Identity · Editorial Site
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(14px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                margin: 0, fontFamily: fontDisplay, fontWeight: 500,
                fontSize: 'var(--type-mega)', lineHeight: 0.98, letterSpacing: 'var(--tracking-tight)',
                color: colors.cream,
              }}>
              Slow Bloom
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              style={{
                marginTop: 'var(--space-7)', maxWidth: '34ch',
                fontSize: 'var(--type-lead)', fontWeight: 300,
                lineHeight: 'var(--leading-relaxed)', color: `${colors.cream}D0`,
              }}>
              Artisanal coffee, roasted to reward patience. Warmer textures. Slower motion. The colors shift and the atmosphere softens.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Narrative */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: `${colors.espresso}CC`, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', borderTop: `1px solid ${colors.mocha}33` }}>
        <ScrollSteamReveal style={{ maxWidth: 'var(--measure-text)', margin: '0 auto' }}>
          <GlassPanel padded tilt style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 'var(--space-6)' }}>
              What was already there
            </div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 'var(--leading-snug)', color: colors.cream, textWrap: 'balance' }}>
              Slow Bloom was already this before we arrived. A practice built on ritual and intentional living — our work was to notice it, and make it impossible to rush past.
            </p>
            <div style={{ height: 1, background: `${colors.mocha}44`, margin: 'var(--space-9) 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
              {[['The Philosophy', 'Ritual over routine'], ['The Identity', 'Botanical, paper, warmth'], ['The Experience', 'Packaging, café, community']].map(([h, s]) => (
                <div key={h}>
                  <div style={{ fontSize: 'var(--type-small)', color: colors.cream, fontWeight: 500 }}>{h}</div>
                  <div style={{ fontSize: 'var(--type-small)', color: `${colors.cream}90`, marginTop: 4 }}>{s}</div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </ScrollSteamReveal>
      </div>

      {/* Brand Overview */}
      <div style={{ padding: 'var(--space-10) var(--pad-gutter) var(--space-9)', maxWidth: '760px', margin: '0 auto' }}>
        <ScrollSteamReveal>
          <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Brand Overview</div>
          <p style={{ margin: 0, fontSize: 'var(--type-small)', lineHeight: 1.7, color: `${colors.cream}B0` }}>
            Slow Bloom is a coffee and lifestyle practice built around ritual rather than routine — an antidote to a category that mostly competes on speed and convenience. Every part of the brand, down to three distinct roast lines, needed to protect that sense of unhurried intention.
          </p>
        </ScrollSteamReveal>
      </div>

      {/* Problem / Insight / Solution */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-9)' }}>
        {[
          { label: 'The Problem', copy: 'Coffee brands compete on speed. This one wanted to celebrate slowing down.' },
          { label: 'The Insight', copy: 'People remember rituals more than products.' },
          { label: 'The Solution', copy: 'Everything \u2014 from the typography to the packaging \u2014 was designed to reinforce intentional presence.' },
        ].map((b) => (
          <ScrollSteamReveal key={b.label}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>{b.label}</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.25, color: colors.cream }}>{b.copy}</p>
          </ScrollSteamReveal>
        ))}
      </div>

      {/* Roast Lines — real color-coded product lines */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: `${colors.espresso}DD`, borderTop: `1px solid ${colors.mocha}33` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollSteamReveal style={{ marginBottom: 'var(--space-7)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Roast Lines</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.3, color: colors.cream, maxWidth: '52ch' }}>
              Three roasts, three colors — a system that differentiates without ever feeling loud.
            </p>
          </ScrollSteamReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
            {SLOW_BLOOM_BRAND.roasts.map((r) => (
              <div key={r.name} style={{ padding: 'var(--space-6)', borderRadius: 10, background: r.color }}>
                <span style={{ fontFamily: fontDisplay, fontSize: '1.2rem', color: colors.cream }}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Identity + Logo System */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: `${colors.espresso}BB`, borderTop: `1px solid ${colors.mocha}33` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollSteamReveal style={{ marginBottom: 'var(--space-7)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Visual Identity · Logo System</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.3, color: colors.cream, maxWidth: '52ch' }}>
              A rose in stained-glass linework — botanical, paper, and warmth.
            </p>
          </ScrollSteamReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
            <div style={{ background: colors.cream, borderRadius: 8, aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
              <img src={project.logoImage} alt="Slow Bloom logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
              {Object.entries(colors).map(([name, hex]) => (
                <div key={name} style={{ background: hex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, color: name === 'cream' || name === 'sand' ? colors.espresso : colors.cream, textTransform: 'capitalize' }}>{name}</span>
                </div>
              ))}
            </div>
            <div style={{ aspectRatio: '1 / 1', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.gold}33`, padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: '2.4rem', color: colors.cream, lineHeight: 1 }}>Aa</div>
                <div style={{ fontFamily: fontBody, fontSize: 12, letterSpacing: '0.08em', color: ACCENT, textTransform: 'uppercase', marginTop: 8 }}>Spectral — Headlines</div>
              </div>
              <div>
                <div style={{ fontFamily: fontBody, fontWeight: 400, fontSize: '1.6rem', color: `${colors.cream}90`, lineHeight: 1 }}>Aa</div>
                <div style={{ fontFamily: fontBody, fontSize: 12, letterSpacing: '0.08em', color: `${colors.cream}90`, textTransform: 'uppercase', marginTop: 8 }}>Archivo — Body</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications — real photos */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollSteamReveal style={{ marginBottom: 'var(--space-7)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Applications</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.3, color: colors.cream, maxWidth: '52ch' }}>
              Packaging, stationery, and ceramics — the ritual, wherever it's experienced.
            </p>
          </ScrollSteamReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
            <MediaSlot src={project.applicationImages[0]} label="Ceramics" accent={ACCENT} />
            <MediaSlot src={project.applicationImages[1]} label="Stationery" accent={ACCENT} />
            <MediaSlot src={project.applicationImages[2]} label="Packaging" accent={ACCENT} />
          </div>
        </div>
      </div>

      {/* Final Brand Moment */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center', borderTop: `1px solid ${colors.mocha}33` }}>
        <ScrollSteamReveal>
          <p style={{ margin: 0, fontFamily: fontDisplay, fontStyle: 'italic', fontSize: 'var(--type-title)', color: `${colors.cream}CC` }}>
            The brand no longer competes on speed. It never needed to.
          </p>
        </ScrollSteamReveal>
      </div>

      <ProjectNavFooter currentId="bloom" onNavigate={onNavigate} onNavigateProject={onNavigateProject} accent={ACCENT} />
    </div>
  );
}
