import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Phone, Plus, Filter, Search, Eye, Edit, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

export const InterviewsList = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const interviews = [
    {
      id: 1,
      candidateName: 'Alice Johnson',
      jobTitle: 'Senior Software Engineer',
      type: 'Technical Interview',
      mode: 'Video Call',
      interviewer: 'Michael Chen',
      date: '2024-01-25',
      time: '3:00 PM',
      duration: '90 minutes',
      status: 'Scheduled',
      location: 'Zoom Meeting',
      notes: 'Focus on system design and algorithms',
      candidateId: 1,
      jobId: 1
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Product Manager',
      type: 'Behavioral Interview',
      mode: 'In-Person',
      interviewer: 'Sarah Wilson',
      date: '2024-01-24',
      time: '11:00 AM',
      duration: '60 minutes',
      status: 'Completed',
      location: 'Conference Room A',
      notes: 'Assess leadership and communication skills',
      candidateId: 2,
      jobId: 2,
      feedback: {
        rating: 4.5,
        summary: 'Strong leadership background, excellent communication'
      }
    },
    {
      id: 3,
      candidateName: 'Sarah Williams',
      jobTitle: 'UX Designer',
      type: 'Portfolio Review',
      mode: 'Video Call',
      interviewer: 'Lisa Davis',
      date: '2024-01-26',
      time: '2:30 PM',
      duration: '45 minutes',
      status: 'Scheduled',
      location: 'Google Meet',
      notes: 'Review design portfolio and case studies',
      candidateId: 3,
      jobId: 3
    },
    {
      id: 4,
      candidateName: 'David Rodriguez',
      jobTitle: 'DevOps Engineer',
      type: 'Technical Interview',
      mode: 'Phone',
      interviewer: 'Tom Wilson',
      date: '2024-01-23',
      time: '10:00 AM',
      duration: '60 minutes',
      status: 'Completed',
      location: 'Phone Call',
      notes: 'Infrastructure and automation questions',
      candidateId: 4,
      jobId: 4,
      feedback: {
        rating: 4.8,
        summary: 'Excellent technical knowledge and practical experience'
      }
    },
    {
      id: 5,
      candidateName: 'Emma Thompson',
      jobTitle: 'Marketing Specialist',
      type: 'Phone Screening',
      mode: 'Phone',
      interviewer: 'John Smith',
      date: '2024-01-27',
      time: '9:30 AM',
      duration: '30 minutes',
      status: 'Scheduled',
      location: 'Phone Call',
      notes: 'Initial screening and culture fit assessment',
      candidateId: 5,
      jobId: 5
    },
    {
      id: 6,
      candidateName: 'James Wilson',
      jobTitle: 'Senior Software Engineer',
      type: 'Final Interview',
      mode: 'In-Person',
      interviewer: 'CEO - Mark Johnson',
      date: '2024-01-22',
      time: '4:00 PM',
      duration: '45 minutes',
      status: 'Completed',
      location: 'Executive Conference Room',
      notes: 'Final decision interview with leadership',
      candidateId: 6,
      jobId: 1,
      feedback: {
        rating: 4.2,
        summary: 'Good technical skills, needs improvement in leadership'
      }
    },
    {
      id: 7,
      candidateName: 'Rachel Green',
      jobTitle: 'Data Scientist',
      type: 'Technical Interview',
      mode: 'Video Call',
      interviewer: 'Dr. Smith',
      date: '2024-01-28',
      time: '1:00 PM',
      duration: '120 minutes',
      status: 'Cancelled',
      location: 'Teams Meeting',
      notes: 'Machine learning and statistics assessment',
      candidateId: 7,
      jobId: 6
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'text-blue-600 bg-blue-50';
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      case 'Rescheduled': return 'text-yellow-600 bg-yellow-50';
      case 'No Show': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'Video Call': return <Video size={16} className="text-[#05A7CC]" />;
      case 'Phone': return <Phone size={16} className="text-[#EF5226]" />;
      case 'In-Person': return <MapPin size={16} className="text-[#666666]" />;
      default: return <Calendar size={16} className="text-[#666666]" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesType = filterType === 'all' || interview.type === filterType;
    
    let matchesDate = true;
    if (filterDate !== 'all') {
      const today = new Date();
      const interviewDate = new Date(interview.date);
      
      switch (filterDate) {
        case 'today':
          matchesDate = interviewDate.toDateString() === today.toDateString();
          break;
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          matchesDate = interviewDate.toDateString() === tomorrow.toDateString();
          break;
        case 'this-week':
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          matchesDate = interviewDate >= weekStart && interviewDate <= weekEnd;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Interviews</h1>
          <p className="text-[#666666]">Manage and track all interview sessions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('interview-calendar')}
            className="neu-button px-6 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            Calendar View
          </button>
          <button
            onClick={() => onNavigate('new-interview')}
            className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all duration-200 hover:shadow-lg"
          >
            <Plus size={20} />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neu-input w-full pl-12 pr-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="No Show">No Show</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Types</option>
            <option value="Phone Screening">Phone Screening</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="Behavioral Interview">Behavioral Interview</option>
            <option value="Portfolio Review">Portfolio Review</option>
            <option value="Final Interview">Final Interview</option>
          </select>

          {/* Date Filter */}
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 neu-input p-2 rounded-2xl">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                viewMode === 'list' ? 'neu-primary text-white' : 'text-[#666666]'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                viewMode === 'calendar' ? 'neu-primary text-white' : 'text-[#666666]'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Total Interviews</p>
              <p className="text-2xl font-bold text-[#333333]">{interviews.length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Calendar size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-[#333333]">{interviews.filter(i => i.status === 'Scheduled').length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Clock size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Completed</p>
              <p className="text-2xl font-bold text-[#333333]">{interviews.filter(i => i.status === 'Completed').length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">This Week</p>
              <p className="text-2xl font-bold text-[#333333]">5</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Calendar size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Interviews List */}
      <div className="space-y-6">
        {sortedInterviews.map((interview) => (
          <div key={interview.id} className="neu-card p-8 rounded-3xl">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="neu-small w-16 h-16 rounded-3xl flex items-center justify-center">
                  <User size={32} className="text-[#666666]" />
                </div>

                {/* Interview Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-1">{interview.candidateName}</h3>
                      <p className="text-[#EF5226] font-medium mb-2">{interview.jobTitle}</p>
                      <div className="flex items-center space-x-4 text-sm text-[#666666] mb-3">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span>Duration: {interview.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#666666]">
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>Interviewer: {interview.interviewer}</span>
                        </div>
                        <div className="flex items-center">
                          {getModeIcon(interview.mode)}
                          <span className="ml-1">{interview.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interview Type and Status */}
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="neu-small px-4 py-2 rounded-2xl text-sm text-[#333333] font-medium">
                      {interview.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                    <span className="text-xs text-[#666666] bg-[#E8EBEF] px-3 py-1 rounded-full">
                      {interview.mode}
                    </span>
                  </div>

                  {/* Notes */}
                  {interview.notes && (
                    <p className="text-sm text-[#666666] bg-[#F5F8FB] p-3 rounded-2xl mb-4">
                      <strong>Notes:</strong> {interview.notes}
                    </p>
                  )}

                  {/* Feedback (for completed interviews) */}
                  {interview.feedback && (
                    <div className="bg-green-50 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-green-600 font-medium text-sm">Interview Completed</span>
                        <span className="text-sm text-[#666666]">Rating: {interview.feedback.rating}/5</span>
                      </div>
                      <p className="text-sm text-[#333333]">{interview.feedback.summary}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('interview-details', { interviewId: interview.id })}
                  className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
                  title="View Details"
                >
                  <Eye size={20} className="text-[#05A7CC]" />
                </button>
                
                {interview.status === 'Scheduled' && (
                  <button
                    onClick={() => onNavigate('edit-interview', { interviewId: interview.id })}
                    className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
                    title="Edit Interview"
                  >
                    <Edit size={20} className="text-[#EF5226]" />
                  </button>
                )}

                {interview.status === 'Completed' && !interview.feedback && (
                  <button
                    onClick={() => onNavigate('interview-feedback', { interviewId: interview.id })}
                    className="neu-secondary px-4 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
                  >
                    Add Feedback
                  </button>
                )}

                <button className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200">
                  <MoreVertical size={20} className="text-[#666666]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedInterviews.length === 0 && (
        <div className="neu-card p-12 rounded-3xl text-center">
          <Calendar size={48} className="text-[#666666] mx-auto mb-4" />
          <p className="text-[#666666] text-lg">No interviews found</p>
          <p className="text-[#666666] text-sm">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};