import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Eye, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const employees = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    status: 'active',
    joinDate: '2022-03-15',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP001'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    status: 'active',
    joinDate: '2021-08-20',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP002'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 345-6789',
    position: 'UX Designer',
    department: 'Design',
    location: 'Austin, TX',
    status: 'on-leave',
    joinDate: '2023-01-10',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP003'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 456-7890',
    position: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    status: 'active',
    joinDate: '2022-11-05',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP004'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@company.com',
    phone: '+1 (555) 567-8901',
    position: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Seattle, WA',
    status: 'active',
    joinDate: '2021-06-12',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP005'
  }
];

export const ViewAllEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-[#4CAF50] text-white';
      case 'inactive':
        return 'bg-[#EF5226] text-white';
      case 'on-leave':
        return 'bg-[#FFC107] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">All Employees</h1>
            <p className="text-[#666666]">Manage and view all employee information</p>
          </div>
          <button className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, position, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{employees.length}</div>
          <div className="text-[#666666]">Total Employees</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {employees.filter(emp => emp.status === 'active').length}
          </div>
          <div className="text-[#666666]">Active</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#FFC107] mb-2">
            {employees.filter(emp => emp.status === 'on-leave').length}
          </div>
          <div className="text-[#666666]">On Leave</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">{departments.length}</div>
          <div className="text-[#666666]">Departments</div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="neu-small p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Avatar */}
                  <div className="neu-small rounded-2xl p-2">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-lg">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Employee Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-[#333333]">{employee.name}</h3>
                      <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {employee.status.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#666666]">ID:</span>
                        <span className="font-medium text-[#333333]">{employee.employeeId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#666666]">Position:</span>
                        <span className="font-medium text-[#333333]">{employee.position}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#666666]">Department:</span>
                        <span className="font-medium text-[#333333]">{employee.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{employee.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#333333]">{employee.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8] transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <h3 className="text-xl font-medium text-[#333333] mb-2">No employees found</h3>
              <p className="text-[#666666]">Try adjusting your search filters or add a new employee.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredEmployees.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
            <div className="flex items-center space-x-2">
              <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#333333]">
                Previous
              </button>
              <div className="neu-card-inset px-4 py-2 rounded-xl">
                <span className="font-medium text-[#333333]">1</span>
              </div>
              <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#333333]">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};