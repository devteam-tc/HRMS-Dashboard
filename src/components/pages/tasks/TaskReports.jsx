import React, { useState } from 'react';
import { Download, Filter, FileText, Calendar, BarChart3, Users, TrendingUp, CheckCircle } from 'lucide-react';

const reportTemplates = [
  {
    id: '1',
    name: 'Task Progress Report',
    description: 'Comprehensive overview of task completion status and progress across all projects',
    type: 'progress',
    format: ['PDF', 'Excel'],
    frequency: 'Weekly',
    lastGenerated: '2024-01-18',
    size: '1.2 MB'
  },
  {
    id: '2',
    name: 'Team Productivity Report',
    description: 'Individual and team performance metrics including task completion rates',
    type: 'productivity',
    format: ['PDF', 'Excel'],
    frequency: 'Monthly',
    lastGenerated: '2024-01-15',
    size: '2.8 MB'
  },
  {
    id: '3',
    name: 'Project Timeline Report',
    description: 'Gantt chart view and timeline analysis for project planning and tracking',
    type: 'timeline',
    format: ['PDF', 'PowerPoint'],
    frequency: 'Bi-weekly',
    lastGenerated: '2024-01-16',
    size: '3.5 MB'
  },
  {
    id: '4',
    name: 'Overdue Tasks Report',
    description: 'Analysis of delayed tasks with reasons and corrective action recommendations',
    type: 'overdue',
    format: ['PDF', 'Excel'],
    frequency: 'Weekly',
    lastGenerated: '2024-01-17',
    size: '0.9 MB'
  },
  {
    id: '5',
    name: 'Priority Analysis Report',
    description: 'Task distribution by priority levels and resource allocation insights',
    type: 'priority',
    format: ['Excel', 'PDF'],
    frequency: 'Monthly',
    lastGenerated: '2024-01-12',
    size: '1.7 MB'
  },
  {
    id: '6',
    name: 'Executive Summary Dashboard',
    description: 'High-level overview for executives with key metrics and KPIs visualization',
    type: 'executive',
    format: ['PDF', 'PowerPoint'],
    frequency: 'Monthly',
    lastGenerated: '2024-01-14',
    size: '4.2 MB'
  }
];

const projects = [
  'All Projects',
  'Website Redesign',
  'Mobile App Development',
  'Marketing Campaign Q1',
  'Database Migration',
  'Employee Training Platform',
  'Security Audit'
];

export const TaskReports = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState('last-month');
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(null);

  const filteredReports = reportTemplates.filter(report => {
    return selectedReportType === 'all' || report.type === selectedReportType;
  });

  const getReportIcon = (type) => {
    switch (type) {
      case 'progress':
        return <TrendingUp className="w-6 h-6 text-[#05A7CC]" />;
      case 'productivity':
        return <Users className="w-6 h-6 text-[#4CAF50]" />;
      case 'timeline':
        return <Calendar className="w-6 h-6 text-[#9C27B0]" />;
      case 'overdue':
        return <CheckCircle className="w-6 h-6 text-[#EF5226]" />;
      case 'priority':
        return <BarChart3 className="w-6 h-6 text-[#FF9800]" />;
      case 'executive':
        return <FileText className="w-6 h-6 text-[#607D8B]" />;
      default:
        return <FileText className="w-6 h-6 text-[#666666]" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'progress':
        return 'bg-[#05A7CC] text-white';
      case 'productivity':
        return 'bg-[#4CAF50] text-white';
      case 'timeline':
        return 'bg-[#9C27B0] text-white';
      case 'overdue':
        return 'bg-[#EF5226] text-white';
      case 'priority':
        return 'bg-[#FF9800] text-white';
      case 'executive':
        return 'bg-[#607D8B] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const handleGenerateReport = async (reportId) => {
    setIsGenerating(true);
    setGeneratingReport(reportId);

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsGenerating(false);
    setGeneratingReport(null);
    
    // Simulate download
    console.log(`Generated report ${reportId} for ${selectedProject} in ${selectedFormat} format`);
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Reports</h1>
            <p className="text-[#666666]">Generate comprehensive reports and analytics for task management</p>
          </div>
          <button 
            onClick={() => onNavigate('task-analytics')}
            className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Project Selection */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Select Project</label>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                {projects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Date Range</label>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {/* Report Type Filter */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Report Type</label>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Types</option>
                <option value="progress">Progress</option>
                <option value="productivity">Productivity</option>
                <option value="timeline">Timeline</option>
                <option value="overdue">Overdue</option>
                <option value="priority">Priority</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Export Format</label>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="PowerPoint">PowerPoint</option>
                <option value="Word">Word</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Available Reports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="neu-small p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
              {/* Report Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="neu-card-inset p-3 rounded-2xl">
                  {getReportIcon(report.type)}
                </div>
                <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getTypeColor(report.type)}`}>
                  {report.type.toUpperCase()}
                </div>
              </div>

              {/* Report Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-lg font-bold text-[#333333] mb-2">{report.name}</h4>
                  <p className="text-sm text-[#666666] leading-relaxed">{report.description}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Frequency:</span>
                    <span className="font-medium text-[#333333]">{report.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Last Generated:</span>
                    <span className="font-medium text-[#333333]">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">File Size:</span>
                    <span className="font-medium text-[#333333]">{report.size}</span>
                  </div>
                </div>

                {/* Supported Formats */}
                <div>
                  <div className="text-sm text-[#666666] mb-2">Available formats:</div>
                  <div className="flex flex-wrap gap-2">
                    {report.format.map((format, index) => (
                      <div key={index} className="neu-card-inset px-2 py-1 rounded-lg">
                        <span className="text-xs font-medium text-[#05A7CC]">{format}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button 
                  onClick={() => handleGenerateReport(report.id)}
                  disabled={isGenerating}
                  className={`w-full p-3 rounded-2xl flex items-center justify-center space-x-2 transition-all ${
                    generatingReport === report.id
                      ? 'neu-card-inset text-[#05A7CC]'
                      : isGenerating
                      ? 'neu-button text-[#999999] cursor-not-allowed'
                      : 'neu-primary hover:scale-105'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">
                    {generatingReport === report.id ? 'Generating...' : 'Generate Report'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Recent Reports</h3>
        
        <div className="space-y-4">
          <div className="neu-small p-4 rounded-2xl">
            <div className="grid grid-cols-6 gap-4 font-medium text-[#666666] text-sm">
              <div>Report Name</div>
              <div>Project</div>
              <div>Type</div>
              <div>Generated</div>
              <div>Size</div>
              <div>Actions</div>
            </div>
          </div>

          {reportTemplates.slice(0, 5).map((report, index) => (
            <div key={index} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <div className="neu-card-inset p-2 rounded-lg">
                    {getReportIcon(report.type)}
                  </div>
                  <span className="font-medium text-[#333333]">{report.name}</span>
                </div>
                
                <div className="text-[#333333]">{selectedProject}</div>
                
                <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getTypeColor(report.type)} inline-block`}>
                  {report.type.toUpperCase()}
                </div>
                
                <div className="text-[#666666]">
                  {new Date(report.lastGenerated).toLocaleDateString()}
                </div>
                
                <div className="text-[#333333] font-medium">{report.size}</div>
                
                <div className="flex items-center space-x-2">
                  <button className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Custom Report Builder</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[#333333] font-medium mb-3">Report Name</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="text"
                  placeholder="Enter custom report name"
                  className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#333333] font-medium mb-3">Include Sections</label>
              <div className="space-y-3">
                {[
                  'Task Overview',
                  'Progress Summary',
                  'Team Performance',
                  'Timeline Analysis',
                  'Priority Breakdown',
                  'Overdue Tasks',
                  'Completion Trends',
                  'Resource Allocation'
                ].map((section) => (
                  <label key={section} className="flex items-center space-x-3 cursor-pointer">
                    <div className="neu-input p-1 rounded-lg">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-4 h-4 neu-card-inset rounded"></div>
                    </div>
                    <span className="text-[#333333]">{section}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[#333333] font-medium mb-3">Chart Types</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Progress Chart', icon: TrendingUp },
                  { name: 'Team Productivity', icon: Users },
                  { name: 'Timeline Gantt', icon: Calendar },
                  { name: 'Priority Distribution', icon: BarChart3 }
                ].map((chart) => {
                  const Icon = chart.icon;
                  return (
                    <button key={chart.name} className="neu-button p-4 rounded-2xl text-center hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 mx-auto mb-2 text-[#05A7CC]" />
                      <span className="text-sm text-[#333333]">{chart.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button className="w-full neu-primary p-4 rounded-2xl flex items-center justify-center space-x-3 hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Build Custom Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Scheduled Reports</h3>
        <p className="text-[#666666] mb-6">Set up automatic report generation and delivery</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neu-small p-6 rounded-2xl text-center">
            <Calendar className="w-12 h-12 text-[#05A7CC] mx-auto mb-4" />
            <h4 className="font-bold text-[#333333] mb-2">Weekly Progress</h4>
            <p className="text-sm text-[#666666] mb-4">Every Monday at 9:00 AM</p>
            <button className="neu-button px-4 py-2 rounded-xl text-[#05A7CC]">Configure</button>
          </div>
          
          <div className="neu-small p-6 rounded-2xl text-center">
            <Users className="w-12 h-12 text-[#4CAF50] mx-auto mb-4" />
            <h4 className="font-bold text-[#333333] mb-2">Team Performance</h4>
            <p className="text-sm text-[#666666] mb-4">First day of each month</p>
            <button className="neu-button px-4 py-2 rounded-xl text-[#4CAF50]">Configure</button>
          </div>
          
          <div className="neu-small p-6 rounded-2xl text-center">
            <FileText className="w-12 h-12 text-[#9C27B0] mx-auto mb-4" />
            <h4 className="font-bold text-[#333333] mb-2">Executive Summary</h4>
            <p className="text-sm text-[#666666] mb-4">Last Friday of each month</p>
            <button className="neu-button px-4 py-2 rounded-xl text-[#9C27B0]">Configure</button>
          </div>
        </div>
      </div>
    </div>
  );
};