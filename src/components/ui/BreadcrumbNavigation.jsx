import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();

  const routeLabels = {
    '/agency-dashboard': 'Dashboard',
    '/client-portal-setup': 'Client Portal Setup',
    '/project-management': 'Project Management',
    '/service-catalog': 'Service Catalog',
    '/client-communication': 'Client Communication',
    '/invoice-management': 'Invoice Management'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    
    const breadcrumbs = [
      { label: 'Home', path: '/agency-dashboard' }
    ];

    if (pathSegments?.length > 0) {
      const currentPath = `/${pathSegments?.join('/')}`;
      const currentLabel = routeLabels?.[currentPath] || pathSegments?.[pathSegments?.length - 1]?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');

      if (currentPath !== '/agency-dashboard') {
        breadcrumbs?.push({
          label: currentLabel,
          path: currentPath
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm font-caption">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;

          return (
            <li key={crumb?.path} className="flex items-center gap-2">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground"
                />
              )}
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="text-muted-foreground hover:text-primary transition-smooth hover:underline"
                >
                  {crumb?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;