import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, FileText, MessageCircle, AlertTriangle, Upload, Send, Save, Clock, CheckCircle } from 'lucide-react';

export const ExitProcess = ({ onNavigate }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [formData, setFormData] = useState({
    lastWorkingDay: '',
    reason: '',
    feedback: '',
    handoverRequired: true,
    handoverTo: '',
    noticePeriod: '30',
    exitInterviewScheduled: false,
    exitInterviewDate: '',
    comments: ''
  });

  const [exitChecklist] = useState([
    {
      id: 1,
      category: 'HR Clearance',
      title: 'HR Documentation',
      description: 'Complete HR formalities and documentation',
      icon: FileText,
      tasks: [
        { id: 1, name: 'Final Salary Calculation', required: true, assignee: 'Finance Team' },
        { id: 2, name: 'Experience Letter Preparation', required: true, assignee: 'HR Team' },
        { id: 3, name: 'Relieving Letter Generation', required: true, assignee: 'HR Team' },
        { id: 4, name: 'PF Settlement Processing', required: true, assignee: 'Finance Team' },
        { id: 5, name: 'Gratuity Calculation', required: false, assignee: 'Finance Team' },
        { id: 6, name: 'Final Tax Documentation', required: true, assignee: 'Finance Team' }
      ]
    },
    {
      id: 2,
      category: 'IT Clearance',
      title: 'IT Assets & Access',
      description: 'Return IT assets and revoke system access',
      icon: User,
      tasks: [
        { id: 7, name: 'Laptop & Hardware Return', required: true, assignee: 'IT Team' },
        { id: 8, name: 'Email Account Deactivation', required: true, assignee: 'IT Team' },
        { id: 9, name: 'System Access Revocation', required: true, assignee: 'IT Team' },
        { id: 10, name: 'VPN Access Removal', required: true, assignee: 'IT Team' },
        { id: 11, name: 'Software License Return', required: true, assignee: 'IT Team' },
        { id: 12, name: 'Data Backup & Transfer', required: true, assignee: 'IT Team' }
      ]
    },
    {
      id: 3,
      category: 'Admin Clearance',
      title: 'Administrative Tasks',
      description: 'Complete administrative formalities',
      icon: CheckCircle,
      tasks: [
        { id: 13, name: 'ID Card & Access Badge Return', required: true, assignee: 'Admin Team' },
        { id: 14, name: 'Locker Clearance', required: true, assignee: 'Admin Team' },
        { id: 15, name: 'Parking Pass Return', required: false, assignee: 'Admin Team' },
        { id: 16, name: 'Library Books Return', required: false, assignee: 'Admin Team' },
        { id: 17, name: 'Stationary & Supplies Return', required: false, assignee: 'Admin Team' },
        { id: 18, name: 'Medical Insurance Termination', required: true, assignee: 'HR Team' }
      ]
    },
    {
      id: 4,
      category: 'Knowledge Transfer',
      title: 'Handover Process',
      description: 'Knowledge transfer and project handover',
      icon: MessageCircle,
      tasks: [
        { id: 19, name: 'Project Documentation', required: true, assignee: 'Employee' },
        { id: 20, name: 'Client Handover (if applicable)', required: false, assignee: 'Manager' },
        { id: 21, name: 'Team Knowledge Transfer', required: true, assignee: 'Employee' },
        { id: 22, name: 'Password & Access Sharing', required: true, assignee: 'Employee' },
        { id: 23, name: 'Ongoing Task Documentation', required: true, assignee: 'Employee' },
        { id: 24, name: 'Training Replacement (if needed)', required: false, assignee: 'Manager' }
      ]
    },
    {
      id: 5,
      category: 'Final Steps',
      title: 'Exit Formalities',
      description: 'Final exit interview and documentation',
      icon: User,
      tasks: [
        { id: 25, name: 'Exit Interview Completion', required: true, assignee: 'HR Team' },
        { id: 26, name: 'Feedback Form Submission', required: true, assignee: 'Employee' },
        { id: 27, name: 'Final Clearance Certificate', required: true, assignee: 'HR Team' },
        { id: 28, name: 'Alumni Network Invitation', required: false, assignee: 'HR Team' },
        { id: 29, name: 'Reference Check Authorization', required: false, assignee: 'Employee' },
        { id: 30, name: 'Final Settlement Completion', required: true, assignee: 'Finance Team' }
      ]
    }
  ]);

  // Mock employee data
  const employees = [
    { id: 1, name: 'Michael Rodriguez', designation: 'Senior Data Analyst', department: 'Analytics', manager: 'Jennifer Liu' },
    { id: 2, name: 'Susan Garcia', designation: 'Marketing Specialist', department: 'Marketing', manager: 'David Thompson' },
    { id: 3, name: 'Rachel Green', designation: 'Sales Manager', department: 'Sales', manager: 'Mark Davis' },
    { id: 4, name: 'Tom Wilson', designation: 'UI Designer', department: 'Design', manager: 'Lisa Anderson' }
  ];

  const exitReasons = [
    'Career Growth',
    'Better Compensation',
    'Work-Life Balance',
    'Relocation',
    'Personal Reasons',
    'Company Culture',
    'Better Opportunity',
    'Education/Studies',
    'Family Reasons',
    'Health Issues',
    'Retirement',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!selectedEmployee || !formData.lastWorkingDay || !formData.reason) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Starting exit process for:', selectedEmployee, formData);
    onNavigate?.('offboarding-checklist', { employeeId: selectedEmployee, formData });
  };

  const selectedEmployeeData = employees.find(emp => emp.id.toString() === selectedEmployee);

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
              <h1 className="text-4xl font-bold text-[#333333] mb-2">Employee Exit Process</h1>
              <p className="text-[#666666] text-lg">Initiate and manage employee departure workflow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Selection & Exit Details */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Exit Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employee Selection */}
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-4">Select Employee</h4>
            <div className="space-y-3">
              {employees.map((employee) => (
                <label key={employee.id} className="flex items-center space-x-4 p-4 neu-button rounded-2xl cursor-pointer hover:scale-105 transition-transform">
                  <input
                    type="radio"
                    name="employee"
                    value={employee.id}
                    checked={selectedEmployee === employee.id.toString()}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedEmployee === employee.id.toString() 
                      ? 'border-[#EF5226] bg-[#EF5226]' 
                      : 'border-[#666666]'
                  }`}>
                    {selectedEmployee === employee.id.toString() && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#333333]">{employee.name}</p>
                    <p className="text-sm text-[#666666]">{employee.designation} • {employee.department}</p>
                    <p className="text-xs text-[#999999]">Manager: {employee.manager}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Exit Details */}
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-4">Exit Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Last Working Day *</label>
                <input
                  type="date"
                  value={formData.lastWorkingDay}
                  onChange={(e) => handleInputChange('lastWorkingDay', e.target.value)}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Reason for Leaving *</label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                >
                  <option value="">Select Reason</option>
                  {exitReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Notice Period (days)</label>
                <select
                  value={formData.noticePeriod}
                  onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                >
                  <option value="0">Immediate</option>
                  <option value="15">15 days</option>
                  <option value="30">30 days</option>
                  <option value="45">45 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="handoverRequired"
                  checked={formData.handoverRequired}
                  onChange={(e) => handleInputChange('handoverRequired', e.target.checked)}
                  className="w-4 h-4 text-[#EF5226] bg-[#ECF0F3] border-[#666666] rounded focus:ring-[#EF5226]"
                />
                <label htmlFor="handoverRequired" className="text-sm font-medium text-[#333333]">
                  Knowledge Handover Required
                </label>
              </div>

              {formData.handoverRequired && (
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Handover To</label>
                  <input
                    type="text"
                    value={formData.handoverTo}
                    onChange={(e) => handleInputChange('handoverTo', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter name or select replacement"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 neu-small p-6 rounded-2xl">
          <h4 className="font-bold text-[#333333] mb-4">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">Exit Interview</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="exitInterviewScheduled"
                    checked={formData.exitInterviewScheduled}
                    onChange={(e) => handleInputChange('exitInterviewScheduled', e.target.checked)}
                    className="w-4 h-4 text-[#EF5226] bg-[#ECF0F3] border-[#666666] rounded focus:ring-[#EF5226]"
                  />
                  <label htmlFor="exitInterviewScheduled" className="text-sm font-medium text-[#333333]">
                    Schedule Exit Interview
                  </label>
                </div>
                {formData.exitInterviewScheduled && (
                  <input
                    type="date"
                    value={formData.exitInterviewDate}
                    onChange={(e) => handleInputChange('exitInterviewDate', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  />
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">Comments/Notes</label>
              <textarea
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333] h-24 resize-none"
                placeholder="Add any additional notes or special instructions..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exit Checklist Preview */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-[#333333] mb-2">Exit Process Checklist</h3>
            <p className="text-[#666666]">Complete overview of all clearance steps and requirements</p>
          </div>
          {selectedEmployeeData && (
            <div className="text-right">
              <p className="text-sm font-medium text-[#333333]">Selected Employee:</p>
              <p className="text-lg font-bold text-[#EF5226]">{selectedEmployeeData.name}</p>
              <p className="text-sm text-[#666666]">{selectedEmployeeData.designation}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {exitChecklist.map((step) => {
            const Icon = step.icon;
            const requiredTasks = step.tasks.filter(task => task.required).length;
            
            return (
              <div key={step.id} className="neu-small p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 neu-gradient rounded-2xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#05A7CC]" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#333333]">{step.tasks.length}</div>
                    <div className="text-xs text-[#666666]">Tasks</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-[#333333] mb-1">{step.title}</h4>
                  <p className="text-sm text-[#666666] mb-3">{step.description}</p>
                  <div className="flex items-center text-xs text-[#999999]">
                    <AlertTriangle size={12} className="mr-1" />
                    {requiredTasks} critical tasks
                  </div>
                </div>

                <div className="space-y-2">
                  {step.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock size={12} className="text-[#666666]" />
                        <span className="text-sm text-[#333333]">{task.name}</span>
                        {task.required && <span className="text-xs text-[#EF5226]">*</span>}
                      </div>
                    </div>
                  ))}
                  {step.tasks.length > 3 && (
                    <p className="text-xs text-[#999999] text-center">
                      +{step.tasks.length - 3} more tasks...
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-[#333333]">Ready to Start Exit Process?</h4>
            <p className="text-sm text-[#666666]">This will create a complete offboarding workflow for the selected employee</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate?.('offboarding-dashboard')}
              className="neu-button px-6 py-3 rounded-2xl hover:text-[#666666] transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Send size={20} />
              <span>Start Exit Process</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};