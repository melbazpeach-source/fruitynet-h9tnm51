import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'payment': 'DollarSign',
      'message': 'MessageSquare',
      'project': 'FolderKanban',
      'client': 'Users',
      'alert': 'AlertCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'payment': 'bg-success/10 text-success',
      'message': 'bg-primary/10 text-primary',
      'project': 'bg-accent/10 text-accent',
      'client': 'bg-secondary/10 text-secondary',
      'alert': 'bg-warning/10 text-warning'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 hover:bg-muted/50 rounded-lg transition-smooth">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={16} className="md:w-5 md:h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base text-foreground font-medium mb-1">{activity?.title}</p>
        <p className="text-xs md:text-sm text-muted-foreground font-caption line-clamp-2">{activity?.description}</p>
        <span className="text-xs text-muted-foreground font-caption mt-1 inline-block">{formatTime(activity?.timestamp)}</span>
      </div>
      {activity?.actionRequired && (
        <div className="flex-shrink-0">
          <span className="w-2 h-2 bg-error rounded-full inline-block" />
        </div>
      )}
    </div>
  );
};

export default ActivityItem;