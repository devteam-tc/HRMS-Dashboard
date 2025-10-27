import React, { useState } from 'react';
import { Search, Filter, Grid, List, Eye, Edit, Archive, Phone, Mail, MapPin, Calendar, Users, Download, Plus } from 'lucide-react';

export const EmployeeDirectory = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock employee data
  const employees = [
    {
      id: 1,
      name: 'John Smith',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      status: 'Active',
      joiningDate: '2022-03-15',
      location: 'New York',
      phone: '+1 234-567-8901',
      email: 'john.smith@company.com',
      avatar: '/placeholder-avatar.jpg',
      manager: 'Sarah Wilson',
      employeeId: 'EMP001'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      designation: 'Marketing Manager',
      department: 'Marketing',
      status: 'Active',
      joiningDate: '2021-08-22',
      location: 'San Francisco',
      phone: '+1 234-567-8902',
      email: 'emily.johnson@company.com',
      avatar: '/placeholder-avatar.jpg',
      manager: 'Michael Brown',
      employeeId: 'EMP002'
    },
    {
      id: 3,
      name: 'Michael Davis',
      designation: 'UI/UX Designer',
      department: 'Design',
      status: 'Active',
      joiningDate: '2023-01-10',
      location: 'Chicago',
      phone: '+1 234-567-8903',
      email: 'michael.davis@company.com',
      avatar: '/placeholder-avatar.jpg',
      manager: 'Lisa Anderson',
      employeeId: 'EMP003'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      designation: 'Engineering Manager',
      department: 'Engineering',
      status: 'Active',
      joiningDate: '2020-05-18',
      location: 'New York',
      phone: '+1 234-567-8904',
      email: 'sarah.wilson@company.com',
      avatar: '/placeholder-avatar.jpg',
      manager: 'David Miller',
      employeeId: 'EMP004'
    },
    {
      id: 5,
      name: 'Robert Chen',
      designation: 'Data Analyst',
      department: 'Analytics',
      status: 'On Leave',
      joiningDate: '2022-09-05',
      location: 'Los Angeles',
      phone: '+1 234-567-8905',
      email: 'robert.chen@company.com',
      avatar: '/placeholder-avatar.jpg',
      manager: 'Jennifer Liu',
      employeeId: 'EMP005'
    },
    {
      id: 6,
      name: 'Amanda Taylor',
      designation: 'HR Specialist',
      department: 'Human Resources',
      status: 'Active',
      joiningDate: '2021-11-12',
      location: 'Boston',
      phone: '+1 234-567-8906',
      email: 'amanda.taylor@company.com',
      avatar: '/placeholder-avatar.jpg',
      manager: 'Susan Garcia',
      employeeId: 'EMP006'
    }
  ];

  const departments = ['All', 'Engineering', 'Marketing', 'Design', 'Analytics', 'Human Resources', 'Sales', 'Finance'];
  const statuses = ['All', 'Active', 'On Leave', 'Inactive'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'department':
        return a.department.localeCompare(b.department);
      case 'joiningDate':
        return new Date(a.joiningDate) - new Date(b.joiningDate);
      default:
        return 0;
    }
  });

  const handleQuickAction = (action, employee) => {
    switch (action) {
      case 'view':
        onNavigate?.('employee-details', { employeeId: employee.id });
        break;
      case 'edit':
        onNavigate?.('add-employee', { mode: 'edit', employeeId: employee.id });
        break;
      case 'archive':
        console.log('Archive employee:', employee.id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#333333] mb-2">Employee Directory</h1>
            <p className="text-[#666666] text-lg">Manage and view all employee information</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate?.('add-employee')}
              className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Plus size={20} />
              <span>Add Employee</span>
            </button>
            <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2">
              <Download size={20} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="neu-small p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#333333]">{employees.length}</p>
                <p className="text-sm text-[#666666]">Total Employees</p>
              </div>
              <div className="w-12 h-12 neu-gradient rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#05A7CC]" />
              </div>
            </div>
          </div>
          <div className="neu-small p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#333333]">{employees.filter(e => e.status === 'Active').length}</p>
                <p className="text-sm text-[#666666]">Active</p>
              </div>
              <div className="w-12 h-12 neu-secondary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="neu-small p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#333333]">{employees.filter(e => e.status === 'On Leave').length}</p>
                <p className="text-sm text-[#666666]">On Leave</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="neu-small p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#333333]">{departments.length - 1}</p>
                <p className="text-sm text-[#666666]">Departments</p>
              </div>
              <div className="w-12 h-12 neu-primary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666] w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees by name, designation, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neu-input w-full pl-12 pr-4 py-3 rounded-2xl text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="neu-input px-4 py-3 rounded-2xl text-[#333333]"
            >
              {departments.map(dept => (
                <option key={dept} value={dept.toLowerCase()}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="neu-input px-4 py-3 rounded-2xl text-[#333333]"
            >
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="neu-input px-4 py-3 rounded-2xl text-[#333333]"
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="joiningDate">Sort by Joining Date</option>
            </select>

            {/* View Toggle */}
            <div className="neu-small p-1 rounded-2xl flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Grid/List */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#333333]">
            {sortedEmployees.length} Employee{sortedEmployees.length !== 1 ? 's' : ''} Found
          </h3>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedEmployees.map((employee) => (
              <div key={employee.id} className="neu-small p-6 rounded-2xl hover:scale-105 transition-transform">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 neu-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-[#05A7CC]">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#333333] mb-1">{employee.name}</h4>
                  <p className="text-sm text-[#666666] mb-1">{employee.designation}</p>
                  <p className="text-xs text-[#999999]">{employee.employeeId}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-[#666666]">
                    <Users size={12} className="mr-2" />
                    {employee.department}
                  </div>
                  <div className="flex items-center text-xs text-[#666666]">
                    <MapPin size={12} className="mr-2" />
                    {employee.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : employee.status === 'On Leave'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleQuickAction('view', employee)}
                    className="neu-button p-2 rounded-xl hover:text-[#05A7CC] transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleQuickAction('edit', employee)}
                    className="neu-button p-2 rounded-xl hover:text-[#EF5226] transition-colors"
                    title="Edit Employee"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleQuickAction('archive', employee)}
                    className="neu-button p-2 rounded-xl hover:text-[#dc2626] transition-colors"
                    title="Archive Employee"
                  >
                    <Archive size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEmployees.map((employee) => (
              <div key={employee.id} className="neu-small p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 neu-gradient rounded-full flex items-center justify-center">
                      <span className="font-bold text-[#05A7CC]">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#333333]">{employee.name}</h4>
                      <p className="text-sm text-[#666666]">{employee.designation}</p>
                      <p className="text-xs text-[#999999]">{employee.employeeId}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center space-x-8">
                    <div>
                      <p className="text-sm font-medium text-[#333333]">{employee.department}</p>
                      <p className="text-xs text-[#666666]">Department</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#333333]">{employee.location}</p>
                      <p className="text-xs text-[#666666]">Location</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#333333]">{new Date(employee.joiningDate).toLocaleDateString()}</p>
                      <p className="text-xs text-[#666666]">Joining Date</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : employee.status === 'On Leave'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {employee.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuickAction('view', employee)}
                      className="neu-button p-2 rounded-xl hover:text-[#05A7CC] transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleQuickAction('edit', employee)}
                      className="neu-button p-2 rounded-xl hover:text-[#EF5226] transition-colors"
                      title="Edit Employee"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleQuickAction('archive', employee)}
                      className="neu-button p-2 rounded-xl hover:text-[#dc2626] transition-colors"
                      title="Archive Employee"
                    >
                      <Archive size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};