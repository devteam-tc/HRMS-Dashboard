import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit3, Trash2, CheckCircle, Circle, ChevronDown, ChevronRight, User, Calendar, Clock, Save, X } from 'lucide-react';

export const SubtasksManagement = ({ taskId, onNavigate }) => {
  const [expandedGroups, setExpandedGroups] = useState(['authentication', 'ui-components']);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [newSubtask, setNewSubtask] = useState({ title: '', assignee: '', estimate: '', group: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const mainTask = {
    id: taskId || 'TASK-001',
    title: 'User Authentication System',
    project: 'E-commerce Platform'
  };

  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: 'JD', role: 'Frontend Lead' },
    { id: 2, name: 'Sarah Wilson', avatar: 'SW', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'Backend Dev' },
    { id: 4, name: 'Emma Brown', avatar: 'EB', role: 'QA Lead' }
  ];

  const subtaskGroups = [
    {
      id: 'authentication',
      title: 'Authentication Logic',
      description: 'Core authentication functionality and security',
      completed: 2,
      total: 4,
      subtasks: [
        {
          id: 'SUB-001',
          title: 'Implement OAuth 2.0 flow',
          description: 'Setup OAuth 2.0 authentication with multiple providers',
          completed: true,
          assignee: { id: 1, name: 'John Doe', avatar: 'JD' },
          estimatedHours: 8,
          actualHours: 6,
          dueDate: '2024-03-20',
          priority: 'high',
          dependencies: []
        },
        {
          id: 'SUB-002',
          title: 'Add social login buttons',
          description: 'UI components for Google, Facebook, GitHub login',
          completed: true,
          assignee: { id: 2, name: 'Sarah Wilson', avatar: 'SW' },
          estimatedHours: 4,
          actualHours: 4,
          dueDate: '2024-03-18',
          priority: 'medium',
          dependencies: ['SUB-001']
        },
        {
          id: 'SUB-003',
          title: 'Setup password validation',
          description: 'Client and server-side password strength validation',
          completed: false,
          assignee: { id: 3, name: 'Mike Johnson', avatar: 'MJ' },
          estimatedHours: 6,
          actualHours: 2,
          dueDate: '2024-03-22',
          priority: 'high',
          dependencies: []
        },
        {
          id: 'SUB-004',
          title: 'Implement 2FA system',
          description: 'Two-factor authentication with SMS and app-based TOTP',
          completed: false,
          assignee: { id: 1, name: 'John Doe', avatar: 'JD' },
          estimatedHours: 12,
          actualHours: 0,
          dueDate: '2024-03-25',
          priority: 'medium',
          dependencies: ['SUB-003']
        }
      ]
    },
    {
      id: 'ui-components',
      title: 'UI Components',
      description: 'User interface elements and forms',
      completed: 1,
      total: 3,
      subtasks: [
        {
          id: 'SUB-005',
          title: 'Design login/signup forms',
          description: 'Responsive login and registration form components',
          completed: true,
          assignee: { id: 2, name: 'Sarah Wilson', avatar: 'SW' },
          estimatedHours: 6,
          actualHours: 7,
          dueDate: '2024-03-15',
          priority: 'high',
          dependencies: []
        },
        {
          id: 'SUB-006',
          title: 'Add password recovery flow',
          description: 'Forgot password and reset password UI flow',
          completed: false,
          assignee: { id: 2, name: 'Sarah Wilson', avatar: 'SW' },
          estimatedHours: 4,
          actualHours: 1,
          dueDate: '2024-03-24',
          priority: 'medium',
          dependencies: ['SUB-005']
        },
        {
          id: 'SUB-007',
          title: 'User profile management UI',
          description: 'Interface for users to manage their account settings',
          completed: false,
          assignee: { id: 4, name: 'Emma Brown', avatar: 'EB' },
          estimatedHours: 8,
          actualHours: 0,
          dueDate: '2024-03-28',
          priority: 'low',
          dependencies: ['SUB-005']
        }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Quality Assurance',
      description: 'Testing and validation of authentication features',
      completed: 0,
      total: 2,
      subtasks: [
        {
          id: 'SUB-008',
          title: 'Unit tests for auth functions',
          description: 'Comprehensive unit testing for all authentication methods',
          completed: false,
          assignee: { id: 4, name: 'Emma Brown', avatar: 'EB' },
          estimatedHours: 10,
          actualHours: 0,
          dueDate: '2024-03-30',
          priority: 'high',
          dependencies: ['SUB-001', 'SUB-003']
        },
        {
          id: 'SUB-009',
          title: 'Security penetration testing',
          description: 'Security audit and penetration testing of auth system',
          completed: false,
          assignee: { id: 3, name: 'Mike Johnson', avatar: 'MJ' },
          estimatedHours: 16,
          actualHours: 0,
          dueDate: '2024-04-05',
          priority: 'high',
          dependencies: ['SUB-008']
        }
      ]
    }
  ];

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleSubtaskCompletion = (groupId, subtaskId) => {
    console.log(`Toggling completion for ${subtaskId} in group ${groupId}`);
  };

  const handleEditSubtask = (subtask) => {
    setEditingSubtask(subtask);
  };

  const handleSaveEdit = () => {
    console.log('Saving edit for subtask:', editingSubtask);
    setEditingSubtask(null);
  };

  const handleCancelEdit = () => {
    setEditingSubtask(null);
  };

  const handleAddSubtask = () => {
    console.log('Adding new subtask:', newSubtask);
    setNewSubtask({ title: '', assignee: '', estimate: '', group: '' });
    setShowAddForm(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-[#EF5226] bg-red-100',
      'medium': 'text-[#FFC107] bg-yellow-100',
      'low': 'text-[#4CAF50] bg-green-100'
    };
    return colors[priority] || 'text-[#666666] bg-gray-100';
  };

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage === 100) return '#4CAF50';
    if (percentage >= 50) return '#EF5226';
    return '#05A7CC';
  };

  const totalSubtasks = subtaskGroups.reduce((sum, group) => sum + group.total, 0);
  const completedSubtasks = subtaskGroups.reduce((sum, group) => sum + group.completed, 0);
  const overallProgress = (completedSubtasks / totalSubtasks) * 100;

  // Layout: Nested Checklist with Expand/Collapse
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('task-details', { taskId: mainTask.id })}
            className="neu-small p-2 rounded-xl hover:text-[#EF5226] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Subtasks Management</h1>
            <p className="text-[#666666]">
              Managing subtasks for: <span className="font-semibold text-[#EF5226]">{mainTask.title}</span>
            </p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
          >
            <Plus size={16} className="mr-2" />
            Add Subtask
          </button>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#333333]">Overall Progress</h2>
          <span className="text-[#666666] text-sm">{completedSubtasks} of {totalSubtasks} completed</span>
        </div>
        <div className="neu-card-inset rounded-lg p-1 mb-4">
          <div 
            className="h-4 rounded-lg transition-all duration-500"
            style={{ 
              width: `${overallProgress}%`,
              background: `linear-gradient(90deg, ${getProgressColor(completedSubtasks, totalSubtasks)}, ${getProgressColor(completedSubtasks, totalSubtasks)}dd)`
            }}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#4CAF50] mb-1">{completedSubtasks}</div>
            <div className="text-[#666666] text-sm">Completed</div>
          </div>
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#05A7CC] mb-1">{totalSubtasks - completedSubtasks}</div>
            <div className="text-[#666666] text-sm">Remaining</div>
          </div>
          <div className="neu-small p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#EF5226] mb-1">{Math.round(overallProgress)}%</div>
            <div className="text-[#666666] text-sm">Progress</div>
          </div>
        </div>
      </div>

      {/* Subtask Groups */}
      <div className="space-y-6">
        {subtaskGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.id);
          const groupProgress = (group.completed / group.total) * 100;
          
          return (
            <div key={group.id} className="neu-card rounded-2xl overflow-hidden">
              {/* Group Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-[#E8EBEF] transition-colors"
                onClick={() => toggleGroup(group.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {isExpanded ? (
                      <ChevronDown size={20} className="text-[#EF5226]" />
                    ) : (
                      <ChevronRight size={20} className="text-[#666666]" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[#333333]">{group.title}</h3>
                      <p className="text-[#666666] text-sm">{group.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: getProgressColor(group.completed, group.total) }}>
                        {group.completed}/{group.total}
                      </div>
                      <div className="text-[#666666] text-xs">Tasks</div>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#E8EBEF"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke={getProgressColor(group.completed, group.total)}
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40 * (groupProgress / 100)} ${2 * Math.PI * 40}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold" style={{ color: getProgressColor(group.completed, group.total) }}>
                          {Math.round(groupProgress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group Content */}
              {isExpanded && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {group.subtasks.map((subtask) => (
                      <div key={subtask.id} className="neu-small rounded-xl overflow-hidden">
                        {editingSubtask?.id === subtask.id ? (
                          /* Edit Mode */
                          <div className="p-4 space-y-4">
                            <input
                              type="text"
                              value={editingSubtask.title}
                              onChange={(e) => setEditingSubtask(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                            />
                            <textarea
                              value={editingSubtask.description}
                              onChange={(e) => setEditingSubtask(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all resize-none"
                              rows={2}
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-3">
                                <select
                                  value={editingSubtask.assignee.id}
                                  onChange={(e) => {
                                    const member = teamMembers.find(m => m.id === parseInt(e.target.value));
                                    setEditingSubtask(prev => ({ ...prev, assignee: member }));
                                  }}
                                  className="neu-input px-3 py-2 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                                >
                                  {teamMembers.map(member => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                  ))}
                                </select>
                                <input
                                  type="number"
                                  value={editingSubtask.estimatedHours}
                                  onChange={(e) => setEditingSubtask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
                                  className="neu-input px-3 py-2 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all w-20"
                                  placeholder="Hours"
                                />
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleSaveEdit}
                                  className="neu-primary px-4 py-2 rounded-xl flex items-center hover:shadow-lg transition-all"
                                >
                                  <Save size={14} className="mr-2" />
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="neu-button px-4 py-2 rounded-xl flex items-center hover:text-red-500 transition-colors"
                                >
                                  <X size={14} className="mr-2" />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* View Mode */
                          <div className="p-4">
                            <div className="flex items-start space-x-4">
                              <button
                                onClick={() => toggleSubtaskCompletion(group.id, subtask.id)}
                                className={`mt-1 transition-all duration-200 ${
                                  subtask.completed 
                                    ? 'text-[#4CAF50] hover:text-[#388E3C]' 
                                    : 'text-[#E8EBEF] hover:text-[#EF5226]'
                                }`}
                              >
                                {subtask.completed ? (
                                  <CheckCircle size={20} />
                                ) : (
                                  <Circle size={20} />
                                )}
                              </button>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className={`font-semibold ${
                                      subtask.completed 
                                        ? 'line-through text-[#666666]' 
                                        : 'text-[#333333]'
                                    }`}>
                                      {subtask.title}
                                    </h4>
                                    <p className={`text-sm mt-1 ${
                                      subtask.completed 
                                        ? 'line-through text-[#999]' 
                                        : 'text-[#666666]'
                                    }`}>
                                      {subtask.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleEditSubtask(subtask)}
                                      className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors"
                                    >
                                      <Edit3 size={14} />
                                    </button>
                                    <button className="neu-small p-2 rounded-lg hover:text-red-500 transition-colors">
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-6 text-sm">
                                  <div className="flex items-center">
                                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white text-xs font-bold mr-2">
                                      {subtask.assignee.avatar}
                                    </div>
                                    <span className="text-[#666666]">{subtask.assignee.name}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-[#666666]">
                                    <Calendar size={14} className="mr-1" />
                                    {subtask.dueDate}
                                  </div>
                                  
                                  <div className="flex items-center text-[#666666]">
                                    <Clock size={14} className="mr-1" />
                                    {subtask.actualHours}h / {subtask.estimatedHours}h
                                  </div>
                                  
                                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(subtask.priority)}`}>
                                    {subtask.priority}
                                  </span>
                                </div>
                                
                                {subtask.dependencies.length > 0 && (
                                  <div className="mt-2 text-xs text-[#666666]">
                                    <span className="font-medium">Depends on:</span> {subtask.dependencies.join(', ')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Subtask Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Add New Subtask</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#333333] font-medium mb-2">Subtask Title</label>
                <input
                  type="text"
                  value={newSubtask.title}
                  onChange={(e) => setNewSubtask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter subtask title..."
                  className="w-full neu-input p-3 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Group</label>
                <select
                  value={newSubtask.group}
                  onChange={(e) => setNewSubtask(prev => ({ ...prev, group: e.target.value }))}
                  className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                >
                  <option value="">Select Group</option>
                  {subtaskGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Assignee</label>
                <select
                  value={newSubtask.assignee}
                  onChange={(e) => setNewSubtask(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                >
                  <option value="">Select Assignee</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[#333333] font-medium mb-2">Estimated Hours</label>
                <input
                  type="number"
                  value={newSubtask.estimate}
                  onChange={(e) => setNewSubtask(prev => ({ ...prev, estimate: e.target.value }))}
                  placeholder="8"
                  className="w-full neu-input p-3 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 neu-button py-3 rounded-xl hover:text-[#666666] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubtask}
                className="flex-1 neu-primary py-3 rounded-xl hover:shadow-xl transition-all"
              >
                Add Subtask
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};