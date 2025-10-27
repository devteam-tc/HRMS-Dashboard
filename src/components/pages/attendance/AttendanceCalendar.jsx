import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Coffee, Home, Plane, Heart, Plus, Filter, Users } from 'lucide-react';

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
    '2024-03-01': { status: 'present', checkIn: '09:00', checkOut: '18:00', employees: 42, lateCount: 0 },
    '2024-03-02': { status: 'holiday', type: 'company', name: 'Holi Festival', employees: 0 },
    '2024-03-04': { status: 'present', checkIn: '09:15', checkOut: '18:30', employees: 38, lateCount: 5 },
    '2024-03-05': { status: 'present', checkIn: '08:45', checkOut: '17:45', employees: 45, lateCount: 0 },
    '2024-03-06': { status: 'mixed', checkIn: '09:00', checkOut: '18:00', employees: 35, leaves: 10, lateCount: 2 },
    '2024-03-07': { status: 'present', checkIn: '09:00', checkOut: '18:00', employees: 44, lateCount: 1 },
    '2024-03-08': { status: 'present', checkIn: '09:30', checkOut: '18:15', employees: 40, lateCount: 8 },
    '2024-03-11': { status: 'present', checkIn: '08:55', checkOut: '18:05', employees: 43, lateCount: 0 },
    '2024-03-12': { status: 'mixed', checkIn: '09:00', checkOut: '18:00', employees: 37, leaves: 8, lateCount: 3 },
    '2024-03-13': { status: 'present', checkIn: '09:00', checkOut: '18:00', employees: 45, lateCount: 0 },
    '2024-03-14': { status: 'present', checkIn: '09:20', checkOut: '18:10', employees: 41, lateCount: 6 },
    '2024-03-15': { status: 'holiday', type: 'national', name: 'Spring Break', employees: 0 },
    '2024-03-18': { status: 'present', checkIn: '08:50', checkOut: '17:50', employees: 44, lateCount: 0 },
    '2024-03-19': { status: 'present', checkIn: '09:05', checkOut: '18:20', employees: 42, lateCount: 2 },
    '2024-03-20': { status: 'mixed', checkIn: '09:00', checkOut: '18:00', employees: 39, leaves: 6, lateCount: 1 },
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

  const getStatusStyle = (status, data) => {
    switch (status) {
      case 'present':
        if (data.lateCount > 0) {
          return 'bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-yellow-600 border-[#EF5226]';
        }
        return 'bg-gradient-to-br from-green-400 to-green-600 text-green-500 border-green-500';
      case 'holiday':
        return 'bg-gradient-to-br from-[#05A7CC] to-[#048ba8] text-green-800 border-[#05A7CC]';
      case 'mixed':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-800 border-yellow-500';
      default:
        return 'bg-white border-gray-300 text-[#333333]';
    }
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 neu-card-inset rounded-xl opacity-50"></div>);
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
          className={`h-32 p-3 neu-card rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
            isSelected ? 'ring-2 ring-[#EF5226]' : ''
          } ${dayData ? getStatusStyle(dayData.status, dayData) : 'bg-white border-gray-100'}`}
        >
          {/* Day Number */}
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-bold ${
              isToday ? 'bg-[#EF5226] text-white px-2 py-1 rounded-full' : 
              dayData ? 'opacity-90' : 'text-[#333333]'
            }`}>
              {day}
            </span>
            {dayData && (
              <div className="flex space-x-1">
                {dayData.status === 'present' && (
                  <Clock size={12} className={dayData.lateCount > 0 ? "text-white" : "text-white"} />
                )}
                {dayData.status === 'holiday' && <Calendar size={12} className="text-white" />}
                {dayData.status === 'mixed' && <Users size={12} className="text-white" />}
              </div>
            )}
          </div>
          
          {/* Day Content */}
          {dayData && (
            <div className="space-y-1 text-xs">
              {dayData.status === 'present' && (
                <>
                  <div className="font-medium">{dayData.employees} Present</div>
                  {dayData.lateCount > 0 && (
                    <div className="text-xs opacity-90">{dayData.lateCount} Late</div>
                  )}
                </>
              )}
              {dayData.status === 'holiday' && (
                <div className="font-medium truncate text-xs">{dayData.name}</div>
              )}
              {dayData.status === 'mixed' && (
                <>
                  <div className="font-medium">{dayData.employees} Present</div>
                  <div className="text-xs opacity-90">{dayData.leaves} On Leave</div>
                </>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const selectedDayDetails = selectedDate ? attendanceData[selectedDate] : null;

  // Layout: Calendar Grid with Hover Tooltips and Side Details
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Attendance Calendar</h1>
        <p className="text-[#666666]">Visual attendance tracking with daily insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Calendar */}
        <div className="lg:col-span-2">
          <div className="neu-card rounded-2xl p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-[#333333]">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
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
                <button 
                onClick={() => onNavigate('holiday-management')}
                   className="neu-primary px-4 py-2 rounded-xl text-white flex items-center gap-2 whitespace-nowrap"
>
                     <Plus size={16} className="mr-0" />
                    Add Holiday
                  </button>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center">
                  <span className="text-[#666666] font-bold text-sm bg-[#E8EBEF] py-2 px-4 rounded-xl">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
              {renderCalendarGrid()}
            </div>
          </div>
        </div>

        {/* Sidebar with Details and Legend */}
        <div className="lg:col-span-1 space-y-6">
          {/* Legend */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Color Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-500 mr-3"></div>
                <span className="text-sm text-[#666666]">Perfect Attendance</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-yellow-700 mr-3"></div>
                <span className="text-sm text-[#666666]">Late Arrivals</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-800 mr-3"></div>
                <span className="text-sm text-[#666666]">Company Holiday</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded  bg-yellow-500 mr-3"></div>
                <span className="text-sm text-[#666666]">Mixed Attendance</span>
              </div>
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDayDetails && (
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              {selectedDayDetails.status === 'present' && (
                <div className="space-y-3">
                  <div className="neu-small p-3 rounded-xl bg-green-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[#666666] text-sm">Employees Present</span>
                      <span className="font-bold text-green-600">{selectedDayDetails.employees}</span>
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
                  {selectedDayDetails.lateCount > 0 && (
                    <div className="neu-small p-3 rounded-xl bg-orange-50">
                      <div className="flex items-center justify-between">
                        <span className="text-[#666666] text-sm">Late Arrivals</span>
                        <span className="font-bold text-[#EF5226]">{selectedDayDetails.lateCount}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {selectedDayDetails.status === 'holiday' && (
                <div className="neu-small p-4 rounded-xl text-center bg-blue-50">
                  <Calendar size={24} className="text-[#05A7CC] mx-auto mb-2" />
                  <p className="font-medium text-[#333333]">{selectedDayDetails.name}</p>
                  <p className="text-sm text-[#666666]">Company Holiday</p>
                </div>
              )}

              {selectedDayDetails.status === 'mixed' && (
                <div className="space-y-3">
                  <div className="neu-small p-3 rounded-xl bg-green-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[#666666] text-sm">Present</span>
                      <span className="font-bold text-green-600">{selectedDayDetails.employees}</span>
                    </div>
                  </div>
                  <div className="neu-small p-3 rounded-xl bg-yellow-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[#666666] text-sm">On Leave</span>
                      <span className="font-bold text-yellow-600">{selectedDayDetails.leaves}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('punch-records')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors flex items-center"
              >
                <Clock size={16} className="inline mr-2" />
                View Daily Records
              </button>
              <button 
                onClick={() => onNavigate('leave-tracking')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors flex items-center"
              >
                <Calendar size={16} className="inline mr-2" />
                Manage Leaves
              </button>
              <button 
                onClick={() => onNavigate('attendance-reports')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors flex items-center"
              >
                <Filter size={16} className="inline mr-2" />
                Generate Report
              </button>
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Working Days</span>
                  <span className="font-bold text-[#333333]">22</span>
                </div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Holidays</span>
                  <span className="font-bold text-[#05A7CC]">3</span>
                </div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Avg Attendance</span>
                  <span className="font-bold text-[#EF5226]">89.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};