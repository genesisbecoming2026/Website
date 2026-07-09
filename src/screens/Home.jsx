import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button.jsx';
import { Eyebrow } from '../components/Eyebrow.jsx';
import { Statement } from '../components/Statement.jsx';
import { GlassPanel } from '../components/GlassPanel.jsx';
import { WorkCard } from '../components/WorkCard.jsx';
import { UnfoldIntro } from '../components/UnfoldIntro.jsx';
import { IdentitySystemReveal } from '../components/IdentitySystemReveal.jsx';
import { CALENDLY_URL, PROJECTS, SERVICES } from '../config.js';
import { revealLeft, revealRight, revealUp, staggerParent, staggerChild, inViewProps } from '../motion.js';

const LOGO = '/logo-signature.png';

function Section({ children, style, id }) {
  return (
    <section id={id} style={{ padding: 'var(--space-11) var(--pad-gutter)', position: 'relative', ...style }}>
      {children}
    </section>
  );
}

export function Home({ onEnterProject, onNavigate }) {
  return (
    <div style={{ background: 'var(--gb-ink)', color: 'var(--gb-bone)', minHeight: '100%' }}>
      {/* Sections 1+2 combined — the hero dissolves into the diagnosis
          as one continuous, pinned scroll-driven transformation.
          Negative margin pulls it up flush behind the floating nav. */}
      <div id="understanding" style={{ marginTop: '-92px' }}>
        <UnfoldIntro onEnterProject={onEnterProject} firstProjectId={PROJECTS[0].id} />
      </div>

      {/* The homepage's signature scroll moment. */}
      <IdentitySystemReveal />
      {/* Section 3 — The Solution */}
      <Section id="philosophy" style={{
        backgroundImage:
          'radial-gradient(60% 90% at 15% 20%, color-mix(in oklch,var(--gb-clay) 30%,transparent), transparent 60%),' +
          'radial-gradient(70% 90% at 90% 90%, color-mix(in oklch,var(--gb-gold) 26%,transparent), transparent 62%)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-9)', alignItems: 'center', maxWidth: 'var(--width-content)', margin: '0 auto' }}>
          <motion.div {...inViewProps} variants={revealLeft}>
            <Statement eyebrow="The solution" size="hero"
              support="Genesis Becoming builds identities that communicate trust before a single conversation begins — brand systems, websites, and experiences that make what you've already built impossible to overlook.">
              Don't tell people<br />you're good.<br /><em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>Show them.</em>
            </Statement>
          </motion.div>
          <motion.div {...inViewProps} variants={revealRight}>
            <GlassPanel tilt padded style={{ padding: 'var(--space-8)' }}>
              <Eyebrow>The role</Eyebrow>
              <p style={{ margin: '16px 0 0', fontFamily: 'var(--font-display)', fontSize: '1.9rem', lineHeight: 1.15, color: 'var(--gb-bone)' }}>
                You are the hero.<br />We are the <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>guide.</em>
              </p>
              <p style={{ margin: '18px 0 0', fontSize: 'var(--type-small)', lineHeight: 1.6, color: 'var(--gb-stone)' }}>
                Every business, church, and organization already carries something worth trusting. Our work is to make it visible — and impossible to miss.
              </p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-6)',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--type-label)',
                letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
                color: 'var(--gb-gold)', textDecoration: 'none',
              }}>
                See if we're a fit <span aria-hidden="true">→</span>
              </a>
            </GlassPanel>
          </motion.div>
        </div>
      </Section>

      {/* Section 4 — Proof */}
      <Section id="work" style={{ borderTop: '1px solid var(--border-hairline)' }}>
        <motion.div {...inViewProps} variants={revealUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)' }}>
          <Statement eyebrow="Proof" size="display">Not beautiful pictures.<br />Evidence of <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>transformation.</em></Statement>
          <Button variant="link" onClick={() => onNavigate('work')}>View all work</Button>
        </motion.div>
        <motion.div
          {...inViewProps}
          variants={staggerParent}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}
        >
          {PROJECTS.map((p) => (
            <motion.div key={p.id} variants={staggerChild}>
              <WorkCard index={p.id === 'tnt' ? '03' : p.id === 'bloom' ? '02' : '01'} title={p.title} world={p.id} image={p.heroImage} meta={p.summary} onClick={() => onEnterProject(p.id)} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div {...inViewProps} variants={revealUp} style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
          <p style={{ margin: '0 0 var(--space-5)', fontFamily: 'var(--font-display)', fontSize: 'var(--type-title)', fontStyle: 'italic', color: 'var(--gb-stone)' }}>
            Inspired by what you've seen?
          </p>
          <Button variant="primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Start Your Project</Button>
        </motion.div>
      </Section>

      {/* Section 5 — Services preview, outcome-oriented not feature-oriented */}
      <Section id="services-preview" style={{ borderTop: '1px solid var(--border-hairline)' }}>
        <motion.div {...inViewProps} variants={revealUp} style={{ marginBottom: 'var(--space-8)' }}>
          <Statement eyebrow="How can we help?" size="display">Clarify your identity.<br />Build your website.<br />Launch your brand.<br />Support your <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>growth.</em></Statement>
        </motion.div>
        <motion.div {...inViewProps} variants={staggerParent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={staggerChild}>
              <GlassPanel padded tilt style={{ padding: 'var(--space-6)', height: '100%' }}>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gb-bone)', fontWeight: 400 }}>{s.title}</h4>
                <p style={{ margin: '12px 0 0', fontSize: 'var(--type-small)', lineHeight: 1.6, color: 'var(--gb-stone)' }}>{s.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
        <motion.div {...inViewProps} variants={revealUp} style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
          <Button variant="link" onClick={() => onNavigate('services')}>See how each service works →</Button>
        </motion.div>
      </Section>

      {/* Section 6 — Invitation */}
      <Section id="contact" style={{
        borderTop: '1px solid var(--border-hairline)',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        backgroundImage: 'var(--ambient-warm)',
        paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)',
      }}>
        <motion.img {...inViewProps} variants={revealUp} src={LOGO} alt="Genesis Becoming" style={{ height: 64, marginBottom: 'var(--space-7)', opacity: 0.95 }} />
        <motion.div {...inViewProps} variants={staggerParent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.p variants={staggerChild} style={{
            margin: '0 0 var(--space-6)', maxWidth: '32ch',
            fontSize: 'var(--type-small)', fontWeight: 400,
            letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
            lineHeight: 1.9, color: 'var(--gb-gold)',
          }}>
            Businesses don't struggle because they lack passion.<br />
            They struggle because people don't immediately<br />understand why they matter.
          </motion.p>
          <motion.h2 variants={staggerChild} style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'var(--type-hero)', lineHeight: 1.02, letterSpacing: 'var(--tracking-tight)',
            maxWidth: '20ch',
          }}>
            Let's build a brand people <em style={{ color: 'var(--gb-gold)', fontStyle: 'italic' }}>remember.</em>
          </motion.h2>
          <motion.p variants={staggerChild} style={{
            margin: 'var(--space-6) 0 0', maxWidth: '42ch',
            fontSize: 'var(--type-lead)', fontWeight: 300,
            lineHeight: 'var(--leading-relaxed)', color: 'var(--gb-stone)',
          }}>
            No pressure. No obligation. Just a conversation about where your business is today, and where it could go.
          </motion.p>
          <motion.div variants={staggerChild} style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)' }}>
            <Button variant="primary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Complimentary Discovery Call</Button>
            <Button variant="link" onClick={() => onNavigate('work')}>View Our Work</Button>
          </motion.div>
        </motion.div>

        {/* The quiet closing line, per the brief — no buttons, no forms, just one sentence, then one button. */}
        <motion.div {...inViewProps} variants={revealUp} style={{ marginTop: 'var(--space-11)' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-stone)' }}>
            Every business is becoming something.
          </p>
          <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontSize: 'var(--type-title)', color: 'var(--gb-bone)' }}>
            Let's shape what yours becomes.
          </p>
        </motion.div>

        <div style={{
          marginTop: 'var(--space-10)', display: 'flex', gap: 'var(--space-6)',
          fontSize: 'var(--type-micro)', letterSpacing: 'var(--tracking-wide)',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>
          <span>Genesis Becoming</span><span>·</span><span>Columbia, Tennessee</span><span>·</span><span>© 2026</span>
        </div>
      </Section>
    </div>
  );
}
