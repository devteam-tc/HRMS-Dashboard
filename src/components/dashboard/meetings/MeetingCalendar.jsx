import React, { useState } from 'react';
import { monthNames, daysOfWeek } from './calendarUtils';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import CalendarLegend from './CalendarLegend';

// Sample meetings data
const calendarMeetings = [
  { id: '1', title: 'Team Standup', date: '2024-01-15', time: '09:00', duration: 30, participants: 4, status: 'completed', color: '#4CAF50' },
  { id: '2', title: 'Product Review', date: '2024-01-16', time: '14:00', duration: 120, participants: 6, status: 'scheduled', color: '#05A7CC' },
  { id: '3', title: 'HR Policy Meeting', date: '2024-01-17', time: '11:00', duration: 90, participants: 3, status: 'scheduled', color: '#9C27B0' },
  { id: '4', title: 'Client Presentation', date: '2024-01-18', time: '15:30', duration: 60, participants: 8, status: 'scheduled', color: '#FF9800' },
  { id: '5', title: 'Sprint Planning', date: '2024-01-19', time: '10:00', duration: 45, participants: 5, status: 'scheduled', color: '#05A7CC' },
  { id: '6', title: 'Design Review', date: '2024-01-22', time: '13:00', duration: 75, participants: 4, status: 'scheduled', color: '#E91E63' },
  { id: '7', title: 'All Hands Meeting', date: '2024-01-23', time: '16:00', duration: 60, participants: 15, status: 'scheduled', color: '#2196F3' }
];

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
};

const getMeetingsForDate = (date) => {
  if (!date) return [];
  const dateString = date.toISOString().split('T')[0];
  return calendarMeetings.filter(meeting => meeting.date === dateString);
};

const getWeekDates = () => {
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

const MeetingCalendar = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)); // January 15, 2024
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [selectedDate, setSelectedDate] = useState(null);

  // Navigation handlers
  const navigateMonth = (months) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + months);
    setCurrentDate(newDate);
  };

  const navigateWeek = (weeks) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (weeks * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onNavigate('calendar-add-meeting', { date: date.toISOString().split('T')[0] });
  };

  const handleMeetingClick = (meetingId) => {
    onNavigate('meeting-details', meetingId);
  };

  const handleNewMeeting = () => {
    onNavigate('new-meeting');
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      <CalendarHeader 
        currentDate={currentDate}
        viewMode={viewMode}
        onNavigateMonth={navigateMonth}
        onNavigateWeek={navigateWeek}
        onNavigateDay={navigateDay}
        onViewModeChange={setViewMode}
        onNewMeeting={handleNewMeeting}
        monthNames={monthNames}
      />

      {/* Calendar View */}
      {viewMode === 'month' && (
        <MonthView 
          currentDate={currentDate}
          meetings={calendarMeetings}
          onDateClick={handleDateClick}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          meetings={calendarMeetings}
          onDateClick={handleDateClick}
          onMeetingClick={handleMeetingClick}
        />
      )}

      {viewMode === 'day' && (
        <DayView
          currentDate={currentDate}
          meetings={calendarMeetings}
          onDateClick={handleDateClick}
          onMeetingClick={handleMeetingClick}
        />
      )}

      <CalendarLegend />
    </div>
  );
};

export default MeetingCalendar;