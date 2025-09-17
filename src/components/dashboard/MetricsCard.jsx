import React from 'react';

const MetricsCard = ({ icon: Icon, value, change, title, subtitle, iconColor, changeType = 'increase' }) => (
  <div className="bg-white p-6 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-[#ECF0F3] p-3 rounded-2xl shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]">
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-[#333333]">{value}</div>
        <div className={`text-sm ${changeType === 'increase' ? 'text-[#4CAF50]' : 'text-[#EF5226]'} font-medium`}>
          {change}
        </div>
      </div>
    </div>
    <div>
      <h3 className="font-medium text-[#333333] mb-1">{title}</h3>
      {subtitle && <div className="text-xs text-[#666666]">{subtitle}</div>}
    </div>
  </div>
);

export default MetricsCard;
