import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, MapPin, Calendar, Users, Grid, List, ArrowUpDown } from 'lucide-react';
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
    budget: 2500000,
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
    budget: 4200000,
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
    budget: 1800000,
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
    budget: 3100000,
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
    budget: 5600000,
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
    budget: 2800000,
    lastUpdate: '2023-12-20'
  }
];

export const AllProjectsList = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesClient = selectedClient === 'all' || project.client === selectedClient;
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'client':
        valueA = a.client.toLowerCase();
        valueB = b.client.toLowerCase();
        break;
      case 'startDate':
        valueA = new Date(a.startDate);
        valueB = new Date(b.startDate);
        break;
      case 'endDate':
        valueA = new Date(a.endDate);
        valueB = new Date(b.endDate);
        break;
      case 'progress':
        valueA = a.progress;
        valueB = b.progress;
        break;
      case 'budget':
        valueA = a.budget;
        valueB = b.budget;
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const uniqueClients = [...new Set(projects.map(project => project.client))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">All Projects</h1>
            <p className="text-[#666666]">Detailed list view of all site construction projects</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => onNavigate('all-projects')}
                className="p-3 rounded-xl text-[#666666] hover:text-[#333333] transition-all"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                className="p-3 rounded-xl neu-primary text-white"
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
                placeholder="Search projects, clients, managers, or locations..."
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
                onClick={() => handleSort('client')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Client</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">Site Location</div>
            <div className="col-span-1">
              <button 
                onClick={() => handleSort('progress')}
                className="flex items-center space-x-1 hover:text-[#333333] transition-colors"
              >
                <span>Progress</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Manager</div>
            <div className="col-span-1">Budget</div>
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
                    <div className="flex items-center space-x-2 text-sm text-[#666666]">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="col-span-2">
                  <div className="font-medium text-[#333333]">{project.client}</div>
                  <div className="text-sm text-[#666666]">Last update: {new Date(project.lastUpdate).toLocaleDateString()}</div>
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#666666]" />
                    <span className="text-[#333333]">{project.location}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#333333] mb-1">{project.progress}%</div>
                    <div className="neu-card-inset rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(project.status)} text-center`}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Manager */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                        {project.manager.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-[#333333]">{project.manager}</div>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="col-span-1">
                  <div className="text-sm font-bold text-[#333333]">${(project.budget / 1000000).toFixed(1)}M</div>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onNavigate('project-details', project.id)}
                      className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onNavigate('project-edit', project.id)}
                      className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <List className="w-16 h-16 text-[#666666] mx-auto mb-4" />
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