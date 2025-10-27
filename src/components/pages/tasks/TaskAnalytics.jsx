import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Filter, Calendar, Users, Target, Clock, PieChart, FileText, Eye, RefreshCw } from 'lucide-react';

export const TaskAnalytics = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState('this-month');
  const [chartType, setChartType] = useState('completion');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const analyticsData = {
    overview: {
      totalTasks: 156,
      completedTasks: 98,
      inProgressTasks: 42,
      overdueTasks: 16,
      averageCompletionTime: 4.2,
      teamProductivity: 87
    },
    trends: [
      { period: 'Week 1', completed: 12, created: 15, overdue: 2, productivity: 85 },
      { period: 'Week 2', completed: 18, created: 20, overdue: 1, productivity: 88 },
      { period: 'Week 3', completed: 22, created: 18, overdue: 3, productivity: 82 },
      { period: 'Week 4', completed: 25, created: 22, overdue: 2, productivity: 90 },
      { period: 'Week 5', completed: 21, created: 19, overdue: 4, productivity: 86 }
    ],
    teamPerformance: [
      { name: 'John Doe', completed: 28, average: 4.1, efficiency: 95, workload: 85 },
      { name: 'Sarah Wilson', completed: 24, average: 3.8, efficiency: 98, workload: 70 },
      { name: 'Mike Johnson', completed: 22, average: 5.2, efficiency: 88, workload: 95 },
      { name: 'Emma Brown', completed: 20, average: 3.5, efficiency: 92, workload: 75 },
      { name: 'David Lee', completed: 18, average: 4.8, efficiency: 94, workload: 88 },
      { name: 'Lisa Chen', completed: 16, average: 4.0, efficiency: 90, workload: 60 }
    ],
    priorityDistribution: [
      { priority: 'High', count: 45, completed: 32, color: '#EF5226' },
      { priority: 'Medium', count: 78, completed: 58, color: '#FFC107' },
      { priority: 'Low', count: 33, completed: 28, color: '#4CAF50' }
    ],
    departmentStats: [
      { department: 'Development', tasks: 68, completed: 52, efficiency: 88, color: '#EF5226' },
      { department: 'Design', tasks: 34, completed: 28, efficiency: 92, color: '#05A7CC' },
      { department: 'QA', tasks: 28, completed: 22, efficiency: 85, color: '#9C27B0' },
      { department: 'DevOps', tasks: 26, completed: 20, efficiency: 94, color: '#4CAF50' }
    ],
    projectProgress: [
      { project: 'E-commerce Platform', tasks: 45, completed: 34, progress: 76, budget: 85000, spent: 62000 },
      { project: 'Mobile App Development', tasks: 32, completed: 18, progress: 56, budget: 65000, spent: 48000 },
      { project: 'API Gateway', tasks: 28, completed: 26, progress: 93, budget: 45000, spent: 42000 },
      { project: 'Data Analytics', tasks: 51, completed: 20, progress: 39, budget: 75000, spent: 35000 }
    ]
  };

  const reportTemplates = [
    {
      id: 'weekly-summary',
      name: 'Weekly Task Summary',
      description: 'Comprehensive weekly report with task completion and team performance',
      icon: Calendar,
      color: '#EF5226'
    },
    {
      id: 'team-performance',
      name: 'Team Performance Report',
      description: 'Individual and team productivity metrics and analysis',
      icon: Users,
      color: '#05A7CC'
    },
    {
      id: 'project-status',
      name: 'Project Status Report',
      description: 'Project progress, budget utilization, and milestone tracking',
      icon: Target,
      color: '#4CAF50'
    },
    {
      id: 'workload-analysis',
      name: 'Workload Analysis Report',
      description: 'Task distribution and workload balancing across team members',
      icon: BarChart3,
      color: '#9C27B0'
    }
  ];

  const renderCompletionChart = () => (
    <div className="h-64 neu-card-inset rounded-xl p-4">
      <div className="h-full flex items-end justify-between space-x-2">
        {analyticsData.trends.map((week, index) => (
          <div key={week.period} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-2">
              {/* Completed bar */}
              <div 
                className="w-full rounded-t-lg transition-all duration-500 hover:shadow-md mb-1"
                style={{ 
                  height: `${(week.completed / 30) * 180}px`,
                  background: 'linear-gradient(to top, #4CAF50, #66BB6A)'
                }}
              ></div>
              {/* Created bar */}
              <div 
                className="w-full rounded-t-lg transition-all duration-500 hover:shadow-md opacity-60"
                style={{ 
                  height: `${(week.created / 30) * 180}px`,
                  background: 'linear-gradient(to top, #05A7CC, #29B6F6)'
                }}
              ></div>
              <div className="text-xs font-medium mt-2 space-y-1">
                <div className="text-green-600">{week.completed}</div>
                <div className="text-[#05A7CC]">{week.created}</div>
              </div>
            </div>
            <div className="text-[#666666] text-xs font-medium">{week.period}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductivityChart = () => (
    <div className="h-64 neu-card-inset rounded-xl p-4">
      <div className="h-full flex items-end justify-between space-x-2">
        {analyticsData.trends.map((week, index) => (
          <div key={week.period} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-2">
              <div 
                className="w-full rounded-lg transition-all duration-500 hover:shadow-md"
                style={{ 
                  height: `${(week.productivity / 100) * 200}px`,
                  background: week.productivity >= 85 
                    ? 'linear-gradient(to top, #EF5226, #FF6B4A)' 
                    : 'linear-gradient(to top, #FFC107, #FFD54F)'
                }}
              ></div>
              <div className="text-xs font-medium mt-2" style={{
                color: week.productivity >= 85 ? '#EF5226' : '#FFC107'
              }}>
                {week.productivity}%
              </div>
            </div>
            <div className="text-[#666666] text-xs font-medium">{week.period}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeamPerformanceChart = () => (
    <div className="space-y-4">
      {analyticsData.teamPerformance.map((member, index) => (
        <div key={member.name} className="neu-small p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="neu-small w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white font-bold text-sm mr-3">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="font-medium text-[#333333]">{member.name}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-[#666666]">{member.completed} tasks</span>
              <span className="font-bold text-[#EF5226]">{member.efficiency}%</span>
            </div>
          </div>
          <div className="neu-card-inset rounded-lg p-1">
            <div 
              className="h-3 rounded-lg transition-all duration-300"
              style={{ 
                width: `${member.efficiency}%`,
                background: `linear-gradient(90deg, ${member.efficiency >= 90 ? '#4CAF50' : member.efficiency >= 80 ? '#EF5226' : '#FFC107'}, ${member.efficiency >= 90 ? '#66BB6A' : member.efficiency >= 80 ? '#FF6B4A' : '#FFD54F'})`
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-[#666666] mt-2">
            <span>Avg time: {member.average} days</span>
            <span>Workload: {member.workload}%</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPriorityDistribution = () => (
    <div className="space-y-4">
      {analyticsData.priorityDistribution.map(priority => (
        <div key={priority.priority} className="neu-small p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: priority.color }}
              ></div>
              <span className="font-medium text-[#333333]">{priority.priority} Priority</span>
            </div>
            <span className="text-sm text-[#666666]">{priority.completed}/{priority.count}</span>
          </div>
          <div className="neu-card-inset rounded-lg p-1">
            <div 
              className="h-3 rounded-lg transition-all duration-300"
              style={{ 
                width: `${(priority.completed / priority.count) * 100}%`,
                backgroundColor: priority.color
              }}
            ></div>
          </div>
          <div className="text-xs text-[#666666] mt-2 text-right">
            {Math.round((priority.completed / priority.count) * 100)}% completed
          </div>
        </div>
      ))}
    </div>
  );

  // Layout: Charts and Export Functionality
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Analytics & Reports</h1>
        <p className="text-[#666666]">Comprehensive task analytics with export capabilities</p>
      </div>

      {/* Controls */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="custom">Custom Range</option>
            </select>

            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="overview">Overview</option>
              <option value="team">Team Performance</option>
              <option value="projects">Project Analysis</option>
              <option value="trends">Trend Analysis</option>
            </select>

            <div className="flex neu-card-inset rounded-xl p-1">
              {[
                { id: 'completion', label: 'Completion', icon: Target },
                { id: 'productivity', label: 'Productivity', icon: TrendingUp },
                { id: 'workload', label: 'Workload', icon: BarChart3 }
              ].map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                      chartType === type.id 
                        ? 'neu-primary text-white shadow-md' 
                        : 'text-[#666666] hover:text-[#EF5226]'
                    }`}
                  >
                    <Icon size={14} className="mr-2" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="neu-button px-4 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
            <button className="neu-button px-4 py-3 rounded-xl flex items-center hover:text-[#05A7CC] transition-colors">
              <Download size={16} className="mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#EF5226] mb-1">{analyticsData.overview.totalTasks}</div>
          <div className="text-[#666666] text-sm">Total Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#4CAF50] mb-1">{analyticsData.overview.completedTasks}</div>
          <div className="text-[#666666] text-sm">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#05A7CC] mb-1">{analyticsData.overview.inProgressTasks}</div>
          <div className="text-[#666666] text-sm">In Progress</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-red-500 mb-1">{analyticsData.overview.overdueTasks}</div>
          <div className="text-[#666666] text-sm">Overdue</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#333333] mb-1">{analyticsData.overview.averageCompletionTime}d</div>
          <div className="text-[#666666] text-sm">Avg Completion</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#EF5226] mb-1">{analyticsData.overview.teamProductivity}%</div>
          <div className="text-[#666666] text-sm">Productivity</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Main Chart */}
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#333333]">
              {chartType === 'completion' ? 'Task Completion Trends' :
               chartType === 'productivity' ? 'Team Productivity' :
               'Workload Distribution'}
            </h2>
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-[#EF5226]" />
              <span className="text-sm text-[#666666]">
                {chartType === 'completion' ? '+8% vs last period' :
                 chartType === 'productivity' ? '+5% vs last period' :
                 'Balanced workload'}
              </span>
            </div>
          </div>
          {chartType === 'completion' && renderCompletionChart()}
          {chartType === 'productivity' && renderProductivityChart()}
          {chartType === 'workload' && renderTeamPerformanceChart()}
        </div>

        {/* Priority/Department Analysis */}
        <div className="neu-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-[#333333] mb-6">Priority Distribution</h2>
          {renderPriorityDistribution()}
        </div>
      </div>

      {/* Department Performance */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-bold text-[#333333] mb-6">Department Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.departmentStats.map(dept => (
            <div key={dept.department} className="neu-small p-4 rounded-xl text-center hover:shadow-md transition-all">
              <div 
                className="neu-small w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: dept.color }}
              >
                <Users size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[#333333] mb-2">{dept.department}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Tasks:</span>
                  <span className="font-medium text-[#333333]">{dept.tasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Completed:</span>
                  <span className="font-medium text-[#4CAF50]">{dept.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Efficiency:</span>
                  <span className="font-bold" style={{ color: dept.color }}>{dept.efficiency}%</span>
                </div>
              </div>
              <div className="neu-card-inset rounded-lg p-1 mt-4">
                <div 
                  className="h-2 rounded-lg transition-all duration-300"
                  style={{ 
                    width: `${dept.efficiency}%`,
                    backgroundColor: dept.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="neu-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#333333]">Report Templates</h2>
          <button className="neu-button px-4 py-2 rounded-xl text-sm hover:text-[#EF5226] transition-colors">
            Create Custom Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTemplates.map(template => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="neu-small p-6 rounded-xl hover:shadow-lg transition-all group cursor-pointer">
                <div 
                  className="neu-small p-3 rounded-xl mb-4 group-hover:shadow-md transition-all"
                  style={{ backgroundColor: template.color }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#333333] mb-2 group-hover:text-[#EF5226] transition-colors">
                  {template.name}
                </h3>
                <p className="text-[#666666] text-sm mb-4">{template.description}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 neu-button py-2 rounded-xl text-sm hover:text-[#05A7CC] transition-colors">
                    <Eye size={12} className="inline mr-1" />
                    Preview
                  </button>
                  <button 
                    className="flex-1 neu-primary py-2 rounded-xl text-sm hover:shadow-lg transition-all"
                    style={{ background: `linear-gradient(145deg, ${template.color}, ${template.color}dd)` }}
                  >
                    <Download size={12} className="inline mr-1" />
                    Generate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Progress Summary */}
      <div className="neu-card p-6 rounded-2xl mt-8">
        <h2 className="text-xl font-bold text-[#333333] mb-6">Project Progress Summary</h2>
        <div className="space-y-4">
          {analyticsData.projectProgress.map(project => (
            <div key={project.project} className="neu-small p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-[#333333]">{project.project}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-[#666666]">{project.completed}/{project.tasks} tasks</span>
                  <span className="font-bold text-[#EF5226]">{project.progress}%</span>
                </div>
              </div>
              <div className="neu-card-inset rounded-lg p-1 mb-3">
                <div 
                  className="h-3 neu-primary rounded-lg transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-[#666666]">
                <span>Budget: ${project.budget.toLocaleString()}</span>
                <span>Spent: ${project.spent.toLocaleString()} ({Math.round((project.spent/project.budget)*100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};