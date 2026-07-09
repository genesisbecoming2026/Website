// Shared scroll-reveal motion language, used across Home and all new
// pages so the whole site reads as one consistent system.

export const revealLeft = {
  hidden: { opacity: 0, y: 70, scale: 0.94, rotate: -2 },
  show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
export const revealRight = {
  hidden: { opacity: 0, y: 70, scale: 0.94, rotate: 2 },
  show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
export const revealUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};
export const staggerChild = {
  hidden: { opacity: 0, y: 28, scale: 0.96, rotate: -1 },
  show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export const inViewProps = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-15%' } };
