import React, { useState } from 'react';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, User, Briefcase, Clock, CheckCircle, AlertCircle, FileText, MessageSquare } from 'lucide-react';

export const OnboardingDetails = ({ onNavigate, employeeId }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const employee = {
    id: employeeId || 1,
    name: 'Alice Johnson',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'alice.johnson@company.com',
    phone: '+1 (555) 123-4567',
    personalEmail: 'alice.personal@gmail.com',
    joinDate: '2024-01-15',
    manager: 'John Smith',
    buddy: 'Sarah Davis',
    workLocation: 'San Francisco Office',
    employmentType: 'Full Time',
    salary: '$85,000',
    status: 'In Progress',
    progress: 85,
    daysRemaining: 2,
    address: '123 Main St, San Francisco, CA 94111',
    emergencyContact: 'Bob Johnson - +1 (555) 987-6543'
  };

  const timelineEvents = [
    {
      date: '2024-01-09',
      time: '10:00 AM',
      title: 'Welcome Email Sent',
      description: 'Welcome email with first day instructions sent successfully',
      type: 'email',
      status: 'completed'
    },
    {
      date: '2024-01-12',
      time: '2:30 PM',
      title: 'Workspace Prepared',
      description: 'Desk #45 assigned and set up with basic office supplies',
      type: 'setup',
      status: 'completed'
    },
    {
      date: '2024-01-14',
      time: '11:15 AM',
      title: 'Hardware Allocation Started',
      description: 'IT team began laptop configuration and accessory preparation',
      type: 'hardware',
      status: 'completed'
    },
    {
      date: '2024-01-15',
      time: '9:00 AM',
      title: 'First Day Started',
      description: 'Employee arrived for first day, office tour completed',
      type: 'milestone',
      status: 'completed'
    },
    {
      date: '2024-01-15',
      time: '11:00 AM',
      title: 'IT Accounts Created',
      description: 'Email account and system access credentials generated',
      type: 'system',
      status: 'completed'
    },
    {
      date: '2024-01-15',
      time: '2:00 PM',
      title: 'Manager Meeting',
      description: 'Initial meeting with direct manager John Smith completed',
      type: 'meeting',
      status: 'completed'
    },
    {
      date: '2024-01-16',
      time: '10:00 AM',
      title: 'Buddy Introduction',
      description: 'Met with assigned buddy Sarah Davis, buddy system explained',
      type: 'meeting',
      status: 'completed'
    },
    {
      date: '2024-01-17',
      time: '9:30 AM',
      title: 'Company Orientation',
      description: 'Attended company overview and culture introduction session',
      type: 'training',
      status: 'completed'
    },
    {
      date: '2024-01-18',
      time: '1:00 PM',
      title: 'Security Training Scheduled',
      description: 'Mandatory security training session scheduled for tomorrow',
      type: 'training',
      status: 'pending'
    },
    {
      date: '2024-01-19',
      time: '10:00 AM',
      title: 'Security Training',
      description: 'Complete mandatory security and compliance training',
      type: 'training',
      status: 'upcoming'
    },
    {
      date: '2024-01-22',
      time: '9:00 AM',
      title: 'Technical Training',
      description: 'Begin role-specific technical training program',
      type: 'training',
      status: 'upcoming'
    }
  ];

  const documents = [
    { name: 'Resume/CV', status: 'approved', uploadDate: '2024-01-08', type: 'pdf' },
    { name: 'Photo ID', status: 'approved', uploadDate: '2024-01-08', type: 'pdf' },
    { name: 'Educational Certificates', status: 'approved', uploadDate: '2024-01-09', type: 'pdf' },
    { name: 'Bank Details', status: 'pending', uploadDate: '2024-01-10', type: 'pdf' },
    { name: 'I-9 Form', status: 'completed', uploadDate: '2024-01-15', type: 'pdf' },
    { name: 'W-4 Form', status: 'completed', uploadDate: '2024-01-15', type: 'pdf' },
    { name: 'Emergency Contact Form', status: 'completed', uploadDate: '2024-01-15', type: 'pdf' }
  ];

  const checklistProgress = [
    { section: 'Pre-boarding', completed: 3, total: 3, percentage: 100 },
    { section: 'First Day', completed: 4, total: 4, percentage: 100 },
    { section: 'First Week', completed: 3, total: 4, percentage: 75 },
    { section: 'First Month', completed: 0, total: 3, percentage: 0 }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'email': return Mail;
      case 'setup': return User;
      case 'hardware': return Briefcase;
      case 'milestone': return CheckCircle;
      case 'system': return FileText;
      case 'meeting': return MessageSquare;
      case 'training': return Clock;
      default: return AlertCircle;
    }
  };

  const getEventColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-orange-600';
      case 'upcoming': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-orange-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'documents', name: 'Documents' },
    { id: 'checklist', name: 'Checklist Progress' }
  ];

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('onboarding-list')}
            className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="mb-1 text-[#333333]">Onboarding Details</h1>
            <p className="text-[#666666]">{employee.name} - {employee.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('onboarding-checklist', { employeeId: employee.id })}
            className="neu-button px-4 py-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
          >
            View Checklist
          </button>
          <button className="neu-secondary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200">
            <Edit className="h-5 w-5" />
            Edit Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Employee Summary Card */}
        <div className="neu-card p-6 rounded-2xl">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 neu-button rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-[#05A7CC]" />
            </div>
            <h2 className="text-xl font-semibold text-[#333333] mb-2">{employee.name}</h2>
            <p className="text-[#666666] mb-4">{employee.position}</p>
            
            {/* Progress Circle */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#E8EBEF]"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#05A7CC]"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${employee.progress}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-[#05A7CC]">{employee.progress}%</span>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-sm neu-small inline-block ${
              employee.status === 'In Progress' ? 'text-blue-600' : 
              employee.status === 'Completed' ? 'text-green-600' : 'text-gray-600'
            }`}>
              {employee.status}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-[#666666]" />
              <span className="text-[#333333]">{employee.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-[#666666]" />
              <span className="text-[#333333]">{employee.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-[#666666]" />
              <span className="text-[#333333]">{employee.workLocation}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-[#666666]" />
              <span className="text-[#333333]">Joined: {employee.joinDate}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-[#666666]" />
              <span className="text-[#333333]">{employee.daysRemaining} days remaining</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E8EBEF]">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Department</label>
                <p className="text-[#333333]">{employee.department}</p>
              </div>
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Manager</label>
                <p className="text-[#333333]">{employee.manager}</p>
              </div>
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Buddy</label>
                <p className="text-[#333333]">{employee.buddy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="neu-card p-2 rounded-2xl mb-6">
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'neu-primary text-white' 
                      : 'text-[#666666] hover:text-[#05A7CC]'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="neu-card p-6 rounded-2xl">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">Employee Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-[#666666] uppercase tracking-wide mb-1 block">Personal Information</label>
                    <div className="neu-small p-4 rounded-xl space-y-2">
                      <p><span className="font-medium">Name:</span> {employee.name}</p>
                      <p><span className="font-medium">Personal Email:</span> {employee.personalEmail}</p>
                      <p><span className="font-medium">Address:</span> {employee.address}</p>
                      <p><span className="font-medium">Emergency Contact:</span> {employee.emergencyContact}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-[#666666] uppercase tracking-wide mb-1 block">Employment Details</label>
                    <div className="neu-small p-4 rounded-xl space-y-2">
                      <p><span className="font-medium">Position:</span> {employee.position}</p>
                      <p><span className="font-medium">Department:</span> {employee.department}</p>
                      <p><span className="font-medium">Employment Type:</span> {employee.employmentType}</p>
                      <p><span className="font-medium">Salary:</span> {employee.salary}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#666666] uppercase tracking-wide mb-1 block">Onboarding Progress</label>
                  <div className="neu-small p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-[#333333]">Overall Progress</span>
                      <span className="text-[#05A7CC] font-semibold">{employee.progress}%</span>
                    </div>
                    <div className="w-full neu-card-inset rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                        style={{ width: `${employee.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-[#666666] mt-2">
                      Expected completion in {employee.daysRemaining} days
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">Onboarding Timeline</h3>
                
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => {
                    const EventIcon = getEventIcon(event.type);
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                          event.status === 'completed' ? 'neu-primary' : 
                          event.status === 'pending' ? 'neu-secondary' : 'neu-button'
                        }`}>
                          <EventIcon className={`h-5 w-5 ${
                            event.status === 'completed' || event.status === 'pending' ? 'text-white' : 'text-[#05A7CC]'
                          }`} />
                        </div>
                        <div className="flex-1 neu-small p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-[#333333]">{event.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-[#666666]">
                              <span>{event.date}</span>
                              <span>{event.time}</span>
                              <span className={`px-2 py-1 rounded-full neu-card capitalize ${getEventColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-[#666666]">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">Documents</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="neu-small p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-[#05A7CC]" />
                          <span className="font-medium text-[#333333]">{doc.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full neu-card capitalize ${getDocumentStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#666666]">
                        <p>Uploaded: {doc.uploadDate}</p>
                        <p>Type: {doc.type.toUpperCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">Checklist Progress</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {checklistProgress.map((section, index) => (
                    <div key={index} className="neu-small p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-[#333333]">{section.section}</h4>
                        <span className="text-[#05A7CC] font-semibold">{section.percentage}%</span>
                      </div>
                      <div className="w-full neu-card-inset rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                          style={{ width: `${section.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#666666]">
                        {section.completed} of {section.total} items completed
                      </p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => onNavigate('onboarding-checklist', { employeeId: employee.id })}
                  className="w-full neu-button p-4 rounded-xl text-[#05A7CC] hover:scale-102 transition-all duration-200"
                >
                  View Detailed Checklist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};