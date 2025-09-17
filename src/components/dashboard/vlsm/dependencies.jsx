import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, Search, Link, Unlink, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const tasksData = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    project: 'Website Redesign',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Alice Johnson',
    dueDate: '2024-02-20'
  },
  {
    id: '2',
    title: 'User Authentication System',
    project: 'Mobile App Development',
    status: 'todo',
    priority: 'high',
    assignee: 'David Brown',
    dueDate: '2024-02-25'
  },
  {
    id: '3',
    title: 'Database Schema Design',
    project: 'Mobile App Development',
    status: 'done',
    priority: 'high',
    assignee: 'Frank Wilson',
    dueDate: '2024-02-10'
  },
  {
    id: '4',
    title: 'Content Strategy Planning',
    project: 'Marketing Campaign Q1',
    status: 'todo',
    priority: 'medium',
    assignee: 'Carol Davis',
    dueDate: '2024-02-18'
  },
  {
    id: '5',
    title: 'API Documentation',
    project: 'Mobile App Development',
    status: 'done',
    priority: 'medium',
    assignee: 'Kate Wilson',
    dueDate: '2024-02-12'
  }
];

const dependenciesData = [
  {
    id: 'd1',
    predecessor: '3', // Database Schema Design
    successor: '2',   // User Authentication System
    type: 'finish-to-start',
    lag: 0,
    created: '2024-02-01'
  },
  {
    id: 'd2',
    predecessor: '5', // API Documentation
    successor: '2',   // User Authentication System
    type: 'finish-to-start',
    lag: 1,
    created: '2024-02-01'
  }
];

export const TaskDependencies = ({ taskId, onNavigate }) => {
  const [tasks] = useState(tasksData);
  const [dependencies, setDependencies] = useState(dependenciesData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPredecessor, setSelectedPredecessor] = useState('');
  const [selectedSuccessor, setSelectedSuccessor] = useState('');
  const [selectedType, setSelectedType] = useState('finish-to-start');
  const [selectedLag, setSelectedLag] = useState(0);

  const currentTask = tasks.find(task => task.id === (taskId || '1'));
  
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTaskById = (id) => tasks.find(task => task.id === id);

  const addDependency = () => {
    if (selectedPredecessor && selectedSuccessor && selectedPredecessor !== selectedSuccessor) {
      const newDependency = {
        id: `d${Date.now()}`,
        predecessor: selectedPredecessor,
        successor: selectedSuccessor,
        type: selectedType,
        lag: parseInt(selectedLag),
        created: new Date().toISOString().split('T')[0]
      };
      setDependencies([...dependencies, newDependency]);
      setSelectedPredecessor('');
      setSelectedSuccessor('');
      setSelectedType('finish-to-start');
      setSelectedLag(0);
      setShowAddForm(false);
    }
  };

  const removeDependency = (dependencyId) => {
    setDependencies(dependencies.filter(dep => dep.id !== dependencyId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-[#4CAF50] text-white';
      case 'in-progress':
        return 'bg-[#05A7CC] text-white';
      case 'todo':
        return 'bg-[#666666] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF5226] text-white';
      case 'medium':
        return 'bg-[#FFC107] text-white';
      case 'low':
        return 'bg-[#4CAF50] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-4 h-4 text-[#4CAF50]" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-[#05A7CC]" />;
      case 'todo':
        return <Clock className="w-4 h-4 text-[#666666]" />;
      default:
        return <Clock className="w-4 h-4 text-[#666666]" />;
    }
  };

  const getDependencyTypeLabel = (type) => {
    switch (type) {
      case 'finish-to-start':
        return 'Finish → Start';
      case 'start-to-start':
        return 'Start → Start';
      case 'finish-to-finish':
        return 'Finish → Finish';
      case 'start-to-finish':
        return 'Start → Finish';
      default:
        return type;
    }
  };

  const isTaskBlocked = (task) => {
    const blockingDeps = dependencies.filter(dep => 
      dep.successor === task.id && 
      getTaskById(dep.predecessor)?.status !== 'done'
    );
    return blockingDeps.length > 0;
  };

  const getTaskPredecessors = (taskId) => {
    return dependencies
      .filter(dep => dep.successor === taskId)
      .map(dep => getTaskById(dep.predecessor))
      .filter(Boolean);
  };

  const getTaskSuccessors = (taskId) => {
    return dependencies
      .filter(dep => dep.predecessor === taskId)
      .map(dep => getTaskById(dep.successor))
      .filter(Boolean);
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Dependencies</h1>
            <p className="text-[#666666]">Manage task relationships and dependencies</p>
            {currentTask && (
              <div className="mt-4 neu-small p-4 rounded-2xl inline-block">
                <div className="flex items-center space-x-4">
                  <span className="text-[#666666]">Current Task:</span>
                  <span className="font-medium text-[#333333]">{currentTask.title}</span>
                  <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(currentTask.status)}`}>
                    {currentTask.status.replace('-', ' ').toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowAddForm(true)}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Dependency</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{dependencies.length}</div>
          <div className="text-[#666666]">Total Dependencies</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#EF5226] mb-2">
            {tasks.filter(task => isTaskBlocked(task)).length}
          </div>
          <div className="text-[#666666]">Blocked Tasks</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {dependencies.filter(dep => dep.type === 'finish-to-start').length}
          </div>
          <div className="text-[#666666]">Finish→Start</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {dependencies.filter(dep => getTaskById(dep.predecessor)?.status === 'done').length}
          </div>
          <div className="text-[#666666]">Resolved</div>
        </div>
      </div>

      {/* Add Dependency Form */}
      {showAddForm && (
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">Add New Dependency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Predecessor Task</label>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedPredecessor}
                  onChange={(e) => setSelectedPredecessor(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="">Select predecessor task...</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id}>
                      {task.title} ({task.project})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Successor Task</label>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedSuccessor}
                  onChange={(e) => setSelectedSuccessor(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="">Select successor task...</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id}>
                      {task.title} ({task.project})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Dependency Type</label>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="finish-to-start">Finish to Start</option>
                  <option value="start-to-start">Start to Start</option>
                  <option value="finish-to-finish">Finish to Finish</option>
                  <option value="start-to-finish">Start to Finish</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Lag Days</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="number"
                  min="0"
                  value={selectedLag}
                  onChange={(e) => setSelectedLag(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent outline-none text-[#333333]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-6">
            <button 
              onClick={addDependency}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-2"
            >
              <Link className="w-5 h-5" />
              <span className="font-medium">Add Dependency</span>
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="neu-button px-8 py-4 rounded-2xl flex items-center space-x-2 text-[#666666] hover:text-[#333333]"
            >
              <X className="w-5 h-5" />
              <span className="font-medium">Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Current Dependencies */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Current Dependencies</h3>
        
        {dependencies.length === 0 ? (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <Link className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No dependencies defined</h3>
              <p className="text-[#666666] mb-4">Add dependencies to establish task relationships.</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="neu-primary px-6 py-3 rounded-2xl"
              >
                Add First Dependency
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {dependencies.map((dependency) => {
              const predecessor = getTaskById(dependency.predecessor);
              const successor = getTaskById(dependency.successor);
              const isBlocking = predecessor?.status !== 'done';
              
              return (
                <div key={dependency.id} className={`neu-small p-6 rounded-2xl ${isBlocking ? 'border-2 border-[#EF5226]' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 flex-1">
                      {/* Predecessor */}
                      <div className="flex-1">
                        <div className="neu-card-inset p-4 rounded-2xl">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(predecessor?.status)}
                            <div className="flex-1">
                              <h4 className="font-bold text-[#333333] mb-1">{predecessor?.title}</h4>
                              <p className="text-sm text-[#666666]">{predecessor?.project}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(predecessor?.status)}`}>
                                  {predecessor?.status?.replace('-', ' ').toUpperCase()}
                                </div>
                                <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(predecessor?.priority)}`}>
                                  {predecessor?.priority?.toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dependency Arrow */}
                      <div className="flex flex-col items-center space-y-2">
                        {isBlocking && (
                          <AlertTriangle className="w-5 h-5 text-[#EF5226]" />
                        )}
                        <div className="neu-small p-3 rounded-xl">
                          <ArrowRight className="w-6 h-6 text-[#05A7CC]" />
                        </div>
                        <div className="text-xs text-center">
                          <div className="font-medium text-[#333333]">{getDependencyTypeLabel(dependency.type)}</div>
                          {dependency.lag > 0 && (
                            <div className="text-[#666666]">+{dependency.lag} days</div>
                          )}
                        </div>
                      </div>
                      
                      {/* Successor */}
                      <div className="flex-1">
                        <div className="neu-card-inset p-4 rounded-2xl">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(successor?.status)}
                            <div className="flex-1">
                              <h4 className="font-bold text-[#333333] mb-1">{successor?.title}</h4>
                              <p className="text-sm text-[#666666]">{successor?.project}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(successor?.status)}`}>
                                  {successor?.status?.replace('-', ' ').toUpperCase()}
                                </div>
                                <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(successor?.priority)}`}>
                                  {successor?.priority?.toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="ml-6">
                      <button 
                        onClick={() => removeDependency(dependency.id)}
                        className="neu-button p-3 rounded-xl text-[#EF5226] hover:text-[#d4471f] transition-colors"
                      >
                        <Unlink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {isBlocking && (
                    <div className="mt-4 neu-card-inset p-3 rounded-2xl bg-[#FFEBEE]">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-[#EF5226]" />
                        <span className="text-sm text-[#EF5226] font-medium">
                          This dependency is blocking "{successor?.title}" because "{predecessor?.title}" is not complete.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks with Dependencies */}
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">Tasks with Dependencies</h3>
          <div className="space-y-4">
            {tasks.filter(task => 
              getTaskPredecessors(task.id).length > 0 || getTaskSuccessors(task.id).length > 0
            ).map(task => (
              <div key={task.id} className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#333333] mb-1">{task.title}</h4>
                    <p className="text-sm text-[#666666]">{task.project}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </div>
                    {isTaskBlocked(task) && (
                      <AlertTriangle className="w-4 h-4 text-[#EF5226]" />
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#666666]">Predecessors:</span>
                    <span className="ml-2 font-medium text-[#333333]">
                      {getTaskPredecessors(task.id).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#666666]">Successors:</span>
                    <span className="ml-2 font-medium text-[#333333]">
                      {getTaskSuccessors(task.id).length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Path Analysis */}
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">Critical Path Analysis</h3>
          <div className="space-y-4">
            <div className="neu-small p-4 rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-[#EF5226]" />
                <h4 className="font-bold text-[#333333]">Critical Tasks</h4>
              </div>
              <p className="text-sm text-[#666666] mb-4">
                Tasks that directly impact project timeline if delayed.
              </p>
              <div className="space-y-2">
                {tasks.filter(task => task.priority === 'high').map(task => (
                  <div key={task.id} className="neu-card-inset p-3 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#333333]">{task.title}</span>
                      <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="neu-small p-4 rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-[#05A7CC]" />
                <h4 className="font-bold text-[#333333]">Timeline Impact</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#EF5226] mb-1">
                    {dependencies.filter(dep => getTaskById(dep.predecessor)?.status !== 'done').length}
                  </div>
                  <div className="text-[#666666]">Potential Delays</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#4CAF50] mb-1">
                    {Math.round((dependencies.filter(dep => getTaskById(dep.predecessor)?.status === 'done').length / dependencies.length) * 100)}%
                  </div>
                  <div className="text-[#666666]">On Track</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDependencies;