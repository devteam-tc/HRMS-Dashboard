import React, { useState } from 'react';
import { Plus, Edit3, Calendar, Trash2, Globe, Building, MapPin, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export const HolidayManagement = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [showAddHoliday, setShowAddHoliday] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const holidays = [
    {
      id: 1,
      name: 'New Year\'s Day',
      date: '2024-01-01',
      type: 'national',
      description: 'Beginning of the calendar year',
      location: 'All Offices',
      optional: false,
      category: 'Public Holiday',
      color: '#05A7CC'
    },
    {
      id: 2,
      name: 'Republic Day',
      date: '2024-01-26',
      type: 'national',
      description: 'National holiday celebrating the constitution',
      location: 'India Offices',
      optional: false,
      category: 'Public Holiday',
      color: '#05A7CC'
    },
    {
      id: 3,
      name: 'Holi',
      date: '2024-03-13',
      type: 'religious',
      description: 'Festival of colors',
      location: 'India Offices',
      optional: true,
      category: 'Religious Holiday',
      color: '#9C27B0'
    },
    {
      id: 4,
      name: 'Good Friday',
      date: '2024-03-29',
      type: 'religious',
      description: 'Christian religious observance',
      location: 'All Offices',
      optional: true,
      category: 'Religious Holiday',
      color: '#9C27B0'
    },
    {
      id: 5,
      name: 'Independence Day',
      date: '2024-08-15',
      type: 'national',
      description: 'National independence celebration',
      location: 'India Offices',
      optional: false,
      category: 'Public Holiday',
      color: '#05A7CC'
    },
    {
      id: 6,
      name: 'Company Foundation Day',
      date: '2024-06-15',
      type: 'company',
      description: 'Anniversary of company establishment',
      location: 'All Offices',
      optional: false,
      category: 'Company Holiday',
      color: '#EF5226'
    },
    {
      id: 7,
      name: 'Diwali',
      date: '2024-11-01',
      type: 'religious',
      description: 'Festival of lights',
      location: 'India Offices',
      optional: true,
      category: 'Religious Holiday',
      color: '#9C27B0'
    },
    {
      id: 8,
      name: 'Christmas',
      date: '2024-12-25',
      type: 'religious',
      description: 'Christian celebration of the birth of Jesus',
      location: 'All Offices',
      optional: false,
      category: 'Religious Holiday',
      color: '#9C27B0'
    },
    {
      id: 9,
      name: 'Team Retreat',
      date: '2024-09-20',
      type: 'company',
      description: 'Annual team building retreat',
      location: 'All Offices',
      optional: false,
      category: 'Company Holiday',
      color: '#EF5226'
    }
  ];

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

  const getTypeIcon = (type) => {
    const icons = {
      national: Globe,
      religious: MapPin,
      company: Building
    };
    return icons[type] || Calendar;
  };

  const getTypeColor = (type) => {
    const colors = {
      national: 'bg-blue-100 text-blue-800 border-blue-200',
      religious: 'bg-purple-100 text-purple-800 border-purple-200',
      company: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getHolidaysForDate = (year, month, day) => {
    const dateKey = formatDateKey(year, month, day);
    return holidays.filter(holiday => holiday.date === dateKey);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 neu-card-inset rounded-xl opacity-50"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayHolidays = getHolidaysForDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => setSelectedHoliday(dayHolidays[0] || null)}
          className={`h-24 p-2 neu-card rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
            dayHolidays.length > 0 ? 'ring-2 ring-[#EF5226]' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${
              isToday ? 'bg-[#EF5226] text-white px-2 py-1 rounded-full' : 
              dayHolidays.length > 0 ? 'text-[#EF5226] font-bold' : 'text-[#333333]'
            }`}>
              {day}
            </span>
            {dayHolidays.length > 0 && (
              <div className="flex space-x-1">
                {dayHolidays.slice(0, 2).map((holiday, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full`} style={{ backgroundColor: holiday.color }}></div>
                ))}
                {dayHolidays.length > 2 && <span className="text-xs text-[#666666]">+{dayHolidays.length - 2}</span>}
              </div>
            )}
          </div>
          
          {dayHolidays.length > 0 && (
            <div className="space-y-1">
              {dayHolidays.slice(0, 2).map((holiday, idx) => (
                <div key={idx} className="text-xs font-medium truncate" style={{ color: holiday.color }}>
                  {holiday.name}
                </div>
              ))}
              {dayHolidays.length > 2 && (
                <div className="text-xs text-[#666666]">+{dayHolidays.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || holiday.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Layout: Calendar + List Hybrid
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Holiday Management</h1>
        <p className="text-[#666666]">Manage company holidays with calendar and list view</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333]">{holidays.length}</h3>
              <p className="text-[#666666] text-sm">Total Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#EF5226] to-[#d4471f]">
              <Calendar size={24} className="" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#05A7CC]">
                {holidays.filter(h => h.type === 'national').length}
              </h3>
              <p className="text-[#666666] text-sm">National Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#05A7CC] to-[#048ba8]">
              <Globe size={24} className="" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-purple-600">
                {holidays.filter(h => h.type === 'religious').length}
              </h3>
              <p className="text-[#666666] text-sm">Religious Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600">
              <MapPin size={24} className="" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#EF5226]">
                {holidays.filter(h => h.type === 'company').length}
              </h3>
              <p className="text-[#666666] text-sm">Company Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#EF5226] to-[#d4471f]">
              <Building size={24} className="" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
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
              
              <button 
                onClick={() => setShowAddHoliday(true)}
                className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
              >
                <Plus size={16} className="mr-2" />
                Add Holiday
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
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

        {/* Holiday List Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filters */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Filter Holidays</h3>
            <div className="space-y-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EF5226]" />
                <input
                  type="text"
                  placeholder="Search holidays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 neu-input rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
              >
                <option value="all">All Types</option>
                <option value="national">National</option>
                <option value="religious">Religious</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>

          {/* Holiday List */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Holiday List</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredHolidays.map(holiday => {
                const TypeIcon = getTypeIcon(holiday.type);
                return (
                  <div 
                    key={holiday.id} 
                    className="neu-small p-4 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedHoliday(holiday)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="neu-small p-2 rounded-lg mr-3" style={{ backgroundColor: holiday.color }}>
                          <TypeIcon size={14} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#333333] group-hover:text-[#EF5226] transition-colors">
                            {holiday.name}
                          </div>
                          <div className="text-[#666666] text-xs">
                            {new Date(holiday.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button className="neu-small p-1 rounded-lg hover:text-[#EF5226]">
                          <Edit3 size={12} />
                        </button>
                        <button className="neu-small p-1 rounded-lg hover:text-red-500">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-[#666666] mb-2">
                      {holiday.description.substring(0, 60)}
                      {holiday.description.length > 60 && '...'}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(holiday.type)}`}>
                        {holiday.type}
                      </span>
                      <span className={`text-xs font-medium ${
                        holiday.optional ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {holiday.optional ? 'Optional' : 'Mandatory'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Holiday Details */}
          {selectedHoliday && (
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Holiday Details</h3>
              <div className="space-y-3">
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Name</div>
                  <div className="font-semibold text-[#333333]">{selectedHoliday.name}</div>
                </div>
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Date</div>
                  <div className="font-semibold text-[#333333]">
                    {new Date(selectedHoliday.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Location</div>
                  <div className="font-semibold text-[#333333]">{selectedHoliday.location}</div>
                </div>
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Description</div>
                  <div className="text-[#333333] text-sm">{selectedHoliday.description}</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('attendance-calendar')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors"
              >
                <Calendar size={16} className="inline mr-2" />
                View in Calendar
              </button>
              <button className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors">
                <Filter size={16} className="inline mr-2" />
                Export Holiday List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Holiday Modal */}
      {showAddHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Add New Holiday</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#333333] font-medium mb-2">Holiday Name</label>
                <input 
                  type="text" 
                  placeholder="Enter holiday name"
                  className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Type</label>
                <select className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all">
                  <option value="national">National</option>
                  <option value="religious">Religious</option>
                  <option value="company">Company</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Description</label>
                <textarea 
                  placeholder="Holiday description"
                  className="w-full neu-input p-3 rounded-xl h-20 resize-none focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="optional" className="mr-2 w-4 h-4 text-[#EF5226] bg-gray-100 border-gray-300 rounded focus:ring-[#EF5226] focus:ring-2" />
                <label htmlFor="optional" className="text-[#333333]">Optional Holiday</label>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setShowAddHoliday(false)}
                className="flex-1 neu-button py-3 rounded-xl hover:text-[#666666] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddHoliday(false)}
                className="flex-1 neu-primary py-3 rounded-xl hover:shadow-xl transition-all"
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};