import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button — Genesis Becoming
 * Precise, restrained, never playful. Gold-filled primary, hairline
 * ghost, and a text link that reveals a trailing rule on hover.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const sizes = {
    sm: { padding: '10px 20px', font: '12px', tracking: '0.14em' },
    md: { padding: '14px 28px', font: '13px', tracking: '0.16em' },
    lg: { padding: '18px 36px', font: '14px', tracking: '0.18em' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-sans)',
    fontSize: s.font,
    fontWeight: 500,
    letterSpacing: s.tracking,
    textTransform: 'uppercase',
    padding: s.padding,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    textDecoration: 'none',
    border: '1px solid transparent',
    transition: 'background var(--dur-base) var(--ease-glide), color var(--dur-base) var(--ease-glide), border-color var(--dur-base) var(--ease-glide)',
    WebkitFontSmoothing: 'antialiased',
  };

  const variants = {
    primary: {
      background: hover ? 'var(--gb-gold-soft)' : 'var(--gb-gold)',
      color: 'var(--gb-ink)',
      boxShadow: hover ? 'var(--glow-gold)' : 'var(--shadow-sm)',
    },
    ghost: {
      background: hover ? 'color-mix(in oklch, var(--gb-bone) 8%, transparent)' : 'transparent',
      color: 'var(--gb-bone)',
      borderColor: hover ? 'var(--border-gold)' : 'var(--border-hairline)',
    },
    link: {
      background: 'transparent',
      color: hover ? 'var(--gb-gold)' : 'var(--gb-bone)',
      padding: '4px 0',
      borderRadius: 0,
      letterSpacing: '0.2em',
    },
  };

  const st = { ...base, ...(variants[variant] || variants.primary), ...style };

  const arrow =
    variant === 'link' ? (
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          transition: 'transform var(--dur-base) var(--ease-cinematic)',
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
        }}
      >
        →
      </span>
    ) : null;

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onClick: disabled ? undefined : onClick,
  };

  const content = (
    <>
      {children}
      {arrow}
    </>
  );

  // Compress-then-expand — a small, tactile "squish" before settling.
  // Nothing dramatic, everything intentional.
  const tactile = {
    whileHover: { scale: [1, 0.96, 1.035, 1] },
    whileTap: { scale: 0.96 },
    transition: { duration: 0.42, times: [0, 0.25, 0.6, 1], ease: 'easeOut' },
  };

  if (href && !disabled) {
    return (
      <motion.a href={href} style={st} {...tactile} {...handlers} {...rest}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" style={st} disabled={disabled} {...tactile} {...handlers} {...rest}>
      {content}
    </motion.button>
  );
}
