import React from 'react';

const InvoiceStatusBadge = ({ status }) => {
  const statusConfig = {
    paid: {
      label: 'Paid',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    },
    pending: {
      label: 'Pending',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20'
    },
    overdue: {
      label: 'Overdue',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      borderColor: 'border-error/20'
    },
    draft: {
      label: 'Draft',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      borderColor: 'border-border'
    },
    cancelled: {
      label: 'Cancelled',
      bgColor: 'bg-destructive/10',
      textColor: 'text-destructive',
      borderColor: 'border-destructive/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.draft;

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2 py-1 md:px-3 md:py-1.5
        text-xs md:text-sm font-medium font-caption
        rounded-md border
        ${config?.bgColor} ${config?.textColor} ${config?.borderColor}
        transition-smooth
      `}
    >
      {config?.label}
    </span>
  );
};

export default InvoiceStatusBadge;