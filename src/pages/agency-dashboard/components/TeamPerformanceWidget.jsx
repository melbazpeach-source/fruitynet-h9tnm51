import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamPerformanceWidget = ({ teamMembers }) => {
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">Team Performance</h3>
          <p className="text-sm md:text-base text-muted-foreground font-caption">Current week overview</p>
        </div>
        <Icon name="Users" size={20} className="text-primary md:w-6 md:h-6" />
      </div>
      <div className="space-y-3 md:space-y-4">
        {teamMembers?.map((member) => (
          <div key={member?.id} className="flex items-center gap-3 md:gap-4 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image src={member?.avatar} alt={member?.avatarAlt} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground truncate">{member?.name}</p>
              <p className="text-xs md:text-sm text-muted-foreground font-caption">{member?.role}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`text-base md:text-lg font-semibold ${getPerformanceColor(member?.performanceScore)}`}>
                {member?.performanceScore}%
              </p>
              <p className="text-xs text-muted-foreground font-caption whitespace-nowrap">{member?.tasksCompleted} tasks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPerformanceWidget;