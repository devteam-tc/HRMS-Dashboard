import React, { useState } from 'react';
import { Save, ArrowLeft, Upload, X, Plus, Users, Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const existingMeetingData = {
  id: '1',
  title: 'Weekly Team Standup',
  description: 'Weekly standup meeting to discuss progress, blockers, and upcoming tasks for the engineering team.',
  department: 'Engineering',
  date: '2024-01-15',
  startTime: '09:00',
  endTime: '09:30',
  location: 'Conference Room A',
  meetingType: 'in-person',
  agenda: [
    'Review last week\'s progress',
    'Discuss current blockers',
    'Sprint planning for upcoming week',
    'Code review assignments'
  ],
  participants: [
    { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Team Lead' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Senior Developer' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'Frontend Developer' }
  ],
  recurringType: 'weekly',
  reminderTime: '15',
  priority: 'medium',
  status: 'scheduled'
};

const availableParticipants = [
  { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Backend Developer', department: 'Engineering' },
  { id: '5', name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Product Manager', department: 'Product' },
  { id: '6', name: 'Bob Brown', email: 'bob.brown@company.com', role: 'UX Designer', department: 'Design' },
  { id: '7', name: 'Carol Davis', email: 'carol.davis@company.com', role: 'Marketing Manager', department: 'Marketing' }
];

export const EditMeeting = ({ meetingId, onNavigate }) => {
  const [formData, setFormData] = useState(existingMeetingData);
  const [uploadedFiles, setUploadedFiles] = useState(['Sprint_Planning_Document.pdf']);
  const [showParticipantSearch, setShowParticipantSearch] = useState(false);
  const [participantSearch, setParticipantSearch] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleAgendaChange = (index, value) => {
    const newAgenda = [...formData.agenda];
    newAgenda[index] = value;
    setFormData(prev => ({
      ...prev,
      agenda: newAgenda
    }));
    setHasChanges(true);
  };

  const addAgendaItem = () => {
    setFormData(prev => ({
      ...prev,
      agenda: [...prev.agenda, '']
    }));
    setHasChanges(true);
  };

  const removeAgendaItem = (index) => {
    const newAgenda = formData.agenda.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      agenda: newAgenda
    }));
    setHasChanges(true);
  };

  const addParticipant = (participant) => {
    if (!formData.participants.find(p => p.id === participant.id)) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participant]
      }));
      setHasChanges(true);
    }
    setParticipantSearch('');
    setShowParticipantSearch(false);
  };

  const removeParticipant = (participantId) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== participantId)
    }));
    setHasChanges(true);
  };

  const handleFileUpload = (fileName) => {
    setUploadedFiles(prev => [...prev, fileName]);
    setHasChanges(true);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileName));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Updating meeting:', formData);
    // Handle save logic here
    onNavigate('meeting-details', meetingId);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        onNavigate('meeting-details', meetingId);
      }
    } else {
      onNavigate('meeting-details', meetingId);
    }
  };

  const handleDeleteMeeting = () => {
    if (window.confirm('Are you sure you want to delete this meeting? This action cannot be undone.')) {
      console.log('Deleting meeting:', meetingId);
      onNavigate('all-meetings');
    }
  };

  const filteredParticipants = availableParticipants.filter(participant =>
    participant.name.toLowerCase().includes(participantSearch.toLowerCase()) ||
    participant.email.toLowerCase().includes(participantSearch.toLowerCase()) ||
    participant.role.toLowerCase().includes(participantSearch.toLowerCase())
  );

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
              onClick={handleCancel}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#333333]">Edit Meeting</h1>
                <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(formData.status)}`}>
                  {formData.status.toUpperCase()}
                </div>
                {hasChanges && (
                  <div className="neu-small px-3 py-1 rounded-xl text-xs font-medium bg-[#FFC107] text-white">
                    UNSAVED
                  </div>
                )}
              </div>
              <p className="text-[#666666]">Modify meeting details and settings</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleDeleteMeeting}
              className="neu-button px-6 py-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete</span>
            </button>
            <button 
              onClick={handleCancel}
              className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="neu-primary px-8 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Meeting Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Meeting Title *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter meeting title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Description</label>
                <div className="neu-input p-4 rounded-2xl">
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                    placeholder="Enter meeting description and objectives"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Department</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="">Select department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Priority</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Status</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Schedule</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Date *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Start Time *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">End Time *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Meeting Type</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.meetingType}
                    onChange={(e) => handleInputChange('meetingType', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="in-person">In-Person</option>
                    <option value="virtual">Virtual Meeting</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Location</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder={formData.meetingType === 'virtual' ? 'Meeting link' : 'Room or address'}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Recurring</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.recurringType}
                    onChange={(e) => handleInputChange('recurringType', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="none">No Recurring</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Reminder</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.reminderTime}
                    onChange={(e) => handleInputChange('reminderTime', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="5">5 minutes before</option>
                    <option value="15">15 minutes before</option>
                    <option value="30">30 minutes before</option>
                    <option value="60">1 hour before</option>
                    <option value="1440">1 day before</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#333333]">Meeting Agenda</h2>
              <button 
                onClick={addAgendaItem}
                className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.agenda.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="neu-card-inset w-10 h-10 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-bold text-[#05A7CC]">{index + 1}</span>
                  </div>
                  <div className="flex-1 neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleAgendaChange(index, e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Enter agenda item"
                    />
                  </div>
                  {formData.agenda.length > 1 && (
                    <button 
                      onClick={() => removeAgendaItem(index)}
                      className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Attachments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="neu-card-inset p-8 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center">
                <Upload className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <p className="text-[#666666] mb-4">Drag and drop files or click to upload</p>
                <button 
                  onClick={() => handleFileUpload('new_document.pdf')}
                  className="neu-button px-6 py-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                >
                  Browse Files
                </button>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="neu-small p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="neu-card-inset p-2 rounded-lg">
                            <Upload className="w-4 h-4 text-[#666666]" />
                          </div>
                          <span className="text-[#333333] font-medium">{file}</span>
                        </div>
                        <button 
                          onClick={() => removeFile(file)}
                          className="neu-button p-2 rounded-lg text-[#EF5226] hover:text-[#d4471f]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Participants */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Participants</h3>
              <button 
                onClick={() => setShowParticipantSearch(!showParticipantSearch)}
                className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Search Participants */}
            {showParticipantSearch && (
              <div className="mb-4">
                <div className="neu-input p-4 rounded-2xl mb-3">
                  <input
                    type="text"
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Search participants..."
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredParticipants.map((participant) => (
                    <button
                      key={participant.id}
                      onClick={() => addParticipant(participant)}
                      className="w-full neu-small p-3 rounded-2xl text-left hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-[#05A7CC] text-white text-sm">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-[#333333] text-sm">{participant.name}</div>
                          <div className="text-xs text-[#666666]">{participant.role}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Current Participants */}
            <div className="space-y-3">
              {formData.participants.map((participant) => (
                <div key={participant.id} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#333333]">{participant.name}</div>
                        <div className="text-sm text-[#666666]">{participant.role}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeParticipant(participant.id)}
                      className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Summary */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Meeting Summary</h3>
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Date & Time</div>
                    <div className="font-medium text-[#333333]">
                      {formData.date && formData.startTime 
                        ? `${new Date(formData.date).toLocaleDateString()} at ${formData.startTime}`
                        : 'Not set'
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Location</div>
                    <div className="font-medium text-[#333333]">
                      {formData.location || 'Not set'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Participants</div>
                    <div className="font-medium text-[#333333]">
                      {formData.participants.length} invited
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Recurring</div>
                    <div className="font-medium text-[#333333]">
                      {formData.recurringType === 'none' ? 'One-time' : formData.recurringType}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};