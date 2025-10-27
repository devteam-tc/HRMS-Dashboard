import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Clock,
  UserPlus,
  Calendar,
  MapPin,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX,
  ClockIcon,
  Settings as SettingsIcon,
  Briefcase,
  FileText,
  CalendarDays,
  Image,
  FolderOpen,
  Kanban
} from 'lucide-react';

interface SubItem {
  id: string;
  label: string;
  icon: any;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  subItems?: SubItem[];
}

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const navigationItems: NavigationItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard 
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: Users,
    subItems: [
      { id: 'employee-details', label: 'Employee Details', icon: Users },
      { id: 'onboarding', label: 'Onboarding', icon: UserCheck },
      { id: 'offboarding', label: 'Offboarding', icon: UserX }
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: Clock,
    subItems: [
      { id: 'attendance-hub', label: 'Attendance Hub', icon: ClockIcon },
      { id: 'punch-in-out', label: 'Punch In/Out', icon: Clock },
      { id: 'shift-management', label: 'Shift Management', icon: SettingsIcon }
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
      { id: 'all-meetings', label: 'All Meetings (MOM)', icon: FileText },
      { id: 'new-meetings', label: 'New Meetings', icon: Calendar },
      { id: 'meeting-calendar', label: 'Meeting Calendar', icon: CalendarDays }
    ]
  },
  {
    id: 'vslm',
    label: 'VSLM',
    icon: MapPin,
    subItems: [
      { id: 'all-projects', label: 'All Projects', icon: FolderOpen },
      { id: 'uploaded-images', label: 'Uploaded Images', icon: Image }
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquare,
    subItems: [
      { id: 'task-projects', label: 'All Projects', icon: FolderOpen },
      { id: 'task-status', label: 'Task Status (Kanban)', icon: Kanban }
    ]
  }
];

export const Sidebar = ({ activeModule, onModuleChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState(['employees']);

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return;
    
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId: string, hasSubItems: boolean) => {
    if (hasSubItems && !isCollapsed) {
      toggleExpanded(itemId);
    } else if (!hasSubItems) {
      onModuleChange(itemId);
    }
  };

  const isParentActive = (item: NavigationItem) => {
    if (activeModule === item.id) return true;
    return item.subItems?.some(sub => activeModule === sub.id) || false;
  };

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 overflow-y-auto ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo and Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#05A7CC] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HR</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">HRMS</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4 pb-4">
        <div className="px-2 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);
            const hasSubItems = !!(item.subItems && item.subItems.length > 0);
            const parentActive = isParentActive(item);
            const directActive = activeModule === item.id;
            
            return (
              <div key={item.id}>
                {/* Main Item */}
                <button
                  onClick={() => handleItemClick(item.id, hasSubItems)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    parentActive
                      ? 'bg-[#05A7CC] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 text-sm truncate">{item.label}</span>
                    )}
                  </div>
                  {!isCollapsed && hasSubItems && (
                    <div className="ml-2">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  )}
                </button>

                {/* Sub Items */}
                {!isCollapsed && hasSubItems && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeModule === subItem.id;
                      
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => onModuleChange(subItem.id)}
                          className={`w-full flex items-center px-3 py-1.5 rounded-md transition-colors text-sm ${
                            isSubActive
                              ? 'bg-[#EF5226] text-white'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          }`}
                        >
                          <SubIcon size={16} className="flex-shrink-0" />
                          <span className="ml-2 truncate">{subItem.label}</span>
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