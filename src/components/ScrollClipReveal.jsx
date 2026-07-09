import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollClipReveal — TNT's equivalent of ScrollBloom/ScrollSteamReveal.
 * A hard-edged clip-path wipe tied directly to scroll position through
 * the section, instead of a fixed-duration animation that plays once on
 * entering view. This is what makes TNT's hero feel alive; applying the
 * same mechanic here brings the rest of the documentary to the same
 * standard.
 */
export function ScrollClipReveal({ children, style }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] });
  const clipPath = useTransform(scrollYProgress, (p) => `inset(0 0 ${Math.max(0, 1 - p) * 100}% 0)`);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <motion.div ref={ref} style={{ clipPath, opacity, ...style }}>
      {children}
    </motion.div>
  );
}
