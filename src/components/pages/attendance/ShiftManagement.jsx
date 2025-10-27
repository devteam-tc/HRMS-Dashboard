import React, { useState } from 'react';
import { Plus, Edit3, Clock, Users, Calendar, Settings, Trash2, Copy, Eye, ArrowRight, ChevronDown } from 'lucide-react';

export const ShiftManagement = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('shifts');
  const [showAddShift, setShowAddShift] = useState(false);
  const [draggedEmployee, setDraggedEmployee] = useState(null);

  const shifts = [
    {
      id: 1,
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '18:00',
      breakDuration: '1h',
      workingHours: '8h',
      employees: 25,
      departments: ['IT', 'HR'],
      overtimeRule: 'After 8 hours',
      status: 'active',
      color: '#EF5226'
    },
    {
      id: 2,
      name: 'Evening Shift',
      startTime: '14:00',
      endTime: '23:00',
      breakDuration: '1h',
      workingHours: '8h',
      employees: 15,
      departments: ['Support', 'Operations'],
      overtimeRule: 'After 8 hours',
      status: 'active',
      color: '#05A7CC'
    },
    {
      id: 3,
      name: 'Night Shift',
      startTime: '23:00',
      endTime: '08:00',
      breakDuration: '1h',
      workingHours: '8h',
      employees: 8,
      departments: ['Security', 'Maintenance'],
      overtimeRule: 'After 8 hours',
      status: 'active',
      color: '#9C27B0'
    },
    {
      id: 4,
      name: 'Flexible Hours',
      startTime: 'Flexible',
      endTime: 'Flexible',
      breakDuration: '1h',
      workingHours: '8h',
      employees: 12,
      departments: ['Development', 'Design'],
      overtimeRule: 'After 8 hours',
      status: 'active',
      color: '#4CAF50'
    }
  ];

  const unassignedEmployees = [
    { id: 'emp1', name: 'Alex Johnson', department: 'IT', avatar: 'AJ' },
    { id: 'emp2', name: 'Maria Garcia', department: 'HR', avatar: 'MG' },
    { id: 'emp3', name: 'Tom Wilson', department: 'Support', avatar: 'TW' },
    { id: 'emp4', name: 'Lisa Zhang', department: 'Design', avatar: 'LZ' }
  ];

  const shiftAssignments = [
    {
      employee: 'John Doe',
      employeeId: 'EMP001',
      currentShift: 'Morning Shift',
      department: 'IT',
      startDate: '2024-01-15',
      status: 'active',
      avatar: 'JD'
    },
    {
      employee: 'Sarah Wilson',
      employeeId: 'EMP002',
      currentShift: 'Morning Shift',
      department: 'HR',
      startDate: '2024-02-01',
      status: 'active',
      avatar: 'SW'
    },
    {
      employee: 'Mike Johnson',
      employeeId: 'EMP003',
      currentShift: 'Evening Shift',
      department: 'Support',
      startDate: '2024-01-20',
      status: 'active',
      avatar: 'MJ'
    },
    {
      employee: 'Emma Brown',
      employeeId: 'EMP004',
      currentShift: 'Flexible Hours',
      department: 'Development',
      startDate: '2024-03-01',
      status: 'active',
      avatar: 'EB'
    }
  ];

  const handleDragStart = (e, employee) => {
    setDraggedEmployee(employee);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, shiftId) => {
    e.preventDefault();
    if (draggedEmployee) {
      console.log(`Assigning ${draggedEmployee.name} to shift ${shiftId}`);
      setDraggedEmployee(null);
    }
  };

  // Layout: Card/Grid-based with Drag & Drop
  const renderShiftsTab = () => (
    <div className="space-y-8">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Shift Management</h2>
          <p className="text-[#666666] text-sm mt-1">Organize and assign work shifts to employees</p>
        </div>
        <button 
          onClick={() => setShowAddShift(true)}
          className="neu-primary px-6 py-3 rounded-xl flex items-center hover:shadow-xl transition-all"
        >
          <Plus size={16} className="mr-2" />
          Create New Shift
        </button>
      </div>

      {/* Shifts Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {shifts.map((shift) => (
          <div 
            key={shift.id} 
            className="neu-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, shift.id)}
          >
            {/* Shift Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: shift.color }}
                ></div>
                <div>
                  <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#EF5226] transition-colors">
                    {shift.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                    shift.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {shift.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors">
                  <Edit3 size={16} />
                </button>
                <button className="neu-small p-2 rounded-lg hover:text-[#05A7CC] transition-colors">
                  <Copy size={16} />
                </button>
                <button className="neu-small p-2 rounded-lg hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Shift Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="neu-small p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] text-sm">Working Hours</span>
                  <Clock size={16} className="text-[#EF5226]" />
                </div>
                <div className="font-bold text-[#333333] mt-1">
                  {shift.startTime} - {shift.endTime}
                </div>
              </div>

              <div className="neu-small p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] text-sm">Break Time</span>
                  <Clock size={16} className="text-[#05A7CC]" />
                </div>
                <div className="font-bold text-[#333333] mt-1">{shift.breakDuration}</div>
              </div>

              <div className="neu-small p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] text-sm">Employees</span>
                  <Users size={16} className="text-[#EF5226]" />
                </div>
                <div className="font-bold text-[#EF5226] mt-1">{shift.employees}</div>
              </div>

              <div className="neu-small p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] text-sm">Total Hours</span>
                  <Settings size={16} className="text-[#666666]" />
                </div>
                <div className="font-bold text-[#333333] mt-1">{shift.workingHours}</div>
              </div>
            </div>

            {/* Departments */}
            <div className="mb-6">
              <span className="text-[#666666] text-sm block mb-2">Departments</span>
              <div className="flex flex-wrap gap-2">
                {shift.departments.map((dept, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-white text-sm rounded-full font-medium"
                    style={{ backgroundColor: shift.color }}
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            {/* Drop Zone for Drag & Drop */}
            <div className="neu-card-inset p-4 rounded-xl border-2 border-dashed border-gray-300 text-center">
              <Users size={24} className="text-[#666666] mx-auto mb-2" />
              <p className="text-[#666666] text-sm">
                Drop employees here to assign to this shift
              </p>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => onNavigate('shift-details', { shiftId: shift.id })}
              className="w-full mt-4 neu-button py-3 rounded-xl flex items-center justify-center hover:text-[#EF5226] transition-colors group"
            >
              <span className="font-medium">Manage Assignments</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Unassigned Employees */}
      <div className="neu-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[#333333] mb-4">Unassigned Employees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {unassignedEmployees.map((employee) => (
            <div
              key={employee.id}
              draggable
              onDragStart={(e) => handleDragStart(e, employee)}
              className="neu-small p-4 rounded-xl cursor-move hover:shadow-lg transition-all group"
            >
              <div className="flex items-center">
                <div className="neu-small w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white font-semibold">
                  {employee.avatar}
                </div>
                <div>
                  <div className="font-medium text-[#333333] group-hover:text-[#EF5226] transition-colors">
                    {employee.name}
                  </div>
                  <div className="text-[#666666] text-sm">{employee.department}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAssignmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#333333]">Current Shift Assignments</h2>
        <div className="flex space-x-3">
          <select className="neu-input px-4 py-2 rounded-xl">
            <option>All Departments</option>
            <option>IT</option>
            <option>HR</option>
            <option>Support</option>
          </select>
          <button className="neu-primary px-6 py-3 rounded-xl flex items-center">
            <Plus size={16} className="mr-2" />
            Bulk Assign
          </button>
        </div>
      </div>

      <div className="neu-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#E8EBEF] to-[#ECF0F3]">
              <tr>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Employee</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Current Shift</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Department</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Start Date</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Status</th>
                <th className="px-6 py-4 text-left text-[#333333] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shiftAssignments.map((assignment, index) => (
                <tr 
                  key={assignment.employeeId} 
                  className={`border-b border-[#E8EBEF] hover:bg-gradient-to-r hover:from-[#ECF0F3] hover:to-[#E8EBEF] transition-all ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFB]'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="neu-small w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-[#EF5226] to-[#d4471f] text-white font-semibold">
                        {assignment.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-[#333333]">{assignment.employee}</div>
                        <div className="text-[#666666] text-sm">{assignment.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#EF5226] to-[#d4471f] text-white text-sm rounded-full font-medium">
                      {assignment.currentShift}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#333333]">{assignment.department}</td>
                  <td className="px-6 py-4 text-[#333333]">{assignment.startDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button className="neu-small p-2 rounded-lg hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
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

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Shift Management</h1>
        <p className="text-[#666666]">Create, organize, and assign work shifts with drag-and-drop interface</p>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card rounded-2xl p-6 mb-8">
        <div className="flex space-x-1 neu-card-inset rounded-xl p-1">
          {[
            { id: 'shifts', label: 'Shift Overview', icon: Clock },
            { id: 'assignments', label: 'Employee Assignments', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'neu-primary text-white shadow-lg'
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="neu-card rounded-2xl p-8">
        {activeTab === 'shifts' && renderShiftsTab()}
        {activeTab === 'assignments' && renderAssignmentsTab()}
      </div>

      {/* Add Shift Modal */}
      {showAddShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Create New Shift</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#333333] font-medium mb-2">Shift Name</label>
                <input 
                  type="text" 
                  placeholder="Enter shift name"
                  className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-2">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#333333] font-medium mb-2">End Time</label>
                  <input 
                    type="time" 
                    className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#333333] font-medium mb-2">Break Duration (minutes)</label>
                <input 
                  type="number" 
                  placeholder="60"
                  className="w-full neu-input p-3 rounded-xl focus:ring-2 focus:ring-[#EF5226] transition-all"
                />
              </div>
              <div>
                <label className="block text-[#333333] font-medium mb-2">Shift Color</label>
                <div className="flex space-x-3">
                  {['#EF5226', '#05A7CC', '#4CAF50', '#9C27B0', '#FFC107'].map(color => (
                    <button 
                      key={color}
                      className="w-8 h-8 rounded-full neu-small hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setShowAddShift(false)}
                className="flex-1 neu-button py-3 rounded-xl hover:text-[#666666] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddShift(false)}
                className="flex-1 neu-primary py-3 rounded-xl hover:shadow-xl transition-all"
              >
                Create Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};