import React, { useState } from 'react';
import { Save, ArrowLeft, Calendar, Users, Flag, Tag, Paperclip, Plus, X, Upload, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const projects = [
  'Website Redesign',
  'Mobile App Development',
  'Marketing Campaign Q1',
  'Database Migration',
  'Employee Training Platform',
  'Security Audit'
];

const availableUsers = [
  { name: 'Alice Johnson', role: 'UI/UX Designer', email: 'alice@company.com' },
  { name: 'Bob Smith', role: 'Frontend Developer', email: 'bob@company.com' },
  { name: 'Carol Davis', role: 'Project Manager', email: 'carol@company.com' },
  { name: 'David Brown', role: 'Backend Developer', email: 'david@company.com' },
  { name: 'Emma Garcia', role: 'QA Engineer', email: 'emma@company.com' },
  { name: 'Frank Wilson', role: 'DevOps Engineer', email: 'frank@company.com' }
];

const existingTaskData = {
  id: '1',
  title: 'Design Homepage Mockup',
  description: 'Create wireframes and high-fidelity mockups for the new homepage design. This includes user research, competitive analysis, and iterative design improvements based on stakeholder feedback.',
  project: 'Website Redesign',
  priority: 'high',
  status: 'in-progress',
  dueDate: '2024-02-20',
  assignees: [
    { name: 'Alice Johnson', role: 'UI/UX Designer', email: 'alice@company.com' },
    { name: 'Bob Smith', role: 'Frontend Developer', email: 'bob@company.com' }
  ],
  tags: ['Design', 'UI/UX', 'Frontend'],
  attachments: [
    { id: '1', name: 'Homepage_Wireframes_v1.pdf', size: '2.4 MB', type: 'PDF' },
    { id: '2', name: 'User_Research_Report.docx', size: '1.8 MB', type: 'Word' }
  ],
  subtasks: [
    { id: '1', title: 'User research and persona analysis', completed: true },
    { id: '2', title: 'Wireframe creation for mobile and desktop', completed: true },
    { id: '3', title: 'High-fidelity mockup design', completed: false },
    { id: '4', title: 'Stakeholder review and feedback', completed: false },
    { id: '5', title: 'Design iteration and finalization', completed: false }
  ]
};

export const EditTask = ({ taskId, onNavigate }) => {
  const [formData, setFormData] = useState(existingTaskData);
  const [newTag, setNewTag] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
      setHasChanges(true);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    setHasChanges(true);
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      const subtask = {
        id: Date.now().toString(),
        title: newSubtask.trim(),
        completed: false
      };
      setFormData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, subtask]
      }));
      setNewSubtask('');
      setHasChanges(true);
    }
  };

  const removeSubtask = (subtaskId) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(subtask => subtask.id !== subtaskId)
    }));
    setHasChanges(true);
  };

  const toggleSubtask = (subtaskId) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask =>
        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
      )
    }));
    setHasChanges(true);
  };

  const addAssignee = (user) => {
    if (!formData.assignees.find(assignee => assignee.email === user.email)) {
      setFormData(prev => ({
        ...prev,
        assignees: [...prev.assignees, user]
      }));
      setHasChanges(true);
    }
    setUserSearch('');
    setShowUserSearch(false);
  };

  const removeAssignee = (userEmail) => {
    setFormData(prev => ({
      ...prev,
      assignees: prev.assignees.filter(assignee => assignee.email !== userEmail)
    }));
    setHasChanges(true);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type.split('/')[1].toUpperCase() || 'FILE'
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
    setHasChanges(true);
  };

  const removeAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(attachment => attachment.id !== attachmentId)
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving task:', formData);
    onNavigate('task-details', taskId);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        onNavigate('task-details', taskId);
      }
    } else {
      onNavigate('task-details', taskId);
    }
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      console.log('Deleting task:', taskId);
      onNavigate('project-task-list');
    }
  };

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.role.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-[#666666] text-white';
      case 'in-progress':
        return 'bg-[#05A7CC] text-white';
      case 'done':
        return 'bg-[#4CAF50] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const completedSubtasks = formData.subtasks.filter(subtask => subtask.completed).length;
  const progressPercentage = formData.subtasks.length > 0 ? (completedSubtasks / formData.subtasks.length) * 100 : 0;

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCancel}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#333333]">Edit Task</h1>
                {hasChanges && (
                  <div className="neu-small px-3 py-1 rounded-xl text-xs font-medium bg-[#FFC107] text-white">
                    UNSAVED
                  </div>
                )}
              </div>
              <p className="text-[#666666]">Update task details and settings</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleDeleteTask}
              className="neu-button px-6 py-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete</span>
            </button>
            <button 
              onClick={handleCancel}
              className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={!formData.title.trim()}
              className={`px-8 py-3 rounded-2xl flex items-center space-x-3 transition-all ${
                formData.title.trim()
                  ? 'neu-primary hover:scale-105'
                  : 'neu-button text-[#999999] cursor-not-allowed'
              }`}
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Task Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Task Title *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter task title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Description</label>
                <div className="neu-input p-4 rounded-2xl">
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                    placeholder="Describe the task in detail..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Project *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.project}
                      onChange={(e) => handleInputChange('project', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="">Select project</option>
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Due Date</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Priority</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map(priority => (
                      <button
                        key={priority}
                        onClick={() => handleInputChange('priority', priority)}
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.priority === priority
                            ? getPriorityColor(priority)
                            : 'neu-button text-[#666666] hover:text-[#333333]'
                        }`}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Status</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'todo', label: 'To Do' },
                      { id: 'in-progress', label: 'In Progress' },
                      { id: 'done', label: 'Done' }
                    ].map(status => (
                      <button
                        key={status.id}
                        onClick={() => handleInputChange('status', status.id)}
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.status === status.id
                            ? getStatusColor(status.id)
                            : 'neu-button text-[#666666] hover:text-[#333333]'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtasks */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Subtasks</h2>
            
            {/* Progress Bar */}
            {formData.subtasks.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#333333]">Progress</span>
                  <span className="text-sm font-bold text-[#333333]">
                    {completedSubtasks}/{formData.subtasks.length} ({Math.round(progressPercentage)}%)
                  </span>
                </div>
                <div className="neu-card-inset rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="neu-input p-4 rounded-2xl flex-1">
                  <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Add a subtask"
                  />
                </div>
                <button 
                  onClick={addSubtask}
                  className="neu-button px-6 py-4 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {formData.subtasks.length > 0 && (
                <div className="space-y-3">
                  {formData.subtasks.map((subtask) => (
                    <div key={subtask.id} className="neu-small p-4 rounded-2xl flex items-center space-x-4">
                      <button
                        onClick={() => toggleSubtask(subtask.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          subtask.completed 
                            ? 'neu-primary' 
                            : 'neu-card-inset hover:bg-[#E8EBEF]'
                        }`}
                      >
                        {subtask.completed && <X className="w-4 h-4 text-white" />}
                      </button>
                      <span className={`flex-1 ${
                        subtask.completed 
                          ? 'text-[#666666] line-through' 
                          : 'text-[#333333]'
                      }`}>
                        {subtask.title}
                      </span>
                      <button 
                        onClick={() => removeSubtask(subtask.id)}
                        className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Tags</h2>
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="neu-input p-4 rounded-2xl flex-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Add a tag"
                  />
                </div>
                <button 
                  onClick={addTag}
                  className="neu-button px-6 py-4 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="neu-small px-3 py-2 rounded-xl flex items-center space-x-2">
                      <Tag className="w-3 h-3 text-[#05A7CC]" />
                      <span className="text-sm font-medium text-[#05A7CC]">{tag}</span>
                      <button 
                        onClick={() => removeTag(tag)}
                        className="text-[#EF5226] hover:text-[#d4471f]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Attachments</h2>
            
            <div className="space-y-4">
              <div className="neu-card-inset p-8 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center">
                <Upload className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <p className="text-[#666666] mb-4">Drag and drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="neu-button px-6 py-3 rounded-2xl cursor-pointer inline-flex items-center space-x-2"
                >
                  <Paperclip className="w-4 h-4" />
                  <span>Browse Files</span>
                </label>
              </div>

              {formData.attachments.length > 0 && (
                <div className="space-y-3">
                  {formData.attachments.map((file) => (
                    <div key={file.id} className="neu-small p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="neu-card-inset p-2 rounded-lg">
                          <Paperclip className="w-4 h-4 text-[#666666]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#333333]">{file.name}</div>
                          <div className="text-sm text-[#666666]">{file.size} • {file.type}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeAttachment(file.id)}
                        className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Assignees */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Assignees</h3>
              <button 
                onClick={() => setShowUserSearch(!showUserSearch)}
                className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Search Users */}
            {showUserSearch && (
              <div className="mb-4">
                <div className="neu-input p-4 rounded-2xl mb-3">
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Search team members..."
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredUsers.map((user, index) => (
                    <button
                      key={index}
                      onClick={() => addAssignee(user)}
                      className="w-full neu-small p-3 rounded-2xl text-left hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-[#05A7CC] text-white text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-[#333333] text-sm">{user.name}</div>
                          <div className="text-xs text-[#666666]">{user.role}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Current Assignees */}
            <div className="space-y-3">
              {formData.assignees.map((assignee, index) => (
                <div key={index} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white">
                          {assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#333333]">{assignee.name}</div>
                        <div className="text-sm text-[#666666]">{assignee.role}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeAssignee(assignee.email)}
                      className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {formData.assignees.length === 0 && (
                <div className="neu-card-inset p-6 rounded-2xl text-center">
                  <Users className="w-12 h-12 text-[#666666] mx-auto mb-3" />
                  <p className="text-[#666666]">No assignees selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Task Summary */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Task Summary</h3>
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Flag className="w-5 h-5 text-[#666666]" />
                  <div>
                    <div className="text-sm text-[#666666]">Priority</div>
                    <div className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(formData.priority)}`}>
                      {formData.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#666666]" />
                  <div>
                    <div className="text-sm text-[#666666]">Due Date</div>
                    <div className="font-medium text-[#333333]">
                      {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : 'Not set'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#666666]" />
                  <div>
                    <div className="text-sm text-[#666666]">Assignees</div>
                    <div className="font-medium text-[#333333]">
                      {formData.assignees.length} selected
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-[#666666]" />
                  <div>
                    <div className="text-sm text-[#666666]">Tags & Subtasks</div>
                    <div className="font-medium text-[#333333]">
                      {formData.tags.length} tags • {formData.subtasks.length} subtasks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change History */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Recent Changes</h3>
            <div className="space-y-3">
              <div className="neu-small p-4 rounded-2xl text-sm">
                <div className="font-medium text-[#333333] mb-1">Status changed to In Progress</div>
                <div className="text-[#666666]">2 hours ago</div>
              </div>
              <div className="neu-small p-4 rounded-2xl text-sm">
                <div className="font-medium text-[#333333] mb-1">Bob Smith added to assignees</div>
                <div className="text-[#666666]">1 day ago</div>
              </div>
              <div className="neu-small p-4 rounded-2xl text-sm">
                <div className="font-medium text-[#333333] mb-1">Task created</div>
                <div className="text-[#666666]">8 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};