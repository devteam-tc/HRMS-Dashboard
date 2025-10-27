import React from 'react';
import { TrendingUp, Users, Clock, CheckCircle, AlertCircle, UserPlus, Calendar, FileText } from 'lucide-react';

export const OnboardingDashboard = ({ onNavigate }) => {
  const kpiData = [
    { title: 'Active Onboarding', value: '24', change: '+12%', trend: 'up', icon: Users },
    { title: 'Avg. Onboarding Time', value: '8.5 days', change: '-2.3%', trend: 'down', icon: Clock },
    { title: 'Completion Rate', value: '92%', change: '+5.2%', trend: 'up', icon: CheckCircle },
    { title: 'Pending Approvals', value: '6', change: '+3', trend: 'neutral', icon: AlertCircle }
  ];

  const recentOnboarding = [
    { id: 1, name: 'Alice Johnson', position: 'Software Engineer', joinDate: '2024-01-15', progress: 85, status: 'In Progress' },
    { id: 2, name: 'Bob Smith', position: 'Product Manager', joinDate: '2024-01-20', progress: 60, status: 'Document Review' },
    { id: 3, name: 'Carol Davis', position: 'UX Designer', joinDate: '2024-01-25', progress: 95, status: 'Final Steps' },
    { id: 4, name: 'David Wilson', position: 'Data Analyst', joinDate: '2024-01-30', progress: 40, status: 'IT Setup' }
  ];

  const upcomingJoinings = [
    { name: 'Emma Brown', position: 'Marketing Manager', joinDate: '2024-02-05', daysLeft: 3 },
    { name: 'Frank Miller', position: 'DevOps Engineer', joinDate: '2024-02-10', daysLeft: 8 },
    { name: 'Grace Taylor', position: 'Business Analyst', joinDate: '2024-02-15', daysLeft: 13 }
  ];

  const quickActions = [
    { title: 'Add New Onboarding', icon: UserPlus, action: () => onNavigate('add-new-onboarding'), color: 'neu-primary' },
    { title: 'View All Onboarding', icon: Users, action: () => onNavigate('onboarding-list'), color: 'neu-secondary' },
    { title: 'Onboarding Calendar', icon: Calendar, action: () => onNavigate('onboarding-calendar'), color: 'neu-card' },
    { title: 'Generate Reports', icon: FileText, action: () => onNavigate('onboarding-reports'), color: 'neu-card' }
  ];

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      <div className="mb-8">
        <h1 className="mb-2 text-[#333333]">Onboarding Dashboard</h1>
        <p className="text-[#666666]">Monitor and manage employee onboarding processes</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <div key={index} className="neu-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="neu-button p-3 rounded-xl">
                  <IconComponent className="h-6 w-6 text-[#05A7CC]" />
                </div>
                <div className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-[#666666]'}`}>
                  {kpi.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#333333] mb-1">{kpi.value}</h3>
                <p className="text-sm text-[#666666]">{kpi.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} p-6 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-all duration-200`}
            >
              <IconComponent className={`h-8 w-8 mb-3 ${action.color === 'neu-card' ? 'text-[#05A7CC]' : 'text-white'}`} />
              <span className={`font-medium ${action.color === 'neu-card' ? 'text-[#333333]' : 'text-white'}`}>{action.title}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Onboarding Progress */}
        <div className="lg:col-span-2 neu-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-[#333333] mb-6">Recent Onboarding Progress</h2>
          <div className="space-y-4">
            {recentOnboarding.map((employee) => (
              <div 
                key={employee.id} 
                className="neu-small p-4 rounded-xl cursor-pointer hover:scale-102 transition-all duration-200"
                onClick={() => onNavigate('onboarding-details', { employeeId: employee.id })}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-[#333333]">{employee.name}</h3>
                    <p className="text-sm text-[#666666]">{employee.position}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#333333]">{employee.progress}%</div>
                    <div className="text-xs text-[#666666]">{employee.status}</div>
                  </div>
                </div>
                <div className="w-full neu-card-inset rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                    style={{ width: `${employee.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[#666666] mt-2">Join Date: {employee.joinDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Joinings */}
        <div className="neu-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-[#333333] mb-6">Upcoming Joinings</h2>
          <div className="space-y-4">
            {upcomingJoinings.map((employee, index) => (
              <div key={index} className="neu-small p-4 rounded-xl">
                <h3 className="font-medium text-[#333333] mb-1">{employee.name}</h3>
                <p className="text-sm text-[#666666] mb-2">{employee.position}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666]">{employee.joinDate}</span>
                  <span className={`text-xs px-2 py-1 rounded-full neu-small ${
                    employee.daysLeft <= 3 ? 'text-red-600' : 
                    employee.daysLeft <= 7 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {employee.daysLeft} days
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="w-full mt-4 neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-102 transition-all duration-200"
            onClick={() => onNavigate('onboarding-calendar')}
          >
            View Full Calendar
          </button>
        </div>
      </div>
    </div>
  );
};