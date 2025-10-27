import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertTriangle, Play, Pause, ZoomIn, ZoomOut } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    title: 'Project Initiation',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    duration: 7,
    status: 'completed',
    progress: 100,
    phase: 'planning',
    tasks: [
      { name: 'Site Survey', status: 'completed', duration: 2 },
      { name: 'Permits Application', status: 'completed', duration: 5 }
    ]
  },
  {
    id: 2,
    title: 'Foundation Work',
    startDate: '2024-01-23',
    endDate: '2024-02-15',
    duration: 23,
    status: 'completed',
    progress: 100,
    phase: 'foundation',
    tasks: [
      { name: 'Excavation', status: 'completed', duration: 5 },
      { name: 'Foundation Pour', status: 'completed', duration: 10 },
      { name: 'Curing & Testing', status: 'completed', duration: 8 }
    ]
  },
  {
    id: 3,
    title: 'Structural Framework',
    startDate: '2024-02-16',
    endDate: '2024-03-30',
    duration: 43,
    status: 'completed',
    progress: 100,
    phase: 'structural',
    tasks: [
      { name: 'Steel Framework', status: 'completed', duration: 25 },
      { name: 'Concrete Slabs', status: 'completed', duration: 18 }
    ]
  },
  {
    id: 4,
    title: 'Exterior Cladding',
    startDate: '2024-03-31',
    endDate: '2024-05-15',
    duration: 45,
    status: 'in-progress',
    progress: 80,
    phase: 'exterior',
    tasks: [
      { name: 'Curtain Wall Installation', status: 'completed', duration: 20 },
      { name: 'Exterior Finishes', status: 'in-progress', duration: 25 }
    ]
  },
  {
    id: 5,
    title: 'Interior Fit-out',
    startDate: '2024-05-16',
    endDate: '2024-06-15',
    duration: 30,
    status: 'pending',
    progress: 0,
    phase: 'interior',
    tasks: [
      { name: 'MEP Installation', status: 'pending', duration: 15 },
      { name: 'Interior Finishes', status: 'pending', duration: 15 }
    ]
  },
  {
    id: 6,
    title: 'Final Inspection',
    startDate: '2024-06-16',
    endDate: '2024-06-30',
    duration: 14,
    status: 'pending',
    progress: 0,
    phase: 'completion',
    tasks: [
      { name: 'Quality Inspection', status: 'pending', duration: 7 },
      { name: 'Final Handover', status: 'pending', duration: 7 }
    ]
  }
];

const milestones = [
  { date: '2024-01-15', title: 'Project Start', type: 'start' },
  { date: '2024-02-15', title: 'Foundation Complete', type: 'milestone' },
  { date: '2024-03-30', title: 'Structure Complete', type: 'milestone' },
  { date: '2024-05-15', title: 'Exterior Complete', type: 'milestone' },
  { date: '2024-06-30', title: 'Project Completion', type: 'end' }
];

export const ProjectTimeline = ({ projectId, onNavigate }) => {
  const [viewMode, setViewMode] = useState('gantt'); // 'gantt', 'timeline', 'calendar'
  const [zoomLevel, setZoomLevel] = useState('month'); // 'week', 'month', 'quarter'
  const [selectedPhase, setSelectedPhase] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4CAF50]';
      case 'in-progress':
        return 'bg-[#05A7CC]';
      case 'pending':
        return 'bg-[#666666]';
      case 'delayed':
        return 'bg-[#EF5226]';
      default:
        return 'bg-[#666666]';
    }
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'planning':
        return 'bg-[#9C27B0]';
      case 'foundation':
        return 'bg-[#795548]';
      case 'structural':
        return 'bg-[#05A7CC]';
      case 'exterior':
        return 'bg-[#4CAF50]';
      case 'interior':
        return 'bg-[#FF9800]';
      case 'completion':
        return 'bg-[#607D8B]';
      default:
        return 'bg-[#666666]';
    }
  };

  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'start':
        return <Play className="w-4 h-4 text-white" />;
      case 'end':
        return <CheckCircle className="w-4 h-4 text-white" />;
      case 'milestone':
        return <Calendar className="w-4 h-4 text-white" />;
      default:
        return <Clock className="w-4 h-4 text-white" />;
    }
  };

  const calculatePosition = (startDate, duration) => {
    const projectStart = new Date('2024-01-15');
    const taskStart = new Date(startDate);
    const daysDiff = Math.floor((taskStart - projectStart) / (1000 * 60 * 60 * 24));
    const left = (daysDiff / 167) * 100; // 167 days total project duration
    const width = (duration / 167) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('project-details', projectId)}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Project Timeline</h1>
              <p className="text-[#666666]">Visual timeline and Gantt chart for Downtown Office Complex</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              {['gantt', 'timeline', 'calendar'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    viewMode === mode 
                      ? 'neu-primary text-white' 
                      : 'text-[#666666] hover:text-[#333333]'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => setZoomLevel('week')}
                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                  zoomLevel === 'week' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setZoomLevel('month')}
                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                  zoomLevel === 'month' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setZoomLevel('quarter')}
                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                  zoomLevel === 'quarter' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                Quarter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">167</div>
          <div className="text-[#666666]">Total Days</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">60%</div>
          <div className="text-[#666666]">Completed</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">20%</div>
          <div className="text-[#666666]">In Progress</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#666666] mb-2">20%</div>
          <div className="text-[#666666]">Pending</div>
        </div>
      </div>

      {/* Main Timeline Content */}
      {viewMode === 'gantt' && (
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">Gantt Chart</h3>
          
          {/* Timeline Header */}
          <div className="neu-small p-4 rounded-2xl mb-6">
            <div className="grid grid-cols-6 text-center text-sm font-medium text-[#666666]">
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
              <div>Apr</div>
              <div>May</div>
              <div>Jun</div>
            </div>
          </div>

          {/* Timeline Tasks */}
          <div className="space-y-4">
            {timelineData.map((task) => {
              const position = calculatePosition(task.startDate, task.duration);
              return (
                <div key={task.id} className="neu-small p-6 rounded-2xl">
                  <div className="grid grid-cols-3 gap-6 items-center">
                    {/* Task Info */}
                    <div>
                      <h4 className="text-lg font-bold text-[#333333] mb-2">{task.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-[#666666]">
                        <span>{new Date(task.startDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{new Date(task.endDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{task.duration} days</span>
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-xl text-xs font-medium text-white mt-2 ${getPhaseColor(task.phase)}`}>
                        {task.phase.toUpperCase()}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="col-span-2">
                      <div className="relative h-8 neu-card-inset rounded-xl overflow-hidden">
                        <div 
                          className={`absolute h-full ${getStatusColor(task.status)} rounded-xl flex items-center justify-center text-white text-sm font-medium`}
                          style={position}
                        >
                          {task.progress}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtasks */}
                  <div className="mt-4 ml-6 space-y-2">
                    {task.tasks.map((subtask, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(subtask.status)}`}></div>
                          <span className="text-[#666666]">{subtask.name}</span>
                        </div>
                        <span className="text-[#666666]">{subtask.duration} days</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'timeline' && (
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">Timeline View</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#d1d9e6]"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {timelineData.map((task, index) => (
                <div key={task.id} className="relative flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(task.status)} z-10`}></div>
                  
                  {/* Content */}
                  <div className="flex-1 neu-small p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-[#333333]">{task.title}</h4>
                      <div className={`px-3 py-1 rounded-xl text-xs font-medium text-white ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-[#666666]">Start Date: </span>
                        <span className="font-medium text-[#333333]">{new Date(task.startDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-sm text-[#666666]">End Date: </span>
                        <span className="font-medium text-[#333333]">{new Date(task.endDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-sm text-[#666666]">Duration: </span>
                        <span className="font-medium text-[#333333]">{task.duration} days</span>
                      </div>
                      <div>
                        <span className="text-sm text-[#666666]">Progress: </span>
                        <span className="font-medium text-[#333333]">{task.progress}%</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="neu-card-inset rounded-full h-3 overflow-hidden mb-4">
                      <div 
                        className={`h-full ${getStatusColor(task.status)} transition-all duration-500`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    
                    {/* Subtasks */}
                    <div className="grid grid-cols-2 gap-2">
                      {task.tasks.map((subtask, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(subtask.status)}`}></div>
                          <span className="text-[#666666]">{subtask.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">Calendar View</h3>
          <div className="neu-card-inset p-8 rounded-2xl text-center">
            <Calendar className="w-16 h-16 text-[#666666] mx-auto mb-4" />
            <p className="text-[#666666]">Calendar view will display tasks and milestones in a monthly format</p>
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Key Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="neu-small p-6 rounded-2xl text-center">
              <div className="neu-card-inset w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full ${milestone.type === 'start' ? 'bg-[#4CAF50]' : milestone.type === 'end' ? 'bg-[#EF5226]' : 'bg-[#05A7CC]'} flex items-center justify-center`}>
                  {getMilestoneIcon(milestone.type)}
                </div>
              </div>
              <h4 className="font-bold text-[#333333] mb-2">{milestone.title}</h4>
              <p className="text-sm text-[#666666]">
                {new Date(milestone.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Legend */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Phase Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { phase: 'planning', label: 'Planning' },
            { phase: 'foundation', label: 'Foundation' },
            { phase: 'structural', label: 'Structural' },
            { phase: 'exterior', label: 'Exterior' },
            { phase: 'interior', label: 'Interior' },
            { phase: 'completion', label: 'Completion' }
          ].map(({ phase, label }) => (
            <div key={phase} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${getPhaseColor(phase)}`}></div>
              <span className="text-sm text-[#666666]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};