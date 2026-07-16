import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * CoverFlowCarousel — the old iPod Cover Flow interaction: a horizontal
 * row of cards in 3D, the center one facing forward, the rest receding
 * and angled to the sides. Drag or use arrow keys to flip through.
 *
 * Position is tracked as a single continuous motion value (not a plain
 * React index plus a separate drag offset) — every card's transform is
 * just `index - position`, so dragging and snapping can't fall out of
 * sync with each other.
 *
 * Honest note (told to the user directly, not hidden): this shines with
 * a real library to flick through. With only a few projects, it's a nice
 * detail rather than the full "shuffle" magic — worth having now since
 * it'll only get better as more case studies are added.
 */
const CARD_W = 280;
const SPACING = 165; // px per index step, used to convert drag pixels to position

function CoverFlowCard({ item, index, position, onSelect }) {
  const offset = useTransform(position, (p) => index - p);
  const x = useTransform(offset, (o) => o * SPACING);
  const rotateY = useTransform(offset, [-2, -1, 0, 1, 2], [55, 55, 0, -55, -55]);
  const scale = useTransform(offset, (o) => Math.max(1 - Math.abs(o) * 0.22, 0.55));
  const z = useTransform(offset, (o) => -Math.abs(o) * 140);
  const opacity = useTransform(offset, (o) => (Math.abs(o) > 2.4 ? 0 : 1));
  const filter = useTransform(offset, (o) => `brightness(${Math.max(1 - Math.abs(o) * 0.35, 0.35)})`);

  return (
    <motion.div
      onClick={() => onSelect(index)}
      style={{
        position: 'absolute', left: '50%', top: '50%', marginLeft: -CARD_W / 2, marginTop: -CARD_W * 0.62,
        width: CARD_W, height: CARD_W * 1.24,
        x, z, scale, opacity, rotateY, filter,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        borderRadius: 10, overflow: 'hidden',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
        backgroundImage: `url(${item.thumbnailImage || item.heroImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}
    >
      {/* Glass layer — tinted with each project's own established accent
          color (the same one used throughout its case-study page) rather
          than a neutral dark fill, so the card itself reads as that
          brand's glass, not a generic frame. The real photo still shows
          through the blur underneath. */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `color-mix(in oklch, ${item.accentColor || 'var(--gb-gold)'} 38%, var(--glass-fill-dark))`,
        backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
      }}>
        {/* Logo zone — a reserved height (not just width), so a tall
            lockup like TNT's (icon + TNT + BUILDERS stacked) can never
            grow down into the title/category text pinned at the bottom,
            the way it could when only width was constrained. */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '64%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--space-6)',
        }}>
          <div style={{
            width: '100%', height: '100%',
            background: 'color-mix(in oklch, var(--gb-bone) 85%, transparent)',
            backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-hairline)',
            borderTop: '1px solid rgba(255,255,255,0.6)',
            boxShadow: 'var(--glass-edge), var(--shadow-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'var(--space-5)',
          }}>
            <img
              src={item.logoImage}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--space-5)', background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gb-bone)' }}>{item.title}</div>
        <div style={{ fontSize: 'var(--type-label)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gb-gold)', marginTop: 4 }}>{item.category}</div>
      </div>
    </motion.div>
  );
}

export function CoverFlowCarousel({ items, onEnterProject }) {
  const position = useMotionValue(0); // continuous — the single source of truth
  const [active, setActive] = React.useState(0); // nearest whole index, for dots/keyboard
  const dragStartPosition = React.useRef(0);

  function settle(targetIndex) {
    const clamped = Math.max(0, Math.min(items.length - 1, targetIndex));
    animate(position, clamped, { type: 'spring', stiffness: 260, damping: 32 });
    setActive(clamped);
  }

  function onSelect(index) {
    if (index === active) onEnterProject(items[index].id);
    else settle(index);
  }

  function onDragStart() {
    dragStartPosition.current = position.get();
  }

  function onDrag(_, info) {
    position.set(dragStartPosition.current - info.offset.x / SPACING);
  }

  function onDragEnd() {
    settle(Math.round(position.get()));
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') settle(active + 1);
    if (e.key === 'ArrowLeft') settle(active - 1);
    if (e.key === 'Enter') onEnterProject(items[active].id);
  }

  return (
    <div>
      <div
        role="listbox"
        aria-label="Project carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ position: 'relative', height: 420, perspective: 1400, outline: 'none' }}
      >
        <motion.div
          drag="x"
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          dragMomentum={false}
          style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
        >
          {items.map((item, i) => (
            <CoverFlowCard key={item.id} item={item} index={i} position={position} onSelect={onSelect} />
          ))}
        </motion.div>
      </div>

      {/* Dots — also serve as a click target, and show position for keyboard users */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 'var(--space-6)' }}>
        {items.map((item, i) => (
          <button
            key={item.id}
            aria-label={`Show ${item.title}`}
            onClick={() => settle(i)}
            style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
              background: i === active ? 'var(--gb-gold)' : 'var(--border-hairline)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--type-label)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gb-stone)', opacity: 0.6 }}>
        Drag, use arrow keys, or click a card to flip through
      </p>
    </div>
  );
}
