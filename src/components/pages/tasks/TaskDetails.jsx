import React, { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, User, Calendar, Clock, Flag, Tag, Paperclip, MessageCircle, Activity, Eye, CheckSquare, Plus, Send, X } from 'lucide-react';

export const TaskDetails = ({ taskId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');

  // Mock task data
  const task = {
    id: taskId || 'TASK-001',
    title: 'User Authentication System',
    description: 'Implement a comprehensive user authentication system with OAuth 2.0 integration, social login options (Google, Facebook, GitHub), and robust security features including two-factor authentication, password recovery, and session management.',
    status: 'in-progress',
    priority: 'high',
    assignee: { 
      name: 'John Doe', 
      avatar: 'JD', 
      color: '#EF5226', 
      email: 'john@company.com',
      role: 'Frontend Lead'
    },
    project: 'E-commerce Platform',
    dueDate: '2024-03-25',
    createdDate: '2024-03-10',
    estimatedHours: 16,
    completedHours: 10,
    tags: ['Frontend', 'Security', 'OAuth', 'Authentication'],
    reporter: { name: 'Sarah Wilson', avatar: 'SW' },
    watchers: [
      { name: 'Mike Johnson', avatar: 'MJ' },
      { name: 'Emma Brown', avatar: 'EB' },
      { name: 'David Lee', avatar: 'DL' }
    ]
  };

  const subtasks = [
    { id: 'SUB-001', title: 'Design login/signup UI components', completed: true, assignee: 'John Doe' },
    { id: 'SUB-002', title: 'Implement OAuth 2.0 flow', completed: true, assignee: 'John Doe' },
    { id: 'SUB-003', title: 'Add social login buttons', completed: false, assignee: 'John Doe' },
    { id: 'SUB-004', title: 'Setup password validation', completed: false, assignee: 'John Doe' },
    { id: 'SUB-005', title: 'Implement 2FA system', completed: false, assignee: 'John Doe' },
    { id: 'SUB-006', title: 'Add password recovery flow', completed: false, assignee: 'John Doe' }
  ];

  const comments = [
    {
      id: 1,
      user: { name: 'Sarah Wilson', avatar: 'SW', color: '#05A7CC' },
      text: 'Started working on the OAuth integration. The Google OAuth is working perfectly. Will move to Facebook next.',
      timestamp: '2 hours ago',
      type: 'comment'
    },
    {
      id: 2,
      user: { name: 'Mike Johnson', avatar: 'MJ', color: '#4CAF50' },
      text: 'Great progress! Make sure to implement proper error handling for the OAuth failures.',
      timestamp: '1 hour ago',
      type: 'comment'
    },
    {
      id: 3,
      user: { name: 'System', avatar: 'SY', color: '#666666' },
      text: 'Status changed from "To Do" to "In Progress"',
      timestamp: '45 minutes ago',
      type: 'activity'
    },
    {
      id: 4,
      user: { name: 'John Doe', avatar: 'JD', color: '#EF5226' },
      text: 'Updated the estimated hours from 12 to 16 as the 2FA implementation will take longer than expected.',
      timestamp: '30 minutes ago',
      type: 'comment'
    }
  ];

  const attachments = [
    { id: 1, name: 'auth-flow-diagram.png', size: '245 KB', type: 'image', uploadedBy: 'John Doe', date: '2024-03-12' },
    { id: 2, name: 'oauth-integration-guide.pdf', size: '1.2 MB', type: 'document', uploadedBy: 'Sarah Wilson', date: '2024-03-11' },
    { id: 3, name: 'api-documentation.docx', size: '890 KB', type: 'document', uploadedBy: 'Mike Johnson', date: '2024-03-10' }
  ];

  const activityLog = [
    { id: 1, action: 'Task created', user: 'Sarah Wilson', timestamp: '2024-03-10 09:00 AM' },
    { id: 2, action: 'Assigned to John Doe', user: 'Sarah Wilson', timestamp: '2024-03-10 09:05 AM' },
    { id: 3, action: 'Priority set to High', user: 'Sarah Wilson', timestamp: '2024-03-10 09:06 AM' },
    { id: 4, action: 'Status changed to In Progress', user: 'John Doe', timestamp: '2024-03-12 08:30 AM' },
    { id: 5, action: 'Estimated hours updated', user: 'John Doe', timestamp: '2024-03-15 02:15 PM' },
    { id: 6, action: 'Comment added', user: 'Mike Johnson', timestamp: '2024-03-15 03:30 PM' }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      'high': { bg: 'bg-red-100', text: 'text-red-800', dot: '#EF5226' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: '#FFC107' },
      'low': { bg: 'bg-green-100', text: 'text-green-800', dot: '#4CAF50' }
    };
    return colors[priority] || { bg: 'bg-gray-100', text: 'text-gray-800', dot: '#666666' };
  };

  const getStatusColor = (status) => {
    const colors = {
      'todo': { bg: 'bg-gray-100', text: 'text-gray-800' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'review': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'done': { bg: 'bg-green-100', text: 'text-green-800' }
    };
    return colors[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const progressPercentage = (task.completedHours / task.estimatedHours) * 100;
  const completedSubtasks = subtasks.filter(sub => sub.completed).length;
  const subtaskProgress = (completedSubtasks / subtasks.length) * 100;

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Task Description */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Description</h3>
        <p className="text-[#666666] leading-relaxed">{task.description}</p>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Progress */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-4">Time Progress</h3>
          <div className="space-y-4">
            <div className="neu-small p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#666666] text-sm">Completed Hours</span>
                <span className="font-bold text-[#EF5226]">{task.completedHours}h / {task.estimatedHours}h</span>
              </div>
              <div className="neu-card-inset rounded-lg p-1">
                <div 
                  className="h-3 neu-primary rounded-lg transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-[#666666] mt-2">{Math.round(progressPercentage)}% completed</div>
            </div>
          </div>
        </div>

        {/* Subtask Progress */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-4">Subtask Progress</h3>
          <div className="space-y-4">
            <div className="neu-small p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#666666] text-sm">Completed Subtasks</span>
                <span className="font-bold text-[#05A7CC]">{completedSubtasks} / {subtasks.length}</span>
              </div>
              <div className="neu-card-inset rounded-lg p-1">
                <div 
                  className="h-3 neu-secondary rounded-lg transition-all duration-500"
                  style={{ width: `${subtaskProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-[#666666] mt-2">{Math.round(subtaskProgress)}% completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtasks List */}
      <div className="neu-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#333333]">Subtasks</h3>
          <button 
            onClick={() => onNavigate('subtasks-management', { taskId: task.id })}
            className="neu-button px-4 py-2 rounded-xl text-sm hover:text-[#EF5226] transition-colors"
          >
            Manage All
          </button>
        </div>
        <div className="space-y-3">
          {subtasks.slice(0, 4).map(subtask => (
            <div key={subtask.id} className="neu-small p-3 rounded-xl flex items-center">
              <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                subtask.completed 
                  ? 'bg-[#4CAF50] border-[#4CAF50]' 
                  : 'border-[#E8EBEF] hover:border-[#EF5226] cursor-pointer'
              } transition-all`}>
                {subtask.completed && <CheckSquare size={12} className="text-white" />}
              </div>
              <div className="flex-1">
                <span className={`text-sm ${subtask.completed ? 'line-through text-[#666666]' : 'text-[#333333]'}`}>
                  {subtask.title}
                </span>
              </div>
              <span className="text-xs text-[#666666]">{subtask.assignee}</span>
            </div>
          ))}
          {subtasks.length > 4 && (
            <div className="text-center">
              <button 
                onClick={() => onNavigate('subtasks-management', { taskId: task.id })}
                className="text-[#EF5226] text-sm hover:underline"
              >
                View {subtasks.length - 4} more subtasks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommentsTab = () => (
    <div className="space-y-6">
      {/* Add Comment */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Add Comment</h3>
        <div className="flex space-x-4">
          <div className="neu-small w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white font-bold">
            JD
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full neu-input p-4 rounded-xl text-[#333333] placeholder-[#666666] focus:ring-2 focus:ring-[#EF5226] transition-all resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className={`neu-primary px-6 py-2 rounded-xl flex items-center transition-all ${
                  !newComment.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                <Send size={16} className="mr-2" />
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="neu-card p-6 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div 
                className="neu-small w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: comment.user.color }}
              >
                {comment.user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-semibold text-[#333333]">{comment.user.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    comment.type === 'activity' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {comment.type}
                  </span>
                  <span className="text-[#666666] text-sm">{comment.timestamp}</span>
                </div>
                <p className="text-[#666666]">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttachmentsTab = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Upload New Attachment</h3>
        <div className="neu-card-inset p-6 rounded-xl border-2 border-dashed border-[#E8EBEF] text-center">
          <input type="file" multiple className="hidden" id="attachment-upload" />
          <label htmlFor="attachment-upload" className="cursor-pointer">
            <Paperclip size={32} className="text-[#666666] mx-auto mb-2" />
            <p className="text-[#666666] mb-1">Click to upload files</p>
            <p className="text-[#888] text-sm">PDF, DOC, Images up to 10MB</p>
          </label>
        </div>
      </div>

      {/* Attachments List */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Attachments ({attachments.length})</h3>
        <div className="space-y-3">
          {attachments.map(attachment => (
            <div key={attachment.id} className="neu-small p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex items-center">
                <div className="neu-small p-2 rounded-lg mr-3 bg-gradient-to-br from-[#05A7CC] to-[#048ba8]">
                  <Paperclip size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#333333]">{attachment.name}</div>
                  <div className="text-sm text-[#666666]">
                    {attachment.size} • Uploaded by {attachment.uploadedBy} • {attachment.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors">
                  <Eye size={16} />
                </button>
                <button className="neu-small p-2 rounded-lg hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="neu-card p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-[#333333] mb-6">Activity Log</h3>
      <div className="space-y-4">
        {activityLog.map(activity => (
          <div key={activity.id} className="neu-small p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#EF5226] mr-4"></div>
              <div>
                <span className="text-[#333333] font-medium">{activity.action}</span>
                <span className="text-[#666666] text-sm ml-2">by {activity.user}</span>
              </div>
            </div>
            <span className="text-[#666666] text-sm">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const priorityStyle = getPriorityColor(task.priority);
  const statusStyle = getStatusColor(task.status);

  // Layout: Full Page View with Tabs
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('task-kanban')}
            className="neu-small p-2 rounded-xl hover:text-[#EF5226] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-[#333333]">{task.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                {task.status.replace('-', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                {task.priority} priority
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-[#666666]">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Due: {task.dueDate}
              </span>
              <span className="flex items-center">
                <User size={14} className="mr-1" />
                Assigned to {task.assignee.name}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                Created: {task.createdDate}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="neu-button px-4 py-2 rounded-xl flex items-center hover:text-[#05A7CC] transition-colors">
              <Edit3 size={16} className="mr-2" />
              Edit
            </button>
            <button className="neu-button px-4 py-2 rounded-xl flex items-center hover:text-red-500 transition-colors">
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="neu-card rounded-2xl p-6 mb-8">
            <div className="flex space-x-1 neu-card-inset rounded-xl p-1">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'comments', label: 'Comments', icon: MessageCircle, count: comments.length },
                { id: 'attachments', label: 'Attachments', icon: Paperclip, count: attachments.length },
                { id: 'activity', label: 'Activity Log', icon: Activity }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'neu-primary text-white shadow-lg'
                        : 'text-[#666666] hover:text-[#EF5226]'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {tab.label}
                    {tab.count && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.id ? 'bg-white/20' : 'bg-[#E8EBEF]'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="neu-card rounded-2xl p-8">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'comments' && renderCommentsTab()}
            {activeTab === 'attachments' && renderAttachmentsTab()}
            {activeTab === 'activity' && renderActivityTab()}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Details */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Task Details</h3>
            <div className="space-y-4">
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Task ID</div>
                <div className="font-medium text-[#333333]">{task.id}</div>
              </div>
              
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Project</div>
                <div className="font-medium text-[#333333]">{task.project}</div>
              </div>
              
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Reporter</div>
                <div className="flex items-center">
                  <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#05A7CC] to-[#048ba8] text-white text-xs font-bold mr-2">
                    {task.reporter.avatar}
                  </div>
                  <span className="font-medium text-[#333333]">{task.reporter.name}</span>
                </div>
              </div>
              
              <div className="neu-small p-3 rounded-xl">
                <div className="text-[#666666] text-sm">Assignee</div>
                <div className="flex items-center">
                  <div 
                    className="neu-small w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                    style={{ backgroundColor: task.assignee.color }}
                  >
                    {task.assignee.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-[#333333]">{task.assignee.name}</div>
                    <div className="text-xs text-[#666666]">{task.assignee.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#EF5226] text-white rounded-lg text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Watchers */}
          <div className="neu-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#333333]">Watchers</h3>
              <button className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {task.watchers.map((watcher, index) => (
                <div key={index} className="flex items-center justify-between neu-small p-3 rounded-xl">
                  <div className="flex items-center">
                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4CAF50] to-[#388E3C] text-white text-xs font-bold mr-3">
                      {watcher.avatar}
                    </div>
                    <span className="text-[#333333] text-sm">{watcher.name}</span>
                  </div>
                  <button className="text-[#666666] hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('subtasks-management', { taskId: task.id })}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors"
              >
                <CheckSquare size={16} className="inline mr-2" />
                Manage Subtasks
              </button>
              <button 
                onClick={() => onNavigate('task-dependencies', { taskId: task.id })}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#05A7CC] transition-colors"
              >
                <Flag size={16} className="inline mr-2" />
                View Dependencies
              </button>
              <button 
                onClick={() => onNavigate('task-timeline')}
                className="w-full neu-button p-3 rounded-xl text-left hover:text-[#EF5226] transition-colors"
              >
                <Calendar size={16} className="inline mr-2" />
                View in Timeline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};