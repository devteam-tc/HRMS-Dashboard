import React, { useState } from 'react';
import { ArrowLeft, Filter, Users, Calendar, Upload, Edit, MapPin, FileText, Image, CheckCircle, AlertTriangle, Clock, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const activities = [
  {
    id: '1',
    type: 'site_visit',
    user: 'John Doe',
    userRole: 'Project Manager',
    timestamp: '2024-01-18T14:30:00',
    title: 'Completed weekly site inspection',
    description: 'Conducted comprehensive inspection of foundation work. All quality checks passed.',
    relatedItems: ['Foundation Section A', 'Quality Report Q1-001'],
    status: 'completed',
    priority: 'normal'
  },
  {
    id: '2',
    type: 'file_upload',
    user: 'Alice Johnson',
    userRole: 'Site Engineer',
    timestamp: '2024-01-18T11:15:00',
    title: 'Uploaded progress photos',
    description: 'Added 12 photos showing steel framework installation progress on floors 5-8.',
    relatedItems: ['Steel_Framework_Progress.jpg', '+11 more files'],
    status: 'completed',
    priority: 'normal'
  },
  {
    id: '3',
    type: 'milestone',
    user: 'System',
    userRole: 'Automated',
    timestamp: '2024-01-17T16:45:00',
    title: 'Milestone achieved: Structural Framework 100% complete',
    description: 'All structural framework components have been completed ahead of schedule.',
    relatedItems: ['Structural Framework Phase'],
    status: 'completed',
    priority: 'high'
  },
  {
    id: '4',
    type: 'budget_update',
    user: 'Carol Davis',
    userRole: 'Project Coordinator',
    timestamp: '2024-01-17T09:20:00',
    title: 'Budget allocation updated',
    description: 'Adjusted budget allocation for material costs. Total increase of $45,000 approved.',
    relatedItems: ['Budget Report B-2024-001', 'Approval Form AF-156'],
    status: 'completed',
    priority: 'high'
  },
  {
    id: '5',
    type: 'issue',
    user: 'Bob Smith',
    userRole: 'Safety Officer',
    timestamp: '2024-01-16T13:10:00',
    title: 'Safety concern reported',
    description: 'Minor safety violation observed in zone C. Immediate corrective action taken.',
    relatedItems: ['Safety Report SR-2024-003', 'Corrective Action CA-089'],
    status: 'resolved',
    priority: 'high'
  },
  {
    id: '6',
    type: 'team_update',
    user: 'John Doe',
    userRole: 'Project Manager',
    timestamp: '2024-01-16T10:30:00',
    title: 'Team member added to project',
    description: 'David Brown (Electrical Engineer) has been assigned to the project team.',
    relatedItems: ['Team Assignment TA-2024-012'],
    status: 'completed',
    priority: 'normal'
  },
  {
    id: '7',
    type: 'schedule_change',
    user: 'Alice Johnson',
    userRole: 'Site Engineer',
    timestamp: '2024-01-15T15:45:00',
    title: 'Schedule adjustment made',
    description: 'Exterior cladding phase moved up by 3 days due to favorable weather conditions.',
    relatedItems: ['Schedule Update SU-2024-008', 'Weather Report WR-001'],
    status: 'completed',
    priority: 'normal'
  },
  {
    id: '8',
    type: 'quality_check',
    user: 'Emma Garcia',
    userRole: 'Quality Inspector',
    timestamp: '2024-01-15T08:00:00',
    title: 'Quality inspection completed',
    description: 'Material quality inspection for concrete batch #47. All samples passed testing.',
    relatedItems: ['Quality Report QR-2024-015', 'Test Results TR-047'],
    status: 'completed',
    priority: 'normal'
  }
];

export const ProjectActivityFeed = ({ projectId, onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;
    const matchesUser = selectedUser === 'all' || activity.user === selectedUser;
    
    return matchesFilter && matchesUser;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'site_visit':
        return <MapPin className="w-5 h-5 text-[#05A7CC]" />;
      case 'file_upload':
        return <Upload className="w-5 h-5 text-[#4CAF50]" />;
      case 'milestone':
        return <CheckCircle className="w-5 h-5 text-[#9C27B0]" />;
      case 'budget_update':
        return <FileText className="w-5 h-5 text-[#FF9800]" />;
      case 'issue':
        return <AlertTriangle className="w-5 h-5 text-[#EF5226]" />;
      case 'team_update':
        return <Users className="w-5 h-5 text-[#607D8B]" />;
      case 'schedule_change':
        return <Calendar className="w-5 h-5 text-[#795548]" />;
      case 'quality_check':
        return <CheckCircle className="w-5 h-5 text-[#4CAF50]" />;
      default:
        return <Clock className="w-5 h-5 text-[#666666]" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'site_visit':
        return 'bg-[#05A7CC]';
      case 'file_upload':
        return 'bg-[#4CAF50]';
      case 'milestone':
        return 'bg-[#9C27B0]';
      case 'budget_update':
        return 'bg-[#FF9800]';
      case 'issue':
        return 'bg-[#EF5226]';
      case 'team_update':
        return 'bg-[#607D8B]';
      case 'schedule_change':
        return 'bg-[#795548]';
      case 'quality_check':
        return 'bg-[#4CAF50]';
      default:
        return 'bg-[#666666]';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF5226] text-white';
      case 'normal':
        return 'bg-[#05A7CC] text-white';
      case 'low':
        return 'bg-[#666666] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const uniqueUsers = [...new Set(activities.map(activity => activity.user))].filter(user => user !== 'System');

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('project-details', projectId)}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Project Activity Feed</h1>
              <p className="text-[#666666]">Real-time updates and changes for Downtown Office Complex</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Comments</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-[#666666]" />
              <span className="font-medium text-[#333333]">Filters:</span>
            </div>
            
            <div className="neu-input p-3 rounded-2xl">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Activities</option>
                <option value="site_visit">Site Visits</option>
                <option value="file_upload">File Uploads</option>
                <option value="milestone">Milestones</option>
                <option value="budget_update">Budget Updates</option>
                <option value="issue">Issues</option>
                <option value="team_update">Team Updates</option>
                <option value="schedule_change">Schedule Changes</option>
                <option value="quality_check">Quality Checks</option>
              </select>
            </div>

            <div className="neu-input p-3 rounded-2xl">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Users</option>
                {uniqueUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div className="neu-input p-3 rounded-2xl">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          <div className="text-[#666666]">
            Showing {filteredActivities.length} of {activities.length} activities
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-8">Recent Activities</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#d1d9e6]"></div>
          
          {/* Activities */}
          <div className="space-y-6">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="relative flex items-start space-x-6">
                {/* Timeline Dot */}
                <div className={`w-4 h-4 rounded-full ${getActivityColor(activity.type)} z-10 flex-shrink-0 mt-2`}></div>
                
                {/* Content */}
                <div className="flex-1 neu-small p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* User Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white">
                          {activity.user === 'System' ? 'SYS' : activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* Activity Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-bold text-[#333333]">{activity.title}</h4>
                          <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                            {activity.priority.toUpperCase()}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3 text-sm text-[#666666]">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-[#333333]">{activity.user}</span>
                            <span>•</span>
                            <span>{activity.userRole}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimeAgo(activity.timestamp)}</span>
                          </div>
                        </div>
                        
                        <p className="text-[#666666] mb-4 leading-relaxed">{activity.description}</p>
                        
                        {/* Related Items */}
                        {activity.relatedItems && activity.relatedItems.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {activity.relatedItems.map((item, itemIndex) => (
                              <div key={itemIndex} className="neu-card-inset px-3 py-1 rounded-xl">
                                <span className="text-xs font-medium text-[#05A7CC]">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Activity Icon */}
                    <div className={`neu-card-inset p-3 rounded-2xl ${getActivityColor(activity.type)} bg-opacity-10`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <Clock className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No activities found</h3>
              <p className="text-[#666666]">Try adjusting your filters to see more activities.</p>
            </div>
          </div>
        )}
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">
            {activities.filter(a => a.type === 'site_visit').length}
          </div>
          <div className="text-[#666666]">Site Visits</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {activities.filter(a => a.type === 'file_upload').length}
          </div>
          <div className="text-[#666666]">Files Uploaded</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">
            {activities.filter(a => a.type === 'milestone').length}
          </div>
          <div className="text-[#666666]">Milestones</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#EF5226] mb-2">
            {activities.filter(a => a.type === 'issue').length}
          </div>
          <div className="text-[#666666]">Issues Resolved</div>
        </div>
      </div>

      {/* Load More */}
      {filteredActivities.length > 0 && (
        <div className="text-center">
          <button className="neu-button px-8 py-4 rounded-2xl hover:scale-105 transition-transform">
            <span className="font-medium text-[#333333]">Load More Activities</span>
          </button>
        </div>
      )}
    </div>
  );
};