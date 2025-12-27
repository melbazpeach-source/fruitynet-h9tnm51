import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onCreateService }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Package" size={40} color="var(--color-muted-foreground)" />
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 text-center">
        No Services Yet
      </h3>

      <p className="text-sm md:text-base text-muted-foreground text-center max-w-md mb-8">
        Start building your service catalog by creating your first service offering. Showcase your services with detailed descriptions, pricing, and custom fields.
      </p>

      <Button
        variant="default"
        size="lg"
        iconName="Plus"
        iconPosition="left"
        onClick={onCreateService}
      >
        Create Your First Service
      </Button>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Palette" size={24} color="var(--color-primary)" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Custom Branding</h4>
          <p className="text-xs text-muted-foreground">Add images, descriptions, and pricing tiers</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" size={24} color="var(--color-primary)" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Quick Setup</h4>
          <p className="text-xs text-muted-foreground">Configure services in minutes with templates</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Upsell Options</h4>
          <p className="text-xs text-muted-foreground">Add upsells to increase revenue</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;