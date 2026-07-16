import React from 'react';

/**
 * Breadcrumb — a visible trail (Home / Work / Project) for the 3-level-deep
 * project pages. Complements the invisible BreadcrumbList JSON-LD already
 * sent to search engines with the same information for actual visitors,
 * especially anyone landing directly on a project page via a shared link.
 */
export function Breadcrumb({ items, onNavigate, color = 'inherit', accentColor }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && <span aria-hidden="true" style={{ color, opacity: 0.4, fontSize: 11 }}>/</span>}
            {isLast || !item.page ? (
              <span style={{ color, opacity: isLast ? 0.9 : 0.6, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.page)}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  color, opacity: 0.6, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = accentColor || color; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.color = color; }}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
