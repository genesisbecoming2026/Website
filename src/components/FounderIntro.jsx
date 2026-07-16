import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel.jsx';
import { Eyebrow } from './Eyebrow.jsx';
import { revealLeft, revealRight, inViewProps } from '../motion.js';

/**
 * FounderIntro — photo and words side by side, never overlapping. An
 * earlier full-bleed-with-text-overlay version risked the bio covering
 * Ty's face depending on viewport height; a split layout (matching the
 * same pattern used in Home's Solution section and Studio's Who-We-Serve
 * section) guarantees the portrait is always fully visible.
 */
const FOUNDER_PHOTO = '/images/founder/ty-portrait.jpg';

export function FounderIntro() {
  return (
    <section style={{ padding: 'var(--space-11) var(--pad-gutter)', borderTop: '1px solid var(--border-hairline)' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--space-9)', alignItems: 'center', maxWidth: 'var(--width-content)', margin: '0 auto',
      }}>
        <motion.div
          {...inViewProps}
          variants={revealLeft}
          style={{
            position: 'relative', aspectRatio: '3 / 4', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            backgroundImage: FOUNDER_PHOTO
              ? `url(${FOUNDER_PHOTO})`
              : 'linear-gradient(160deg, #1c1a17 0%, #14120f 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 22%',
          }}
        >
          {!FOUNDER_PHOTO && (
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 'var(--space-6)', border: '1px dashed var(--border-hairline)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
              color: 'var(--gb-stone)', opacity: 0.4, textAlign: 'center', padding: 'var(--space-4)',
            }}>
              Founder Portrait
            </div>
          )}
        </motion.div>

        <motion.div {...inViewProps} variants={revealRight}>
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Behind Genesis Becoming</Eyebrow>
          <GlassPanel padded tilt style={{ padding: 'var(--space-8)' }}>
            <p style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic',
              fontSize: 'var(--type-title)', lineHeight: 1.35, color: 'var(--gb-bone)', textWrap: 'balance',
            }}>
              "I don't think design is about invention. I think it's about attention — noticing what's already true about a business, and building a system that finally lets other people see it."
            </p>
            <p style={{
              marginTop: 'var(--space-6)', fontSize: 'var(--type-small)', lineHeight: 1.7, color: 'var(--gb-stone)',
            }}>
              Genesis Becoming exists because I kept noticing the same gap: businesses, ministries, and organizations doing genuinely excellent work, represented online in a way that undersold everything they'd already built. Every project starts the same way — listening first, designing second. I'm not interested in being another vendor. I want to be a creative partner people trust with something that actually matters to them.
            </p>
            <div style={{ marginTop: 'var(--space-6)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gb-bone)' }}>
              — Founder, Genesis Becoming
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
