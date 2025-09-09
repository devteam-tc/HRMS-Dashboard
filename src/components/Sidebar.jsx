import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    ChevronDown, 
    ChevronRight, 
    Menu, 
    Home, 
    Users, 
    Clock, 
    UserPlus, 
    Calendar, 
    Camera, 
    CheckSquare, 
    Key,
    BarChart3,
    UserCheck,
    FileText,
    Timer
} from 'lucide-react';

export function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['dashboard']);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      items: [
        { label: 'Overview', path: '/' },
        { label: 'Headcount Snapshot', path: '/dashboard/headcount' },
        { label: 'Attrition Trends', path: '/dashboard/attrition' },
        { label: 'Payroll Overview', path: '/dashboard/payroll' },
        { label: 'Engagement Index', path: '/dashboard/engagement' },
        { label: 'Performance Comparison', path: '/dashboard/performance' },
        { label: 'Upcoming Meetings', path: '/dashboard/meetings' },
        { label: 'Quick Actions', path: '/dashboard/actions' }
      ]
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: Users,
      items: [
        { label: 'Employee List', path: '/employees' },
        { label: 'Add New Employee', path: '/employees/add' },
        { label: 'Onboarding Checklist', path: '/employees/onboarding' },
        { label: 'Document Upload', path: '/employees/documents' },
        { label: 'Offboarding Checklist', path: '/employees/offboarding' },
        { label: 'Asset Return', path: '/employees/assets' },
        { label: 'Exit Interview', path: '/employees/exit-interview' }
      ]
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Clock,
      items: [
        { label: 'Attendance Hub', path: '/attendance' },
        { label: 'Punch In/Out', path: '/attendance/punch' },
        { label: 'Daily Log', path: '/attendance/daily' },
        { label: 'Monthly Report', path: '/attendance/monthly' },
        { label: 'Shift Management', path: '/attendance/shifts' },
        { label: 'Assign Shifts', path: '/attendance/assign-shifts' },
        { label: 'Exceptions Report', path: '/attendance/exceptions' }
      ]
    },
    {
      id: 'recruitment',
      label: 'Recruitment',
      icon: UserPlus,
      items: [
        { label: 'Job Openings', path: '/recruitment/jobs' },
        { label: 'Add Job Opening', path: '/recruitment/add-job' },
        { label: 'Applicants List', path: '/recruitment/applicants' },
        { label: 'Interview List', path: '/recruitment/interviews' },
        { label: 'Interview Feedback', path: '/recruitment/feedback' },
        { label: 'Calendar - Weekly', path: '/recruitment/calendar-weekly' },
        { label: 'Calendar - Monthly', path: '/recruitment/calendar-monthly' }
      ]
    },
    {
      id: 'meetings',
      label: 'Meetings',
      icon: Calendar,
      items: [
        { label: 'All Meetings', path: '/meetings' },
        { label: 'Add Meeting', path: '/meetings/add' },
        { label: 'Calendar - Weekly', path: '/meetings/calendar-weekly' },
        { label: 'Calendar - Monthly', path: '/meetings/calendar-monthly' }
      ]
    },
    {
      id: 'vslm',
      label: 'VSLM',
      icon: Camera,
      items: [
        { label: 'Project List', path: '/vslm/projects' },
        { label: 'Upload Images', path: '/vslm/upload' },
        { label: 'Image Gallery', path: '/vslm/gallery' },
        { label: 'Image Tagging', path: '/vslm/tagging' }
      ]
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      items: [
        { label: 'Task Projects', path: '/tasks/projects' },
        { label: 'Kanban Board', path: '/tasks/kanban' },
        { label: 'Add Task', path: '/tasks/add' },
        { label: 'Task Progress', path: '/tasks/progress' }
      ]
    },
   
  ];

  const sidebarStyles = {
    boxShadow: 'inset -8px 0 12px rgba(255, 255, 255, 0.3), inset 8px 0 12px rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(145deg, #f0f4f7, #e6eaf0)',
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={sidebarStyles}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-semibold" style={{ color: '#05A7CC' }}>
            HRMS
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={{
            boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.1), -3px -3px 6px rgba(255, 255, 255, 0.7)',
          }}
        >
          <Menu size={20} color="#333333" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 overflow-y-auto h-full">
        {menuItems.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => !collapsed && toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                  collapsed ? 'justify-center' : ''
                }`}
                style={{
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.08), -2px -2px 4px rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} color="#333333" />
                  {!collapsed && (
                    <span className="text-gray-700">{section.label}</span>
                  )}
                </div>
                {!collapsed && (
                  <span className="text-gray-500">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {!collapsed && isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block p-2 rounded-lg text-sm transition-all duration-200 hover:bg-gray-50 ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                          : 'text-gray-600'
                      }`}
                      style={{
                        boxShadow: location.pathname === item.path 
                          ? 'inset 2px 2px 4px rgba(5, 167, 204, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                          : '1px 1px 2px rgba(0, 0, 0, 0.05), -1px -1px 2px rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
