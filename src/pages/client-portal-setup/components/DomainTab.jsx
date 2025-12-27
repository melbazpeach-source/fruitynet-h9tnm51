import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DomainTab = ({ domainData, onDomainChange }) => {
  const [verificationStatus, setVerificationStatus] = useState('pending');

  const handleVerifyDomain = () => {
    setVerificationStatus('verifying');
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  const dnsRecords = [
    {
      type: 'A',
      name: '@',
      value: '192.0.2.1',
      ttl: '3600',
      description: 'Points your domain to Fruitynet servers'
    },
    {
      type: 'CNAME',
      name: 'www',
      value: 'portal.fruitynet.com',
      ttl: '3600',
      description: 'Redirects www subdomain to your portal'
    },
    {
      type: 'TXT',
      name: '@',
      value: 'fruitynet-verification=abc123xyz789',
      ttl: '3600',
      description: 'Verifies domain ownership'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Custom Domain Configuration
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div>
            <Input
              label="Custom Domain"
              type="text"
              placeholder="portal.youragency.com"
              value={domainData?.customDomain}
              onChange={(e) => onDomainChange({ ...domainData, customDomain: e?.target?.value })}
              description="Enter your custom domain without http:// or https://"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              variant="default"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleVerifyDomain}
              loading={verificationStatus === 'verifying'}
            >
              Verify Domain
            </Button>
            <Button variant="outline" iconName="Copy" iconPosition="left">
              Copy DNS Records
            </Button>
          </div>

          {verificationStatus === 'verified' && (
            <div className="flex items-start gap-3 p-3 md:p-4 bg-success/10 border border-success/30 rounded-lg">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm md:text-base font-medium text-success">Domain Verified Successfully</p>
                <p className="text-xs md:text-sm text-success/80 mt-1 font-caption">
                  Your custom domain is now active and SSL certificate has been issued
                </p>
              </div>
            </div>
          )}

          {verificationStatus === 'pending' && (
            <div className="flex items-start gap-3 p-3 md:p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <Icon name="AlertCircle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm md:text-base font-medium text-warning">Domain Verification Pending</p>
                <p className="text-xs md:text-sm text-warning/80 mt-1 font-caption">
                  Please configure DNS records and click verify to activate your custom domain
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          DNS Configuration Instructions
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-muted/30 border border-border rounded-lg p-4 md:p-6">
            <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-3 md:mb-4">
              Step-by-Step Setup Guide
            </h4>
            <ol className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                  1
                </span>
                <span className="flex-1">Log in to your domain registrar's control panel (GoDaddy, Namecheap, etc.)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                  2
                </span>
                <span className="flex-1">Navigate to DNS Management or DNS Settings section</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                  3
                </span>
                <span className="flex-1">Add the DNS records listed below exactly as shown</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                  4
                </span>
                <span className="flex-1">Wait 24-48 hours for DNS propagation (usually faster)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                  5
                </span>
                <span className="flex-1">Click "Verify Domain" button above to complete setup</span>
              </li>
            </ol>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-foreground border border-border">
                    Type
                  </th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-foreground border border-border">
                    Name
                  </th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-foreground border border-border">
                    Value
                  </th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-foreground border border-border">
                    TTL
                  </th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-foreground border border-border">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dnsRecords?.map((record, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground border border-border font-caption">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        {record?.type}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground border border-border font-mono">
                      {record?.name}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground border border-border font-mono">
                      {record?.value}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground border border-border font-mono">
                      {record?.ttl}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-border">
                      <Button variant="ghost" size="sm" iconName="Copy">
                        Copy
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          SSL Certificate Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-muted/30 rounded-lg border border-border">
            <Icon name="Shield" size={24} color="var(--color-success)" className="flex-shrink-0" />
            <div>
              <p className="text-sm md:text-base font-medium text-foreground mb-1">SSL Certificate</p>
              <p className="text-xs md:text-sm text-success font-caption">Active & Valid</p>
              <p className="text-xs text-muted-foreground mt-2 font-caption">
                Expires: December 26, 2026
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-muted/30 rounded-lg border border-border">
            <Icon name="Lock" size={24} color="var(--color-success)" className="flex-shrink-0" />
            <div>
              <p className="text-sm md:text-base font-medium text-foreground mb-1">HTTPS Redirect</p>
              <p className="text-xs md:text-sm text-success font-caption">Enabled</p>
              <p className="text-xs text-muted-foreground mt-2 font-caption">
                All traffic automatically secured
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainTab;