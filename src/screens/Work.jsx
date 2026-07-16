import React from 'react';
import { motion } from 'framer-motion';
import { Statement } from '../components/Statement.jsx';
import { Eyebrow } from '../components/Eyebrow.jsx';
import { Button } from '../components/Button.jsx';
import { WorkCard } from '../components/WorkCard.jsx';
import { Testimonials } from '../components/Testimonials.jsx';
import { PROJECTS, CALENDLY_URL } from '../config.js';
import { revealUp, staggerParent, inViewProps } from '../motion.js';

// Alternating rotation direction per card index — echoes the diagnosis
// cards on the homepage, so the grid feels like glass pieces settling
// into place from slightly different angles, not one flat stagger.
const cardVariant = (i) => ({
  hidden: { opacity: 0, y: 40, scale: 0.94, rotate: i % 2 === 0 ? -2 : 2 },
  show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 } },
});

export function Work({ onEnterProject }) {
  return (
    <div style={{ background: 'var(--gb-ink)', color: 'var(--gb-bone)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--space-11) var(--pad-gutter) var(--space-9)' }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Selected Work</Eyebrow>
          <Statement size="hero" level="h1">Don't tell people<br />you're good.<br /><em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>Show them.</em></Statement>
        </motion.div>
      </section>

      <section style={{ padding: '0 var(--pad-gutter) var(--space-11)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10%' }}
              variants={cardVariant(i)}
            >
              <WorkCard
                index={String(i + 1).padStart(2, '0')}
                title={p.title}
                world={p.id}
                image={p.thumbnailImage || p.heroImage}
                meta={p.summary}
                onClick={() => onEnterProject(p.id)}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                style={{ marginTop: 'var(--space-4)', fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gb-stone)' }}
              >
                {p.category}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full testimonial collection — the dedicated, easy-to-find place
          for client voices, right after seeing the actual work. */}
      <Testimonials />

      <section style={{
        padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center',
        borderTop: '1px solid var(--border-hairline)', backgroundImage: 'var(--ambient-warm)',
      }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-stone)' }}>
            Inspired by what you've seen?
          </p>
          <p style={{ margin: '8px 0 var(--space-7)', fontFamily: 'var(--font-display)', fontSize: 'var(--type-hero)', fontWeight: 300, color: 'var(--gb-bone)' }}>
            Let's talk about what your business could <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>become.</em>
          </p>
          <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Start Your Project</Button>
        </motion.div>
      </section>
    </div>
  );
}
