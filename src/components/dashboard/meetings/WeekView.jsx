import React from 'react';
import { getWeekDates, getMeetingsForDate, formatTime } from './calendarUtils';

const WeekView = ({ currentDate, meetings, onDateClick, onMeetingClick }) => {
  const weekDates = getWeekDates(currentDate);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="neu-card p-6 rounded-3xl">
      <div className="grid grid-cols-8 gap-4">
        {/* Time column */}
        <div className="space-y-12">
          <div className="h-12"></div> {/* Header spacer */}
          {hours.map(hour => (
            <div key={hour} className="h-12 flex items-center">
              <span className="text-sm text-[#666666]">
                {formatTime(`${hour}:00`).replace(':00', '')}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDates.map((date, dayIndex) => {
          const dayMeetings = getMeetingsForDate(meetings, date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div key={dayIndex} className="space-y-1">
              {/* Day header */}
              <div 
                className={`neu-small p-3 rounded-2xl text-center ${
                  isToday ? 'neu-primary text-white' : ''
                }`}
              >
                <div className="text-sm font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold">
                  {date.getDate()}
                </div>
              </div>

              {/* Time slots */}
              <div className="space-y-1 relative">
                {hours.map(hour => (
                  <div 
                    key={hour} 
                    className="h-12 neu-card-inset rounded-xl cursor-pointer hover:bg-[#E8EBEF] transition-colors"
                    onClick={() => onDateClick(date)}
                  ></div>
                ))}

                {/* Meetings overlay */}
                {dayMeetings.map(meeting => {
                  const [startHour, startMinute] = meeting.time.split(':').map(Number);
                  const topPosition = ((startHour - 8) * 52) + (startMinute / 60 * 52);
                  const height = (meeting.duration / 60) * 52;

                  return (
                    <div
                      key={meeting.id}
                      className="absolute left-0 right-0 p-2 rounded-lg text-white text-xs cursor-pointer hover:opacity-80"
                      style={{
                        backgroundColor: meeting.color,
                        top: `${topPosition}px`,
                        height: `${height}px`,
                        minHeight: '24px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMeetingClick(meeting.id);
                      }}
                    >
                      <div className="font-medium truncate">{meeting.title}</div>
                      <div className="text-xs opacity-80">
                        {meeting.time} • {meeting.participants} people
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
