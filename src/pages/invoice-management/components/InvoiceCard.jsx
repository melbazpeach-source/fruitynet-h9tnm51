import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import InvoiceStatusBadge from './InvoiceStatusBadge';

const InvoiceCard = ({ invoice, onView, onEdit, onSend, onDownload }) => {
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
      year: 'numeric'
    });
  };

  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysOverdue = invoice?.status === 'overdue' ? getDaysOverdue(invoice?.dueDate) : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-elevation-md transition-smooth">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={invoice?.clientAvatar}
              alt={invoice?.clientAvatarAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                  {invoice?.clientName}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">
                  Invoice #{invoice?.invoiceNumber}
                </p>
              </div>
              <InvoiceStatusBadge status={invoice?.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-3">
              <div>
                <p className="text-xs text-muted-foreground font-caption mb-1">Amount</p>
                <p className="text-sm md:text-base font-semibold text-foreground data-text">
                  {formatCurrency(invoice?.amount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground font-caption mb-1">Issue Date</p>
                <p className="text-sm md:text-base text-foreground">
                  {formatDate(invoice?.issueDate)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground font-caption mb-1">Due Date</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm md:text-base text-foreground">
                    {formatDate(invoice?.dueDate)}
                  </p>
                  {daysOverdue > 0 && (
                    <span className="text-xs text-error font-caption">
                      ({daysOverdue}d overdue)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {invoice?.description && (
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {invoice?.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 lg:flex-col lg:items-stretch lg:w-32">
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onView(invoice)}
            fullWidth
          >
            View
          </Button>

          <div className="flex gap-2 lg:flex-col">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(invoice)}
              className="flex-1"
            >
              <span className="hidden md:inline">Edit</span>
            </Button>

            {invoice?.status !== 'paid' && invoice?.status !== 'cancelled' && (
              <Button
                variant="outline"
                size="sm"
                iconName="Send"
                onClick={() => onSend(invoice)}
                className="flex-1"
              >
                <span className="hidden md:inline">Send</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => onDownload(invoice)}
              className="flex-1"
            >
              <span className="hidden md:inline">PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;