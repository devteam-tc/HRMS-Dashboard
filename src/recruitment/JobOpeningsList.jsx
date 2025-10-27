import React, { useState } from 'react';
import '../styles/index - 20091.css';
import { Plus, Search, Filter, Briefcase, MapPin, Users, Calendar, Building2, MoreVertical, Edit, Eye, Archive, Trash2 } from 'lucide-react';

export const JobOpeningsList = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York',
      jobType: 'Full-time',
      openings: 3,
      applications: 24,
      status: 'Open',
      postedDate: '2024-01-15',
      hiringManager: 'John Smith',
      salaryRange: '$90,000 - $130,000',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco',
      jobType: 'Full-time',
      openings: 1,
      applications: 18,
      status: 'In Progress',
      postedDate: '2024-01-10',
      hiringManager: 'Sarah Johnson',
      salaryRange: '$100,000 - $140,000',
      priority: 'High'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      jobType: 'Full-time',
      openings: 2,
      applications: 31,
      status: 'Open',
      postedDate: '2024-01-08',
      hiringManager: 'Mike Brown',
      salaryRange: '$70,000 - $100,000',
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Boston',
      jobType: 'Part-time',
      openings: 1,
      applications: 12,
      status: 'Closed',
      postedDate: '2024-01-05',
      hiringManager: 'Lisa Davis',
      salaryRange: '$45,000 - $60,000',
      priority: 'Low'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin',
      jobType: 'Full-time',
      openings: 2,
      applications: 16,
      status: 'Open',
      postedDate: '2024-01-12',
      hiringManager: 'Tom Wilson',
      salaryRange: '$85,000 - $120,000',
      priority: 'High'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Closed': return 'text-red-600 bg-red-50';
      case 'Archived': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || job.location === filterLocation;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesLocation;
  });

  return (
    <div className="neu-page-container">
      <div className="neu-content-wrapper">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="neu-heading-xl">Job Openings</h1>
            <p className="neu-text-body">Manage job postings and track applications</p>
          </div>
          <button
            onClick={() => onNavigate('new-job-opening')}
            className="neu-primary flex items-center neu-space-x-sm neu-hover-lift"
          >
            <Plus size={20} />
            <span>New Job Opening</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="neu-card">
          <div className="neu-grid-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neu-input pl-12 text-[#333333] placeholder-[#666666]"
              />
            </div>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="neu-select text-[#333333]"
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="neu-select text-[#333333]"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
              <option value="Archived">Archived</option>
            </select>

            {/* Location Filter */}
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="neu-select text-[#333333]"
            >
              <option value="all">All Locations</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Remote">Remote</option>
              <option value="Boston">Boston</option>
              <option value="Austin">Austin</option>
            </select>
          </div>
        </div>

        {/* Job Statistics */}
        <div className="neu-grid-4">
          <div className="neu-card neu-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="neu-text-muted mb-1">Total Openings</p>
                <p className="text-2xl font-bold text-[#333333]">{jobOpenings.length}</p>
              </div>
              <div className="neu-small p-4 rounded-2xl">
                <Briefcase size={24} className="text-[#EF5226]" />
              </div>
            </div>
          </div>

          <div className="neu-card neu-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="neu-text-muted mb-1">Active Jobs</p>
                <p className="text-2xl font-bold text-[#333333]">{jobOpenings.filter(j => j.status === 'Open').length}</p>
              </div>
              <div className="neu-small p-4 rounded-2xl">
                <Users size={24} className="text-[#05A7CC]" />
              </div>
            </div>
          </div>

          <div className="neu-card neu-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="neu-text-muted mb-1">Total Applications</p>
                <p className="text-2xl font-bold text-[#333333]">{jobOpenings.reduce((sum, job) => sum + job.applications, 0)}</p>
              </div>
              <div className="neu-small p-4 rounded-2xl">
                <Users size={24} className="text-[#EF5226]" />
              </div>
            </div>
          </div>

          <div className="neu-card neu-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="neu-text-muted mb-1">Positions Available</p>
                <p className="text-2xl font-bold text-[#333333]">{jobOpenings.reduce((sum, job) => sum + job.openings, 0)}</p>
              </div>
              <div className="neu-small p-4 rounded-2xl">
                <Building2 size={24} className="text-[#05A7CC]" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Openings Table */}
        <div className="neu-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="neu-table">
              <thead className="neu-table-header">
                <tr>
                  <th className="neu-table-cell font-medium">Job Title</th>
                  <th className="neu-table-cell font-medium">Department</th>
                  <th className="neu-table-cell font-medium">Location</th>
                  <th className="neu-table-cell font-medium">Openings</th>
                  <th className="neu-table-cell font-medium">Applications</th>
                  <th className="neu-table-cell font-medium">Status</th>
                  <th className="neu-table-cell font-medium">Priority</th>
                  <th className="neu-table-cell font-medium">Posted</th>
                  <th className="neu-table-cell font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job, index) => (
                  <tr key={job.id} className="neu-table-row">
                    <td className="neu-table-cell">
                      <div>
                        <p className="font-medium text-[#333333] mb-1">{job.title}</p>
                        <p className="neu-text-muted">{job.jobType}</p>
                      </div>
                    </td>
                    <td className="neu-table-cell">
                      <div className="flex items-center">
                        <Building2 size={16} className="text-[#666666] mr-2" />
                        <span className="text-[#333333]">{job.department}</span>
                      </div>
                    </td>
                    <td className="neu-table-cell">
                      <div className="flex items-center">
                        <MapPin size={16} className="text-[#666666] mr-2" />
                        <span className="text-[#333333]">{job.location}</span>
                      </div>
                    </td>
                    <td className="neu-table-cell">
                      <span className="text-[#333333] font-medium">{job.openings}</span>
                    </td>
                    <td className="neu-table-cell">
                      <span className="text-[#333333] font-medium">{job.applications}</span>
                    </td>
                    <td className="neu-table-cell">
                      <span className={`neu-badge ${
                        job.status === 'Open' ? 'neu-badge-success' :
                        job.status === 'In Progress' ? 'neu-badge-info' :
                        job.status === 'Closed' ? 'neu-badge-error' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="neu-table-cell">
                      <span className={`neu-badge ${
                        job.priority === 'High' ? 'neu-badge-error' :
                        job.priority === 'Medium' ? 'neu-badge-warning' :
                        'neu-badge-success'
                      }`}>
                        {job.priority}
                      </span>
                    </td>
                    <td className="neu-table-cell">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-[#666666] mr-2" />
                        <span className="text-[#333333]">{job.postedDate}</span>
                      </div>
                    </td>
                    <td className="neu-table-cell">
                      <div className="flex items-center neu-space-x-sm">
                        <button
                          onClick={() => onNavigate('job-opening-details', { jobId: job.id })}
                          className="neu-button-sm neu-hover-lift"
                          title="View Details"
                        >
                          <Eye size={16} className="text-[#05A7CC]" />
                        </button>
                        <button
                          onClick={() => onNavigate('edit-job-opening', { jobId: job.id })}
                          className="neu-button-sm neu-hover-lift"
                          title="Edit"
                        >
                          <Edit size={16} className="text-[#EF5226]" />
                        </button>
                        <button
                          className="neu-button-sm neu-hover-lift"
                          title="More Actions"
                        >
                          <MoreVertical size={16} className="text-[#666666]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase size={48} className="text-[#666666] mx-auto mb-4" />
              <p className="neu-text-body">No job openings found</p>
              <p className="neu-text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};