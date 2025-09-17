import React from 'react';
import { getDaysInMonth, getMeetingsForDate, daysOfWeek } from './calendarUtils';

const MonthView = ({ currentDate, meetings, onDateClick }) => {
  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Day headers */}
      {daysOfWeek.map(day => (
        <div key={day} className="neu-card-inset p-4 rounded-2xl text-center">
          <span className="font-medium text-[#333333]">{day}</span>
        </div>
      ))}
      
      {/* Calendar days */}
      {days.map((date, index) => {
        if (!date) return <div key={index} className="h-32"></div>;
        
        const dayMeetings = getMeetingsForDate(meetings, date);
        const isToday = date.toDateString() === today.toDateString();
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
        
        return (
          <div 
            key={index} 
            className={`h-32 neu-card rounded-2xl p-3 cursor-pointer transition-all hover:scale-105 ${
              isToday ? 'ring-2 ring-[#05A7CC]' : ''
            } ${!isCurrentMonth ? 'opacity-50' : ''}`}
            onClick={() => onDateClick(date)}
          >
            <div className={`text-sm font-medium mb-2 ${
              isToday ? 'text-[#05A7CC]' : 'text-[#333333]'
            }`}>
              {date.getDate()}
            </div>
            
            <div className="space-y-1">
              {dayMeetings.slice(0, 2).map(meeting => (
                <div 
                  key={meeting.id}
                  className="text-xs p-2 rounded-lg text-white truncate"
                  style={{ backgroundColor: meeting.color }}
                  title={`${meeting.title} at ${meeting.time}`}
                >
                  {meeting.title}
                </div>
              ))}
              {dayMeetings.length > 2 && (
                <div className="text-xs text-[#666666] text-center">
                  +{dayMeetings.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
