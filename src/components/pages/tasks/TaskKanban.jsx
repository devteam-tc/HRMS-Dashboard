import React, { useState } from 'react';
import { Search, Filter, Plus, User, Calendar, Flag, Paperclip, MessageCircle, Eye, MoreHorizontal } from 'lucide-react';

export const TaskKanban = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('all');
  const [draggedTask, setDraggedTask] = useState(null);

  const kanbanColumns = [
    { id: 'todo', title: 'To Do', color: '#666666', count: 0 },
    { id: 'in-progress', title: 'In Progress', color: '#05A7CC', count: 0 },
    { id: 'review', title: 'Review', color: '#FFC107', count: 0 },
    { id: 'done', title: 'Done', color: '#4CAF50', count: 0 }
  ];

  const tasks = [
    {
      id: 'TASK-001',
      title: 'User Authentication System',
      description: 'Implement OAuth 2.0 with social login options',
      status: 'todo',
      priority: 'high',
      assignee: { name: 'John Doe', avatar: 'JD', color: '#EF5226' },
      project: 'E-commerce Platform',
      dueDate: '2024-03-25',
      tags: ['Frontend', 'Security'],
      attachments: 2,
      comments: 5,
      estimatedHours: 16,
      completedHours: 0
    },
    {
      id: 'TASK-002',
      title: 'Database Schema Design',
      description: 'Design and implement the database schema for user management',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'Sarah Wilson', avatar: 'SW', color: '#05A7CC' },
      project: 'E-commerce Platform',
      dueDate: '2024-03-22',
      tags: ['Backend', 'Database'],
      attachments: 1,
      comments: 3,
      estimatedHours: 12,
      completedHours: 8
    },
    {
      id: 'TASK-003',
      title: 'Payment Gateway Integration',
      description: 'Integrate Stripe payment gateway with error handling',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Mike Johnson', avatar: 'MJ', color: '#4CAF50' },
      project: 'E-commerce Platform',
      dueDate: '2024-03-28',
      tags: ['Backend', 'API'],
      attachments: 0,
      comments: 2,
      estimatedHours: 20,
      completedHours: 12
    },
    {
      id: 'TASK-004',
      title: 'Responsive UI Components',
      description: 'Create reusable React components for mobile and desktop',
      status: 'review',
      priority: 'medium',
      assignee: { name: 'Emma Brown', avatar: 'EB', color: '#9C27B0' },
      project: 'Mobile App',
      dueDate: '2024-03-20',
      tags: ['Frontend', 'UI/UX'],
      attachments: 3,
      comments: 8,
      estimatedHours: 24,
      completedHours: 24
    },
    {
      id: 'TASK-005',
      title: 'API Documentation',
      description: 'Complete API documentation using Swagger',
      status: 'done',
      priority: 'low',
      assignee: { name: 'David Lee', avatar: 'DL', color: '#FFC107' },
      project: 'API Gateway',
      dueDate: '2024-03-15',
      tags: ['Documentation', 'Backend'],
      attachments: 1,
      comments: 4,
      estimatedHours: 8,
      completedHours: 8
    },
    {
      id: 'TASK-006',
      title: 'Unit Testing Suite',
      description: 'Write comprehensive unit tests for core modules',
      status: 'todo',
      priority: 'medium',
      assignee: { name: 'Lisa Chen', avatar: 'LC', color: '#E91E63' },
      project: 'API Gateway',
      dueDate: '2024-03-30',
      tags: ['Testing', 'QA'],
      attachments: 0,
      comments: 1,
      estimatedHours: 16,
      completedHours: 0
    },
    {
      id: 'TASK-007',
      title: 'Performance Optimization',
      description: 'Optimize database queries and API response times',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'Tom Wilson', avatar: 'TW', color: '#795548' },
      project: 'Data Analytics',
      dueDate: '2024-03-26',
      tags: ['Performance', 'Backend'],
      attachments: 2,
      comments: 6,
      estimatedHours: 14,
      completedHours: 6
    },
    {
      id: 'TASK-008',
      title: 'Security Audit',
      description: 'Conduct security audit and fix vulnerabilities',
      status: 'review',
      priority: 'high',
      assignee: { name: 'Anna Miller', avatar: 'AM', color: '#607D8B' },
      project: 'Security System',
      dueDate: '2024-03-24',
      tags: ['Security', 'Audit'],
      attachments: 4,
      comments: 12,
      estimatedHours: 18,
      completedHours: 18
    }
  ];

  // Update column counts
  kanbanColumns.forEach(column => {
    column.count = tasks.filter(task => task.status === column.id).length;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#EF5226',
      'medium': '#FFC107',
      'low': '#4CAF50'
    };
    return colors[priority] || '#666666';
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== columnId) {
      // Here you would update the task status
      console.log(`Moving task ${draggedTask.id} to ${columnId}`);
      setDraggedTask(null);
    }
  };

  const TaskCard = ({ task }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      className="neu-card p-4 rounded-xl mb-4 cursor-move hover:shadow-lg transition-all duration-200 group border-l-4"
      style={{ borderLeftColor: getPriorityColor(task.priority) }}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-[#333333] text-sm mb-1 group-hover:text-[#EF5226] transition-colors">
            {task.title}
          </h4>
          <span className="text-xs text-[#666666] bg-[#E8EBEF] px-2 py-1 rounded">
            {task.id}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onNavigate('task-details', { taskId: task.id })}
            className="neu-small p-1 rounded-lg hover:text-[#EF5226] transition-colors"
          >
            <Eye size={12} />
          </button>
        </div>
      </div>

      {/* Task Description */}
      <p className="text-xs text-[#666666] mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Progress Bar (for in-progress tasks) */}
      {task.status === 'in-progress' && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-[#666666] mb-1">
            <span>Progress</span>
            <span>{task.completedHours}/{task.estimatedHours}h</span>
          </div>
          <div className="neu-card-inset rounded-lg p-1">
            <div 
              className="h-2 neu-secondary rounded-lg transition-all duration-300"
              style={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-[#E8EBEF] text-[#666666] rounded text-xs">
            {tag}
          </span>
        ))}
        {task.tags.length > 2 && (
          <span className="px-2 py-1 bg-[#E8EBEF] text-[#666666] rounded text-xs">
            +{task.tags.length - 2}
          </span>
        )}
      </div>

      {/* Task Meta */}
      <div className="flex items-center justify-between text-xs text-[#666666] mb-3">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          {task.dueDate}
        </div>
        <div className="flex items-center space-x-2">
          <Flag size={12} style={{ color: getPriorityColor(task.priority) }} />
          <span style={{ color: getPriorityColor(task.priority) }}>
            {task.priority}
          </span>
        </div>
      </div>

      {/* Task Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="neu-small w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: task.assignee.color }}
            title={task.assignee.name}
          >
            {task.assignee.avatar}
          </div>
          <span className="text-xs text-[#666666]">{task.assignee.name}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-[#666666]">
          {task.attachments > 0 && (
            <div className="flex items-center">
              <Paperclip size={12} className="mr-1" />
              {task.attachments}
            </div>
          )}
          <div className="flex items-center">
            <MessageCircle size={12} className="mr-1" />
            {task.comments}
          </div>
        </div>
      </div>
    </div>
  );

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === 'all' || task.project === selectedProject;
    return matchesSearch && matchesProject;
  });

  const projects = [...new Set(tasks.map(task => task.project))];

  // Layout: Kanban Board with Drag & Drop
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Status (Kanban)</h1>
        <p className="text-[#666666]">Manage tasks with drag-and-drop kanban board</p>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#EF5226]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 neu-input rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
              />
            </div>

            {/* Project Filter */}
            <select 
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="all">All Projects</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button className="neu-button px-6 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
            <button 
              onClick={() => onNavigate('add-new-task')}
              className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
            >
              <Plus size={16} className="mr-2" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {kanbanColumns.map((column) => (
          <div 
            key={column.id} 
            className="neu-card p-6 rounded-2xl h-fit"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: column.color }}
                ></div>
                <h3 className="text-lg font-bold text-[#333333]">{column.title}</h3>
              </div>
              <div 
                className="px-3 py-1 rounded-full text-white text-sm font-medium neu-small"
                style={{ backgroundColor: column.color }}
              >
                {filteredTasks.filter(task => task.status === column.id).length}
              </div>
            </div>

            {/* Tasks in Column */}
            <div className="space-y-4 min-h-96">
              {filteredTasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              
              {/* Empty State */}
              {filteredTasks.filter(task => task.status === column.id).length === 0 && (
                <div className="neu-card-inset p-8 rounded-xl text-center">
                  <div className="text-[#666666] mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#E8EBEF] flex items-center justify-center mx-auto mb-3">
                      <Plus size={24} className="text-[#666666]" />
                    </div>
                    <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                    <p className="text-xs mt-1">Drag tasks here or create new ones</p>
                  </div>
                </div>
              )}
            </div>

            {/* Add Task Button */}
            <button 
              onClick={() => onNavigate('add-new-task', { defaultStatus: column.id })}
              className="w-full mt-6 neu-button py-3 rounded-xl flex items-center justify-center hover:text-[#EF5226] transition-colors group"
            >
              <Plus size={16} className="mr-2 group-hover:text-[#EF5226]" />
              Add Task to {column.title}
            </button>
          </div>
        ))}
      </div>

      {/* Kanban Stats */}
      <div className="mt-8 neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Board Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#333333] mb-1">{filteredTasks.length}</div>
            <div className="text-[#666666] text-sm">Total Tasks</div>
          </div>
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#05A7CC] mb-1">
              {filteredTasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-[#666666] text-sm">In Progress</div>
          </div>
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#4CAF50] mb-1">
              {filteredTasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-[#666666] text-sm">Completed</div>
          </div>
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#EF5226] mb-1">
              {filteredTasks.filter(t => t.priority === 'high').length}
            </div>
            <div className="text-[#666666] text-sm">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};