import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PayrollChart = ({ data }) => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#333333] mb-2">Monthly Payroll Overview</h3>
      <p className="text-[#666666]">Payroll costs over the last 6 months</p>
    </div>
    <div className="bg-[#ECF0F3] p-4 rounded-2xl shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
            formatter={(value) => [`$${value?.toLocaleString()}`, 'Amount']} 
          />
          <Bar dataKey="amount" fill="#05A7CC" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PayrollChart;
