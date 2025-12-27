import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ConversationListItem from './components/ConversationListItem';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import MessageTemplateSelector from './components/MessageTemplateSelector';
import CommunicationStats from './components/CommunicationStats';
import ConversationHeader from './components/ConversationHeader';

const ClientCommunication = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const communicationStats = {
    activeConversations: 24,
    avgResponseTime: "2.5h",
    messagesToday: 156,
    pendingResponses: 8
  };

  const conversations = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    clientAvatarAlt: "Professional headshot of blonde woman with warm smile wearing navy blazer",
    lastMessagePreview: "Thanks for the update! The designs look great.",
    lastMessageTime: new Date(Date.now() - 300000),
    unreadCount: 2,
    isOnline: true,
    hasAttachment: false,
    lastSeen: "2 minutes ago"
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    clientAvatarAlt: "Professional headshot of Asian man with short black hair in gray suit",
    lastMessagePreview: "Can we schedule a call to discuss the project timeline?",
    lastMessageTime: new Date(Date.now() - 1800000),
    unreadCount: 0,
    isOnline: false,
    hasAttachment: false,
    lastSeen: "30 minutes ago"
  },
  {
    id: 3,
    clientName: "Emily Rodriguez",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    clientAvatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing white blouse",
    lastMessagePreview: "I\'ve uploaded the files you requested.",
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 5,
    isOnline: true,
    hasAttachment: true,
    lastSeen: "Just now"
  },
  {
    id: 4,
    clientName: "David Thompson",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b137e8c9-1763295319330.png",
    clientAvatarAlt: "Professional headshot of middle-aged man with gray hair in dark blue suit",
    lastMessagePreview: "The invoice has been paid. Thank you!",
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 0,
    isOnline: false,
    hasAttachment: false,
    lastSeen: "2 hours ago"
  },
  {
    id: 5,
    clientName: "Lisa Anderson",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b032f6ab-1763294605043.png",
    clientAvatarAlt: "Professional headshot of young woman with red hair wearing green cardigan",
    lastMessagePreview: "Could you send me the latest mockups?",
    lastMessageTime: new Date(Date.now() - 10800000),
    unreadCount: 1,
    isOnline: true,
    hasAttachment: false,
    lastSeen: "5 minutes ago"
  },
  {
    id: 6,
    clientName: "James Wilson",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e33182f2-1763292759285.png",
    clientAvatarAlt: "Professional headshot of African American man with beard wearing black shirt",
    lastMessagePreview: "Perfect! Let\'s proceed with this approach.",
    lastMessageTime: new Date(Date.now() - 14400000),
    unreadCount: 0,
    isOnline: false,
    hasAttachment: false,
    lastSeen: "4 hours ago"
  }];


  const mockMessages = [
  {
    id: 1,
    senderName: "Sarah Johnson",
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    senderAvatarAlt: "Professional headshot of blonde woman with warm smile wearing navy blazer",
    content: "Hi! I wanted to check in on the progress of our website redesign project. How are things coming along?",
    timestamp: new Date(Date.now() - 7200000),
    status: "read",
    isOwn: false,
    reactions: []
  },
  {
    id: 2,
    senderName: "You",
    senderAvatar: "",
    senderAvatarAlt: "",
    content: "Hello Sarah! Things are progressing well. We\'ve completed the homepage design and are now working on the inner pages. I\'ll send you the mockups shortly.",
    timestamp: new Date(Date.now() - 6900000),
    status: "read",
    isOwn: true,
    reactions: [{ emoji: "👍", count: 1 }]
  },
  {
    id: 3,
    senderName: "You",
    senderAvatar: "",
    senderAvatarAlt: "",
    content: "Here are the latest design mockups for your review.",
    timestamp: new Date(Date.now() - 6600000),
    status: "read",
    isOwn: true,
    attachment: {
      type: "file",
      name: "Homepage_Mockup_v2.pdf",
      size: "2.4 MB",
      url: "#"
    },
    reactions: []
  },
  {
    id: 4,
    senderName: "Sarah Johnson",
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    senderAvatarAlt: "Professional headshot of blonde woman with warm smile wearing navy blazer",
    content: "These look fantastic! I love the color scheme and the overall layout. Just a few minor tweaks needed on the navigation menu.",
    timestamp: new Date(Date.now() - 3600000),
    status: "read",
    isOwn: false,
    reactions: []
  },
  {
    id: 5,
    senderName: "You",
    senderAvatar: "",
    senderAvatarAlt: "",
    content: "Great! I'll make those adjustments to the navigation. Could you provide more details about the specific changes you'd like?",
    timestamp: new Date(Date.now() - 3300000),
    status: "read",
    isOwn: true,
    reactions: []
  },
  {
    id: 6,
    senderName: "Sarah Johnson",
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    senderAvatarAlt: "Professional headshot of blonde woman with warm smile wearing navy blazer",
    content: "Sure! I'd like the menu items to be slightly larger and add a subtle hover effect. Also, can we make the dropdown animation a bit smoother?",
    timestamp: new Date(Date.now() - 1800000),
    status: "read",
    isOwn: false,
    reactions: []
  },
  {
    id: 7,
    senderName: "You",
    senderAvatar: "",
    senderAvatarAlt: "",
    content: "Absolutely! I\'ll implement those changes and send you an updated version by tomorrow. Thanks for the detailed feedback!",
    timestamp: new Date(Date.now() - 900000),
    status: "read",
    isOwn: true,
    reactions: [{ emoji: "❤️", count: 1 }]
  },
  {
    id: 8,
    senderName: "Sarah Johnson",
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    senderAvatarAlt: "Professional headshot of blonde woman with warm smile wearing navy blazer",
    content: "Thanks for the update! The designs look great.",
    timestamp: new Date(Date.now() - 300000),
    status: "delivered",
    isOwn: false,
    reactions: []
  }];


  const [messages, setMessages] = useState(mockMessages);

  const filteredConversations = conversations?.filter((conv) =>
  conv?.clientName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
  conv?.lastMessagePreview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: messages?.length + 1,
      senderName: "You",
      senderAvatar: "",
      senderAvatarAlt: "",
      content: messageData?.content,
      timestamp: new Date(),
      status: "sent",
      isOwn: true,
      attachment: messageData?.attachments?.length > 0 ? {
        type: "file",
        name: messageData?.attachments?.[0]?.name,
        size: messageData?.attachments?.[0]?.size,
        url: "#"
      } : null,
      reactions: []
    };

    setMessages([...messages, newMessage]);
  };

  const handleSelectTemplate = (templateContent) => {
    setMessageText(templateContent);
  };

  useEffect(() => {
    if (conversations?.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations?.[0]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <header className="sticky top-0 z-30 bg-card border-b border-border shadow-elevation-sm">
          <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="MessageSquare" size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-semibold text-foreground truncate">
                  Client Communication
                </h1>
                <p className="text-sm text-muted-foreground font-caption truncate">
                  Manage conversations and client interactions
                </p>
              </div>
            </div>
            <UserProfileDropdown />
          </div>
        </header>

        <main className="px-4 md:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation />

          <CommunicationStats stats={communicationStats} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-card border border-border rounded-lg shadow-elevation-md h-[calc(100vh-320px)] lg:h-[calc(100vh-280px)] flex flex-col">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Plus"
                      title="New conversation" />

                  </div>

                  <div className="relative">
                    <Icon
                      name="Search"
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="search"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="pl-10" />

                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-custom">
                  {filteredConversations?.map((conversation) =>
                  <ConversationListItem
                    key={conversation?.id}
                    conversation={conversation}
                    isActive={selectedConversation?.id === conversation?.id}
                    onClick={() => setSelectedConversation(conversation)} />

                  )}

                  {filteredConversations?.length === 0 &&
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <Icon name="MessageSquareOff" size={48} className="text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground font-caption">
                        No conversations found
                      </p>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              {selectedConversation ?
              <div className="bg-card border border-border rounded-lg shadow-elevation-md h-[calc(100vh-320px)] lg:h-[calc(100vh-280px)] flex flex-col">
                  <ConversationHeader
                  conversation={selectedConversation}
                  onViewProfile={() => console.log('View profile')}
                  onStartCall={() => console.log('Start call')}
                  onMoreOptions={() => console.log('More options')} />


                  <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-4">
                    {messages?.map((message) =>
                  <MessageBubble key={message?.id} message={message} isOwn={message?.isOwn} />
                  )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="border-t border-border">
                    <div className="p-3 bg-muted/30 flex items-center gap-2">
                      <Button
                      variant="ghost"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                      onClick={() => setShowTemplates(true)}>

                        Templates
                      </Button>
                      <Button
                      variant="ghost"
                      size="sm"
                      iconName="Smile"
                      iconPosition="left">

                        Emoji
                      </Button>
                    </div>
                    <MessageInput
                    onSendMessage={handleSendMessage}
                    onFileUpload={(files) => console.log('Files uploaded:', files)} />

                  </div>
                </div> :

              <div className="bg-card border border-border rounded-lg shadow-elevation-md h-[calc(100vh-320px)] lg:h-[calc(100vh-280px)] flex items-center justify-center">
                  <div className="text-center p-8">
                    <Icon name="MessageSquare" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-muted-foreground font-caption">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>
      {showTemplates &&
      <MessageTemplateSelector
        onSelectTemplate={handleSelectTemplate}
        onClose={() => setShowTemplates(false)} />

      }
    </div>);

};

export default ClientCommunication;