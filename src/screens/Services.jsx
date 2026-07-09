import React from 'react';
import { motion } from 'framer-motion';
import { Statement } from '../components/Statement.jsx';
import { Eyebrow } from '../components/Eyebrow.jsx';
import { Button } from '../components/Button.jsx';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { CALENDLY_URL, CONTACT_EMAIL, SERVICES } from '../config.js';
import { revealLeft, revealRight, revealUp, inViewProps } from '../motion.js';

export function Services() {
  return (
    <div style={{ background: 'var(--gb-ink)', color: 'var(--gb-bone)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--space-11) var(--pad-gutter) var(--space-9)' }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Services</Eyebrow>
          <Statement size="hero">How can we<br /><em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>help?</em></Statement>
        </motion.div>
      </section>

      <section style={{ padding: '0 var(--pad-gutter) var(--space-11)', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        {SERVICES.map((s, i) => (
          <motion.div key={s.title} {...inViewProps} variants={i % 2 === 0 ? revealLeft : revealRight}>
            <GlassPanel padded tilt style={{ padding: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-7)', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1rem', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--gb-gold)', marginBottom: 10, fontWeight: 600 }}>
                  {s.label}
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--type-display)', fontWeight: 400, color: 'var(--gb-bone)' }}>{s.title}</h3>
                <p style={{ margin: '14px 0 0', fontSize: 'var(--type-small)', lineHeight: 1.6, color: 'var(--gb-stone)' }}>{s.description}</p>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-hairline)', paddingLeft: 'var(--space-6)' }}>
                <div style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gb-stone)', marginBottom: 8 }}>
                  What it gets you
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--gb-bone)', lineHeight: 1.35 }}>{s.outcome}</p>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </section>

      <section style={{
        padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center',
        borderTop: '1px solid var(--border-hairline)', backgroundImage: 'var(--ambient-warm)',
      }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-stone)' }}>
            Someone now understands what you do. Now what?
          </p>
          <p style={{ margin: '8px 0 var(--space-7)', fontFamily: 'var(--font-display)', fontSize: 'var(--type-hero)', fontWeight: 300, color: 'var(--gb-bone)' }}>
            Not sure which<br />service <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>fits?</em>
          </p>
          <p style={{ margin: '0 auto var(--space-7)', maxWidth: '48ch', color: 'var(--gb-stone)', fontSize: 'var(--type-small)', lineHeight: 1.6 }}>
            Every project begins with a conversation. We'll talk through your goals and recommend the best path forward.
          </p>
          <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Complimentary Discovery Call</Button>

          <div style={{ marginTop: 'var(--space-9)', maxWidth: '48ch', marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ margin: '0 0 var(--space-4)', fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gb-bone)', fontStyle: 'italic' }}>
              Still thinking it over?
            </p>
            <p style={{ margin: 0, color: 'var(--gb-stone)', fontSize: 'var(--type-small)', lineHeight: 1.7 }}>
              Not every project starts with a meeting. If you'd rather introduce yourself first, send an email — tell me about your business, where you're stuck, or simply what you're hoping to build. I'll personally respond and help you figure out the best next step.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-5)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--type-label)',
              letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
              color: 'var(--gb-gold)', textDecoration: 'none',
            }}>
              ✉️ {CONTACT_EMAIL}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
