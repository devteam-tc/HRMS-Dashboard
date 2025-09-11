import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const RecentActivities = ({ activities }) => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] h-full">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#333333] mb-2">Recent Activities</h3>
      <p className="text-[#666666]">Latest system activities</p>
    </div>
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div key={index} className="bg-[#ECF0F3] p-4 rounded-2xl shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={activity.avatar} />
              <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium text-[#333333]">{activity.user}</span>
                <span className="text-[#666666]"> {activity.action}</span>
              </p>
              <p className="text-xs text-[#999999]">{activity.time}</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              activity.type === 'success' ? 'bg-[#4CAF50]' : 'bg-[#05A7CC]'
            }`}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivities;
