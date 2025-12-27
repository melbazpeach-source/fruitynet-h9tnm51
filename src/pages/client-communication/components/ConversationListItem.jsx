import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ConversationListItem = ({ conversation, isActive, onClick }) => {
  const formatTimestamp = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-start gap-3 p-4 rounded-lg transition-smooth
        hover:bg-muted hover:shadow-elevation-sm active:scale-[0.98]
        ${isActive ? 'bg-primary/10 border-l-4 border-primary' : 'border-l-4 border-transparent'}
      `}
    >
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
          <Image
            src={conversation?.clientAvatar}
            alt={conversation?.clientAvatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        {conversation?.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-sm font-medium text-foreground truncate">
            {conversation?.clientName}
          </h3>
          <span className="text-xs text-muted-foreground font-caption flex-shrink-0">
            {formatTimestamp(conversation?.lastMessageTime)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p className={`
            text-sm flex-1 truncate font-caption
            ${conversation?.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}
          `}>
            {conversation?.lastMessagePreview}
          </p>
          {conversation?.unreadCount > 0 && (
            <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
              {conversation?.unreadCount > 99 ? '99+' : conversation?.unreadCount}
            </span>
          )}
        </div>

        {conversation?.hasAttachment && (
          <div className="flex items-center gap-1 mt-1">
            <Icon name="Paperclip" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-caption">Attachment</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default ConversationListItem;