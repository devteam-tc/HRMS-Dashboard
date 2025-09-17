import React from 'react';
import { getMeetingsForDate, formatTime } from './calendarUtils';

const DayView = ({ currentDate, meetings, onDateClick, onMeetingClick }) => {
  const dayMeetings = getMeetingsForDate(meetings, currentDate);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="neu-card p-8 rounded-3xl">
      <div className="grid grid-cols-2 gap-8">
        {/* Time slots */}
        <div className="space-y-1 relative">
          {hours.map(hour => (
            <div key={hour} className="flex items-center space-x-4 h-16">
              <div className="w-20 text-right">
                <span className="text-sm text-[#666666]">
                  {formatTime(`${hour}:00`).replace(':00', '')}
                </span>
              </div>
              <div 
                className="flex-1 h-12 neu-card-inset rounded-xl cursor-pointer hover:bg-[#E8EBEF] transition-colors"
                onClick={() => onDateClick(currentDate)}
              ></div>
            </div>
          ))}

          {/* Meetings overlay */}
          {dayMeetings.map(meeting => {
            const [startHour, startMinute] = meeting.time.split(':').map(Number);
            const topPosition = ((startHour - 8) * 68) + (startMinute / 60 * 68);
            const height = (meeting.duration / 60) * 68;

            return (
              <div
                key={meeting.id}
                className="absolute right-0 p-4 rounded-lg text-white cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: meeting.color,
                  top: `${topPosition}px`,
                  height: `${height}px`,
                  width: 'calc(100% - 100px)',
                  left: '100px',
                  minHeight: '48px'
                }}
                onClick={() => onMeetingClick(meeting.id)}
              >
                <div className="font-medium">{meeting.title}</div>
                <div className="text-sm opacity-80">
                  {meeting.time} • {meeting.duration} min • {meeting.participants} people
                </div>
              </div>
            );
          })}
        </div>

        {/* Day details */}
        <div className="space-y-6">
          <div className="neu-small p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-[#333333] mb-4">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#05A7CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[#666666]">{dayMeetings.length} meetings scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#05A7CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[#666666]">
                  {dayMeetings.reduce((total, meeting) => total + meeting.duration, 0)} minutes total
                </span>
              </div>
            </div>
          </div>

          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-4">Meetings Today</h4>
            <div className="space-y-3">
              {dayMeetings.map(meeting => (
                <div 
                  key={meeting.id} 
                  className="neu-card-inset p-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onMeetingClick(meeting.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: meeting.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-medium text-[#333333]">{meeting.title}</div>
                      <div className="text-sm text-[#666666]">
                        {meeting.time} • {meeting.duration} min • {meeting.participants} participants
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {dayMeetings.length === 0 && (
                <div className="text-center text-[#666666] py-8">
                  No meetings scheduled for today
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
