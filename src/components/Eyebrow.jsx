import React from 'react';

/**
 * Eyebrow — tracked micro-caps label. Sits above headlines to name a
 * section without competing with it. The quiet supporting voice.
 */
export function Eyebrow({ children, color = 'gold', as = 'div', style = {}, ...rest }) {
  const Tag = as;
  const colors = {
    gold: 'var(--gb-gold)',
    stone: 'var(--gb-stone)',
    bone: 'var(--gb-bone)',
  };
  const st = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-label)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    color: colors[color] || colors.gold,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    ...style,
  };
  return (
    <Tag style={st} {...rest}>
      {children}
    </Tag>
  );
}
