import React from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from './Eyebrow.jsx';

/**
 * Statement — architectural editorial heading. An eyebrow, a large serif
 * statement (with optional italic gold emphasis via <em>), and a quiet
 * supporting line. White space is part of the composition.
 */
export function Statement({
  eyebrow,
  children,
  support,
  align = 'left',
  size = 'display',
  level = 'h2',
  style = {},
  ...rest
}) {
  const sizes = {
    mega: 'var(--type-mega)',
    hero: 'var(--type-hero)',
    display: 'var(--type-display)',
    title: 'var(--type-title)',
  };

  const wrap = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-5)',
    alignItems: align === 'center' ? 'center' : 'flex-start',
    textAlign: align,
    ...style,
  };

  const heading = {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-normal)',
    fontSize: sizes[size] || sizes.display,
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-tight)',
    color: 'var(--text-primary)',
    textWrap: 'balance',
    // ch here is computed against THIS element's own (large) font-size,
    // so the measure actually matches the rendered text size.
    maxWidth: align === 'center' ? '11ch' : '10ch',
  };

  const supp = {
    margin: 0,
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-lead)',
    fontWeight: 'var(--weight-light)',
    lineHeight: 'var(--leading-relaxed)',
    color: 'var(--text-secondary)',
    maxWidth: 'var(--measure-lead)',
  };

  const HeadingTag = motion[level] || motion.h2;

  return (
    <div style={wrap} {...rest}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <HeadingTag
        style={heading}
        whileHover={{ letterSpacing: '-0.008em' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </HeadingTag>
      {support && <p style={supp}>{support}</p>}
    </div>
  );
}
