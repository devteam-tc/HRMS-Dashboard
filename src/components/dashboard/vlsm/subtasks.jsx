import React, { useState } from 'react';
import { Plus, Check, X, Edit, Trash2, Clock, User, ArrowLeft, CheckSquare, Square } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const subtasksData = [
  {
    id: '1',
    title: 'Create wireframes',
    description: 'Design basic wireframes for homepage layout',
    completed: true,
    priority: 'high',
    assignee: 'Alice Johnson',
    dueDate: '2024-02-15',
    estimatedHours: 8,
    actualHours: 6,
    notes: 'Completed ahead of schedule with stakeholder feedback incorporated'
  },
  {
    id: '2',
    title: 'Design mockups',
    description: 'Create high-fidelity mockups based on wireframes',
    completed: true,
    priority: 'high',
    assignee: 'Alice Johnson',
    dueDate: '2024-02-18',
    estimatedHours: 12,
    actualHours: 14,
    notes: 'Took longer due to additional design iterations requested'
  },
  {
    id: '3',
    title: 'User testing setup',
    description: 'Prepare user testing scenarios and recruit participants',
    completed: false,
    priority: 'medium',
    assignee: 'Bob Smith',
    dueDate: '2024-02-22',
    estimatedHours: 6,
    actualHours: 0,
    notes: ''
  },
  {
    id: '4',
    title: 'Development handoff',
    description: 'Prepare design assets and specifications for developers',
    completed: false,
    priority: 'high',
    assignee: 'Alice Johnson',
    dueDate: '2024-02-25',
    estimatedHours: 4,
    actualHours: 0,
    notes: ''
  },
  {
    id: '5',
    title: 'Accessibility review',
    description: 'Review designs for accessibility compliance',
    completed: false,
    priority: 'medium',
    assignee: 'Carol Davis',
    dueDate: '2024-02-28',
    estimatedHours: 3,
    actualHours: 0,
    notes: ''
  }
];

export const SubtasksManagement = ({ taskId, onNavigate }) => {
  const [subtasks, setSubtasks] = useState(subtasksData);
  const [newSubtask, setNewSubtask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    estimatedHours: 1
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState(null);

  const parentTask = {
    id: taskId || '1',
    title: 'Design Homepage Mockup',
    project: 'Website Redesign'
  };

  const toggleSubtaskCompletion = (subtaskId) => {
    setSubtasks(prevSubtasks =>
      prevSubtasks.map(subtask => 
        subtask.id === subtaskId 
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
  };

  const addSubtask = () => {
    if (newSubtask.title.trim()) {
      const subtask = {
        id: Date.now().toString(),
        ...newSubtask,
        completed: false,
        actualHours: 0,
        notes: ''
      };
      setSubtasks([...subtasks, subtask]);
      setNewSubtask({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        priority: 'medium',
        estimatedHours: 1
      });
      setShowAddForm(false);
    }
  };

  const deleteSubtask = (subtaskId) => {
    setSubtasks(prevSubtasks => 
      prevSubtasks.filter(subtask => subtask.id !== subtaskId)
    );
  };

  const updateSubtask = (updatedSubtask) => {
    setSubtasks(prevSubtasks =>
      prevSubtasks.map(subtask =>
        subtask.id === updatedSubtask.id ? updatedSubtask : subtask
      )
    );
    setEditingSubtask(null);
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

  const completedCount = subtasks.filter(subtask => subtask.completed).length;
  const progressPercentage = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <button 
                onClick={() => onNavigate('task-details', taskId)}
                className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-[#333333]">Subtasks Management</h1>
                <p className="text-[#666666]">Task: {parentTask.title}</p>
              </div>
            </div>
            <div className="neu-small p-4 rounded-2xl inline-block">
              <div className="flex items-center space-x-4">
                <span className="text-[#666666]">Project:</span>
                <span className="font-medium text-[#333333]">{parentTask.project}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#333333] mb-1">{completedCount}/{subtasks.length}</div>
              <div className="text-sm text-[#666666]">Completed</div>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Subtask</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-[#333333] mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Completion</span>
                <span className="font-bold text-[#333333]">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="neu-card-inset rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="neu-small w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <div className="text-2xl font-bold text-[#4CAF50] mb-2">{completedCount}</div>
            <div className="text-[#666666]">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="neu-small w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Square className="w-8 h-8 text-[#EF5226]" />
            </div>
            <div className="text-2xl font-bold text-[#EF5226] mb-2">{subtasks.length - completedCount}</div>
            <div className="text-[#666666]">Remaining</div>
          </div>
        </div>
      </div>

      {/* Add Subtask Form */}
      {showAddForm && (
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">Add New Subtask</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#333333] mb-2">Title</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="text"
                  value={newSubtask.title}
                  onChange={(e) => setNewSubtask({...newSubtask, title: e.target.value})}
                  placeholder="Enter subtask title..."
                  className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#333333] mb-2">Description</label>
              <div className="neu-input p-4 rounded-2xl">
                <textarea
                  value={newSubtask.description}
                  onChange={(e) => setNewSubtask({...newSubtask, description: e.target.value})}
                  placeholder="Enter subtask description..."
                  rows="3"
                  className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Assignee</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="text"
                  value={newSubtask.assignee}
                  onChange={(e) => setNewSubtask({...newSubtask, assignee: e.target.value})}
                  placeholder="Assign to..."
                  className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Due Date</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="date"
                  value={newSubtask.dueDate}
                  onChange={(e) => setNewSubtask({...newSubtask, dueDate: e.target.value})}
                  className="w-full bg-transparent outline-none text-[#333333]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Priority</label>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={newSubtask.priority}
                  onChange={(e) => setNewSubtask({...newSubtask, priority: e.target.value})}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Estimated Hours</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="number"
                  min="1"
                  value={newSubtask.estimatedHours}
                  onChange={(e) => setNewSubtask({...newSubtask, estimatedHours: parseInt(e.target.value)})}
                  className="w-full bg-transparent outline-none text-[#333333]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-6">
            <button 
              onClick={addSubtask}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span className="font-medium">Add Subtask</span>
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

      {/* Subtasks List */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#333333]">Subtasks ({subtasks.length})</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-[#666666]">
              Total Hours: {subtasks.reduce((sum, subtask) => sum + subtask.estimatedHours, 0)} estimated, {subtasks.reduce((sum, subtask) => sum + subtask.actualHours, 0)} actual
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className={`neu-small p-6 rounded-2xl transition-all duration-200 ${subtask.completed ? 'opacity-75' : ''}`}>
              <div className="flex items-start space-x-4">
                {/* Completion Checkbox */}
                <button
                  onClick={() => toggleSubtaskCompletion(subtask.id)}
                  className={`neu-button w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    subtask.completed ? 'neu-primary text-white' : 'text-[#666666] hover:text-[#333333]'
                  }`}
                >
                  {subtask.completed ? <Check className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </button>
                
                {/* Subtask Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg mb-2 ${subtask.completed ? 'text-[#666666] line-through' : 'text-[#333333]'}`}>
                        {subtask.title}
                      </h4>
                      <p className="text-[#666666] text-sm leading-relaxed mb-3">
                        {subtask.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getPriorityColor(subtask.priority)}`}>
                        {subtask.priority.toUpperCase()}
                      </div>
                      <button 
                        onClick={() => setEditingSubtask(subtask)}
                        className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteSubtask(subtask.id)}
                        className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtask Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Assignee */}
                    <div className="neu-card-inset p-3 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                            {subtask.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-[#333333]">{subtask.assignee}</div>
                          <div className="text-xs text-[#666666]">Assignee</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Due Date */}
                    <div className="neu-card-inset p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#666666]" />
                        <div>
                          <div className="text-sm font-medium text-[#333333]">
                            {new Date(subtask.dueDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-[#666666]">Due Date</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time Tracking */}
                    <div className="neu-card-inset p-3 rounded-2xl">
                      <div className="text-center">
                        <div className="text-sm font-medium text-[#333333]">
                          {subtask.actualHours}h / {subtask.estimatedHours}h
                        </div>
                        <div className="text-xs text-[#666666]">Hours</div>
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="neu-card-inset p-3 rounded-2xl">
                      <div className="text-center">
                        <div className={`text-sm font-medium ${subtask.completed ? 'text-[#4CAF50]' : 'text-[#EF5226]'}`}>
                          {subtask.completed ? 'Complete' : 'In Progress'}
                        </div>
                        <div className="text-xs text-[#666666]">Status</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notes */}
                  {subtask.notes && (
                    <div className="mt-4 neu-card-inset p-3 rounded-2xl">
                      <div className="text-sm text-[#666666]">
                        <span className="font-medium">Notes:</span> {subtask.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {subtasks.length === 0 && (
            <div className="text-center py-12">
              <div className="neu-card-inset p-8 rounded-3xl inline-block">
                <CheckSquare className="w-16 h-16 text-[#666666] mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[#333333] mb-2">No subtasks yet</h3>
                <p className="text-[#666666] mb-4">Break down this task into smaller, manageable subtasks.</p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="neu-primary px-6 py-3 rounded-2xl"
                >
                  Add First Subtask
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubtasksManagement;