import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  TrendingUp,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Sample attendance data
const attendanceData = {
  '2024-01-15': { status: 'present', checkIn: '09:15', checkOut: '18:30' },
  '2024-01-16': { status: 'present', checkIn: '09:00', checkOut: '18:15' },
  '2024-01-17': { status: 'absent', checkIn: null, checkOut: null },
  '2024-01-18': { status: 'leave', checkIn: null, checkOut: null, leaveType: 'Sick Leave' },
  '2024-01-19': { status: 'present', checkIn: '09:30', checkOut: '18:45' },
  '2024-01-20': { status: 'weekend', checkIn: null, checkOut: null },
  '2024-01-21': { status: 'weekend', checkIn: null, checkOut: null },
  '2024-01-22': { status: 'present', checkIn: '08:45', checkOut: '18:00' },
  '2024-01-23': { status: 'present', checkIn: '09:10', checkOut: '18:20' },
  '2024-01-24': { status: 'late', checkIn: '10:15', checkOut: '19:00' },
  '2024-01-25': { status: 'present', checkIn: '09:05', checkOut: '18:10' },
  '2024-01-26': { status: 'holiday', checkIn: null, checkOut: null, holiday: 'Republic Day' }
};

const teamAttendance = [
  { id: 1, name: 'John Doe', status: 'present', checkIn: '09:15', avatar: '/placeholder-avatar.jpg' },
  { id: 2, name: 'Jane Smith', status: 'present', checkIn: '08:45', avatar: '/placeholder-avatar.jpg' },
  { id: 3, name: 'Mike Johnson', status: 'leave', checkIn: null, avatar: '/placeholder-avatar.jpg' },
  { id: 4, name: 'Sarah Wilson', status: 'late', checkIn: '10:30', avatar: '/placeholder-avatar.jpg' },
  { id: 5, name: 'Tom Brown', status: 'absent', checkIn: null, avatar: '/placeholder-avatar.jpg' }
];

export const AttendanceHub: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'leave':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'weekend':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'holiday':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return '✓';
      case 'absent':
        return '✗';
      case 'leave':
        return '📋';
      case 'late':
        return '⏰';
      case 'weekend':
        return '📅';
      case 'holiday':
        return '🎉';
      default:
        return '?';
    }
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayData = (date: Date) => {
    const key = formatDateKey(date);
    return attendanceData[key] || { status: 'no-data' };
  };

  const getMonthStats = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const stats = {
      present: 0,
      absent: 0,
      leave: 0,
      late: 0,
      weekend: 0,
      holiday: 0
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayData = getDayData(date);
      if (stats[dayData.status] !== undefined) {
        stats[dayData.status]++;
      }
    }

    return stats;
  };

  const monthStats = getMonthStats();
  const attendancePercentage = Math.round((monthStats.present / (monthStats.present + monthStats.absent + monthStats.late)) * 100) || 0;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Attendance Hub</h1>
          <p className="text-gray-600 mt-1">Track and manage attendance records</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#05A7CC] hover:bg-[#048ba8] text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendancePercentage}%</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <Users className="h-4 w-4 text-[#05A7CC]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#05A7CC]">{monthStats.present}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Days</CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{monthStats.leave}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{monthStats.late}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Monthly Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => (
                      <SelectItem key={i} value={(new Date().getFullYear() - 2 + i).toString()}>
                        {new Date().getFullYear() - 2 + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(selectedYear, selectedMonth, i - 6);
                const isCurrentMonth = date.getMonth() === selectedMonth;
                const dayData = getDayData(date);
                
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      isCurrentMonth 
                        ? `${getStatusColor(dayData.status)} hover:opacity-80` 
                        : 'text-gray-300 hover:bg-gray-100'
                    } ${
                      selectedDate.toDateString() === date.toDateString() 
                        ? 'ring-2 ring-[#05A7CC]' 
                        : ''
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className={isCurrentMonth ? '' : 'text-gray-300'}>
                        {date.getDate()}
                      </span>
                      {isCurrentMonth && dayData.status !== 'no-data' && (
                        <span className="text-xs mt-1">
                          {getStatusIcon(dayData.status)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              {[
                { status: 'present', label: 'Present' },
                { status: 'absent', label: 'Absent' },
                { status: 'leave', label: 'Leave' },
                { status: 'late', label: 'Late' },
                { status: 'weekend', label: 'Weekend' },
                { status: 'holiday', label: 'Holiday' }
              ].map(({ status, label }) => (
                <div key={status} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded ${getStatusColor(status)}`}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Day Details & Team Status */}
        <div className="space-y-6">
          {/* Selected Day Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const dayData = getDayData(selectedDate);
                return (
                  <div className="space-y-3">
                    <Badge className={getStatusColor(dayData.status)}>
                      {dayData.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    
                    {dayData.checkIn && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Check In:</span>
                          <span className="text-sm font-medium">{dayData.checkIn}</span>
                        </div>
                        {dayData.checkOut && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Check Out:</span>
                            <span className="text-sm font-medium">{dayData.checkOut}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {dayData.leaveType && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Leave Type:</span>
                        <span className="text-sm font-medium">{dayData.leaveType}</span>
                      </div>
                    )}
                    
                    {dayData.holiday && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Holiday:</span>
                        <span className="text-sm font-medium">{dayData.holiday}</span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Team Status Today */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Status Today</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {teamAttendance.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{member.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {member.checkIn && (
                        <span className="text-xs text-gray-500">{member.checkIn}</span>
                      )}
                      <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};