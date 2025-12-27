import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionButton = ({ label, icon, onClick, variant = 'default' }) => {
  return (
    <Button
      variant={variant}
      iconName={icon}
      iconPosition="left"
      onClick={onClick}
      className="w-full"
    >
      {label}
    </Button>
  );
};

export default QuickActionButton;