import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AttritionChart = ({ data }) => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#333333] mb-2">Attrition Rate Trends</h3>
      <p className="text-[#666666]">Monthly attrition percentage over the last 6 months</p>
    </div>
    <div className="bg-[#ECF0F3] p-4 rounded-2xl shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
          <XAxis dataKey="month" stroke="#666666" />
          <YAxis stroke="#666666" />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ECF0F3',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#EF5226" 
            strokeWidth={3}
            dot={{ fill: '#EF5226', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AttritionChart;
