import React from 'react';

const WelcomeHeader = () => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#333333] mb-2">Welcome back, John! 👋</h1>
        <p className="text-[#666666] text-lg">Here's what's happening at your organization today.</p>
      </div>
      <div className="bg-[#ECF0F3] p-6 rounded-2xl text-center shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
        <p className="text-sm text-[#666666] mb-1">Today</p>
        <p className="text-xl font-bold text-[#333333]">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  </div>
);

export default WelcomeHeader;
