import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderAttachment = (attachment) => {
    if (attachment?.type === 'image') {
      return (
        <div className="mt-2 rounded-lg overflow-hidden max-w-xs">
          <Image
            src={attachment?.url}
            alt={attachment?.alt}
            className="w-full h-auto"
          />
        </div>
      );
    }

    return (
      <a
        href={attachment?.url}
        download
        className="mt-2 flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth max-w-xs"
      >
        <Icon name="FileText" size={20} className="text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{attachment?.name}</p>
          <p className="text-xs text-muted-foreground font-caption">{attachment?.size}</p>
        </div>
        <Icon name="Download" size={16} className="text-muted-foreground flex-shrink-0" />
      </a>
    );
  };

  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={message?.senderAvatar}
            alt={message?.senderAvatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`flex flex-col gap-1 max-w-[70%] md:max-w-[60%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {!isOwn && (
          <span className="text-xs font-medium text-foreground font-caption px-2">
            {message?.senderName}
          </span>
        )}

        <div className={`
          px-4 py-3 rounded-lg
          ${isOwn 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-muted text-foreground rounded-tl-none'
          }
        `}>
          <p className="text-sm whitespace-pre-wrap break-words">{message?.content}</p>
          
          {message?.attachment && renderAttachment(message?.attachment)}

          {message?.reactions && message?.reactions?.length > 0 && (
            <div className="flex items-center gap-1 mt-2 flex-wrap">
              {message?.reactions?.map((reaction, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-background/50 rounded-full"
                >
                  {reaction?.emoji} {reaction?.count}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-2">
          <span className="text-xs text-muted-foreground font-caption">
            {formatTime(message?.timestamp)}
          </span>
          {isOwn && (
            <Icon 
              name={message?.status === 'read' ? 'CheckCheck' : 'Check'} 
              size={14} 
              className={message?.status === 'read' ? 'text-primary' : 'text-muted-foreground'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;