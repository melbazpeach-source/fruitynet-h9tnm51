import React from 'react';
import Icon from '../../../components/AppIcon';

const SetupProgressIndicator = ({ currentStep, totalSteps, completedSteps }) => {
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const steps = [
    { id: 1, label: 'Branding', icon: 'Palette', completed: completedSteps >= 1 },
    { id: 2, label: 'Domain', icon: 'Globe', completed: completedSteps >= 2 },
    { id: 3, label: 'Services', icon: 'Package', completed: completedSteps >= 3 },
    { id: 4, label: 'Settings', icon: 'Settings', completed: completedSteps >= 4 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
            Setup Progress
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">
            {completedSteps} of {totalSteps} steps completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-heading font-semibold text-primary">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2 md:h-3 mb-4 md:mb-6 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {steps?.map((step) => (
          <div
            key={step?.id}
            className={`flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg border transition-smooth ${
              step?.completed
                ? 'bg-success/10 border-success/30'
                : currentStep === step?.id
                ? 'bg-primary/10 border-primary/30' :'bg-muted/30 border-border'
            }`}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                step?.completed
                  ? 'bg-success text-success-foreground'
                  : currentStep === step?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step?.completed ? (
                <Icon name="Check" size={16} />
              ) : (
                <Icon name={step?.icon} size={16} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-foreground truncate">
                {step?.label}
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {step?.completed ? 'Complete' : currentStep === step?.id ? 'In Progress' : 'Pending'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupProgressIndicator;