import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit3, Users, Calendar, Target, MoreHorizontal, GitBranch, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const TaskProjects = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [statusFilter, setStatusFilter] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 'PROJ-001',
      name: 'E-commerce Platform Redesign',
      description: 'Complete redesign of the e-commerce platform with new UI/UX and enhanced features',
      status: 'active',
      priority: 'high',
      progress: 75,
      sprint: 'Sprint 3 of 4',
      tasks: {
        total: 45,
        completed: 34,
        inProgress: 8,
        pending: 3
      },
      team: [
        { name: 'John Doe', role: 'Frontend Lead', avatar: 'JD', color: '#EF5226' },
        { name: 'Sarah Wilson', role: 'Designer', avatar: 'SW', color: '#05A7CC' },
        { name: 'Mike Johnson', role: 'Backend Dev', avatar: 'MJ', color: '#4CAF50' },
        { name: 'Emma Brown', role: 'QA Lead', avatar: 'EB', color: '#9C27B0' }
      ],
      deadline: '2024-04-15',
      startDate: '2024-01-15',
      technologies: ['React', 'Node.js', 'MongoDB'],
      repository: 'github.com/company/ecommerce-v2',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'PROJ-002',
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms',
      status: 'active',
      priority: 'medium',
      progress: 45,
      sprint: 'Sprint 2 of 5',
      tasks: {
        total: 58,
        completed: 26,
        inProgress: 12,
        pending: 20
      },
      team: [
        { name: 'David Lee', role: 'Mobile Lead', avatar: 'DL', color: '#EF5226' },
        { name: 'Lisa Chen', role: 'iOS Dev', avatar: 'LC', color: '#05A7CC' },
        { name: 'Tom Wilson', role: 'Android Dev', avatar: 'TW', color: '#4CAF50' }
      ],
      deadline: '2024-06-30',
      startDate: '2024-02-01',
      technologies: ['React Native', 'Firebase', 'Redux'],
      repository: 'github.com/company/mobile-app',
      lastUpdate: '5 hours ago'
    },
    {
      id: 'PROJ-003',
      name: 'API Gateway Microservices',
      description: 'Development of scalable microservices architecture with API gateway',
      status: 'active',
      priority: 'high',
      progress: 90,
      sprint: 'Sprint 4 of 4',
      tasks: {
        total: 32,
        completed: 29,
        inProgress: 2,
        pending: 1
      },
      team: [
        { name: 'Alex Rodriguez', role: 'DevOps Lead', avatar: 'AR', color: '#EF5226' },
        { name: 'Maria Garcia', role: 'Backend Dev', avatar: 'MG', color: '#05A7CC' }
      ],
      deadline: '2024-03-25',
      startDate: '2024-01-01',
      technologies: ['Docker', 'Kubernetes', 'Node.js', 'PostgreSQL'],
      repository: 'github.com/company/api-gateway',
      lastUpdate: '1 hour ago'
    },
    {
      id: 'PROJ-004',
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard for business intelligence',
      status: 'planning',
      priority: 'medium',
      progress: 15,
      sprint: 'Sprint 1 of 6',
      tasks: {
        total: 67,
        completed: 10,
        inProgress: 5,
        pending: 52
      },
      team: [
        { name: 'Robert Kim', role: 'Data Engineer', avatar: 'RK', color: '#EF5226' },
        { name: 'Nina Patel', role: 'Frontend Dev', avatar: 'NP', color: '#05A7CC' },
        { name: 'James Liu', role: 'Data Analyst', avatar: 'JL', color: '#4CAF50' }
      ],
      deadline: '2024-08-15',
      startDate: '2024-03-01',
      technologies: ['Python', 'D3.js', 'Apache Kafka', 'Elasticsearch'],
      repository: 'github.com/company/analytics-dashboard',
      lastUpdate: '1 day ago'
    },
    {
      id: 'PROJ-005',
      name: 'Security Audit System',
      description: 'Automated security audit and compliance monitoring system',
      status: 'completed',
      priority: 'high',
      progress: 100,
      sprint: 'Completed',
      tasks: {
        total: 28,
        completed: 28,
        inProgress: 0,
        pending: 0
      },
      team: [
        { name: 'Chris Thompson', role: 'Security Lead', avatar: 'CT', color: '#EF5226' },
        { name: 'Anna Miller', role: 'DevSecOps', avatar: 'AM', color: '#05A7CC' }
      ],
      deadline: '2024-02-28',
      startDate: '2023-12-01',
      technologies: ['Python', 'Docker', 'OWASP', 'Jenkins'],
      repository: 'github.com/company/security-audit',
      lastUpdate: '3 days ago'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'planning': 'bg-blue-100 text-blue-800 border-blue-200',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200',
      'on-hold': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return '#4CAF50';
    if (progress >= 70) return '#EF5226';
    if (progress >= 50) return '#05A7CC';
    return '#FFC107';
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Layout: List + Grid Hybrid with Progress Bars and Team Avatars
  const renderListView = () => (
    <div className="space-y-6">
      {filteredProjects.map((project) => (
        <div key={project.id} className="neu-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group">
          {/* Project Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-[#333333] group-hover:text-[#EF5226] transition-colors">
                  {project.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
              <p className="text-[#666666] text-sm mb-3">{project.description}</p>
              <div className="flex items-center space-x-4 text-sm text-[#666666]">
                <span className="flex items-center">
                  <GitBranch size={14} className="mr-1" />
                  {project.id}
                </span>
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Due: {project.deadline}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {project.lastUpdate}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onNavigate('task-details', { projectId: project.id })}
                className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors"
              >
                <Eye size={16} />
              </button>
              <button className="neu-small p-2 rounded-lg hover:text-[#05A7CC] transition-colors">
                <Edit3 size={16} />
              </button>
              <button className="neu-small p-2 rounded-lg hover:text-[#333333] transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Sprint Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#333333]">{project.sprint}</span>
              <span className="text-sm font-bold" style={{ color: getProgressColor(project.progress) }}>
                {project.progress}%
              </span>
            </div>
            <div className="neu-card-inset rounded-lg p-1">
              <div 
                className="h-3 rounded-lg transition-all duration-500"
                style={{ 
                  width: `${project.progress}%`,
                  background: `linear-gradient(90deg, ${getProgressColor(project.progress)}, ${getProgressColor(project.progress)}dd)`
                }}
              ></div>
            </div>
          </div>

          {/* Task Distribution */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="neu-small p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-[#333333]">{project.tasks.total}</div>
              <div className="text-xs text-[#666666]">Total Tasks</div>
            </div>
            <div className="neu-small p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-green-600">{project.tasks.completed}</div>
              <div className="text-xs text-[#666666]">Completed</div>
            </div>
            <div className="neu-small p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-[#05A7CC]">{project.tasks.inProgress}</div>
              <div className="text-xs text-[#666666]">In Progress</div>
            </div>
            <div className="neu-small p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-[#EF5226]">{project.tasks.pending}</div>
              <div className="text-xs text-[#666666]">Pending</div>
            </div>
          </div>

          {/* Team Members and Technologies */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[#666666]">Team:</span>
              <div className="flex -space-x-2">
                {project.team.map((member, index) => (
                  <div 
                    key={index}
                    className="neu-small w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-[#ECF0F3] hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: member.color }}
                    title={`${member.name} - ${member.role}`}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              <span className="text-sm text-[#666666]">({project.team.length} members)</span>
            </div>
            <div className="flex items-center space-x-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-[#E8EBEF] text-[#333333] rounded-lg text-xs font-medium">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs text-[#666666]">+{project.technologies.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <div key={project.id} className="neu-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group h-fit">
          {/* Project Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#EF5226] transition-colors mb-2">
                {project.name}
              </h3>
              <div className="flex space-x-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>
            <button className="neu-small p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#EF5226]">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Progress Circle */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E8EBEF"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={getProgressColor(project.progress)}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40 * (project.progress / 100)} ${2 * Math.PI * 40}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: getProgressColor(project.progress) }}>
                  {project.progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Sprint Info */}
          <div className="neu-small p-3 rounded-xl text-center mb-4">
            <div className="text-sm font-medium text-[#333333]">{project.sprint}</div>
            <div className="text-xs text-[#666666] mt-1">{project.tasks.completed}/{project.tasks.total} tasks completed</div>
          </div>

          {/* Team Avatars */}
          <div className="flex items-center justify-center space-x-1 mb-4">
            {project.team.map((member, index) => (
              <div 
                key={index}
                className="neu-small w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: member.color }}
                title={`${member.name} - ${member.role}`}
              >
                {member.avatar}
              </div>
            ))}
          </div>

          {/* Deadline */}
          <div className="neu-small p-3 rounded-xl text-center">
            <div className="flex items-center justify-center text-sm text-[#666666]">
              <Calendar size={14} className="mr-2" />
              Due: {project.deadline}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Projects (Development)</h1>
        <p className="text-[#666666]">Manage software development projects with team collaboration</p>
      </div>

      {/* Filters and Controls */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#EF5226]" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 neu-input rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
              />
            </div>

            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>

            {/* View Toggle */}
            <div className="flex neu-card-inset rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'neu-primary text-white shadow-md' 
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'neu-primary text-white shadow-md' 
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                Grid
              </button>
            </div>
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
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Project Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#EF5226] mb-1">
            {projects.filter(p => p.status === 'active').length}
          </div>
          <div className="text-[#666666] text-sm">Active Projects</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#05A7CC] mb-1">
            {projects.reduce((sum, p) => sum + p.tasks.total, 0)}
          </div>
          <div className="text-[#666666] text-sm">Total Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {projects.reduce((sum, p) => sum + p.team.length, 0)}
          </div>
          <div className="text-[#666666] text-sm">Team Members</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#333333] mb-1">
            {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
          </div>
          <div className="text-[#666666] text-sm">Avg Progress</div>
        </div>
      </div>

      {/* Projects List/Grid */}
      <div className="neu-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#333333]">Development Projects</h2>
          <span className="text-[#666666] text-sm">{filteredProjects.length} projects found</span>
        </div>
        
        {viewMode === 'list' ? renderListView() : renderGridView()}
      </div>
    </div>
  );
};