import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ServiceCatalogTab = ({ services, onServicesChange }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e?.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newServices = [...services];
    const draggedService = newServices?.[draggedItem];
    newServices?.splice(draggedItem, 1);
    newServices?.splice(index, 0, draggedService);
    
    setDraggedItem(index);
    onServicesChange(newServices);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const toggleServiceVisibility = (index) => {
    const newServices = [...services];
    newServices[index].visible = !newServices?.[index]?.visible;
    onServicesChange(newServices);
  };

  const updateServicePrice = (index, tierIndex, value) => {
    const newServices = [...services];
    newServices[index].pricingTiers[tierIndex].price = value;
    onServicesChange(newServices);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
              Service Catalog Management
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2 font-caption">
              Drag and drop to reorder services, toggle visibility, and manage pricing tiers
            </p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Service
          </Button>
        </div>

        <div className="space-y-4 md:space-y-6">
          {services?.map((service, index) => (
            <div
              key={service?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-background border border-border rounded-lg p-4 md:p-6 transition-smooth hover:shadow-elevation-md cursor-move ${
                draggedItem === index ? 'opacity-50' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={service?.image}
                      alt={service?.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 md:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <Icon name="GripVertical" size={20} className="text-muted-foreground" />
                        <h4 className="text-base md:text-lg font-heading font-semibold text-foreground">
                          {service?.title}
                        </h4>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground font-caption line-clamp-2">
                        {service?.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                      <Checkbox
                        checked={service?.visible}
                        onChange={() => toggleServiceVisibility(index)}
                        label="Visible"
                      />
                      <Button variant="ghost" size="sm" iconName="Edit2">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Trash2">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {service?.pricingTiers?.map((tier, tierIndex) => (
                      <div
                        key={tierIndex}
                        className="border border-border rounded-lg p-3 md:p-4 bg-muted/30"
                      >
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <span className="text-xs md:text-sm font-medium text-foreground">
                            {tier?.name}
                          </span>
                          {tier?.popular && (
                            <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-caption">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm text-muted-foreground">$</span>
                          <Input
                            type="number"
                            value={tier?.price}
                            onChange={(e) => updateServicePrice(index, tierIndex, e?.target?.value)}
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 font-caption">
                          {tier?.features?.length} features included
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 md:px-3 py-1 bg-primary/10 text-primary text-xs md:text-sm rounded-full font-caption">
                      {service?.category}
                    </span>
                    <span className="px-2 md:px-3 py-1 bg-muted text-foreground text-xs md:text-sm rounded-full font-caption">
                      {service?.deliveryTime}
                    </span>
                    {service?.recurring && (
                      <span className="px-2 md:px-3 py-1 bg-success/10 text-success text-xs md:text-sm rounded-full font-caption">
                        Recurring
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Catalog Visibility Settings
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Checkbox
              label="Show catalog on public portal"
              description="Allow visitors to browse services without login"
              checked
            />
            <Checkbox
              label="Require approval for orders"
              description="Review and approve all service requests"
              checked
            />
            <Checkbox
              label="Enable instant checkout"
              description="Allow clients to purchase without consultation"
             
            />
            <Checkbox
              label="Show pricing to all visitors"
              description="Display prices publicly or require login"
              checked
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalogTab;