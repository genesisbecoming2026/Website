import React from 'react';

/**
 * useIsMobile — tracks whether the viewport is at or below a breakpoint.
 * Used to switch the nav (and anything else that needs it) into a
 * compact mobile layout instead of relying on CSS alone, since our
 * component styles are inline objects rather than a stylesheet with
 * media queries.
 */
export function useIsMobile(breakpoint = 860) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );

  React.useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}
