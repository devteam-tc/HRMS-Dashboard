import React, { useState } from 'react';
import { Download, Filter, Calendar, BarChart3, PieChart, TrendingUp, Users, Clock, FileText, Eye, Settings } from 'lucide-react';

export const AttendanceReports = ({ onNavigate }) => {
  const [reportType, setReportType] = useState('monthly');
  const [department, setDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('this-month');
  const [activeView, setActiveView] = useState('templates');

  const reportTemplates = [
    {
      id: 'monthly-summary',
      name: 'Monthly Attendance Summary',
      description: 'Comprehensive monthly attendance report with department breakdown',
      type: 'summary',
      frequency: 'Monthly',
      lastGenerated: '2024-03-01',
      icon: BarChart3,
      color: '#EF5226'
    },
    {
      id: 'absenteeism-analysis',
      name: 'Absenteeism Analysis Report',
      description: 'Detailed analysis of absence patterns and trends',
      type: 'analytics',
      frequency: 'Weekly',
      lastGenerated: '2024-03-14',
      icon: TrendingUp,
      color: '#05A7CC'
    },
    {
      id: 'overtime-report',
      name: 'Overtime Hours Report',
      description: 'Employee overtime tracking and cost analysis',
      type: 'financial',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-03-10',
      icon: Clock,
      color: '#4CAF50'
    },
    {
      id: 'leave-utilization',
      name: 'Leave Utilization Report',
      description: 'Employee leave balance and utilization statistics',
      type: 'leave',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-01',
      icon: Calendar,
      color: '#9C27B0'
    },
    {
      id: 'compliance-report',
      name: 'Labor Law Compliance Report',
      description: 'Ensure compliance with working hour regulations',
      type: 'compliance',
      frequency: 'Monthly',
      lastGenerated: '2024-03-01',
      icon: FileText,
      color: '#FFC107'
    },
    {
      id: 'tardiness-report',
      name: 'Tardiness & Punctuality Report',
      description: 'Analysis of late arrivals and early departures',
      type: 'behavior',
      frequency: 'Weekly',
      lastGenerated: '2024-03-14',
      icon: Users,
      color: '#F44336'
    }
  ];

  const analyticsData = {
    departmentPerformance: [
      { department: 'IT', attendance: 92, trend: '+2.1%', employees: 45, efficiency: 88 },
      { department: 'HR', attendance: 89, trend: '+1.8%', employees: 15, efficiency: 91 },
      { department: 'Finance', attendance: 95, trend: '+0.5%', employees: 20, efficiency: 94 },
      { department: 'Marketing', attendance: 87, trend: '-1.2%', employees: 30, efficiency: 85 },
      { department: 'Operations', attendance: 91, trend: '+3.2%', employees: 40, efficiency: 89 }
    ],
    kpiMetrics: [
      { label: 'Overall Attendance', value: '91.2%', change: '+2.8%', color: '#EF5226' },
      { label: 'Average Working Hours', value: '8.4h', change: '+0.3h', color: '#05A7CC' },
      { label: 'Overtime Cost', value: '$18,384', change: '+12%', color: '#4CAF50' },
      { label: 'Leave Utilization', value: '73%', change: '-5%', color: '#9C27B0' }
    ],
    topPerformers: [
      { name: 'Sarah Wilson', attendance: 98.5, department: 'HR', streak: 45 },
      { name: 'Mike Johnson', attendance: 97.2, department: 'Support', streak: 38 },
      { name: 'Emma Brown', attendance: 96.8, department: 'Development', streak: 32 },
      { name: 'David Lee', attendance: 96.5, department: 'Operations', streak: 28 },
      { name: 'Lisa Chen', attendance: 95.9, department: 'Design', streak: 25 }
    ]
  };

  const chartData = [
    { month: 'Oct', attendance: 88.5, target: 90 },
    { month: 'Nov', attendance: 89.2, target: 90 },
    { month: 'Dec', attendance: 91.0, target: 90 },
    { month: 'Jan', attendance: 87.8, target: 90 },
    { month: 'Feb', attendance: 90.3, target: 90 },
    { month: 'Mar', attendance: 91.7, target: 90 }
  ];

  const getDepartmentColor = (department) => {
    const colors = {
      'IT': '#EF5226',
      'HR': '#05A7CC',
      'Finance': '#4CAF50',
      'Marketing': '#FFC107',
      'Operations': '#9C27B0'
    };
    return colors[department] || '#666666';
  };

  const renderTemplatesView = () => (
    <div className="space-y-8">
      {/* Report Generation Form */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-6">Generate Custom Report</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
          >
            <option value="monthly">Monthly Summary</option>
            <option value="weekly">Weekly Analysis</option>
            <option value="quarterly">Quarterly Report</option>
            <option value="annual">Annual Review</option>
            <option value="custom">Custom Report</option>
          </select>

          <select 
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
          >
            <option value="all">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>

          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="this-year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>

          <button className="neu-primary px-6 py-3 rounded-xl flex items-center justify-center hover:shadow-xl transition-all">
            <Download size={16} className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <div 
              key={template.id} 
              className="neu-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="neu-small p-3 rounded-xl group-hover:shadow-lg transition-all"
                  style={{ backgroundColor: template.color }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium`}
                      style={{ 
                        backgroundColor: `${template.color}20`, 
                        color: template.color 
                      }}>
                  {template.type}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#333333] mb-2 group-hover:text-[#EF5226] transition-colors">
                {template.name}
              </h3>
              <p className="text-[#666666] text-sm mb-4">{template.description}</p>

              <div className="space-y-3 mb-6">
                <div className="neu-small p-3 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666] text-sm">Frequency</span>
                    <span className="font-medium text-[#333333]">{template.frequency}</span>
                  </div>
                </div>
                <div className="neu-small p-3 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666] text-sm">Last Generated</span>
                    <span className="font-medium text-[#333333]">{template.lastGenerated}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 neu-button py-2 rounded-xl flex items-center justify-center hover:text-[#EF5226] transition-colors">
                  <Eye size={14} className="mr-2" />
                  Preview
                </button>
                <button 
                  className="flex-1 neu-primary py-2 rounded-xl flex items-center justify-center hover:shadow-lg transition-all"
                  style={{ background: `linear-gradient(145deg, ${template.color}, ${template.color}dd)` }}
                >
                  <Download size={14} className="mr-2" />
                  Generate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAnalyticsView = () => (
    <div className="space-y-8">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsData.kpiMetrics.map((kpi, index) => (
          <div key={index} className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: kpi.color }}>
              {kpi.value}
            </div>
            <div className="text-[#666666] text-sm mb-2">{kpi.label}</div>
            <div className={`text-xs font-medium ${
              kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Trend Chart */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-6">6-Month Attendance Trend</h3>
          <div className="h-64 neu-card-inset rounded-xl p-4">
            <div className="h-full flex items-end justify-between space-x-2">
              {chartData.map((month, index) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center mb-2">
                    <div 
                      className="w-full rounded-t-lg transition-all duration-500 hover:shadow-md"
                      style={{ 
                        height: `${(month.attendance / 100) * 200}px`,
                        background: month.attendance >= month.target 
                          ? 'linear-gradient(to top, #EF5226, #d4471f)' 
                          : 'linear-gradient(to top, #05A7CC, #048ba8)'
                      }}
                    ></div>
                    <div className="text-xs font-medium mt-2" style={{
                      color: month.attendance >= month.target ? '#EF5226' : '#05A7CC'
                    }}>
                      {month.attendance}%
                    </div>
                  </div>
                  <div className="text-[#666666] text-xs font-medium">{month.month}</div>
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

        {/* Department Performance */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-6">Department Performance</h3>
          <div className="space-y-4">
            {analyticsData.departmentPerformance.map((dept, index) => (
              <div key={dept.department} className="neu-small p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: getDepartmentColor(dept.department) }}
                    ></div>
                    <span className="font-medium text-[#333333]">{dept.department}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold" style={{ color: getDepartmentColor(dept.department) }}>
                      {dept.attendance}%
                    </span>
                    <span className={`text-xs font-medium ${
                      dept.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {dept.trend}
                    </span>
                  </div>
                </div>
                <div className="neu-card-inset rounded-lg p-1">
                  <div 
                    className="h-3 rounded-lg transition-all duration-300"
                    style={{ 
                      width: `${dept.attendance}%`,
                      backgroundColor: getDepartmentColor(dept.department)
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-[#666666] mt-2">
                  <span>{dept.employees} employees</span>
                  <span>Efficiency: {dept.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-6">Top Performers - Attendance</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {analyticsData.topPerformers.map((performer, index) => (
            <div key={performer.name} className="neu-small p-4 rounded-xl text-center hover:shadow-lg transition-all group">
              <div className="neu-small w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white font-bold group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <div className="font-semibold text-[#333333] mb-1 group-hover:text-[#EF5226] transition-colors">
                {performer.name}
              </div>
              <div className="text-[#666666] text-sm mb-2">{performer.department}</div>
              <div className="text-lg font-bold text-[#EF5226] mb-1">{performer.attendance}%</div>
              <div className="text-xs text-[#666666]">{performer.streak} day streak</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Layout: Chart-heavy Report Page
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Reports & Analytics</h1>
        <p className="text-[#666666]">Generate comprehensive reports and analyze attendance patterns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333]">15</h3>
              <p className="text-[#666666] text-sm">Generated Reports</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#EF5226] to-[#d4471f]">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600">91.2%</h3>
              <p className="text-[#666666] text-sm">Avg Attendance</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#05A7CC]">8.8%</h3>
              <p className="text-[#666666] text-sm">Absenteeism Rate</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#05A7CC] to-[#048ba8]">
              <BarChart3 size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333333]">156h</h3>
              <p className="text-[#666666] text-sm">Total Overtime</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="neu-card rounded-2xl p-6 mb-8">
        <div className="flex space-x-1 neu-card-inset rounded-xl p-1">
          {[
            { id: 'templates', label: 'Report Templates', icon: FileText },
            { id: 'analytics', label: 'Live Analytics', icon: BarChart3 }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-all duration-200 ${
                  activeView === view.id
                    ? 'neu-primary text-white shadow-lg'
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {view.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Content */}
      <div className="neu-card rounded-2xl p-8">
        {activeView === 'templates' && renderTemplatesView()}
        {activeView === 'analytics' && renderAnalyticsView()}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4 mt-8">
        <button 
          onClick={() => onNavigate('attendance-dashboard')}
          className="neu-button px-8 py-3 rounded-xl hover:text-[#666666] transition-colors"
        >
          Back to Dashboard
        </button>
        <button className="neu-primary px-8 py-3 rounded-xl hover:shadow-xl transition-all">
          Schedule Auto-Report
        </button>
        <button className="neu-secondary px-8 py-3 rounded-xl hover:shadow-xl transition-all">
          Export All Data
        </button>
      </div>
    </div>
  );
};