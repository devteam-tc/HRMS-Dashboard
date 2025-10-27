import React, { useState } from 'react';
import { Calendar, Users, Clock, TrendingUp, Download, Filter, BarChart3, PieChart, LineChart } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const monthlyMeetingsData = [
  { month: 'Jan', meetings: 45, participants: 320, duration: 1250 },
  { month: 'Feb', meetings: 52, participants: 380, duration: 1480 },
  { month: 'Mar', meetings: 38, participants: 290, duration: 980 },
  { month: 'Apr', meetings: 48, participants: 350, duration: 1320 },
  { month: 'May', meetings: 55, participants: 420, duration: 1650 },
  { month: 'Jun', meetings: 42, participants: 310, duration: 1180 }
];

const departmentParticipationData = [
  { department: 'Engineering', participation: 89, meetings: 28, color: '#05A7CC' },
  { department: 'Product', participation: 94, meetings: 22, color: '#4CAF50' },
  { department: 'Design', participation: 87, meetings: 18, color: '#9C27B0' },
  { department: 'Marketing', participation: 92, meetings: 15, color: '#FF9800' },
  { department: 'Sales', participation: 85, meetings: 12, color: '#EF5226' },
  { department: 'HR', participation: 96, meetings: 8, color: '#795548' },
  { department: 'Finance', participation: 91, meetings: 6, color: '#607D8B' }
];

const meetingTypesData = [
  { name: 'Team Standup', value: 35, color: '#05A7CC' },
  { name: 'Project Review', value: 25, color: '#4CAF50' },
  { name: 'Planning', value: 20, color: '#9C27B0' },
  { name: 'One-on-One', value: 15, color: '#FF9800' },
  { name: 'Client Meeting', value: 5, color: '#EF5226' }
];

const attendanceRateData = [
  { month: 'Jan', rate: 87 },
  { month: 'Feb', rate: 92 },
  { month: 'Mar', rate: 85 },
  { month: 'Apr', rate: 89 },
  { month: 'May', rate: 94 },
  { month: 'Jun', rate: 91 }
];

const meetingDurationData = [
  { duration: '< 30 min', count: 45, percentage: 40 },
  { duration: '30-60 min', count: 38, percentage: 34 },
  { duration: '60-90 min', count: 20, percentage: 18 },
  { duration: '> 90 min', count: 9, percentage: 8 }
];

export const MeetingReports = ({ onNavigate }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last-6-months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const totalMeetings = monthlyMeetingsData.reduce((sum, month) => sum + month.meetings, 0);
  const totalParticipants = monthlyMeetingsData.reduce((sum, month) => sum + month.participants, 0);
  const totalDuration = monthlyMeetingsData.reduce((sum, month) => sum + month.duration, 0);
  const averageAttendance = attendanceRateData.reduce((sum, month) => sum + month.rate, 0) / attendanceRateData.length;

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Meeting Reports & Analytics</h1>
            <p className="text-[#666666]">Insights and analytics on meeting productivity and engagement</p>
          </div>
          <div className="flex space-x-4">
            <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Report</span>
            </button>
            <button 
              onClick={() => onNavigate('new-meeting')}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Schedule Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-[#666666]" />
            <span className="font-medium text-[#333333]">Filters:</span>
          </div>
          
          <div className="neu-input p-3 rounded-2xl">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-transparent outline-none text-[#333333]"
            >
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
            </select>
          </div>

          <div className="neu-input p-3 rounded-2xl">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-transparent outline-none text-[#333333]"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <Calendar className="h-6 w-6 text-[#05A7CC]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">{totalMeetings}</div>
              <div className="text-sm text-[#4CAF50] font-medium">+15% vs last period</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Total Meetings</h3>
            <div className="text-xs text-[#666666]">Average: {Math.round(totalMeetings / 6)} per month</div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <Users className="h-6 w-6 text-[#4CAF50]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">{totalParticipants}</div>
              <div className="text-sm text-[#05A7CC] font-medium">+8% vs last period</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Total Participants</h3>
            <div className="text-xs text-[#666666]">Average: {Math.round(totalParticipants / totalMeetings)} per meeting</div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <Clock className="h-6 w-6 text-[#9C27B0]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">{Math.round(totalDuration / 60)}h</div>
              <div className="text-sm text-[#EF5226] font-medium">-5% vs last period</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Total Duration</h3>
            <div className="text-xs text-[#666666]">Average: {Math.round(totalDuration / totalMeetings)} min per meeting</div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <TrendingUp className="h-6 w-6 text-[#FF9800]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">{Math.round(averageAttendance)}%</div>
              <div className="text-sm text-[#4CAF50] font-medium">+3% vs last period</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Attendance Rate</h3>
            <div className="text-xs text-[#666666]">Target: 85%</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Meetings Trend */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Monthly Meeting Trends</h3>
            <p className="text-[#666666]">Number of meetings and participants over time</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyMeetingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="meetings" 
                  stackId="1" 
                  stroke="#05A7CC" 
                  fill="#05A7CC" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Attendance Rate Trends</h3>
            <p className="text-[#666666]">Monthly attendance percentage</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={attendanceRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                  formatter={(value) => [`${value}%`, 'Attendance Rate']} 
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#4CAF50" 
                  strokeWidth={3}
                  dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Department Participation */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Department Participation</h3>
            <p className="text-[#666666]">Participation rate by department</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentParticipationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
                <XAxis type="number" domain={[0, 100]} stroke="#666666" />
                <YAxis type="category" dataKey="department" stroke="#666666" width={80} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                  formatter={(value) => [`${value}%`, 'Participation Rate']} 
                />
                <Bar dataKey="participation" radius={[0, 8, 8, 0]}>
                  {departmentParticipationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meeting Types */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Meeting Types</h3>
            <p className="text-[#666666]">Distribution of meeting types</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={meetingTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {meetingTypesData.map((entry, index) => (
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
                  formatter={(value) => [`${value}%`, 'Meetings']} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {meetingTypesData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-[#666666] flex-1">{item.name}</span>
                  <span className="text-xs text-[#333333] font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting Duration Distribution */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Meeting Duration</h3>
            <p className="text-[#666666]">Distribution of meeting lengths</p>
          </div>
          <div className="space-y-4">
            {meetingDurationData.map((item, index) => (
              <div key={index} className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#333333]">{item.duration}</span>
                  <span className="text-[#666666]">{item.count} meetings</span>
                </div>
                <div className="neu-card-inset rounded-xl overflow-hidden">
                  <div 
                    className="h-3 bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-[#05A7CC] font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Details Table */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#333333] mb-2">Department Performance Details</h3>
          <p className="text-[#666666]">Detailed metrics by department</p>
        </div>
        
        <div className="space-y-4">
          <div className="neu-small p-4 rounded-2xl">
            <div className="grid grid-cols-5 gap-4 font-medium text-[#666666] text-sm">
              <div>Department</div>
              <div>Total Meetings</div>
              <div>Participation Rate</div>
              <div>Avg Attendance</div>
              <div>Performance</div>
            </div>
          </div>

          {departmentParticipationData.map((dept, index) => (
            <div key={index} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <span className="font-medium text-[#333333]">{dept.department}</span>
                </div>
                <div className="text-[#333333]">{dept.meetings}</div>
                <div className="text-[#333333]">{dept.participation}%</div>
                <div className="text-[#333333]">92%</div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    dept.participation >= 90 ? 'bg-[#4CAF50]' :
                    dept.participation >= 85 ? 'bg-[#FFC107]' : 'bg-[#EF5226]'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    dept.participation >= 90 ? 'text-[#4CAF50]' :
                    dept.participation >= 85 ? 'text-[#FFC107]' : 'text-[#EF5226]'
                  }`}>
                    {dept.participation >= 90 ? 'Excellent' :
                     dept.participation >= 85 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Key Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-3">📈 Positive Trends</h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Attendance rate increased by 3% this period</li>
              <li>• HR department shows 96% participation rate</li>
              <li>• Average meeting duration decreased by 5 minutes</li>
              <li>• 15% more meetings scheduled than last period</li>
            </ul>
          </div>
          
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-3">⚠️ Areas for Improvement</h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Sales department has lowest participation (85%)</li>
              <li>• 8% of meetings exceed 90 minutes</li>
              <li>• Follow up on missed meetings in Engineering</li>
              <li>• Consider reducing frequency of status meetings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};