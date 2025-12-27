import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-error/10 text-error border-error/20',
      'Medium': 'bg-warning/10 text-warning border-warning/20',
      'Low': 'bg-success/10 text-success border-success/20'
    };
    return colors?.[priority] || 'bg-muted text-muted-foreground border-border';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'To Do': 'Circle',
      'In Progress': 'Clock',
      'Review': 'Eye',
      'Completed': 'CheckCircle2'
    };
    return icons?.[status] || 'Circle';
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'Completed';

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => onStatusChange(task?.id, task?.status)}
            className="flex-shrink-0 mt-1"
          >
            <Icon 
              name={getStatusIcon(task?.status)} 
              size={20} 
              color={task?.status === 'Completed' ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
          </button>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-medium text-foreground mb-1 line-clamp-2">
              {task?.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
              {task?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-smooth"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
          <Icon name="Flag" size={12} />
          {task?.priority}
        </span>

        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${isOverdue ? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'}`}>
          <Icon name="Calendar" size={12} />
          {task?.dueDate}
        </span>

        {task?.timeLogged > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
            <Icon name="Clock" size={12} />
            {task?.timeLogged}h
          </span>
        )}

        {task?.attachments > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
            <Icon name="Paperclip" size={12} />
            {task?.attachments}
          </span>
        )}

        {task?.comments > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
            <Icon name="MessageSquare" size={12} />
            {task?.comments}
          </span>
        )}
      </div>
      {isExpanded && (
        <div className="border-t border-border pt-3 mt-3 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Assigned To:</p>
            <div className="flex items-center gap-2">
              {task?.assignedTo?.map((member, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={member?.avatar}
                      alt={member?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-foreground">{member?.name}</span>
                </div>
              ))}
            </div>
          </div>

          {task?.subtasks && task?.subtasks?.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Subtasks ({task?.subtasks?.filter(st => st?.completed)?.length}/{task?.subtasks?.length})
              </p>
              <div className="space-y-2">
                {task?.subtasks?.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon 
                      name={subtask?.completed ? 'CheckSquare' : 'Square'} 
                      size={16} 
                      color={subtask?.completed ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                    />
                    <span className={`text-xs ${subtask?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {subtask?.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => onEdit(task?.id)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => onDelete(task?.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex -space-x-2">
          {task?.assignedTo?.slice(0, 3)?.map((member, index) => (
            <div 
              key={index}
              className="w-6 h-6 rounded-full border-2 border-card overflow-hidden bg-muted"
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
        {task?.assignedTo?.length > 3 && (
          <span className="text-xs text-muted-foreground">+{task?.assignedTo?.length - 3}</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;