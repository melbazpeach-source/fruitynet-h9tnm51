import React from 'react';
import Icon from '../../../components/AppIcon';

const MilestoneTimeline = ({ milestones }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-success border-success',
      'In Progress': 'bg-primary border-primary',
      'Upcoming': 'bg-muted border-border'
    };
    return colors?.[status] || 'bg-muted border-border';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Completed': 'CheckCircle2',
      'In Progress': 'Clock',
      'Upcoming': 'Circle'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="Target" size={20} color="var(--color-primary)" />
        Project Milestones
      </h3>
      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6 md:space-y-8">
          {milestones?.map((milestone, index) => (
            <div key={milestone?.id} className="relative pl-12 md:pl-16">
              <div className={`absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-4 ${getStatusColor(milestone?.status)} flex items-center justify-center`}>
                <Icon 
                  name={getStatusIcon(milestone?.status)} 
                  size={16} 
                  color={milestone?.status === 'Completed' ? 'var(--color-success-foreground)' : milestone?.status === 'In Progress' ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'}
                />
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                  <h4 className="text-sm md:text-base font-semibold text-foreground">
                    {milestone?.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded ${milestone?.status === 'Completed' ? 'bg-success/10 text-success' : milestone?.status === 'In Progress' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {milestone?.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {milestone?.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>Due: {milestone?.dueDate}</span>
                  </div>

                  {milestone?.completedDate && (
                    <div className="flex items-center gap-1 text-success">
                      <Icon name="CheckCircle2" size={14} />
                      <span>Completed: {milestone?.completedDate}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="CheckSquare" size={14} />
                    <span>{milestone?.tasksCompleted}/{milestone?.totalTasks} tasks</span>
                  </div>
                </div>

                {milestone?.deliverables && milestone?.deliverables?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Deliverables:</p>
                    <ul className="space-y-1">
                      {milestone?.deliverables?.map((deliverable, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-foreground">
                          <Icon 
                            name={deliverable?.completed ? 'CheckCircle2' : 'Circle'} 
                            size={12} 
                            color={deliverable?.completed ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                          />
                          <span className={deliverable?.completed ? 'line-through text-muted-foreground' : ''}>
                            {deliverable?.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestoneTimeline;