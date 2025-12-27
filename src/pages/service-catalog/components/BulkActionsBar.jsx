import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkAction }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-elevation-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary data-text">{selectedCount}</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {selectedCount} {selectedCount === 1 ? 'service' : 'services'} selected
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onBulkAction('show')}
          >
            <span className="hidden md:inline">Show</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconName="EyeOff"
            onClick={() => onBulkAction('hide')}
          >
            <span className="hidden md:inline">Hide</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            onClick={() => onBulkAction('duplicate')}
          >
            <span className="hidden md:inline">Duplicate</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onBulkAction('delete')}
            className="text-destructive hover:text-destructive"
          >
            <span className="hidden md:inline">Delete</span>
          </Button>
        </div>

        <div className="h-6 w-px bg-border" />

        <button
          onClick={onClearSelection}
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          aria-label="Clear selection"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
};

export default BulkActionsBar;