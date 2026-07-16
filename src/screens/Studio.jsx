import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Statement } from '../components/Statement.jsx';
import { Eyebrow } from '../components/Eyebrow.jsx';
import { Button } from '../components/Button.jsx';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { PhotoMoment } from '../components/PhotoMoment.jsx';
import { CALENDLY_URL, PROCESS } from '../config.js';
import { revealUp, revealLeft, revealRight, staggerParent, staggerChild, inViewProps } from '../motion.js';

const WHO_WE_SERVE = [
  'You care more about long-term trust than short-term attention.',
  'You\u2019re building something meaningful.',
  'You believe thoughtful details communicate value.',
  'You want strategy before aesthetics.',
  'You want your digital presence to reflect the quality of your work.',
];

/**
 * ProcessStep — progressive disclosure. The title is always visible;
 * clicking reveals a short explanation of what that step actually
 * involves. Rewards curiosity without overwhelming anyone who just
 * wants to keep scrolling.
 */
function ProcessStep({ index, step }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div variants={staggerChild} style={{ paddingLeft: 'var(--space-5)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'baseline', gap: 'var(--space-5)',
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          textAlign: 'left', width: '100%',
        }}
        aria-expanded={open}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-label)', color: 'var(--gb-gold)', letterSpacing: 'var(--tracking-wide)' }}>0{index + 1}</span>
        <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--type-title)', color: 'var(--gb-bone)', flex: 1 }}>{step.title}</p>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: '1.4rem', color: 'var(--gb-gold)', lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ margin: '10px 0 0 calc(1.2em + var(--space-5))', fontSize: 'var(--type-small)', lineHeight: 1.6, color: 'var(--gb-stone)', maxWidth: '52ch' }}>
          {step.detail}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Studio() {
  const processRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: processRef, offset: ['start 0.8', 'end 0.4'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div style={{ background: 'var(--gb-ink)', color: 'var(--gb-bone)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--space-11) var(--pad-gutter) var(--space-9)' }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <Eyebrow style={{ marginBottom: 'var(--space-6)' }}>The Studio</Eyebrow>
          <Statement size="hero" level="h1">A studio built<br />around <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>becoming.</em></Statement>
          <p style={{ marginTop: 'var(--space-7)', maxWidth: '56ch', fontSize: 'var(--type-lead)', fontWeight: 300, lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)' }}>
            Genesis Becoming is a brand identity and immersive design studio based in Columbia, Tennessee, serving the greater Nashville area. We exist because every business we've ever worked with already had something worth communicating — they just hadn't been shown how to say it yet.
          </p>
        </motion.div>
      </section>

      {/* Process */}
      <section style={{ padding: '0 var(--pad-gutter) var(--space-11)', borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-9)' }}>
        <motion.div {...inViewProps} variants={revealUp} style={{ marginBottom: 'var(--space-8)' }}>
          <Eyebrow>The Process</Eyebrow>
        </motion.div>
        <motion.div ref={processRef} {...inViewProps} variants={staggerParent} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: '640px', paddingLeft: 4 }}>
          <div style={{ position: 'absolute', left: -1, top: 6, bottom: 6, width: 1, background: 'var(--border-hairline)' }} />
          <motion.div style={{ position: 'absolute', left: -1, top: 6, width: 1, height: lineHeight, background: 'var(--gb-gold)' }} />
          {PROCESS.map((step, i) => (
            <ProcessStep key={i} index={i} step={step} />
          ))}
        </motion.div>
        <motion.p {...inViewProps} variants={revealUp} style={{ marginTop: 'var(--space-7)', maxWidth: '52ch', fontSize: 'var(--type-small)', color: 'var(--gb-stone)', fontStyle: 'italic' }}>
          Every step solves something. Nothing here exists just to look thorough.
        </motion.p>
      </section>

      {/* Who we serve */}
      <section style={{ padding: 'var(--space-11) var(--pad-gutter)', borderTop: '1px solid var(--border-hairline)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-9)', alignItems: 'start', maxWidth: 'var(--width-content)', margin: '0 auto' }}>
          <motion.div {...inViewProps} variants={revealLeft}>
            <Statement eyebrow="Who This Is For" size="display">
              People who believe<br />their work deserves<br />thoughtful <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>design.</em>
            </Statement>
            <p style={{ marginTop: 'var(--space-6)', maxWidth: '48ch', fontSize: 'var(--type-small)', lineHeight: 1.6, color: 'var(--gb-stone)' }}>
              Founders, businesses, ministries, churches, nonprofits, organizations, creative professionals, and teams — Genesis Becoming works across all of them, because what unites our best clients was never the industry. It's a shared belief that meaningful work deserves to be represented with clarity and intention.
            </p>
          </motion.div>
          <motion.div {...inViewProps} variants={revealRight}>
            <GlassPanel padded tilt style={{ padding: 'var(--space-7)' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {WHO_WE_SERVE.map((w) => (
                  <li key={w} style={{ display: 'flex', gap: 12, fontSize: 'var(--type-small)', color: 'var(--gb-bone)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--gb-gold)' }}>—</span>{w}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </motion.div>
        </div>

        <PhotoMoment
          src="/images/studio/studio-hands-sketching-tablet-desk.jpg"
          alt="Hand sketching with a stylus on a tablet beside an open laptop, warm window light across the desk"
          aspectRatio="21 / 9"
          style={{ marginTop: 'var(--space-9)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxWidth: 'var(--width-content)', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-bone)', lineHeight: 1.35 }}>
            Every identity is shaped by hand — <em style={{ color: 'var(--gb-gold)' }}>one deliberate mark at a time.</em>
          </p>
        </PhotoMoment>
      </section>

      <section style={{
        padding: 'var(--space-11) var(--pad-gutter)', textAlign: 'center',
        borderTop: '1px solid var(--border-hairline)', backgroundImage: 'var(--ambient-warm)',
      }}>
        <motion.div {...inViewProps} variants={revealUp}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-stone)' }}>
            They trust you. Don't ask for a sale. Invite a conversation.
          </p>
          <p style={{ margin: '8px 0 var(--space-7)', fontFamily: 'var(--font-display)', fontSize: 'var(--type-hero)', fontWeight: 300, color: 'var(--gb-bone)' }}>
            Every business has an identity worth realizing.<br />Let's discover <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>yours.</em>
          </p>
          <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Complimentary Discovery Call</Button>
        </motion.div>
      </section>
    </div>
  );
}
