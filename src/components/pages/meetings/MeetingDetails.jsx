import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Download, FileText, MessageSquare, Send, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const meetingData = {
  id: '1',
  title: 'Weekly Team Standup',
  date: '2024-01-15',
  time: '09:00 AM - 09:30 AM',
  duration: '30 minutes',
  location: 'Conference Room A',
  department: 'Engineering',
  organizer: 'John Doe',
  status: 'completed',
  description: 'Weekly standup meeting to discuss progress, blockers, and upcoming tasks for the engineering team.',
  agenda: [
    'Review last week\'s progress',
    'Discuss current blockers',
    'Sprint planning for upcoming week',
    'Code review assignments',
    'Technical discussions'
  ],
  participants: [
    { name: 'John Doe', email: 'john.doe@company.com', role: 'Team Lead', attended: true },
    { name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Senior Developer', attended: true },
    { name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'Frontend Developer', attended: true },
    { name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Backend Developer', attended: false }
  ],
  attachments: [
    { name: 'Sprint_Planning_Document.pdf', size: '2.4 MB', type: 'PDF', uploadedBy: 'John Doe' },
    { name: 'Team_Progress_Report.xlsx', size: '1.8 MB', type: 'Excel', uploadedBy: 'Jane Smith' }
  ],
  minutes: `Meeting started at 9:00 AM with John Doe as the facilitator.

**Progress Review:**
- Jane completed the user authentication module
- Mike finished the dashboard redesign
- Database optimization is 80% complete

**Current Blockers:**
- Waiting for API approval from security team
- Need clarification on new UI requirements
- Server deployment delayed due to infrastructure issues

**Action Items:**
1. John to follow up with security team by Wednesday
2. Jane to schedule UI requirements meeting with design team
3. Mike to prepare backup deployment plan
4. Sarah (absent) to be updated via email

**Next Steps:**
- Continue with sprint goals
- Schedule follow-up meeting for Thursday
- Review deployment timeline next week

Meeting ended at 9:28 AM.`,
  comments: [
    {
      id: '1',
      author: 'Jane Smith',
      time: '2 hours ago',
      content: 'Thanks for the clear action items. I\'ll set up the UI meeting for tomorrow.',
      replies: [
        {
          id: '1-1',
          author: 'John Doe',
          time: '1 hour ago',
          content: 'Perfect! Please include the design team lead in that meeting.'
        }
      ]
    },
    {
      id: '2',
      author: 'Mike Johnson',
      time: '1 hour ago',
      content: 'The backup deployment plan is ready. Should I share it in the team channel?',
      replies: []
    }
  ]
};

export const MeetingDetails = ({ meetingId, onNavigate }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      // Add reply logic here
      console.log('Adding reply to', commentId, ':', replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      case 'scheduled':
        return 'bg-[#05A7CC] text-white';
      case 'cancelled':
        return 'bg-[#EF5226] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('all-meetings')}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#333333]">{meetingData.title}</h1>
                <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(meetingData.status)}`}>
                  {meetingData.status.toUpperCase()}
                </div>
              </div>
              <p className="text-[#666666]">Meeting details and minutes of meeting</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('edit-meeting', meetingId)}
            className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <Edit className="w-5 h-5" />
            <span className="font-medium">Edit Meeting</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Meeting Info */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Meeting Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="neu-small p-4 rounded-2xl flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-[#05A7CC]" />
                <div>
                  <div className="text-sm text-[#666666]">Date</div>
                  <div className="font-medium text-[#333333]">{new Date(meetingData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#05A7CC]" />
                <div>
                  <div className="text-sm text-[#666666]">Time</div>
                  <div className="font-medium text-[#333333]">{meetingData.time}</div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#05A7CC]" />
                <div>
                  <div className="text-sm text-[#666666]">Location</div>
                  <div className="font-medium text-[#333333]">{meetingData.location}</div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#05A7CC]" />
                <div>
                  <div className="text-sm text-[#666666]">Organizer</div>
                  <div className="font-medium text-[#333333]">{meetingData.organizer}</div>
                </div>
              </div>
            </div>

            <div className="neu-card-inset p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Description</h3>
              <p className="text-[#666666] leading-relaxed">{meetingData.description}</p>
            </div>
          </div>

          {/* Agenda */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Meeting Agenda</h2>
            <div className="space-y-3">
              {meetingData.agenda.map((item, index) => (
                <div key={index} className="neu-small p-4 rounded-2xl flex items-center space-x-4">
                  <div className="neu-card-inset w-8 h-8 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-[#05A7CC]">{index + 1}</span>
                  </div>
                  <span className="text-[#333333]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Minutes of Meeting */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Minutes of Meeting (MOM)</h2>
            <div className="neu-card-inset p-6 rounded-2xl">
              <div className="prose max-w-none text-[#333333] whitespace-pre-line">
                {meetingData.minutes}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Comments & Discussion</h2>
            
            {/* Add New Comment */}
            <div className="neu-card-inset p-6 rounded-2xl mb-6">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-[#05A7CC] text-white">JD</AvatarFallback>
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
                    onClick={handleAddComment}
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
              {meetingData.comments.map((comment) => (
                <div key={comment.id} className="neu-small p-6 rounded-2xl">
                  <div className="flex space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-[#333333]">{comment.author}</span>
                        <span className="text-sm text-[#666666]">{comment.time}</span>
                      </div>
                      <p className="text-[#333333] mb-3">{comment.content}</p>
                      
                      <button 
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-sm text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                      >
                        Reply
                      </button>

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="neu-card-inset p-4 rounded-2xl flex space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-avatar.jpg" />
                                <AvatarFallback className="bg-[#666666] text-white text-sm">
                                  {reply.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-[#333333] text-sm">{reply.author}</span>
                                  <span className="text-xs text-[#666666]">{reply.time}</span>
                                </div>
                                <p className="text-[#333333] text-sm">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div className="mt-4 neu-card-inset p-4 rounded-2xl">
                          <div className="neu-input p-3 rounded-2xl mb-3">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              rows={2}
                              className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleAddReply(comment.id)}
                              className="neu-primary px-4 py-2 rounded-xl text-sm"
                            >
                              Reply
                            </button>
                            <button 
                              onClick={() => setReplyingTo(null)}
                              className="neu-button px-4 py-2 rounded-xl text-sm text-[#666666]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Participants */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Participants</h3>
            <div className="space-y-4">
              {meetingData.participants.map((participant, index) => (
                <div key={index} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-[#333333]">{participant.name}</span>
                        <div className={`w-2 h-2 rounded-full ${participant.attended ? 'bg-[#4CAF50]' : 'bg-[#EF5226]'}`}></div>
                      </div>
                      <div className="text-sm text-[#666666]">{participant.role}</div>
                      <div className="text-xs text-[#999999]">{participant.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Attachments</h3>
            <div className="space-y-4">
              {meetingData.attachments.map((file, index) => (
                <div key={index} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="neu-card-inset p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-[#05A7CC]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#333333]">{file.name}</div>
                      <div className="text-sm text-[#666666]">{file.size} • {file.type}</div>
                      <div className="text-xs text-[#999999]">Uploaded by {file.uploadedBy}</div>
                    </div>
                    <button className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8]">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Schedule Follow-up</span>
                </div>
              </button>
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Export MOM</span>
                </div>
              </button>
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Send Summary</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};