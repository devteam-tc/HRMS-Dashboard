// Calendar utility functions

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getDaysInMonth = (date) => {
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

export const getWeekDates = (currentDate) => {
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

export const getMeetingsForDate = (meetings, date) => {
  if (!date) return [];
  const dateString = date.toISOString().split('T')[0];
  return meetings.filter(meeting => meeting.date === dateString);
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours > 12 
    ? `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`
    : hours === 12 
      ? `12:${minutes.toString().padStart(2, '0')} PM`
      : `${hours}:${minutes.toString().padStart(2, '0')} AM`;
};
