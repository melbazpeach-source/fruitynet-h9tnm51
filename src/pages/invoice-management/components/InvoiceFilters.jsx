import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InvoiceFilters = ({ onFilterChange, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    client: 'all'
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'draft', label: 'Draft' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const clientOptions = [
    { value: 'all', label: 'All Clients' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'designstudio', label: 'Design Studio Pro' },
    { value: 'startup', label: 'Startup Ventures Inc' },
    { value: 'enterprise', label: 'Enterprise Global Ltd' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
      client: 'all'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by invoice number, client name..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Filters
          </Button>

          <Button
            variant="outline"
            size="default"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Select
            label="Client"
            options={clientOptions}
            value={filters?.client}
            onChange={(value) => handleFilterChange('client', value)}
          />

          <Input
            type="date"
            label="Date From"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />

          <Input
            type="date"
            label="Date To"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />

          <Input
            type="number"
            label="Min Amount ($)"
            placeholder="0.00"
            value={filters?.minAmount}
            onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
          />

          <Input
            type="number"
            label="Max Amount ($)"
            placeholder="10000.00"
            value={filters?.maxAmount}
            onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
          />

          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceFilters;