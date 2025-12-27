import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedSettingsTab = ({ settings, onSettingsChange }) => {
  const emailTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      description: 'Sent when a new client is invited to the portal',
      icon: 'Mail',
      lastEdited: '2025-12-20'
    },
    {
      id: 'order_confirmation',
      name: 'Order Confirmation',
      description: 'Sent when a client places a service order',
      icon: 'ShoppingCart',
      lastEdited: '2025-12-18'
    },
    {
      id: 'project_update',
      name: 'Project Update',
      description: 'Sent when project status changes',
      icon: 'FolderKanban',
      lastEdited: '2025-12-15'
    },
    {
      id: 'invoice_reminder',
      name: 'Invoice Reminder',
      description: 'Sent before invoice due date',
      icon: 'FileText',
      lastEdited: '2025-12-22'
    }
  ];

  const workflowTriggers = [
    {
      id: 'new_client',
      name: 'New Client Onboarding',
      description: 'Automatically create welcome project and send introduction email',
      enabled: true
    },
    {
      id: 'order_accepted',
      name: 'Order Acceptance',
      description: 'Create project, assign team members, and notify client',
      enabled: true
    },
    {
      id: 'payment_received',
      name: 'Payment Received',
      description: 'Send receipt, update project status, and notify team',
      enabled: true
    },
    {
      id: 'project_completed',
      name: 'Project Completion',
      description: 'Request feedback, send final deliverables, and close tasks',
      enabled: false
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Email Template Customization
        </h3>

        <div className="space-y-3 md:space-y-4">
          {emailTemplates?.map((template) => (
            <div
              key={template?.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 p-4 md:p-5 bg-background border border-border rounded-lg hover:shadow-elevation-sm transition-smooth"
            >
              <div className="flex items-start gap-3 md:gap-4 flex-1">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={template?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-medium text-foreground mb-1">
                    {template?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground font-caption line-clamp-2">
                    {template?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 md:mt-2 font-caption">
                    Last edited: {template?.lastEdited}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" iconName="Edit2" className="flex-1 sm:flex-initial">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye" className="flex-1 sm:flex-initial">
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Automated Workflow Triggers
        </h3>

        <div className="space-y-4 md:space-y-6">
          {workflowTriggers?.map((trigger) => (
            <div
              key={trigger?.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 p-4 md:p-5 bg-background border border-border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <h4 className="text-sm md:text-base font-medium text-foreground">
                    {trigger?.name}
                  </h4>
                  {trigger?.enabled && (
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full font-caption">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">
                  {trigger?.description}
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                <Checkbox
                  checked={trigger?.enabled}
                  onChange={() => {}}
                  label="Enable"
                />
                <Button variant="ghost" size="sm" iconName="Settings">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Payment Gateway Configuration
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="border border-border rounded-lg p-4 md:p-6 bg-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="CreditCard" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-medium text-foreground">Stripe</h4>
                  <p className="text-xs md:text-sm text-success font-caption">Connected</p>
                </div>
              </div>
              <div className="space-y-3">
                <Input
                  label="Publishable Key"
                  type="text"
                  value="pk_live_••••••••••••••••"
                  disabled
                />
                <Button variant="outline" size="sm" iconName="RefreshCw" fullWidth>
                  Reconnect
                </Button>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 md:p-6 bg-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Icon name="Wallet" size={20} color="var(--color-warning)" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-medium text-foreground">PayPal</h4>
                  <p className="text-xs md:text-sm text-muted-foreground font-caption">Not Connected</p>
                </div>
              </div>
              <div className="space-y-3">
                <Input
                  label="Client ID"
                  type="text"
                  placeholder="Enter PayPal Client ID"
                />
                <Button variant="default" size="sm" iconName="Link" fullWidth>
                  Connect PayPal
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 border border-border rounded-lg p-4 md:p-5">
            <div className="flex items-start gap-3">
              <Icon name="Shield" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm md:text-base font-medium text-foreground mb-1">
                  Secure Payment Processing
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">
                  All payment credentials are encrypted and stored securely. Fruitynet never stores your clients' payment information directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          API & Webhook Integration
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div>
            <Input
              label="API Key"
              type="text"
              value="frty_sk_live_••••••••••••••••••••••••"
              description="Use this key to authenticate API requests"
              disabled
            />
            <div className="flex gap-2 md:gap-3 mt-3">
              <Button variant="outline" size="sm" iconName="Copy">
                Copy Key
              </Button>
              <Button variant="ghost" size="sm" iconName="RefreshCw">
                Regenerate
              </Button>
            </div>
          </div>

          <div>
            <Input
              label="Webhook URL"
              type="url"
              placeholder="https://your-domain.com/webhooks/fruitynet"
              description="Receive real-time notifications for portal events"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="border border-border rounded-lg p-4 md:p-5 bg-background hover:shadow-elevation-sm transition-smooth">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Zap" size={24} color="var(--color-accent)" />
                <h4 className="text-sm md:text-base font-medium text-foreground">Zapier Integration</h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 font-caption">
                Connect with 5,000+ apps to automate workflows
              </p>
              <Button variant="outline" size="sm" iconName="ExternalLink" fullWidth>
                Connect Zapier
              </Button>
            </div>

            <div className="border border-border rounded-lg p-4 md:p-5 bg-background hover:shadow-elevation-sm transition-smooth">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Workflow" size={24} color="var(--color-primary)" />
                <h4 className="text-sm md:text-base font-medium text-foreground">n8n Integration</h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 font-caption">
                Build custom automation workflows with n8n
              </p>
              <Button variant="outline" size="sm" iconName="ExternalLink" fullWidth>
                Connect n8n
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsTab;