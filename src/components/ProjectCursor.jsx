import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * ProjectCursor — a custom cursor scoped to whichever project world is
 * currently mounted, replacing the system cursor with something specific
 * to that world's character:
 *   - tnt:   a small precise crosshair — engineered, exact
 *   - grow:  a soft, slow-following circle — organic, calm
 *   - bloom: a warm, softly blurred dot — unhurried, ceramic
 * Skipped on touch devices (no cursor to replace) and desktop-only.
 */
export function ProjectCursor({ variant, accent }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = variant === 'grow'
    ? { damping: 20, stiffness: 120 }
    : variant === 'bloom'
      ? { damping: 26, stiffness: 70 }
      : { damping: 40, stiffness: 500 }; // tnt — precise, near-instant
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);
  const [visible, setVisible] = React.useState(false);
  const [isTouch] = React.useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);

  React.useEffect(() => {
    if (isTouch) return;
    function onMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isTouch, visible, x, y]);

  if (isTouch) return null;

  const size = variant === 'tnt' ? 18 : variant === 'grow' ? 26 : 34;

  return (
    <>
      <style>{`.gb-project-cursor-active { cursor: none !important; } .gb-project-cursor-active * { cursor: none !important; }`}</style>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, x: sx, y: sy,
          width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
          pointerEvents: 'none', zIndex: 9999, opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        {variant === 'tnt' && (
          <svg width={size} height={size} viewBox="0 0 18 18">
            <line x1="9" y1="0" x2="9" y2="6" stroke={accent} strokeWidth="1.2" />
            <line x1="9" y1="12" x2="9" y2="18" stroke={accent} strokeWidth="1.2" />
            <line x1="0" y1="9" x2="6" y2="9" stroke={accent} strokeWidth="1.2" />
            <line x1="12" y1="9" x2="18" y2="9" stroke={accent} strokeWidth="1.2" />
          </svg>
        )}
        {variant === 'grow' && (
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: `1px solid ${accent}`, background: `${accent}22` }} />
        )}
        {variant === 'bloom' && (
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: accent, opacity: 0.4, filter: 'blur(6px)' }} />
        )}
      </motion.div>
    </>
  );
}
