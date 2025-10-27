import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin, Plus, Eye } from 'lucide-react';

export const OnboardingCalendar = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Alice Johnson - First Day',
      type: 'joining',
      date: '2024-01-15',
      time: '09:00',
      duration: 480, // minutes
      employee: 'Alice Johnson',
      position: 'Software Engineer',
      location: 'San Francisco Office',
      description: 'New employee first day onboarding',
      attendees: ['HR Team', 'John Smith (Manager)', 'Sarah Davis (Buddy)'],
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Bob Smith - Office Tour',
      type: 'orientation',
      date: '2024-01-20',
      time: '10:00',
      duration: 120,
      employee: 'Bob Smith',
      position: 'Product Manager',
      location: 'San Francisco Office',
      description: 'Office tour and team introductions',
      attendees: ['HR Team', 'Sarah Davis'],
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Carol Davis - Security Training',
      type: 'training',
      date: '2024-01-22',
      time: '14:00',
      duration: 90,
      employee: 'Carol Davis',
      position: 'UX Designer',
      location: 'Conference Room A',
      description: 'Mandatory security and compliance training',
      attendees: ['Security Team', 'Carol Davis'],
      status: 'confirmed'
    },
    {
      id: 4,
      title: 'David Wilson - IT Setup',
      type: 'setup',
      date: '2024-01-25',
      time: '11:00',
      duration: 60,
      employee: 'David Wilson',
      position: 'Data Analyst',
      location: 'IT Department',
      description: 'System access setup and hardware allocation',
      attendees: ['IT Team', 'David Wilson'],
      status: 'pending'
    },
    {
      id: 5,
      title: 'Emma Brown - First Day',
      type: 'joining',
      date: '2024-02-05',
      time: '09:00',
      duration: 480,
      employee: 'Emma Brown',
      position: 'Marketing Manager',
      location: 'New York Office',
      description: 'New employee first day onboarding',
      attendees: ['HR Team', 'Tom Anderson (Manager)'],
      status: 'scheduled'
    },
    {
      id: 6,
      title: 'Frank Miller - Technical Training',
      type: 'training',
      date: '2024-02-08',
      time: '09:30',
      duration: 240,
      employee: 'Frank Miller',
      position: 'DevOps Engineer',
      location: 'Training Room B',
      description: 'Technical onboarding for DevOps tools and processes',
      attendees: ['Engineering Team', 'Frank Miller'],
      status: 'scheduled'
    },
    {
      id: 7,
      title: 'Alice Johnson - 30-Day Check-in',
      type: 'review',
      date: '2024-02-14',
      time: '15:00',
      duration: 60,
      employee: 'Alice Johnson',
      position: 'Software Engineer',
      location: 'Manager Office',
      description: '30-day onboarding progress review',
      attendees: ['HR Team', 'John Smith', 'Alice Johnson'],
      status: 'scheduled'
    },
    {
      id: 8,
      title: 'Company Orientation Session',
      type: 'orientation',
      date: '2024-01-24',
      time: '10:00',
      duration: 180,
      employee: 'Multiple',
      position: 'Various',
      location: 'Main Conference Room',
      description: 'Monthly company orientation for new hires',
      attendees: ['All New Hires', 'HR Team', 'Leadership'],
      status: 'confirmed'
    }
  ];

  const eventTypeColors = {
    joining: 'bg-green-100 text-green-800',
    orientation: 'bg-blue-100 text-blue-800',
    training: 'bg-purple-100 text-purple-800',
    setup: 'bg-orange-100 text-orange-800',
    review: 'bg-yellow-100 text-yellow-800'
  };

  const statusColors = {
    confirmed: 'text-green-600',
    pending: 'text-orange-600',
    scheduled: 'text-blue-600',
    cancelled: 'text-red-600'
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 neu-card-inset rounded-lg"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div key={day} className={`h-24 neu-card rounded-lg p-2 ${isToday ? 'ring-2 ring-[#05A7CC]' : ''}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-[#05A7CC]' : 'text-[#333333]'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`w-full text-xs p-1 rounded text-left truncate hover:scale-105 transition-all duration-200 ${eventTypeColors[event.type]}`}
              >
                {event.title}
              </button>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-[#666666]">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderUpcomingEvents = () => {
    const today = new Date();
    const upcomingEvents = events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    return upcomingEvents.map((event) => (
      <div key={event.id} className="neu-small p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-[#333333]">{event.title}</h4>
          <span className={`text-xs px-2 py-1 rounded-full neu-card capitalize ${eventTypeColors[event.type]}`}>
            {event.type}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#666666]">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className={`text-sm capitalize ${statusColors[event.status]}`}>
            {event.status}
          </span>
          <button 
            onClick={() => setSelectedEvent(event)}
            className="text-[#05A7CC] hover:scale-105 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('onboarding-list')}
            className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="mb-1 text-[#333333]">Onboarding Calendar</h1>
            <p className="text-[#666666]">Schedule and track onboarding events</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center neu-card rounded-xl">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-l-xl transition-all duration-200 ${
                viewMode === 'month' ? 'neu-primary text-white' : 'text-[#666666] hover:text-[#05A7CC]'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 transition-all duration-200 ${
                viewMode === 'week' ? 'neu-primary text-white' : 'text-[#666666] hover:text-[#05A7CC]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-r-xl transition-all duration-200 ${
                viewMode === 'day' ? 'neu-primary text-white' : 'text-[#666666] hover:text-[#05A7CC]'
              }`}
            >
              Day
            </button>
          </div>
          <button className="neu-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200">
            <Plus className="h-5 w-5" />
            Schedule Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3">
          {/* Calendar Header */}
          <div className="neu-card p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigateMonth(-1)}
                  className="neu-button p-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold text-[#333333]">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button 
                  onClick={() => navigateMonth(1)}
                  className="neu-button p-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="neu-button px-4 py-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
              >
                Today
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-[#666666] py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendarGrid()}
            </div>
          </div>

          {/* Event Legend */}
          <div className="neu-card p-4 rounded-2xl">
            <h3 className="font-semibold text-[#333333] mb-3">Event Types</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(eventTypeColors).map(([type, colorClass]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                  <span className="text-sm text-[#666666] capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="font-semibold text-[#333333] mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {renderUpcomingEvents()}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="font-semibold text-[#333333] mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#666666]">New Joiners</span>
                <span className="font-semibold text-[#333333]">
                  {events.filter(e => e.type === 'joining' && new Date(e.date).getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#666666]">Training Sessions</span>
                <span className="font-semibold text-[#333333]">
                  {events.filter(e => e.type === 'training' && new Date(e.date).getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#666666]">Orientations</span>
                <span className="font-semibold text-[#333333]">
                  {events.filter(e => e.type === 'orientation' && new Date(e.date).getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#666666]">Reviews</span>
                <span className="font-semibold text-[#333333]">
                  {events.filter(e => e.type === 'review' && new Date(e.date).getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-3xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#333333]">Event Details</h2>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="neu-button p-2 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#333333] mb-2">{selectedEvent.title}</h3>
                <p className="text-[#666666]">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#666666] block mb-1">Employee</label>
                  <p className="text-[#333333]">{selectedEvent.employee}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#666666] block mb-1">Position</label>
                  <p className="text-[#333333]">{selectedEvent.position}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#666666] block mb-1">Date & Time</label>
                  <p className="text-[#333333]">{selectedEvent.date} at {formatTime(selectedEvent.time)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#666666] block mb-1">Duration</label>
                  <p className="text-[#333333]">{formatDuration(selectedEvent.duration)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#666666] block mb-1">Location</label>
                <p className="text-[#333333]">{selectedEvent.location}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#666666] block mb-1">Attendees</label>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.attendees.map((attendee, index) => (
                    <span key={index} className="neu-small px-3 py-1 rounded-full text-sm text-[#333333]">
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-[#666666]">Status:</label>
                <span className={`text-sm capitalize px-3 py-1 rounded-full neu-card ${statusColors[selectedEvent.status]}`}>
                  {selectedEvent.status}
                </span>
                <span className={`text-sm capitalize px-3 py-1 rounded-full ${eventTypeColors[selectedEvent.type]}`}>
                  {selectedEvent.type}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button className="neu-primary px-6 py-3 rounded-xl hover:scale-105 transition-all duration-200">
                  Edit Event
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="neu-button px-6 py-3 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};