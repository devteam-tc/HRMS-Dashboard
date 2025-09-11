import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarHeader = ({
  currentDate,
  viewMode,
  onNavigateMonth,
  onNavigateWeek,
  onNavigateDay,
  onViewModeChange,
  onNewMeeting,
  monthNames
}) => {
  return (
    <div className="neu-card p-8 rounded-3xl mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Meeting Calendar</h1>
            <p className="text-[#666666]">View and manage your meeting schedule</p>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                if (viewMode === 'month') onNavigateMonth(-1);
                else if (viewMode === 'week') onNavigateWeek(-1);
                else onNavigateDay(-1);
              }}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center min-w-[200px]">
              <div className="text-xl font-bold text-[#333333]">
                {viewMode === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                {viewMode === 'week' && `Week of ${currentDate.toLocaleDateString()}`}
                {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (viewMode === 'month') onNavigateMonth(1);
                else if (viewMode === 'week') onNavigateWeek(1);
                else onNavigateDay(1);
              }}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
            {['month', 'week', 'day'].map(mode => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  viewMode === mode 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <button 
            onClick={onNewMeeting}
            className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
