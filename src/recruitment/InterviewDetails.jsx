import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Video, MapPin, Phone, Edit, Share2, MessageSquare, FileText, Star, CheckCircle, XCircle } from 'lucide-react';

export const InterviewDetails = ({ interviewId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('details');

  // Mock interview data
  const interview = {
    id: interviewId || 1,
    candidateName: 'Alice Johnson',
    candidateEmail: 'alice.johnson@email.com',
    candidatePhone: '+1 (555) 123-4567',
    jobTitle: 'Senior Software Engineer',
    type: 'Technical Interview',
    mode: 'Video Call',
    interviewer: 'Michael Chen',
    interviewerEmail: 'michael.chen@company.com',
    date: '2024-01-25',
    time: '3:00 PM',
    duration: '90 minutes',
    status: 'Scheduled',
    location: 'Zoom Meeting',
    meetingLink: 'https://zoom.us/j/123456789',
    timeZone: 'EST',
    notes: 'Focus on system design and algorithms. Assess problem-solving approach and communication skills.',
    agenda: [
      'Introduction and background (10 minutes)',
      'Technical discussion (30 minutes)',
      'Coding challenge (40 minutes)',
      'Questions from candidate (10 minutes)'
    ],
    requirements: [
      'Stable internet connection',
      'Webcam and microphone',
      'Quiet environment',
      'Code editor access (VS Code/IntelliJ)',
      'Whiteboard or drawing tool'
    ],
    candidateId: 1,
    jobId: 1,
    feedback: null, // Will have feedback after completion
    documents: [
      {
        name: 'alice_johnson_resume.pdf',
        type: 'Resume',
        uploadDate: '2024-01-18'
      },
      {
        name: 'coding_challenge.pdf',
        type: 'Assessment',
        uploadDate: '2024-01-20'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'text-blue-600 bg-blue-50';
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      case 'Rescheduled': return 'text-yellow-600 bg-yellow-50';
      case 'No Show': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'Video Call': return <Video size={20} className="text-[#05A7CC]" />;
      case 'Phone': return <Phone size={20} className="text-[#EF5226]" />;
      case 'In-Person': return <MapPin size={20} className="text-[#666666]" />;
      default: return <Calendar size={20} className="text-[#666666]" />;
    }
  };

  const handleJoinMeeting = () => {
    if (interview.meetingLink) {
      window.open(interview.meetingLink, '_blank');
    }
  };

  const handleMarkCompleted = () => {
    console.log('Marking interview as completed');
    // Navigate to feedback form
    onNavigate('interview-feedback', { interviewId: interview.id });
  };

  const handleReschedule = () => {
    console.log('Rescheduling interview');
    onNavigate('edit-interview', { interviewId: interview.id });
  };

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('interviews-list')}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Interview Details</h1>
            <p className="text-[#666666]">{interview.candidateName} - {interview.jobTitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {interview.status === 'Scheduled' && (
            <>
              <button
                onClick={handleReschedule}
                className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#EF5226] transition-all duration-200"
              >
                <Edit size={20} />
                <span>Reschedule</span>
              </button>
              {interview.mode === 'Video Call' && (
                <button
                  onClick={handleJoinMeeting}
                  className="neu-secondary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
                >
                  Join Meeting
                </button>
              )}
            </>
          )}
          <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#05A7CC] transition-all duration-200">
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Interview Summary */}
      <div className="neu-card p-8 rounded-3xl mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="neu-small w-16 h-16 rounded-3xl flex items-center justify-center">
              <User size={32} className="text-[#666666]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">{interview.candidateName}</h3>
              <p className="text-[#EF5226] font-medium mb-2">{interview.jobTitle}</p>
              <div className="flex items-center space-x-6 text-[#666666] mb-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{interview.time} ({interview.timeZone})</span>
                </div>
                <div className="flex items-center">
                  <span>Duration: {interview.duration}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="neu-small px-4 py-2 rounded-2xl text-sm text-[#333333] font-medium">
                  {interview.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                  {interview.status}
                </span>
                <div className="flex items-center text-sm text-[#666666]">
                  {getModeIcon(interview.mode)}
                  <span className="ml-2">{interview.mode}</span>
                </div>
              </div>
            </div>
          </div>
          
          {interview.status === 'Scheduled' && (
            <button
              onClick={handleMarkCompleted}
              className="neu-primary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card p-2 rounded-3xl mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'details', label: 'Interview Details' },
            { id: 'agenda', label: 'Agenda & Notes' },
            { id: 'candidate', label: 'Candidate Info' },
            { id: 'feedback', label: 'Feedback' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'neu-primary text-white'
                  : 'text-[#666666] hover:text-[#333333]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="neu-card p-8 rounded-3xl">
        {activeTab === 'details' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-6">Interview Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Interview Type:</span>
                    <span className="text-[#333333] font-medium">{interview.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Mode:</span>
                    <span className="text-[#333333] font-medium">{interview.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Date:</span>
                    <span className="text-[#333333] font-medium">{interview.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Time:</span>
                    <span className="text-[#333333] font-medium">{interview.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Duration:</span>
                    <span className="text-[#333333] font-medium">{interview.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Location:</span>
                    <span className="text-[#333333] font-medium">{interview.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-6">Interviewer Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Interviewer:</span>
                    <span className="text-[#333333] font-medium">{interview.interviewer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Email:</span>
                    <span className="text-[#333333] font-medium">{interview.interviewerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Time Zone:</span>
                    <span className="text-[#333333] font-medium">{interview.timeZone}</span>
                  </div>
                </div>

                {interview.mode === 'Video Call' && interview.meetingLink && (
                  <div className="mt-6">
                    <h4 className="font-bold text-[#333333] mb-3">Meeting Link</h4>
                    <button
                      onClick={handleJoinMeeting}
                      className="neu-secondary w-full px-4 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Video size={20} />
                      <span>Join Video Call</span>
                    </button>
                    <p className="text-[#666666] text-sm mt-2">
                      Link: {interview.meetingLink}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Requirements</h3>
              <ul className="space-y-3">
                {interview.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-[#05A7CC] rounded-full"></div>
                    </div>
                    <span className="text-[#333333]">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'agenda' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Interview Agenda</h3>
              <ul className="space-y-4">
                {interview.agenda.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="neu-small w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#333333] font-bold">{index + 1}</span>
                    </div>
                    <span className="text-[#333333] text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Interview Notes</h3>
              <div className="neu-small p-6 rounded-3xl">
                <p className="text-[#333333] leading-relaxed">{interview.notes}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Documents</h3>
              <div className="space-y-3">
                {interview.documents.map((doc, index) => (
                  <div key={index} className="neu-small p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={20} className="text-[#EF5226] mr-3" />
                      <div>
                        <p className="text-[#333333] font-medium">{doc.name}</p>
                        <p className="text-[#666666] text-sm">{doc.type} • Uploaded {doc.uploadDate}</p>
                      </div>
                    </div>
                    <button className="neu-button p-2 rounded-xl hover:shadow-md transition-all duration-200">
                      <FileText size={16} className="text-[#05A7CC]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidate' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-6">Candidate Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Name:</span>
                    <span className="text-[#333333] font-medium">{interview.candidateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Email:</span>
                    <span className="text-[#333333] font-medium">{interview.candidateEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Phone:</span>
                    <span className="text-[#333333] font-medium">{interview.candidatePhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Applied For:</span>
                    <span className="text-[#333333] font-medium">{interview.jobTitle}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('applicant-details', { applicantId: interview.candidateId })}
                    className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={() => onNavigate('applicant-resume', { applicantId: interview.candidateId })}
                    className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#EF5226] transition-all duration-200"
                  >
                    View Resume
                  </button>
                  <button
                    onClick={() => onNavigate('applicant-progress', { applicantId: interview.candidateId })}
                    className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
                  >
                    View Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div>
            {interview.feedback ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#333333] mb-6">Interview Feedback</h3>
                <div className="neu-small p-6 rounded-3xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.floor(interview.feedback.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-[#333333] font-medium ml-2">{interview.feedback.rating}/5</span>
                    </div>
                    <span className="text-[#666666]">Overall Rating</span>
                  </div>
                  <p className="text-[#333333] leading-relaxed">{interview.feedback.summary}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare size={48} className="text-[#666666] mx-auto mb-4" />
                <p className="text-[#666666] text-lg mb-4">No feedback available yet</p>
                {interview.status === 'Completed' ? (
                  <button
                    onClick={() => onNavigate('interview-feedback', { interviewId: interview.id })}
                    className="neu-primary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
                  >
                    Add Feedback
                  </button>
                ) : (
                  <p className="text-[#666666] text-sm">Feedback can be added after the interview is completed</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};