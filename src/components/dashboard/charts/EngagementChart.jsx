import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const EngagementChart = ({ data }) => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] h-full">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#333333] mb-2">Employee Engagement</h3>
      <p className="text-[#666666]">Distribution of engagement levels</p>
    </div>
    <div className="bg-[#ECF0F3] p-4 rounded-2xl shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ECF0F3',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
            }}
            formatter={(value) => [`${value}%`, 'Employees']} 
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs text-[#666666]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EngagementChart;
