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
  UserCog
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
      { label: 'Attendance Hub', path: '/attendance' },
      { label: 'Punch IN/OUT', path: '/attendance/punch' },
      { label: 'Shift Management', path: '/attendance/shifts' }
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
      { label: 'All Projects', path: '/vslm/all-projects', component: 'VSLM', default: true },
      { label: 'Project List View', path: '/vslm/project-list', component: 'VSLM' },
      { label: 'New Project', path: '/vslm/new-project', component: 'VSLM' },
      { label: 'Uploaded Images', path: '/vslm/uploaded-images', component: 'VSLM' }
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquare,
    items: [
      { label: 'All Projects', path: '/tasks/projects' },
      { label: 'Task Status (Kanban View)', path: '/tasks/kanban' }
    ]
  }
];
