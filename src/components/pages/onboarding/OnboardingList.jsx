import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, UserPlus, Download, Calendar } from 'lucide-react';

export const OnboardingList = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const onboardingData = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@company.com',
      position: 'Software Engineer',
      department: 'Engineering',
      joinDate: '2024-01-15',
      status: 'In Progress',
      progress: 85,
      daysRemaining: 2,
      phone: '+1 (555) 123-4567',
      manager: 'John Smith'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@company.com',
      position: 'Product Manager',
      department: 'Product',
      joinDate: '2024-01-20',
      status: 'Document Review',
      progress: 60,
      daysRemaining: 5,
      phone: '+1 (555) 234-5678',
      manager: 'Sarah Davis'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.davis@company.com',
      position: 'UX Designer',
      department: 'Design',
      joinDate: '2024-01-25',
      status: 'Final Steps',
      progress: 95,
      daysRemaining: 1,
      phone: '+1 (555) 345-6789',
      manager: 'Mike Wilson'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      position: 'Data Analyst',
      department: 'Analytics',
      joinDate: '2024-01-30',
      status: 'IT Setup',
      progress: 40,
      daysRemaining: 7,
      phone: '+1 (555) 456-7890',
      manager: 'Lisa Brown'
    },
    {
      id: 5,
      name: 'Emma Brown',
      email: 'emma.brown@company.com',
      position: 'Marketing Manager',
      department: 'Marketing',
      joinDate: '2024-02-05',
      status: 'Not Started',
      progress: 0,
      daysRemaining: 10,
      phone: '+1 (555) 567-8901',
      manager: 'Tom Anderson'
    },
    {
      id: 6,
      name: 'Frank Miller',
      email: 'frank.miller@company.com',
      position: 'DevOps Engineer',
      department: 'Engineering',
      joinDate: '2024-02-10',
      status: 'Training Allocation',
      progress: 75,
      daysRemaining: 3,
      phone: '+1 (555) 678-9012',
      manager: 'John Smith'
    }
  ];

  const statusColors = {
    'Not Started': 'text-gray-600',
    'In Progress': 'text-blue-600',
    'Document Review': 'text-orange-600',
    'IT Setup': 'text-purple-600',
    'Training Allocation': 'text-indigo-600',
    'Final Steps': 'text-green-600',
    'Completed': 'text-green-700'
  };

  const filteredData = onboardingData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = ['all', ...new Set(onboardingData.map(emp => emp.department))];
  const statuses = ['all', ...new Set(onboardingData.map(emp => emp.status))];

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-[#333333]">Onboarding List</h1>
          <p className="text-[#666666]">Manage all employee onboarding processes</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
            onClick={() => onNavigate('onboarding-reports')}
          >
            <Download className="h-5 w-5" />
          </button>
          <button 
            className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
            onClick={() => onNavigate('onboarding-calendar')}
          >
            <Calendar className="h-5 w-5" />
          </button>
          <button 
            className="neu-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200"
            onClick={() => onNavigate('add-new-onboarding')}
          >
            <UserPlus className="h-5 w-5" />
            Add New Onboarding
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 neu-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>

          {/* Advanced Filters Button */}
          <button className="neu-button px-4 py-3 rounded-xl flex items-center gap-2 text-[#05A7CC] hover:scale-105 transition-all duration-200">
            <Filter className="h-5 w-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-[#666666]">
          Showing {filteredData.length} of {onboardingData.length} onboarding records
        </p>
      </div>

      {/* Onboarding Table */}
      <div className="neu-card p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBEF]">
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Employee</th>
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Position</th>
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Department</th>
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Join Date</th>
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Status</th>
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Progress</th>
                <th className="text-left py-4 px-4 font-medium text-[#333333]">Days Left</th>
                <th className="text-right py-4 px-4 font-medium text-[#333333]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((employee) => (
                <tr key={employee.id} className="border-b border-[#E8EBEF] hover:bg-[#F7F9FC] transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-[#333333]">{employee.name}</div>
                      <div className="text-sm text-[#666666]">{employee.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#333333]">{employee.position}</td>
                  <td className="py-4 px-4 text-[#333333]">{employee.department}</td>
                  <td className="py-4 px-4 text-[#333333]">{employee.joinDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm neu-small ${statusColors[employee.status]}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 neu-card-inset rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                          style={{ width: `${employee.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#333333] min-w-[40px]">{employee.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm neu-small ${
                      employee.daysRemaining <= 2 ? 'text-red-600' : 
                      employee.daysRemaining <= 5 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {employee.daysRemaining} days
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button 
                        className="neu-button p-2 rounded-lg text-[#05A7CC] hover:scale-110 transition-all duration-200"
                        onClick={() => onNavigate('onboarding-details', { employeeId: employee.id })}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="neu-button p-2 rounded-lg text-[#05A7CC] hover:scale-110 transition-all duration-200"
                        onClick={() => onNavigate('onboarding-checklist', { employeeId: employee.id })}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="neu-button p-2 rounded-lg text-[#666666] hover:scale-110 transition-all duration-200">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};