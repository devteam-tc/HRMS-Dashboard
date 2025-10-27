import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Download, Calendar, Users, Clock, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const meetings = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: '2024-01-15',
    time: '09:00 AM',
    duration: '30 min',
    participants: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
    department: 'Engineering',
    location: 'Conference Room A',
    status: 'completed',
    organizer: 'John Doe',
    attachments: 2,
    hasMinutes: true
  },
  {
    id: '2',
    title: 'Product Planning Q1 2024',
    date: '2024-01-16',
    time: '02:00 PM',
    duration: '120 min',
    participants: ['Jane Smith', 'Alice Johnson', 'Bob Brown', 'Carol Davis', 'David Miller'],
    department: 'Product',
    location: 'Board Room',
    status: 'scheduled',
    organizer: 'Jane Smith',
    attachments: 5,
    hasMinutes: false
  },
  {
    id: '3',
    title: 'HR Policy Review',
    date: '2024-01-14',
    time: '11:00 AM',
    duration: '90 min',
    participants: ['Sarah Wilson', 'Mike Johnson', 'Emma Garcia'],
    department: 'HR',
    location: 'Virtual Meeting',
    status: 'completed',
    organizer: 'Sarah Wilson',
    attachments: 3,
    hasMinutes: true
  },
  {
    id: '4',
    title: 'Marketing Campaign Review',
    date: '2024-01-17',
    time: '03:30 PM',
    duration: '60 min',
    participants: ['Carol Davis', 'David Miller', 'Emma Garcia', 'Frank Wilson'],
    department: 'Marketing',
    location: 'Meeting Room B',
    status: 'scheduled',
    organizer: 'Carol Davis',
    attachments: 1,
    hasMinutes: false
  },
  {
    id: '5',
    title: 'Client Project Kickoff',
    date: '2024-01-13',
    time: '10:00 AM',
    duration: '45 min',
    participants: ['John Doe', 'Jane Smith', 'Alice Johnson'],
    department: 'Engineering',
    location: 'Conference Room C',
    status: 'cancelled',
    organizer: 'John Doe',
    attachments: 0,
    hasMinutes: false
  }
];

export const AllMeetings = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || meeting.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || meeting.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      case 'scheduled':
        return 'bg-[#05A7CC] text-white';
      case 'cancelled':
        return 'bg-[#EF5226] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const departments = [...new Set(meetings.map(meeting => meeting.department))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">All Meetings</h1>
            <p className="text-[#666666]">Manage and view all meeting records and minutes</p>
          </div>
          <button 
            onClick={() => onNavigate('new-meeting')}
            className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Meeting</span>
          </button>
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
                placeholder="Search meetings by title or organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
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

          {/* Department Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
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
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{meetings.length}</div>
          <div className="text-[#666666]">Total Meetings</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {meetings.filter(m => m.status === 'scheduled').length}
          </div>
          <div className="text-[#666666]">Scheduled</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {meetings.filter(m => m.status === 'completed').length}
          </div>
          <div className="text-[#666666]">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#EF5226] mb-2">
            {meetings.filter(m => m.status === 'cancelled').length}
          </div>
          <div className="text-[#666666]">Cancelled</div>
        </div>
      </div>

      {/* Meetings List */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="neu-small p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Meeting Icon */}
                  <div className="neu-small rounded-2xl p-4">
                    <Calendar className="w-8 h-8 text-[#05A7CC]" />
                  </div>

                  {/* Meeting Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-[#333333]">{meeting.title}</h3>
                      <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(meeting.status)}`}>
                        {meeting.status.toUpperCase()}
                      </div>
                      {meeting.hasMinutes && (
                        <div className="neu-small px-3 py-1 rounded-xl text-xs font-medium bg-[#9C27B0] text-white">
                          MOM
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{meeting.time} ({meeting.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{meeting.participants.length} participants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{meeting.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4">
                      <div className="text-sm text-[#666666]">
                        <span>Organized by: </span>
                        <span className="font-medium text-[#333333]">{meeting.organizer}</span>
                      </div>
                      <div className="text-sm text-[#666666]">
                        <span>Department: </span>
                        <span className="font-medium text-[#333333]">{meeting.department}</span>
                      </div>
                      {meeting.attachments > 0 && (
                        <div className="flex items-center space-x-1 text-sm text-[#05A7CC]">
                          <Download className="w-4 h-4" />
                          <span>{meeting.attachments} files</span>
                        </div>
                      )}
                    </div>

                    {/* Participants Preview */}
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-sm text-[#666666]">Participants:</span>
                      <div className="flex -space-x-2">
                        {meeting.participants.slice(0, 4).map((participant, index) => (
                          <Avatar key={index} className="w-8 h-8 border-2 border-[#ECF0F3]">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                              {participant.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {meeting.participants.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-[#E8EBEF] border-2 border-[#ECF0F3] flex items-center justify-center">
                            <span className="text-xs text-[#666666]">+{meeting.participants.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onNavigate('meeting-details', meeting.id)}
                    className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => onNavigate('edit-meeting', meeting.id)}
                    className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <Calendar className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No meetings found</h3>
              <p className="text-[#666666]">Try adjusting your search filters or create a new meeting.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredMeetings.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {filteredMeetings.length} of {meetings.length} meetings
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