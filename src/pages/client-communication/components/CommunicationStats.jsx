import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunicationStats = ({ stats }) => {
  const statItems = [
    {
      label: "Active Conversations",
      value: stats?.activeConversations,
      icon: "MessageSquare",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Avg Response Time",
      value: stats?.avgResponseTime,
      icon: "Clock",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      label: "Messages Today",
      value: stats?.messagesToday,
      icon: "Send",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      label: "Pending Responses",
      value: stats?.pendingResponses,
      icon: "AlertCircle",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div 
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-md transition-smooth"
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-semibold text-foreground">{item?.value}</p>
              <p className="text-sm text-muted-foreground font-caption truncate">{item?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunicationStats;