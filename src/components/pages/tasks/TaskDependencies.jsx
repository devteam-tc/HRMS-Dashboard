import React, { useState } from 'react';
import { ArrowLeft, GitBranch, AlertTriangle, CheckCircle, Clock, Plus, Trash2, Eye, Filter, Search } from 'lucide-react';

export const TaskDependencies = ({ taskId, onNavigate }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddDependency, setShowAddDependency] = useState(false);
  const [filterCritical, setFilterCritical] = useState(false);

  const currentTask = {
    id: taskId || 'TASK-001',
    title: 'User Authentication System',
    project: 'E-commerce Platform'
  };

  const tasks = [
    {
      id: 'TASK-001',
      title: 'User Authentication System',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Doe',
      progress: 65,
      dependencies: ['TASK-002', 'TASK-005'],
      dependents: ['TASK-003', 'TASK-004'],
      isCriticalPath: true
    },
    {
      id: 'TASK-002',
      title: 'Database Schema Design',
      status: 'done',
      priority: 'high',
      assignee: 'Sarah Wilson',
      progress: 100,
      dependencies: [],
      dependents: ['TASK-001', 'TASK-006'],
      isCriticalPath: true
    },
    {
      id: 'TASK-003',
      title: 'Frontend UI Components',
      status: 'todo',
      priority: 'medium',
      assignee: 'Mike Johnson',
      progress: 0,
      dependencies: ['TASK-001'],
      dependents: ['TASK-007'],
      isCriticalPath: false
    },
    {
      id: 'TASK-004',
      title: 'Payment Gateway Integration',
      status: 'todo',
      priority: 'high',
      assignee: 'Emma Brown',
      progress: 0,
      dependencies: ['TASK-001', 'TASK-002'],
      dependents: ['TASK-008'],
      isCriticalPath: true
    },
    {
      id: 'TASK-005',
      title: 'Security Audit Framework',
      status: 'done',
      priority: 'medium',
      assignee: 'David Lee',
      progress: 100,
      dependencies: [],
      dependents: ['TASK-001'],
      isCriticalPath: false
    },
    {
      id: 'TASK-006',
      title: 'User Profile Management',
      status: 'in-progress',
      priority: 'low',
      assignee: 'Lisa Chen',
      progress: 30,
      dependencies: ['TASK-002'],
      dependents: [],
      isCriticalPath: false
    },
    {
      id: 'TASK-007',
      title: 'Mobile App Interface',
      status: 'todo',
      priority: 'medium',
      assignee: 'Tom Wilson',
      progress: 0,
      dependencies: ['TASK-003'],
      dependents: [],
      isCriticalPath: false
    },
    {
      id: 'TASK-008',
      title: 'Final Testing & Deployment',
      status: 'todo',
      priority: 'high',
      assignee: 'Anna Miller',
      progress: 0,
      dependencies: ['TASK-004', 'TASK-007'],
      dependents: [],
      isCriticalPath: true
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'todo': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
      'review': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
      'done': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' }
    };
    return colors[status] || colors.todo;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#EF5226',
      'medium': '#FFC107',
      'low': '#4CAF50'
    };
    return colors[priority] || '#666666';
  };

  const getTaskById = (id) => tasks.find(task => task.id === id);

  const criticalPathTasks = tasks.filter(task => task.isCriticalPath);
  const blockedTasks = tasks.filter(task => 
    task.dependencies.some(depId => {
      const dep = getTaskById(depId);
      return dep && dep.status !== 'done';
    })
  );

  const dependencyConnections = [];
  tasks.forEach(task => {
    task.dependencies.forEach(depId => {
      dependencyConnections.push({
        from: depId,
        to: task.id,
        fromTask: getTaskById(depId),
        toTask: task
      });
    });
  });

  const TaskNode = ({ task, isHighlighted = false, onClick }) => {
    const statusStyle = getStatusColor(task.status);
    const priorityColor = getPriorityColor(task.priority);

    return (
      <div
        onClick={() => onClick(task)}
        className={`neu-card p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
          isHighlighted 
            ? 'ring-2 ring-[#EF5226] shadow-lg' 
            : 'border-transparent hover:shadow-lg'
        } ${task.isCriticalPath ? 'border-[#EF5226] border-opacity-50' : ''}`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#666666] bg-[#E8EBEF] px-2 py-1 rounded">
            {task.id}
          </span>
          <div className="flex items-center space-x-2">
            {task.isCriticalPath && (
              <AlertTriangle size={14} className="text-[#EF5226]" title="Critical Path" />
            )}
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: priorityColor }}
              title={`${task.priority} priority`}
            ></div>
          </div>
        </div>
        
        <h4 className="font-semibold text-[#333333] text-sm mb-2 line-clamp-2">
          {task.title}
        </h4>
        
        <div className="space-y-2">
          <div className={`px-2 py-1 rounded text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
            {task.status.replace('-', ' ')}
          </div>
          
          <div className="text-xs text-[#666666]">
            Assigned: {task.assignee}
          </div>
          
          <div className="neu-card-inset rounded-lg p-1">
            <div 
              className="h-2 rounded-lg transition-all duration-300"
              style={{ 
                width: `${task.progress}%`,
                background: `linear-gradient(90deg, ${priorityColor}, ${priorityColor}dd)`
              }}
            ></div>
          </div>
          <div className="text-xs text-[#666666] text-right">{task.progress}%</div>
        </div>
      </div>
    );
  };

  const DependencyArrow = ({ from, to }) => (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7" 
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#EF5226"
            />
          </marker>
        </defs>
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="#EF5226"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );

  // Layout: Visual Dependency Map
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('task-details', { taskId: currentTask.id })}
            className="neu-small p-2 rounded-xl hover:text-[#EF5226] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Dependencies</h1>
            <p className="text-[#666666]">
              Visual dependency map for: <span className="font-semibold text-[#EF5226]">{currentTask.title}</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setFilterCritical(!filterCritical)}
              className={`neu-button px-4 py-2 rounded-xl flex items-center transition-all ${
                filterCritical ? 'neu-primary text-white' : 'hover:text-[#EF5226]'
              }`}
            >
              <AlertTriangle size={16} className="mr-2" />
              Critical Path Only
            </button>
            <button 
              onClick={() => setShowAddDependency(true)}
              className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
            >
              <Plus size={16} className="mr-2" />
              Add Dependency
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#EF5226] mb-1">{criticalPathTasks.length}</div>
          <div className="text-[#666666] text-sm">Critical Path Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#05A7CC] mb-1">{blockedTasks.length}</div>
          <div className="text-[#666666] text-sm">Blocked Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-[#333333] mb-1">{dependencyConnections.length}</div>
          <div className="text-[#666666] text-sm">Dependencies</div>
        </div>
        <div className="neu-card p-6 rounded-2xl text-center hover:shadow-lg transition-all">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {tasks.filter(t => t.status === 'done').length}
          </div>
          <div className="text-[#666666] text-sm">Completed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Dependency Map */}
        <div className="lg:col-span-3">
          <div className="neu-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#333333]">Dependency Map</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-[#666666]">
                  <AlertTriangle size={14} className="text-[#EF5226]" />
                  <span>Critical Path</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#666666]">
                  <GitBranch size={14} className="text-[#05A7CC]" />
                  <span>Dependencies</span>
                </div>
              </div>
            </div>

            {/* Task Dependency Grid */}
            <div className="relative min-h-96">
              <div className="grid grid-cols-3 gap-6 relative z-10">
                {(filterCritical ? criticalPathTasks : tasks).map((task, index) => (
                  <TaskNode
                    key={task.id}
                    task={task}
                    isHighlighted={selectedTask?.id === task.id}
                    onClick={setSelectedTask}
                  />
                ))}
              </div>
              
              {/* Dependency Lines - Simplified visual representation */}
              <div className="absolute inset-0 pointer-events-none">
                {dependencyConnections
                  .filter(conn => !filterCritical || (conn.fromTask.isCriticalPath && conn.toTask.isCriticalPath))
                  .map((conn, index) => (
                    <div key={index} className="absolute w-full h-0.5 bg-[#EF5226] opacity-50 rounded" 
                         style={{ 
                           top: `${20 + (index * 40)}%`, 
                           left: '10%', 
                           width: '80%',
                           transform: 'rotate(15deg)'
                         }}>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Task Details */}
          {selectedTask && (
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Task Details</h3>
              <div className="space-y-4">
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Task ID</div>
                  <div className="font-medium text-[#333333]">{selectedTask.id}</div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Title</div>
                  <div className="font-medium text-[#333333]">{selectedTask.title}</div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Status</div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTask.status).bg} ${getStatusColor(selectedTask.status).text}`}>
                    {selectedTask.status.replace('-', ' ')}
                  </div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Dependencies</div>
                  <div className="space-y-1">
                    {selectedTask.dependencies.length > 0 ? (
                      selectedTask.dependencies.map(depId => (
                        <div key={depId} className="text-[#333333] text-sm">{depId}</div>
                      ))
                    ) : (
                      <div className="text-[#666666] text-sm italic">No dependencies</div>
                    )}
                  </div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Blocks</div>
                  <div className="space-y-1">
                    {selectedTask.dependents.length > 0 ? (
                      selectedTask.dependents.map(depId => (
                        <div key={depId} className="text-[#333333] text-sm">{depId}</div>
                      ))
                    ) : (
                      <div className="text-[#666666] text-sm italic">No dependent tasks</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button 
                  onClick={() => onNavigate('task-details', { taskId: selectedTask.id })}
                  className="flex-1 neu-button py-2 rounded-xl text-sm hover:text-[#EF5226] transition-colors"
                >
                  <Eye size={14} className="inline mr-1" />
                  View
                </button>
                <button className="flex-1 neu-button py-2 rounded-xl text-sm hover:text-red-500 transition-colors">
                  <Trash2 size={14} className="inline mr-1" />
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Critical Path Tasks */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4 flex items-center">
              <AlertTriangle size={18} className="mr-2 text-[#EF5226]" />
              Critical Path
            </h3>
            <div className="space-y-3">
              {criticalPathTasks.map(task => (
                <div key={task.id} className="neu-small p-3 rounded-xl hover:shadow-md transition-all cursor-pointer"
                     onClick={() => setSelectedTask(task)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#333333] text-sm">{task.id}</div>
                      <div className="text-[#666666] text-xs">{task.title.substring(0, 30)}...</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blocked Tasks */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4 flex items-center">
              <Clock size={18} className="mr-2 text-[#05A7CC]" />
              Blocked Tasks
            </h3>
            <div className="space-y-3">
              {blockedTasks.slice(0, 5).map(task => (
                <div key={task.id} className="neu-small p-3 rounded-xl hover:shadow-md transition-all cursor-pointer"
                     onClick={() => setSelectedTask(task)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#333333] text-sm">{task.id}</div>
                      <div className="text-[#666666] text-xs">{task.title.substring(0, 30)}...</div>
                    </div>
                    <div className="text-[#EF5226]">
                      <AlertTriangle size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('task-timeline')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors"
              >
                <GitBranch size={16} className="inline mr-2" />
                View Timeline
              </button>
              <button className="w-full neu-button p-3 rounded-xl text-left hover:text-[#05A7CC] transition-colors">
                <CheckCircle size={16} className="inline mr-2" />
                Mark Complete
              </button>
              <button className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors">
                <Plus size={16} className="inline mr-2" />
                Add Dependency
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Dependency Modal */}
      {showAddDependency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Add Task Dependency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#333333] font-medium mb-2">From Task</label>
                <select className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all">
                  <option value="">Select a task</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id}>{task.id} - {task.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">To Task</label>
                <select className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all">
                  <option value="">Select a task</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id}>{task.id} - {task.title}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowAddDependency(false)}
                className="flex-1 neu-button py-3 rounded-xl hover:text-[#666666] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddDependency(false)}
                className="flex-1 neu-primary py-3 rounded-xl hover:shadow-xl transition-all"
              >
                Add Dependency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};