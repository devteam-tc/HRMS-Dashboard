import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Users, Plus, Eye, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const createdMeetingData = {
  id: 'MTG-2024-001',
  title: 'Product Planning Q1 2024',
  date: '2024-01-20',
  startTime: '02:00 PM',
  endTime: '04:00 PM',
  location: 'Conference Room A',
  participants: [
    { name: 'John Doe', email: 'john.doe@company.com' },
    { name: 'Jane Smith', email: 'jane.smith@company.com' },
    { name: 'Mike Johnson', email: 'mike.johnson@company.com' },
    { name: 'Sarah Wilson', email: 'sarah.wilson@company.com' }
  ],
  department: 'Product',
  organizer: 'John Doe',
  reminderSent: true,
  calendarInviteSent: true
};

export const MeetingConfirmation = ({ onNavigate }) => {
  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Success Header */}
      <div className="neu-card p-8 rounded-3xl text-center">
        <div className="neu-small w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-[#4CAF50]" />
        </div>
        <h1 className="text-3xl font-bold text-[#333333] mb-3">Meeting Created Successfully! 🎉</h1>
        <p className="text-[#666666] text-lg">Your meeting has been scheduled and invitations have been sent to all participants.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meeting Details */}
        <div className="neu-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">Meeting Details</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">{createdMeetingData.title}</h3>
              <div className="text-sm text-[#666666]">Meeting ID: {createdMeetingData.id}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Date</div>
                    <div className="font-medium text-[#333333]">
                      {new Date(createdMeetingData.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Time</div>
                    <div className="font-medium text-[#333333]">
                      {createdMeetingData.startTime} - {createdMeetingData.endTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Location</div>
                    <div className="font-medium text-[#333333]">{createdMeetingData.location}</div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Participants</div>
                    <div className="font-medium text-[#333333]">{createdMeetingData.participants.length} invited</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="neu-card-inset p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-3">Organized by</h4>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-[#05A7CC] text-white">
                    {createdMeetingData.organizer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-[#333333]">{createdMeetingData.organizer}</div>
                  <div className="text-sm text-[#666666]">{createdMeetingData.department} Department</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants and Status */}
        <div className="space-y-6">
          {/* Participants */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Invited Participants</h3>
            <div className="space-y-4">
              {createdMeetingData.participants.map((participant, index) => (
                <div key={index} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-[#333333]">{participant.name}</div>
                      <div className="text-sm text-[#666666]">{participant.email}</div>
                    </div>
                    <div className="neu-card-inset px-3 py-1 rounded-xl">
                      <span className="text-xs font-medium text-[#FFC107]">PENDING</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Updates */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Status Updates</h3>
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                  <div>
                    <div className="font-medium text-[#333333]">Calendar invites sent</div>
                    <div className="text-sm text-[#666666]">All participants have received calendar invitations</div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                  <div>
                    <div className="font-medium text-[#333333]">Reminders scheduled</div>
                    <div className="text-sm text-[#666666]">Email reminders will be sent 15 minutes before</div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                  <div>
                    <div className="font-medium text-[#333333]">Meeting room reserved</div>
                    <div className="text-sm text-[#666666]">{createdMeetingData.location} has been booked</div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#05A7CC] rounded-full"></div>
                  <div>
                    <div className="font-medium text-[#333333]">Waiting for responses</div>
                    <div className="text-sm text-[#666666]">Participants can accept or decline the invitation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-6">
        <button 
          onClick={() => onNavigate('meeting-details', createdMeetingData.id)}
          className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
        >
          <Eye className="w-5 h-5" />
          <span className="font-medium">View Meeting</span>
        </button>

        <button 
          onClick={() => onNavigate('new-meeting')}
          className="neu-button px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create Another</span>
        </button>

        <button 
          onClick={() => onNavigate('all-meetings')}
          className="neu-button px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Meetings</span>
        </button>
      </div>

      {/* Next Steps */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neu-small p-6 rounded-2xl text-center">
            <div className="neu-card-inset w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#05A7CC]" />
            </div>
            <h4 className="font-bold text-[#333333] mb-2">Track Responses</h4>
            <p className="text-sm text-[#666666]">Monitor participant acceptances and prepare for the meeting</p>
          </div>

          <div className="neu-small p-6 rounded-2xl text-center">
            <div className="neu-card-inset w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-[#05A7CC]" />
            </div>
            <h4 className="font-bold text-[#333333] mb-2">Add to Calendar</h4>
            <p className="text-sm text-[#666666]">The meeting has been automatically added to your calendar</p>
          </div>

          <div className="neu-small p-6 rounded-2xl text-center">
            <div className="neu-card-inset w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#05A7CC]" />
            </div>
            <h4 className="font-bold text-[#333333] mb-2">Prepare Materials</h4>
            <p className="text-sm text-[#666666]">Upload additional documents and prepare the agenda</p>
          </div>
        </div>
      </div>
    </div>
  );
};