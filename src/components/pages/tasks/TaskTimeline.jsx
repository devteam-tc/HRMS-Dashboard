import React, { useState } from 'react';
import { Calendar, ZoomIn, ZoomOut, Filter, Eye, ChevronLeft, ChevronRight, Download, Settings } from 'lucide-react';

export const TaskTimeline = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [zoomLevel, setZoomLevel] = useState('weeks'); // 'days', 'weeks', 'months'
  const [selectedProject, setSelectedProject] = useState('all');

  const projects = [
    {
      id: 'PROJ-001',
      name: 'E-commerce Platform',
      color: '#EF5226',
      tasks: [
        {
          id: 'TASK-001',
          title: 'User Authentication System',
          assignee: 'John Doe',
          startDate: '2024-03-01',
          endDate: '2024-03-25',
          progress: 65,
          priority: 'high',
          dependencies: ['TASK-002'],
          status: 'in-progress'
        },
        {
          id: 'TASK-002',
          title: 'Database Schema Design',
          assignee: 'Sarah Wilson',
          startDate: '2024-02-15',
          endDate: '2024-03-15',
          progress: 100,
          priority: 'high',
          dependencies: [],
          status: 'done'
        },
        {
          id: 'TASK-003',
          title: 'Payment Gateway Integration',
          assignee: 'Mike Johnson',
          startDate: '2024-03-20',
          endDate: '2024-04-15',
          progress: 0,
          priority: 'high',
          dependencies: ['TASK-001'],
          status: 'todo'
        }
      ]
    },
    {
      id: 'PROJ-002',
      name: 'Mobile App Development',
      color: '#05A7CC',
      tasks: [
        {
          id: 'TASK-004',
          title: 'UI Component Library',
          assignee: 'Emma Brown',
          startDate: '2024-03-05',
          endDate: '2024-03-30',
          progress: 45,
          priority: 'medium',
          dependencies: [],
          status: 'in-progress'
        },
        {
          id: 'TASK-005',
          title: 'API Integration',
          assignee: 'David Lee',
          startDate: '2024-03-25',
          endDate: '2024-04-20',
          progress: 0,
          priority: 'medium',
          dependencies: ['TASK-004'],
          status: 'todo'
        }
      ]
    },
    {
      id: 'PROJ-003',
      name: 'Data Analytics Dashboard',
      color: '#4CAF50',
      tasks: [
        {
          id: 'TASK-006',
          title: 'Data Pipeline Setup',
          assignee: 'Lisa Chen',
          startDate: '2024-03-10',
          endDate: '2024-04-05',
          progress: 30,
          priority: 'low',
          dependencies: [],
          status: 'in-progress'
        },
        {
          id: 'TASK-007',
          title: 'Dashboard UI Development',
          assignee: 'Tom Wilson',
          startDate: '2024-04-01',
          endDate: '2024-05-15',
          progress: 0,
          priority: 'low',
          dependencies: ['TASK-006'],
          status: 'todo'
        }
      ]
    }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getDateRange = () => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const dates = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    
    return dates;
  };

  const getWeekRange = () => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const weeks = [];
    
    let current = new Date(start);
    current.setDate(current.getDate() - current.getDay()); // Start from Sunday
    
    while (current <= end) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      weeks.push({
        start: weekStart,
        end: weekEnd,
        label: `Week ${Math.ceil((weekStart.getDate() + weekStart.getDay()) / 7)}`
      });
      
      current.setDate(current.getDate() + 7);
    }
    
    return weeks;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getTaskPosition = (task) => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const totalDays = getDaysInMonth(currentDate);
    const taskStart = Math.max(1, Math.ceil((startDate - monthStart) / (1000 * 60 * 60 * 24)) + 1);
    const taskEnd = Math.min(totalDays, Math.ceil((endDate - monthStart) / (1000 * 60 * 60 * 24)) + 1);
    
    const left = ((taskStart - 1) / totalDays) * 100;
    const width = ((taskEnd - taskStart + 1) / totalDays) * 100;
    
    return { left, width };
  };

  const getStatusColor = (status) => {
    const colors = {
      'todo': '#E8EBEF',
      'in-progress': '#05A7CC',
      'done': '#4CAF50',
      'overdue': '#EF5226'
    };
    return colors[status] || '#E8EBEF';
  };

  const getPriorityBorder = (priority) => {
    const colors = {
      'high': '#EF5226',
      'medium': '#FFC107',
      'low': '#4CAF50'
    };
    return colors[priority] || '#666666';
  };

  const renderTimelineHeader = () => {
    if (zoomLevel === 'days') {
      const dates = getDateRange();
      return (
        <div className="grid grid-cols-31 gap-1 mb-4">
          {dates.map((date, index) => (
            <div key={index} className="text-center text-xs text-[#666666] p-2">
              <div className="font-medium">{date.getDate()}</div>
              <div className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            </div>
          ))}
        </div>
      );
    } else if (zoomLevel === 'weeks') {
      const weeks = getWeekRange();
      return (
        <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((week, index) => (
            <div key={index} className="text-center text-xs text-[#666666] p-2 neu-small rounded-lg">
              <div className="font-medium">{week.label}</div>
              <div className="text-xs">
                {week.start.getDate()}-{week.end.getDate()}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderTaskBar = (task, projectColor) => {
    const position = getTaskPosition(task);
    const statusColor = getStatusColor(task.status);
    const priorityBorder = getPriorityBorder(task.priority);
    
    return (
      <div className="relative h-12 mb-2">
        <div
          className="absolute top-1 h-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer group border-l-4"
          style={{
            left: `${position.left}%`,
            width: `${position.width}%`,
            backgroundColor: statusColor,
            borderLeftColor: priorityBorder
          }}
          onClick={() => onNavigate('task-details', { taskId: task.id })}
        >
          {/* Progress overlay */}
          <div
            className="h-full rounded-lg opacity-30 transition-all duration-500"
            style={{
              width: `${task.progress}%`,
              backgroundColor: projectColor
            }}
          ></div>
          
          {/* Task content */}
          <div className="absolute inset-0 p-2 flex items-center">
            <span className="text-xs font-medium text-[#333333] truncate group-hover:text-[#EF5226] transition-colors">
              {task.title}
            </span>
          </div>
          
          {/* Tooltip on hover */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <div className="neu-card p-3 rounded-xl shadow-lg min-w-48">
              <div className="text-sm font-medium text-[#333333] mb-1">{task.title}</div>
              <div className="text-xs text-[#666666] space-y-1">
                <div>Assignee: {task.assignee}</div>
                <div>Progress: {task.progress}%</div>
                <div>Priority: {task.priority}</div>
                <div>{task.startDate} - {task.endDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredProjects = selectedProject === 'all' 
    ? projects 
    : projects.filter(p => p.id === selectedProject);

  // Layout: Interactive Gantt View
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Timeline (Gantt Chart)</h1>
        <p className="text-[#666666]">Interactive timeline view with project scheduling and dependencies</p>
      </div>

      {/* Controls */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Date Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="neu-small px-6 py-3 rounded-xl min-w-48 text-center">
                <span className="font-bold text-[#333333]">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Project Filter */}
            <select 
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="all">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>

            {/* Zoom Controls */}
            <div className="flex neu-card-inset rounded-xl p-1">
              {['days', 'weeks', 'months'].map(level => (
                <button
                  key={level}
                  onClick={() => setZoomLevel(level)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    zoomLevel === level 
                      ? 'neu-primary text-white shadow-md' 
                      : 'text-[#666666] hover:text-[#EF5226]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="neu-button px-4 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            <button className="neu-button px-4 py-3 rounded-xl flex items-center hover:text-[#05A7CC] transition-colors">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button 
              onClick={() => onNavigate('task-analytics')}
              className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
            >
              <Eye size={16} className="mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="neu-card rounded-2xl p-6">
        {/* Timeline Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#333333] mb-4">Project Timeline</h2>
          {renderTimelineHeader()}
        </div>

        {/* Projects and Tasks */}
        <div className="space-y-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="neu-small rounded-2xl p-6">
              {/* Project Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <h3 className="text-lg font-bold text-[#333333]">{project.name}</h3>
                  <span className="ml-3 px-3 py-1 bg-[#E8EBEF] text-[#666666] rounded-full text-sm">
                    {project.tasks.length} tasks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#666666]">
                    {Math.round(project.tasks.reduce((sum, t) => sum + t.progress, 0) / project.tasks.length)}% complete
                  </span>
                  <button className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors">
                    <Settings size={16} />
                  </button>
                </div>
              </div>

              {/* Task Rows */}
              <div className="space-y-1">
                {project.tasks.map(task => (
                  <div key={task.id} className="flex items-center">
                    {/* Task Info */}
                    <div className="w-64 pr-4 flex-shrink-0">
                      <div className="neu-card-inset p-3 rounded-xl">
                        <div className="font-medium text-[#333333] text-sm mb-1">{task.title}</div>
                        <div className="text-xs text-[#666666] mb-2">{task.assignee}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            task.status === 'done' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className="text-[#666666]">{task.progress}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Bar */}
                    <div className="flex-1 relative">
                      {renderTaskBar(task, project.color)}
                      
                      {/* Dependencies */}
                      {task.dependencies.length > 0 && (
                        <div className="absolute -top-2 left-0 right-0 h-1">
                          <div className="h-0.5 bg-[#EF5226] opacity-50 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Legend */}
        <div className="mt-8 pt-6 border-t border-[#E8EBEF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#E8EBEF] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">Not Started</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#05A7CC] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">In Progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#4CAF50] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#EF5226] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">Overdue</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-2 bg-[#EF5226] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">High Priority</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-2 bg-[#FFC107] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">Medium Priority</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-2 bg-[#4CAF50] rounded mr-2"></div>
                <span className="text-sm text-[#666666]">Low Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#EF5226] mb-1">
            {filteredProjects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'in-progress').length, 0)}
          </div>
          <div className="text-[#666666] text-sm">Active Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#4CAF50] mb-1">
            {filteredProjects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0)}
          </div>
          <div className="text-[#666666] text-sm">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#05A7CC] mb-1">
            {filteredProjects.reduce((sum, p) => sum + p.tasks.filter(t => new Date(t.endDate) < new Date() && t.status !== 'done').length, 0)}
          </div>
          <div className="text-[#666666] text-sm">Overdue</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#333333] mb-1">
            {Math.round(filteredProjects.reduce((sum, p) => sum + p.tasks.reduce((tSum, t) => tSum + t.progress, 0) / p.tasks.length, 0) / filteredProjects.length)}%
          </div>
          <div className="text-[#666666] text-sm">Avg Progress</div>
        </div>
      </div>
    </div>
  );
};