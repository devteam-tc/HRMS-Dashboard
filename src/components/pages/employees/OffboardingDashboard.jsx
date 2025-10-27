import React, { useState } from 'react';
import { Plus, Users, Clock, CheckCircle, AlertTriangle, Calendar, TrendingDown, FileText, User, UserX, ExternalLink } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OffboardingDashboard = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Mock offboarding data
  const offboardingStats = {
    total: 18,
    inProgress: 6,
    completed: 10,
    pending: 2,
    averageDuration: 8,
    clearanceRate: 94
  };

  const activeOffboarding = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      designation: 'Senior Data Analyst',
      department: 'Analytics',
      lastWorkingDay: '2024-02-15',
      resignationDate: '2024-01-20',
      status: 'In Progress',
      progress: 70,
      stage: 'Asset Return',
      reason: 'Career Growth',
      manager: 'Jennifer Liu',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 2,
      name: 'Susan Garcia',
      designation: 'Marketing Specialist',
      department: 'Marketing',
      lastWorkingDay: '2024-02-28',
      resignationDate: '2024-01-25',
      status: 'In Progress',
      progress: 45,
      stage: 'Documentation',
      reason: 'Relocation',
      manager: 'David Thompson',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 3,
      name: 'Tom Wilson',
      designation: 'UI Designer',
      department: 'Design',
      lastWorkingDay: '2024-02-10',
      resignationDate: '2024-01-15',
      status: 'Completed',
      progress: 100,
      stage: 'Complete',
      reason: 'New Opportunity',
      manager: 'Lisa Anderson',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 4,
      name: 'Rachel Green',
      designation: 'Sales Manager',
      department: 'Sales',
      lastWorkingDay: '2024-03-01',
      resignationDate: '2024-02-01',
      status: 'Pending',
      progress: 25,
      stage: 'Initial Setup',
      reason: 'Personal Reasons',
      manager: 'Mark Davis',
      avatar: '/placeholder-avatar.jpg'
    }
  ];

  const offboardingTrends = [
    { month: 'Aug', exits: 3, completed: 3, duration: 9 },
    { month: 'Sep', exits: 5, completed: 5, duration: 8 },
    { month: 'Oct', exits: 2, completed: 2, duration: 7 },
    { month: 'Nov', exits: 4, completed: 4, duration: 9 },
    { month: 'Dec', exits: 6, completed: 5, duration: 8 },
    { month: 'Jan', exits: 8, completed: 6, duration: 8 }
  ];

  const departmentExits = [
    { department: 'Sales', count: 4, color: '#EF5226' },
    { department: 'Engineering', count: 3, color: '#05A7CC' },
    { department: 'Marketing', count: 3, color: '#4CAF50' },
    { department: 'Design', count: 2, color: '#FFC107' },
    { department: 'Analytics', count: 2, color: '#9C27B0' },
    { department: 'HR', count: 1, color: '#FF5722' }
  ];

  const exitReasons = [
    { reason: 'Career Growth', count: 6, percentage: 35 },
    { reason: 'Better Compensation', count: 4, percentage: 24 },
    { reason: 'Work-Life Balance', count: 3, percentage: 18 },
    { reason: 'Relocation', count: 2, percentage: 12 },
    { reason: 'Personal Reasons', count: 2, percentage: 11 }
  ];

  const clearanceTasks = [
    {
      id: 1,
      employee: 'Michael Rodriguez',
      task: 'Return Laptop & Accessories',
      dueDate: '2024-02-14',
      priority: 'High',
      assignee: 'IT Department',
      status: 'pending'
    },
    {
      id: 2,
      employee: 'Susan Garcia',
      task: 'Knowledge Transfer Documentation',
      dueDate: '2024-02-26',
      priority: 'High',
      assignee: 'Manager',
      status: 'in-progress'
    },
    {
      id: 3,
      employee: 'Rachel Green',
      task: 'Client Handover Meeting',
      dueDate: '2024-02-28',
      priority: 'Critical',
      assignee: 'Sales Team',
      status: 'pending'
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
      case 'Critical': return 'text-red-800 bg-red-200';
      case 'High': return 'text-red-700 bg-red-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case 'Career Growth': return 'text-blue-700 bg-blue-100';
      case 'Better Compensation': return 'text-green-700 bg-green-100';
      case 'Work-Life Balance': return 'text-purple-700 bg-purple-100';
      case 'Relocation': return 'text-orange-700 bg-orange-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#333333] mb-2">Offboarding Dashboard</h1>
            <p className="text-[#666666] text-lg">Track employee exit processes and clearance status</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('exit-process')}
              className="neu-primary px-6 py-3 rounded-2xl whitespace-nowrap flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Plus size={20} />
              <span>Start Exit Process</span>
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
                <UserX className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{offboardingStats.total}</div>
                <div className="text-sm text-[#EF5226] font-medium">+3 this month</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">Total Exits</h3>
              <div className="text-xs text-[#666666]">Employee departures this period</div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 neu-secondary rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{offboardingStats.inProgress}</div>
                <div className="text-sm text-[#05A7CC] font-medium">Active processes</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">In Progress</h3>
              <div className="text-xs text-[#666666]">Currently processing exits</div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{offboardingStats.clearanceRate}%</div>
                <div className="text-sm text-[#4CAF50] font-medium">+2% vs last month</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-[#333333] mb-1">Clearance Rate</h3>
              <div className="text-xs text-[#666666]">Successfully completed</div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333]">{offboardingStats.averageDuration}</div>
                <div className="text-sm text-[#4CAF50] font-medium">-1 day improved</div>
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
        {/* Exit Trends */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Exit Trends</h3>
            <p className="text-[#666666]">Monthly employee departures and completion rate</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={offboardingTrends}>
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
                  dataKey="exits" 
                  stroke="#EF5226" 
                  strokeWidth={3}
                  dot={{ fill: '#EF5226', strokeWidth: 2, r: 6 }}
                  name="Total Exits"
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

        {/* Department Exit Distribution */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Department Exit Distribution</h3>
            <p className="text-[#666666]">Employee departures by department</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={departmentExits}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {departmentExits.map((entry, index) => (
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
              {departmentExits.map((item, index) => (
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
        {/* Active Offboarding */}
        <div className="lg:col-span-2 neu-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Active Offboarding</h3>
              <p className="text-[#666666]">Current employee exit processes</p>
            </div>
            <button
              onClick={() => onNavigate?.('offboarding-checklist')}
              className="neu-button px-4 py-2 rounded-2xl flex items-center space-x-2 hover:text-[#05A7CC] transition-colors"
            >
              <FileText size={16} />
              <span>View All</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {activeOffboarding.map((employee) => (
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
                      <div className="flex items-center space-x-4 text-xs text-[#999999] mt-1">
                        <span>{employee.department}</span>
                        <span>•</span>
                        <span>LWD: {new Date(employee.lastWorkingDay).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full ${getReasonColor(employee.reason)}`}>
                          {employee.reason}
                        </span>
                      </div>
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
                            className={`h-2 rounded-full transition-all duration-300 ${
                              employee.status === 'Completed' ? 'bg-[#4CAF50]' : 'bg-[#EF5226]'
                            }`}
                            style={{ width: `${employee.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#666666]">{employee.progress}%</span>
                      </div>
                      <p className="text-xs text-[#999999] mt-1">Stage: {employee.stage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Pending Clearance</h3>
            <p className="text-[#666666]">Critical offboarding tasks</p>
          </div>
          
          <div className="space-y-4">
            {clearanceTasks.map((task) => (
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

      {/* Exit Reasons Analysis */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#333333] mb-2">Exit Reasons Analysis</h3>
          <p className="text-[#666666]">Understanding why employees are leaving</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {exitReasons.map((reason, index) => (
            <div key={index} className="neu-small p-6 rounded-2xl text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                index === 0 ? 'neu-primary' : 
                index === 1 ? 'neu-secondary' : 
                'bg-gray-500'
              }`}>
                <span className="text-2xl font-bold text-white">{reason.count}</span>
              </div>
              <h4 className="font-bold text-[#333333] mb-2 text-sm">{reason.reason}</h4>
              <div className="w-full h-2 bg-[#E8EBEF] rounded-full mb-2">
                <div 
                  className="h-2 bg-[#EF5226] rounded-full transition-all duration-300"
                  style={{ width: `${reason.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#666666]">{reason.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};