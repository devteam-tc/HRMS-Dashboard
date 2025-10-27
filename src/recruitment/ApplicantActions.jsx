import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, Calendar, Mail, MessageSquare, Star, User, Clock } from 'lucide-react';

export const ApplicantActions = ({ applicantId, onNavigate }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);

  // Mock applicant data
  const applicant = {
    id: applicantId || 1,
    name: 'Alice Johnson',
    appliedFor: 'Senior Software Engineer',
    currentStatus: 'Under Review',
    stage: 'Application'
  };

  const actions = [
    {
      id: 'shortlist',
      title: 'Shortlist Candidate',
      description: 'Move candidate to shortlisted pool for further review',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      nextStage: 'Shortlisted'
    },
    {
      id: 'interview',
      title: 'Schedule Interview',
      description: 'Schedule an interview with the candidate',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      nextStage: 'Interview'
    },
    {
      id: 'reject',
      title: 'Reject Application',
      description: 'Decline the application and notify candidate',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      nextStage: 'Rejected'
    },
    {
      id: 'hold',
      title: 'Put on Hold',
      description: 'Temporarily pause review of this application',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      nextStage: 'On Hold'
    }
  ];

  const rejectionReasons = [
    'Insufficient experience for the role',
    'Skills do not match requirements',
    'Salary expectations too high',
    'Location not suitable',
    'Better candidates found',
    'Position no longer available',
    'Other'
  ];

  const interviewTypes = [
    'Phone Screening',
    'Technical Interview',
    'Behavioral Interview',
    'System Design Interview',
    'Cultural Fit Interview',
    'Final Round Interview'
  ];

  const handleActionSubmit = () => {
    if (!selectedAction) return;

    const actionData = {
      applicantId: applicant.id,
      action: selectedAction,
      rejectionReason: selectedAction === 'reject' ? rejectionReason : null,
      interviewType: selectedAction === 'interview' ? interviewType : null,
      notes,
      rating: selectedAction === 'shortlist' ? rating : null,
      timestamp: new Date().toISOString()
    };

    console.log('Processing action:', actionData);

    // Navigate based on action
    switch (selectedAction) {
      case 'shortlist':
        onNavigate('applicant-details', { applicantId: applicant.id });
        break;
      case 'interview':
        onNavigate('new-interview', { applicantId: applicant.id, interviewType });
        break;
      case 'reject':
        onNavigate('applicants-list');
        break;
      case 'hold':
        onNavigate('applicant-details', { applicantId: applicant.id });
        break;
      default:
        onNavigate('applicants-list');
    }
  };

  const selectedActionData = actions.find(action => action.id === selectedAction);

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
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Take Action</h1>
            <p className="text-[#666666]">Review and act on {applicant.name}'s application</p>
          </div>
        </div>
      </div>

      {/* Applicant Summary */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="flex items-center space-x-4">
          <div className="neu-small w-12 h-12 rounded-3xl flex items-center justify-center">
            <User size={24} className="text-[#666666]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#333333] mb-1">{applicant.name}</h3>
            <p className="text-[#EF5226] font-medium mb-1">{applicant.appliedFor}</p>
            <p className="text-[#666666] text-sm">Current Status: {applicant.currentStatus}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Action Selection */}
        <div className="lg:col-span-2">
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Select Action</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`neu-small p-6 rounded-3xl transition-all duration-200 text-left hover:shadow-lg ${
                      selectedAction === action.id ? 'ring-2 ring-[#EF5226]' : ''
                    }`}
                  >
                    <div className={`neu-small w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${action.bgColor}`}>
                      <Icon size={24} className={action.color} />
                    </div>
                    <h4 className="font-bold text-[#333333] mb-2">{action.title}</h4>
                    <p className="text-[#666666] text-sm">{action.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Action-specific fields */}
            {selectedAction === 'reject' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Rejection Reason *</label>
                  <select
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="">Select reason...</option>
                    {rejectionReasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedAction === 'interview' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Interview Type *</label>
                  <select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="">Select interview type...</option>
                    {interviewTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedAction === 'shortlist' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Rate Candidate</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-colors duration-200"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                    <span className="text-[#666666] ml-2">
                      {rating > 0 ? `${rating}/5` : 'No rating'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-[#333333] font-medium mb-3">
                Notes {selectedAction === 'reject' ? '(Optional)' : ''}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none resize-none"
                placeholder={
                  selectedAction === 'shortlist' ? 'Add positive feedback about the candidate...' :
                  selectedAction === 'reject' ? 'Add any additional feedback (will not be shared with candidate)...' :
                  selectedAction === 'interview' ? 'Add notes about what to focus on during the interview...' :
                  'Add your notes...'
                }
              />
            </div>
          </div>
        </div>

        {/* Action Summary */}
        <div className="space-y-6">
          {selectedActionData && (
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Action Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`neu-small w-10 h-10 rounded-2xl flex items-center justify-center ${selectedActionData.bgColor}`}>
                    <selectedActionData.icon size={20} className={selectedActionData.color} />
                  </div>
                  <div>
                    <p className="font-medium text-[#333333]">{selectedActionData.title}</p>
                    <p className="text-[#666666] text-sm">Status will change to: {selectedActionData.nextStage}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8EBEF]">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Candidate:</span>
                      <span className="text-[#333333]">{applicant.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Position:</span>
                      <span className="text-[#333333]">{applicant.appliedFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Current Status:</span>
                      <span className="text-[#333333]">{applicant.currentStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">New Status:</span>
                      <span className="text-[#EF5226] font-medium">{selectedActionData.nextStage}</span>
                    </div>
                  </div>
                </div>

                {selectedAction === 'reject' && rejectionReason && (
                  <div className="pt-4 border-t border-[#E8EBEF]">
                    <p className="text-[#666666] text-sm mb-1">Rejection Reason:</p>
                    <p className="text-[#333333] text-sm">{rejectionReason}</p>
                  </div>
                )}

                {selectedAction === 'interview' && interviewType && (
                  <div className="pt-4 border-t border-[#E8EBEF]">
                    <p className="text-[#666666] text-sm mb-1">Interview Type:</p>
                    <p className="text-[#333333] text-sm">{interviewType}</p>
                  </div>
                )}

                {selectedAction === 'shortlist' && rating > 0 && (
                  <div className="pt-4 border-t border-[#E8EBEF]">
                    <p className="text-[#666666] text-sm mb-1">Rating:</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-[#333333] text-sm ml-2">{rating}/5</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Communication Options */}
          {selectedAction && (
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Communication</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 neu-small rounded-2xl">
                  <div className="flex items-center">
                    <Mail size={16} className="text-[#05A7CC] mr-3" />
                    <span className="text-[#333333] text-sm">Send email notification</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                {selectedAction !== 'reject' && (
                  <div className="flex items-center justify-between p-3 neu-small rounded-2xl">
                    <div className="flex items-center">
                      <MessageSquare size={16} className="text-[#EF5226] mr-3" />
                      <span className="text-[#333333] text-sm">Send SMS update</span>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleActionSubmit}
            disabled={!selectedAction || (selectedAction === 'reject' && !rejectionReason) || (selectedAction === 'interview' && !interviewType)}
            className={`w-full px-6 py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-200 ${
              selectedAction && !(selectedAction === 'reject' && !rejectionReason) && !(selectedAction === 'interview' && !interviewType)
                ? 'neu-primary text-white hover:shadow-lg'
                : 'neu-button text-[#666666] cursor-not-allowed'
            }`}
          >
            <span>
              {selectedAction === 'shortlist' ? 'Shortlist Candidate' :
               selectedAction === 'interview' ? 'Schedule Interview' :
               selectedAction === 'reject' ? 'Reject Application' :
               selectedAction === 'hold' ? 'Put on Hold' :
               'Select Action'}
            </span>
            {selectedAction && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};