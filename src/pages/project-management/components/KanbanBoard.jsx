import React from 'react';
import Icon from '../../../components/AppIcon';
import TaskCard from './TaskCard';


const KanbanBoard = ({ tasks, onStatusChange, onEdit, onDelete, onAddTask }) => {
  const columns = [
    { id: 'To Do', title: 'To Do', icon: 'Circle', color: 'text-muted-foreground' },
    { id: 'In Progress', title: 'In Progress', icon: 'Clock', color: 'text-primary' },
    { id: 'Review', title: 'Review', icon: 'Eye', color: 'text-warning' },
    { id: 'Completed', title: 'Completed', icon: 'CheckCircle2', color: 'text-success' }
  ];

  const getTasksByStatus = (status) => {
    return tasks?.filter(task => task?.status === status);
  };

  return (
    <div className="overflow-x-auto scrollbar-custom">
      <div className="flex gap-4 md:gap-6 min-w-max lg:min-w-0 pb-4">
        {columns?.map((column) => {
          const columnTasks = getTasksByStatus(column?.id);
          
          return (
            <div 
              key={column?.id} 
              className="flex-1 min-w-[280px] md:min-w-[320px] lg:min-w-0 bg-muted/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name={column?.icon} size={18} className={column?.color} />
                  <h3 className="text-sm md:text-base font-semibold text-foreground">
                    {column?.title}
                  </h3>
                  <span className="px-2 py-0.5 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                    {columnTasks?.length}
                  </span>
                </div>
                <button
                  onClick={() => onAddTask(column?.id)}
                  className="p-1 hover:bg-muted rounded transition-smooth"
                  title={`Add task to ${column?.title}`}
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-custom">
                {columnTasks?.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Inbox" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No tasks</p>
                  </div>
                ) : (
                  columnTasks?.map((task) => (
                    <TaskCard
                      key={task?.id}
                      task={task}
                      onStatusChange={onStatusChange}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;