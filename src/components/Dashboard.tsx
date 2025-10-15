import React from 'react';
import {
  Users,
  TrendingDown,
  DollarSign,
  Heart,
  UserPlus,
  CheckCircle,
  Clock,
  Calendar,
  Plus,
  UserCheck,
  Play,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
  { month: 'May', rate: 490000 },
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
  { name: 'Disengaged', value: 5, color: '#F44336' }
];

const upcomingMeetings = [
  { title: 'Weekly Team Standup', time: '09:00 AM', participants: 8, type: 'Team' },
  { title: 'Performance Review', time: '11:30 AM', participants: 2, type: 'One-on-One' },
  { title: 'Quarterly Planning', time: '02:00 PM', participants: 15, type: 'Management' },
  { title: 'Training Session', time: '04:00 PM', participants: 12, type: 'Learning' }
];

const quickActions = [
  { title: 'Add Employee', icon: UserPlus, color: 'bg-green-500', description: 'Onboard new team member' },
  { title: 'Approve Leave', icon: UserCheck, color: 'bg-blue-500', description: 'Review pending requests' },
  { title: 'Run Payroll', icon: DollarSign, color: 'bg-purple-500', description: 'Process monthly salary' },
  { title: 'Schedule Interview', icon: CalendarIcon, color: 'bg-orange-500', description: 'Book candidate meeting' }
];

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your organization.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-medium">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#05A7CC] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
            <Users className="h-5 w-5 text-[#05A7CC]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <span>+12 this month</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Active: 1,195 | Inactive: 52</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#EF5226] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Attrition Rate</CardTitle>
            <TrendingDown className="h-5 w-5 text-[#EF5226]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8.2%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <span>-2.1% from last month</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Industry avg: 10.3%</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Payroll</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$532K</div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>+4.2% from last month</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Annual: $6.1M projected</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Engagement Score</CardTitle>
            <Heart className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <span>+5% from last quarter</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Target: 85%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attrition Trends */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Attrition Rate Trends</CardTitle>
            <p className="text-sm text-gray-600">Monthly attrition percentage over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attritionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#EF5226" 
                  strokeWidth={3}
                  dot={{ fill: '#EF5226', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payroll Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Payroll Overview</CardTitle>
            <p className="text-sm text-gray-600">Payroll costs over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Amount']} />
                <Bar dataKey="amount" fill="#05A7CC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Employee Engagement</CardTitle>
            <p className="text-sm text-gray-600">Distribution of engagement levels</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
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
                <Tooltip formatter={(value) => [`${value}%`, 'Employees']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
            <p className="text-sm text-gray-600">Performance scores by department</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="department" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                <Bar dataKey="score" fill="#4CAF50" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Today's Meetings</CardTitle>
            <p className="text-sm text-gray-600">Scheduled meetings for today</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#05A7CC] rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                      <p className="text-xs text-gray-500">{meeting.time} • {meeting.participants} participants</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {meeting.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <p className="text-sm text-gray-600">Frequently used actions for faster workflow</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
/* testing */