import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Coffee, Home, Plane, Heart, Plus, Filter } from 'lucide-react';

export const AttendanceCalendar = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterView, setFilterView] = useState('all');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const attendanceData = {
    '2024-03-01': { status: 'present', checkIn: '09:00', checkOut: '18:00', employees: 42 },
    '2024-03-02': { status: 'holiday', type: 'company', name: 'Holi Festival', employees: 0 },
    '2024-03-04': { status: 'present', checkIn: '09:15', checkOut: '18:30', employees: 38, late: 5 },
    '2024-03-05': { status: 'present', checkIn: '08:45', checkOut: '17:45', employees: 45 },
    '2024-03-06': { status: 'leave', type: 'sick', employees: 35, leaves: 10 },
    '2024-03-07': { status: 'present', checkIn: '09:00', checkOut: '18:00', employees: 44 },
    '2024-03-08': { status: 'present', checkIn: '09:30', checkOut: '18:15', employees: 40, late: 8 },
    '2024-03-11': { status: 'present', checkIn: '08:55', checkOut: '18:05', employees: 43 },
    '2024-03-12': { status: 'leave', type: 'casual', employees: 37, leaves: 8 },
    '2024-03-13': { status: 'present', checkIn: '09:00', checkOut: '18:00', employees: 45 },
    '2024-03-14': { status: 'present', checkIn: '09:20', checkOut: '18:10', employees: 41, late: 6 },
    '2024-03-15': { status: 'holiday', type: 'company', name: 'Spring Break', employees: 0 },
    '2024-03-18': { status: 'present', checkIn: '08:50', checkOut: '17:50', employees: 44 },
    '2024-03-19': { status: 'present', checkIn: '09:05', checkOut: '18:20', employees: 42 },
    '2024-03-20': { status: 'leave', type: 'earned', employees: 39, leaves: 6 },
  };

  const leaveTypes = {
    sick: { icon: Heart, color: 'bg-red-100 text-red-600', label: 'Sick Leave' },
    casual: { icon: Coffee, color: 'bg-blue-100 text-blue-600', label: 'Casual Leave' },
    earned: { icon: Plane, color: 'bg-green-100 text-green-600', label: 'Earned Leave' },
    wfh: { icon: Home, color: 'bg-purple-100 text-purple-600', label: 'Work from Home' }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getStatusColor = (status, data) => {
    switch (status) {
      case 'present':
        return data.late ? 'border-[#EF5226] bg-orange-50' : 'border-green-500 bg-green-50';
      case 'holiday':
        return 'border-[#05A7CC] bg-blue-50';
      case 'leave':
        return 'border-[#EF5226] bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayData = attendanceData[dateKey];
      const isSelected = selectedDate === dateKey;
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateKey)}
          className={`h-24 p-2 neu-small rounded-xl cursor-pointer transition-all duration-200 ${
            isSelected ? 'neu-card-inset' : 'hover:neu-button'
          } ${dayData ? getStatusColor(dayData.status, dayData) : ''}`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${
              isToday ? 'text-[#05A7CC] font-bold' : 'text-[#333333]'
            }`}>
              {day}
            </span>
            {dayData && (
              <div className="flex space-x-1">
                {dayData.status === 'present' && <Clock size={12} className="text-green-600" />}
                {dayData.status === 'holiday' && <Calendar size={12} className="text-[#05A7CC]" />}
                {dayData.status === 'leave' && dayData.type && (
                  <div className={`w-2 h-2 rounded-full ${leaveTypes[dayData.type]?.color.split(' ')[0]}`}></div>
                )}
              </div>
            )}
          </div>
          
          {dayData && (
            <div className="space-y-1">
              {dayData.status === 'present' && (
                <div className="text-xs text-[#666666]">
                  <div>{dayData.employees} employees</div>
                  {dayData.late && <div className="text-[#EF5226]">{dayData.late} late</div>}
                </div>
              )}
              {dayData.status === 'holiday' && (
                <div className="text-xs text-[#05A7CC] truncate">{dayData.name}</div>
              )}
              {dayData.status === 'leave' && (
                <div className="text-xs text-[#666666]">
                  <div>{dayData.employees} present</div>
                  <div className="text-[#EF5226]">{dayData.leaves} on leave</div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const selectedDayDetails = selectedDate ? attendanceData[selectedDate] : null;

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Attendance Calendar</h1>
        <p className="text-[#666666]">Track daily attendance, leaves, and holidays</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="neu-card rounded-2xl p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="neu-button p-2 rounded-xl hover:text-[#05A7CC]"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-[#333333]">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="neu-button p-2 rounded-xl hover:text-[#05A7CC]"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={filterView}
                  onChange={(e) => setFilterView(e.target.value)}
                  className="neu-input px-4 py-2 rounded-xl text-[#333333]"
                >
                  <option value="all">All Days</option>
                  <option value="present">Present Days</option>
                  <option value="leave">Leave Days</option>
                  <option value="holiday">Holidays</option>
                </select>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center">
                  <span className="text-[#666666] font-medium text-sm">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
              {renderCalendarGrid()}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Legend */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-500 mr-3"></div>
                <span className="text-sm text-[#666666]">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-[#EF5226] mr-3"></div>
                <span className="text-sm text-[#666666]">Late/Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-[#05A7CC] mr-3"></div>
                <span className="text-sm text-[#666666]">Holiday</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-purple-500 mr-3"></div>
                <span className="text-sm text-[#666666]">Work from Home</span>
              </div>
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDayDetails && (
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              {selectedDayDetails.status === 'present' && (
                <div className="space-y-3">
                  <div className="neu-small p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[#666666] text-sm">Employees Present</span>
                      <span className="font-bold text-[#333333]">{selectedDayDetails.employees}</span>
                    </div>
                  </div>
                  {selectedDayDetails.checkIn && (
                    <div className="neu-small p-3 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[#666666] text-sm">Avg Check-in</span>
                        <span className="font-bold text-[#333333]">{selectedDayDetails.checkIn}</span>
                      </div>
                    </div>
                  )}
                  {selectedDayDetails.late && (
                    <div className="neu-small p-3 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[#666666] text-sm">Late Arrivals</span>
                        <span className="font-bold text-[#EF5226]">{selectedDayDetails.late}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {selectedDayDetails.status === 'holiday' && (
                <div className="neu-small p-4 rounded-xl text-center">
                  <Calendar size={24} className="text-[#05A7CC] mx-auto mb-2" />
                  <p className="font-medium text-[#333333]">{selectedDayDetails.name}</p>
                  <p className="text-sm text-[#666666]">Company Holiday</p>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('holiday-management')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#05A7CC]"
              >
                <Plus size={16} className="inline mr-2" />
                Add Holiday
              </button>
              <button 
                onClick={() => onNavigate('punch-records')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#05A7CC]"
              >
                <Clock size={16} className="inline mr-2" />
                View Records
              </button>
              <button 
                onClick={() => onNavigate('attendance-reports')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#05A7CC]"
              >
                <Filter size={16} className="inline mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};