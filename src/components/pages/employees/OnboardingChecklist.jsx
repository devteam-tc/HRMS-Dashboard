import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, User, Calendar, MessageCircle, Paperclip, Download, Upload, Send } from 'lucide-react';

export const OnboardingChecklist = ({ onNavigate }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  
  // Mock employee data with onboarding progress
  const employees = [
    {
      id: 1,
      name: 'Alice Johnson',
      designation: 'Frontend Developer',
      department: 'Engineering',
      joiningDate: '2024-01-25',
      startedDate: '2024-01-22',
      mentor: 'John Smith',
      manager: 'Sarah Wilson',
      progress: 65,
      currentStage: 'IT Setup & Access',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      designation: 'Product Manager',
      department: 'Product',
      joiningDate: '2024-01-28',
      startedDate: '2024-01-25',
      mentor: 'Lisa Chen',
      manager: 'Mike Johnson',
      progress: 30,
      currentStage: 'Documentation',
      avatar: '/placeholder-avatar.jpg'
    }
  ];

  const [checklistData] = useState({
    1: {
      documentation: [
        { id: 1, task: 'Resume/CV Collection', status: 'completed', dueDate: '2024-01-23', assignee: 'HR Team', notes: 'Received and verified' },
        { id: 2, task: 'ID Proof Verification', status: 'completed', dueDate: '2024-01-23', assignee: 'HR Team', notes: 'Passport verified' },
        { id: 3, task: 'Address Proof', status: 'completed', dueDate: '2024-01-23', assignee: 'HR Team', notes: 'Utility bill accepted' },
        { id: 4, task: 'Educational Certificates', status: 'in-progress', dueDate: '2024-01-24', assignee: 'HR Team', notes: 'Pending original documents' },
        { id: 5, task: 'Background Check', status: 'completed', dueDate: '2024-01-25', assignee: 'External Agency', notes: 'Clear background check' },
        { id: 6, task: 'Previous Employment Letter', status: 'pending', dueDate: '2024-01-26', assignee: 'Employee', notes: 'Waiting for employee submission' }
      ],
      compliance: [
        { id: 7, task: 'Employment Contract Signing', status: 'completed', dueDate: '2024-01-24', assignee: 'Legal Team', notes: 'Signed digitally' },
        { id: 8, task: 'PF Registration', status: 'in-progress', dueDate: '2024-01-26', assignee: 'Finance Team', notes: 'Application submitted' },
        { id: 9, task: 'ESI Registration', status: 'in-progress', dueDate: '2024-01-26', assignee: 'Finance Team', notes: 'Processing' },
        { id: 10, task: 'Tax Declaration', status: 'pending', dueDate: '2024-01-28', assignee: 'Employee', notes: 'Form 16 to be filled' },
        { id: 11, task: 'Bank Account Verification', status: 'completed', dueDate: '2024-01-25', assignee: 'Finance Team', notes: 'Account details verified' },
        { id: 12, task: 'NDA Signing', status: 'completed', dueDate: '2024-01-24', assignee: 'Legal Team', notes: 'Signed and filed' }
      ],
      access: [
        { id: 13, task: 'Email Account Creation', status: 'completed', dueDate: '2024-01-25', assignee: 'IT Team', notes: 'alice.johnson@company.com created' },
        { id: 14, task: 'HRMS System Access', status: 'in-progress', dueDate: '2024-01-26', assignee: 'IT Team', notes: 'Access provisioning in progress' },
        { id: 15, task: 'Project Management Tools', status: 'pending', dueDate: '2024-01-27', assignee: 'IT Team', notes: 'Pending manager approval' },
        { id: 16, task: 'Communication Tools Setup', status: 'completed', dueDate: '2024-01-25', assignee: 'IT Team', notes: 'Slack and Teams access granted' },
        { id: 17, task: 'VPN Access Setup', status: 'pending', dueDate: '2024-01-28', assignee: 'IT Team', notes: 'Security clearance pending' },
        { id: 18, task: 'Security Badge Creation', status: 'in-progress', dueDate: '2024-01-26', assignee: 'Security Team', notes: 'Badge printing in progress' }
      ],
      assets: [
        { id: 19, task: 'Laptop Assignment', status: 'completed', dueDate: '2024-01-25', assignee: 'IT Team', notes: 'MacBook Pro assigned - Serial: MP123456' },
        { id: 20, task: 'Mobile Phone Assignment', status: 'pending', dueDate: '2024-01-27', assignee: 'IT Team', notes: 'Not required for this role' },
        { id: 21, task: 'Headphones & Accessories', status: 'completed', dueDate: '2024-01-25', assignee: 'IT Team', notes: 'Sony WH-1000XM4 provided' },
        { id: 22, task: 'Office Supplies', status: 'completed', dueDate: '2024-01-25', assignee: 'Admin Team', notes: 'Standard supplies kit provided' },
        { id: 23, task: 'Parking Space Assignment', status: 'completed', dueDate: '2024-01-25', assignee: 'Admin Team', notes: 'Space P-45 assigned' },
        { id: 24, task: 'Locker Assignment', status: 'pending', dueDate: '2024-01-26', assignee: 'Admin Team', notes: 'Awaiting availability' }
      ],
      training: [
        { id: 25, task: 'Company Orientation', status: 'in-progress', dueDate: '2024-01-26', assignee: 'HR Team', notes: 'Scheduled for Jan 26, 10 AM' },
        { id: 26, task: 'Department Introduction', status: 'pending', dueDate: '2024-01-27', assignee: 'Department Head', notes: 'Team meeting scheduled' },
        { id: 27, task: 'Role-specific Training', status: 'pending', dueDate: '2024-01-30', assignee: 'Manager', notes: 'Technical training plan prepared' },
        { id: 28, task: 'Safety & Security Training', status: 'pending', dueDate: '2024-01-28', assignee: 'Security Team', notes: 'Online module assigned' },
        { id: 29, task: 'Mentor Assignment', status: 'completed', dueDate: '2024-01-25', assignee: 'HR Team', notes: 'John Smith assigned as mentor' },
        { id: 30, task: 'First Week Check-in', status: 'pending', dueDate: '2024-02-01', assignee: 'Manager', notes: 'One-on-one scheduled' }
      ]
    }
  });

  const currentEmployee = employees.find(emp => emp.id === selectedEmployee);
  const currentChecklist = checklistData[selectedEmployee] || {};

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100';
      case 'in-progress': return 'text-blue-700 bg-blue-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'in-progress': return <Clock size={16} className="text-blue-600" />;
      case 'pending': return <AlertTriangle size={16} className="text-yellow-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const updateTaskStatus = (category, taskId, newStatus) => {
    console.log(`Updating task ${taskId} in ${category} to ${newStatus}`);
    // This would update the task status in real implementation
  };

  const calculateCategoryProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const categories = [
    { key: 'documentation', title: 'Documentation', icon: '📄', color: 'neu-primary' },
    { key: 'compliance', title: 'Compliance', icon: '🛡️', color: 'neu-secondary' },
    { key: 'access', title: 'Access & Permissions', icon: '🔐', color: 'bg-purple-500' },
    { key: 'assets', title: 'Asset Assignment', icon: '💻', color: 'bg-green-500' },
    { key: 'training', title: 'Training & Orientation', icon: '🎓', color: 'bg-orange-500' }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('onboarding-dashboard')}
              className="neu-button p-3 rounded-2xl hover:text-[#05A7CC] transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-[#333333] mb-2">Onboarding Checklist</h1>
              <p className="text-[#666666] text-lg">Track and manage employee onboarding progress</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="neu-button px-4 py-2 rounded-2xl flex items-center space-x-2">
              <Download size={16} />
              <span>Export Report</span>
            </button>
            <button className="neu-button px-4 py-2 rounded-2xl flex items-center space-x-2">
              <Send size={16} />
              <span>Send Update</span>
            </button>
          </div>
        </div>

        {/* Employee Selection */}
        <div className="flex space-x-4 mb-6">
          {employees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => setSelectedEmployee(employee.id)}
              className={`neu-small p-4 rounded-2xl flex items-center space-x-3 transition-all ${
                selectedEmployee === employee.id ? 'neu-primary text-white' : 'hover:scale-105'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedEmployee === employee.id ? 'bg-white bg-opacity-20' : 'neu-gradient'
              }`}>
                <span className={`font-bold ${
                  selectedEmployee === employee.id ? 'text-white' : 'text-[#05A7CC]'
                }`}>
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <p className={`font-medium ${selectedEmployee === employee.id ? 'text-white' : 'text-[#333333]'}`}>
                  {employee.name}
                </p>
                <p className={`text-sm ${selectedEmployee === employee.id ? 'text-white text-opacity-80' : 'text-[#666666]'}`}>
                  {employee.designation}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Employee Summary */}
        {currentEmployee && (
          <div className="neu-small p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 neu-gradient rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-[#05A7CC]">
                    {currentEmployee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333]">{currentEmployee.name}</h3>
                  <p className="text-[#666666]">{currentEmployee.designation} • {currentEmployee.department}</p>
                  <div className="flex items-center space-x-4 text-sm text-[#999999] mt-1">
                    <span>Joining: {new Date(currentEmployee.joiningDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Mentor: {currentEmployee.mentor}</span>
                    <span>•</span>
                    <span>Manager: {currentEmployee.manager}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#333333] mb-1">{currentEmployee.progress}%</div>
                <div className="text-sm text-[#666666] mb-2">Overall Progress</div>
                <div className="w-32 h-2 bg-[#E8EBEF] rounded-full">
                  <div 
                    className="h-2 bg-[#05A7CC] rounded-full transition-all duration-300"
                    style={{ width: `${currentEmployee.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[#999999] mt-1">Stage: {currentEmployee.currentStage}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {categories.map((category) => {
          const tasks = currentChecklist[category.key] || [];
          const progress = calculateCategoryProgress(tasks);
          const completed = tasks.filter(task => task.status === 'completed').length;
          const total = tasks.length;
          
          return (
            <div key={category.key} className="neu-card p-6 rounded-3xl text-center">
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="font-bold text-[#333333] mb-2">{category.title}</h3>
              <div className="text-2xl font-bold text-[#333333] mb-1">{completed}/{total}</div>
              <div className="w-full h-2 bg-[#E8EBEF] rounded-full mb-2">
                <div 
                  className="h-2 bg-[#05A7CC] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-[#666666]">{progress}% Complete</div>
            </div>
          );
        })}
      </div>

      {/* Detailed Checklist */}
      <div className="space-y-6">
        {categories.map((category) => {
          const tasks = currentChecklist[category.key] || [];
          
          return (
            <div key={category.key} className="neu-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-[#333333]">{category.title}</h3>
                  <span className="px-3 py-1 bg-[#05A7CC] text-white rounded-full text-sm">
                    {tasks.filter(task => task.status === 'completed').length}/{tasks.length}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#333333]">
                    {calculateCategoryProgress(tasks)}% Complete
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h4 className="font-medium text-[#333333]">{task.task}</h4>
                          <div className="flex items-center space-x-4 text-sm text-[#666666] mt-1">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <User size={14} className="mr-1" />
                              {task.assignee}
                            </span>
                          </div>
                          {task.notes && (
                            <div className="flex items-center space-x-1 text-xs text-[#999999] mt-1">
                              <MessageCircle size={12} />
                              <span>{task.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(category.key, task.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-none ${getStatusColor(task.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="neu-button p-2 rounded-xl hover:text-[#05A7CC] transition-colors">
                          <Paperclip size={14} />
                        </button>
                        <button className="neu-button p-2 rounded-xl hover:text-[#EF5226] transition-colors">
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};