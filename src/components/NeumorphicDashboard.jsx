import React from 'react';
import { UserPlus, UserCheck, Play, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import { TotalEmployeesCard } from './kpi/TotalEmployeesCard';
import { NewHiresCard } from './kpi/NewHiresCard';
import { OpenPositionsCard } from './kpi/OpenPositionsCard';
import { AttendanceRateCard } from './kpi/AttendanceRateCard';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const attritionData = [
  { month: 'Jan', rate: 12 },
  { month: 'Feb', rate: 15 },
  { month: 'Mar', rate: 8 },
  { month: 'Apr', rate: 10 },
  { month: 'May', rate: 7 },
  { month: 'Jun', rate: 9 }
];

const payrollData = [
  { month: 'Jan', amount: 450000 },
  { month: 'Feb', amount: 520000 },
  { month: 'Mar', amount: 480000 },
  { month: 'Apr', amount: 510000 },
  { month: 'May', amount: 490000 },
  { month: 'Jun', amount: 530000 }
];

const departmentData = [
  { department: 'Engineering', score: 92 },
  { department: 'Sales', score: 87 },
  { department: 'Marketing', score: 89 },
  { department: 'HR', score: 94 },
  { department: 'Finance', score: 85 }
];

const engagementData = [
  { name: 'Highly Engaged', value: 45, color: '#4CAF50' },
  { name: 'Engaged', value: 35, color: '#05A7CC' },
  { name: 'Neutral', value: 15, color: '#FFC107' },
  { name: 'Disengaged', value: 5, color: '#EF5226' }
];

const upcomingMeetings = [
  { title: 'Weekly Team Standup', time: '09:00 AM', participants: 8, type: 'Team' },
  { title: 'Performance Review', time: '11:30 AM', participants: 2, type: 'One-on-One' },
  { title: 'Quarterly Planning', time: '02:00 PM', participants: 15, type: 'Management' },
  { title: 'Training Session', time: '04:00 PM', participants: 12, type: 'Learning' }
];

const quickActions = [
  { title: 'Add Employee', icon: UserPlus, color: 'neu-gradient', description: 'Onboard new team member' },
  { title: 'Approve Leave', icon: UserCheck, color: 'neu-primary', description: 'Review pending requests' },
  { title: 'Run Payroll', icon: DollarSign, color: 'neu-secondary', description: 'Process monthly salary' },
  { title: 'Schedule Interview', icon: CalendarIcon, color: 'neu-gradient', description: 'Book candidate meeting' }
];

const recentActivities = [
  { 
    user: 'Alice Johnson', 
    action: 'completed onboarding', 
    time: '2 hours ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'success'
  },
  { 
    user: 'Bob Smith', 
    action: 'submitted leave request', 
    time: '4 hours ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'info'
  },
  { 
    user: 'Carol Davis', 
    action: 'updated profile', 
    time: '6 hours ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'info'
  },
  { 
    user: 'System', 
    action: 'payroll processed', 
    time: '1 day ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'success'
  }
];

export const NeumorphicDashboard = () => {
  // KPI placeholders (wire to real data sources when available)
  const kpi = {
    totalEmployees: 534,
    newHiresThisMonth: 32,
    openPositions: 10,
    attendanceRate: 92,
  };
  return (
    <div className="p-8 space-y-8 bg-[#F8F9FB] min-h-screen">
      {/* Welcome Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#333333] mb-2">Welcome back, John! 👋</h1>
            <p className="text-[#666666] text-lg">Here's what's happening at your organization today.</p>
          </div>
          <div className="neu-card-inset p-6 rounded-2xl text-center">
            <p className="text-sm text-[#666666] mb-1">Today</p>
            <p className="text-xl font-bold text-[#333333]">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <TotalEmployeesCard value={kpi.totalEmployees} />
        <NewHiresCard value={kpi.newHiresThisMonth} />
        <OpenPositionsCard value={kpi.openPositions} />
        <AttendanceRateCard value={kpi.attendanceRate} />
      </div>

   
    

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Employee Engagement */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Employee Engagement</h3>
            <p className="text-[#666666]">Distribution of engagement levels</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                  formatter={(value) => [`${value}%`, 'Employees']} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-[#666666]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Meetings */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Today's Meetings</h3>
            <p className="text-[#666666]">Scheduled meetings for today</p>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#05A7CC] rounded-full"></div>
                    <div>
                      <p className="font-medium text-[#333333]">{meeting.title}</p>
                      <p className="text-xs text-[#666666]">{meeting.time} • {meeting.participants} participants</p>
                    </div>
                  </div>
                  <div className="neu-card-inset px-3 py-1 rounded-xl">
                    <span className="text-xs font-medium text-[#666666]">{meeting.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Recent Activities</h3>
            <p className="text-[#666666]">Latest system activities</p>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium text-[#333333]">{activity.user}</span>
                      <span className="text-[#666666]"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-[#999999]">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-[#4CAF50]' : 'bg-[#05A7CC]'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#333333] mb-2">Quick Actions</h3>
          <p className="text-[#666666]">Frequently used actions for faster workflow</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="neu-button p-6 rounded-3xl flex flex-col items-center space-y-4 hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#333333] mb-1">{action.title}</p>
                  <p className="text-sm text-[#666666]">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};