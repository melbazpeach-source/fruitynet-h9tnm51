import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectCommunicationPanel = ({ projectId, messages = [] }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showAttachment, setShowAttachment] = useState(false);

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      setShowAttachment(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm flex flex-col h-[500px] md:h-[600px]">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          Project Communication
        </h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded transition-smooth" title="Search messages">
            <Icon name="Search" size={18} />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-smooth" title="Message settings">
            <Icon name="Settings" size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-4">
        {messages?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages?.map((message) => (
            <div key={message?.id} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={message?.sender?.avatar}
                  alt={message?.sender?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{message?.sender?.name}</span>
                  <span className="text-xs text-muted-foreground">{formatMessageTime(message?.timestamp)}</span>
                  {message?.sender?.role && (
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {message?.sender?.role}
                    </span>
                  )}
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{message?.content}</p>
                  {message?.attachments && message?.attachments?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message?.attachments?.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-card rounded border border-border">
                          <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                          <span className="text-xs text-foreground flex-1 truncate">{attachment?.name}</span>
                          <button className="text-primary hover:underline text-xs">Download</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message?.mentions && message?.mentions?.length > 0 && (
                  <div className="mt-1 flex items-center gap-1">
                    <Icon name="AtSign" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Mentioned: {message?.mentions?.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-border p-4">
        {showAttachment && (
          <div className="mb-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Attach Files</span>
              <button onClick={() => setShowAttachment(false)}>
                <Icon name="X" size={16} />
              </button>
            </div>
            <Button variant="outline" size="sm" iconName="Upload" iconPosition="left" fullWidth>
              Choose Files
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setShowAttachment(!showAttachment)}
            className="p-2 hover:bg-muted rounded transition-smooth"
            title="Attach files"
          >
            <Icon name="Paperclip" size={20} />
          </button>
          <Input
            type="text"
            placeholder="Type a message... (Use @ to mention team members)"
            value={newMessage}
            onChange={(e) => setNewMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="default"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={!newMessage?.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCommunicationPanel;