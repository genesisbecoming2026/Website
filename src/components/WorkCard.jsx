import React from 'react';
import { motion } from 'framer-motion';

/**
 * WorkCard — a portfolio project as a world, not a thumbnail. A full-bleed
 * atmosphere (image or gradient world), a protection veil for legibility,
 * and copy that lifts on hover as the image slowly scales in. Never bounces.
 * On hover, a thin accent bar in that project's real color expands across
 * the bottom edge — "the palette expands" — a quiet, tactile confirmation
 * of which world you're about to enter.
 */
const WORLDS = {
  bloom: 'radial-gradient(90% 120% at 25% 15%, #c98a6a, transparent 60%), radial-gradient(90% 120% at 85% 90%, #b76e4d, transparent 55%), #3a221a',
  grow: 'radial-gradient(100% 120% at 30% 20%, #9fae94, transparent 60%), radial-gradient(90% 120% at 80% 85%, #6f7d68, transparent 55%), #232a22',
  tnt: 'radial-gradient(90% 120% at 20% 20%, #d1a054, transparent 60%), radial-gradient(90% 120% at 85% 90%, #6b5a45, transparent 55%), #2b241c',
};
const ACCENTS = { bloom: '#e6b79a', grow: '#b7c6ac', tnt: '#e0bb7f' };

export function WorkCard({
  title,
  meta,
  index,
  image,
  logoImage,
  accentColor,
  world = 'bloom',
  href,
  aspect = '4 / 5',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const bg = image ? `url(${image})` : WORLDS[world] || WORLDS.bloom;

  const frame = {
    position: 'relative',
    display: 'block',
    aspectRatio: aspect,
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    textDecoration: 'none',
    background: 'var(--gb-ink)',
    boxShadow: hover ? 'var(--shadow-xl)' : 'var(--shadow-md)',
    transition: 'box-shadow var(--dur-slow) var(--ease-cinematic)',
    cursor: 'pointer',
    ...style,
  };

  const media = {
    position: 'absolute',
    inset: 0,
    background: bg,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: hover ? 'scale(1.06)' : 'scale(1)',
    transition: 'transform var(--dur-reveal) var(--ease-cinematic)',
  };

  const veil = {
    position: 'absolute',
    inset: 0,
    background: 'var(--veil-bottom)',
  };

  const content = {
    position: 'absolute',
    left: 'var(--space-6)',
    right: 'var(--space-6)',
    bottom: 'var(--space-6)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transform: hover ? 'translateY(-4px)' : 'translateY(0)',
    transition: 'transform var(--dur-slow) var(--ease-cinematic)',
  };

  const idxRow = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-label)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    color: 'var(--gb-gold)',
  };

  const titleSt = {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-normal)',
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    lineHeight: 1.02,
    letterSpacing: 'var(--tracking-tight)',
    color: 'var(--gb-bone)',
  };

  const metaSt = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-small)',
    color: 'var(--gb-stone)',
    maxHeight: hover ? '40px' : '0',
    opacity: hover ? 1 : 0,
    overflow: 'hidden',
    transition: 'max-height var(--dur-slow) var(--ease-cinematic), opacity var(--dur-base) var(--ease-glide)',
  };

  const Tag = href ? 'a' : 'div';

  return (
    <Tag
      href={href}
      style={frame}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      <div style={media} />
      {logoImage && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `color-mix(in oklch, ${accentColor || 'var(--gb-gold)'} 38%, var(--glass-fill-dark))`,
          backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '64%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'var(--space-6)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'color-mix(in oklch, var(--gb-bone) 85%, transparent)',
              backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-hairline)',
              borderTop: '1px solid rgba(255,255,255,0.6)',
              boxShadow: 'var(--glass-edge), var(--shadow-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'var(--space-5)',
            }}>
              <img src={logoImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
        </div>
      )}
      <div style={veil} />
      <div style={content}>
        <div style={idxRow}>
          {index != null && <span>{index}</span>}
          {index != null && <span style={{ width: 24, height: 1, background: 'currentColor', opacity: 0.5 }} />}
          <span>Selected Work</span>
        </div>
        <h3 style={titleSt}>{title}</h3>
        {meta && <div style={metaSt}>{meta}</div>}
      </div>
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 3,
          background: ACCENTS[world] || ACCENTS.bloom,
          transformOrigin: 'left center',
        }}
      />
    </Tag>
  );
}
