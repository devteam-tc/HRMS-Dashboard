import React, { useState } from 'react';
import { Plus, Users, Clock, CheckCircle, AlertTriangle, Calendar, TrendingUp, FileText, User, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OnboardingDashboard = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Mock onboarding data
  const onboardingStats = {
    total: 24,
    inProgress: 8,
    completed: 14,
    pending: 2,
    averageDuration: 12,
    completionRate: 87
  };

  const recentOnboarding = [
    {
      id: 1,
      name: 'Alice Johnson',
      designation: 'Frontend Developer',
      department: 'Engineering',
      startDate: '2024-01-15',
      status: 'In Progress',
      progress: 75,
      stage: 'Documentation',
      mentor: 'John Smith',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      designation: 'Product Manager',
      department: 'Product',
      startDate: '2024-01-12',
      status: 'Completed',
      progress: 100,
      stage: 'Complete',
      mentor: 'Sarah Davis',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 3,
      name: 'Carol Brown',
      designation: 'UX Designer',
      department: 'Design',
      startDate: '2024-01-18',
      status: 'In Progress',
      progress: 45,
      stage: 'IT Setup',
      mentor: 'Mike Johnson',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 4,
      name: 'David Miller',
      designation: 'Data Analyst',
      department: 'Analytics',
      startDate: '2024-01-20',
      status: 'Pending',
      progress: 15,
      stage: 'Document Review',
      mentor: 'Lisa Chen',
      avatar: '/placeholder-avatar.jpg'
    }
  ];

  const onboardingTrends = [
    { month: 'Aug', new: 8, completed: 6, duration: 14 },
    { month: 'Sep', new: 12, completed: 10, duration: 13 },
    { month: 'Oct', new: 6, completed: 8, duration: 11 },
    { month: 'Nov', new: 15, completed: 12, duration: 12 },
    { month: 'Dec', new: 10, completed: 9, duration: 10 },
    { month: 'Jan', new: 24, completed: 14, duration: 12 }
  ];

  const departmentOnboarding = [
    { department: 'Engineering', count: 8, color: '#EF5226' },
    { department: 'Sales', count: 5, color: '#05A7CC' },
    { department: 'Marketing', count: 4, color: '#4CAF50' },
    { department: 'Design', count: 3, color: '#FFC107' },
    { department: 'Analytics', count: 2, color: '#9C27B0' },
    { department: 'HR', count: 2, color: '#FF5722' }
  ];

  const onboardingStages = [
    { stage: 'Documentation', count: 3, percentage: 25 },
    { stage: 'IT Setup', count: 2, percentage: 17 },
    { stage: 'Training', count: 2, percentage: 17 },
    { stage: 'Mentoring', count: 1, percentage: 8 },
    { stage: 'Completed', count: 4, percentage: 33 }
  ];

  const upcomingTasks = [
    {
      id: 1,
      employee: 'Alice Johnson',
      task: 'Complete IT Security Training',
      dueDate: '2024-01-25',
      priority: 'High',
      assignee: 'IT Department'
    },
    {
      id: 2,
      employee: 'Carol Brown',
      task: 'Design Tools Setup',
      dueDate: '2024-01-26',
      priority: 'Medium',
      assignee: 'Design Team'
    },
    {
      id: 3,
      employee: 'David Miller',
      task: 'Document Verification',
      dueDate: '2024-01-27',
      priority: 'High',
      assignee: 'HR Team'
    }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-700 bg-green-100';
      case 'In Progress': return 'text-blue-700 bg-blue-100';
      case 'Pending': return 'text-yellow-700 bg-yellow-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-700 bg-red-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#333333] mb-2">Onboarding Dashboard</h1>
            <p className="text-[#666666] text-lg">Track new employee onboarding progress and metrics</p>
          </div>
          <div className="flex items-center space-x-4">
           <button
           onClick={() => onNavigate?.('onboarding-new')}
            className="neu-primary px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 whitespace-nowrap"
            >
              <Plus size={20} />
              <span>Start Onboarding</span>
            </button>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="neu-input px-4 py-3 rounded-2xl text-[#333333]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 neu-primary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{onboardingStats.total}</div>
                <div className="text-sm text-[#4CAF50] font-medium">+6 this month</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">Total Onboarding</h3>
              <div className="text-xs text-[#666666]">New employees this period</div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 neu-secondary rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{onboardingStats.inProgress}</div>
                <div className="text-sm text-[#05A7CC] font-medium">In progress</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">Active Onboarding</h3>
              <div className="text-xs text-[#666666]">Currently in process</div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{onboardingStats.completionRate}%</div>
                <div className="text-sm text-[#4CAF50] font-medium">+3% vs last month</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">Completion Rate</h3>
              <div className="text-xs text-[#666666]">Successfully completed</div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{onboardingStats.averageDuration}</div>
                <div className="text-sm text-[#4CAF50] font-medium">-2 days improved</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">Avg. Duration</h3>
              <div className="text-xs text-[#666666]">Days to complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Onboarding Trends */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Onboarding Trends</h3>
            <p className="text-[#666666]">Monthly new hires and completion rate</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={onboardingTrends}>
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
                <Line 
                  type="monotone" 
                  dataKey="new" 
                  stroke="#EF5226" 
                  strokeWidth={3}
                  dot={{ fill: '#EF5226', strokeWidth: 2, r: 6 }}
                  name="New Hires"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#05A7CC" 
                  strokeWidth={3}
                  dot={{ fill: '#05A7CC', strokeWidth: 2, r: 6 }}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Department Distribution</h3>
            <p className="text-[#666666]">New hires by department</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={departmentOnboarding}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {departmentOnboarding.map((entry, index) => (
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
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentOnboarding.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-[#666666]">{item.department} ({item.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Onboarding */}
        <div className="lg:col-span-2 neu-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Recent Onboarding</h3>
              <p className="text-[#666666]">Latest employee onboarding progress</p>
            </div>
            <button
              onClick={() => onNavigate?.('onboarding-checklist')}
              className="neu-button px-4 py-2 rounded-2xl flex items-center space-x-2 hover:text-[#05A7CC] transition-colors"
            >
              <FileText size={16} />
              <span>View All</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOnboarding.map((employee) => (
              <div key={employee.id} className="neu-small p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 neu-gradient rounded-full flex items-center justify-center">
                      <span className="font-bold text-[#05A7CC]">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#333333]">{employee.name}</h4>
                      <p className="text-sm text-[#666666]">{employee.designation}</p>
                      <p className="text-xs text-[#999999]">{employee.department} • Started {new Date(employee.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-[#E8EBEF] rounded-full">
                          <div 
                            className="h-2 bg-[#05A7CC] rounded-full transition-all duration-300"
                            style={{ width: `${employee.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#666666]">{employee.progress}%</span>
                      </div>
                      <p className="text-xs text-[#999999] mt-1">Current: {employee.stage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Upcoming Tasks</h3>
            <p className="text-[#666666]">Pending onboarding tasks</p>
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="neu-small p-4 rounded-2xl">
                <div className="mb-2">
                  <h4 className="font-medium text-[#333333] text-sm">{task.task}</h4>
                  <p className="text-xs text-[#666666]">For: {task.employee}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar size={12} className="text-[#666666]" />
                    <span className="text-xs text-[#666666]">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-[#999999] mt-2">Assigned to: {task.assignee}</p>
              </div>
            ))}
          </div>

          <button className="w-full neu-button p-3 rounded-2xl mt-4 hover:text-[#EF5226] transition-colors">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Onboarding Stages */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#333333] mb-2">Current Onboarding Stages</h3>
          <p className="text-[#666666]">Breakdown of employees by onboarding stage</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {onboardingStages.map((stage, index) => (
            <div key={index} className="neu-small p-6 rounded-2xl text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                stage.stage === 'Completed' ? 'neu-primary' : 'neu-secondary'
              }`}>
                <span className="text-2xl font-bold text-white">{stage.count}</span>
              </div>
              <h4 className="font-bold text-[#333333] mb-2">{stage.stage}</h4>
              <div className="w-full h-2 bg-[#E8EBEF] rounded-full mb-2">
                <div 
                  className="h-2 bg-[#05A7CC] rounded-full transition-all duration-300"
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#666666]">{stage.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};