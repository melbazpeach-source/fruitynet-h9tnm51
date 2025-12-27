import React from 'react';

const NotificationBadge = ({ count = 0, size = 'default', variant = 'primary' }) => {
  if (!count || count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count;

  const sizeClasses = {
    sm: 'min-w-[16px] h-4 text-[10px] px-1',
    default: 'min-w-[20px] h-5 text-xs px-1.5',
    lg: 'min-w-[24px] h-6 text-sm px-2'
  };

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground'
  };

  return (
    <span
      className={`
        absolute -top-1 -right-1 flex items-center justify-center
        rounded-full font-caption font-medium
        shadow-elevation-sm transition-smooth
        ${sizeClasses?.[size]}
        ${variantClasses?.[variant]}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;