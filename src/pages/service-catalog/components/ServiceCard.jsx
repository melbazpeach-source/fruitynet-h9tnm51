import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ServiceWorkflow from './ServiceWorkflow';

const ServiceCard = ({ service, onEdit, onToggleVisibility, onDuplicate, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const getPricingDisplay = () => {
    if (service?.pricingType === 'recurring') {
      return `$${service?.price}/${service?.billingCycle}`;
    } else if (service?.pricingType === 'credit') {
      return `${service?.credits} Credits`;
    } else if (service?.pricingType === 'hourly') {
      return `$${service?.price}/hour`;
    }
    return `$${service?.price}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-sm hover:shadow-elevation-md transition-smooth group">
      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.imageAlt}
          className={`w-full h-full object-cover transition-smooth group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {!service?.isVisible && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="EyeOff" size={20} />
              <span className="text-sm font-medium">Hidden</span>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          {service?.featured && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
              Featured
            </span>
          )}
          {service?.isNew && (
            <span className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
              New
            </span>
          )}
        </div>
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 line-clamp-1">
              {service?.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {service?.description}
            </p>
          </div>
          <button
            onClick={() => onToggleVisibility(service?.id)}
            className="flex-shrink-0 p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label={service?.isVisible ? 'Hide service' : 'Show service'}
          >
            <Icon 
              name={service?.isVisible ? 'Eye' : 'EyeOff'} 
              size={18} 
              color={service?.isVisible ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
            <Icon name="Tag" size={14} />
            {service?.category}
          </span>
          {service?.hasUpsells && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium">
              <Icon name="TrendingUp" size={14} />
              Upsells
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground data-text">
              {getPricingDisplay()}
            </p>
            {service?.pricingTiers && (
              <p className="text-xs text-muted-foreground mt-1">
                {service?.pricingTiers} pricing tiers
              </p>
            )}
          </div>
          {service?.deliveryTime && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Delivery</p>
              <p className="text-sm font-medium text-foreground">{service?.deliveryTime}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="FileText" size={16} />
            <span className="font-caption">{service?.customFields} fields</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span className="font-caption">{service?.orders} orders</span>
          </div>
        </div>

        {service?.workflow && service?.workflow?.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowWorkflow(!showWorkflow)}
              className="w-full flex items-center justify-between px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-smooth"
            >
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <Icon name="GitBranch" size={16} />
                {service?.workflow?.length}-Step Workflow
              </span>
              <Icon name={showWorkflow ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>
            {showWorkflow && <ServiceWorkflow workflow={service?.workflow} />}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(service?.id)}
            fullWidth
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            onClick={() => onDuplicate(service?.id)}
            className="flex-shrink-0"
            aria-label="Duplicate service"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(service?.id)}
            className="flex-shrink-0 text-destructive hover:text-destructive"
            aria-label="Delete service"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;