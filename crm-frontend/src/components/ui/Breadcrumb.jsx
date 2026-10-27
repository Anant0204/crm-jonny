import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = ({ items = [], homeHref }) => {
  const location = useLocation();

  // Smart default homeHref:
  // If homeHref is explicitly passed and is not '/', use it.
  // Otherwise, route to CRM dashboard or OAL dashboard based on current section.
  const resolvedHomeHref = (homeHref && homeHref !== '/')
    ? homeHref
    : location.pathname.startsWith('/oal')
      ? '/oal/dashboard'
      : '/crm/dashboard';

  return (
    <nav className="flex items-center gap-1.5 text-xs text-secondary mb-2" aria-label="Breadcrumb">
      <Link
        to={resolvedHomeHref}
        className="flex items-center gap-1 hover:text-primary transition-colors"
        title="Home (Dashboard)"
      >
        <Home size={14} />
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={12} className="text-tertiary" />
            {isLast || !item.href ? (
              <span className="font-semibold text-primary">{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

