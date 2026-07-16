import React from 'react';
import { motion } from 'framer-motion';
import { Statement } from '../components/Statement.jsx';
import { Eyebrow } from '../components/Eyebrow.jsx';
import { Button } from '../components/Button.jsx';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { CALENDLY_URL } from '../config.js';
import { revealUp, revealLeft, revealRight, staggerParent, inViewProps } from '../motion.js';

const BELIEFS = [
  {
    title: 'We believe great design begins long before the logo.',
    body: 'The logo isn\u2019t the first decision. It\u2019s the result of understanding who your business is, who it serves, and what people should remember about it. When the strategy is clear, every design decision becomes easier.',
  },
  {
    title: 'Every business carries an identity worth realizing.',
    body: 'We don\u2019t invent identities. We uncover them. Through strategy, conversation, and thoughtful design, we help businesses express who they already are with greater clarity and confidence.',
  },
  {
    title: 'Beautiful brands are built on clear thinking.',
    body: 'We create logos. We build websites. We choose typography, colors, imagery, and motion. But none of those decisions happen in isolation \u2014 every element exists to communicate something true about your business.',
  },
  {
    title: 'Good design looks beautiful. Great design builds trust.',
    body: 'It helps people understand what you do, why it matters, and why they should choose you. That\u2019s the difference between decoration and direction.',
  },
  {
    title: 'Every detail should work together.',
    body: 'A brand isn\u2019t a logo. A website isn\u2019t a homepage. A business isn\u2019t a collection of assets. Every interaction should reinforce the same story \u2014 from the first impression to the final click.',
  },
];

export function Philosophy() {
  return (
    <div style={{ background: 'var(--gb-ink)', color: 'var(--gb-bone)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--space-11) var(--pad-gutter) var(--space-9)' }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>Our Approach</Eyebrow>
          <Statement size="hero" level="h1">Great design begins<br />long before the <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>logo.</em></Statement>
          <p style={{ marginTop: 'var(--space-7)', maxWidth: '58ch', fontSize: 'var(--type-lead)', fontWeight: 300, lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)' }}>
            Genesis Becoming is a creative studio specializing in brand identity, website design, and creative direction for businesses that want to communicate with greater clarity and confidence.
          </p>
        </motion.div>
      </section>

      <section style={{ padding: '0 var(--pad-gutter) var(--space-11)' }}>
        <motion.div {...inViewProps} variants={staggerParent} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '760px' }}>
          {BELIEFS.map((b, i) => (
            <motion.div key={i} variants={i % 2 === 0 ? revealLeft : revealRight}>
              <GlassPanel padded tilt style={{ padding: 'var(--space-7)' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--type-title)', lineHeight: 1.2, color: 'var(--gb-bone)' }}>{b.title}</p>
                <p style={{ margin: '14px 0 0', fontSize: 'var(--type-small)', lineHeight: 1.6, color: 'var(--gb-stone)' }}>{b.body}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section style={{
        padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center',
        borderTop: '1px solid var(--border-hairline)', backgroundImage: 'var(--ambient-warm)',
      }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-stone)' }}>
            Now you understand how we think.
          </p>
          <p style={{ margin: '8px 0 var(--space-7)', fontFamily: 'var(--font-display)', fontSize: 'var(--type-hero)', fontWeight: 300, color: 'var(--gb-bone)' }}>
            Great brands aren't built by accident.<br />Let's build yours <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>intentionally.</em>
          </p>
          <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Discovery Call</Button>
        </motion.div>
      </section>
    </div>
  );
}
