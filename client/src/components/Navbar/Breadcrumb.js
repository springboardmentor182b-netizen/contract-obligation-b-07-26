import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
      <Link to="/" style={{ color: '#6b7280', display: 'flex', alignItems: 'center' }}>
        <FiHome />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const title = value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <React.Fragment key={to}>
            <FiChevronRight style={{ margin: '0 8px', color: '#9ca3af' }} />
            {last ? (
              <span style={{ fontWeight: 600, color: '#111827' }}>{title}</span>
            ) : (
              <Link to={to} style={{ color: '#6b7280', textDecoration: 'none' }}>
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
