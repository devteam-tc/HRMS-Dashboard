import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Clock, CheckCircle, XCircle, AlertCircle, Eye, Download, Plus, ArrowRight } from 'lucide-react';

export const LeaveTracking = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const leaveRequests = [
    {
      id: 1,
      employee: 'John Doe',
      employeeId: 'EMP001',
      avatar: 'JD',
      leaveType: 'Sick Leave',
      startDate: '2024-03-20',
      endDate: '2024-03-22',
      days: 3,
      status: 'pending',
      appliedDate: '2024-03-15',
      approver: 'Sarah Wilson',
      reason: 'Medical treatment required',
      documents: ['medical-certificate.pdf'],
      department: 'IT'
    },
    {
      id: 2,
      employee: 'Emma Brown',
      employeeId: 'EMP004',
      avatar: 'EB',
      leaveType: 'Casual Leave',
      startDate: '2024-03-25',
      endDate: '2024-03-26',
      days: 2,
      status: 'approved',
      appliedDate: '2024-03-18',
      approver: 'Mike Johnson',
      reason: 'Personal work',
      documents: [],
      department: 'Design'
    },
    {
      id: 3,
      employee: 'David Lee',
      employeeId: 'EMP005',
      avatar: 'DL',
      leaveType: 'Earned Leave',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      days: 5,
      status: 'pending',
      appliedDate: '2024-03-19',
      approver: 'Sarah Wilson',
      reason: 'Family vacation',
      documents: [],
      department: 'Development'
    },
    {
      id: 4,
      employee: 'Lisa Chen',
      employeeId: 'EMP006',
      avatar: 'LC',
      leaveType: 'Maternity Leave',
      startDate: '2024-03-30',
      endDate: '2024-09-30',
      days: 184,
      status: 'approved',
      appliedDate: '2024-02-15',
      approver: 'Sarah Wilson',
      reason: 'Maternity leave as per policy',
      documents: ['maternity-certificate.pdf'],
      department: 'Marketing'
    },
    {
      id: 5,
      employee: 'Mike Johnson',
      employeeId: 'EMP003',
      avatar: 'MJ',
      leaveType: 'Casual Leave',
      startDate: '2024-03-28',
      endDate: '2024-03-28',
      days: 1,
      status: 'rejected',
      appliedDate: '2024-03-27',
      approver: 'Sarah Wilson',
      reason: 'Short notice application',
      documents: [],
      department: 'Support'
    },
    {
      id: 6,
      employee: 'Alex Johnson',
      employeeId: 'EMP007',
      avatar: 'AJ',
      leaveType: 'Work From Home',
      startDate: '2024-03-22',
      endDate: '2024-03-24',
      days: 3,
      status: 'pending',
      appliedDate: '2024-03-20',
      approver: 'Sarah Wilson',
      reason: 'Home renovation work',
      documents: [],
      department: 'IT'
    }
  ];

  const kanbanColumns = [
    { id: 'pending', title: 'Pending Approval', color: '#FFC107', count: leaveRequests.filter(r => r.status === 'pending').length },
    { id: 'approved', title: 'Approved', color: '#4CAF50', count: leaveRequests.filter(r => r.status === 'approved').length },
    { id: 'rejected', title: 'Rejected', color: '#F44336', count: leaveRequests.filter(r => r.status === 'rejected').length }
  ];

  const getLeaveTypeColor = (type) => {
    const colors = {
      'Sick Leave': 'bg-red-100 text-red-800 border-red-200',
      'Casual Leave': 'bg-blue-100 text-blue-800 border-blue-200',
      'Earned Leave': 'bg-green-100 text-green-800 border-green-200',
      'Maternity Leave': 'bg-purple-100 text-purple-800 border-purple-200',
      'Work From Home': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'IT': 'bg-[#EF5226]',
      'HR': 'bg-[#05A7CC]',
      'Support': 'bg-purple-500',
      'Design': 'bg-pink-500',
      'Development': 'bg-green-500',
      'Marketing': 'bg-yellow-500'
    };
    return colors[department] || 'bg-gray-500';
  };

  const handleMoveCard = (requestId, newStatus) => {
    console.log(`Moving request ${requestId} to ${newStatus}`);
  };

  const LeaveCard = ({ request, columnColor }) => (
    <div className="neu-card p-4 rounded-xl mb-4 hover:shadow-lg transition-all duration-200 cursor-move group border-l-4" 
         style={{ borderLeftColor: columnColor }}>
      {/* Employee Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`neu-small w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getDepartmentColor(request.department)} text-white font-semibold`}>
            {request.avatar}
          </div>
          <div>
            <div className="font-semibold text-[#333333] text-sm">{request.employee}</div>
            <div className="text-[#666666] text-xs">{request.employeeId}</div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="neu-small p-1 rounded-lg hover:text-[#EF5226]">
            <Eye size={12} />
          </button>
        </div>
      </div>

      {/* Leave Type */}
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium border ${getLeaveTypeColor(request.leaveType)}`}>
          {request.leaveType}
        </span>
      </div>

      {/* Duration */}
      <div className="neu-small p-3 rounded-lg mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666666]">Duration</span>
          <span className="font-semibold text-[#333333]">{request.days} days</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-[#666666]">From</span>
          <span className="text-[#333333]">{request.startDate}</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-[#666666]">To</span>
          <span className="text-[#333333]">{request.endDate}</span>
        </div>
      </div>

      {/* Reason */}
      <div className="text-xs text-[#666666] mb-3">
        <strong>Reason:</strong> {request.reason.substring(0, 50)}
        {request.reason.length > 50 && '...'}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        {request.status === 'pending' && (
          <>
            <button 
              onClick={() => handleMoveCard(request.id, 'approved')}
              className="flex-1 neu-small py-2 rounded-lg text-xs font-medium text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center"
            >
              <CheckCircle size={12} className="mr-1" />
              Approve
            </button>
            <button 
              onClick={() => handleMoveCard(request.id, 'rejected')}
              className="flex-1 neu-small py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
            >
              <XCircle size={12} className="mr-1" />
              Reject
            </button>
          </>
        )}
        {request.status !== 'pending' && (
          <div className="w-full text-center text-xs text-[#666666] py-2">
            {request.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
          </div>
        )}
      </div>
    </div>
  );

  // Layout: Kanban Board View
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Leave & Absence Tracking</h1>
        <p className="text-[#666666]">Manage leave requests with interactive kanban board</p>
      </div>

      {/* Filters and Actions */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#EF5226]" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 neu-input rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
              />
            </div>

            {/* Department Filter */}
            <select className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all">
              <option value="all">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Support">Support</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
            </select>

            {/* Leave Type Filter */}
            <select className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all">
              <option value="all">All Leave Types</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="earned">Earned Leave</option>
              <option value="maternity">Maternity Leave</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="neu-button px-6 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all">
              <Plus size={16} className="mr-2" />
              Add Request
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333]">{leaveRequests.length}</h3>
              <p className="text-[#666666] text-sm">Total Requests</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#EF5226] to-[#d4471f]">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-yellow-600">{kanbanColumns[0].count}</h3>
              <p className="text-[#666666] text-sm">Pending</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600">{kanbanColumns[1].count}</h3>
              <p className="text-[#666666] text-sm">Approved</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-red-600">{kanbanColumns[2].count}</h3>
              <p className="text-[#666666] text-sm">Rejected</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-red-400 to-red-600">
              <XCircle size={24} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {kanbanColumns.map((column) => (
          <div key={column.id} className="neu-card p-6 rounded-2xl">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: column.color }}
                ></div>
                <h3 className="text-lg font-bold text-[#333333]">{column.title}</h3>
              </div>
              <div 
                className="px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: column.color }}
              >
                {column.count}
              </div>
            </div>

            {/* Column Content */}
            <div className="space-y-4 min-h-96">
              {leaveRequests
                .filter(request => request.status === column.id)
                .map(request => (
                  <LeaveCard 
                    key={request.id} 
                    request={request} 
                    columnColor={column.color}
                  />
                ))}
              
              {/* Empty State */}
              {leaveRequests.filter(request => request.status === column.id).length === 0 && (
                <div className="neu-card-inset p-8 rounded-xl text-center">
                  <div className="text-[#666666] mb-4">
                    <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No {column.title.toLowerCase()} requests</p>
                  </div>
                </div>
              )}
            </div>

            {/* Column Footer */}
            <div className="mt-6 pt-4 border-t border-[#E8EBEF]">
              <button 
                onClick={() => onNavigate('leave-balance')}
                className="w-full neu-button py-3 rounded-xl flex items-center justify-center hover:text-[#EF5226] transition-colors group"
              >
                <span className="font-medium">View All {column.title}</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="mt-8 neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => onNavigate('leave-calendar')}
            className="neu-button p-4 rounded-xl text-left hover:text-[#EF5226] transition-colors group"
          >
            <Calendar size={20} className="mb-2 group-hover:text-[#EF5226]" />
            <div className="font-medium">Leave Calendar</div>
            <div className="text-sm text-[#666666]">View leave schedule</div>
          </button>
          
          <button 
            onClick={() => onNavigate('leave-balance')}
            className="neu-button p-4 rounded-xl text-left hover:text-[#EF5226] transition-colors group"
          >
            <Clock size={20} className="mb-2 group-hover:text-[#EF5226]" />
            <div className="font-medium">Leave Balance</div>
            <div className="text-sm text-[#666666]">Check employee balances</div>
          </button>
          
          <button 
            onClick={() => onNavigate('leave-policy')}
            className="neu-button p-4 rounded-xl text-left hover:text-[#EF5226] transition-colors group"
          >
            <Filter size={20} className="mb-2 group-hover:text-[#EF5226]" />
            <div className="font-medium">Leave Policies</div>
            <div className="text-sm text-[#666666]">Manage leave rules</div>
          </button>
        </div>
      </div>
    </div>
  );
};