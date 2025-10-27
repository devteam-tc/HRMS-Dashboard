import React, { useState } from 'react';
import { Clock, TrendingUp, User, Download, Filter, Calendar, DollarSign, BarChart3, ChevronUp, ChevronDown } from 'lucide-react';

export const OvertimeHours = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState('this-month');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('hours');
  const [sortOrder, setSortOrder] = useState('desc');

  const overtimeData = [
    {
      employee: 'John Doe',
      employeeId: 'EMP001',
      avatar: 'JD',
      department: 'IT',
      regularHours: 160,
      overtimeHours: 24,
      overtimeRate: 25.50,
      totalOvertimePay: 612,
      averageDaily: 1.2,
      weeklyBreakdown: [4, 6, 5, 4, 5],
      status: 'approved',
      trend: 'up'
    },
    {
      employee: 'Sarah Wilson',
      employeeId: 'EMP002',
      avatar: 'SW',
      department: 'HR',
      regularHours: 160,
      overtimeHours: 12,
      overtimeRate: 28.00,
      totalOvertimePay: 336,
      averageDaily: 0.6,
      weeklyBreakdown: [2, 3, 2, 3, 2],
      status: 'approved',
      trend: 'down'
    },
    {
      employee: 'Mike Johnson',
      employeeId: 'EMP003',
      avatar: 'MJ',
      department: 'Support',
      regularHours: 160,
      overtimeHours: 32,
      overtimeRate: 22.00,
      totalOvertimePay: 704,
      averageDaily: 1.6,
      weeklyBreakdown: [8, 7, 6, 5, 6],
      status: 'pending',
      trend: 'up'
    },
    {
      employee: 'Emma Brown',
      employeeId: 'EMP004',
      avatar: 'EB',
      department: 'Development',
      regularHours: 160,
      overtimeHours: 18,
      overtimeRate: 32.00,
      totalOvertimePay: 576,
      averageDaily: 0.9,
      weeklyBreakdown: [3, 4, 4, 3, 4],
      status: 'approved',
      trend: 'stable'
    },
    {
      employee: 'David Lee',
      employeeId: 'EMP005',
      avatar: 'DL',
      department: 'Operations',
      regularHours: 160,
      overtimeHours: 28,
      overtimeRate: 24.00,
      totalOvertimePay: 672,
      averageDaily: 1.4,
      weeklyBreakdown: [5, 6, 7, 5, 5],
      status: 'approved',
      trend: 'up'
    }
  ];

  const departmentSummary = [
    {
      department: 'IT',
      employees: 15,
      totalOvertimeHours: 180,
      totalCost: 4680,
      averagePerEmployee: 12,
      trend: '+15%',
      color: '#EF5226'
    },
    {
      department: 'Support',
      employees: 12,
      totalOvertimeHours: 156,
      totalCost: 3432,
      averagePerEmployee: 13,
      trend: '+22%',
      color: '#05A7CC'
    },
    {
      department: 'Development',
      employees: 18,
      totalOvertimeHours: 216,
      totalCost: 6912,
      averagePerEmployee: 12,
      trend: '+8%',
      color: '#4CAF50'
    },
    {
      department: 'Operations',
      employees: 10,
      totalOvertimeHours: 140,
      totalCost: 3360,
      averagePerEmployee: 14,
      trend: '+18%',
      color: '#9C27B0'
    }
  ];

  const monthlyTrend = [
    { month: 'Oct', hours: 450, cost: 11250, efficiency: 85 },
    { month: 'Nov', hours: 520, cost: 13520, efficiency: 78 },
    { month: 'Dec', hours: 480, cost: 12480, efficiency: 82 },
    { month: 'Jan', hours: 560, cost: 14560, efficiency: 75 },
    { month: 'Feb', hours: 692, cost: 18384, efficiency: 71 },
    { month: 'Mar', hours: 692, cost: 18384, efficiency: 73 }
  ];

  const filteredData = overtimeData.filter(emp => 
    departmentFilter === 'all' || emp.department === departmentFilter
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'hours':
        comparison = a.overtimeHours - b.overtimeHours;
        break;
      case 'cost':
        comparison = a.totalOvertimePay - b.totalOvertimePay;
        break;
      case 'name':
        comparison = a.employee.localeCompare(b.employee);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalOvertimeHours = filteredData.reduce((sum, emp) => sum + emp.overtimeHours, 0);
  const totalOvertimeCost = filteredData.reduce((sum, emp) => sum + emp.totalOvertimePay, 0);
  const averageOvertimePerEmployee = totalOvertimeHours / (filteredData.length || 1);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ChevronUp size={16} className="text-[#EF5226]" />;
      case 'down': return <ChevronDown size={16} className="text-green-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'IT': 'bg-[#EF5226]',
      'HR': 'bg-[#05A7CC]',
      'Support': 'bg-purple-500',
      'Development': 'bg-green-500',
      'Operations': 'bg-yellow-500'
    };
    return colors[department] || 'bg-gray-500';
  };

  // Layout: Split (Charts on Top, Table Below)
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Overtime & Working Hours</h1>
        <p className="text-[#666666]">Track overtime costs and analyze working hour patterns</p>
      </div>

      {/* Filters Section */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="custom">Custom Range</option>
            </select>

            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="all">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Support">Support</option>
              <option value="Development">Development</option>
              <option value="Operations">Operations</option>
            </select>

            <select 
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="neu-input px-4 py-3 rounded-xl text-[#333333] focus:ring-2 focus:ring-[#EF5226] transition-all"
            >
              <option value="hours-desc">Hours (High to Low)</option>
              <option value="hours-asc">Hours (Low to High)</option>
              <option value="cost-desc">Cost (High to Low)</option>
              <option value="cost-asc">Cost (Low to High)</option>
              <option value="name-asc">Name (A to Z)</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="neu-button px-6 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
            <button 
              onClick={() => onNavigate('attendance-reports')}
              className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
            >
              <BarChart3 size={16} className="mr-2" />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* TOP SECTION - CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Summary Cards */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-6">Monthly Overview</h3>
          <div className="space-y-4">
            <div className="neu-small p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#EF5226] mb-1">{totalOvertimeHours}h</div>
              <div className="text-[#666666] text-sm">Total Overtime</div>
            </div>
            <div className="neu-small p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">${totalOvertimeCost.toLocaleString()}</div>
              <div className="text-[#666666] text-sm">Total Cost</div>
            </div>
            <div className="neu-small p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#05A7CC] mb-1">{averageOvertimePerEmployee.toFixed(1)}h</div>
              <div className="text-[#666666] text-sm">Avg per Employee</div>
            </div>
          </div>
        </div>

        {/* Department Breakdown Chart */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-6">Department Breakdown</h3>
          <div className="space-y-4">
            {departmentSummary.map((dept, index) => (
              <div key={dept.department} className="neu-small p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: dept.color }}
                    ></div>
                    <span className="font-medium text-[#333333]">{dept.department}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">{dept.trend}</span>
                </div>
                <div className="neu-card-inset rounded-lg p-1">
                  <div 
                    className="h-2 rounded-lg transition-all duration-300"
                    style={{ 
                      width: `${(dept.totalOvertimeHours / 300) * 100}%`,
                      backgroundColor: dept.color
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-[#666666] mt-2">
                  <span>{dept.totalOvertimeHours}h</span>
                  <span>${dept.totalCost.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Analysis Chart */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[#333333] mb-6">6-Month Trend</h3>
          <div className="space-y-3">
            {monthlyTrend.map((month, index) => (
              <div key={month.month} className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#333333] font-medium text-sm">{month.month}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#666666] text-xs">{month.hours}h</span>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      month.efficiency >= 80 ? 'bg-green-100 text-green-700' :
                      month.efficiency >= 70 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {month.efficiency}%
                    </div>
                  </div>
                </div>
                <div className="neu-card-inset rounded-lg p-1">
                  <div 
                    className="h-2 neu-primary rounded-lg transition-all duration-300"
                    style={{ width: `${(month.hours / 700) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[#666666] mt-1">
                  Cost: ${month.cost.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - DETAILED TABLE */}
      <div className="neu-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#E8EBEF] bg-gradient-to-r from-[#ECF0F3] to-[#E8EBEF]">
          <h2 className="text-xl font-bold text-[#333333]">Employee Overtime Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#E8EBEF] to-[#ECF0F3]">
              <tr>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Employee</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Department</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Overtime Hours</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Rate/Hour</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Total Pay</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Weekly Pattern</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Trend</th>
                <th className="px-6 py-4 text-left text-[#333333] font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((employee, index) => (
                <tr 
                  key={employee.employeeId} 
                  className={`border-b border-[#E8EBEF] hover:bg-gradient-to-r hover:from-[#ECF0F3] hover:to-[#E8EBEF] transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFB]'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`neu-small w-10 h-10 rounded-full flex items-center justify-center mr-4 ${getDepartmentColor(employee.department)} text-white font-semibold`}>
                        {employee.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-[#333333]">{employee.employee}</div>
                        <div className="text-[#666666] text-sm">{employee.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getDepartmentColor(employee.department)}`}>
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[#333333] font-bold text-lg">{employee.overtimeHours}h</div>
                    <div className="text-[#666666] text-sm">{employee.averageDaily}h/day avg</div>
                  </td>
                  <td className="px-6 py-4 text-[#333333] font-semibold">
                    ${employee.overtimeRate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[#EF5226] font-bold text-lg">
                      ${employee.totalOvertimePay}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      {employee.weeklyBreakdown.map((hours, idx) => (
                        <div key={idx} className="neu-small p-2 rounded text-xs font-medium text-center min-w-8">
                          {hours}h
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getTrendIcon(employee.trend)}
                      <span className="ml-1 text-sm font-medium capitalize">{employee.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      employee.status === 'approved' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-6 border-t border-[#E8EBEF] bg-gradient-to-r from-[#ECF0F3] to-[#E8EBEF]">
          <div className="flex justify-between items-center">
            <div className="text-[#666666] text-sm">
              Showing {sortedData.length} employees with overtime this period
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-[#666666]">
                Total Cost: <span className="font-bold text-[#EF5226]">${totalOvertimeCost.toLocaleString()}</span>
              </div>
              <div className="text-[#666666]">
                Avg Efficiency: <span className="font-bold text-[#05A7CC]">76%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};