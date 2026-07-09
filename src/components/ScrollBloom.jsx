import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollBloom — Grow's equivalent of TNT's scroll-scrubbed clip-path cut.
 * Instead of a fixed-duration animation that plays once when the section
 * enters view, this ties a soft circular "bloom" reveal directly to how
 * far the visitor has scrolled through the section — the same mechanic
 * that makes TNT's hero feel alive, applied organically here.
 */
export function ScrollBloom({ children, origin = '0% 30%', style }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  const clipPath = useTransform(scrollYProgress, (p) => `circle(${Math.max(0, p) * 140}% at ${origin})`);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 1]);

  return (
    <motion.div ref={ref} style={{ clipPath, opacity, ...style }}>
      {children}
    </motion.div>
  );
}
