import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button.jsx';
import { CALENDLY_URL, CONTACT_EMAIL } from '../config.js';
import { revealUp, staggerParent, staggerChild, inViewProps } from '../motion.js';

export function Contact() {
  return (
    <div style={{
      background: 'var(--gb-ink)', color: 'var(--gb-bone)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: 'var(--space-11) var(--pad-gutter)',
      backgroundImage: 'var(--ambient-warm)',
    }}>
      <motion.div {...inViewProps} variants={staggerParent}>
        <motion.h1 variants={staggerChild} style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'var(--type-hero)', lineHeight: 1.05, letterSpacing: 'var(--tracking-tight)',
          maxWidth: '18ch',
        }}>
          Let's build something worth <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>remembering.</em>
        </motion.h1>
        <motion.p variants={staggerChild} style={{
          margin: 'var(--space-6) 0 0', maxWidth: '42ch',
          fontSize: 'var(--type-lead)', fontWeight: 300,
          lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)',
        }}>
          No pressure. No obligation. Just a conversation about where your business is today, and where it could go.
        </motion.p>
        <motion.div variants={staggerChild} style={{ marginTop: 'var(--space-8)' }}>
          <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Complimentary Discovery Call</Button>
        </motion.div>
        <motion.p variants={staggerChild} style={{ marginTop: 'var(--space-8)', fontSize: 'var(--type-small)', color: 'var(--gb-stone)' }}>
          Prefer email? <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--gb-gold)' }}>{CONTACT_EMAIL}</a>
        </motion.p>
      </motion.div>
    </div>
  );
}
