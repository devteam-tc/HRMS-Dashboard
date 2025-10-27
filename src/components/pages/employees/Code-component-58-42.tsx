import React, { useState } from 'react';
import { ArrowLeft, User, FileText, Shield, Settings, Laptop, CheckCircle, Clock, AlertTriangle, Upload, Download, Send } from 'lucide-react';

export const OnboardingNew = ({ onNavigate }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [formData, setFormData] = useState({
    joiningDate: '',
    department: '',
    designation: '',
    manager: '',
    workLocation: '',
    mentor: ''
  });

  const [onboardingSteps] = useState([
    {
      id: 1,
      category: 'Documentation',
      title: 'Document Collection',
      description: 'Collect and verify all required documents',
      icon: FileText,
      tasks: [
        { id: 1, name: 'Resume/CV', required: true, status: 'pending' },
        { id: 2, name: 'ID Proof (Passport/License)', required: true, status: 'pending' },
        { id: 3, name: 'Address Proof', required: true, status: 'pending' },
        { id: 4, name: 'Educational Certificates', required: true, status: 'pending' },
        { id: 5, name: 'Previous Employment Letter', required: false, status: 'pending' },
        { id: 6, name: 'Background Check', required: true, status: 'pending' }
      ]
    },
    {
      id: 2,
      category: 'Compliance',
      title: 'Legal & Compliance',
      description: 'Complete legal formalities and compliance requirements',
      icon: Shield,
      tasks: [
        { id: 7, name: 'Employment Contract Signing', required: true, status: 'pending' },
        { id: 8, name: 'PF (Provident Fund) Registration', required: true, status: 'pending' },
        { id: 9, name: 'ESI (Employee State Insurance)', required: true, status: 'pending' },
        { id: 10, name: 'Tax Declaration (Form 16)', required: true, status: 'pending' },
        { id: 11, name: 'Bank Account Verification', required: true, status: 'pending' },
        { id: 12, name: 'NDA Signing', required: true, status: 'pending' }
      ]
    },
    {
      id: 3,
      category: 'Access & Permissions',
      title: 'System Access Setup',
      description: 'Configure system access and permissions',
      icon: Settings,
      tasks: [
        { id: 13, name: 'Email Account Creation', required: true, status: 'pending' },
        { id: 14, name: 'HRMS System Access', required: true, status: 'pending' },
        { id: 15, name: 'Project Management Tools', required: true, status: 'pending' },
        { id: 16, name: 'Communication Tools (Slack/Teams)', required: true, status: 'pending' },
        { id: 17, name: 'VPN Access Setup', required: true, status: 'pending' },
        { id: 18, name: 'Security Badge/Access Card', required: true, status: 'pending' }
      ]
    },
    {
      id: 4,
      category: 'Asset Assignment',
      title: 'Hardware & Assets',
      description: 'Assign necessary hardware and equipment',
      icon: Laptop,
      tasks: [
        { id: 19, name: 'Laptop/Desktop Assignment', required: true, status: 'pending' },
        { id: 20, name: 'Mobile Phone (if required)', required: false, status: 'pending' },
        { id: 21, name: 'Headphones/Accessories', required: false, status: 'pending' },
        { id: 22, name: 'Office Supplies', required: false, status: 'pending' },
        { id: 23, name: 'Parking Space (if applicable)', required: false, status: 'pending' },
        { id: 24, name: 'Locker Assignment', required: false, status: 'pending' }
      ]
    },
    {
      id: 5,
      category: 'Training & Orientation',
      title: 'Training & Development',
      description: 'Complete training programs and orientation',
      icon: User,
      tasks: [
        { id: 25, name: 'Company Orientation', required: true, status: 'pending' },
        { id: 26, name: 'Department Introduction', required: true, status: 'pending' },
        { id: 27, name: 'Role-specific Training', required: true, status: 'pending' },
        { id: 28, name: 'Safety & Security Training', required: true, status: 'pending' },
        { id: 29, name: 'Mentor Assignment', required: true, status: 'pending' },
        { id: 30, name: 'First Week Check-in', required: true, status: 'pending' }
      ]
    }
  ]);

  const [stepProgress, setStepProgress] = useState(
    onboardingSteps.reduce((acc, step) => {
      acc[step.id] = step.tasks.reduce((taskAcc, task) => {
        taskAcc[task.id] = task.status;
        return taskAcc;
      }, {});
      return acc;
    }, {})
  );

  const pendingEmployees = [
    { id: 1, name: 'Alice Johnson', designation: 'Frontend Developer', department: 'Engineering', joiningDate: '2024-01-25' },
    { id: 2, name: 'Bob Wilson', designation: 'Product Manager', department: 'Product', joiningDate: '2024-01-28' },
    { id: 3, name: 'Carol Brown', designation: 'UX Designer', department: 'Design', joiningDate: '2024-02-01' }
  ];

  const updateTaskStatus = (stepId, taskId, status) => {
    setStepProgress(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [taskId]: status
      }
    }));
  };

  const getStepProgress = (stepId) => {
    const stepTasks = onboardingSteps.find(s => s.id === stepId)?.tasks || [];
    const completedTasks = stepTasks.filter(task => stepProgress[stepId]?.[task.id] === 'completed').length;
    return Math.round((completedTasks / stepTasks.length) * 100);
  };

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

  const handleStartOnboarding = () => {
    if (!selectedEmployee || !formData.joiningDate || !formData.department) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Starting onboarding for:', selectedEmployee, formData);
    onNavigate?.('onboarding-checklist', { employeeId: selectedEmployee, formData });
  };

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
              <h1 className="text-4xl font-bold text-[#333333] mb-2">New Employee Onboarding</h1>
              <p className="text-[#666666] text-lg">Set up comprehensive onboarding process for new hires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Selection & Basic Info */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Employee & Job Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employee Selection */}
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-4">Select Employee</h4>
            <div className="space-y-3">
              {pendingEmployees.map((employee) => (
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
                    <p className="text-xs text-[#999999]">Joining: {new Date(employee.joiningDate).toLocaleDateString()}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-4">Job Assignment Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Joining Date *</label>
                <input
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, joiningDate: e.target.value }))}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">Human Resources</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Reporting Manager</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  placeholder="Select or enter manager name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Work Location</label>
                <select
                  value={formData.workLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, workLocation: e.target.value }))}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                >
                  <option value="">Select Location</option>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">Assigned Mentor</label>
                <input
                  type="text"
                  value={formData.mentor}
                  onChange={(e) => setFormData(prev => ({ ...prev, mentor: e.target.value }))}
                  className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  placeholder="Select mentor for guidance"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Checklist Preview */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-[#333333] mb-2">Onboarding Checklist</h3>
            <p className="text-[#666666]">Complete overview of all onboarding steps and requirements</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="neu-button px-4 py-2 rounded-2xl flex items-center space-x-2">
              <Download size={16} />
              <span>Export Template</span>
            </button>
            <button className="neu-button px-4 py-2 rounded-2xl flex items-center space-x-2">
              <Upload size={16} />
              <span>Import</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {onboardingSteps.map((step) => {
            const Icon = step.icon;
            const progress = getStepProgress(step.id);
            
            return (
              <div key={step.id} className="neu-small p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    progress === 100 ? 'neu-primary' : progress > 0 ? 'neu-secondary' : 'neu-gradient'
                  }`}>
                    <Icon className={`w-6 h-6 ${progress === 100 || progress > 0 ? 'text-white' : 'text-[#05A7CC]'}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#333333]">{progress}%</div>
                    <div className="text-xs text-[#666666]">Complete</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-[#333333] mb-1">{step.title}</h4>
                  <p className="text-sm text-[#666666] mb-3">{step.description}</p>
                  <div className="w-full h-2 bg-[#E8EBEF] rounded-full">
                    <div 
                      className="h-2 bg-[#05A7CC] rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  {step.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(stepProgress[step.id]?.[task.id] || 'pending')}
                        <span className="text-sm text-[#333333]">{task.name}</span>
                        {task.required && <span className="text-xs text-[#EF5226]">*</span>}
                      </div>
                      <button
                        onClick={() => updateTaskStatus(step.id, task.id, 
                          stepProgress[step.id]?.[task.id] === 'completed' ? 'pending' : 'completed'
                        )}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stepProgress[step.id]?.[task.id] || 'pending')}`}
                      >
                        {stepProgress[step.id]?.[task.id] || 'pending'}
                      </button>
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
            <h4 className="font-bold text-[#333333]">Ready to Start Onboarding?</h4>
            <p className="text-sm text-[#666666]">This will create a complete onboarding workflow for the selected employee</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate?.('onboarding-dashboard')}
              className="neu-button px-6 py-3 rounded-2xl hover:text-[#666666] transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={handleStartOnboarding}
              className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Send size={20} />
              <span>Start Onboarding Process</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};