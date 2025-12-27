import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectOverviewCard = ({ project }) => {
  const getStatusColor = (status) => {
    const colors = {
      'In Progress': 'bg-primary/10 text-primary border-primary/20',
      'On Hold': 'bg-warning/10 text-warning border-warning/20',
      'Completed': 'bg-success/10 text-success border-success/20',
      'Planning': 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-error',
      'Medium': 'text-warning',
      'Low': 'text-success'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-elevation-lg">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6 mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FolderKanban" size={24} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2 line-clamp-2">
                {project?.name}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                {project?.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium border ${getStatusColor(project?.status)}`}>
              <Icon name="Activity" size={14} />
              {project?.status}
            </span>
            <span className={`inline-flex items-center gap-2 text-xs md:text-sm font-medium ${getPriorityColor(project?.priority)}`}>
              <Icon name="Flag" size={14} />
              {project?.priority} Priority
            </span>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <Icon name="Calendar" size={14} />
              Due: {project?.dueDate}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <span className="text-lg md:text-xl font-semibold text-primary">{project?.progress}%</span>
          </div>
          <div className="w-full lg:w-48 bg-muted rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-smooth"
              style={{ width: `${project?.progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">Total Tasks</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">{project?.totalTasks}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-success">{project?.completedTasks}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
            <span className="text-sm text-muted-foreground">Hours Logged</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">{project?.hoursLogged}h</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Target" size={20} color="var(--color-accent)" />
            <span className="text-sm text-muted-foreground">Milestones</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">
            {project?.completedMilestones}/{project?.totalMilestones}
          </p>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Team Members</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {project?.teamMembers?.slice(0, 4)?.map((member, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-card overflow-hidden bg-muted"
                    title={member?.name}
                  >
                    <Image
                      src={member?.avatar}
                      alt={member?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {project?.teamMembers?.length > 4 && (
                <span className="text-sm text-muted-foreground font-medium">
                  +{project?.teamMembers?.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Client:</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                <Image
                  src={project?.client?.avatar}
                  alt={project?.client?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-foreground">{project?.client?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;