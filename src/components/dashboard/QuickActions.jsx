import React from 'react';

const QuickActions = ({ actions }) => (
  <div className="bg-white p-8 rounded-3xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#333333] mb-2">Quick Actions</h3>
      <p className="text-[#666666]">Frequently used actions for faster workflow</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            className="bg-white p-6 rounded-3xl flex flex-col items-center space-y-4 hover:scale-105 transition-transform duration-200 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]"
          >
            <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center text-white`}>
              <Icon className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-bold text-[#333333] mb-1">{action.title}</p>
              <p className="text-sm text-[#666666]">{action.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export default QuickActions;
