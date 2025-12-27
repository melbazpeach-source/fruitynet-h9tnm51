import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentHistoryPanel = ({ payments }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      stripe: 'CreditCard',
      paypal: 'Wallet',
      bank: 'Building2',
      cash: 'Banknote'
    };
    return icons?.[method] || 'DollarSign';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Payment History</h3>
        <span className="text-sm text-muted-foreground font-caption">
          {payments?.length} transactions
        </span>
      </div>
      <div className="space-y-3 md:space-y-4">
        {payments?.map((payment) => (
          <div
            key={payment?.id}
            className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon
                name={getPaymentMethodIcon(payment?.method)}
                size={20}
                color="var(--color-success)"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-semibold text-foreground truncate">
                    {payment?.description}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-caption">
                    {formatDate(payment?.date)}
                  </p>
                </div>
                <span className="text-sm md:text-base font-semibold text-success data-text whitespace-nowrap">
                  {formatCurrency(payment?.amount)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-background rounded-md text-muted-foreground font-caption">
                  {payment?.method?.toUpperCase()}
                </span>
                {payment?.transactionId && (
                  <span className="text-xs text-muted-foreground font-caption">
                    ID: {payment?.transactionId}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {payments?.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm md:text-base text-muted-foreground">
              No payment history available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryPanel;