import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    const colors = {
      'On Track': 'bg-success/10 text-success border-success/20',
      'At Risk': 'bg-warning/10 text-warning border-warning/20',
      'Delayed': 'bg-error/10 text-error border-error/20',
      'Completed': 'bg-primary/10 text-primary border-primary/20'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1 truncate">{project?.name}</h4>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">{project?.client}</p>
        </div>
        <span className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium border whitespace-nowrap ${getStatusColor(project?.status)}`}>
          {project?.status}
        </span>
      </div>
      <div className="mb-3 md:mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm text-muted-foreground font-caption">Progress</span>
          <span className="text-xs md:text-sm font-medium text-foreground font-caption">{project?.progress}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-smooth ${getProgressColor(project?.progress)}`}
            style={{ width: `${project?.progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-xs md:text-sm text-muted-foreground font-caption whitespace-nowrap">{project?.dueDate}</span>
        </div>
        <div className="flex items-center -space-x-2">
          {project?.team?.map((member, index) => (
            <div key={index} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-card overflow-hidden bg-muted">
              <Image src={member?.avatar} alt={member?.avatarAlt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;