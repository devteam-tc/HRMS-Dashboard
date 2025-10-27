import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, MapPin, Calendar, Users, TrendingUp, Grid, List } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const projects = [
  {
    id: '1',
    name: 'Downtown Office Complex',
    client: 'Alpha Construction Ltd.',
    location: 'New York, NY',
    status: 'ongoing',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    manager: 'John Doe',
    team: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
    budget: 2500000,
    image: '/placeholder-project.jpg',
    lastUpdate: '2024-01-18'
  },
  {
    id: '2',
    name: 'Residential Tower Phase 2',
    client: 'Beta Developers',
    location: 'Los Angeles, CA',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-01',
    endDate: '2024-01-15',
    manager: 'Jane Smith',
    team: ['Mike Johnson', 'Sarah Wilson', 'David Brown'],
    budget: 4200000,
    image: '/placeholder-project.jpg',
    lastUpdate: '2024-01-15'
  },
  {
    id: '3',
    name: 'Shopping Mall Renovation',
    client: 'Gamma Retail Group',
    location: 'Chicago, IL',
    status: 'on-hold',
    progress: 35,
    startDate: '2023-11-20',
    endDate: '2024-05-15',
    manager: 'Alice Johnson',
    team: ['John Doe', 'Emma Garcia', 'Frank Wilson'],
    budget: 1800000,
    image: '/placeholder-project.jpg',
    lastUpdate: '2024-01-10'
  },
  {
    id: '4',
    name: 'Industrial Warehouse',
    client: 'Delta Logistics',
    location: 'Houston, TX',
    status: 'ongoing',
    progress: 60,
    startDate: '2023-12-01',
    endDate: '2024-04-30',
    manager: 'Bob Smith',
    team: ['Carol Davis', 'David Brown', 'Emma Garcia'],
    budget: 3100000,
    image: '/placeholder-project.jpg',
    lastUpdate: '2024-01-17'
  },
  {
    id: '5',
    name: 'Medical Center Expansion',
    client: 'HealthCare Plus',
    location: 'Miami, FL',
    status: 'ongoing',
    progress: 45,
    startDate: '2024-01-01',
    endDate: '2024-08-15',
    manager: 'Carol Davis',
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    budget: 5600000,
    image: '/placeholder-project.jpg',
    lastUpdate: '2024-01-18'
  },
  {
    id: '6',
    name: 'University Library',
    client: 'State University',
    location: 'Austin, TX',
    status: 'completed',
    progress: 100,
    startDate: '2023-03-15',
    endDate: '2023-12-20',
    manager: 'David Brown',
    team: ['Sarah Wilson', 'Frank Wilson', 'Emma Garcia'],
    budget: 2800000,
    image: '/placeholder-project.jpg',
    lastUpdate: '2023-12-20'
  }
];

export const AllProjectsGrid = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesClient = selectedClient === 'all' || project.client === selectedClient;
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-[#05A7CC] text-white';
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      case 'on-hold':
        return 'bg-[#FFC107] text-white';
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

  const uniqueClients = [...new Set(projects.map(project => project.client))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">All Projects</h1>
            <p className="text-[#666666]">Manage and track all site construction projects</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('all-projects-list')}
                className="p-3 rounded-xl text-[#666666] hover:text-[#333333] transition-all"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={() => onNavigate('project-edit', { isNew: true })}
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
                placeholder="Search projects by name, client, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
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
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Client Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Clients</option>
                {uniqueClients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
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
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {projects.filter(p => p.status === 'ongoing').length}
          </div>
          <div className="text-[#666666]">Ongoing</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {projects.filter(p => p.status === 'completed').length}
          </div>
          <div className="text-[#666666]">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#FFC107] mb-2">
            {projects.filter(p => p.status === 'on-hold').length}
          </div>
          <div className="text-[#666666]">On Hold</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="neu-card p-6 rounded-3xl hover:scale-105 transition-transform duration-200">
            {/* Project Image */}
            <div className="neu-card-inset h-48 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-[#E8EBEF] to-[#d1d9e6]">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#666666] mx-auto mb-2" />
                <span className="text-sm text-[#666666]">Project Site</span>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#333333] mb-1">{project.name}</h3>
                  <p className="text-[#666666] mb-2">{project.client}</p>
                </div>
                <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              {/* Location & Manager */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#666666]" />
                  <span className="text-sm text-[#666666]">{project.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#666666]" />
                  <span className="text-sm text-[#666666]">Manager: {project.manager}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#666666]" />
                  <span className="text-sm text-[#666666]">
                    {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress */}
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

              {/* Budget */}
              <div className="neu-small p-3 rounded-2xl flex items-center justify-between">
                <span className="text-sm text-[#666666]">Budget</span>
                <span className="font-bold text-[#333333]">${(project.budget / 1000000).toFixed(1)}M</span>
              </div>

              {/* Team Members */}
              <div>
                <span className="text-sm text-[#666666] mb-2 block">Team Members</span>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, index) => (
                    <Avatar key={index} className="w-8 h-8 border-2 border-[#ECF0F3]">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                        {member.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-[#E8EBEF] border-2 border-[#ECF0F3] flex items-center justify-center">
                      <span className="text-xs text-[#666666]">+{project.team.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-2">
                <button 
                  onClick={() => onNavigate('project-details', project.id)}
                  className="flex-1 neu-button p-3 rounded-2xl flex items-center justify-center space-x-2 text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View</span>
                </button>
                <button 
                  onClick={() => onNavigate('project-edit', project.id)}
                  className="flex-1 neu-button p-3 rounded-2xl flex items-center justify-center space-x-2 text-[#666666] hover:text-[#333333] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
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