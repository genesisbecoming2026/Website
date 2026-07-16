import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button.jsx';
import { GlassPanel } from './GlassPanel.jsx';
import { TESTIMONIALS, CALENDLY_URL } from '../config.js';
import { revealUp, revealLeft, revealRight, inViewProps } from '../motion.js';

// A short, real excerpt — not a fabricated pull-quote — pulled verbatim
// from the full testimonial in config.js. Featuring the entire multi-
// paragraph quote here read as broken (dense italic type, no visual
// hierarchy); the full text still lives on the Work page.
const EXCERPTS = {
  'TNT Builders': 'It finally feels like our brand matches the quality of the work we’ve been doing for years.',
  'Grow': 'I felt genuinely seen and understood — the result is a brand and website that feel completely aligned with my vision.',
  'Slow Bloom': 'I wasn’t just confident in how Slow Bloom looked — I was confident in how it would be experienced.',
};

/**
 * TestimonialHighlight — one meaningful quote near the top of the
 * homepage, right after the Identity System's big moment, paired with
 * a CTA. Catches the momentum ("and real people feel this way") without
 * interrupting the centerpiece itself. The other two are one click away
 * (never hidden without a visible, on-brand affordance to reveal them) —
 * the full collection with complete quotes still lives on the Work page.
 */
export function TestimonialHighlight() {
  const [expanded, setExpanded] = React.useState(false);
  const real = TESTIMONIALS.filter((t) => t.quote && t.quote.trim());
  const featured = real[0] || TESTIMONIALS[0];
  const rest = real.slice(1);
  const hasReal = Boolean(featured.quote && featured.quote.trim());
  const excerpt = EXCERPTS[featured.project] || featured.quote;

  return (
    <section style={{ padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center', borderTop: '1px solid var(--border-hairline)' }}>
      <motion.div {...inViewProps} variants={revealUp} style={{ maxWidth: '680px', margin: '0 auto' }}>
        {hasReal ? (
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--type-title)', lineHeight: 1.45, color: 'var(--gb-bone)' }}>
            <span aria-hidden="true" style={{ color: 'var(--gb-gold)' }}>“</span>
            {excerpt}
            <span aria-hidden="true" style={{ color: 'var(--gb-gold)' }}>”</span>
          </p>
        ) : (
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'var(--type-title)', lineHeight: 1.4, color: 'var(--gb-stone)', opacity: 0.7 }}>
            A real client story will anchor this moment.
          </p>
        )}
        <div style={{ marginTop: 'var(--space-5)', fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gb-gold)' }}>
          {[featured.name, featured.project].filter(Boolean).join(' · ') || 'Awaiting quote'}
        </div>

        {rest.length > 0 && (
          <div style={{ marginTop: 'var(--space-6)' }}>
            <Button variant="link" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              {expanded ? 'Hide the rest' : 'Read more Stories'}
            </Button>
          </div>
        )}

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{
            marginTop: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-6)', textAlign: 'left',
          }}>
            {rest.map((t, i) => (
              <motion.div key={t.project} variants={i % 2 === 0 ? revealLeft : revealRight} initial="hidden" animate={expanded ? 'show' : 'hidden'}>
                <GlassPanel tilt padded style={{ padding: 'var(--space-6)', height: '100%' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--gb-bone)' }}>
                    “{EXCERPTS[t.project] || t.quote}”
                  </p>
                  <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-hairline)' }}>
                    <div style={{ fontSize: 'var(--type-small)', color: 'var(--gb-bone)', fontWeight: 500 }}>{t.name}</div>
                    <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gb-gold)', marginTop: 2 }}>
                      {[t.role, t.project].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div style={{ marginTop: 'var(--space-8)' }}>
          <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Book a Complimentary Discovery Call
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
