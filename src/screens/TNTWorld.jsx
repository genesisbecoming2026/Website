import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { ProjectNavFooter } from '../components/ProjectNavFooter.jsx';
import { MediaSlot } from '../components/MediaSlot.jsx';
import { ProjectCursor } from '../components/ProjectCursor.jsx';
import { Breadcrumb } from '../components/Breadcrumb.jsx';
import { ScrollClipReveal } from '../components/ScrollClipReveal.jsx';
import { CALENDLY_URL, PROJECTS, TNT_BRAND } from '../config.js';

const project = PROJECTS.find((p) => p.id === 'tnt');
const { colors, fontDisplay, fontBody } = TNT_BRAND;

/**
 * TNTLogoCard — hover a logo, the construction grid appears. A small,
 * intentional micro-interaction specific to TNT's engineered identity.
 */
function TNTLogoCard({ src, colors }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 8, background: colors.seaSaltWhite, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', overflow: 'hidden' }}
    >
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hover ? 0.5 : 0, transition: 'opacity 0.4s cubic-bezier(0.65,0,0.35,1)' }}>
        <defs>
          <pattern id="tnt-logo-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={colors.heroRed} strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tnt-logo-grid)" />
      </svg>
      <img src={src} alt="TNT Builders logo" loading="lazy" decoding="async" style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.4s cubic-bezier(0.65,0,0.35,1)' }} />
    </div>
  );
}

/**
 * TNTWorld — TNT Builders' documentary experience.
 *
 * Motion dialect: "Engineered." Hard-edged clip-path reveals instead of
 * fades, a blueprint grid that draws itself in with mechanical precision,
 * a "dust clearing" wipe over the project imagery, squarer panels, and
 * --ease-engineered — a steeper curve than the cinematic ease elsewhere.
 *
 * Uses TNT's real, specified brand system throughout: Hero Red / Charcoal
 * Black / Sea Salt White / River Stone Gray, and Sora + Inter typography
 * (Shackleton/Roca are used only inside the static logo artwork itself).
 */
export function TNTWorld({ onNavigate, onNavigateProject }) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const gridClip = useTransform(scrollYProgress, [0, 0.18], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const titleClip = useTransform(scrollYProgress, [0.02, 0.22], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']);
  const heroOpacity = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.3, 0.42], [0, -40]);

  // The "dust clearing" reveal over the real project photo.
  const dustClip = useTransform(
    scrollYProgress,
    [0.28, 0.5],
    ['polygon(0 0, 0% 0, 0% 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']
  );

  const panelX = useTransform(scrollYProgress, [0.42, 0.6], [80, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1]);

  return (
    <div className="gb-project-cursor-active" style={{ background: colors.charcoalBlack, color: colors.seaSaltWhite, minHeight: '100%', position: 'relative', fontFamily: fontBody }}>
      <ProjectCursor variant="tnt" accent={colors.heroRed} />
      <button
        onClick={() => onNavigate('work')}
        style={{
          position: 'fixed', top: 26, left: 'var(--pad-gutter)', zIndex: 50,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(18,23,23,0.65)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
          border: `1px solid ${colors.riverStoneGray}33`, borderRadius: 'var(--radius-pill)',
          color: colors.seaSaltWhite, cursor: 'pointer', padding: '10px 20px',
          fontFamily: fontBody, fontSize: 'var(--type-label)',
          letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
        }}
      >
        ← Back to Work
      </button>

      <div style={{ position: 'fixed', top: 68, left: 'var(--pad-gutter)', zIndex: 49 }}>
        <Breadcrumb
          items={[{ label: 'Home', page: 'home' }, { label: 'Work', page: 'work' }, { label: 'TNT Builders' }]}
          onNavigate={onNavigate}
          color={colors.seaSaltWhite}
          accentColor={colors.heroRed}
        />
      </div>

      {/* Faint continuous blueprint texture — present throughout the whole page */}
      <svg aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none', zIndex: 1 }} preserveAspectRatio="none">
        <defs>
          <pattern id="tnt-grid-ambient" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke={colors.heroRed} strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tnt-grid-ambient)" />
      </svg>

      <div ref={containerRef} style={{ position: 'relative', height: '280vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          <motion.svg
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', clipPath: gridClip, opacity: 0.35 }}
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="tnt-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke={colors.heroRed} strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tnt-grid)" />
          </motion.svg>

          {/* Hero — precision-cut title reveal, Sora per real brand spec */}
          <motion.div style={{
            position: 'absolute', inset: 0, padding: 'var(--pad-gutter)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: heroOpacity, y: heroY,
          }}>
            <div style={{
              fontFamily: fontBody, fontSize: 'var(--type-label)',
              letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase',
              color: colors.heroRed, marginBottom: 'var(--space-6)',
            }}>
              03 — Brand Identity · Print &amp; Digital
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h1 style={{
                margin: 0, fontFamily: fontDisplay, fontWeight: 700,
                fontSize: 'var(--type-mega)', lineHeight: 0.96,
                letterSpacing: 'var(--tracking-tight)', clipPath: titleClip,
              }}>
                TNT Builders
              </motion.h1>
            </div>
            <p style={{
              marginTop: 'var(--space-7)', maxWidth: '34ch',
              fontSize: 'var(--type-lead)', fontWeight: 300,
              lineHeight: 'var(--leading-relaxed)', color: `${colors.seaSaltWhite}D0`,
            }}>
              Twenty years of trust, built one project at a time. Grounded textures. Steady rhythm. Strength meets warmth.
            </p>
          </motion.div>

          {/* The material reveal — real jobsite photo, dust-clearing hard wipe */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(0deg, ${colors.charcoalBlack}CC, ${colors.charcoalBlack}66), url(${project.heroImage})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
            <motion.div style={{
              position: 'absolute', inset: 0,
              background: colors.charcoalBlack,
              clipPath: dustClip,
            }} />
          </div>

          {/* Narrative panel — slides in hard from the side, engineered ease */}
          <motion.div style={{
            position: 'absolute', right: 'var(--pad-gutter)', bottom: 'var(--space-9)',
            maxWidth: '440px', x: panelX, opacity: panelOpacity,
          }}>
            <GlassPanel style={{ borderRadius: 6, padding: 'var(--space-7)' }}>
              <div style={{
                fontFamily: fontBody, fontSize: 'var(--type-label)',
                letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
                color: colors.heroRed, marginBottom: 'var(--space-5)',
              }}>
                What Was Already There
              </div>
              <p style={{
                margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)',
                lineHeight: 'var(--leading-snug)', color: colors.seaSaltWhite,
              }}>
                TNT Builders was already this before we arrived — twenty years of trust, built one project at a time. Our work was to notice it, and make it impossible to overlook.
              </p>
            </GlassPanel>
          </motion.div>
        </div>
      </div>

      {/* Brand Overview — real founders, real story, real crew on site */}
      <div style={{ padding: 'var(--space-10) var(--pad-gutter) var(--space-9)', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-7)', alignItems: 'center' }}>
          <ScrollClipReveal>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: colors.heroRed, marginBottom: 10 }}>Brand Overview</div>
            <p style={{ margin: 0, fontSize: 'var(--type-small)', lineHeight: 1.7, color: colors.riverStoneGray }}>
              TNT Builders has never been just about construction. It's about {TNT_BRAND.founders} — a family business built on honesty, relationships, craftsmanship, and doing things the right way. Every home is temporary. Every relationship becomes part of a legacy.
            </p>
          </ScrollClipReveal>
          <ScrollClipReveal>
            <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4 / 3' }}>
              <img src={project.crewImage} alt="TNT Builders crew on site in branded shirts, framing under construction behind them" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </ScrollClipReveal>
        </div>
      </div>

      {/* The real client quote — a quiet pull-quote moment */}
      <div style={{ padding: 'var(--space-9) var(--pad-gutter)', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <ScrollClipReveal>
          <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 600, fontStyle: 'italic', fontSize: 'var(--type-title)', lineHeight: 1.3, color: colors.seaSaltWhite }}>
            "{TNT_BRAND.quote}"
          </p>
        </ScrollClipReveal>
      </div>

      {/* The Strategy — the real origin story behind the name and mark */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${colors.riverStoneGray}22` }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <ScrollClipReveal>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: colors.heroRed, marginBottom: 'var(--space-6)' }}>The Strategy</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.35, color: colors.seaSaltWhite }}>
              For twenty years, Toby and Trina had a name they never let themselves use.
            </p>
            <p style={{ margin: 'var(--space-6) 0 0', fontSize: 'var(--type-small)', lineHeight: 1.7, color: colors.riverStoneGray }}>
              Their names both start with T. For two decades, it was a running joke between them — TNT, because together they could do a lot of damage. But it never felt like something serious enough to put on a truck. It felt too personal, not corporate enough for a real business.
            </p>
            <p style={{ margin: 'var(--space-5) 0 0', fontSize: 'var(--type-small)', lineHeight: 1.7, color: colors.riverStoneGray }}>
              The identity was never missing. It had been there the entire time, inside the story of two people who spent twenty years building something from nothing into a real, successful company. Our job wasn't to invent a name. It was to notice the one already sitting in plain sight — and give them permission to finally own it.
            </p>
            <p style={{ margin: 'var(--space-5) 0 0', fontSize: 'var(--type-small)', lineHeight: 1.7, color: colors.riverStoneGray }}>
              The dynamite mark isn't a generic construction symbol. It's literal — TNT, the business's own initials — carrying the same weight as the joke that started it all.
            </p>
          </ScrollClipReveal>
        </div>
      </div>

      {/* Problem / Insight / Solution — the documentary spine */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-9)' }}>
        {[
          { label: 'The Problem', copy: 'TNT\u2019s previous identity was simple, but it lacked distinction \u2014 familiar construction symbolism that did little to communicate what set the company apart.' },
          { label: 'The Insight', copy: 'People often judge credibility before they experience craftsmanship.' },
          { label: 'The Solution', copy: 'An identity built on the same integrity, craftsmanship, and relationships the business itself was built on.' },
        ].map((b) => (
          <ScrollClipReveal key={b.label}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: colors.heroRed, marginBottom: 10 }}>{b.label}</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.25, color: colors.seaSaltWhite }}>{b.copy}</p>
          </ScrollClipReveal>
        ))}
      </div>

      {/* Key Brand Principles — real, from the brand presentation */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${colors.riverStoneGray}22` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <ScrollClipReveal style={{ marginBottom: 'var(--space-7)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: colors.heroRed, marginBottom: 10 }}>Key Brand Principles</div>
          </ScrollClipReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-7)' }}>
            {TNT_BRAND.principles.map((p) => (
              <ScrollClipReveal key={p.title}>
                <h4 style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 700, fontSize: '1.2rem', color: colors.seaSaltWhite }}>{p.title}</h4>
                <p style={{ margin: '8px 0 0', fontSize: 'var(--type-small)', color: colors.riverStoneGray, lineHeight: 1.5 }}>{p.copy}</p>
              </ScrollClipReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Identity + Logo System — real logo, real colors */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', background: 'rgba(255,255,255,0.015)', borderTop: `1px solid ${colors.riverStoneGray}22` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollClipReveal style={{ marginBottom: 'var(--space-7)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: colors.heroRed, marginBottom: 10 }}>Visual Identity · Logo System</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.3, color: colors.seaSaltWhite, maxWidth: '52ch' }}>
              Hero Red, Charcoal Black, Sea Salt White, River Stone Gray — a mark built for a jobsite, not a boardroom.
            </p>
          </ScrollClipReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)' }}>
            <TNTLogoCard src={project.logoImage} colors={colors} />
            <div style={{ aspectRatio: '1 / 1', borderRadius: 8, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
              {[
                [colors.heroRed, 'Hero Red'],
                [colors.charcoalBlack, 'Charcoal Black'],
                [colors.seaSaltWhite, 'Sea Salt White'],
                [colors.riverStoneGray, 'River Stone Gray'],
              ].map(([hex, name]) => (
                <div key={name} style={{ background: hex, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                  <span style={{ fontSize: 10, color: hex === colors.seaSaltWhite || hex === colors.riverStoneGray ? colors.charcoalBlack : colors.seaSaltWhite, fontFamily: fontBody }}>{name}</span>
                </div>
              ))}
            </div>
            <div style={{ aspectRatio: '1 / 1', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.heroRed}33`, padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: '2.4rem', color: colors.seaSaltWhite, lineHeight: 1 }}>Aa</div>
                <div style={{ fontFamily: fontDisplay, fontSize: 12, letterSpacing: '0.08em', color: colors.heroRed, textTransform: 'uppercase', marginTop: 8 }}>Sora — Headlines</div>
              </div>
              <div>
                <div style={{ fontFamily: fontBody, fontWeight: 400, fontSize: '1.6rem', color: colors.riverStoneGray, lineHeight: 1 }}>Aa</div>
                <div style={{ fontFamily: fontBody, fontSize: 12, letterSpacing: '0.08em', color: colors.riverStoneGray, textTransform: 'uppercase', marginTop: 8 }}>Inter — Body</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications — real photos from the field */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollClipReveal style={{ marginBottom: 'var(--space-7)' }}>
            <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: colors.heroRed, marginBottom: 10 }}>Applications</div>
            <p style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.3, color: colors.seaSaltWhite, maxWidth: '52ch' }}>
              Trucks, trailers, branded gear, and proposals that finally match twenty years of reputation.
            </p>
          </ScrollClipReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)' }}>
            <MediaSlot src={project.applicationImages[0]} label="Brand In The Field" accent={colors.heroRed} />
            <MediaSlot src={project.applicationImages[1]} label="Trailer" accent={colors.heroRed} />
            <MediaSlot src={project.applicationImages[2]} label="Business Cards" accent={colors.heroRed} />
            <MediaSlot src={project.applicationImages[3]} label="Branded Gear" accent={colors.heroRed} />
          </div>
        </div>
      </div>

      {/* Final Brand Moment */}
      <div style={{ padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center', borderTop: `1px solid ${colors.riverStoneGray}22` }}>
        <ScrollClipReveal style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 400, fontStyle: 'italic', fontSize: 'var(--type-title)', color: colors.riverStoneGray }}>
          Twenty years of trust now looks like twenty years of trust.
        </ScrollClipReveal>
      </div>

      <ProjectNavFooter currentId="tnt" onNavigate={onNavigate} onNavigateProject={onNavigateProject} accent={colors.heroRed} />
    </div>
  );
}
