import React from 'react';

const Meetings = ({ meetings }) => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] h-full">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#333333] mb-2">Today's Meetings</h3>
      <p className="text-[#666666]">Scheduled meetings for today</p>
    </div>
    <div className="space-y-3">
      {meetings.map((meeting, index) => (
        <div key={index} className="bg-[#ECF0F3] p-4 rounded-2xl shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#05A7CC] rounded-full"></div>
              <div>
                <p className="font-medium text-[#333333]">{meeting.title}</p>
                <p className="text-xs text-[#666666]">{meeting.time} • {meeting.participants} participants</p>
              </div>
            </div>
            <div className="bg-[#ECF0F3] px-3 py-1 rounded-xl shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]">
              <span className="text-xs font-medium text-[#666666]">{meeting.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Meetings;
