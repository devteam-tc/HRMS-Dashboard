import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Circle, Clock, AlertCircle, User, Mail, Send, Plus } from 'lucide-react';

export const OnboardingChecklist = ({ onNavigate, employeeId }) => {
  const [activeSection, setActiveSection] = useState('all');

  const employee = {
    id: employeeId || 1,
    name: 'Alice Johnson',
    position: 'Software Engineer',
    department: 'Engineering',
    joinDate: '2024-01-15',
    manager: 'John Smith',
    buddy: 'Sarah Davis',
    email: 'alice.johnson@company.com'
  };

  const [checklistItems, setChecklistItems] = useState([
    // Pre-boarding
    {
      id: 1,
      section: 'pre-boarding',
      title: 'Send Welcome Email',
      description: 'Send welcome email with first day information',
      status: 'completed',
      dueDate: '2024-01-10',
      assignee: 'HR Team',
      priority: 'high',
      completedDate: '2024-01-09',
      notes: 'Welcome email sent successfully'
    },
    {
      id: 2,
      section: 'pre-boarding',
      title: 'Prepare Workspace',
      description: 'Set up desk, chair, and basic office supplies',
      status: 'completed',
      dueDate: '2024-01-14',
      assignee: 'Facilities',
      priority: 'medium',
      completedDate: '2024-01-12',
      notes: 'Workspace ready at Desk #45'
    },
    {
      id: 3,
      section: 'pre-boarding',
      title: 'Hardware Allocation',
      description: 'Prepare laptop, monitor, keyboard, and mouse',
      status: 'in-progress',
      dueDate: '2024-01-14',
      assignee: 'IT Team',
      priority: 'high',
      completedDate: null,
      notes: 'Laptop configured, accessories pending'
    },
    
    // First Day
    {
      id: 4,
      section: 'first-day',
      title: 'Office Tour',
      description: 'Give comprehensive office tour and introduce key personnel',
      status: 'pending',
      dueDate: '2024-01-15',
      assignee: 'HR Team',
      priority: 'high',
      completedDate: null,
      notes: ''
    },
    {
      id: 5,
      section: 'first-day',
      title: 'IT Account Setup',
      description: 'Create email account, system access, and security credentials',
      status: 'pending',
      dueDate: '2024-01-15',
      assignee: 'IT Team',
      priority: 'high',
      completedDate: null,
      notes: ''
    },
    {
      id: 6,
      section: 'first-day',
      title: 'HR Documentation',
      description: 'Complete I-9, tax forms, emergency contacts, and benefits enrollment',
      status: 'pending',
      dueDate: '2024-01-15',
      assignee: 'HR Team',
      priority: 'high',
      completedDate: null,
      notes: ''
    },
    {
      id: 7,
      section: 'first-day',
      title: 'Meet Direct Manager',
      description: 'Initial meeting with direct manager and team introduction',
      status: 'pending',
      dueDate: '2024-01-15',
      assignee: 'John Smith',
      priority: 'high',
      completedDate: null,
      notes: ''
    },
    
    // First Week
    {
      id: 8,
      section: 'first-week',
      title: 'Buddy Assignment',
      description: 'Introduce to assigned buddy and explain buddy system',
      status: 'pending',
      dueDate: '2024-01-16',
      assignee: 'Sarah Davis',
      priority: 'medium',
      completedDate: null,
      notes: ''
    },
    {
      id: 9,
      section: 'first-week',
      title: 'Company Orientation',
      description: 'Attend company overview session and culture introduction',
      status: 'pending',
      dueDate: '2024-01-17',
      assignee: 'HR Team',
      priority: 'medium',
      completedDate: null,
      notes: ''
    },
    {
      id: 10,
      section: 'first-week',
      title: 'Department Overview',
      description: 'Learn about department structure, goals, and current projects',
      status: 'pending',
      dueDate: '2024-01-18',
      assignee: 'John Smith',
      priority: 'medium',
      completedDate: null,
      notes: ''
    },
    {
      id: 11,
      section: 'first-week',
      title: 'Security Training',
      description: 'Complete mandatory security and compliance training',
      status: 'pending',
      dueDate: '2024-01-19',
      assignee: 'Security Team',
      priority: 'high',
      completedDate: null,
      notes: ''
    },
    
    // First Month
    {
      id: 12,
      section: 'first-month',
      title: 'Role-specific Training',
      description: 'Complete technical training specific to job role',
      status: 'pending',
      dueDate: '2024-01-30',
      assignee: 'Training Team',
      priority: 'high',
      completedDate: null,
      notes: ''
    },
    {
      id: 13,
      section: 'first-month',
      title: 'First Project Assignment',
      description: 'Assign first project or task to begin hands-on work',
      status: 'pending',
      dueDate: '2024-01-25',
      assignee: 'John Smith',
      priority: 'medium',
      completedDate: null,
      notes: ''
    },
    {
      id: 14,
      section: 'first-month',
      title: '30-Day Check-in',
      description: 'Formal check-in meeting to discuss progress and feedback',
      status: 'pending',
      dueDate: '2024-02-14',
      assignee: 'HR Team',
      priority: 'medium',
      completedDate: null,
      notes: ''
    }
  ]);

  const sections = [
    { id: 'all', name: 'All Items', count: checklistItems.length },
    { id: 'pre-boarding', name: 'Pre-boarding', count: checklistItems.filter(item => item.section === 'pre-boarding').length },
    { id: 'first-day', name: 'First Day', count: checklistItems.filter(item => item.section === 'first-day').length },
    { id: 'first-week', name: 'First Week', count: checklistItems.filter(item => item.section === 'first-week').length },
    { id: 'first-month', name: 'First Month', count: checklistItems.filter(item => item.section === 'first-month').length }
  ];

  const statusColors = {
    'completed': 'text-green-600',
    'in-progress': 'text-blue-600',
    'pending': 'text-gray-600',
    'overdue': 'text-red-600'
  };

  const priorityColors = {
    'high': 'text-red-600',
    'medium': 'text-orange-600',
    'low': 'text-green-600'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      default: return Circle;
    }
  };

  const toggleItemStatus = (itemId) => {
    setChecklistItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStatus = item.status === 'completed' ? 'pending' : 'completed';
        return {
          ...item,
          status: newStatus,
          completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return item;
    }));
  };

  const addCustomItem = () => {
    const newItem = {
      id: Date.now(),
      section: activeSection === 'all' ? 'first-week' : activeSection,
      title: 'New Custom Task',
      description: 'Custom onboarding task',
      status: 'pending',
      dueDate: new Date().toISOString().split('T')[0],
      assignee: 'HR Team',
      priority: 'medium',
      completedDate: null,
      notes: ''
    };
    setChecklistItems(prev => [...prev, newItem]);
  };

  const filteredItems = activeSection === 'all' 
    ? checklistItems 
    : checklistItems.filter(item => item.section === activeSection);

  const completedItems = checklistItems.filter(item => item.status === 'completed').length;
  const totalItems = checklistItems.length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('onboarding-list')}
            className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="mb-1 text-[#333333]">Onboarding Checklist</h1>
            <p className="text-[#666666]">{employee.name} - {employee.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={addCustomItem}
            className="neu-button px-4 py-3 rounded-xl text-[#05A7CC] flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
          <button className="neu-secondary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200">
            <Send className="h-5 w-5" />
            Send Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Employee Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="neu-card p-6 rounded-2xl mb-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 neu-button rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-[#05A7CC]" />
              </div>
              <h3 className="font-semibold text-[#333333]">{employee.name}</h3>
              <p className="text-sm text-[#666666]">{employee.position}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Department</label>
                <p className="text-[#333333]">{employee.department}</p>
              </div>
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Manager</label>
                <p className="text-[#333333]">{employee.manager}</p>
              </div>
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Buddy</label>
                <p className="text-[#333333]">{employee.buddy}</p>
              </div>
              <div>
                <label className="text-xs text-[#666666] uppercase tracking-wide">Join Date</label>
                <p className="text-[#333333]">{employee.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="neu-card p-6 rounded-2xl mb-6">
            <h3 className="font-semibold text-[#333333] mb-4">Overall Progress</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#05A7CC] mb-2">{progressPercentage}%</div>
              <div className="w-full neu-card-inset rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-[#666666] text-center">
              {completedItems} of {totalItems} items completed
            </p>
          </div>

          {/* Section Filter */}
          <div className="neu-card p-4 rounded-2xl">
            <h3 className="font-semibold text-[#333333] mb-4">Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                    activeSection === section.id 
                      ? 'neu-primary text-white' 
                      : 'neu-small text-[#333333] hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{section.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      activeSection === section.id 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'neu-card-inset text-[#666666]'
                    }`}>
                      {section.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="lg:col-span-3">
          <div className="neu-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#333333]">
                {activeSection === 'all' ? 'All Checklist Items' : 
                 sections.find(s => s.id === activeSection)?.name}
              </h2>
              <div className="text-sm text-[#666666]">
                {filteredItems.length} items
              </div>
            </div>

            <div className="space-y-4">
              {filteredItems.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                return (
                  <div key={item.id} className="neu-small p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => toggleItemStatus(item.id)}
                        className={`flex-shrink-0 p-1 rounded-full transition-all duration-200 ${
                          item.status === 'completed' 
                            ? 'text-green-600' 
                            : 'text-[#666666] hover:text-[#05A7CC]'
                        }`}
                      >
                        <StatusIcon className="h-6 w-6" />
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className={`font-medium ${
                              item.status === 'completed' 
                                ? 'text-[#666666] line-through' 
                                : 'text-[#333333]'
                            }`}>
                              {item.title}
                            </h3>
                            <p className="text-sm text-[#666666] mt-1">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className={`text-xs px-2 py-1 rounded-full neu-card ${priorityColors[item.priority]}`}>
                              {item.priority}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full neu-card ${statusColors[item.status]}`}>
                              {item.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-[#666666]">
                          <div className="flex items-center gap-4">
                            <span>Due: {item.dueDate}</span>
                            <span>Assignee: {item.assignee}</span>
                          </div>
                          {item.completedDate && (
                            <span className="text-green-600">
                              Completed: {item.completedDate}
                            </span>
                          )}
                        </div>
                        
                        {item.notes && (
                          <div className="mt-3 p-3 neu-card-inset rounded-xl">
                            <p className="text-sm text-[#666666]">{item.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-[#666666] mx-auto mb-4" />
                <p className="text-[#666666]">No items found for this section.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};