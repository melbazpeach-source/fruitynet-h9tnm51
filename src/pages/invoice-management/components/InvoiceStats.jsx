import React from 'react';
import Icon from '../../../components/AppIcon';

const InvoiceStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Revenue',
      value: stats?.totalRevenue,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      label: 'Pending Amount',
      value: stats?.pendingAmount,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '-5.2%',
      changeType: 'negative'
    },
    {
      label: 'Overdue Amount',
      value: stats?.overdueAmount,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '+8.3%',
      changeType: 'negative'
    },
    {
      label: 'Total Invoices',
      value: stats?.totalInvoices,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+15',
      changeType: 'positive',
      isCount: true
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-elevation-md transition-smooth"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
            </div>
            <span
              className={`text-xs md:text-sm font-medium font-caption ${
                stat?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}
            >
              {stat?.change}
            </span>
          </div>

          <div>
            <p className="text-xs md:text-sm text-muted-foreground font-caption mb-1">
              {stat?.label}
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground data-text">
              {stat?.isCount ? stat?.value : formatCurrency(stat?.value)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceStats;