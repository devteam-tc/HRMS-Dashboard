import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Users, Calendar, TrendingUp, Grid, List, CheckCircle, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const projects = [
  {
    id: '1',
    name: 'Website Redesign',
    manager: 'John Doe',
    taskCount: 24,
    completedTasks: 18,
    progress: 75,
    deadline: '2024-02-15',
    status: 'on-track',
    team: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
    priority: 'high',
    budget: 45000,
    description: 'Complete redesign of company website with modern UI/UX',
    tags: ['UI/UX', 'Frontend', 'Design']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    manager: 'Jane Smith',
    taskCount: 32,
    completedTasks: 20,
    progress: 62,
    deadline: '2024-03-30',
    status: 'on-track',
    team: ['David Brown', 'Emma Garcia', 'Frank Wilson', 'Grace Lee'],
    priority: 'high',
    budget: 120000,
    description: 'Native mobile application for iOS and Android platforms',
    tags: ['Mobile', 'iOS', 'Android']
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    manager: 'Alice Johnson',
    taskCount: 16,
    completedTasks: 12,
    progress: 75,
    deadline: '2024-03-31',
    status: 'at-risk',
    team: ['Henry Clark', 'Ivy Davis'],
    priority: 'medium',
    budget: 25000,
    description: 'Q1 marketing campaign for product launch',
    tags: ['Marketing', 'Content', 'Social Media']
  },
  {
    id: '4',
    name: 'Database Migration',
    manager: 'Bob Smith',
    taskCount: 8,
    completedTasks: 8,
    progress: 100,
    deadline: '2024-01-31',
    status: 'completed',
    team: ['Jack Miller', 'Kate Wilson'],
    priority: 'high',
    budget: 35000,
    description: 'Migration from legacy database to cloud infrastructure',
    tags: ['Database', 'Cloud', 'Migration']
  },
  {
    id: '5',
    name: 'Employee Training Platform',
    manager: 'Carol Davis',
    taskCount: 20,
    completedTasks: 5,
    progress: 25,
    deadline: '2024-04-15',
    status: 'delayed',
    team: ['Liam Anderson', 'Mia Thompson', 'Noah Johnson'],
    priority: 'medium',
    budget: 65000,
    description: 'Internal platform for employee skill development and training',
    tags: ['Training', 'Platform', 'Learning']
  },
  {
    id: '6',
    name: 'Security Audit',
    manager: 'David Brown',
    taskCount: 12,
    completedTasks: 9,
    progress: 75,
    deadline: '2024-02-28',
    status: 'on-track',
    team: ['Olivia Brown', 'Paul Davis'],
    priority: 'high',
    budget: 40000,
    description: 'Comprehensive security audit and vulnerability assessment',
    tags: ['Security', 'Audit', 'Compliance']
  }
];

export const AllProjectsGrid = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesManager = selectedManager === 'all' || project.manager === selectedManager;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || project.priority === selectedPriority;
    
    return matchesSearch && matchesManager && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return 'bg-[#4CAF50] text-white';
      case 'at-risk':
        return 'bg-[#FFC107] text-white';
      case 'delayed':
        return 'bg-[#EF5226] text-white';
      case 'completed':
        return 'bg-[#05A7CC] text-white';
      default:
        return 'bg-[#666666] text-white';
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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-[#4CAF50] to-[#45a049]';
    if (progress >= 50) return 'from-[#05A7CC] to-[#048ba8]';
    if (progress >= 25) return 'from-[#FFC107] to-[#e6ac00]';
    return 'from-[#EF5226] to-[#d4471f]';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#4CAF50]" />;
      case 'on-track':
        return <TrendingUp className="w-5 h-5 text-[#4CAF50]" />;
      case 'at-risk':
        return <Clock className="w-5 h-5 text-[#FFC107]" />;
      case 'delayed':
        return <Clock className="w-5 h-5 text-[#EF5226]" />;
      default:
        return <Clock className="w-5 h-5 text-[#666666]" />;
    }
  };

  const uniqueManagers = [...new Set(projects.map(project => project.manager))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">All Projects</h1>
            <p className="text-[#666666]">Visual overview of all projects and their progress</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => onNavigate('tasks-all-projects')}
                className="p-3 rounded-xl text-[#666666] hover:text-[#333333] transition-all"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                className="p-3 rounded-xl neu-primary text-white"
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={() => onNavigate('add-new-task')}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search projects, managers, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>

          {/* Manager Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Managers</option>
                {uniqueManagers.map(manager => (
                  <option key={manager} value={manager}>{manager}</option>
                ))}
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
                <option value="on-track">On Track</option>
                <option value="at-risk">At Risk</option>
                <option value="delayed">Delayed</option>
                <option value="completed">Completed</option>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{projects.length}</div>
          <div className="text-[#666666]">Total Projects</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {projects.reduce((sum, project) => sum + project.taskCount, 0)}
          </div>
          <div className="text-[#666666]">Total Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {projects.reduce((sum, project) => sum + project.completedTasks, 0)}
          </div>
          <div className="text-[#666666]">Completed Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">
            {Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)}%
          </div>
          <div className="text-[#666666]">Avg Progress</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="neu-card p-6 rounded-3xl hover:scale-105 transition-transform duration-200">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#333333] mb-2">{project.name}</h3>
                <p className="text-[#666666] text-sm leading-relaxed mb-3">{project.description}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </div>
                <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <div key={index} className="neu-card-inset px-3 py-1 rounded-xl">
                  <span className="text-xs font-medium text-[#05A7CC]">{tag}</span>
                </div>
              ))}
            </div>

            {/* Project Manager */}
            <div className="neu-small p-4 rounded-2xl mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-[#05A7CC] text-white">
                    {project.manager.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-[#333333]">{project.manager}</div>
                  <div className="text-sm text-[#666666]">Project Manager</div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#333333]">Progress</span>
                  <span className="text-sm font-bold text-[#333333]">{project.progress}%</span>
                </div>
                <div className="neu-card-inset rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Task Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#333333]">{project.taskCount}</div>
                  <div className="text-xs text-[#666666]">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#4CAF50]">{project.completedTasks}</div>
                  <div className="text-xs text-[#666666]">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#EF5226]">{project.taskCount - project.completedTasks}</div>
                  <div className="text-xs text-[#666666]">Remaining</div>
                </div>
              </div>

              {/* Deadline */}
              <div className="neu-card-inset p-3 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#666666]" />
                    <span className="text-sm text-[#666666]">Deadline</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#333333]">
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-[#666666]">
                      {Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="neu-card-inset p-3 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666666]">Budget</span>
                  <span className="text-sm font-bold text-[#333333]">${(project.budget / 1000).toFixed(0)}K</span>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#333333]">Team ({project.team.length})</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 4).map((member, index) => (
                      <Avatar key={index} className="w-8 h-8 border-2 border-[#ECF0F3]">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-[#E8EBEF] border-2 border-[#ECF0F3] flex items-center justify-center">
                        <span className="text-xs text-[#666666]">+{project.team.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-2">
                <button 
                  onClick={() => onNavigate('project-task-list', project.id)}
                  className="flex-1 neu-button p-3 rounded-2xl flex items-center justify-center space-x-2 text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Tasks</span>
                </button>
                <button className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onNavigate('add-new-task', { projectId: project.id })}
                  className="neu-button p-3 rounded-2xl text-[#4CAF50] hover:text-[#45a049] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="neu-card-inset p-8 rounded-3xl inline-block">
            <TrendingUp className="w-16 h-16 text-[#666666] mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#333333] mb-2">No projects found</h3>
            <p className="text-[#666666]">Try adjusting your search filters or create a new project.</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {filteredProjects.length} of {projects.length} projects
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