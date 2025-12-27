import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ user = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultUser = {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@fruitynet.com',
    role: 'Agency Owner',
    avatar: '/assets/images/avatar-placeholder.png'
  };

  const currentUser = user || defaultUser;

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      action: () => handleMenuAction('profile')
    },
    {
      label: 'Account Preferences',
      icon: 'Settings',
      action: () => handleMenuAction('preferences')
    },
    {
      label: 'Billing & Plans',
      icon: 'CreditCard',
      action: () => handleMenuAction('billing')
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => handleMenuAction('help')
    },
    {
      type: 'divider'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: () => handleMenuAction('logout'),
      variant: 'destructive'
    }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuAction = (action) => {
    console.log(`Action triggered: ${action}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth hover:bg-muted hover:shadow-elevation-sm active:scale-[0.98]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-foreground">{currentUser?.name}</p>
          <p className="text-xs text-muted-foreground font-caption">{currentUser?.role}</p>
        </div>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="hidden md:block text-muted-foreground"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-lg z-50 overflow-hidden transition-smooth">
          <div className="p-4 border-b border-border bg-muted/30">
            <p className="text-sm font-medium text-foreground">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground font-caption mt-1">{currentUser?.email}</p>
          </div>

          <div className="py-2">
            {menuItems?.map((item, index) => {
              if (item?.type === 'divider') {
                return <div key={index} className="h-px bg-border my-2" />;
              }

              return (
                <button
                  key={index}
                  onClick={item?.action}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-smooth
                    hover:bg-muted
                    ${item?.variant === 'destructive' ? 'text-destructive hover:bg-destructive/10' : 'text-foreground'}
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color={item?.variant === 'destructive' ? 'var(--color-destructive)' : 'currentColor'}
                  />
                  <span className="font-caption">{item?.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;