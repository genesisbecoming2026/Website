import React from 'react';
import { motion } from 'framer-motion';
import { Statement } from './Statement.jsx';
import { FAQ } from '../config.js';
import { revealUp, staggerParent, staggerChild, inViewProps } from '../motion.js';

/**
 * FAQSection — real question/answer pairs, expandable on click. Valuable
 * for two audiences at once: visitors scanning for a quick answer, and
 * AI answer engines / search featured snippets, which favor content
 * already structured as clear Q&A. Paired with FAQPage structured data
 * (added dynamically in seo.js) rather than duplicated here.
 */
function FAQItem({ item }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div variants={staggerChild} style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: 'var(--space-5)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-5)',
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-title)', color: 'var(--gb-bone)' }}>{item.q}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: '1.4rem', color: 'var(--gb-gold)', lineHeight: 1, flexShrink: 0 }}
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
        <p style={{ margin: '14px 0 0', fontSize: 'var(--type-small)', lineHeight: 1.7, color: 'var(--gb-stone)', maxWidth: '58ch' }}>
          {item.a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section style={{ padding: 'var(--space-11) var(--pad-gutter)', borderTop: '1px solid var(--border-hairline)' }}>
      <motion.div {...inViewProps} variants={revealUp} style={{ marginBottom: 'var(--space-8)' }}>
        <Statement eyebrow="Questions" size="display">Frequently asked.</Statement>
      </motion.div>
      <motion.div {...inViewProps} variants={staggerParent} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '760px' }}>
        {FAQ.map((item, i) => (
          <FAQItem key={i} item={item} />
        ))}
      </motion.div>
    </section>
  );
}
