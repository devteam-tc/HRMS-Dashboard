import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, CheckCircle, Clock, XCircle, ArrowRight, MessageSquare, FileText, Star } from 'lucide-react';

export const ApplicantProgress = ({ applicantId, onNavigate }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  // Mock applicant data
  const applicant = {
    id: applicantId || 1,
    name: 'Alice Johnson',
    appliedFor: 'Senior Software Engineer',
    appliedDate: '2024-01-18',
    currentStage: 'Interview',
    currentStatus: 'Technical Interview'
  };

  const progressStages = [
    {
      id: 1,
      name: 'Application Submitted',
      status: 'completed',
      date: '2024-01-18',
      time: '10:30 AM',
      description: 'Application and resume submitted successfully',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      details: [
        'Resume uploaded: alice_johnson_resume.pdf',
        'Cover letter included',
        'Application automatically screened',
        'Basic requirements met'
      ]
    },
    {
      id: 2,
      name: 'Initial Review',
      status: 'completed',
      date: '2024-01-19',
      time: '2:15 PM',
      description: 'Application reviewed by hiring team',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      reviewer: 'John Smith',
      details: [
        'Resume reviewed by hiring manager',
        'Skills assessment: 85% match',
        'Experience level: Meets requirements',
        'Rating: 4.5/5 stars'
      ]
    },
    {
      id: 3,
      name: 'Phone Screening',
      status: 'completed',
      date: '2024-01-22',
      time: '11:00 AM',
      description: 'Initial phone interview completed',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      interviewer: 'Sarah Wilson',
      duration: '30 minutes',
      details: [
        'Technical background discussion',
        'Career goals alignment',
        'Salary expectations: $110k-130k',
        'Availability: 2 weeks notice',
        'Outcome: Proceed to technical round'
      ]
    },
    {
      id: 4,
      name: 'Technical Interview',
      status: 'in-progress',
      date: '2024-01-25',
      time: '3:00 PM',
      description: 'Technical assessment and coding interview',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      interviewer: 'Michael Chen',
      duration: '90 minutes',
      details: [
        'Data structures and algorithms',
        'System design discussion',
        'Live coding session',
        'Architecture questions',
        'Status: Scheduled'
      ]
    },
    {
      id: 5,
      name: 'Team Interview',
      status: 'pending',
      date: 'TBD',
      time: 'TBD',
      description: 'Cultural fit and team collaboration assessment',
      icon: Clock,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      details: [
        'Meet potential team members',
        'Collaboration scenarios',
        'Cultural fit assessment',
        'Team dynamics evaluation'
      ]
    },
    {
      id: 6,
      name: 'Final Interview',
      status: 'pending',
      date: 'TBD',
      time: 'TBD',
      description: 'Final round with senior leadership',
      icon: Clock,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      details: [
        'Leadership interview',
        'Strategic thinking assessment',
        'Long-term vision discussion',
        'Final decision making'
      ]
    },
    {
      id: 7,
      name: 'Decision & Offer',
      status: 'pending',
      date: 'TBD',
      time: 'TBD',
      description: 'Final decision and offer preparation',
      icon: CheckCircle,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      details: [
        'Hiring committee review',
        'Reference checks',
        'Offer letter preparation',
        'Salary negotiation',
        'Background verification'
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={24} className="text-blue-600" />;
      case 'pending':
        return <Clock size={24} className="text-gray-400" />;
      case 'rejected':
        return <XCircle size={24} className="text-red-600" />;
      default:
        return <Clock size={24} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const currentStageIndex = progressStages.findIndex(stage => stage.status === 'in-progress');
  const completedStages = progressStages.filter(stage => stage.status === 'completed').length;
  const totalStages = progressStages.length;
  const progressPercentage = (completedStages / totalStages) * 100;

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('applicant-details', { applicantId: applicant.id })}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Application Progress</h1>
            <p className="text-[#666666]">{applicant.name} - {applicant.appliedFor}</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('applicant-details', { applicantId: applicant.id })}
          className="neu-primary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
        >
          View Full Profile
        </button>
      </div>

      {/* Progress Overview */}
      <div className="neu-card p-8 rounded-3xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="neu-small w-16 h-16 rounded-3xl flex items-center justify-center">
              <User size={32} className="text-[#666666]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-1">{applicant.name}</h3>
              <p className="text-[#EF5226] font-medium mb-1">{applicant.appliedFor}</p>
              <p className="text-[#666666] text-sm">Applied on {applicant.appliedDate}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#666666] text-sm mb-1">Current Stage</p>
            <p className="text-lg font-bold text-[#333333]">{applicant.currentStage}</p>
            <p className="text-[#05A7CC] text-sm">{applicant.currentStatus}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#666666]">Progress</span>
            <span className="text-[#333333] font-medium">{completedStages}/{totalStages} stages completed</span>
          </div>
          <div className="neu-card-inset rounded-2xl p-2">
            <div 
              className="h-4 bg-gradient-to-r from-[#05A7CC] to-[#EF5226] rounded-xl transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-[#666666]">
            <span>Application</span>
            <span>Review</span>
            <span>Interview</span>
            <span>Decision</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-8">Application Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E8EBEF]"></div>
              
              <div className="space-y-8">
                {progressStages.map((stage, index) => (
                  <div key={stage.id} className="relative flex items-start">
                    {/* Timeline Node */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#ECF0F3] ${getStatusColor(stage.status)}`}>
                      {getStatusIcon(stage.status)}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-6 flex-1">
                      <button
                        onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                        className="neu-small w-full p-6 rounded-3xl text-left hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-bold text-[#333333]">{stage.name}</h4>
                          <div className="flex items-center space-x-2">
                            {stage.date !== 'TBD' && (
                              <span className="text-[#666666] text-sm">{stage.date} at {stage.time}</span>
                            )}
                            <ArrowRight size={16} className={`text-[#666666] transition-transform duration-200 ${selectedStage === stage.id ? 'rotate-90' : ''}`} />
                          </div>
                        </div>
                        <p className="text-[#666666] mb-3">{stage.description}</p>
                        
                        {stage.reviewer && (
                          <div className="flex items-center text-sm text-[#666666]">
                            <User size={14} className="mr-1" />
                            <span>Reviewed by: {stage.reviewer}</span>
                          </div>
                        )}
                        
                        {stage.interviewer && (
                          <div className="flex items-center text-sm text-[#666666]">
                            <User size={14} className="mr-1" />
                            <span>Interviewer: {stage.interviewer}</span>
                            {stage.duration && <span className="ml-2">• Duration: {stage.duration}</span>}
                          </div>
                        )}
                      </button>
                      
                      {/* Expanded Details */}
                      {selectedStage === stage.id && (
                        <div className="mt-4 neu-card-inset p-6 rounded-3xl">
                          <h5 className="font-bold text-[#333333] mb-4">Stage Details</h5>
                          <ul className="space-y-2">
                            {stage.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-[#05A7CC] mr-3 mt-1">•</span>
                                <span className="text-[#333333] text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="neu-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Current Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Stage:</span>
                <span className="text-[#333333] font-medium">{applicant.currentStage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Status:</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-50">
                  {applicant.currentStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Days in Process:</span>
                <span className="text-[#333333] font-medium">7 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Next Action:</span>
                <span className="text-[#EF5226] font-medium">Technical Interview</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="neu-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-[#666666]">Completed</span>
                </div>
                <span className="text-[#333333] font-medium">{completedStages}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={16} className="text-blue-600 mr-2" />
                  <span className="text-[#666666]">In Progress</span>
                </div>
                <span className="text-[#333333] font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  <span className="text-[#666666]">Pending</span>
                </div>
                <span className="text-[#333333] font-medium">{totalStages - completedStages - 1}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-2" />
                  <span className="text-[#666666]">Overall Rating</span>
                </div>
                <span className="text-[#333333] font-medium">4.5/5</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="neu-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('applicant-actions', { applicantId: applicant.id })}
                className="neu-secondary w-full px-4 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
              >
                Take Action
              </button>
              <button
                onClick={() => onNavigate('new-interview', { applicantId: applicant.id })}
                className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
              >
                Schedule Interview
              </button>
              <button className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#EF5226] transition-all duration-200 flex items-center justify-center space-x-2">
                <MessageSquare size={16} />
                <span>Add Note</span>
              </button>
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="neu-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Timeline Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#666666]">Applied:</span>
                <span className="text-[#333333]">Jan 18, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">First Review:</span>
                <span className="text-[#333333]">Jan 19, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Phone Screen:</span>
                <span className="text-[#333333]">Jan 22, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Tech Interview:</span>
                <span className="text-[#05A7CC]">Jan 25, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Est. Decision:</span>
                <span className="text-[#666666]">Feb 2, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};