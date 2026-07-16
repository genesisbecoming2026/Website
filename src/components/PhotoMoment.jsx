import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel.jsx';
import { revealUp, inViewProps } from '../motion.js';

const RADIAL_MASK = 'radial-gradient(ellipse 72% 72% at 50% 50%, black 42%, transparent 90%)';

/**
 * PhotoMoment — the site's one shared treatment for real photography,
 * used instead of bespoke per-image styling. Three techniques, always
 * together unless explicitly opted out: a radial mask so the photo
 * dissolves at its edges rather than sitting in a hard rectangle, a
 * warm gold color-grade so any photo reads as part of Genesis
 * Becoming's world, and (when `children` is passed) a GlassPanel
 * floating over the photo carrying real copy rather than a separate
 * box beside the image.
 *
 * Pass `tinted={false}` and omit `children` for the quiet
 * background-texture use case (e.g. the Services flat-lay detail) —
 * that keeps only the radial fade.
 */
export function PhotoMoment({
  src,
  alt,
  children,
  tinted = true,
  aspectRatio = '16 / 10',
  objectPosition = 'center',
  style = {},
}) {
  return (
    <motion.div
      {...inViewProps}
      variants={revealUp}
      style={{ position: 'relative', aspectRatio, ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          maskImage: RADIAL_MASK,
          WebkitMaskImage: RADIAL_MASK,
        }}
      />

      {tinted && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gb-gold)',
            mixBlendMode: 'multiply',
            opacity: 0.3,
            maskImage: RADIAL_MASK,
            WebkitMaskImage: RADIAL_MASK,
          }}
        />
      )}

      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: 'var(--space-6)',
          }}
        >
          <GlassPanel padded tilt style={{ maxWidth: '34ch', textAlign: 'center' }}>
            {children}
          </GlassPanel>
        </div>
      )}
    </motion.div>
  );
}
