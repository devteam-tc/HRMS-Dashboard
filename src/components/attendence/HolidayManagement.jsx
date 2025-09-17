import React, { useState } from 'react';
import { Plus, Edit3, Calendar, Trash2, Globe, Building, MapPin, Search, Filter } from 'lucide-react';

export const HolidayManagement = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('list');
  const [showAddHoliday, setShowAddHoliday] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const holidays = [
    {
      id: 1,
      name: 'New Year\'s Day',
      date: '2024-01-01',
      type: 'national',
      description: 'Beginning of the calendar year',
      location: 'All Offices',
      optional: false,
      category: 'Public Holiday'
    },
    {
      id: 2,
      name: 'Republic Day',
      date: '2024-01-26',
      type: 'national',
      description: 'National holiday celebrating the constitution',
      location: 'India Offices',
      optional: false,
      category: 'Public Holiday'
    },
    {
      id: 3,
      name: 'Holi',
      date: '2024-03-13',
      type: 'religious',
      description: 'Festival of colors',
      location: 'India Offices',
      optional: true,
      category: 'Religious Holiday'
    },
    {
      id: 4,
      name: 'Good Friday',
      date: '2024-03-29',
      type: 'religious',
      description: 'Christian religious observance',
      location: 'All Offices',
      optional: true,
      category: 'Religious Holiday'
    },
    {
      id: 5,
      name: 'Independence Day',
      date: '2024-08-15',
      type: 'national',
      description: 'National independence celebration',
      location: 'India Offices',
      optional: false,
      category: 'Public Holiday'
    },
    {
      id: 6,
      name: 'Gandhi Jayanti',
      date: '2024-10-02',
      type: 'national',
      description: 'Birth anniversary of Mahatma Gandhi',
      location: 'India Offices',
      optional: false,
      category: 'Public Holiday'
    },
    {
      id: 7,
      name: 'Diwali',
      date: '2024-11-01',
      type: 'religious',
      description: 'Festival of lights',
      location: 'India Offices',
      optional: true,
      category: 'Religious Holiday'
    },
    {
      id: 8,
      name: 'Christmas',
      date: '2024-12-25',
      type: 'religious',
      description: 'Christian celebration of the birth of Jesus',
      location: 'All Offices',
      optional: false,
      category: 'Religious Holiday'
    },
    {
      id: 9,
      name: 'Company Foundation Day',
      date: '2024-06-15',
      type: 'company',
      description: 'Anniversary of company establishment',
      location: 'All Offices',
      optional: false,
      category: 'Company Holiday'
    },
    {
      id: 10,
      name: 'Team Retreat',
      date: '2024-09-20',
      type: 'company',
      description: 'Annual team building retreat',
      location: 'All Offices',
      optional: false,
      category: 'Company Holiday'
    }
  ];

  const upcomingHolidays = holidays
    .filter(holiday => new Date(holiday.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

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
      national: 'bg-blue-100 text-blue-800',
      religious: 'bg-purple-100 text-purple-800',
      company: 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || holiday.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const renderHolidayList = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" />
          <input
            type="text"
            placeholder="Search holidays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 neu-input rounded-xl text-[#333333] placeholder-[#666666]"
          />
        </div>
        
        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="neu-input px-4 py-3 rounded-xl text-[#333333]"
        >
          <option value="all">All Types</option>
          <option value="national">National</option>
          <option value="religious">Religious</option>
          <option value="company">Company</option>
        </select>

        <button 
          onClick={() => setShowAddHoliday(true)}
          className="neu-primary px-6 py-3 rounded-xl flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Holiday
        </button>
      </div>

      {/* Holidays Table */}
      <div className="neu-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#E8EBEF]">
              <tr>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Holiday Name</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Date</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Type</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Location</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Optional</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHolidays.map((holiday, index) => {
                const TypeIcon = getTypeIcon(holiday.type);
                return (
                  <tr 
                    key={holiday.id} 
                    className={`border-b border-[#E8EBEF] hover:bg-[#E8EBEF] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFB]'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-[#333333]">{holiday.name}</div>
                        <div className="text-[#666666] text-sm">{holiday.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#333333] font-medium">
                        {new Date(holiday.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${getTypeColor(holiday.type)}`}>
                        <TypeIcon size={12} className="mr-1" />
                        {holiday.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#333333]">{holiday.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        holiday.optional 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {holiday.optional ? 'Optional' : 'Mandatory'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="neu-small p-2 rounded-lg hover:text-[#05A7CC]">
                          <Edit3 size={14} />
                        </button>
                        <button className="neu-small p-2 rounded-lg hover:text-[#EF5226]">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCalendarView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#333333]">Holiday Calendar</h2>
        <div className="flex space-x-3">
          <select className="neu-input px-4 py-2 rounded-xl">
            <option>2024</option>
            <option>2023</option>
            <option>2025</option>
          </select>
          <button 
            onClick={() => onNavigate('attendance-calendar')}
            className="neu-primary px-6 py-3 rounded-xl flex items-center"
          >
            <Calendar size={16} className="mr-2" />
            View in Attendance Calendar
          </button>
        </div>
      </div>

      {/* Calendar Grid - Simplified view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => {
          const monthHolidays = holidays.filter(holiday => 
            new Date(holiday.date).getMonth() === index
          );
          
          return (
            <div key={month} className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">{month} 2024</h3>
              <div className="space-y-3">
                {monthHolidays.length > 0 ? (
                  monthHolidays.map(holiday => {
                    const TypeIcon = getTypeIcon(holiday.type);
                    return (
                      <div key={holiday.id} className="neu-small p-3 rounded-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-[#333333] text-sm">{holiday.name}</div>
                            <div className="text-xs text-[#666666]">
                              {new Date(holiday.date).getDate()} {month.slice(0, 3)}
                            </div>
                          </div>
                          <TypeIcon size={14} className="text-[#05A7CC] mt-1" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[#666666] text-sm italic">No holidays this month</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Holiday Management</h1>
        <p className="text-[#666666]">Manage company holidays and sync with attendance calendar</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333]">{holidays.length}</h3>
              <p className="text-[#666666] text-sm">Total Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl">
              <Calendar size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-600">
                {holidays.filter(h => h.type === 'national').length}
              </h3>
              <p className="text-[#666666] text-sm">National Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl">
              <Globe size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-purple-600">
                {holidays.filter(h => h.type === 'religious').length}
              </h3>
              <p className="text-[#666666] text-sm">Religious Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl">
              <MapPin size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600">
                {holidays.filter(h => h.type === 'company').length}
              </h3>
              <p className="text-[#666666] text-sm">Company Holidays</p>
            </div>
            <div className="neu-small p-3 rounded-xl">
              <Building size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Tab Navigation */}
          <div className="neu-card rounded-2xl p-6 mb-8">
            <div className="flex space-x-1 neu-card-inset rounded-xl p-1">
              {[
                { id: 'list', label: 'Holiday List', icon: Filter },
                { id: 'calendar', label: 'Calendar View', icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'neu-primary text-white'
                        : 'text-[#666666] hover:text-[#05A7CC]'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="neu-card rounded-2xl p-6">
            {activeTab === 'list' && renderHolidayList()}
            {activeTab === 'calendar' && renderCalendarView()}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upcoming Holidays */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-6">Upcoming Holidays</h3>
            <div className="space-y-4">
              {upcomingHolidays.map(holiday => {
                const TypeIcon = getTypeIcon(holiday.type);
                const daysUntil = Math.ceil((new Date(holiday.date) - new Date()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={holiday.id} className="neu-small p-4 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-[#333333] text-sm">{holiday.name}</div>
                        <div className="text-xs text-[#666666]">
                          {new Date(holiday.date).toLocaleDateString()}
                        </div>
                      </div>
                      <TypeIcon size={14} className="text-[#05A7CC]" />
                    </div>
                    <div className="text-xs text-[#05A7CC] font-medium">
                      {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days away`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Optional Holidays</span>
                  <span className="font-bold text-[#333333]">
                    {holidays.filter(h => h.optional).length}
                  </span>
                </div>
              </div>
              
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Mandatory Holidays</span>
                  <span className="font-bold text-[#333333]">
                    {holidays.filter(h => !h.optional).length}
                  </span>
                </div>
              </div>
              
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Remaining This Year</span>
                  <span className="font-bold text-[#05A7CC]">
                    {upcomingHolidays.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Holiday Modal */}
      {showAddHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Add New Holiday</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#333333] font-medium mb-2">Holiday Name</label>
                <input 
                  type="text" 
                  placeholder="Enter holiday name"
                  className="w-full neu-input p-3 rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full neu-input p-3 rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Type</label>
                <select className="w-full neu-input p-3 rounded-xl">
                  <option value="national">National</option>
                  <option value="religious">Religious</option>
                  <option value="company">Company</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Description</label>
                <textarea 
                  placeholder="Holiday description"
                  className="w-full neu-input p-3 rounded-xl h-20 resize-none"
                />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="optional" className="mr-2" />
                <label htmlFor="optional" className="text-[#333333]">Optional Holiday</label>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => setShowAddHoliday(false)}
                className="flex-1 neu-button py-3 rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddHoliday(false)}
                className="flex-1 neu-primary py-3 rounded-xl"
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