import React, { useState } from 'react';
import { Plus, Filter, Search, Users, Calendar, Flag, MessageSquare, Paperclip, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const initialTasks = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create wireframes and high-fidelity mockups for the new homepage design',
    status: 'todo',
    priority: 'high',
    assignees: ['Alice Johnson', 'Bob Smith'],
    dueDate: '2024-02-20',
    tags: ['Design', 'UI/UX'],
    comments: 3,
    attachments: 2,
    project: 'Website Redesign',
    completedSubtasks: 2,
    totalSubtasks: 5
  },
  {
    id: '2',
    title: 'User Authentication System',
    description: 'Implement secure login and registration functionality',
    status: 'in-progress',
    priority: 'high',
    assignees: ['David Brown', 'Emma Garcia'],
    dueDate: '2024-02-25',
    tags: ['Backend', 'Security'],
    comments: 7,
    attachments: 1,
    project: 'Mobile App Development',
    completedSubtasks: 3,
    totalSubtasks: 4
  },
  {
    id: '3',
    title: 'Content Strategy Planning',
    description: 'Develop content calendar and strategy for Q1 campaign',
    status: 'todo',
    priority: 'medium',
    assignees: ['Carol Davis'],
    dueDate: '2024-02-18',
    tags: ['Marketing', 'Content'],
    comments: 1,
    attachments: 0,
    project: 'Marketing Campaign Q1',
    completedSubtasks: 0,
    totalSubtasks: 3
  },
  {
    id: '4',
    title: 'Database Schema Migration',
    description: 'Complete migration of user data to new database structure',
    status: 'done',
    priority: 'high',
    assignees: ['Frank Wilson'],
    dueDate: '2024-02-10',
    tags: ['Database', 'Backend'],
    comments: 5,
    attachments: 3,
    project: 'Database Migration',
    completedSubtasks: 6,
    totalSubtasks: 6
  },
  {
    id: '5',
    title: 'Mobile App Testing',
    description: 'Conduct comprehensive testing on iOS and Android devices',
    status: 'in-progress',
    priority: 'medium',
    assignees: ['Grace Lee', 'Henry Clark'],
    dueDate: '2024-03-05',
    tags: ['Testing', 'Mobile'],
    comments: 2,
    attachments: 1,
    project: 'Mobile App Development',
    completedSubtasks: 4,
    totalSubtasks: 8
  },
  {
    id: '6',
    title: 'Security Vulnerability Assessment',
    description: 'Perform security audit and vulnerability testing',
    status: 'todo',
    priority: 'high',
    assignees: ['Ivy Davis', 'Jack Miller'],
    dueDate: '2024-02-28',
    tags: ['Security', 'Audit'],
    comments: 0,
    attachments: 0,
    project: 'Security Audit',
    completedSubtasks: 0,
    totalSubtasks: 4
  },
  {
    id: '7',
    title: 'API Documentation',
    description: 'Create comprehensive API documentation for developers',
    status: 'done',
    priority: 'medium',
    assignees: ['Kate Wilson'],
    dueDate: '2024-02-12',
    tags: ['Documentation', 'API'],
    comments: 3,
    attachments: 2,
    project: 'Mobile App Development',
    completedSubtasks: 3,
    totalSubtasks: 3
  },
  {
    id: '8',
    title: 'Training Module Development',
    description: 'Develop interactive training modules for employee onboarding',
    status: 'in-progress',
    priority: 'low',
    assignees: ['Liam Anderson', 'Mia Thompson'],
    dueDate: '2024-04-10',
    tags: ['Training', 'Development'],
    comments: 1,
    attachments: 0,
    project: 'Employee Training Platform',
    completedSubtasks: 1,
    totalSubtasks: 7
  }
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-[#666666]' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-[#05A7CC]' },
  { id: 'done', title: 'Done', color: 'bg-[#4CAF50]' }
];

export const TaskKanbanBoard = ({ onNavigate }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = selectedProject === 'all' || task.project === selectedProject;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesProject && matchesPriority;
  });

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === draggedTask.id ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF5226] text-white';
      case 'medium':
        return 'bg-[#FFC107] text-white';
      case 'low':
        return 'bg-[#4CAF50] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const uniqueProjects = [...new Set(tasks.map(task => task.project))];

  const TaskCard = ({ task }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
      className="neu-card p-4 rounded-2xl mb-4 cursor-move hover:scale-105 transition-transform duration-200"
      onClick={() => onNavigate('kanban-task-expanded', task.id)}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-[#333333] text-sm leading-tight flex-1 mr-2">
          {task.title}
        </h4>
        <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority.toUpperCase()}
        </div>
      </div>

      {/* Task Description */}
      <p className="text-[#666666] text-xs leading-relaxed mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.slice(0, 2).map((tag, index) => (
          <div key={index} className="neu-card-inset px-2 py-1 rounded-lg">
            <span className="text-xs text-[#05A7CC] font-medium">{tag}</span>
          </div>
        ))}
        {task.tags.length > 2 && (
          <div className="neu-card-inset px-2 py-1 rounded-lg">
            <span className="text-xs text-[#666666]">+{task.tags.length - 2}</span>
          </div>
        )}
      </div>

      {/* Subtasks Progress */}
      {task.totalSubtasks > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#666666]">Subtasks</span>
            <span className="text-xs font-medium text-[#333333]">
              {task.completedSubtasks}/{task.totalSubtasks}
            </span>
          </div>
          <div className="neu-card-inset rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
              style={{ width: `${(task.completedSubtasks / task.totalSubtasks) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Due Date */}
      <div className="mb-3">
        <div className={`neu-card-inset p-2 rounded-lg flex items-center space-x-2 ${
          isOverdue(task.dueDate) ? 'bg-[#FFEBEE]' : ''
        }`}>
          <Calendar className={`w-3 h-3 ${isOverdue(task.dueDate) ? 'text-[#EF5226]' : 'text-[#666666]'}`} />
          <span className={`text-xs ${isOverdue(task.dueDate) ? 'text-[#EF5226] font-medium' : 'text-[#666666]'}`}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
          {isOverdue(task.dueDate) && (
            <span className="text-xs text-[#EF5226] font-medium">OVERDUE</span>
          )}
        </div>
      </div>

      {/* Task Footer */}
      <div className="flex items-center justify-between">
        {/* Assignees */}
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((assignee, index) => (
            <Avatar key={index} className="w-6 h-6 border-2 border-[#ECF0F3]">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                {assignee.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ))}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-[#E8EBEF] border-2 border-[#ECF0F3] flex items-center justify-center">
              <span className="text-xs text-[#666666]">+{task.assignees.length - 3}</span>
            </div>
          )}
        </div>

        {/* Comments and Attachments */}
        <div className="flex items-center space-x-2">
          {task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3 text-[#666666]" />
              <span className="text-xs text-[#666666]">{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="w-3 h-3 text-[#666666]" />
              <span className="text-xs text-[#666666]">{task.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Status Board</h1>
            <p className="text-[#666666]">Drag and drop tasks between columns to update their status</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('add-new-task')}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search tasks by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>

          {/* Project Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Projects</option>
                {uniqueProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{filteredTasks.length}</div>
          <div className="text-[#666666]">Total Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#666666] mb-2">{getTasksByStatus('todo').length}</div>
          <div className="text-[#666666]">To Do</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">{getTasksByStatus('in-progress').length}</div>
          <div className="text-[#666666]">In Progress</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">{getTasksByStatus('done').length}</div>
          <div className="text-[#666666]">Completed</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((column) => (
          <div
            key={column.id}
            className="neu-card p-6 rounded-3xl h-fit min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${column.color}`}></div>
                <h3 className="text-xl font-bold text-[#333333]">{column.title}</h3>
                <div className="neu-card-inset px-3 py-1 rounded-xl">
                  <span className="text-sm font-medium text-[#666666]">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('add-new-task', { defaultStatus: column.id })}
                className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {getTasksByStatus(column.id).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {getTasksByStatus(column.id).length === 0 && (
                <div className="neu-card-inset p-8 rounded-2xl text-center">
                  <div className="text-[#666666]">
                    No tasks in {column.title.toLowerCase()}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Task Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="neu-small w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Flag className="w-8 h-8 text-[#EF5226]" />
            </div>
            <div className="text-2xl font-bold text-[#333333] mb-2">
              {filteredTasks.filter(task => task.priority === 'high').length}
            </div>
            <div className="text-[#666666]">High Priority Tasks</div>
          </div>
          
          <div className="text-center">
            <div className="neu-small w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-[#FFC107]" />
            </div>
            <div className="text-2xl font-bold text-[#333333] mb-2">
              {filteredTasks.filter(task => isOverdue(task.dueDate)).length}
            </div>
            <div className="text-[#666666]">Overdue Tasks</div>
          </div>
          
          <div className="text-center">
            <div className="neu-small w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#05A7CC]" />
            </div>
            <div className="text-2xl font-bold text-[#333333] mb-2">
              {[...new Set(filteredTasks.flatMap(task => task.assignees))].length}
            </div>
            <div className="text-[#666666]">Team Members</div>
          </div>
        </div>
      </div>
    </div>
  );
};