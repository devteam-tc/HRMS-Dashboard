import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Clock,
  UserPlus,
  Calendar,
  MapPin,
  CheckSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  UserCheck,
  UserX,
  ClockIcon,
  Briefcase,
  FileText,
  CalendarDays,
  Image,
  FolderOpen,
  Kanban,
  Plus,
  Key,
  BarChart3,
  Cog,
  GitBranch,
  CheckCircle,
  User
} from 'lucide-react';

const navigationItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard 
  },
  {
    id: 'employees',
    label: 'Employee Management',
    icon: Users,
    subItems: [
      { id: 'employee-directory', label: 'HR Dashboard', icon: LayoutDashboard },
      { id: 'employee-profile', label: 'Employee Profile', icon: User },
      { id: 'onboarding-dashboard', label: 'Onboarding', icon: LayoutDashboard },
      { id: 'offboarding-dashboard', label: 'Offboarding ', icon: LayoutDashboard },
      { id: 'neumorphic-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
      
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: Clock,
    subItems: [
      { id: 'attendance-dashboard', label: 'Attendance Dashboard', icon: LayoutDashboard },
      { id: 'attendance-calendar', label: 'Attendance Calendar', icon: CalendarDays },
      { id: 'punch-records', label: 'Punch In/Out Records', icon: Clock },
      { id: 'shift-management', label: 'Shift Management', icon: Settings },
      { id: 'leave-tracking', label: 'Leave & Absence Tracking', icon: Calendar },
      { id: 'overtime-hours', label: 'Overtime & Working Hours', icon: ClockIcon },
      { id: 'holiday-management', label: 'Holiday Management', icon: CalendarDays },
      { id: 'policy-rules', label: 'Policy & Rules Setup', icon: Settings },
      { id: 'employee-attendance-profile', label: 'Employee Profile', icon: Users },
      { id: 'punch-in-out', label: 'Punch In/Out', icon: Clock },
      
    ]
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: UserPlus,
    subItems: [
      { id: 'job-openings', label: 'Job Openings', icon: Briefcase },
      { id: 'applicants', label: 'Applicants', icon: Users },
      { id: 'interviews', label: 'Interviews', icon: FileText },
      { id: 'interview-calendar', label: 'Interview Calendar', icon: CalendarDays }
    ]
  },
  {
    id: 'meetings',
    label: 'Meetings',
    icon: Calendar,
    subItems: [
      { id: 'all-meetings', label: 'All Meetings', icon: FileText },
      { id: 'new-meeting', label: 'New Meeting', icon: Plus },
      { id: 'meeting-calendar', label: 'Meeting Calendar', icon: CalendarDays },
      { id: 'meeting-attachments', label: 'Attachments', icon: Image },
      { id: 'meeting-reports', label: 'Reports & Analytics', icon: BarChart3 }
    ]
  },
  {
    id: 'vslm',
    label: 'VSLM',
    icon: MapPin,
    subItems: [
      { id: 'all-projects', label: 'All Projects', icon: FolderOpen },
      { id: 'uploaded-images', label: 'Uploaded Images', icon: Image },
      { id: 'project-timeline', label: 'Project Timeline', icon: CalendarDays },
      { id: 'site-visit-log', label: 'Site Visit Log', icon: MapPin },
      { id: 'vslm-analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'project-reports', label: 'Reports', icon: FileText }
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquare,
    subItems: [
      { id: 'task-dashboard', label: 'Task Dashboard', icon: LayoutDashboard },
      { id: 'task-projects', label: 'Projects (Development)', icon: FolderOpen },
      { id: 'task-kanban', label: 'Task Status (Kanban)', icon: Kanban },
      { id: 'add-new-task', label: 'Add New Task', icon: Plus },
      { id: 'task-details', label: 'Task Details', icon: FileText },
      { id: 'subtasks-management', label: 'Subtasks', icon: CheckCircle },
      { id: 'task-dependencies', label: 'Dependencies', icon: GitBranch },
      { id: 'task-assignment', label: 'Team Assignment', icon: Users },
      { id: 'task-timeline', label: 'Timeline (Gantt)', icon: CalendarDays },
      { id: 'task-analytics', label: 'Analytics & Reports', icon: BarChart3 }
    ]
  },

];

export const NeumorphicSidebar = ({ activeModule, onModuleChange }) => {
  const [expandedItems, setExpandedItems] = useState(['tasks']);

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId, hasSubItems) => {
    if (hasSubItems) {
      toggleExpanded(itemId);
    } else {
      onModuleChange(itemId);
    }
  };

  const isParentActive = (item) => {
    if (activeModule === item.id) return true;
    return item.subItems?.some(sub => activeModule === sub.id) || false;
  };

  return (
    <div className="w-80 h-screen neu-sidebar overflow-y-auto">
      {/* Logo */}
      <div className="p-6">
        <div className="neu-card p-4 flex items-center justify-center">
          <div className="neu-small rounded-lg p-3 mr-3">
            <div className="w-8 h-8 neu-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">HR</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-[#333333]">HRMS</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="px-4 pb-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const parentActive = isParentActive(item);
            
            return (
              <div key={item.id} className="space-y-1">
                {/* Main Item */}
                <button
                  onClick={() => handleItemClick(item.id, hasSubItems)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                    parentActive && !hasSubItems
                      ? 'neu-primary text-white'
                      : 'neu-button text-[#333333] hover:text-[#05A7CC]'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon size={20} className="mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {hasSubItems && (
                    <div className="ml-2">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                </button>

                {/* Sub Items */}
                {hasSubItems && isExpanded && (
                  <div className="ml-4 space-y-1 neu-card-inset p-2 rounded-xl">
                    {item.subItems?.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeModule === subItem.id;
                      
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => onModuleChange(subItem.id)}
                          className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                            isSubActive
                              ? 'neu-secondary text-white'
                              : 'neu-small text-[#666666] hover:text-[#05A7CC]'
                          }`}
                        >
                          <SubIcon size={16} className="mr-3" />
                          <span className="text-sm font-medium">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};