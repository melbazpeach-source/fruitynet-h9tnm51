import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreateServiceModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pricingType: 'one-time',
    price: '',
    billingCycle: 'month',
    credits: '',
    deliveryTime: '',
    featured: false,
    isVisible: true
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const categoryOptions = [
    { value: 'design', label: 'Design Services' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'content', label: 'Content Creation' },
    { value: 'ai-agents', label: 'AI Agents' },
    { value: 'ai-automation', label: 'AI Automation' }
  ];

  const pricingTypeOptions = [
    { value: 'one-time', label: 'One-time Payment' },
    { value: 'recurring', label: 'Recurring Subscription' },
    { value: 'credit', label: 'Credit-based' },
    { value: 'hourly', label: 'Hourly Rate' }
  ];

  const billingCycleOptions = [
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'quarter', label: 'Quarterly' },
    { value: 'year', label: 'Yearly' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Service title is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData?.pricingType === 'credit') {
      if (!formData?.credits || formData?.credits <= 0) {
        newErrors.credits = 'Credits must be greater than 0';
      }
    } else {
      if (!formData?.price || formData?.price <= 0) {
        newErrors.price = 'Price must be greater than 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Create New Service</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Service Title"
            type="text"
            placeholder="e.g., Website Design Package"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your service offering..."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
              rows="4"
            />
            {errors?.description && (
              <p className="text-sm text-destructive mt-1">{errors?.description}</p>
            )}
          </div>

          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
          />

          <Select
            label="Pricing Type"
            options={pricingTypeOptions}
            value={formData?.pricingType}
            onChange={(value) => handleInputChange('pricingType', value)}
          />

          {formData?.pricingType === 'credit' ? (
            <Input
              label="Credits Required"
              type="number"
              placeholder="e.g., 10"
              value={formData?.credits}
              onChange={(e) => handleInputChange('credits', e?.target?.value)}
              error={errors?.credits}
              required
            />
          ) : (
            <Input
              label="Price (USD)"
              type="number"
              placeholder="e.g., 999"
              value={formData?.price}
              onChange={(e) => handleInputChange('price', e?.target?.value)}
              error={errors?.price}
              required
            />
          )}

          {formData?.pricingType === 'recurring' && (
            <Select
              label="Billing Cycle"
              options={billingCycleOptions}
              value={formData?.billingCycle}
              onChange={(value) => handleInputChange('billingCycle', value)}
            />
          )}

          <Input
            label="Delivery Time"
            type="text"
            placeholder="e.g., 5-7 days"
            value={formData?.deliveryTime}
            onChange={(e) => handleInputChange('deliveryTime', e?.target?.value)}
          />

          <div className="space-y-3 pt-4 border-t border-border">
            <Checkbox
              label="Mark as featured service"
              description="Featured services appear at the top of the catalog"
              checked={formData?.featured}
              onChange={(e) => handleInputChange('featured', e?.target?.checked)}
            />

            <Checkbox
              label="Make service visible to clients"
              description="Hidden services won't appear in client portals"
              checked={formData?.isVisible}
              onChange={(e) => handleInputChange('isVisible', e?.target?.checked)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Create Service
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;