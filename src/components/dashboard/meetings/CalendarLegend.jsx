import React from 'react';

const CalendarLegend = () => {
  const statuses = [
    { color: '#4CAF50', label: 'Completed' },
    { color: '#05A7CC', label: 'Scheduled' },
    { color: '#EF5226', label: 'Cancelled' },
    { color: '#FFC107', label: 'Pending' }
  ];

  return (
    <div className="neu-card p-6 rounded-3xl">
      <h3 className="text-lg font-bold text-[#333333] mb-4">Meeting Status</h3>
      <div className="flex items-center space-x-8">
        {statuses.map((status, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: status.color }}
            ></div>
            <span className="text-[#666666]">{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarLegend;
