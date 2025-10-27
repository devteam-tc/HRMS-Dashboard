import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, User, Calendar, MessageCircle, Paperclip, Download, Upload, Send, FileText, XCircle } from 'lucide-react';

export const OffboardingChecklist = ({ onNavigate }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  
  // Mock employee data with offboarding progress
  const employees = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      designation: 'Senior Data Analyst',
      department: 'Analytics',
      lastWorkingDay: '2024-02-15',
      resignationDate: '2024-01-20',
      reason: 'Career Growth',
      manager: 'Jennifer Liu',
      progress: 65,
      currentStage: 'Asset Return',
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 2,
      name: 'Susan Garcia',
      designation: 'Marketing Specialist',
      department: 'Marketing',
      lastWorkingDay: '2024-02-28',
      resignationDate: '2024-01-25',
      reason: 'Relocation',
      manager: 'David Thompson',
      progress: 40,
      currentStage: 'Knowledge Transfer',
      avatar: '/placeholder-avatar.jpg'
    }
  ];

  const [checklistData] = useState({
    1: {
      hrClearance: [
        { id: 1, task: 'Final Salary Calculation', status: 'completed', dueDate: '2024-02-10', assignee: 'Finance Team', notes: 'Salary calculated including pending bonus', priority: 'high' },
        { id: 2, task: 'Experience Letter Preparation', status: 'completed', dueDate: '2024-02-12', assignee: 'HR Team', notes: 'Letter drafted and approved', priority: 'high' },
        { id: 3, task: 'Relieving Letter Generation', status: 'in-progress', dueDate: '2024-02-14', assignee: 'HR Team', notes: 'Waiting for final clearances', priority: 'high' },
        { id: 4, task: 'PF Settlement Processing', status: 'in-progress', dueDate: '2024-02-15', assignee: 'Finance Team', notes: 'Application submitted to PF office', priority: 'high' },
        { id: 5, task: 'Gratuity Calculation', status: 'pending', dueDate: '2024-02-16', assignee: 'Finance Team', notes: 'Pending service calculation', priority: 'medium' },
        { id: 6, task: 'Final Tax Documentation', status: 'completed', dueDate: '2024-02-13', assignee: 'Finance Team', notes: 'Form 16 prepared', priority: 'high' }
      ],
      itClearance: [
        { id: 7, task: 'Laptop & Hardware Return', status: 'pending', dueDate: '2024-02-14', assignee: 'IT Team', notes: 'Return scheduled for tomorrow', priority: 'critical' },
        { id: 8, task: 'Email Account Deactivation', status: 'pending', dueDate: '2024-02-15', assignee: 'IT Team', notes: 'Auto-forward setup required', priority: 'high' },
        { id: 9, task: 'System Access Revocation', status: 'pending', dueDate: '2024-02-15', assignee: 'IT Team', notes: 'Access list prepared', priority: 'critical' },
        { id: 10, task: 'VPN Access Removal', status: 'pending', dueDate: '2024-02-15', assignee: 'IT Team', notes: 'Pending laptop return', priority: 'high' },
        { id: 11, task: 'Software License Return', status: 'completed', dueDate: '2024-02-12', assignee: 'IT Team', notes: 'Adobe license transferred', priority: 'medium' },
        { id: 12, task: 'Data Backup & Transfer', status: 'in-progress', dueDate: '2024-02-14', assignee: 'IT Team', notes: 'Backup in progress', priority: 'high' }
      ],
      adminClearance: [
        { id: 13, task: 'ID Card & Access Badge Return', status: 'completed', dueDate: '2024-02-10', assignee: 'Admin Team', notes: 'Badge returned and deactivated', priority: 'high' },
        { id: 14, task: 'Locker Clearance', status: 'completed', dueDate: '2024-02-11', assignee: 'Admin Team', notes: 'Locker emptied and cleaned', priority: 'medium' },
        { id: 15, task: 'Parking Pass Return', status: 'completed', dueDate: '2024-02-10', assignee: 'Admin Team', notes: 'Pass returned', priority: 'low' },
        { id: 16, task: 'Library Books Return', status: 'completed', dueDate: '2024-02-09', assignee: 'Admin Team', notes: 'No pending books', priority: 'low' },
        { id: 17, task: 'Stationary & Supplies Return', status: 'pending', dueDate: '2024-02-14', assignee: 'Admin Team', notes: 'Inventory check pending', priority: 'low' },
        { id: 18, task: 'Medical Insurance Termination', status: 'in-progress', dueDate: '2024-02-15', assignee: 'HR Team', notes: 'Notice sent to insurer', priority: 'high' }
      ],
      knowledgeTransfer: [
        { id: 19, task: 'Project Documentation', status: 'in-progress', dueDate: '2024-02-13', assignee: 'Michael Rodriguez', notes: 'Documentation 80% complete', priority: 'critical' },
        { id: 20, task: 'Client Handover', status: 'completed', dueDate: '2024-02-11', assignee: 'Jennifer Liu', notes: 'Client briefed successfully', priority: 'high' },
        { id: 21, task: 'Team Knowledge Transfer', status: 'in-progress', dueDate: '2024-02-14', assignee: 'Michael Rodriguez', notes: 'Sessions scheduled', priority: 'critical' },
        { id: 22, task: 'Password & Access Sharing', status: 'pending', dueDate: '2024-02-14', assignee: 'Michael Rodriguez', notes: 'Secure handover planned', priority: 'high' },
        { id: 23, task: 'Ongoing Task Documentation', status: 'completed', dueDate: '2024-02-10', assignee: 'Michael Rodriguez', notes: 'All tasks documented', priority: 'high' },
        { id: 24, task: 'Training Replacement', status: 'in-progress', dueDate: '2024-02-15', assignee: 'Jennifer Liu', notes: 'Replacement identified', priority: 'medium' }
      ],
      finalSteps: [
        { id: 25, task: 'Exit Interview Completion', status: 'pending', dueDate: '2024-02-14', assignee: 'HR Team', notes: 'Interview scheduled', priority: 'high' },
        { id: 26, task: 'Feedback Form Submission', status: 'pending', dueDate: '2024-02-14', assignee: 'Michael Rodriguez', notes: 'Form sent via email', priority: 'medium' },
        { id: 27, task: 'Final Clearance Certificate', status: 'pending', dueDate: '2024-02-15', assignee: 'HR Team', notes: 'Pending other clearances', priority: 'high' },
        { id: 28, task: 'Alumni Network Invitation', status: 'pending', dueDate: '2024-02-16', assignee: 'HR Team', notes: 'Will be sent post exit', priority: 'low' },
        { id: 29, task: 'Reference Check Authorization', status: 'completed', dueDate: '2024-02-09', assignee: 'Michael Rodriguez', notes: 'Authorization signed', priority: 'low' },
        { id: 30, task: 'Final Settlement Completion', status: 'pending', dueDate: '2024-02-16', assignee: 'Finance Team', notes: 'Pending final clearances', priority: 'critical' }
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
      case 'blocked': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'in-progress': return <Clock size={16} className="text-blue-600" />;
      case 'pending': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'blocked': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-800 bg-red-200';
      case 'high': return 'text-red-700 bg-red-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
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
    { key: 'hrClearance', title: 'HR Clearance', icon: '👥', color: 'neu-primary' },
    { key: 'itClearance', title: 'IT Clearance', icon: '💻', color: 'neu-secondary' },
    { key: 'adminClearance', title: 'Admin Clearance', icon: '🏢', color: 'bg-green-500' },
    { key: 'knowledgeTransfer', title: 'Knowledge Transfer', icon: '📚', color: 'bg-purple-500' },
    { key: 'finalSteps', title: 'Final Steps', icon: '✅', color: 'bg-orange-500' }
  ];

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('offboarding-dashboard')}
              className="neu-button p-3 rounded-2xl hover:text-[#05A7CC] transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-[#333333] mb-2">Offboarding Checklist</h1>
              <p className="text-[#666666] text-lg">Track and manage employee exit clearance process</p>
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
                    <span>LWD: {new Date(currentEmployee.lastWorkingDay).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Reason: {currentEmployee.reason}</span>
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
                    className="h-2 bg-[#EF5226] rounded-full transition-all duration-300"
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
          const overdue = tasks.filter(task => task.status !== 'completed' && isOverdue(task.dueDate)).length;
          
          return (
            <div key={category.key} className="neu-card p-6 rounded-3xl text-center">
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="font-bold text-[#333333] mb-2">{category.title}</h3>
              <div className="text-2xl font-bold text-[#333333] mb-1">{completed}/{total}</div>
              <div className="w-full h-2 bg-[#E8EBEF] rounded-full mb-2">
                <div 
                  className="h-2 bg-[#EF5226] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-[#666666]">{progress}% Complete</div>
              {overdue > 0 && (
                <div className="text-xs text-[#EF5226] mt-1 font-medium">
                  {overdue} overdue
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Checklist */}
      <div className="space-y-6">
        {categories.map((category) => {
          const tasks = currentChecklist[category.key] || [];
          const overdueTasks = tasks.filter(task => task.status !== 'completed' && isOverdue(task.dueDate));
          
          return (
            <div key={category.key} className="neu-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-[#333333]">{category.title}</h3>
                  <span className="px-3 py-1 bg-[#EF5226] text-white rounded-full text-sm">
                    {tasks.filter(task => task.status === 'completed').length}/{tasks.length}
                  </span>
                  {overdueTasks.length > 0 && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                      {overdueTasks.length} overdue
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#333333]">
                    {calculateCategoryProgress(tasks)}% Complete
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className={`neu-small p-4 rounded-2xl ${
                    task.status !== 'completed' && isOverdue(task.dueDate) ? 'border-l-4 border-red-500' : ''
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-[#333333]">{task.task}</h4>
                            {task.status !== 'completed' && isOverdue(task.dueDate) && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                OVERDUE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-[#666666] mt-1">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <User size={14} className="mr-1" />
                              {task.assignee}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority.toUpperCase()}
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
                          <option value="blocked">Blocked</option>
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

      {/* Final Actions */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-[#333333]">Exit Process Status</h4>
            <p className="text-sm text-[#666666]">
              {currentEmployee?.progress === 100 
                ? 'All clearances completed. Ready for final settlement.' 
                : `${currentEmployee?.progress}% completed. Continue tracking progress.`
              }
            </p>
          </div>
          <div className="flex space-x-4">
            {currentEmployee?.progress === 100 ? (
              <button className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform">
                <CheckCircle size={20} />
                <span>Complete Exit Process</span>
              </button>
            ) : (
              <button className="neu-button px-6 py-3 rounded-2xl hover:text-[#05A7CC] transition-colors">
                <Clock size={20} className="mr-2" />
                Continue Tracking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};