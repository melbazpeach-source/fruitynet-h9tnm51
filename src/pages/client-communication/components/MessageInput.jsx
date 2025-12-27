import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message?.trim() || attachedFiles?.length > 0) {
      onSendMessage({
        content: message?.trim(),
        attachments: attachedFiles
      });
      setMessage('');
      setAttachedFiles([]);
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    const newFiles = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: `${(file?.size / 1024)?.toFixed(1)} KB`,
      file: file
    }));
    setAttachedFiles([...attachedFiles, ...newFiles]);
    if (onFileUpload) {
      onFileUpload(newFiles);
    }
  };

  const removeFile = (fileId) => {
    setAttachedFiles(attachedFiles?.filter(f => f?.id !== fileId));
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e?.target?.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {attachedFiles?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachedFiles?.map(file => (
            <div 
              key={file?.id}
              className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm"
            >
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="font-caption truncate max-w-[150px]">{file?.name}</span>
              <button
                onClick={() => removeFile(file?.id)}
                className="text-muted-foreground hover:text-destructive transition-smooth"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef?.current?.click()}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-smooth"
            title="Attach file"
          >
            <Icon name="Paperclip" size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Shift+Enter for new line)"
            className="w-full px-4 py-3 bg-muted border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>

        <Button
          variant="default"
          size="default"
          iconName="Send"
          iconPosition="right"
          onClick={handleSend}
          disabled={!message?.trim() && attachedFiles?.length === 0}
          className="flex-shrink-0"
        >
          Send
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-caption">
        <span>Press Enter to send, Shift+Enter for new line</span>
      </div>
    </div>
  );
};

export default MessageInput;