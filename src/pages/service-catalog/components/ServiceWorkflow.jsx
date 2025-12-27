import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceWorkflow = ({ workflow }) => {
  if (!workflow || workflow?.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="GitBranch" size={16} className="text-primary" />
        <h4 className="text-sm font-semibold text-foreground">Standard Workflow</h4>
      </div>
      <div className="space-y-2">
        {workflow?.map((step, index) => (
          <div key={step?.step} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
              {step?.step}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{step?.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{step?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceWorkflow;