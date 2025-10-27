import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, Eye, Edit, Trash2, Calendar, User, MapPin, FileText, Image, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const siteVisits = [
  {
    id: '1',
    date: '2024-01-18',
    time: '09:00 AM',
    visitor: 'John Doe',
    role: 'Project Manager',
    purpose: 'Weekly Progress Inspection',
    area: 'Foundation Section A',
    duration: '2 hours',
    status: 'completed',
    notes: 'Foundation work progressing well. Concrete pour quality meets specifications. No safety issues observed.',
    attachments: 3,
    photos: 5,
    nextVisit: '2024-01-25',
    weather: 'Sunny, 72°F',
    findings: [
      { type: 'positive', item: 'Foundation work on schedule' },
      { type: 'issue', item: 'Minor concrete surface imperfection in northwest corner' },
      { type: 'recommendation', item: 'Recommend surface grinding before next phase' }
    ]
  },
  {
    id: '2',
    date: '2024-01-16',
    time: '02:30 PM',
    visitor: 'Alice Johnson',
    role: 'Site Engineer',
    purpose: 'Quality Control Check',
    area: 'Steel Framework Level 5-8',
    duration: '1.5 hours',
    status: 'completed',
    notes: 'Steel framework installation proceeding according to plan. All welds inspected and approved.',
    attachments: 2,
    photos: 8,
    nextVisit: '2024-01-20',
    weather: 'Cloudy, 68°F',
    findings: [
      { type: 'positive', item: 'All welds meet quality standards' },
      { type: 'positive', item: 'Installation timeline on track' },
      { type: 'note', item: 'Weather delays possible next week' }
    ]
  },
  {
    id: '3',
    date: '2024-01-14',
    time: '11:00 AM',
    visitor: 'Bob Smith',
    role: 'Safety Officer',
    purpose: 'Safety Compliance Audit',
    area: 'Entire Site',
    duration: '3 hours',
    status: 'completed',
    notes: 'Comprehensive safety audit completed. All safety protocols being followed. Minor recommendations for improvement.',
    attachments: 4,
    photos: 12,
    nextVisit: '2024-01-21',
    weather: 'Rainy, 65°F',
    findings: [
      { type: 'positive', item: 'All safety protocols followed' },
      { type: 'recommendation', item: 'Add additional safety signage in zone C' },
      { type: 'issue', item: 'Hard hat compliance at 95% - needs improvement' }
    ]
  },
  {
    id: '4',
    date: '2024-01-12',
    time: '08:00 AM',
    visitor: 'Carol Davis',
    role: 'Quality Inspector',
    purpose: 'Material Inspection',
    area: 'Material Storage Area',
    duration: '1 hour',
    status: 'completed',
    notes: 'All materials inspected and certified. Storage conditions adequate. Documentation complete.',
    attachments: 1,
    photos: 3,
    nextVisit: '2024-01-19',
    weather: 'Clear, 70°F',
    findings: [
      { type: 'positive', item: 'All materials meet specifications' },
      { type: 'positive', item: 'Storage conditions optimal' },
      { type: 'note', item: 'New material delivery scheduled for next week' }
    ]
  },
  {
    id: '5',
    date: '2024-01-10',
    time: '03:00 PM',
    visitor: 'David Brown',
    role: 'Client Representative',
    purpose: 'Progress Review Meeting',
    area: 'Site Office',
    duration: '2.5 hours',
    status: 'completed',
    notes: 'Client review meeting. Progress presented and approved. Minor design changes discussed.',
    attachments: 6,
    photos: 2,
    nextVisit: '2024-01-24',
    weather: 'Sunny, 75°F',
    findings: [
      { type: 'positive', item: 'Client satisfied with progress' },
      { type: 'note', item: 'Minor design modifications approved' },
      { type: 'action', item: 'Updated drawings to be provided by Friday' }
    ]
  }
];

export const SiteVisitLog = ({ projectId, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredVisits = siteVisits.filter(visit => {
    const matchesSearch = visit.visitor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = selectedPurpose === 'all' || visit.purpose.toLowerCase().includes(selectedPurpose.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || visit.status === selectedStatus;
    
    return matchesSearch && matchesPurpose && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      case 'in-progress':
        return 'bg-[#05A7CC] text-white';
      case 'pending':
        return 'bg-[#FFC107] text-white';
      case 'cancelled':
        return 'bg-[#EF5226] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getFindingIcon = (type) => {
    switch (type) {
      case 'positive':
        return '✅';
      case 'issue':
        return '⚠️';
      case 'recommendation':
        return '💡';
      case 'action':
        return '🎯';
      case 'note':
        return '📝';
      default:
        return '•';
    }
  };

  const uniquePurposes = [...new Set(siteVisits.map(visit => visit.purpose))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('project-details', projectId)}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Site Visit Log</h1>
              <p className="text-[#666666]">Track and manage all site visits and inspections</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('site-visit-log-new', projectId)}
            className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Log New Visit</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div>
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>

          {/* Purpose Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Purposes</option>
                {uniquePurposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
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
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{siteVisits.length}</div>
          <div className="text-[#666666]">Total Visits</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {siteVisits.filter(v => v.status === 'completed').length}
          </div>
          <div className="text-[#666666]">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {siteVisits.reduce((total, visit) => total + visit.photos, 0)}
          </div>
          <div className="text-[#666666]">Photos Taken</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">
            {siteVisits.reduce((total, visit) => total + visit.attachments, 0)}
          </div>
          <div className="text-[#666666]">Documents</div>
        </div>
      </div>

      {/* Visit List */}
      <div className="space-y-6">
        {filteredVisits.map((visit) => (
          <div key={visit.id} className="neu-card p-8 rounded-3xl hover:scale-105 transition-transform duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Visit Header */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-lg">
                        {visit.visitor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333]">{visit.visitor}</h3>
                      <p className="text-[#666666]">{visit.role}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-4 h-4 text-[#666666]" />
                        <span className="text-sm text-[#666666]">
                          {new Date(visit.date).toLocaleDateString()} at {visit.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(visit.status)}`}>
                      {visit.status.replace('-', ' ').toUpperCase()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onNavigate('site-visit-details', visit.id)}
                        className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Details */}
              <div>
                <h4 className="text-lg font-bold text-[#333333] mb-4">Visit Details</h4>
                <div className="space-y-3">
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-4 h-4 text-[#05A7CC]" />
                      <span className="font-medium text-[#333333]">Purpose</span>
                    </div>
                    <p className="text-[#666666]">{visit.purpose}</p>
                  </div>
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="w-4 h-4 text-[#05A7CC]" />
                      <span className="font-medium text-[#333333]">Area</span>
                    </div>
                    <p className="text-[#666666]">{visit.area}</p>
                  </div>
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-4 h-4 text-[#05A7CC]" />
                      <span className="font-medium text-[#333333]">Duration</span>
                    </div>
                    <p className="text-[#666666]">{visit.duration}</p>
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div>
                <h4 className="text-lg font-bold text-[#333333] mb-4">Key Findings</h4>
                <div className="space-y-2">
                  {visit.findings.map((finding, index) => (
                    <div key={index} className="neu-small p-3 rounded-2xl flex items-start space-x-3">
                      <span className="text-lg">{getFindingIcon(finding.type)}</span>
                      <span className="text-sm text-[#666666] flex-1">{finding.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments & Photos */}
              <div>
                <h4 className="text-lg font-bold text-[#333333] mb-4">Documentation</h4>
                <div className="space-y-3">
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-[#05A7CC]" />
                        <span className="text-[#333333]">Attachments</span>
                      </div>
                      <span className="font-bold text-[#333333]">{visit.attachments}</span>
                    </div>
                  </div>
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image className="w-5 h-5 text-[#05A7CC]" />
                        <span className="text-[#333333]">Photos</span>
                      </div>
                      <span className="font-bold text-[#333333]">{visit.photos}</span>
                    </div>
                  </div>
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="text-sm text-[#666666] mb-1">Weather</div>
                    <div className="text-[#333333]">{visit.weather}</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="lg:col-span-3">
                <h4 className="text-lg font-bold text-[#333333] mb-4">Visit Notes</h4>
                <div className="neu-card-inset p-6 rounded-2xl">
                  <p className="text-[#666666] leading-relaxed">{visit.notes}</p>
                </div>
                {visit.nextVisit && (
                  <div className="mt-4 neu-small p-4 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-[#05A7CC]" />
                      <span className="text-[#666666]">Next visit scheduled for: </span>
                      <span className="font-medium text-[#333333]">{new Date(visit.nextVisit).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVisits.length === 0 && (
        <div className="text-center py-12">
          <div className="neu-card-inset p-8 rounded-3xl inline-block">
            <FileText className="w-16 h-16 text-[#666666] mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#333333] mb-2">No visits found</h3>
            <p className="text-[#666666]">Try adjusting your search filters or log a new site visit.</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredVisits.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {filteredVisits.length} of {siteVisits.length} visits
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