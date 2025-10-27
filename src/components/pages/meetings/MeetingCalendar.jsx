import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Users, Clock, MapPin, Grid, List } from 'lucide-react';

const calendarMeetings = [
  { id: '1', title: 'Team Standup', date: '2024-01-15', time: '09:00', duration: 30, participants: 4, status: 'completed', color: '#4CAF50' },
  { id: '2', title: 'Product Review', date: '2024-01-16', time: '14:00', duration: 120, participants: 6, status: 'scheduled', color: '#05A7CC' },
  { id: '3', title: 'HR Policy Meeting', date: '2024-01-17', time: '11:00', duration: 90, participants: 3, status: 'scheduled', color: '#9C27B0' },
  { id: '4', title: 'Client Presentation', date: '2024-01-18', time: '15:30', duration: 60, participants: 8, status: 'scheduled', color: '#FF9800' },
  { id: '5', title: 'Sprint Planning', date: '2024-01-19', time: '10:00', duration: 45, participants: 5, status: 'scheduled', color: '#05A7CC' },
  { id: '6', title: 'Design Review', date: '2024-01-22', time: '13:00', duration: 75, participants: 4, status: 'scheduled', color: '#E91E63' },
  { id: '7', title: 'All Hands Meeting', date: '2024-01-23', time: '16:00', duration: 60, participants: 15, status: 'scheduled', color: '#2196F3' }
];

export const MeetingCalendar = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)); // January 15, 2024
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getMeetingsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return calendarMeetings.filter(meeting => meeting.date === dateString);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onNavigate('calendar-add-meeting', { date: date.toISOString().split('T')[0] });
  };

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {daysOfWeek.map(day => (
          <div key={day} className="neu-card-inset p-4 rounded-2xl text-center">
            <span className="font-medium text-[#333333]">{day}</span>
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((date, index) => {
          if (!date) return <div key={index} className="h-32"></div>;
          
          const meetings = getMeetingsForDate(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          
          return (
            <div 
              key={index} 
              className={`h-32 neu-card rounded-2xl p-3 cursor-pointer transition-all hover:scale-105 ${
                isToday ? 'ring-2 ring-[#05A7CC]' : ''
              } ${!isCurrentMonth ? 'opacity-50' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <div className={`text-sm font-medium mb-2 ${
                isToday ? 'text-[#05A7CC]' : 'text-[#333333]'
              }`}>
                {date.getDate()}
              </div>
              
              <div className="space-y-1">
                {meetings.slice(0, 2).map(meeting => (
                  <div 
                    key={meeting.id}
                    className="text-xs p-2 rounded-lg text-white truncate"
                    style={{ backgroundColor: meeting.color }}
                    title={`${meeting.title} at ${meeting.time}`}
                  >
                    {meeting.title}
                  </div>
                ))}
                {meetings.length > 2 && (
                  <div className="text-xs text-[#666666] text-center">
                    +{meetings.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates();
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-8 gap-4">
          {/* Time column */}
          <div className="space-y-12">
            <div className="h-12"></div> {/* Header spacer */}
            {hours.map(hour => (
              <div key={hour} className="h-12 flex items-center">
                <span className="text-sm text-[#666666]">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDates.map((date, dayIndex) => {
            const meetings = getMeetingsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div key={dayIndex} className="space-y-1">
                {/* Day header */}
                <div className={`neu-small p-3 rounded-2xl text-center ${
                  isToday ? 'neu-primary text-white' : ''
                }`}>
                  <div className="text-sm font-medium">
                    {daysOfWeek[date.getDay()]}
                  </div>
                  <div className="text-lg font-bold">
                    {date.getDate()}
                  </div>
                </div>

                {/* Time slots */}
                <div className="space-y-1 relative">
                  {hours.map(hour => (
                    <div 
                      key={hour} 
                      className="h-12 neu-card-inset rounded-xl cursor-pointer hover:bg-[#E8EBEF] transition-colors"
                      onClick={() => handleDateClick(date)}
                    ></div>
                  ))}

                  {/* Meetings overlay */}
                  {meetings.map(meeting => {
                    const startHour = parseInt(meeting.time.split(':')[0]);
                    const startMinute = parseInt(meeting.time.split(':')[1]);
                    const topPosition = ((startHour - 8) * 52) + (startMinute / 60 * 52);
                    const height = (meeting.duration / 60) * 52;

                    return (
                      <div
                        key={meeting.id}
                        className="absolute left-0 right-0 p-2 rounded-lg text-white text-xs cursor-pointer hover:opacity-80"
                        style={{
                          backgroundColor: meeting.color,
                          top: `${topPosition}px`,
                          height: `${height}px`,
                          minHeight: '24px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('meeting-details', meeting.id);
                        }}
                      >
                        <div className="font-medium truncate">{meeting.title}</div>
                        <div className="text-xs opacity-80">
                          {meeting.time} • {meeting.participants} people
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const meetings = getMeetingsForDate(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 8);

    return (
      <div className="neu-card p-8 rounded-3xl">
        <div className="grid grid-cols-2 gap-8">
          {/* Time slots */}
          <div className="space-y-1 relative">
            {hours.map(hour => (
              <div key={hour} className="flex items-center space-x-4 h-16">
                <div className="w-20 text-right">
                  <span className="text-sm text-[#666666]">
                    {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                  </span>
                </div>
                <div 
                  className="flex-1 h-12 neu-card-inset rounded-xl cursor-pointer hover:bg-[#E8EBEF] transition-colors"
                  onClick={() => handleDateClick(currentDate)}
                ></div>
              </div>
            ))}

            {/* Meetings overlay */}
            {meetings.map(meeting => {
              const startHour = parseInt(meeting.time.split(':')[0]);
              const startMinute = parseInt(meeting.time.split(':')[1]);
              const topPosition = ((startHour - 8) * 68) + (startMinute / 60 * 68);
              const height = (meeting.duration / 60) * 68;

              return (
                <div
                  key={meeting.id}
                  className="absolute right-0 p-4 rounded-lg text-white cursor-pointer hover:opacity-80"
                  style={{
                    backgroundColor: meeting.color,
                    top: `${topPosition}px`,
                    height: `${height}px`,
                    width: 'calc(100% - 100px)',
                    left: '100px',
                    minHeight: '48px'
                  }}
                  onClick={() => onNavigate('meeting-details', meeting.id)}
                >
                  <div className="font-medium">{meeting.title}</div>
                  <div className="text-sm opacity-80">
                    {meeting.time} • {meeting.duration} min • {meeting.participants} people
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day details */}
          <div className="space-y-6">
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-[#333333] mb-4">
                {currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#05A7CC]" />
                  <span className="text-[#666666]">{meetings.length} meetings scheduled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#05A7CC]" />
                  <span className="text-[#666666]">
                    {meetings.reduce((total, meeting) => total + meeting.duration, 0)} minutes total
                  </span>
                </div>
              </div>
            </div>

            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Meetings Today</h4>
              <div className="space-y-3">
                {meetings.map(meeting => (
                  <div key={meeting.id} className="neu-card-inset p-4 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: meeting.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="font-medium text-[#333333]">{meeting.title}</div>
                        <div className="text-sm text-[#666666]">
                          {meeting.time} • {meeting.duration} min • {meeting.participants} participants
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {meetings.length === 0 && (
                  <div className="text-center text-[#666666] py-8">
                    No meetings scheduled for today
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Meeting Calendar</h1>
              <p className="text-[#666666]">View and manage your meeting schedule</p>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  if (viewMode === 'month') navigateMonth(-1);
                  else if (viewMode === 'week') navigateWeek(-1);
                  else navigateDay(-1);
                }}
                className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-center min-w-[200px]">
                <div className="text-xl font-bold text-[#333333]">
                  {viewMode === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  {viewMode === 'week' && `Week of ${currentDate.toLocaleDateString()}`}
                  {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  if (viewMode === 'month') navigateMonth(1);
                  else if (viewMode === 'week') navigateWeek(1);
                  else navigateDay(1);
                }}
                className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              {['month', 'week', 'day'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    viewMode === mode 
                      ? 'neu-primary text-white' 
                      : 'text-[#666666] hover:text-[#333333]'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
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
      </div>

      {/* Calendar View */}
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}

      {/* Legend */}
      <div className="neu-card p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Meeting Status</h3>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#4CAF50] rounded-full"></div>
            <span className="text-[#666666]">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#05A7CC] rounded-full"></div>
            <span className="text-[#666666]">Scheduled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#EF5226] rounded-full"></div>
            <span className="text-[#666666]">Cancelled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#FFC107] rounded-full"></div>
            <span className="text-[#666666]">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};