import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Users, Calendar, TrendingUp, Grid, List, ArrowUpDown } from 'lucide-react';
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
    description: 'Complete redesign of company website with modern UI/UX'
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
    description: 'Native mobile application for iOS and Android platforms'
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
    description: 'Q1 marketing campaign for product launch'
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
    description: 'Migration from legacy database to cloud infrastructure'
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
    description: 'Internal platform for employee skill development and training'
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
    description: 'Comprehensive security audit and vulnerability assessment'
  }
];

export const AllProjectsList = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesManager = selectedManager === 'all' || project.manager === selectedManager;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesManager && matchesStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'manager':
        valueA = a.manager.toLowerCase();
        valueB = b.manager.toLowerCase();
        break;
      case 'progress':
        valueA = a.progress;
        valueB = b.progress;
        break;
      case 'deadline':
        valueA = new Date(a.deadline);
        valueB = new Date(b.deadline);
        break;
      case 'taskCount':
        valueA = a.taskCount;
        valueB = b.taskCount;
        break;
      default:
        valueA = a[sortBy];
        valueB = b[sortBy];
    }

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
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
            <p className="text-[#666666]">Manage all projects and their associated tasks</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                className="p-3 rounded-xl neu-primary text-white"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('tasks-all-projects-grid')}
                className="p-3 rounded-xl text-[#666666] hover:text-[#333333] transition-all"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search projects by name, manager, or description..."
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
            {projects.filter(p => p.status === 'on-track').length}
          </div>
          <div className="text-[#666666]">On Track</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {projects.filter(p => p.status === 'completed').length}
          </div>
          <div className="text-[#666666]">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#EF5226] mb-2">
            {projects.filter(p => p.status === 'delayed').length}
          </div>
          <div className="text-[#666666]">Delayed</div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="neu-card p-8 rounded-3xl">
        {/* Table Header */}
        <div className="neu-small p-4 rounded-2xl mb-4">
          <div className="grid grid-cols-12 gap-4 items-center font-medium text-[#666666] text-sm">
            <div className="col-span-3">
              <button 
                onClick={() => handleSort('name')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Project Name</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">
              <button 
                onClick={() => handleSort('manager')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Manager</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-1">
              <button 
                onClick={() => handleSort('taskCount')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Tasks</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">
              <button 
                onClick={() => handleSort('progress')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Progress</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">
              <button 
                onClick={() => handleSort('deadline')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Deadline</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {sortedProjects.map((project) => (
            <div key={project.id} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Project Name */}
                <div className="col-span-3">
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{project.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority.toUpperCase()}
                      </div>
                      <span className="text-sm text-[#666666]">${(project.budget / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>

                {/* Manager */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-sm">
                        {project.manager.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-[#333333]">{project.manager}</div>
                      <div className="text-sm text-[#666666]">Project Manager</div>
                    </div>
                  </div>
                </div>

                {/* Task Count */}
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#333333]">{project.taskCount}</div>
                    <div className="text-xs text-[#666666]">{project.completedTasks} done</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="col-span-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#666666]">Progress</span>
                      <span className="text-sm font-bold text-[#333333]">{project.progress}%</span>
                    </div>
                    <div className="neu-card-inset rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#666666]" />
                    <div>
                      <div className="font-medium text-[#333333]">
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-[#666666]">
                        {Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(project.status)} text-center`}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onNavigate('project-task-list', project.id)}
                      className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Members Preview */}
              <div className="mt-3 flex items-center space-x-3">
                <span className="text-sm text-[#666666]">Team:</span>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="w-6 h-6 border-2 border-[#ECF0F3]">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                        {member.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 4 && (
                    <div className="w-6 h-6 rounded-full bg-[#E8EBEF] border-2 border-[#ECF0F3] flex items-center justify-center">
                      <span className="text-xs text-[#666666]">+{project.team.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <TrendingUp className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No projects found</h3>
              <p className="text-[#666666]">Try adjusting your search filters or create a new project.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedProjects.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {sortedProjects.length} of {projects.length} projects
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