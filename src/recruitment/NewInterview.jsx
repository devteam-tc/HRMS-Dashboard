import React, { useState } from 'react';
import { ArrowLeft, Save, Calendar, Clock, User, Video, MapPin, Phone, Plus, X } from 'lucide-react';

export const NewInterview = ({ applicantId, interviewType, onNavigate }) => {
  const [formData, setFormData] = useState({
    candidateId: applicantId || '',
    candidateName: applicantId ? 'Alice Johnson' : '',
    jobTitle: applicantId ? 'Senior Software Engineer' : '',
    interviewType: interviewType || 'Phone Screening',
    mode: 'Video Call',
    interviewer: '',
    coInterviewers: [''],
    date: '',
    time: '',
    duration: '60',
    timeZone: 'EST',
    location: '',
    meetingLink: '',
    agenda: [''],
    notes: '',
    requirements: [''],
    sendNotifications: true,
    sendCalendarInvite: true
  });

  const [errors, setErrors] = useState({});

  const interviewTypes = [
    'Phone Screening',
    'Technical Interview',
    'Behavioral Interview',
    'System Design Interview',
    'Cultural Fit Interview',
    'Portfolio Review',
    'Final Interview'
  ];

  const interviewModes = [
    { value: 'Video Call', label: 'Video Call', icon: Video },
    { value: 'Phone', label: 'Phone Call', icon: Phone },
    { value: 'In-Person', label: 'In-Person', icon: MapPin }
  ];

  const defaultAgendas = {
    'Phone Screening': [
      'Introduction and background (10 minutes)',
      'Experience discussion (15 minutes)',
      'Role expectations (10 minutes)',
      'Questions from candidate (10 minutes)',
      'Next steps (5 minutes)'
    ],
    'Technical Interview': [
      'Introduction (10 minutes)',
      'Technical background discussion (20 minutes)',
      'Coding challenge (40 minutes)',
      'System design question (15 minutes)',
      'Questions from candidate (5 minutes)'
    ],
    'Behavioral Interview': [
      'Introduction (5 minutes)',
      'Behavioral questions (35 minutes)',
      'Cultural fit assessment (15 minutes)',
      'Questions from candidate (5 minutes)'
    ]
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-populate agenda based on interview type
    if (field === 'interviewType' && defaultAgendas[value]) {
      setFormData(prev => ({
        ...prev,
        agenda: defaultAgendas[value]
      }));
    }

    // Auto-populate location based on mode
    if (field === 'mode') {
      let location = '';
      switch (value) {
        case 'Video Call':
          location = 'Zoom Meeting';
          break;
        case 'Phone':
          location = 'Phone Call';
          break;
        case 'In-Person':
          location = 'Conference Room';
          break;
      }
      setFormData(prev => ({
        ...prev,
        location
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.candidateName.trim()) newErrors.candidateName = 'Candidate is required';
    if (!formData.interviewer.trim()) newErrors.interviewer = 'Interviewer is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.mode === 'Video Call' && !formData.meetingLink.trim()) {
      newErrors.meetingLink = 'Meeting link is required for video calls';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const interviewData = {
        ...formData,
        coInterviewers: formData.coInterviewers.filter(ci => ci.trim()),
        agenda: formData.agenda.filter(item => item.trim()),
        requirements: formData.requirements.filter(req => req.trim()),
        id: Date.now(),
        status: 'Scheduled',
        createdDate: new Date().toISOString()
      };

      console.log('Creating interview:', interviewData);
      
      // Navigate to interview details
      onNavigate('interview-details', { interviewId: interviewData.id });
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
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
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Schedule New Interview</h1>
            <p className="text-[#666666]">Set up an interview session with candidate</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            className="neu-button px-6 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
          >
            <Save size={20} />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Interview Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Candidate *</label>
                  <input
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => handleInputChange('candidateName', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.candidateName ? 'border-red-300' : ''}`}
                    placeholder="Enter candidate name"
                  />
                  {errors.candidateName && <p className="text-red-500 text-sm mt-1">{errors.candidateName}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                    placeholder="Enter job title"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Interview Type</label>
                  <select
                    value={formData.interviewType}
                    onChange={(e) => handleInputChange('interviewType', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    {interviewTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Interview Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {interviewModes.map((mode) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.value}
                          type="button"
                          onClick={() => handleInputChange('mode', mode.value)}
                          className={`neu-small p-3 rounded-2xl transition-all duration-200 ${
                            formData.mode === mode.value ? 'ring-2 ring-[#EF5226]' : 'hover:shadow-md'
                          }`}
                        >
                          <Icon size={20} className="mx-auto mb-1 text-[#666666]" />
                          <p className="text-xs text-[#333333]">{mode.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Schedule</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className={`neu-input w-full pl-12 pr-4 py-3 text-[#333333] focus:outline-none ${errors.date ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className={`neu-input w-full pl-12 pr-4 py-3 text-[#333333] focus:outline-none ${errors.time ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Duration (minutes)</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Time Zone</label>
                  <select
                    value={formData.timeZone}
                    onChange={(e) => handleInputChange('timeZone', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="CST">CST</option>
                    <option value="MST">MST</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Location & Access</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.location ? 'border-red-300' : ''}`}
                    placeholder={
                      formData.mode === 'Video Call' ? 'e.g., Zoom Meeting' :
                      formData.mode === 'Phone' ? 'e.g., Phone Call' :
                      'e.g., Conference Room A'
                    }
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {formData.mode === 'Video Call' && (
                  <div>
                    <label className="block text-[#333333] font-medium mb-3">Meeting Link *</label>
                    <input
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                      className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.meetingLink ? 'border-red-300' : ''}`}
                      placeholder="https://zoom.us/j/123456789"
                    />
                    {errors.meetingLink && <p className="text-red-500 text-sm mt-1">{errors.meetingLink}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Agenda */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Interview Agenda</h3>
              
              <div className="space-y-4">
                {formData.agenda.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="neu-small w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-[#333333] font-bold">{index + 1}</span>
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayFieldChange('agenda', index, e.target.value)}
                      className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="Enter agenda item"
                    />
                    {formData.agenda.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('agenda', index)}
                        className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('agenda')}
                  className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:shadow-md transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Agenda Item</span>
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Notes & Instructions</h3>
              
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={6}
                className="neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none resize-none"
                placeholder="Add any special instructions, focus areas, or notes for the interview..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Interviewer */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-6">Interviewer(s)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Primary Interviewer *</label>
                  <input
                    type="text"
                    value={formData.interviewer}
                    onChange={(e) => handleInputChange('interviewer', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.interviewer ? 'border-red-300' : ''}`}
                    placeholder="Enter interviewer name"
                  />
                  {errors.interviewer && <p className="text-red-500 text-sm mt-1">{errors.interviewer}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Co-Interviewers</label>
                  <div className="space-y-3">
                    {formData.coInterviewers.map((coInterviewer, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={coInterviewer}
                          onChange={(e) => handleArrayFieldChange('coInterviewers', index, e.target.value)}
                          className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                          placeholder="Enter co-interviewer name"
                        />
                        {formData.coInterviewers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('coInterviewers', index)}
                            className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('coInterviewers')}
                      className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:shadow-md transition-all duration-200"
                    >
                      <Plus size={16} />
                      <span>Add Co-Interviewer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-6">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 neu-small rounded-2xl">
                  <div>
                    <p className="text-[#333333] font-medium">Email Notifications</p>
                    <p className="text-[#666666] text-sm">Send interview details to all participants</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.sendNotifications}
                    onChange={(e) => handleInputChange('sendNotifications', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3 neu-small rounded-2xl">
                  <div>
                    <p className="text-[#333333] font-medium">Calendar Invite</p>
                    <p className="text-[#666666] text-sm">Add to calendars automatically</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.sendCalendarInvite}
                    onChange={(e) => handleInputChange('sendCalendarInvite', e.target.checked)}
                    className="rounded"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                {applicantId && (
                  <button
                    type="button"
                    onClick={() => onNavigate('applicant-details', { applicantId })}
                    className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
                  >
                    View Candidate Profile
                  </button>
                )}
                <button
                  type="button"
                  className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#EF5226] transition-all duration-200"
                >
                  Load Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};