import React, { useState } from 'react';
import { Search, Filter, Download, Clock, Edit3, AlertCircle, CheckCircle, Calendar, Eye, MoreHorizontal } from 'lucide-react';

export const PunchRecords = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showActions, setShowActions] = useState(null);

  const punchRecords = [
    {
      id: 1,
      employee: 'John Doe',
      employeeId: 'EMP001',
      avatar: 'JD',
      date: '2024-03-15',
      punchIn: '09:00 AM',
      punchOut: '06:15 PM',
      totalHours: '9h 15m',
      overtime: '1h 15m',
      status: 'complete',
      location: 'Office',
      notes: '',
      department: 'IT'
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      employeeId: 'EMP002',
      avatar: 'SW',
      date: '2024-03-15',
      punchIn: '09:15 AM',
      punchOut: '06:00 PM',
      totalHours: '8h 45m',
      overtime: '0h',
      status: 'late',
      location: 'Office',
      notes: 'Traffic delay',
      department: 'HR'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      employeeId: 'EMP003',
      avatar: 'MJ',
      date: '2024-03-15',
      punchIn: '08:45 AM',
      punchOut: '',
      totalHours: '7h 30m',
      overtime: '0h',
      status: 'incomplete',
      location: 'WFH',
      notes: 'Forgot to punch out',
      department: 'Support'
    },
    {
      id: 4,
      employee: 'Emma Brown',
      employeeId: 'EMP004',
      avatar: 'EB',
      date: '2024-03-15',
      punchIn: '09:30 AM',
      punchOut: '05:45 PM',
      totalHours: '8h 15m',
      overtime: '0h',
      status: 'late',
      location: 'Office',
      notes: 'Medical appointment',
      department: 'Design'
    },
    {
      id: 5,
      employee: 'David Lee',
      employeeId: 'EMP005',
      avatar: 'DL',
      date: '2024-03-15',
      punchIn: '08:55 AM',
      punchOut: '06:30 PM',
      totalHours: '9h 35m',
      overtime: '1h 35m',
      status: 'complete',
      location: 'Office',
      notes: '',
      department: 'Development'
    },
    {
      id: 6,
      employee: 'Lisa Chen',
      employeeId: 'EMP006',
      avatar: 'LC',
      date: '2024-03-15',
      punchIn: '',
      punchOut: '',
      totalHours: '0h',
      overtime: '0h',
      status: 'absent',
      location: '',
      notes: 'Sick leave applied',
      department: 'Marketing'
    }
  ];

  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === filteredRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(filteredRecords.map(record => record.id));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      complete: { 
        color: 'bg-green-100 text-green-800 border border-green-200', 
        icon: CheckCircle, 
        label: 'Complete' 
      },
      late: { 
        color: 'bg-orange-100 text-orange-800 border border-orange-200', 
        icon: AlertCircle, 
        label: 'Late' 
      },
      incomplete: { 
        color: 'bg-yellow-100 text-yellow-800 border border-yellow-200', 
        icon: Clock, 
        label: 'Incomplete' 
      },
      absent: { 
        color: 'bg-red-100 text-red-800 border border-red-200', 
        icon: AlertCircle, 
        label: 'Absent' 
      }
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon size={12} className="mr-1" />
        {badge.label}
      </span>
    );
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'IT': 'bg-[#EF5226] text-white',
      'HR': 'bg-[#05A7CC] text-white',
      'Support': 'bg-purple-500 text-white',
      'Design': 'bg-pink-500 text-white',
      'Development': 'bg-green-500 text-white',
      'Marketing': 'bg-yellow-500 text-white'
    };
    return colors[department] || 'bg-gray-500 text-white';
  };

  const filteredRecords = punchRecords.filter(record => {
    const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Layout: Interactive Table with Action Buttons and Enhanced Cards
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Punch In/Out Records</h1>
        <p className="text-[#666666]">Comprehensive time tracking with detailed employee records</p>
      </div>

      {/* Enhanced Filters Section */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side - Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#EF5226]" />
              <input
                type="text"
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 neu-input rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
              />
            </div>

            {/* Date Filter */}
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this-week">This Week</option>
              <option value="last-week">Last Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>

            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="all">All Status</option>
              <option value="complete">Complete</option>
              <option value="late">Late</option>
              <option value="incomplete">Incomplete</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          {/* Right side - Actions */}
          <div className="flex gap-3">
            <button className="neu-button px-6 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-lg transition-all">
              <Edit3 size={16} className="mr-2" />
              Bulk Actions
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl group hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333] group-hover:text-[#EF5226] transition-colors">142</h3>
              <p className="text-[#666666] text-sm">Total Records</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#EF5226] to-[#d4471f]">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl group hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600 group-hover:scale-105 transition-transform">128</h3>
              <p className="text-[#666666] text-sm">Complete</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
              <CheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl group hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#05A7CC] group-hover:scale-105 transition-transform">8</h3>
              <p className="text-[#666666] text-sm">Incomplete</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#05A7CC] to-[#048ba8]">
              <AlertCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl group hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333] group-hover:text-[#EF5226] transition-colors">6</h3>
              <p className="text-[#666666] text-sm">Need Review</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600">
              <Edit3 size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Records Table */}
      <div className="neu-card rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-[#E8EBEF] bg-gradient-to-r from-[#ECF0F3] to-[#E8EBEF]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#333333]">Employee Punch Records</h2>
            <div className="flex items-center gap-4">
              <span className="text-[#666666] text-sm">
                Showing {filteredRecords.length} of {punchRecords.length} records
              </span>
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                  onChange={handleSelectAll}
                  className="mr-2 w-4 h-4 text-[#EF5226] bg-gray-100 border-gray-300 rounded focus:ring-[#EF5226] focus:ring-2"
                />
                <span className="text-sm text-[#666666] group-hover:text-[#EF5226] transition-colors">Select All</span>
              </label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#E8EBEF] to-[#ECF0F3]">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#EF5226] bg-gray-100 border-gray-300 rounded focus:ring-[#EF5226] focus:ring-2"
                  />
                </th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Employee</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Punch In</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Punch Out</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Total Hours</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Overtime</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr 
                  key={record.id} 
                  className={`border-b border-[#E8EBEF] hover:bg-gradient-to-r hover:from-[#ECF0F3] hover:to-[#E8EBEF] transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFB]'
                  } ${selectedRecords.includes(record.id) ? 'ring-2 ring-[#EF5226] bg-orange-50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => handleSelectRecord(record.id)}
                      className="w-4 h-4 text-[#EF5226] bg-gray-100 border-gray-300 rounded focus:ring-[#EF5226] focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="neu-small w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white font-semibold">
                        {record.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-[#333333]">{record.employee}</div>
                        <div className="text-[#666666] text-sm">{record.employeeId}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getDepartmentColor(record.department)}`}>
                          {record.department}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#333333] font-medium">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${record.punchIn ? 'text-[#333333]' : 'text-[#666666]'}`}>
                      {record.punchIn || '--'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${record.punchOut ? 'text-[#333333]' : 'text-[#666666]'}`}>
                      {record.punchOut || '--'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#333333] font-bold">{record.totalHours}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${record.overtime !== '0h' ? 'text-[#05A7CC]' : 'text-[#666666]'}`}>
                      {record.overtime}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="neu-small p-2 rounded-lg hover:text-[#EF5226] hover:shadow-md transition-all">
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => onNavigate('employee-attendance-profile', { employeeId: record.employeeId })}
                        className="neu-small p-2 rounded-lg hover:text-[#05A7CC] hover:shadow-md transition-all"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => setShowActions(showActions === record.id ? null : record.id)}
                        className="neu-small p-2 rounded-lg hover:text-[#333333] hover:shadow-md transition-all"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        <div className="p-6 border-t border-[#E8EBEF] bg-gradient-to-r from-[#ECF0F3] to-[#E8EBEF] flex items-center justify-between">
          <div className="text-[#666666] text-sm">
            Showing <span className="font-semibold text-[#333333]">1</span> to <span className="font-semibold text-[#333333]">{filteredRecords.length}</span> of <span className="font-semibold text-[#333333]">{punchRecords.length}</span> entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#EF5226] transition-colors">
              Previous
            </button>
            <button className="neu-primary px-4 py-2 rounded-xl shadow-md">1</button>
            <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#EF5226] transition-colors">2</button>
            <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#EF5226] transition-colors">3</button>
            <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#EF5226] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};