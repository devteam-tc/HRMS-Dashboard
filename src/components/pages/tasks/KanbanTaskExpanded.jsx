import React, { useState } from 'react';
import { X, Edit, Trash2, Calendar, Flag, Users, MessageSquare, Paperclip, Plus, CheckCircle, Clock, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const taskData = {
  id: '1',
  title: 'Design Homepage Mockup',
  description: 'Create wireframes and high-fidelity mockups for the new homepage design. This includes user research, competitive analysis, and iterative design improvements based on stakeholder feedback.',
  status: 'in-progress',
  priority: 'high',
  assignees: [
    { name: 'Alice Johnson', role: 'UI/UX Designer', email: 'alice@company.com' },
    { name: 'Bob Smith', role: 'Frontend Developer', email: 'bob@company.com' }
  ],
  dueDate: '2024-02-20',
  createdDate: '2024-02-10',
  project: 'Website Redesign',
  tags: ['Design', 'UI/UX', 'Frontend'],
  subtasks: [
    { id: '1', title: 'User research and persona analysis', completed: true },
    { id: '2', title: 'Wireframe creation for mobile and desktop', completed: true },
    { id: '3', title: 'High-fidelity mockup design', completed: false },
    { id: '4', title: 'Stakeholder review and feedback', completed: false },
    { id: '5', title: 'Design iteration and finalization', completed: false }
  ],
  attachments: [
    { name: 'Homepage_Wireframes_v1.pdf', size: '2.4 MB', type: 'PDF' },
    { name: 'User_Research_Report.docx', size: '1.8 MB', type: 'Word' }
  ],
  comments: [
    {
      id: '1',
      author: 'Alice Johnson',
      time: '2 hours ago',
      content: 'Initial wireframes are ready for review. I\'ve incorporated the feedback from the last stakeholder meeting.',
      avatar: 'AJ'
    },
    {
      id: '2',
      author: 'Bob Smith',
      time: '1 hour ago',
      content: 'Looks great! The mobile responsive design is much cleaner now. When can we expect the high-fidelity mockups?',
      avatar: 'BS'
    },
    {
      id: '3',
      author: 'Carol Davis',
      time: '30 minutes ago',
      content: 'Please ensure the accessibility guidelines are followed for color contrast and navigation.',
      avatar: 'CD'
    }
  ]
};

export const KanbanTaskExpanded = ({ taskId, onNavigate, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(taskData);
  const [newComment, setNewComment] = useState('');

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
        time: 'Just now',
        content: newComment,
        avatar: 'CU'
      };
      setTask(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      setNewComment('');
    }
  };

  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const progressPercentage = (completedSubtasks / task.subtasks.length) * 100;

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="neu-card p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="flex items-center space-x-3 mb-3">
              <h2 className="text-2xl font-bold text-[#333333]">{task.title}</h2>
              <div className={`neu-small px-3 py-1 rounded-xl text-sm font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </div>
              <div className={`neu-small px-3 py-1 rounded-xl text-sm font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>
            <div className="text-[#666666] mb-4">{task.project}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onNavigate('edit-task', taskId)}
              className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('task-kanban')}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Description</h3>
              <p className="text-[#666666] leading-relaxed">{task.description}</p>
            </div>

            {/* Subtasks */}
            <div className="neu-small p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#333333]">Subtasks</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-[#666666]">
                    {completedSubtasks}/{task.subtasks.length} completed
                  </span>
                  <span className="text-sm font-bold text-[#333333]">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
              
              <div className="neu-card-inset rounded-full h-2 overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="space-y-3">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleSubtask(subtask.id)}
                      className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                        subtask.completed 
                          ? 'neu-primary' 
                          : 'neu-card-inset hover:bg-[#E8EBEF]'
                      }`}
                    >
                      {subtask.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`flex-1 ${
                      subtask.completed 
                        ? 'text-[#666666] line-through' 
                        : 'text-[#333333]'
                    }`}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Comments</h3>
              
              {/* Add Comment */}
              <div className="neu-card-inset p-4 rounded-2xl mb-4">
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-[#05A7CC] text-white text-sm">CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="neu-input p-3 rounded-2xl mb-3">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={2}
                        className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                      />
                    </div>
                    <button 
                      onClick={addComment}
                      className="neu-primary px-4 py-2 rounded-2xl flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#666666] text-white text-sm">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 neu-card-inset p-3 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-[#333333] text-sm">{comment.author}</span>
                        <span className="text-xs text-[#666666]">{comment.time}</span>
                      </div>
                      <p className="text-[#666666] text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Info */}
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Task Details</h3>
              
              <div className="space-y-4">
                <div className="neu-card-inset p-3 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#666666]" />
                    <span className="text-sm font-medium text-[#333333]">Due Date</span>
                  </div>
                  <div className={`text-sm ${isOverdue ? 'text-[#EF5226] font-medium' : 'text-[#666666]'}`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                    {isOverdue && <span className="ml-2">OVERDUE</span>}
                  </div>
                </div>

                <div className="neu-card-inset p-3 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-[#666666]" />
                    <span className="text-sm font-medium text-[#333333]">Created</span>
                  </div>
                  <div className="text-sm text-[#666666]">
                    {new Date(task.createdDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="neu-card-inset p-3 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Flag className="w-4 h-4 text-[#666666]" />
                    <span className="text-sm font-medium text-[#333333]">Priority</span>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Assignees */}
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Assigned To</h3>
              <div className="space-y-3">
                {task.assignees.map((assignee, index) => (
                  <div key={index} className="neu-card-inset p-3 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white">
                          {assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#333333] text-sm">{assignee.name}</div>
                        <div className="text-xs text-[#666666]">{assignee.role}</div>
                        <div className="text-xs text-[#999999]">{assignee.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <div key={index} className="neu-card-inset px-3 py-1 rounded-xl">
                    <span className="text-sm font-medium text-[#05A7CC]">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div className="neu-small p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#333333]">Attachments</h3>
                <button className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8]">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {task.attachments.map((file, index) => (
                  <div key={index} className="neu-card-inset p-3 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="neu-small p-2 rounded-lg">
                        <Paperclip className="w-4 h-4 text-[#666666]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#333333] text-sm">{file.name}</div>
                        <div className="text-xs text-[#666666]">{file.size} • {file.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="neu-small p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('task-details', taskId)}
                  className="w-full neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                >
                  View Full Details
                </button>
                <button 
                  onClick={() => onNavigate('subtasks-management', taskId)}
                  className="w-full neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
                >
                  Manage Subtasks
                </button>
                <button className="w-full neu-button p-3 rounded-2xl text-[#4CAF50] hover:text-[#45a049] transition-colors">
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};