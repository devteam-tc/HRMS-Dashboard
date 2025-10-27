import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Wifi, Calendar, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const timeLogs = [
  {
    id: '1',
    date: '2024-01-15',
    punchIn: '09:15 AM',
    punchOut: '06:30 PM',
    totalHours: '9h 15m',
    status: 'present',
    location: 'Office - New York'
  },
  {
    id: '2',
    date: '2024-01-14',
    punchIn: '10:30 AM',
    punchOut: '07:00 PM',
    totalHours: '8h 30m',
    status: 'late',
    location: 'Office - New York'
  },
  {
    id: '3',
    date: '2024-01-13',
    punchIn: '09:00 AM',
    punchOut: '02:00 PM',
    totalHours: '5h 00m',
    status: 'half-day',
    location: 'Office - New York'
  },
  {
    id: '4',
    date: '2024-01-12',
    punchIn: '08:45 AM',
    punchOut: '06:15 PM',
    totalHours: '9h 30m',
    status: 'present',
    location: 'Office - New York'
  }
];

export const PunchInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePunch = () => {
    if (!isPunchedIn) {
      // Punch In
      setIsPunchedIn(true);
      setPunchInTime(currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    } else {
      // Punch Out
      setIsPunchedIn(false);
      setPunchInTime(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-[#4CAF50] text-white';
      case 'late':
        return 'bg-[#FFC107] text-white';
      case 'half-day':
        return 'bg-[#05A7CC] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const todaysStats = {
    totalEmployees: 247,
    present: 198,
    late: 15,
    absent: 34
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Punch In/Out</h1>
            <p className="text-[#666666]">Track your attendance with a simple punch</p>
          </div>
          <div className="neu-card-inset p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[#333333] mb-1">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-[#666666]">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Punch Button Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Punch Button */}
          <div className="neu-card p-12 rounded-3xl text-center">
            <div className="mb-8">
              <div className="neu-small inline-block p-4 rounded-2xl mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-[#05A7CC] text-white text-2xl">JD</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold text-[#333333] mb-2">John Doe</h2>
              <p className="text-[#666666]">Employee ID: EMP001</p>
            </div>

            <div className="mb-8">
              <button
                onClick={handlePunch}
                className={`w-48 h-48 rounded-full text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                  isPunchedIn 
                    ? 'neu-secondary' 
                    : 'neu-primary'
                }`}
              >
                {isPunchedIn ? 'PUNCH OUT' : 'PUNCH IN'}
              </button>
            </div>

            {isPunchedIn && punchInTime && (
              <div className="neu-card-inset p-6 rounded-2xl inline-block">
                <div className="flex items-center space-x-3 text-[#333333]">
                  <Clock className="w-5 h-5 text-[#05A7CC]" />
                  <span>Punched in at {punchInTime}</span>
                </div>
              </div>
            )}

            {/* Location Info */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-[#666666]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Office - New York</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4" />
                <span>Connected</span>
              </div>
            </div>
          </div>

          {/* Time Logs Table */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Recent Time Logs</h3>
            
            <div className="space-y-4">
              {timeLogs.map((log) => (
                <div key={log.id} className="neu-small p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="neu-card-inset p-3 rounded-xl">
                        <Calendar className="w-5 h-5 text-[#666666]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#333333] mb-1">
                          {new Date(log.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-[#666666]">{log.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm text-[#666666] mb-1">Punch In</div>
                        <div className="font-medium text-[#333333]">{log.punchIn}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-[#666666] mb-1">Punch Out</div>
                        <div className="font-medium text-[#333333]">{log.punchOut || '--'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-[#666666] mb-1">Total</div>
                        <div className="font-medium text-[#333333]">{log.totalHours}</div>
                      </div>
                      <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(log.status)}`}>
                        {log.status.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-8">
          {/* Today's Stats */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Today's Overview</h3>
            
            <div className="space-y-6">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="neu-card-inset p-2 rounded-lg">
                      <Users className="w-4 h-4 text-[#666666]" />
                    </div>
                    <span className="text-[#333333] font-medium">Total</span>
                  </div>
                  <span className="text-xl font-bold text-[#333333]">{todaysStats.totalEmployees}</span>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-[#4CAF50] rounded-full"></div>
                    <span className="text-[#333333] font-medium">Present</span>
                  </div>
                  <span className="text-xl font-bold text-[#4CAF50]">{todaysStats.present}</span>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-[#FFC107] rounded-full"></div>
                    <span className="text-[#333333] font-medium">Late</span>
                  </div>
                  <span className="text-xl font-bold text-[#FFC107]">{todaysStats.late}</span>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-[#EF5226] rounded-full"></div>
                    <span className="text-[#333333] font-medium">Absent</span>
                  </div>
                  <span className="text-xl font-bold text-[#EF5226]">{todaysStats.absent}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h3>
            
            <div className="space-y-4">
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <div className="neu-small p-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-[#05A7CC]" />
                  </div>
                  <span className="font-medium text-[#333333]">View Attendance</span>
                </div>
              </button>

              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <div className="neu-small p-2 rounded-lg">
                    <Clock className="w-4 h-4 text-[#05A7CC]" />
                  </div>
                  <span className="font-medium text-[#333333]">Apply Leave</span>
                </div>
              </button>

              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <div className="neu-small p-2 rounded-lg">
                    <Users className="w-4 h-4 text-[#05A7CC]" />
                  </div>
                  <span className="font-medium text-[#333333]">Team Status</span>
                </div>
              </button>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">This Week</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Total Hours</span>
                <span className="font-bold text-[#333333]">42h 15m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Days Present</span>
                <span className="font-bold text-[#4CAF50]">4/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Avg. Check-in</span>
                <span className="font-bold text-[#333333]">9:22 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Late Days</span>
                <span className="font-bold text-[#FFC107]">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};