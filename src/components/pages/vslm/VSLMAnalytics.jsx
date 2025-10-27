import React, { useState } from 'react';
import { TrendingUp, Calendar, Users, MapPin, Download, Filter, BarChart3, PieChart, LineChart, AlertTriangle } from 'lucide-react';
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

const projectStatusData = [
  { name: 'Ongoing', value: 3, color: '#05A7CC' },
  { name: 'Completed', value: 2, color: '#4CAF50' },
  { name: 'On Hold', value: 1, color: '#FFC107' }
];

const monthlyProgressData = [
  { month: 'Jan', completed: 12, delayed: 2, onTime: 15 },
  { month: 'Feb', completed: 18, delayed: 1, onTime: 12 },
  { month: 'Mar', completed: 15, delayed: 3, onTime: 18 },
  { month: 'Apr', completed: 22, delayed: 1, onTime: 16 },
  { month: 'May', completed: 19, delayed: 2, onTime: 20 },
  { month: 'Jun', completed: 25, delayed: 1, onTime: 14 }
];

const siteVisitsData = [
  { month: 'Jan', visits: 24, inspections: 8, safety: 4 },
  { month: 'Feb', visits: 28, inspections: 10, safety: 6 },
  { month: 'Mar', visits: 22, inspections: 7, safety: 3 },
  { month: 'Apr', visits: 31, inspections: 12, safety: 5 },
  { month: 'May', visits: 26, inspections: 9, safety: 4 },
  { month: 'Jun', visits: 29, inspections: 11, safety: 6 }
];

const budgetData = [
  { project: 'Downtown Office', planned: 2500000, actual: 1875000, completion: 75 },
  { project: 'Residential Tower', planned: 4200000, actual: 4200000, completion: 100 },
  { project: 'Shopping Mall', planned: 1800000, actual: 630000, completion: 35 },
  { project: 'Industrial Warehouse', planned: 3100000, actual: 1860000, completion: 60 },
  { project: 'Medical Center', planned: 5600000, actual: 2520000, completion: 45 },
  { project: 'University Library', planned: 2800000, actual: 2800000, completion: 100 }
];

const qualityMetrics = [
  { metric: 'Safety Compliance', current: 96, target: 95, trend: 'up' },
  { metric: 'Quality Score', current: 92, target: 90, trend: 'up' },
  { metric: 'On-Time Delivery', current: 87, target: 85, trend: 'stable' },
  { metric: 'Budget Adherence', current: 94, target: 90, trend: 'up' }
];

export const VSLMAnalytics = ({ onNavigate }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last-6-months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const totalProjects = projectStatusData.reduce((sum, item) => sum + item.value, 0);
  const totalBudget = budgetData.reduce((sum, project) => sum + project.planned, 0);
  const totalSpent = budgetData.reduce((sum, project) => sum + project.actual, 0);
  const totalVisits = siteVisitsData.reduce((sum, month) => sum + month.visits, 0);

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">VSLM Analytics Dashboard</h1>
            <p className="text-[#666666]">Visual insights and analytics for site and location management</p>
          </div>
          <div className="flex space-x-4">
            <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Report</span>
            </button>
            <button 
              onClick={() => onNavigate('project-reports')}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Detailed Reports</span>
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
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-transparent outline-none text-[#333333]"
            >
              <option value="all">All Metrics</option>
              <option value="progress">Progress</option>
              <option value="budget">Budget</option>
              <option value="quality">Quality</option>
              <option value="safety">Safety</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <TrendingUp className="h-6 w-6 text-[#05A7CC]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">{totalProjects}</div>
              <div className="text-sm text-[#4CAF50] font-medium">2 completed this month</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Total Projects</h3>
            <div className="text-xs text-[#666666]">3 Active • 2 Completed • 1 On Hold</div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <MapPin className="h-6 w-6 text-[#4CAF50]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">{totalVisits}</div>
              <div className="text-sm text-[#05A7CC] font-medium">+15% vs last period</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Site Visits</h3>
            <div className="text-xs text-[#666666]">Average: {Math.round(totalVisits / 6)} per month</div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <BarChart3 className="h-6 w-6 text-[#9C27B0]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">${(totalSpent / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-[#666666] font-medium">of ${(totalBudget / 1000000).toFixed(1)}M total</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Budget Utilized</h3>
            <div className="text-xs text-[#666666]">{Math.round((totalSpent / totalBudget) * 100)}% of total budget</div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="neu-small p-3 rounded-2xl">
              <Users className="h-6 w-6 text-[#FF9800]" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#333333]">94%</div>
              <div className="text-sm text-[#4CAF50] font-medium">+2% vs last month</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#333333] mb-1">Quality Score</h3>
            <div className="text-xs text-[#666666]">Target: 90%</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Status Distribution */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Project Status Distribution</h3>
            <p className="text-[#666666]">Current status of all projects</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
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
                  formatter={(value) => [`${value} projects`, 'Count']} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {projectStatusData.map((item, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="text-sm font-medium text-[#333333]">{item.name}</div>
                  <div className="text-xs text-[#666666]">{item.value} projects</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Progress Trends */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Monthly Progress Trends</h3>
            <p className="text-[#666666]">Project completion and delay trends</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyProgressData}>
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
                  dataKey="completed" 
                  stackId="1" 
                  stroke="#4CAF50" 
                  fill="#4CAF50" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="onTime" 
                  stackId="1" 
                  stroke="#05A7CC" 
                  fill="#05A7CC" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="delayed" 
                  stackId="1" 
                  stroke="#EF5226" 
                  fill="#EF5226" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Visits Analysis */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Site Visits Analysis</h3>
            <p className="text-[#666666]">Monthly site visits by type</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={siteVisitsData}>
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
                <Bar dataKey="visits" fill="#05A7CC" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inspections" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                <Bar dataKey="safety" fill="#FF9800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget vs Actual */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Budget Performance</h3>
            <p className="text-[#666666]">Planned vs actual spending by project</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
                <XAxis dataKey="project" stroke="#666666" angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                  formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, 'Amount']} 
                />
                <Line 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#05A7CC" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Planned"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#4CAF50" 
                  strokeWidth={3}
                  name="Actual"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Quality & Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityMetrics.map((metric, index) => (
            <div key={index} className="neu-small p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-[#333333]">{metric.metric}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  metric.trend === 'up' ? 'bg-[#4CAF50]' :
                  metric.trend === 'down' ? 'bg-[#EF5226]' : 'bg-[#FFC107]'
                }`}></div>
              </div>
              <div className="text-3xl font-bold text-[#333333] mb-2">{metric.current}%</div>
              <div className="text-sm text-[#666666] mb-4">Target: {metric.target}%</div>
              <div className="neu-card-inset rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    metric.current >= metric.target ? 'bg-gradient-to-r from-[#4CAF50] to-[#45a049]' : 'bg-gradient-to-r from-[#FFC107] to-[#e6ac00]'
                  }`}
                  style={{ width: `${metric.current}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Summary Table */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Project Summary</h3>
        
        <div className="space-y-4">
          <div className="neu-small p-4 rounded-2xl">
            <div className="grid grid-cols-6 gap-4 font-medium text-[#666666] text-sm">
              <div>Project</div>
              <div>Budget</div>
              <div>Spent</div>
              <div>Completion</div>
              <div>Status</div>
              <div>Performance</div>
            </div>
          </div>

          {budgetData.map((project, index) => (
            <div key={index} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="font-medium text-[#333333]">{project.project}</div>
                <div className="text-[#333333]">${(project.planned / 1000000).toFixed(1)}M</div>
                <div className="text-[#333333]">${(project.actual / 1000000).toFixed(1)}M</div>
                <div className="text-[#333333]">{project.completion}%</div>
                <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${
                  project.completion === 100 ? 'bg-[#4CAF50] text-white' :
                  project.completion >= 50 ? 'bg-[#05A7CC] text-white' :
                  project.completion >= 25 ? 'bg-[#FFC107] text-white' : 'bg-[#666666] text-white'
                }`}>
                  {project.completion === 100 ? 'COMPLETED' :
                   project.completion >= 50 ? 'ON TRACK' :
                   project.completion >= 25 ? 'AT RISK' : 'DELAYED'}
                </div>
                <div className="flex items-center space-x-2">
                  {project.actual <= project.planned * (project.completion / 100) ? (
                    <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-[#EF5226] rounded-full"></div>
                  )}
                  <span className="text-sm text-[#666666]">
                    {project.actual <= project.planned * (project.completion / 100) ? 'On Budget' : 'Over Budget'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights and Alerts */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Key Insights & Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-3 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
              <span>Positive Trends</span>
            </h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Site visits increased by 15% this quarter</li>
              <li>• Quality scores consistently above target</li>
              <li>• 2 projects completed ahead of schedule</li>
              <li>• Budget adherence improved by 5%</li>
            </ul>
          </div>
          
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#EF5226]" />
              <span>Areas for Attention</span>
            </h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Shopping Mall project behind schedule (35% completion)</li>
              <li>• Weather delays affecting outdoor projects</li>
              <li>• Material costs 8% higher than projected</li>
              <li>• 3 safety inspections pending this month</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};