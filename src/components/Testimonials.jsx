import React from 'react';
import { motion } from 'framer-motion';
import { Statement } from './Statement.jsx';
import { GlassPanel } from './GlassPanel.jsx';
import { TESTIMONIALS } from '../config.js';
import { revealLeft, revealRight, revealUp, inViewProps } from '../motion.js';

/**
 * Testimonials — placed right where a visitor naturally starts asking
 * "can I trust this person?": after they've seen the work (Proof), before
 * the services pitch. Editorial pull-quote cards, not a generic carousel.
 *
 * Quotes are intentionally empty until real client words are gathered —
 * this section is fully designed and ready, but never fabricates a quote
 * and attributes it to a real person.
 */
export function Testimonials() {
  const hasAnyReal = TESTIMONIALS.some((t) => t.quote && t.quote.trim());

  return (
    <section style={{ padding: 'var(--space-11) var(--pad-gutter)', borderTop: '1px solid var(--border-hairline)' }}>
      <motion.div {...inViewProps} variants={revealUp} style={{ marginBottom: 'var(--space-9)', textAlign: 'center' }}>
        <Statement eyebrow="Voices from our clients" size="display">
          Not just our word<br />for it.
        </Statement>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-7)', maxWidth: 'var(--width-content)', margin: '0 auto' }}>
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={i} {...inViewProps} variants={i % 2 === 0 ? revealLeft : revealRight}>
            <GlassPanel tilt padded style={{ padding: 'var(--space-7)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: 'var(--gb-gold)', lineHeight: 1, opacity: 0.5, marginBottom: 'var(--space-3)' }}>"</div>
                {t.quote ? (
                  <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.1rem', lineHeight: 1.65, color: 'var(--gb-bone)' }}>
                    {t.quote}
                  </p>
                ) : (
                  <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.5, color: 'var(--gb-stone)', opacity: 0.6 }}>
                    A client story from {t.project} will live here.
                  </p>
                )}
              </div>
              <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-hairline)' }}>
                <div style={{ fontSize: 'var(--type-small)', color: 'var(--gb-bone)', fontWeight: 500 }}>{t.name || '— Awaiting quote —'}</div>
                <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gb-gold)', marginTop: 2 }}>
                  {[t.role, t.project].filter(Boolean).join(' · ')}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
