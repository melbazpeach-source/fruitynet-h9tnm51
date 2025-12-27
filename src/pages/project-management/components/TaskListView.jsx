import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import TaskCard from './TaskCard';

import Select from '../../../components/ui/Select';

const TaskListView = ({ tasks, onStatusChange, onEdit, onDelete }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Review', label: 'Review' },
    { value: 'Completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'title', label: 'Title' }
  ];

  const filteredTasks = tasks?.filter(task => {
    const statusMatch = filterStatus === 'all' || task?.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task?.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const sortedTasks = [...filteredTasks]?.sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder?.[a?.priority] - priorityOrder?.[b?.priority];
      case 'status':
        return a?.status?.localeCompare(b?.status);
      case 'title':
        return a?.title?.localeCompare(b?.title);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by status"
          />
          <Select
            options={priorityOptions}
            value={filterPriority}
            onChange={setFilterPriority}
            placeholder="Filter by priority"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      <div className="space-y-3">
        {sortedTasks?.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or create a new task
            </p>
          </div>
        ) : (
          sortedTasks?.map((task) => (
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
};

export default TaskListView;