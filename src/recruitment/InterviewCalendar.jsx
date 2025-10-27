import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, User, Clock, Video, MapPin, Phone, Eye, Edit } from 'lucide-react';

export const InterviewCalendar = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock interview data
  const interviews = [
    {
      id: 1,
      candidateName: 'Alice Johnson',
      jobTitle: 'Senior Software Engineer',
      type: 'Technical Interview',
      mode: 'Video Call',
      interviewer: 'Michael Chen',
      date: '2024-01-25',
      time: '15:00',
      duration: '90 minutes',
      status: 'Scheduled',
      location: 'Zoom Meeting'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Product Manager',
      type: 'Behavioral Interview',
      mode: 'In-Person',
      interviewer: 'Sarah Wilson',
      date: '2024-01-24',
      time: '11:00',
      duration: '60 minutes',
      status: 'Completed',
      location: 'Conference Room A'
    },
    {
      id: 3,
      candidateName: 'Sarah Williams',
      jobTitle: 'UX Designer',
      type: 'Portfolio Review',
      mode: 'Video Call',
      interviewer: 'Lisa Davis',
      date: '2024-01-26',
      time: '14:30',
      duration: '45 minutes',
      status: 'Scheduled',
      location: 'Google Meet'
    },
    {
      id: 4,
      candidateName: 'David Rodriguez',
      jobTitle: 'DevOps Engineer',
      type: 'Final Interview',
      mode: 'In-Person',
      interviewer: 'Tom Wilson',
      date: '2024-01-29',
      time: '10:00',
      duration: '60 minutes',
      status: 'Scheduled',
      location: 'Executive Conference Room'
    },
    {
      id: 5,
      candidateName: 'Emma Thompson',
      jobTitle: 'Marketing Specialist',
      type: 'Phone Screening',
      mode: 'Phone',
      interviewer: 'John Smith',
      date: '2024-01-27',
      time: '09:30',
      duration: '30 minutes',
      status: 'Scheduled',
      location: 'Phone Call'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getInterviewsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return interviews.filter(interview => interview.date === dateString);
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'Video Call': return <Video size={12} className="text-[#05A7CC]" />;
      case 'Phone': return <Phone size={12} className="text-[#EF5226]" />;
      case 'In-Person': return <MapPin size={12} className="text-[#666666]" />;
      default: return <Calendar size={12} className="text-[#666666]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesType = filterType === 'all' || interview.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Interview Calendar</h1>
          <p className="text-[#666666]">Schedule and track interview sessions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('interviews-list')}
            className="neu-button px-6 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            List View
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

      {/* Calendar Controls */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="flex items-center justify-between">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
              >
                <ChevronLeft size={20} className="text-[#666666]" />
              </button>
              
              <div className="neu-small px-6 py-3 rounded-2xl">
                <h2 className="text-xl font-bold text-[#333333]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
              </div>
              
              <button
                onClick={() => navigateMonth(1)}
                className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
              >
                <ChevronRight size={20} className="text-[#666666]" />
              </button>
            </div>

            <button
              onClick={navigateToToday}
              className="neu-button px-4 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
            >
              Today
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="neu-input px-4 py-2 text-[#333333] focus:outline-none appearance-none"
            >
              <option value="all">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="neu-input px-4 py-2 text-[#333333] focus:outline-none appearance-none"
            >
              <option value="all">All Types</option>
              <option value="Phone Screening">Phone Screening</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="Behavioral Interview">Behavioral Interview</option>
              <option value="Portfolio Review">Portfolio Review</option>
              <option value="Final Interview">Final Interview</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 neu-input p-2 rounded-2xl">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-xl transition-all duration-200 capitalize ${
                    viewMode === mode ? 'neu-primary text-white' : 'text-[#666666]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="neu-card p-8 rounded-3xl">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center p-4">
              <span className="text-[#666666] font-medium">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth(currentDate).map((day, index) => {
            if (day === null) {
              return <div key={index} className="h-32"></div>;
            }

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayInterviews = getInterviewsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`h-32 neu-small rounded-2xl p-3 transition-all duration-200 hover:shadow-lg ${
                  isToday ? 'ring-2 ring-[#EF5226]' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-medium ${isToday ? 'text-[#EF5226]' : 'text-[#333333]'}`}>
                    {day}
                  </span>
                  {dayInterviews.length > 0 && (
                    <span className="neu-primary text-white text-xs px-2 py-1 rounded-full">
                      {dayInterviews.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {dayInterviews.slice(0, 2).map((interview) => (
                    <button
                      key={interview.id}
                      onClick={() => onNavigate('interview-details', { interviewId: interview.id })}
                      className={`w-full p-2 rounded-lg text-left transition-all duration-200 hover:shadow-md border ${getStatusColor(interview.status)}`}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        {getModeIcon(interview.mode)}
                        <span className="text-xs font-medium truncate">
                          {interview.time}
                        </span>
                      </div>
                      <p className="text-xs truncate">{interview.candidateName}</p>
                      <p className="text-xs truncate opacity-75">{interview.type}</p>
                    </button>
                  ))}
                  
                  {dayInterviews.length > 2 && (
                    <button
                      className="w-full text-xs text-[#05A7CC] hover:underline text-left"
                      onClick={() => {
                        // Filter interviews list by date
                        onNavigate('interviews-list', { date: date.toISOString().split('T')[0] });
                      }}
                    >
                      +{dayInterviews.length - 2} more
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Interviews */}
      <div className="mt-8 neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Today's Interviews</h3>
        
        {getInterviewsForDate(new Date()).length > 0 ? (
          <div className="space-y-4">
            {getInterviewsForDate(new Date()).map((interview) => (
              <div key={interview.id} className="neu-small p-6 rounded-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="neu-small w-12 h-12 rounded-2xl flex items-center justify-center">
                      <User size={24} className="text-[#666666]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#333333] mb-1">{interview.candidateName}</h4>
                      <p className="text-[#EF5226] text-sm font-medium mb-1">{interview.jobTitle}</p>
                      <div className="flex items-center space-x-4 text-xs text-[#666666]">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center">
                          {getModeIcon(interview.mode)}
                          <span className="ml-1">{interview.mode}</span>
                        </div>
                        <span>{interview.interviewer}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                    <button
                      onClick={() => onNavigate('interview-details', { interviewId: interview.id })}
                      className="neu-button p-2 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <Eye size={16} className="text-[#05A7CC]" />
                    </button>
                    <button
                      onClick={() => onNavigate('edit-interview', { interviewId: interview.id })}
                      className="neu-button p-2 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <Edit size={16} className="text-[#EF5226]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar size={48} className="text-[#666666] mx-auto mb-4" />
            <p className="text-[#666666] text-lg">No interviews scheduled for today</p>
            <button
              onClick={() => onNavigate('new-interview')}
              className="neu-primary px-6 py-3 rounded-2xl mt-4 hover:shadow-lg transition-all duration-200"
            >
              Schedule Interview
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 neu-card p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Legend</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Video size={16} className="text-[#05A7CC]" />
            <span className="text-[#333333] text-sm">Video Call</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-[#EF5226]" />
            <span className="text-[#333333] text-sm">Phone Call</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-[#666666]" />
            <span className="text-[#333333] text-sm">In-Person</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-[#333333] text-sm">Scheduled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-[#333333] text-sm">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-[#333333] text-sm">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};