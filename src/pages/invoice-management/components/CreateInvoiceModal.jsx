import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateInvoiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    client: '',
    template: 'standard',
    issueDate: new Date()?.toISOString()?.split('T')?.[0],
    dueDate: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    taxRate: 0,
    discount: 0,
    notes: ''
  });

  const clientOptions = [
    { value: '', label: 'Select Client' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'designstudio', label: 'Design Studio Pro' },
    { value: 'startup', label: 'Startup Ventures Inc' },
    { value: 'enterprise', label: 'Enterprise Global Ltd' }
  ];

  const templateOptions = [
    { value: 'standard', label: 'Standard Invoice' },
    { value: 'detailed', label: 'Detailed Invoice' },
    { value: 'simple', label: 'Simple Invoice' },
    { value: 'professional', label: 'Professional Invoice' }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData?.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData?.items, { description: '', quantity: 1, rate: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData?.items?.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateSubtotal = () => {
    return formData?.items?.reduce((sum, item) => sum + (item?.quantity * item?.rate), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (formData?.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - formData?.discount;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit({
      ...formData,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevation-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Create New Invoice</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto scrollbar-custom p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Select
              label="Client"
              required
              options={clientOptions}
              value={formData?.client}
              onChange={(value) => handleInputChange('client', value)}
            />

            <Select
              label="Template"
              options={templateOptions}
              value={formData?.template}
              onChange={(value) => handleInputChange('template', value)}
            />

            <Input
              type="date"
              label="Issue Date"
              required
              value={formData?.issueDate}
              onChange={(e) => handleInputChange('issueDate', e?.target?.value)}
            />

            <Input
              type="date"
              label="Due Date"
              required
              value={formData?.dueDate}
              onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Line Items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={addItem}
              >
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {formData?.items?.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="md:col-span-5">
                    <Input
                      type="text"
                      placeholder="Item description"
                      value={item?.description}
                      onChange={(e) => handleItemChange(index, 'description', e?.target?.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item?.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e?.target?.value) || 0)}
                      min="1"
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <Input
                      type="number"
                      placeholder="Rate ($)"
                      value={item?.rate}
                      onChange={(e) => handleItemChange(index, 'rate', parseFloat(e?.target?.value) || 0)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                    <span className="text-sm font-semibold text-foreground data-text">
                      ${(item?.quantity * item?.rate)?.toFixed(2)}
                    </span>
                    {formData?.items?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-error hover:text-error/80 transition-smooth"
                        aria-label="Remove item"
                      >
                        <Icon name="Trash2" size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Input
              type="number"
              label="Tax Rate (%)"
              placeholder="0"
              value={formData?.taxRate}
              onChange={(e) => handleInputChange('taxRate', parseFloat(e?.target?.value) || 0)}
              min="0"
              max="100"
              step="0.01"
            />

            <Input
              type="number"
              label="Discount ($)"
              placeholder="0.00"
              value={formData?.discount}
              onChange={(e) => handleInputChange('discount', parseFloat(e?.target?.value) || 0)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              label="Notes"
              placeholder="Additional notes or payment terms..."
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
            />
          </div>

          <div className="bg-muted/30 rounded-lg p-4 md:p-6 space-y-2">
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-semibold text-foreground data-text">
                ${calculateSubtotal()?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-muted-foreground">Tax ({formData?.taxRate}%):</span>
              <span className="font-semibold text-foreground data-text">
                ${calculateTax()?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-muted-foreground">Discount:</span>
              <span className="font-semibold text-foreground data-text">
                -${formData?.discount?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-lg md:text-xl pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="font-bold text-primary data-text">
                ${calculateTotal()?.toFixed(2)}
              </span>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="Check"
            iconPosition="left"
            onClick={handleSubmit}
          >
            Create Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;