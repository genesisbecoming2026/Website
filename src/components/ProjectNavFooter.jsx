import React from 'react';
import { motion } from 'framer-motion';
import { CALENDLY_URL, getAdjacentProjects } from '../config.js';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

/**
 * ProjectNavFooter — appears at the end of every project documentary.
 * Gives a persistent way back to Work, to the previous/next project, and
 * to booking a call, so no one ever feels stuck inside a case study.
 * Each nav card lifts and its arrow glides on hover, and the whole block
 * reveals on scroll rather than sitting there statically.
 */
export function ProjectNavFooter({ currentId, onNavigate, onNavigateProject, accent = 'var(--gb-gold)' }) {
  const { prev, next } = getAdjacentProjects(currentId);
  const [hover, setHover] = React.useState(null);

  const label = {
    fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase', color: accent, display: 'flex', alignItems: 'center', gap: 6,
  };
  const title = {
    fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gb-bone)',
  };

  function navCard(key, align, borderSide, content) {
    return (
      <motion.div
        variants={cardVariants}
        onMouseEnter={() => setHover(key)}
        onMouseLeave={() => setHover(null)}
        animate={{ y: hover === key ? -4 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={content.onClick}
        style={{
          display: 'flex', flexDirection: 'column', gap: 6, cursor: 'pointer',
          padding: 'var(--space-6)', alignItems: align,
          textAlign: align === 'center' ? 'center' : align === 'flex-end' ? 'right' : 'left',
          borderRight: borderSide === 'right' ? '1px solid var(--border-hairline)' : 'none',
        }}
      >
        <span style={{ ...label, justifyContent: align }}>{content.eyebrow}</span>
        <span style={title}>{content.title}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={staggerParent}
      style={{ borderTop: '1px solid var(--border-hairline)', background: 'rgba(0,0,0,0.25)' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', maxWidth: '1100px', margin: '0 auto' }}>
        {navCard('prev', 'flex-start', 'right', { eyebrow: <>← Previous Project</>, title: prev.title, onClick: () => onNavigateProject(prev.id) })}
        {navCard('back', 'center', 'right', { eyebrow: <>Back to Work</>, title: 'All Projects', onClick: () => onNavigate('work') })}
        {navCard('next', 'flex-end', 'none', { eyebrow: <>Next Project →</>, title: next.title, onClick: () => onNavigateProject(next.id) })}
      </div>

      <motion.div variants={cardVariants} style={{ textAlign: 'center', padding: 'var(--space-8) var(--pad-gutter)', borderTop: '1px solid var(--border-hairline)' }}>
        <p style={{ margin: '0 0 var(--space-5)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--type-title)', color: 'var(--gb-stone)' }}>
          What could this look like for your business?
        </p>
        <motion.a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHover('cta')}
          onMouseLeave={() => setHover(null)}
          animate={{ scale: hover === 'cta' ? 1.03 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: accent, color: '#1a140d', borderRadius: 'var(--radius-pill)',
            padding: '16px 32px', fontFamily: 'var(--font-sans)', fontWeight: 500,
            fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
          }}
        >
          Book a Complimentary Discovery Call
        </motion.a>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <span onClick={() => onNavigate('home')} style={{
            fontSize: 'var(--type-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
            color: 'var(--gb-stone)', cursor: 'pointer', textDecoration: 'underline',
          }}>
            ← Return Home
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
