import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, Eye, Edit, Trash2, CheckCircle, Clock, Flag, Users, Calendar, ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const projectData = {
  id: '1',
  name: 'Website Redesign',
  manager: 'John Doe',
  status: 'on-track',
  progress: 75,
  deadline: '2024-02-15',
  description: 'Complete redesign of company website with modern UI/UX'
};

const tasks = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create wireframes and high-fidelity mockups for the new homepage design',
    status: 'in-progress',
    priority: 'high',
    assignees: ['Alice Johnson', 'Bob Smith'],
    dueDate: '2024-02-20',
    progress: 60,
    subtasks: { completed: 3, total: 5 },
    tags: ['Design', 'UI/UX'],
    comments: 5,
    attachments: 2
  },
  {
    id: '2',
    title: 'Frontend Development Setup',
    description: 'Set up development environment and project structure',
    status: 'done',
    priority: 'high',
    assignees: ['Bob Smith'],
    dueDate: '2024-02-12',
    progress: 100,
    subtasks: { completed: 4, total: 4 },
    tags: ['Development', 'Setup'],
    comments: 3,
    attachments: 1
  },
  {
    id: '3',
    title: 'Content Strategy Planning',
    description: 'Develop content strategy and information architecture',
    status: 'todo',
    priority: 'medium',
    assignees: ['Carol Davis'],
    dueDate: '2024-02-18',
    progress: 0,
    subtasks: { completed: 0, total: 3 },
    tags: ['Content', 'Strategy'],
    comments: 2,
    attachments: 0
  },
  {
    id: '4',
    title: 'User Testing & Feedback',
    description: 'Conduct user testing sessions and gather feedback',
    status: 'todo',
    priority: 'medium',
    assignees: ['Alice Johnson', 'Emma Garcia'],
    dueDate: '2024-02-25',
    progress: 10,
    subtasks: { completed: 1, total: 8 },
    tags: ['Testing', 'UX'],
    comments: 1,
    attachments: 0
  },
  {
    id: '5',
    title: 'SEO Optimization',
    description: 'Implement SEO best practices and optimize for search engines',
    status: 'todo',
    priority: 'low',
    assignees: ['David Brown'],
    dueDate: '2024-03-01',
    progress: 0,
    subtasks: { completed: 0, total: 6 },
    tags: ['SEO', 'Optimization'],
    comments: 0,
    attachments: 1
  },
  {
    id: '6',
    title: 'Performance Optimization',
    description: 'Optimize website performance and loading speeds',
    status: 'in-progress',
    priority: 'high',
    assignees: ['Bob Smith', 'Frank Wilson'],
    dueDate: '2024-02-22',
    progress: 40,
    subtasks: { completed: 2, total: 5 },
    tags: ['Performance', 'Optimization'],
    comments: 4,
    attachments: 3
  },
  {
    id: '7',
    title: 'Cross-browser Testing',
    description: 'Test website compatibility across different browsers',
    status: 'in-progress',
    priority: 'medium',
    assignees: ['Emma Garcia'],
    dueDate: '2024-02-24',
    progress: 25,
    subtasks: { completed: 1, total: 4 },
    tags: ['Testing', 'Compatibility'],
    comments: 2,
    attachments: 0
  },
  {
    id: '8',
    title: 'Documentation & Handover',
    description: 'Create technical documentation and handover materials',
    status: 'todo',
    priority: 'low',
    assignees: ['Carol Davis', 'Bob Smith'],
    dueDate: '2024-03-05',
    progress: 0,
    subtasks: { completed: 0, total: 3 },
    tags: ['Documentation'],
    comments: 0,
    attachments: 0
  }
];

export const ProjectTaskList = ({ projectId, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTasks, setSelectedTasks] = useState([]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesAssignee = selectedAssignee === 'all' || task.assignees.includes(selectedAssignee);
    
    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'title':
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;
      case 'priority':
        const priorities = { 'high': 3, 'medium': 2, 'low': 1 };
        valueA = priorities[a.priority];
        valueB = priorities[b.priority];
        break;
      case 'dueDate':
        valueA = new Date(a.dueDate);
        valueB = new Date(b.dueDate);
        break;
      case 'progress':
        valueA = a.progress;
        valueB = b.progress;
        break;
      default:
        valueA = a[sortBy];
        valueB = b[sortBy];
    }

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedTasks.length === 0) return;
    
    console.log(`Performing ${action} on tasks:`, selectedTasks);
    setSelectedTasks([]);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-[#666666] text-white';
      case 'in-progress':
        return 'bg-[#05A7CC] text-white';
      case 'done':
        return 'bg-[#4CAF50] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-4 h-4 text-[#4CAF50]" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-[#05A7CC]" />;
      default:
        return <Clock className="w-4 h-4 text-[#666666]" />;
    }
  };

  const uniqueAssignees = [...new Set(tasks.flatMap(task => task.assignees))];

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('all-projects')}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">{projectData.name}</h1>
              <p className="text-[#666666]">Project tasks and deliverables</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('task-kanban')}
              className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              Kanban View
            </button>
            <button 
              onClick={() => onNavigate('add-new-task', { projectId })}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="neu-small p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-[#333333] mb-1">{tasks.length}</div>
            <div className="text-[#666666] text-sm">Total Tasks</div>
          </div>
          <div className="neu-small p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-[#4CAF50] mb-1">
              {tasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-[#666666] text-sm">Completed</div>
          </div>
          <div className="neu-small p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-[#05A7CC] mb-1">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-[#666666] text-sm">In Progress</div>
          </div>
          <div className="neu-small p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-[#EF5226] mb-1">
              {tasks.filter(t => isOverdue(t.dueDate) && t.status !== 'done').length}
            </div>
            <div className="text-[#666666] text-sm">Overdue</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
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
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Assignee Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Assignees</option>
                {uniqueAssignees.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#333333] font-medium">
              {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleBulkAction('complete')}
                className="neu-button px-4 py-2 rounded-xl text-[#4CAF50] hover:text-[#45a049]"
              >
                Mark Complete
              </button>
              <button 
                onClick={() => handleBulkAction('reassign')}
                className="neu-button px-4 py-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8]"
              >
                Reassign
              </button>
              <button 
                onClick={() => handleBulkAction('delete')}
                className="neu-button px-4 py-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Table */}
      <div className="neu-card p-8 rounded-3xl">
        {/* Table Header */}
        <div className="neu-small p-4 rounded-2xl mb-4">
          <div className="grid grid-cols-12 gap-4 items-center font-medium text-[#666666] text-sm">
            <div className="col-span-1">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTasks(sortedTasks.map(task => task.id));
                  } else {
                    setSelectedTasks([]);
                  }
                }}
                checked={selectedTasks.length === sortedTasks.length && sortedTasks.length > 0}
                className="rounded"
              />
            </div>
            <div className="col-span-4">
              <button 
                onClick={() => handleSort('title')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Task Title</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-1">
              <button 
                onClick={() => handleSort('priority')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Priority</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-2">
              <button 
                onClick={() => handleSort('dueDate')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Due Date</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <div key={task.id} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Checkbox */}
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => toggleTaskSelection(task.id)}
                    className="rounded"
                  />
                </div>

                {/* Task Title */}
                <div className="col-span-4">
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{task.title}</h3>
                    <p className="text-sm text-[#666666] line-clamp-1">{task.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#666666]">Progress</span>
                        <span className="text-xs font-medium text-[#333333]">{task.progress}%</span>
                      </div>
                      <div className="neu-card-inset rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Subtasks */}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-[#666666]">
                      <span>Subtasks: {task.subtasks.completed}/{task.subtasks.total}</span>
                      {task.comments > 0 && <span>💬 {task.comments}</span>}
                      {task.attachments > 0 && <span>📎 {task.attachments}</span>}
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div className="col-span-1">
                  <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getPriorityColor(task.priority)} text-center`}>
                    {task.priority.toUpperCase()}
                  </div>
                </div>

                {/* Assignees */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      {task.assignees.slice(0, 2).map((assignee, index) => (
                        <Avatar key={index} className="w-6 h-6 border-2 border-[#ECF0F3]">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                            {assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {task.assignees.length > 2 && (
                        <div className="w-6 h-6 rounded-full bg-[#E8EBEF] border-2 border-[#ECF0F3] flex items-center justify-center">
                          <span className="text-xs text-[#666666]">+{task.assignees.length - 2}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-[#666666]">
                      {task.assignees.length === 1 ? task.assignees[0] : `${task.assignees.length} people`}
                    </div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#666666]" />
                    <div>
                      <div className={`font-medium ${isOverdue(task.dueDate) && task.status !== 'done' ? 'text-[#EF5226]' : 'text-[#333333]'}`}>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      {isOverdue(task.dueDate) && task.status !== 'done' && (
                        <div className="text-xs text-[#EF5226] font-medium">OVERDUE</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => onNavigate('task-details', task.id)}
                      className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onNavigate('edit-task', task.id)}
                      className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {task.tags.map((tag, index) => (
                  <div key={index} className="neu-card-inset px-2 py-1 rounded-lg">
                    <span className="text-xs text-[#05A7CC] font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {sortedTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <CheckCircle className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No tasks found</h3>
              <p className="text-[#666666]">Try adjusting your search filters or create a new task.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedTasks.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {sortedTasks.length} of {tasks.length} tasks
            </div>
            <div className="flex items-center space-x-2">
              <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#333333]">
                Previous
              </button>
              <div className="neu-card-inset px-4 py-2 rounded-xl">
                <span className="font-medium text-[#333333]">1</span>
              </div>
              <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#333333]">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};