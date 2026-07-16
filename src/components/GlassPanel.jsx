import React from 'react';

/**
 * GlassPanel — the studio's signature surface. Refined for realism:
 * a translucent base layer, a directional top-edge highlight (light
 * catching the glass edge), a specular sweep that shifts with cursor
 * position (simulating reflection/refraction as the viewing angle
 * changes), and a multi-layer shadow for genuine physical depth rather
 * than a single flat drop shadow. Optionally tilts subtly toward the
 * cursor (perspective, never spin).
 */
export function GlassPanel({
  children,
  tone = 'dark',
  blur = 'base',
  tilt = false,
  padded = true,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0, px: 0.5, py: 0.5 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: tilt ? -(py - 0.5) * 5 : 0,
      ry: tilt ? (px - 0.5) * 5 : 0,
      px, py,
    });
  };
  const reset = () => setT({ rx: 0, ry: 0, px: 0.5, py: 0.5 });

  const fill = tone === 'light' ? 'var(--glass-fill-light)' : 'var(--glass-fill-dark)';
  const blurVal = blur === 'strong' ? 'var(--glass-blur-strong)' : 'var(--glass-blur)';

  const st = {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    background: fill,
    backdropFilter: `${blurVal} saturate(140%)`,
    WebkitBackdropFilter: `${blurVal} saturate(140%)`,
    border: '1px solid var(--border-hairline)',
    borderTop: '1px solid rgba(245,242,234,0.28)', // brighter top edge — light catching the rim
    boxShadow: [
      'inset 0 1px 0 0 rgba(245,242,234,0.14)', // inner top highlight
      'var(--shadow-md)',                        // near, tight shadow
      '0 32px 64px -24px rgba(0,0,0,0.45)',       // far, soft shadow — real elevation
    ].join(', '),
    padding: padded ? 'var(--pad-card)' : 0,
    overflow: 'hidden',
    transformStyle: 'preserve-3d',
    transform: tilt
      ? `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`
      : 'none',
    transition: 'transform var(--dur-slow) var(--ease-cinematic), box-shadow var(--dur-base) var(--ease-glide)',
    WebkitFontSmoothing: 'antialiased',
    ...style,
  };

  return (
    <div ref={ref} style={st} onMouseMove={onMove} onMouseLeave={reset} {...rest}>
      {/* Specular sweep — a soft highlight that follows the cursor,
          simulating light reflecting off the glass surface. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(circle at ${t.px * 100}% ${t.py * 100}%, rgba(245,242,234,0.10), transparent 55%)`,
          transition: 'background var(--dur-base) var(--ease-glide)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
