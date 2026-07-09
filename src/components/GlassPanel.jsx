import React from 'react';

/**
 * GlassPanel — the studio's signature surface. Real glass: a translucent
 * film, backdrop blur, a top light edge, soft elevation. Optionally tilts
 * subtly toward the cursor (perspective, never spin).
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
  const [t, setT] = React.useState({ rx: 0, ry: 0 });

  const onMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 5, ry: px * 5 });
  };
  const reset = () => setT({ rx: 0, ry: 0 });

  const fill = tone === 'light' ? 'var(--glass-fill-light)' : 'var(--glass-fill-dark)';
  const blurVal = blur === 'strong' ? 'var(--glass-blur-strong)' : 'var(--glass-blur)';

  const st = {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    background: fill,
    backdropFilter: blurVal,
    WebkitBackdropFilter: blurVal,
    border: '1px solid var(--border-hairline)',
    boxShadow: 'var(--glass-edge), var(--shadow-lg)',
    padding: padded ? 'var(--pad-card)' : 0,
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
      {children}
    </div>
  );
}
