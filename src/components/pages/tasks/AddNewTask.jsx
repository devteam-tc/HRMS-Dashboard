import React, { useState } from 'react';
import { Save, X, Upload, Plus, Trash2, Calendar, User, Flag, Tag, Clock, FileText, Paperclip } from 'lucide-react';

export const AddNewTask = ({ defaultStatus, onNavigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    project: '',
    assignee: '',
    dueDate: '',
    estimatedHours: '',
    status: defaultStatus || 'todo',
    tags: [],
    dependencies: [],
    attachments: []
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});

  const projects = [
    'E-commerce Platform',
    'Mobile App Development',
    'API Gateway Microservices',
    'Data Analytics Dashboard',
    'Security Audit System'
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', email: 'john@company.com', avatar: 'JD', role: 'Frontend Lead' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@company.com', avatar: 'SW', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', avatar: 'MJ', role: 'Backend Dev' },
    { id: 4, name: 'Emma Brown', email: 'emma@company.com', avatar: 'EB', role: 'QA Lead' },
    { id: 5, name: 'David Lee', email: 'david@company.com', avatar: 'DL', role: 'DevOps' },
    { id: 6, name: 'Lisa Chen', email: 'lisa@company.com', avatar: 'LC', role: 'Mobile Dev' }
  ];

  const availableTasks = [
    { id: 'TASK-001', title: 'User Authentication System' },
    { id: 'TASK-002', title: 'Database Schema Design' },
    { id: 'TASK-003', title: 'Payment Gateway Integration' },
    { id: 'TASK-004', title: 'Responsive UI Components' },
    { id: 'TASK-005', title: 'API Documentation' }
  ];

  const predefinedTags = [
    'Frontend', 'Backend', 'Database', 'Security', 'Testing', 'UI/UX', 
    'API', 'Performance', 'Documentation', 'Bug Fix', 'Feature', 'Refactor'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddDependency = (taskId) => {
    if (!formData.dependencies.includes(taskId)) {
      setFormData(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, taskId]
      }));
    }
  };

  const handleRemoveDependency = (taskId) => {
    setFormData(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter(id => id !== taskId)
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type
      }))]
    }));
  };

  const handleRemoveAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }

    if (!formData.project) {
      newErrors.project = 'Project selection is required';
    }

    if (!formData.assignee) {
      newErrors.assignee = 'Assignee is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (!formData.estimatedHours || formData.estimatedHours <= 0) {
      newErrors.estimatedHours = 'Valid estimated hours required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your API
      onNavigate('task-kanban');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-[#EF5226] bg-red-100',
      'medium': 'text-[#FFC107] bg-yellow-100',
      'low': 'text-[#4CAF50] bg-green-100'
    };
    return colors[priority] || 'text-[#666666] bg-gray-100';
  };

  // Layout: Neumorphic Form Design
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Add New Task</h1>
        <p className="text-[#666666]">Create a new task with detailed specifications and assignments</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="neu-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center">
                <FileText size={20} className="mr-2 text-[#EF5226]" />
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-2">Task Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter task title..."
                    className={`w-full neu-input p-4 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all ${
                      errors.title ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the task in detail..."
                    rows={4}
                    className={`w-full neu-input p-4 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all resize-none ${
                      errors.description ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#333333] font-medium mb-2">Project *</label>
                    <select
                      value={formData.project}
                      onChange={(e) => handleInputChange('project', e.target.value)}
                      className={`w-full neu-input p-4 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all ${
                        errors.project ? 'ring-2 ring-red-500' : ''
                      }`}
                    >
                      <option value="">Select Project</option>
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                    {errors.project && <p className="text-red-500 text-sm mt-1">{errors.project}</p>}
                  </div>

                  <div>
                    <label className="block text-[#333333] font-medium mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full neu-input p-4 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment & Timeline */}
            <div className="neu-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center">
                <User size={20} className="mr-2 text-[#05A7CC]" />
                Assignment & Timeline
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-2">Assignee *</label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => handleInputChange('assignee', e.target.value)}
                    className={`w-full neu-input p-4 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all ${
                      errors.assignee ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    <option value="">Select Assignee</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                  {errors.assignee && <p className="text-red-500 text-sm mt-1">{errors.assignee}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className={`w-full neu-input p-4 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all ${
                      errors.dueDate ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-2">Estimated Hours *</label>
                  <input
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                    placeholder="8"
                    min="1"
                    className={`w-full neu-input p-4 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all ${
                      errors.estimatedHours ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.estimatedHours && <p className="text-red-500 text-sm mt-1">{errors.estimatedHours}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-2">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full neu-input p-4 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="neu-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center">
                <Tag size={20} className="mr-2 text-[#4CAF50]" />
                Tags
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 neu-input p-3 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="neu-primary px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Predefined Tags */}
                <div>
                  <p className="text-sm text-[#666666] mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-2">
                    {predefinedTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => !formData.tags.includes(tag) && setFormData(prev => ({
                          ...prev,
                          tags: [...prev.tags, tag]
                        }))}
                        disabled={formData.tags.includes(tag)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          formData.tags.includes(tag)
                            ? 'bg-[#E8EBEF] text-[#999] cursor-not-allowed'
                            : 'neu-button hover:text-[#EF5226]'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-[#666666] mb-2">Selected tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-[#EF5226] text-white text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 hover:text-red-200 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dependencies */}
            <div className="neu-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center">
                <Flag size={20} className="mr-2 text-[#9C27B0]" />
                Dependencies
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-2">
                    This task depends on:
                  </label>
                  <select
                    onChange={(e) => handleAddDependency(e.target.value)}
                    className="w-full neu-input p-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
                  >
                    <option value="">Select a dependency</option>
                    {availableTasks.filter(task => !formData.dependencies.includes(task.id)).map(task => (
                      <option key={task.id} value={task.id}>
                        {task.id} - {task.title}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.dependencies.length > 0 && (
                  <div className="space-y-2">
                    {formData.dependencies.map(depId => {
                      const task = availableTasks.find(t => t.id === depId);
                      return (
                        <div key={depId} className="neu-small p-3 rounded-xl flex items-center justify-between">
                          <span className="text-[#333333]">
                            <strong>{task?.id}</strong> - {task?.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDependency(depId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* File Attachments */}
            <div className="neu-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center">
                <Paperclip size={20} className="mr-2 text-[#FFC107]" />
                Attachments
              </h2>
              
              <div className="space-y-4">
                <div className="neu-card-inset p-6 rounded-xl border-2 border-dashed border-[#E8EBEF] text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={32} className="text-[#666666] mx-auto mb-2" />
                    <p className="text-[#666666] mb-1">Click to upload files</p>
                    <p className="text-[#888] text-sm">PDF, DOC, XLS, Images up to 10MB</p>
                  </label>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    {formData.attachments.map(attachment => (
                      <div key={attachment.id} className="neu-small p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center">
                          <Paperclip size={16} className="text-[#666666] mr-2" />
                          <div>
                            <span className="text-[#333333] font-medium">{attachment.name}</span>
                            <span className="text-[#666666] text-sm ml-2">({formatFileSize(attachment.size)})</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(attachment.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Preview */}
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Task Preview</h3>
              <div className="space-y-3">
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Priority</div>
                  <div className={`inline-block px-2 py-1 rounded-lg text-sm font-medium ${getPriorityColor(formData.priority)}`}>
                    {formData.priority}
                  </div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Status</div>
                  <div className="font-medium text-[#333333] capitalize">{formData.status.replace('-', ' ')}</div>
                </div>
                
                {formData.estimatedHours && (
                  <div className="neu-small p-3 rounded-xl">
                    <div className="text-[#666666] text-sm">Estimated Time</div>
                    <div className="font-medium text-[#333333]">{formData.estimatedHours} hours</div>
                  </div>
                )}
                
                {formData.tags.length > 0 && (
                  <div className="neu-small p-3 rounded-xl">
                    <div className="text-[#666666] text-sm mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-[#E8EBEF] text-[#666666] rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {formData.tags.length > 3 && (
                        <span className="px-2 py-1 bg-[#E8EBEF] text-[#666666] rounded text-xs">
                          +{formData.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onNavigate('task-kanban')}
                  className="w-full neu-button p-3 rounded-xl hover:text-[#EF5226] transition-colors"
                >
                  <X size={16} className="inline mr-2" />
                  Cancel
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    // Save as draft functionality
                    console.log('Saving as draft...');
                  }}
                  className="w-full neu-button p-3 rounded-xl hover:text-[#05A7CC] transition-colors"
                >
                  <Clock size={16} className="inline mr-2" />
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="neu-card p-6 rounded-2xl">
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full neu-primary py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center"
                >
                  <Save size={16} className="mr-2" />
                  Create Task
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    if (validateForm()) {
                      // Create and assign to current user
                      console.log('Creating and assigning to me...');
                    }
                  }}
                  className="w-full neu-secondary py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center"
                >
                  <User size={16} className="mr-2" />
                  Create & Assign to Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};