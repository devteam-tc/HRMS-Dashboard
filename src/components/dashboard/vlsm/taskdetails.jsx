import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Calendar, Flag, Users, MessageSquare, Paperclip, Plus, CheckCircle, Clock, Send, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const taskData = {
  id: '1',
  title: 'Design Homepage Mockup',
  description: 'Create wireframes and high-fidelity mockups for the new homepage design. This includes user research, competitive analysis, and iterative design improvements based on stakeholder feedback. The design should be responsive and follow the company brand guidelines.',
  status: 'in-progress',
  priority: 'high',
  assignees: [
    { name: 'Alice Johnson', role: 'UI/UX Designer', email: 'alice@company.com', avatar: 'AJ' },
    { name: 'Bob Smith', role: 'Frontend Developer', email: 'bob@company.com', avatar: 'BS' }
  ],
  dueDate: '2024-02-20',
  createdDate: '2024-02-10',
  updatedDate: '2024-02-18',
  project: 'Website Redesign',
  tags: ['Design', 'UI/UX', 'Frontend', 'Responsive'],
  progress: 60,
  estimatedHours: 40,
  loggedHours: 24,
  subtasks: [
    { id: '1', title: 'User research and persona analysis', completed: true, assignee: 'Alice Johnson', dueDate: '2024-02-12' },
    { id: '2', title: 'Wireframe creation for mobile and desktop', completed: true, assignee: 'Alice Johnson', dueDate: '2024-02-14' },
    { id: '3', title: 'High-fidelity mockup design', completed: false, assignee: 'Alice Johnson', dueDate: '2024-02-18' },
    { id: '4', title: 'Stakeholder review and feedback', completed: false, assignee: 'Bob Smith', dueDate: '2024-02-20' },
    { id: '5', title: 'Design iteration and finalization', completed: false, assignee: 'Alice Johnson', dueDate: '2024-02-22' }
  ],
  attachments: [
    { id: '1', name: 'Homepage_Wireframes_v1.pdf', size: '2.4 MB', type: 'PDF', uploadedBy: 'Alice Johnson', uploadDate: '2024-02-12' },
    { id: '2', name: 'User_Research_Report.docx', size: '1.8 MB', type: 'Word', uploadedBy: 'Alice Johnson', uploadDate: '2024-02-11' },
    { id: '3', name: 'Brand_Guidelines.pdf', size: '3.2 MB', type: 'PDF', uploadedBy: 'Bob Smith', uploadDate: '2024-02-10' }
  ],
  comments: [
    {
      id: '1',
      author: 'Alice Johnson',
      avatar: 'AJ',
      time: '2024-02-18T14:30:00',
      content: 'Initial wireframes are ready for review. I\'ve incorporated the feedback from the last stakeholder meeting regarding the navigation structure and call-to-action placement.',
      reactions: { thumbsUp: 3, heart: 1 }
    },
    {
      id: '2',
      author: 'Bob Smith',
      avatar: 'BS',
      time: '2024-02-18T15:45:00',
      content: 'Looks great! The mobile responsive design is much cleaner now. When can we expect the high-fidelity mockups? Also, should we consider the accessibility requirements mentioned in the brand guidelines?',
      reactions: { thumbsUp: 2 }
    },
    {
      id: '3',
      author: 'Carol Davis',
      avatar: 'CD',
      time: '2024-02-18T16:20:00',
      content: 'Please ensure the accessibility guidelines are followed for color contrast and navigation. The WCAG 2.1 AA standards should be met.',
      reactions: { thumbsUp: 4, heart: 2 }
    },
    {
      id: '4',
      author: 'John Doe',
      avatar: 'JD',
      time: '2024-02-18T17:10:00',
      content: 'Great progress team! The wireframes look solid. Alice, could you also prepare some alternative layouts for A/B testing once we move to development?',
      reactions: { thumbsUp: 1 }
    }
  ],
  relatedTasks: [
    { id: '2', title: 'Frontend Development Setup', status: 'done', assignee: 'Bob Smith' },
    { id: '3', title: 'Content Strategy Planning', status: 'todo', assignee: 'Carol Davis' },
    { id: '6', title: 'Performance Optimization', status: 'in-progress', assignee: 'Frank Wilson' }
  ],
  activityFeed: [
    { id: '1', type: 'comment', user: 'John Doe', action: 'added a comment', time: '2024-02-18T17:10:00' },
    { id: '2', type: 'subtask', user: 'Alice Johnson', action: 'completed subtask "Wireframe creation"', time: '2024-02-18T16:45:00' },
    { id: '3', type: 'attachment', user: 'Alice Johnson', action: 'uploaded Homepage_Wireframes_v1.pdf', time: '2024-02-18T14:20:00' },
    { id: '4', type: 'status', user: 'Bob Smith', action: 'moved task to In Progress', time: '2024-02-18T10:15:00' }
  ]
};

export const TaskDetails = ({ taskId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [task, setTask] = useState(taskData);

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

  const toggleSubtask = (subtaskId) => {
    setTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask =>
        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
      )
    }));
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'Current User',
        avatar: 'CU',
        time: new Date().toISOString(),
        content: newComment,
        reactions: {}
      };
      setTask(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      setNewComment('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const progressPercentage = (completedSubtasks / task.subtasks.length) * 100;
  const isOverdue = new Date(task.dueDate) < new Date();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'subtasks', label: 'Subtasks', icon: '✅' },
    { id: 'comments', label: 'Comments', icon: '💬' },
    { id: 'activity', label: 'Activity', icon: '📊' }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <button 
              onClick={() => onNavigate('project-task-list')}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-3xl font-bold text-[#333333]">{task.title}</h1>
                <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </div>
                <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-[#666666]">
                <span>{task.project}</span>
                <span>•</span>
                <span>Created {new Date(task.createdDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>Updated {formatTimeAgo(task.updatedDate)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigate('edit-task', taskId)}
              className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:text-[#048ba8] transition-colors"
            >
              <Edit className="w-5 h-5" />
              <span>Edit</span>
            </button>
            <button className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{task.progress}%</div>
          <div className="text-[#666666]">Progress</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">{completedSubtasks}/{task.subtasks.length}</div>
          <div className="text-[#666666]">Subtasks</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">{task.loggedHours}h</div>
          <div className="text-[#666666]">Logged / {task.estimatedHours}h</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#FF9800] mb-2">{task.comments.length}</div>
          <div className="text-[#666666]">Comments</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card p-2 rounded-3xl">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'neu-primary text-white'
                  : 'text-[#666666] hover:text-[#333333]'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Description */}
              <div className="neu-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#333333] mb-6">Description</h3>
                <div className="neu-card-inset p-6 rounded-2xl">
                  <p className="text-[#666666] leading-relaxed">{task.description}</p>
                </div>
              </div>

              {/* Assignees */}
              <div className="neu-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#333333] mb-6">Assigned Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {task.assignees.map((assignee, index) => (
                    <div key={index} className="neu-small p-6 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-[#05A7CC] text-white text-lg">
                            {assignee.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-lg font-bold text-[#333333]">{assignee.name}</h4>
                          <p className="text-[#666666] mb-1">{assignee.role}</p>
                          <p className="text-sm text-[#999999]">{assignee.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="neu-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#333333] mb-6">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {task.tags.map((tag, index) => (
                    <div key={index} className="neu-small px-4 py-2 rounded-xl flex items-center space-x-2">
                      <Flag className="w-4 h-4 text-[#05A7CC]" />
                      <span className="text-sm font-medium text-[#05A7CC]">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'subtasks' && (
            <div className="neu-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#333333]">Subtasks</h3>
                <button 
                  onClick={() => onNavigate('subtasks-management', taskId)}
                  className="neu-button px-4 py-2 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subtask
                </button>
              </div>
              
              <div className="neu-card-inset rounded-full h-3 overflow-hidden mb-6">
                <div 
                  className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="space-y-4">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="neu-small p-6 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleSubtask(subtask.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          subtask.completed 
                            ? 'neu-primary' 
                            : 'neu-card-inset hover:bg-[#E8EBEF]'
                        }`}
                      >
                        {subtask.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </button>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          subtask.completed 
                            ? 'text-[#666666] line-through' 
                            : 'text-[#333333]'
                        }`}>
                          {subtask.title}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-[#666666]">
                          <span>Assigned to: {subtask.assignee}</span>
                          <span>Due: {new Date(subtask.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Comments</h3>
              
              {/* Add Comment */}
              <div className="neu-card-inset p-6 rounded-2xl mb-6">
                <div className="flex space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-[#05A7CC] text-white">CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="neu-input p-4 rounded-2xl mb-3">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={3}
                        className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                      />
                    </div>
                    <button 
                      onClick={addComment}
                      className="neu-primary px-6 py-2 rounded-2xl flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#666666] text-white">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="neu-small p-4 rounded-2xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-bold text-[#333333]">{comment.author}</span>
                          <span className="text-sm text-[#666666]">{formatTimeAgo(comment.time)}</span>
                        </div>
                        <p className="text-[#666666] mb-3">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                          <button className="text-sm text-[#666666] hover:text-[#05A7CC] transition-colors">
                            👍 {comment.reactions.thumbsUp || 0}
                          </button>
                          <button className="text-sm text-[#666666] hover:text-[#EF5226] transition-colors">
                            ❤️ {comment.reactions.heart || 0}
                          </button>
                          <button className="text-sm text-[#666666] hover:text-[#05A7CC] transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Activity Feed</h3>
              <div className="space-y-4">
                {task.activityFeed.map((activity) => (
                  <div key={activity.id} className="neu-small p-4 rounded-2xl flex items-center space-x-4">
                    <div className="neu-card-inset w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-sm">
                        {activity.type === 'comment' && '💬'}
                        {activity.type === 'subtask' && '✅'}
                        {activity.type === 'attachment' && '📎'}
                        {activity.type === 'status' && '🔄'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#333333]">
                        {activity.user} {activity.action}
                      </div>
                      <div className="text-sm text-[#666666]">{formatTimeAgo(activity.time)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Task Info */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Task Details</h3>
            
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-4 h-4 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Due Date</span>
                </div>
                <div className={`text-sm ${isOverdue ? 'text-[#EF5226] font-medium' : 'text-[#666666]'}`}>
                  {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue && <span className="ml-2">OVERDUE</span>}
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-4 h-4 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Time Tracking</span>
                </div>
                <div className="text-sm text-[#666666]">
                  {task.loggedHours}h logged / {task.estimatedHours}h estimated
                </div>
                <div className="neu-card-inset rounded-full h-2 overflow-hidden mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-[#9C27B0] to-[#7B1FA2] transition-all duration-500"
                    style={{ width: `${(task.loggedHours / task.estimatedHours) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Flag className="w-4 h-4 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Priority</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Attachments</h3>
              <button className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8]">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {task.attachments.map((file) => (
                <div key={file.id} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="neu-card-inset p-2 rounded-lg">
                        <Paperclip className="w-4 h-4 text-[#666666]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#333333] text-sm">{file.name}</div>
                        <div className="text-xs text-[#666666]">
                          {file.size} • {file.type} • {file.uploadedBy}
                        </div>
                      </div>
                    </div>
                    <button className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8]">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tasks */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Related Tasks</h3>
            <div className="space-y-3">
              {task.relatedTasks.map((relatedTask) => (
                <div key={relatedTask.id} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#333333] text-sm">{relatedTask.title}</div>
                      <div className="text-xs text-[#666666]">{relatedTask.assignee}</div>
                    </div>
                    <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(relatedTask.status)}`}>
                      {relatedTask.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('subtasks-management', taskId)}
                className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Manage Subtasks</span>
                </div>
              </button>
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Log Time</span>
                </div>
              </button>
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Assign to Someone</span>
                </div>
              </button>
              <button className="w-full neu-primary p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Mark as Complete</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;