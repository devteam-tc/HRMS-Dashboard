import React, { useState } from 'react';
import { User, Calendar, Clock, TrendingUp, Award, AlertCircle, ChevronLeft, Download, Edit3, Briefcase } from 'lucide-react';

export const EmployeeAttendanceProfile = ({ employeeId, onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock employee data
  const employee = {
    id: employeeId || 'EMP001',
    name: 'John Doe',
    designation: 'Senior Software Engineer',
    department: 'IT',
    joinDate: '2023-01-15',
    avatar: 'JD',
    shift: 'Morning Shift (9:00 AM - 6:00 PM)',
    manager: 'Sarah Wilson',
    location: 'Bangalore Office'
  };

  const attendanceStats = {
    currentMonth: {
      totalDays: 22,
      presentDays: 20,
      absentDays: 1,
      lateDays: 3,
      halfDays: 1,
      overtimeHours: 24,
      attendancePercentage: 90.9
    },
    previousMonth: {
      attendancePercentage: 87.5,
      lateDays: 5,
      overtimeHours: 18
    }
  };

  const leaveBalance = {
    sickLeave: { used: 3, remaining: 9, total: 12 },
    casualLeave: { used: 2, remaining: 10, total: 12 },
    earnedLeave: { used: 5, remaining: 16, total: 21 },
    compOff: { used: 1, remaining: 3, total: 4 }
  };

  const activityTimeline = [
    { date: '2024-03-15', type: 'punch-in', time: '09:00 AM', status: 'on-time', description: 'Punch In' },
    { date: '2024-03-15', type: 'break', time: '12:00 PM', status: 'normal', description: 'Lunch Break Started' },
    { date: '2024-03-15', type: 'break-end', time: '01:00 PM', status: 'normal', description: 'Lunch Break Ended' },
    { date: '2024-03-15', type: 'punch-out', time: '06:30 PM', status: 'overtime', description: 'Punch Out (1.5h OT)' },
    { date: '2024-03-14', type: 'punch-in', time: '09:15 AM', status: 'late', description: 'Punch In (15 min late)' },
    { date: '2024-03-14', type: 'punch-out', time: '06:00 PM', status: 'normal', description: 'Punch Out' },
    { date: '2024-03-13', type: 'leave', time: 'Full Day', status: 'leave', description: 'Sick Leave' },
    { date: '2024-03-12', type: 'punch-in', time: '08:55 AM', status: 'early', description: 'Punch In (Early arrival)' },
    { date: '2024-03-12', type: 'punch-out', time: '06:15 PM', status: 'overtime', description: 'Punch Out (15m OT)' }
  ];

  const performanceMetrics = [
    { label: 'Punctuality Score', value: 85, color: '#EF5226', max: 100 },
    { label: 'Attendance Rate', value: 91, color: '#4CAF50', max: 100 },
    { label: 'Overtime Hours', value: 24, color: '#05A7CC', max: 40 },
    { label: 'Leave Utilization', value: 11, color: '#9C27B0', max: 21 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'on-time': 'text-green-600 bg-green-100',
      'late': 'text-[#EF5226] bg-orange-100',
      'early': 'text-blue-600 bg-blue-100',
      'overtime': 'text-[#05A7CC] bg-blue-100',
      'normal': 'text-[#333333] bg-gray-100',
      'leave': 'text-purple-600 bg-purple-100'
    };
    return colors[status] || 'text-[#666666] bg-gray-100';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'punch-in':
      case 'punch-out':
        return <Clock size={16} />;
      case 'break':
      case 'break-end':
        return <AlertCircle size={16} />;
      case 'leave':
        return <Calendar size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  // Layout: Profile + Timeline
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('punch-records')}
            className="neu-small p-2 rounded-xl hover:text-[#EF5226] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-[#333333]">Employee Attendance Profile</h1>
        </div>
        <p className="text-[#666666]">Detailed attendance analysis with timeline view</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT PANEL - Employee Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Profile Card */}
          <div className="neu-card p-6 rounded-2xl text-center">
            <div className="neu-small w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white text-2xl font-bold">
              {employee.avatar}
            </div>
            <h2 className="text-xl font-bold text-[#333333] mb-1">{employee.name}</h2>
            <p className="text-[#666666] mb-2">{employee.designation}</p>
            <div className="neu-small px-3 py-1 rounded-full inline-block">
              <span className="text-[#333333] text-sm font-medium">{employee.id}</span>
            </div>
          </div>

          {/* Employee Details */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Employee Details</h3>
            <div className="space-y-4">
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Department</div>
                <div className="font-semibold text-[#333333]">{employee.department}</div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Current Shift</div>
                <div className="font-semibold text-[#333333] text-sm">{employee.shift}</div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Manager</div>
                <div className="font-semibold text-[#333333]">{employee.manager}</div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Join Date</div>
                <div className="font-semibold text-[#333333]">{employee.joinDate}</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="neu-small p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666] text-sm">{metric.label}</span>
                    <span className="font-bold" style={{ color: metric.color }}>
                      {metric.value}{metric.label.includes('Rate') || metric.label.includes('Score') ? '%' : ''}
                    </span>
                  </div>
                  <div className="neu-card-inset rounded-lg p-1">
                    <div 
                      className="h-2 rounded-lg transition-all duration-300"
                      style={{ 
                        width: `${(metric.value / metric.max) * 100}%`,
                        backgroundColor: metric.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Timeline and Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Monthly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
              <div className="neu-small p-3 rounded-xl mb-4 bg-gradient-to-br from-green-400 to-green-600 inline-block">
                <Award size={24} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-1">
                {attendanceStats.currentMonth.attendancePercentage}%
              </h3>
              <p className="text-[#666666] text-sm">Attendance Rate</p>
            </div>
            
            <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
              <div className="neu-small p-3 rounded-xl mb-4 bg-gradient-to-br from-[#EF5226] to-[#d4471f] inline-block">
                <AlertCircle size={24} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#EF5226] mb-1">
                {attendanceStats.currentMonth.lateDays}
              </h3>
              <p className="text-[#666666] text-sm">Late Arrivals</p>
            </div>
            
            <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
              <div className="neu-small p-3 rounded-xl mb-4 bg-gradient-to-br from-[#05A7CC] to-[#048ba8] inline-block">
                <Clock size={24} className="text-skyblue-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#05A7CC] mb-1">
                {attendanceStats.currentMonth.overtimeHours}h
              </h3>
              <p className="text-[#666666] text-sm">Overtime Hours</p>
            </div>
            
            <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
              <div className="neu-small p-3 rounded-xl mb-4 bg-gradient-to-br from-purple-400 to-purple-600 inline-block">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-1">
                {attendanceStats.currentMonth.totalDays - attendanceStats.currentMonth.presentDays}
              </h3>
              <p className="text-[#666666] text-sm">Leave Days</p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="neu-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Activity Timeline</h3>
              <div className="flex space-x-3">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="neu-input px-4 py-2 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226]"
                >
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                </select>
                <button className="neu-button px-4 py-2 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EF5226] to-[#05A7CC]"></div>
              
              {/* Timeline Items */}
              <div className="space-y-6">
                {activityTimeline.map((activity, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="absolute left-4 w-4 h-4 rounded-full bg-gradient-to-r from-[#EF5226] to-[#d4471f] border-4 border-[#ECF0F3] z-10"></div>
                    
                    {/* Timeline Content */}
                    <div className="ml-12 neu-small p-4 rounded-xl flex-1 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`p-1 rounded-lg mr-3 ${getStatusColor(activity.status)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#333333]">{activity.description}</div>
                            <div className="text-[#666666] text-sm">{activity.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#333333]">{activity.time}</div>
                          <div className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
                            {activity.status.replace('-', ' ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leave Balance Overview */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Leave Balance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(leaveBalance).map(([leaveType, balance]) => (
                <div key={leaveType} className="neu-small p-4 rounded-xl text-center">
                  <div className="font-semibold text-[#333333] mb-2 capitalize">
                    {leaveType.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-2xl font-bold text-[#EF5226] mb-1">{balance.remaining}</div>
                  <div className="text-[#666666] text-sm mb-3">Remaining</div>
                  <div className="neu-card-inset rounded-lg p-1">
                    <div 
                      className="h-2 neu-primary rounded-lg transition-all duration-300"
                      style={{ width: `${(balance.used / balance.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-[#666666] mt-2">
                    {balance.used} used of {balance.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};