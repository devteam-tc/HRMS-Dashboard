import React, { useState } from 'react';
import { ArrowLeft, Filter, Calendar, Users, Clock, CheckCircle, XCircle, Pause, Archive, MoreVertical, Eye, Edit } from 'lucide-react';

export const JobOpeningStatus = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const jobStatuses = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      status: 'Open',
      applications: 24,
      hired: 0,
      daysActive: 5,
      postedDate: '2024-01-15',
      lastActivity: '2 hours ago',
      expiryDate: '2024-03-15',
      progress: {
        applications: 24,
        shortlisted: 8,
        interviews: 3,
        offers: 1,
        hired: 0
      }
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      status: 'In Progress',
      applications: 18,
      hired: 0,
      daysActive: 10,
      postedDate: '2024-01-10',
      lastActivity: '1 day ago',
      expiryDate: '2024-03-10',
      progress: {
        applications: 18,
        shortlisted: 12,
        interviews: 6,
        offers: 2,
        hired: 0
      }
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      status: 'Open',
      applications: 31,
      hired: 0,
      daysActive: 7,
      postedDate: '2024-01-08',
      lastActivity: '3 hours ago',
      expiryDate: '2024-03-08',
      progress: {
        applications: 31,
        shortlisted: 15,
        interviews: 4,
        offers: 0,
        hired: 0
      }
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      department: 'Marketing',
      status: 'Closed',
      applications: 12,
      hired: 1,
      daysActive: 15,
      postedDate: '2024-01-05',
      lastActivity: '1 week ago',
      expiryDate: '2024-03-05',
      progress: {
        applications: 12,
        shortlisted: 8,
        interviews: 5,
        offers: 2,
        hired: 1
      }
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      status: 'Paused',
      applications: 16,
      hired: 0,
      daysActive: 8,
      postedDate: '2024-01-12',
      lastActivity: '5 days ago',
      expiryDate: '2024-03-12',
      progress: {
        applications: 16,
        shortlisted: 6,
        interviews: 2,
        offers: 0,
        hired: 0
      }
    },
    {
      id: 6,
      title: 'Data Scientist',
      department: 'Engineering',
      status: 'Archived',
      applications: 45,
      hired: 2,
      daysActive: 30,
      postedDate: '2023-12-15',
      lastActivity: '2 weeks ago',
      expiryDate: '2024-02-15',
      progress: {
        applications: 45,
        shortlisted: 20,
        interviews: 12,
        offers: 3,
        hired: 2
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600 bg-green-50 border-green-200';
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Paused': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'Archived': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': return <CheckCircle size={16} />;
      case 'In Progress': return <Clock size={16} />;
      case 'Paused': return <Pause size={16} />;
      case 'Closed': return <XCircle size={16} />;
      case 'Archived': return <Archive size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredJobs = jobStatuses.filter(job => {
    if (filterStatus === 'all') return true;
    return job.status === filterStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'oldest':
        return new Date(a.postedDate) - new Date(b.postedDate);
      case 'applications':
        return b.applications - a.applications;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const statusCounts = {
    all: jobStatuses.length,
    Open: jobStatuses.filter(j => j.status === 'Open').length,
    'In Progress': jobStatuses.filter(j => j.status === 'In Progress').length,
    Paused: jobStatuses.filter(j => j.status === 'Paused').length,
    Closed: jobStatuses.filter(j => j.status === 'Closed').length,
    Archived: jobStatuses.filter(j => j.status === 'Archived').length
  };

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('job-openings-list')}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Job Opening Status</h1>
            <p className="text-[#666666]">Track progress and manage job posting lifecycle</p>
          </div>
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`neu-card p-4 rounded-3xl transition-all duration-200 ${
              filterStatus === status ? 'ring-2 ring-[#EF5226]' : 'hover:shadow-lg'
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-[#333333] mb-1">{count}</p>
              <p className="text-sm text-[#666666] capitalize">{status === 'all' ? 'Total' : status}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filters and Sort */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-[#666666]" />
              <span className="text-[#333333] font-medium">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="neu-input px-4 py-2 text-[#333333] focus:outline-none appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[#333333] font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="neu-input px-4 py-2 text-[#333333] focus:outline-none appearance-none"
            >
              <option value="latest">Latest Posted</option>
              <option value="oldest">Oldest Posted</option>
              <option value="applications">Most Applications</option>
              <option value="title">Job Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Status List */}
      <div className="space-y-6">
        {sortedJobs.map((job) => (
          <div key={job.id} className="neu-card rounded-3xl overflow-hidden">
            <div className="p-8">
              {/* Job Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="neu-small p-4 rounded-2xl">
                    {getStatusIcon(job.status)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#333333] mb-1">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-[#666666]">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>Posted {job.daysActive} days ago</span>
                      <span>•</span>
                      <span>Last activity: {job.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-2 rounded-2xl text-sm font-medium border ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <button
                    onClick={() => onNavigate('job-opening-details', { jobId: job.id })}
                    className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
                    title="View Details"
                  >
                    <Eye size={16} className="text-[#05A7CC]" />
                  </button>
                  <button
                    onClick={() => onNavigate('edit-job-opening', { jobId: job.id })}
                    className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
                    title="Edit"
                  >
                    <Edit size={16} className="text-[#EF5226]" />
                  </button>
                  <button className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200">
                    <MoreVertical size={16} className="text-[#666666]" />
                  </button>
                </div>
              </div>

              {/* Progress Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                <div className="text-center">
                  <div className="neu-small p-4 rounded-2xl mb-2">
                    <Users size={24} className="text-[#666666] mx-auto" />
                  </div>
                  <p className="text-2xl font-bold text-[#333333]">{job.progress.applications}</p>
                  <p className="text-sm text-[#666666]">Applications</p>
                </div>
                
                <div className="text-center">
                  <div className="neu-small p-4 rounded-2xl mb-2">
                    <CheckCircle size={24} className="text-[#05A7CC] mx-auto" />
                  </div>
                  <p className="text-2xl font-bold text-[#333333]">{job.progress.shortlisted}</p>
                  <p className="text-sm text-[#666666]">Shortlisted</p>
                </div>
                
                <div className="text-center">
                  <div className="neu-small p-4 rounded-2xl mb-2">
                    <Calendar size={24} className="text-[#EF5226] mx-auto" />
                  </div>
                  <p className="text-2xl font-bold text-[#333333]">{job.progress.interviews}</p>
                  <p className="text-sm text-[#666666]">Interviews</p>
                </div>
                
                <div className="text-center">
                  <div className="neu-small p-4 rounded-2xl mb-2">
                    <CheckCircle size={24} className="text-[#EF5226] mx-auto" />
                  </div>
                  <p className="text-2xl font-bold text-[#333333]">{job.progress.offers}</p>
                  <p className="text-sm text-[#666666]">Offers</p>
                </div>
                
                <div className="text-center">
                  <div className="neu-small p-4 rounded-2xl mb-2">
                    <Users size={24} className="text-green-500 mx-auto" />
                  </div>
                  <p className="text-2xl font-bold text-[#333333]">{job.progress.hired}</p>
                  <p className="text-sm text-[#666666]">Hired</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-[#666666]">
                  <span>Hiring Progress</span>
                  <span>{Math.round((job.progress.hired / (job.progress.hired + job.progress.offers + 1)) * 100)}% Complete</span>
                </div>
                <div className="neu-card-inset rounded-2xl p-2">
                  <div className="flex space-x-1">
                    <div className="h-3 bg-[#05A7CC] rounded-xl" style={{ width: `${(job.progress.shortlisted / job.progress.applications) * 100}%` }}></div>
                    <div className="h-3 bg-[#EF5226] rounded-xl" style={{ width: `${(job.progress.interviews / job.progress.applications) * 100}%` }}></div>
                    <div className="h-3 bg-green-500 rounded-xl" style={{ width: `${(job.progress.hired / job.progress.applications) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-[#666666]">
                  <span>Applied</span>
                  <span>Shortlisted</span>
                  <span>Interviewed</span>
                  <span>Hired</span>
                </div>
              </div>

              {/* Timeline Info */}
              <div className="mt-6 pt-6 border-t border-[#E8EBEF]">
                <div className="flex items-center justify-between text-sm text-[#666666]">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Posted: {job.postedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>Expires: {job.expiryDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Active for {job.daysActive} days</span>
                    <span>•</span>
                    <span>{job.applications} applications received</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedJobs.length === 0 && (
        <div className="neu-card p-12 rounded-3xl text-center">
          <Archive size={48} className="text-[#666666] mx-auto mb-4" />
          <p className="text-[#666666] text-lg">No job openings found</p>
          <p className="text-[#666666] text-sm">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
};