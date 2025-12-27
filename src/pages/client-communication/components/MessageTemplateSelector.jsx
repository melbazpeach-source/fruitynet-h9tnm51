import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const MessageTemplateSelector = ({ onSelectTemplate, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 1,
      title: "Project Update Request",
      category: "Project Management",
      content: "Hi [Client Name],\n\nI hope this message finds you well. I wanted to reach out regarding [Project Name]. Could you please provide an update on [specific item]?\n\nLooking forward to your response.\n\nBest regards"
    },
    {
      id: 2,
      title: "Payment Reminder",
      category: "Billing",
      content: "Dear [Client Name],\n\nThis is a friendly reminder that invoice #[Invoice Number] for [Amount] is due on [Due Date].\n\nPlease let me know if you have any questions.\n\nThank you"
    },
    {
      id: 3,
      title: "File Request",
      category: "Documentation",
      content: "Hello [Client Name],\n\nTo proceed with [Project Name], we need the following files:\n- [File 1]\n- [File 2]\n- [File 3]\n\nPlease upload them at your earliest convenience.\n\nThanks"
    },
    {
      id: 4,
      title: "Meeting Confirmation",
      category: "Scheduling",
      content: "Hi [Client Name],\n\nThis confirms our meeting scheduled for [Date] at [Time].\n\nMeeting link: [Link]\nAgenda: [Agenda items]\n\nSee you then!"
    },
    {
      id: 5,
      title: "Project Completion",
      category: "Project Management",
      content: "Dear [Client Name],\n\nI'm pleased to inform you that [Project Name] has been completed.\n\nPlease review the deliverables and let me know if you need any revisions.\n\nThank you for your collaboration!"
    },
    {
      id: 6,
      title: "Feedback Request",
      category: "Client Relations",
      content: "Hello [Client Name],\n\nWe'd love to hear your feedback on [Project/Service Name].\n\nYour input helps us improve our services.\n\nWould you mind sharing your thoughts?\n\nThank you"
    }
  ];

  const filteredTemplates = templates?.filter(template =>
    template?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Message Templates</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-custom p-4">
          <div className="space-y-3">
            {filteredTemplates?.map(template => (
              <button
                key={template?.id}
                onClick={() => {
                  onSelectTemplate(template?.content);
                  onClose();
                }}
                className="w-full text-left p-4 bg-muted hover:bg-muted/80 rounded-lg transition-smooth border border-transparent hover:border-primary"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-medium text-foreground">{template?.title}</h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-caption flex-shrink-0">
                    {template?.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-caption line-clamp-2">
                  {template?.content}
                </p>
              </button>
            ))}

            {filteredTemplates?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-caption">No templates found</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground font-caption">Categories:</span>
            {categories?.map(category => (
              <span 
                key={category}
                className="text-xs px-2 py-1 bg-background border border-border rounded-full font-caption"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTemplateSelector;