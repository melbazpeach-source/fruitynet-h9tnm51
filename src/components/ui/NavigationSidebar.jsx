import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import NotificationBadge from './NotificationBadge';

const NavigationSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/agency-dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'View agency overview and metrics'
    },
    {
      label: 'Projects',
      path: '/project-management',
      icon: 'FolderKanban',
      badge: 3,
      tooltip: 'Manage active projects and tasks'
    },
    {
      label: 'Clients',
      path: '/client-communication',
      icon: 'Users',
      badge: 5,
      tooltip: 'Client communication and portal setup',
      subItems: [
        {
          label: 'Communication',
          path: '/client-communication',
          icon: 'MessageSquare'
        },
        {
          label: 'Portal Setup',
          path: '/client-portal-setup',
          icon: 'Settings'
        }
      ]
    },
    {
      label: 'Services',
      path: '/service-catalog',
      icon: 'Package',
      badge: null,
      tooltip: 'Service catalog and invoice management',
      subItems: [
        {
          label: 'Catalog',
          path: '/service-catalog',
          icon: 'List'
        },
        {
          label: 'Invoices',
          path: '/invoice-management',
          icon: 'FileText'
        }
      ]
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const hasActiveSubItem = (subItems) => {
    if (!subItems) return false;
    return subItems?.some(item => location?.pathname === item?.path);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card text-foreground p-2 rounded-md shadow-elevation-md transition-smooth hover:shadow-elevation-lg"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <aside
        className={`
          fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border
          transition-smooth z-40 shadow-elevation-md
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="sidebar-header flex items-center justify-center h-20 border-b border-border bg-primary/5 transition-smooth">
            <div className="sidebar-logo flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg transition-smooth">
              <Icon name="Grape" size={isCollapsed ? 24 : 32} color="var(--color-primary)" />
            </div>
            {!isCollapsed && (
              <span className="ml-3 text-xl font-heading font-semibold text-primary transition-smooth">
                Fruitynet
              </span>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-custom py-6 px-3">
            <ul className="space-y-2">
              {navigationItems?.map((item) => {
                const isActive = isActiveRoute(item?.path);
                const hasActiveSub = hasActiveSubItem(item?.subItems);
                const showSubItems = !isCollapsed && item?.subItems && (isActive || hasActiveSub);

                return (
                  <li key={item?.path}>
                    <NavLink
                      to={item?.path}
                      onClick={closeMobileMenu}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth
                        hover:bg-muted hover:translate-y-[-1px] hover:shadow-elevation-sm
                        active:scale-[0.98]
                        ${isActive || hasActiveSub ? 'bg-primary text-primary-foreground shadow-elevation-sm' : 'text-foreground'}
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      title={isCollapsed ? item?.tooltip : ''}
                    >
                      <div className="relative flex-shrink-0">
                        <Icon 
                          name={item?.icon} 
                          size={20} 
                          color={isActive || hasActiveSub ? 'var(--color-primary-foreground)' : 'currentColor'}
                        />
                        {item?.badge && (
                          <NotificationBadge count={item?.badge} size="sm" />
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium text-base flex-1">{item?.label}</span>
                      )}
                    </NavLink>
                    {showSubItems && (
                      <ul className="mt-2 ml-8 space-y-1">
                        {item?.subItems?.map((subItem) => {
                          const isSubActive = isActiveRoute(subItem?.path);
                          return (
                            <li key={subItem?.path}>
                              <NavLink
                                to={subItem?.path}
                                onClick={closeMobileMenu}
                                className={`
                                  flex items-center gap-2 px-3 py-2 rounded-md transition-smooth text-sm
                                  hover:bg-muted
                                  ${isSubActive ? 'bg-muted text-primary font-medium' : 'text-muted-foreground'}
                                `}
                              >
                                <Icon name={subItem?.icon} size={16} />
                                <span>{subItem?.label}</span>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            {!isCollapsed && (
              <div className="text-xs text-muted-foreground text-center">
                <p className="font-caption">© 2025 Fruitynet</p>
                <p className="mt-1">Agency Management Platform</p>
              </div>
            )}
          </div>
        </div>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background z-30 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      <div className="hidden lg:block fixed bottom-4 left-4 z-50">
        <button
          onClick={onToggle}
          className="bg-card text-foreground p-2 rounded-md shadow-elevation-md transition-smooth hover:shadow-elevation-lg hover:translate-y-[-1px]"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
        </button>
      </div>
      <style jsx>{`
        .sidebar-header {
          transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .sidebar-logo {
          transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        ${isCollapsed ? `
          .sidebar-logo {
            width: 2.5rem;
            height: 2.5rem;
          }
        ` : ''}
      `}</style>
    </>
  );
};

export default NavigationSidebar;