import React, { useState } from 'react';
import { Save, X, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const quickParticipants = [
  { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Team Lead' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Senior Developer' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'Frontend Developer' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Backend Developer' }
];

export const CalendarAddMeeting = ({ selectedDate, onNavigate }) => {
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    participants: [],
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addParticipant = (participant) => {
    if (!formData.participants.find(p => p.id === participant.id)) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participant]
      }));
    }
  };

  const removeParticipant = (participantId) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== participantId)
    }));
  };

  const handleSave = () => {
    console.log('Creating quick meeting:', { date: selectedDate, ...formData });
    setShowModal(false);
    onNavigate('meeting-confirmation');
  };

  const handleClose = () => {
    setShowModal(false);
    onNavigate('meeting-calendar');
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="neu-card p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-2">Quick Meeting</h2>
            <p className="text-[#666666]">
              Schedule a meeting for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Form */}
        <div className="space-y-6">
          {/* Meeting Title */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Meeting Title *</label>
            <div className="neu-input p-4 rounded-2xl">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                placeholder="Enter meeting title"
                autoFocus
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#333333] font-medium mb-3">Start Time</label>
              <div className="neu-input p-4 rounded-2xl flex items-center">
                <Clock className="w-5 h-5 text-[#666666] mr-3" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#333333] font-medium mb-3">End Time</label>
              <div className="neu-input p-4 rounded-2xl flex items-center">
                <Clock className="w-5 h-5 text-[#666666] mr-3" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Location</label>
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <MapPin className="w-5 h-5 text-[#666666] mr-3" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                placeholder="Conference Room A or Meeting Link"
              />
            </div>
          </div>

          {/* Quick Participants */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Add Participants</label>
            <div className="neu-card-inset p-4 rounded-2xl">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {quickParticipants.map((participant) => (
                  <button
                    key={participant.id}
                    onClick={() => addParticipant(participant)}
                    disabled={formData.participants.find(p => p.id === participant.id)}
                    className={`neu-small p-3 rounded-2xl text-left transition-all ${
                      formData.participants.find(p => p.id === participant.id)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-105'
                    }`}
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

              {/* Selected Participants */}
              {formData.participants.length > 0 && (
                <div>
                  <h4 className="font-medium text-[#333333] mb-3">Selected Participants:</h4>
                  <div className="space-y-2">
                    {formData.participants.map((participant) => (
                      <div key={participant.id} className="neu-small p-3 rounded-2xl flex items-center justify-between">
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
                        <button 
                          onClick={() => removeParticipant(participant.id)}
                          className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
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

          {/* Description */}
          <div>
            <label className="block text-[#333333] font-medium mb-3">Description (Optional)</label>
            <div className="neu-input p-4 rounded-2xl">
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                placeholder="Add meeting description or agenda"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="neu-card-inset p-6 rounded-2xl my-6">
          <h4 className="font-bold text-[#333333] mb-3">Meeting Summary</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-[#05A7CC]" />
              <span className="text-[#666666]">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-[#05A7CC]" />
              <span className="text-[#666666]">{formData.startTime} - {formData.endTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-[#05A7CC]" />
              <span className="text-[#666666]">{formData.participants.length} participants</span>
            </div>
            {formData.location && (
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#05A7CC]" />
                <span className="text-[#666666]">{formData.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between space-x-4">
          <button 
            onClick={() => onNavigate('new-meeting')}
            className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
          >
            More Options
          </button>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleClose}
              className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={!formData.title.trim()}
              className={`px-8 py-3 rounded-2xl flex items-center space-x-3 transition-all ${
                formData.title.trim()
                  ? 'neu-primary hover:scale-105'
                  : 'neu-button text-[#999999] cursor-not-allowed'
              }`}
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">Create Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};