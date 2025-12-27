import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ServiceFilters = ({ filters, onFilterChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'name-az', label: 'Name: A to Z' },
    { value: 'name-za', label: 'Name: Z to A' }
  ];

  const pricingTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'one-time', label: 'One-time Payment' },
    { value: 'recurring', label: 'Recurring Subscription' },
    { value: 'credit', label: 'Credit-based' },
    { value: 'hourly', label: 'Hourly Rate' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
      <Input
        type="search"
        placeholder="Search services..."
        value={filters?.searchQuery}
        onChange={(e) => onFilterChange('searchQuery', e?.target?.value)}
        className="mb-4"
      />
      <Select
        label="Sort By"
        options={sortOptions}
        value={filters?.sortBy}
        onChange={(value) => onFilterChange('sortBy', value)}
        className="mb-4"
      />
      <Select
        label="Pricing Type"
        options={pricingTypeOptions}
        value={filters?.pricingType}
        onChange={(value) => onFilterChange('pricingType', value)}
        className="mb-4"
      />
      <div className="space-y-3 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Service Status</p>
        
        <Checkbox
          label="Show visible only"
          checked={filters?.showVisibleOnly}
          onChange={(e) => onFilterChange('showVisibleOnly', e?.target?.checked)}
        />

        <Checkbox
          label="Featured services"
          checked={filters?.showFeaturedOnly}
          onChange={(e) => onFilterChange('showFeaturedOnly', e?.target?.checked)}
        />

        <Checkbox
          label="Has upsells"
          checked={filters?.hasUpsells}
          onChange={(e) => onFilterChange('hasUpsells', e?.target?.checked)}
        />

        <Checkbox
          label="New services"
          checked={filters?.showNewOnly}
          onChange={(e) => onFilterChange('showNewOnly', e?.target?.checked)}
        />
      </div>
      <div className="pt-4 border-t border-border">
        <button
          onClick={() => onFilterChange('reset', true)}
          className="w-full text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default ServiceFilters;