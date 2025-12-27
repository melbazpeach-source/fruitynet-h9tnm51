import React from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const ConversationHeader = ({ conversation, onViewProfile, onStartCall, onMoreOptions }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
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

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-foreground truncate">
            {conversation?.clientName}
          </h2>
          <p className="text-sm text-muted-foreground font-caption truncate">
            {conversation?.isOnline ? 'Online' : `Last seen ${conversation?.lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          iconName="Phone"
          onClick={onStartCall}
          title="Start call"
        />
        <Button
          variant="ghost"
          size="icon"
          iconName="Video"
          onClick={onStartCall}
          title="Start video call"
        />
        <Button
          variant="ghost"
          size="icon"
          iconName="User"
          onClick={onViewProfile}
          title="View profile"
        />
        <Button
          variant="ghost"
          size="icon"
          iconName="MoreVertical"
          onClick={onMoreOptions}
          title="More options"
        />
      </div>
    </div>
  );
};

export default ConversationHeader;