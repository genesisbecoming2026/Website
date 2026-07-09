import React from 'react';

/**
 * usePrefersReducedMotion — tracks the user's OS-level motion preference.
 * Used to gate continuous, infinitely-looping ambient animations (the
 * breathing glows, steam wisps, café light) that would otherwise run
 * forever regardless of this setting. Scroll-scrubbed reveals are left
 * alone — those are tied to a deliberate user action (scrolling), not
 * autoplaying, so they're lower-risk for motion sensitivity.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    function onChange() { setReduced(mq.matches); }
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
