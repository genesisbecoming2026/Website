import React from 'react';
import { CALENDLY_URL } from '../config.js';
import { useIsMobile } from '../useIsMobile.js';

/**
 * SiteNav — a floating glass navigation bar. Desktop shows the full link
 * row; below the mobile breakpoint it collapses into a hamburger toggle
 * that opens a full-width glass dropdown panel, since six links plus a
 * CTA button will never fit comfortably on a phone width.
 */
export function SiteNav({
  logoSrc,
  brand = 'Genesis Becoming',
  links = [
    { label: 'Home', page: 'home' },
    { label: 'Work', page: 'work' },
    { label: 'Our Approach', page: 'philosophy' },
    { label: 'Studio', page: 'studio' },
    { label: 'Services', page: 'services' },
    { label: 'Contact', page: 'contact' },
  ],
  action = { label: 'Book a Discovery Call' },
  active,
  onNavigate,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const bar = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-7)',
    padding: '14px 22px 14px 24px',
    borderRadius: menuOpen && isMobile ? 'var(--radius-lg)' : 'var(--radius-pill)',
    background: 'var(--glass-fill-dark)',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--border-hairline)',
    boxShadow: 'var(--glass-edge), var(--shadow-md)',
    fontFamily: 'var(--font-sans)',
    ...style,
  };

  const brandWrap = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  };
  const wordmark = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    color: 'var(--gb-bone)',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  };

  const list = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-6)',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  };
  const linkSt = (i, isActive) => ({
    fontSize: 'var(--type-label)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: hover === i || isActive ? 'var(--gb-gold)' : 'var(--gb-stone)',
    transition: 'color var(--dur-base) var(--ease-glide)',
    whiteSpace: 'nowrap',
  });

  const cta = {
    fontSize: 'var(--type-label)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: hover === 'cta' ? 'var(--gb-gold-soft)' : 'var(--gb-gold)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    transition: 'color var(--dur-base) var(--ease-glide)',
  };

  function handleNavigate(page) {
    onNavigate && onNavigate(page);
    setMenuOpen(false);
  }

  const BrandMark = (
    <a href="#top" style={brandWrap} onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}>
      {logoSrc && <img src={logoSrc} alt="" style={{ height: 26, width: 'auto', display: 'block' }} />}
      <span style={wordmark}>{brand}</span>
    </a>
  );

  const BookLink = action && (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={cta}
      onMouseEnter={() => setHover('cta')}
      onMouseLeave={() => setHover(null)}
    >
      {action.label}
      <span aria-hidden style={{
        display: 'inline-block',
        transition: 'transform var(--dur-base) var(--ease-cinematic)',
        transform: hover === 'cta' ? 'translateX(4px)' : 'translateX(0)',
      }}>→</span>
    </a>
  );

  if (isMobile) {
    return (
      <nav style={bar} {...rest}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {BrandMark}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: 8, display: 'flex', flexDirection: 'column', gap: 5,
              minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ width: 22, height: 1.5, background: 'var(--gb-bone)', display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 22, height: 1.5, background: 'var(--gb-bone)', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ width: 22, height: 1.5, background: 'var(--gb-bone)', display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{
            marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--border-hairline)',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: '100%',
          }}>
            {links.map((l) => (
              <a
                key={l.label}
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavigate(l.page); }}
                style={{ ...linkSt(l.label, active === l.page), fontSize: 'var(--type-small)', display: 'block', padding: '10px 0', minHeight: 24 }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: 6 }}>{BookLink}</div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav style={bar} {...rest}>
      {BrandMark}
      <ul style={list}>
        {links.map((l, i) => (
          <li key={l.label}>
            <a
              href="#"
              style={linkSt(i, active === l.page)}
              onClick={(e) => { e.preventDefault(); handleNavigate(l.page); }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      {BookLink}
    </nav>
  );
}
