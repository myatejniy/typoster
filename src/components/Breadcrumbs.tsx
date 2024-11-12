import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link
        to="/"
        className="flex items-center hover:text-gray-900 transition-colors"
      >
        <Home size={16} className="mr-1" />
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <ChevronRight size={16} className="text-gray-400" />
            <Link
              to={routeTo}
              className={`capitalize ${
                isLast
                  ? 'text-indigo-600 font-medium'
                  : 'hover:text-gray-900 transition-colors'
              }`}
            >
              {name}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}