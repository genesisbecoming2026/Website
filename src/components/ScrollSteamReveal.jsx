import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollSteamReveal — Slow Bloom's equivalent of TNT's scroll-scrubbed
 * clip-path cut. Content comes into focus (blur clears, opacity rises,
 * a gentle upward settle) directly as a function of scroll position
 * through the section, like steam clearing off a window as you lean in
 * — not a fixed-duration fade that plays once and then sits static
 * regardless of further scrolling.
 */
export function ScrollSteamReveal({ children, style }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.4'] });
  const blur = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const blurFilter = useTransform(blur, (v) => `blur(${Math.max(0, v)}px)`);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div ref={ref} style={{ filter: blurFilter, opacity, y, ...style }}>
      {children}
    </motion.div>
  );
}
