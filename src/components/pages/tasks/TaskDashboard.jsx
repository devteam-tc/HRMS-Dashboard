import React, { useState } from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp, Users, Folder, Target, Calendar, ArrowUp, ArrowDown, BarChart3, Filter } from 'lucide-react';

export const TaskDashboard = ({ onNavigate }) => {
  const [dateFilter, setDateFilter] = useState('this-month');

  const kpiData = [
    {
      title: 'Total Projects',
      value: '24',
      change: '+3 from last month',
      changeType: 'positive',
      icon: Folder,
      color: 'text-[#EF5226]',
      bgColor: 'from-[#EF5226] to-[#d4471f]'
    },
    {
      title: 'Open Tasks',
      value: '156',
      change: '+12 this week',
      changeType: 'positive',
      icon: CheckSquare,
      color: 'text-[#05A7CC]',
      bgColor: 'from-[#05A7CC] to-[#048ba8]'
    },
    {
      title: 'Completed Tasks',
      value: '342',
      change: '+28 this week',
      changeType: 'positive',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'from-green-400 to-green-600'
    },
    {
      title: 'Overdue Tasks',
      value: '8',
      change: '-5 from yesterday',
      changeType: 'positive',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'from-red-400 to-red-600'
    }
  ];

  const taskCompletionTrend = [
    { week: 'Week 1', completed: 45, target: 50 },
    { week: 'Week 2', completed: 52, target: 50 },
    { week: 'Week 3', completed: 48, target: 50 },
    { week: 'Week 4', completed: 58, target: 50 }
  ];

  const resourceAllocation = [
    { team: 'Frontend Team', allocated: 85, capacity: 100, tasks: 28, color: '#EF5226' },
    { team: 'Backend Team', allocated: 92, capacity: 100, tasks: 34, color: '#05A7CC' },
    { team: 'DevOps Team', allocated: 67, capacity: 100, tasks: 18, color: '#4CAF50' },
    { team: 'QA Team', allocated: 78, capacity: 100, tasks: 22, color: '#9C27B0' },
    { team: 'Design Team', allocated: 54, capacity: 100, tasks: 15, color: '#FFC107' }
  ];

  const recentProjects = [
    {
      name: 'E-commerce Platform',
      progress: 75,
      tasks: { total: 45, completed: 34 },
      team: 8,
      deadline: '2024-04-15',
      status: 'on-track',
      priority: 'high'
    },
    {
      name: 'Mobile App Redesign',
      progress: 45,
      tasks: { total: 32, completed: 14 },
      team: 6,
      deadline: '2024-05-20',
      status: 'at-risk',
      priority: 'medium'
    },
    {
      name: 'API Integration',
      progress: 90,
      tasks: { total: 18, completed: 16 },
      team: 4,
      deadline: '2024-03-30',
      status: 'on-track',
      priority: 'high'
    },
    {
      name: 'Data Migration',
      progress: 25,
      tasks: { total: 28, completed: 7 },
      team: 5,
      deadline: '2024-06-10',
      status: 'delayed',
      priority: 'low'
    }
  ];

  const tasksByPriority = [
    { priority: 'High', count: 45, color: '#EF5226' },
    { priority: 'Medium', count: 78, color: '#FFC107' },
    { priority: 'Low', count: 35, color: '#4CAF50' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'on-track': 'bg-green-100 text-green-800',
      'at-risk': 'bg-yellow-100 text-yellow-800',
      'delayed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  // Layout: Dashboard Cards + Charts
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Dashboard</h1>
        <p className="text-[#666666]">Monitor project progress and track team performance</p>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="neu-button px-4 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onNavigate('task-projects')}
              className="neu-button px-6 py-3 rounded-xl hover:text-[#EF5226] transition-colors"
            >
              View All Projects
            </button>
            <button 
              onClick={() => onNavigate('add-new-task')}
              className="neu-primary px-6 py-3 rounded-xl hover:shadow-xl transition-all"
            >
              Create New Task
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`neu-small p-3 rounded-xl bg-gradient-to-br ${kpi.bgColor}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className={`text-xs px-3 py-1 rounded-full font-medium flex items-center ${
                  kpi.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {kpi.changeType === 'positive' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                  {kpi.change.split(' ')[0]}
                </div>
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-1 group-hover:scale-105 transition-transform ${kpi.color}`}>
                  {kpi.value}
                </h3>
                <p className="text-[#666666] text-sm">{kpi.title}</p>
                <p className="text-[#888] text-xs mt-1">{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Task Completion Trend */}
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#333333]">Task Completion Trend</h2>
            <TrendingUp size={20} className="text-[#EF5226]" />
          </div>
          <div className="h-64 neu-card-inset rounded-xl p-4">
            <div className="h-full flex items-end justify-between space-x-4">
              {taskCompletionTrend.map((week, index) => (
                <div key={week.week} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center mb-2">
                    {/* Target line */}
                    <div className="w-full h-1 bg-gray-300 rounded mb-1" style={{ marginTop: `${240 - (week.target / 60) * 240}px` }}></div>
                    {/* Actual bar */}
                    <div 
                      className="w-full rounded-lg transition-all duration-500 hover:shadow-md"
                      style={{ 
                        height: `${(week.completed / 60) * 240}px`,
                        background: week.completed >= week.target 
                          ? 'linear-gradient(to top, #EF5226, #d4471f)' 
                          : 'linear-gradient(to top, #05A7CC, #048ba8)'
                      }}
                    ></div>
                    <div className="text-xs font-medium mt-2" style={{
                      color: week.completed >= week.target ? '#EF5226' : '#05A7CC'
                    }}>
                      {week.completed}
                    </div>
                  </div>
                  <div className="text-[#666666] text-xs font-medium">{week.week}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-[#EF5226] to-[#d4471f] mr-2"></div>
              <span className="text-sm text-[#666666]">Above Target</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-[#05A7CC] to-[#048ba8] mr-2"></div>
              <span className="text-sm text-[#666666]">Below Target</span>
            </div>
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#333333]">Resource Allocation</h2>
            <Users size={20} className="text-[#05A7CC]" />
          </div>
          <div className="space-y-4">
            {resourceAllocation.map((team, index) => (
              <div key={team.team} className="neu-small p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <span className="font-medium text-[#333333]">{team.team}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-[#666666]">{team.tasks} tasks</span>
                    <span className="text-sm font-bold" style={{ color: team.color }}>
                      {team.allocated}%
                    </span>
                  </div>
                </div>
                <div className="neu-card-inset rounded-lg p-1">
                  <div 
                    className="h-3 rounded-lg transition-all duration-300"
                    style={{ 
                      width: `${team.allocated}%`,
                      backgroundColor: team.color
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-[#666666] mt-2">
                  <span>Allocated: {team.allocated}/{team.capacity}</span>
                  <span>{team.capacity - team.allocated} available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects and Task Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#333333]">Recent Projects</h2>
            <button 
              onClick={() => onNavigate('task-projects')}
              className="neu-button px-4 py-2 rounded-xl text-sm hover:text-[#EF5226] transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={project.name} className="neu-small p-4 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-[#333333]">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#666666]">
                    <span className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {project.team}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {project.deadline}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#666666]">
                    Progress: {project.tasks.completed}/{project.tasks.total} tasks
                  </span>
                  <span className="text-sm font-bold text-[#EF5226]">{project.progress}%</span>
                </div>
                <div className="neu-card-inset rounded-lg p-1">
                  <div 
                    className="h-2 neu-primary rounded-lg transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Distribution */}
        <div className="neu-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-[#333333] mb-6">Tasks by Priority</h2>
          <div className="space-y-6">
            {tasksByPriority.map((priority, index) => (
              <div key={priority.priority} className="neu-small p-4 rounded-xl text-center">
                <div className="text-2xl font-bold mb-2" style={{ color: priority.color }}>
                  {priority.count}
                </div>
                <div className="text-[#666666] mb-3">{priority.priority} Priority</div>
                <div className="neu-card-inset rounded-lg p-1">
                  <div 
                    className="h-2 rounded-lg transition-all duration-300"
                    style={{ 
                      width: `${(priority.count / 158) * 100}%`,
                      backgroundColor: priority.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
            
            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => onNavigate('task-kanban')}
                className="w-full neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
              >
                <CheckSquare size={16} className="inline mr-2" />
                View Kanban Board
              </button>
              <button 
                onClick={() => onNavigate('task-timeline')}
                className="w-full neu-button p-3 rounded-xl hover:text-[#05A7CC] transition-colors"
              >
                <BarChart3 size={16} className="inline mr-2" />
                View Timeline
              </button>
              <button 
                onClick={() => onNavigate('task-analytics')}
                className="w-full neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
              >
                <TrendingUp size={16} className="inline mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};