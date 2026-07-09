import React from 'react';

/**
 * MediaSlot — shows a real image if `src` is provided; otherwise renders
 * a subtle placeholder (label + dashed border) in the project's accent
 * color, so the layout reads intentionally even before real assets exist.
 * Once real photos are provided, just set the src prop — no other code
 * needs to change.
 */
export function MediaSlot({ src, alt = '', label, accent = 'var(--gb-gold)', aspectRatio = '4 / 3', style = {} }) {
  if (src) {
    return (
      <div style={{ aspectRatio, borderRadius: 8, overflow: 'hidden', ...style }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  return (
    <div style={{
      aspectRatio, borderRadius: 8, border: `1px dashed color-mix(in oklch, ${accent} 45%, transparent)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `color-mix(in oklch, ${accent} 6%, transparent)`,
      ...style,
    }}>
      <span style={{
        fontSize: 'var(--type-micro)', letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase', color: `color-mix(in oklch, ${accent} 70%, var(--gb-stone))`,
        textAlign: 'center', padding: '0 12px',
      }}>
        {label || 'Image pending'}
      </span>
    </div>
  );
}
