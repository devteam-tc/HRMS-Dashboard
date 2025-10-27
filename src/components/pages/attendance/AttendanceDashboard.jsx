import React from 'react';
import { Clock, Users, TrendingUp, Calendar, UserCheck, UserX, Timer, AlertCircle, ChevronRight, BarChart3 } from 'lucide-react';

export const AttendanceDashboard = ({ onNavigate }) => {
  const kpiData = [
    {
      title: 'Average Attendance',
      value: '87.5%',
      change: '+2.3%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'text-[#EF5226]'
    },
    {
      title: 'Late Arrivals Today',
      value: '12',
      change: '-5 from yesterday',
      changeType: 'positive',
      icon: Clock,
      color: 'text-[#05A7CC]'
    },
    {
      title: 'Absenteeism Rate',
      value: '4.2%',
      change: '+0.8%',
      changeType: 'negative',
      icon: UserX,
      color: 'text-red-500'
    },
    {
      title: 'Active Shifts',
      value: '8',
      change: '2 ongoing',
      changeType: 'neutral',
      icon: Timer,
      color: 'text-[#EF5226]'
    }
  ];

  const quickActions = [
    { id: 'attendance-calendar', label: 'View Calendar', icon: Calendar },
    { id: 'shift-management', label: 'Manage Shifts', icon: Timer },
    { id: 'punch-records', label: 'Punch Records', icon: Clock },
    { id: 'overtime-hours', label: 'Overtime Reports', icon: TrendingUp }
  ];

  const departmentData = [
    { name: 'IT', present: 45, total: 50, percentage: 90, color: '#EF5226' },
    { name: 'HR', present: 12, total: 15, percentage: 80, color: '#05A7CC' },
    { name: 'Finance', present: 18, total: 20, percentage: 90, color: '#4CAF50' },
    { name: 'Marketing', present: 25, total: 30, percentage: 83, color: '#FFC107' },
    { name: 'Operations', present: 35, total: 40, percentage: 87, color: '#9C27B0' }
  ];

  const recentActivity = [
    { employee: 'John Doe', action: 'Punched In', time: '09:15 AM', status: 'late' },
    { employee: 'Sarah Wilson', action: 'Punched Out', time: '06:30 PM', status: 'normal' },
    { employee: 'Mike Johnson', action: 'Break Started', time: '02:00 PM', status: 'normal' },
    { employee: 'Emma Brown', action: 'Absent', time: 'All Day', status: 'absent' }
  ];

  // Layout: Card-based Dashboard with KPI cards, charts, and activity feed
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Attendance Dashboard</h1>
        <p className="text-[#666666]">Monitor attendance patterns and manage workforce presence</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`neu-small p-3 rounded-xl ${kpi.color}`}>
                  <Icon size={24} />
                </div>
                <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                  kpi.changeType === 'positive' ? 'bg-green-100 text-green-700' :
                  kpi.changeType === 'negative' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {kpi.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#333333] mb-1">{kpi.value}</h3>
                <p className="text-[#666666] text-sm">{kpi.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attendance Trend Chart */}
          <div className="neu-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#333333]">Daily Attendance Trend</h2>
              <select className="neu-input px-4 py-2 rounded-xl text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This quarter</option>
              </select>
            </div>
            <div className="h-64 neu-card-inset rounded-xl p-4 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp size={48} className="text-[#EF5226] mx-auto mb-4" />
                <p className="text-[#666666]">Interactive line chart showing daily attendance patterns</p>
                <p className="text-[#666666] text-sm mt-2">87.5% average attendance this week</p>
              </div>
            </div>
          </div>

          {/* Department-wise Performance Chart */}
          <div className="neu-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-[#333333] mb-6">Department Performance</h2>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="neu-small p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <span className="font-medium text-[#333333]">{dept.name}</span>
                    </div>
                    <span className="text-[#666666] text-sm">{dept.present}/{dept.total}</span>
                  </div>
                  <div className="neu-card-inset rounded-lg p-1">
                    <div 
                      className="h-3 rounded-lg transition-all duration-300"
                      style={{ 
                        width: `${dept.percentage}%`,
                        background: `linear-gradient(90deg, ${dept.color}, ${dept.color}dd)`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#666666] text-xs">Present: {dept.percentage}%</span>
                    <span className="text-[#666666] text-xs">Absent: {100 - dept.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Activity */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="neu-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => onNavigate(action.id)}
                    className="w-full neu-button p-4 rounded-xl flex items-center justify-between hover:text-[#EF5226] transition-colors group"
                  >
                    <div className="flex items-center">
                      <Icon size={20} className="mr-3 group-hover:text-[#EF5226]" />
                      <span className="font-medium">{action.label}</span>
                    </div>
                    <ChevronRight size={16} className="group-hover:text-[#EF5226]" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="neu-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-[#333333] mb-6">Live Activity Feed</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 neu-small rounded-xl">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      activity.status === 'late' ? 'bg-[#EF5226]' :
                      activity.status === 'absent' ? 'bg-red-500' :
                      'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-[#333333] font-medium text-sm">{activity.employee}</p>
                      <p className="text-[#666666] text-xs">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-[#666666] text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('punch-records')}
              className="w-full mt-4 neu-primary py-2 rounded-xl text-white font-medium hover:shadow-lg transition-all"
            >
              View All Records
            </button>
          </div>

          {/* Weekly Summary */}
          <div className="neu-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-[#333333] mb-6">This Week Summary</h2>
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#EF5226] mb-1">156h</div>
                <div className="text-[#666666] text-sm">Total Hours Worked</div>
              </div>
              <div className="neu-small p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#05A7CC] mb-1">24h</div>
                <div className="text-[#666666] text-sm">Overtime Hours</div>
              </div>
              <div className="neu-small p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">18</div>
                <div className="text-[#666666] text-sm">Perfect Attendance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};