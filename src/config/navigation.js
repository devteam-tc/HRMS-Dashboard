import { 
  Home, 
  Users, 
  User,
  Clock, 
  UserPlus, 
  Calendar, 
  Camera, 
  CheckSquare,
  FileText,
  CalendarCheck,
  Upload,
  ListChecks,
  Truck,
  HardHat,
  Package,
  UserCog,
  LayoutDashboard,
  CalendarDays,
  Settings,
  Clock as ClockIcon,
  BarChart3,
  FolderOpen,
  Kanban,
  Plus,
  CheckCircle,
  GitBranch
} from 'lucide-react';

export const menuItems = [
  {
    id: 'employees',
    label: 'Employees',
    icon: Users,
    items: [
      { label: 'Employee Details', path: '/employees' },
      { label: 'On Boarding', path: '/employees/onboarding' },
      { label: 'Off Boarding', path: '/employees/offboarding' }
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: Clock,
    items: [
      { label: 'Attendance Dashboard', icon: LayoutDashboard, path: '/attendance' },
      { label: 'Attendance Calendar', icon: CalendarDays, path: '/attendance/calendar' },
      { label: 'Punch In/Out Records', icon: Clock, path: '/attendance/punch' },
      { label: 'Shift Management', icon: Settings, path: '/attendance/shifts' },
      { label: 'Leave & Absence Tracking', icon: Calendar, path: '/attendance/leave' },
      { label: 'Overtime & Working Hours', icon: ClockIcon, path: '/attendance/overtime' },
      { label: 'Holiday Management', icon: CalendarDays, path: '/attendance/holidays' },
      { label: 'Policy & Rules Setup', icon: Settings, path: '/attendance/policy' },
      { label: 'Employee Profile', icon: Users, path: '/attendance/employee-profile' },
    ]
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: UserPlus,
    items: [
      { label: 'Job Openings', path: '/recruitment/jobs' },
      { label: 'Applicants', path: '/recruitment/applicants' },
      { label: 'Interviews', path: '/recruitment/interviews' },
      { label: 'Interview Calendar', path: '/recruitment/calendar' }
    ]
  },
  {
    id: 'meetings',
    label: 'Meetings',
    icon: CalendarCheck,
    items: [
      { label: 'All Meetings (MOM)', path: '/meetings' },
      { label: 'New Meeting', path: '/meetings/new' },
      { label: 'Meeting Calendar', path: '/meetings/calendar' }
    ]
  },
  {
    id: 'vslm',
    label: 'VSLM',
    icon: HardHat,
    path: '/vslm',
    component: 'VSLM',
    items: [
      { label: 'All Projects', path: '/all-project', component: 'VSLM'
        , default: true },
      { label: 'Uploaded Images', path: '/uploaded-images', component: 'VSLM'},
      { label: 'Project Time Line', path: '/timeline', component: 'VSLM'},
      { label: 'Site Visit Log', path: '/sitevisitlog', component: 'VSLM'},
      { label: 'Project Analytics', path: '/analytics', component: 'VSLM' },
      // { label: 'Dependencies', path: '/dependencies', component: 'VSLM' },
      // { label: 'New Project', path: '/new-project', component: 'VSLM'}, 
      // { label: 'Edit Project', path: '/project-edit', cmponent: 'VSLM'},
      // { label: 'Total Projects', path: '/project-list', component: 'VSLM'},
      // { label: 'Reports', path: '/reports', component: 'VSLM'},
      // { label: 'Sub Tasks', path: '/subtasks', component: 'VSLM'},
      // { label: 'Tasks Assignment', path: '/taskassignment', component: 'VSLM'},
      // { label: 'Task Details', path: '/taskdetails', component: 'VSLM'}, 
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquare,
    items: [
      { label: 'Task Dashboard', icon: LayoutDashboard  , path: '/tasks/dashboard' },
      { label: 'Projects (Development)', icon: FolderOpen  , path: '/tasks/projects' },
      { label: 'Task Status (Kanban)', icon: Kanban  , path: '/tasks/kanban' },
      { label: 'Add New Task', icon: Plus  , path: '/tasks/add' },
      { label: 'Task Details', icon: FileText  , path: '/tasks/details' },
      { label: 'Subtasks', icon: CheckCircle  , path: '/tasks/subtasks' },
      { label: 'Dependencies', icon: GitBranch  , path: '/tasks/dependencies' },
      { label: 'Team Assignment', icon: Users  , path: '/tasks/assignment' },
      { label: 'Timeline (Gantt)', icon: CalendarDays  , path: '/tasks/timeline' },
      { label: 'Analytics & Reports', icon: BarChart3  , path: '/tasks/analytics' }
    ]
  },
];
