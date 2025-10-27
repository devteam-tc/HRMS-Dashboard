import React, { useState } from 'react';
import { NeumorphicSidebar } from './NeumorphicSidebar';
import { NeumorphicTopNavbar } from './NeumorphicTopNavbar';
import { NeumorphicDashboard } from './NeumorphicDashboard';
import { ViewAllEmployees } from './pages/ViewAllEmployees';
import { AddNewEmployee } from './pages/AddNewEmployee';
import { PunchInOut } from './pages/PunchInOut';

// Attendance Pages
import { AttendanceDashboard } from './pages/attendance/AttendanceDashboard';
import { AttendanceCalendar } from './pages/attendance/AttendanceCalendar';
import { PunchRecords } from './pages/attendance/PunchRecords';
import { ShiftManagement } from './pages/attendance/ShiftManagement';
import { LeaveTracking } from './pages/attendance/LeaveTracking';
import { OvertimeHours } from './pages/attendance/OvertimeHours';
import { HolidayManagement } from './pages/attendance/HolidayManagement';
import { PolicyRules } from './pages/attendance/PolicyRules';
import { EmployeeAttendanceProfile } from './pages/attendance/EmployeeAttendanceProfile';
import { AttendanceReports } from './pages/attendance/AttendanceReports';

// Meeting Pages
import { AllMeetings } from './pages/meetings/AllMeetings';
import { MeetingDetails } from './pages/meetings/MeetingDetails';
import { NewMeeting } from './pages/meetings/NewMeeting';
import { MeetingConfirmation } from './pages/meetings/MeetingConfirmation';
import { MeetingCalendar } from './pages/meetings/MeetingCalendar';
import { CalendarAddMeeting } from './pages/meetings/CalendarAddMeeting';
import { EditMeeting } from './pages/meetings/EditMeeting';
import { MeetingAttachments } from './pages/meetings/MeetingAttachments';
import { MeetingReports } from './pages/meetings/MeetingReports';
import { MeetingsSummary } from './pages/meetings/MeetingsSummary';

// Recruitment Pages
import { JobOpeningsList } from '../recruitment/JobOpeningsList';
import { JobOpeningDetails } from '../recruitment/JobOpeningDetails';
import { NewJobOpening } from '../recruitment/NewJobOpening';
import { EditJobOpening } from '../recruitment/EditJobOpening';
import { JobOpeningStatus } from '../recruitment/JobOpeningStatus';
import { ApplicantsList } from '../recruitment/ApplicantsList';
import { ApplicantDetails } from '../recruitment/ApplicantDetails';
import { ApplicantActions } from '../recruitment/ApplicantActions';
import { ApplicantResume } from '../recruitment/ApplicantResume';
import { ApplicantProgress } from '../recruitment/ApplicantProgress';
import { InterviewsList } from '../recruitment/InterviewsList';
import { InterviewDetails } from '../recruitment/InterviewDetails';
import { NewInterview } from '../recruitment/NewInterview';
import { InterviewFeedback } from '../recruitment/InterviewFeedback';
import { InterviewCalendar } from '../recruitment/InterviewCalendar';


// VSLM Pages
import { AllProjectsGrid } from './pages/vslm/AllProjectsGrid';
import { AllProjectsList } from './pages/vslm/AllProjectsList';
import { ProjectDetails } from './pages/vslm/ProjectDetails';
import { UploadedImages } from './pages/vslm/UploadedImages';
import { UploadedImagesUpload } from './pages/vslm/UploadedImagesUpload';
import { UploadedImagesSingle } from './pages/vslm/UploadedImagesSingle';
import { ProjectTimeline } from './pages/vslm/ProjectTimeline';
import { SiteVisitLog } from './pages/vslm/SiteVisitLog';
import { VSLMAnalytics } from './pages/vslm/VSLMAnalytics';
import { ProjectReports } from './pages/vslm/ProjectReports';
import { ProjectEdit } from './pages/vslm/ProjectEdit';
import { ProjectActivityFeed } from './pages/vslm/ProjectActivityFeed';
import { VSLMSummary } from './pages/vslm/VSLMSummary';

// Tasks Pages
import { TaskDashboard } from './pages/tasks/TaskDashboard';
import { TaskProjects } from './pages/tasks/TaskProjects';
import { TaskKanban } from './pages/tasks/TaskKanban';
import { AddNewTask } from './pages/tasks/AddNewTask';
import { TaskDetails } from './pages/tasks/TaskDetails';
import { SubtasksManagement } from './pages/tasks/SubtasksManagement';
import { TaskDependencies } from './pages/tasks/TaskDependencies';
import { TaskAssignment } from './pages/tasks/TaskAssignment';
import { TaskTimeline } from './pages/tasks/TaskTimeline';
import { TaskAnalytics } from './pages/tasks/TaskAnalytics';

// Employee Pages
import { EmployeeDirectory } from './pages/employees/EmployeeDirectory';
import { EmployeeDetails } from './pages/employees/EmployeeDetails';
import { AddEmployee } from './pages/employees/AddEmployee';
import { EmployeeProfile } from './pages/employees/EmployeeProfile';
import { OnboardingDashboard } from './pages/employees/OnboardingDashboard';
import { OnboardingNew } from './pages/employees/OnboardingNew';
import { OnboardingChecklist } from './pages/employees/OnboardingChecklist';
import { OffboardingDashboard } from './pages/employees/OffboardingDashboard';
import { ExitProcess } from './pages/employees/ExitProcess';
import { OffboardingChecklist } from './pages/employees/OffboardingChecklist';

export const NeumorphicHRMSDashboard = () => {
  const [activeModule, setActiveModule] = useState('employee-directory');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navigationData, setNavigationData] = useState({});

  const handleModuleChange = (module, data = {}) => {
    setActiveModule(module);
    setNavigationData(data);
    console.log(`Navigating to ${module} module`, data);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <TaskDashboard onNavigate={handleModuleChange} />;
      
      // Employee Module
      case 'employee-directory':
        return <EmployeeDirectory onNavigate={handleModuleChange} />;
      case 'employee-details':
        return <EmployeeDetails employeeId={navigationData.employeeId} onNavigate={handleModuleChange} />;
      case 'add-employee':
        return <AddEmployee mode={navigationData.mode} employeeId={navigationData.employeeId} onNavigate={handleModuleChange} />;
      case 'employee-profile':
        return <EmployeeProfile employeeId={navigationData.employeeId} onNavigate={handleModuleChange} />;
      case 'onboarding-dashboard':
        return <OnboardingDashboard onNavigate={handleModuleChange} />;
      case 'onboarding-new':
        return <OnboardingNew onNavigate={handleModuleChange} />;
      case 'onboarding-checklist':
        return <OnboardingChecklist onNavigate={handleModuleChange} />;
        case 'offboarding-dashboard':
          return <OffboardingDashboard onNavigate={handleModuleChange} />;
        case 'exit-process':
          return <ExitProcess onNavigate={handleModuleChange} />;
        case 'offboarding-checklist':
          return <OffboardingChecklist onNavigate={handleModuleChange} />;
      case 'exit-process':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Exit Process</h1>
              <p className="text-[#666666]">Manage employee exit workflow and documentation.</p>
            </div>
          </div>
        );
      case 'offboarding-checklist':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Offboarding Checklist</h1>
              <p className="text-[#666666]">Complete clearance checklist and asset returns.</p>
            </div>
          </div>
        );
      
      // Attendance Module
      case 'attendance-dashboard':
        return <AttendanceDashboard onNavigate={handleModuleChange} />;
      case 'attendance-calendar':
        return <AttendanceCalendar onNavigate={handleModuleChange} />;
      case 'punch-records':
        return <PunchRecords onNavigate={handleModuleChange} />;
      case 'shift-management':
        return <ShiftManagement onNavigate={handleModuleChange} />;
      case 'leave-tracking':
        return <LeaveTracking onNavigate={handleModuleChange} />;
      case 'overtime-hours':
        return <OvertimeHours onNavigate={handleModuleChange} />;
      case 'holiday-management':
        return <HolidayManagement onNavigate={handleModuleChange} />;
      case 'policy-rules':
        return <PolicyRules onNavigate={handleModuleChange} />;
      case 'employee-attendance-profile':
        return <EmployeeAttendanceProfile employeeId={navigationData.employeeId} onNavigate={handleModuleChange} />;
      case 'attendance-reports':
        return <AttendanceReports onNavigate={handleModuleChange} />;
      case 'punch-in-out':
        return <PunchInOut />;
      case 'attendance-hub':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Attendance Hub</h1>
              <p className="text-[#666666]">Calendar view with attendance summary cards will be displayed here.</p>
            </div>
          </div>
        );
      
    // Recruitment Module - Job Openings
    case 'job-openings':
      return <JobOpeningsList onNavigate={handleModuleChange} />;
    case 'job-openings-list':
      return <JobOpeningsList onNavigate={handleModuleChange} />;
    case 'job-opening-details':
      return <JobOpeningDetails jobId={navigationData.jobId} onNavigate={handleModuleChange} />;
    case 'new-job-opening':
      return <NewJobOpening onNavigate={handleModuleChange} />;
    case 'edit-job-opening':
      return <EditJobOpening jobId={navigationData.jobId} onNavigate={handleModuleChange} />;
    case 'job-opening-status':
      return <JobOpeningStatus onNavigate={handleModuleChange} />;
    
    // Recruitment Module - Applicants
    case 'applicants':
      return <ApplicantsList jobId={navigationData.jobId} onNavigate={handleModuleChange} />;
    case 'applicants-list':
      return <ApplicantsList jobId={navigationData.jobId} onNavigate={handleModuleChange} />;
    case 'applicant-details':
      return <ApplicantDetails applicantId={navigationData.applicantId} onNavigate={handleModuleChange} />;
    case 'applicant-actions':
      return <ApplicantActions applicantId={navigationData.applicantId} onNavigate={handleModuleChange} />;
    case 'applicant-resume':
      return <ApplicantResume applicantId={navigationData.applicantId} onNavigate={handleModuleChange} />;
    case 'applicant-progress':
      return <ApplicantProgress applicantId={navigationData.applicantId} onNavigate={handleModuleChange} />;
    
    // Recruitment Module - Interviews
    case 'interviews':
      return <InterviewsList onNavigate={handleModuleChange} />;
    case 'interviews-list':
      return <InterviewsList onNavigate={handleModuleChange} />;
    case 'interview-details':
      return <InterviewDetails interviewId={navigationData.interviewId} onNavigate={handleModuleChange} />;
    case 'new-interview':
      return <NewInterview applicantId={navigationData.applicantId} interviewType={navigationData.interviewType} onNavigate={handleModuleChange} />;
    case 'edit-interview':
      return <NewInterview interviewId={navigationData.interviewId} onNavigate={handleModuleChange} />;
    case 'interview-feedback':
      return <InterviewFeedback interviewId={navigationData.interviewId} onNavigate={handleModuleChange} />;
    case 'interview-calendar':
      return <InterviewCalendar onNavigate={handleModuleChange} />;
    
      // Meetings Module
      case 'all-meetings':
        return <AllMeetings onNavigate={handleModuleChange} />;
      case 'meeting-details':
        return <MeetingDetails meetingId={navigationData.meetingId || navigationData} onNavigate={handleModuleChange} />;
      case 'new-meeting':
        return <NewMeeting onNavigate={handleModuleChange} />;
      case 'new-meetings':
        return <NewMeeting onNavigate={handleModuleChange} />;
      case 'meeting-confirmation':
        return <MeetingConfirmation onNavigate={handleModuleChange} />;
      case 'meeting-calendar':
        return <MeetingCalendar onNavigate={handleModuleChange} />;
      case 'calendar-add-meeting':
        return <CalendarAddMeeting selectedDate={navigationData.date} onNavigate={handleModuleChange} />;
      case 'edit-meeting':
        return <EditMeeting meetingId={navigationData.meetingId || navigationData} onNavigate={handleModuleChange} />;
      case 'meeting-attachments':
        return <MeetingAttachments onNavigate={handleModuleChange} />;
      case 'meeting-reports':
        return <MeetingReports onNavigate={handleModuleChange} />;
      
      // VSLM Module
      case 'all-projects':
        return <AllProjectsGrid onNavigate={handleModuleChange} />;
      case 'all-projects-list':
        return <AllProjectsList onNavigate={handleModuleChange} />;
      case 'project-details':
        return <ProjectDetails projectId={navigationData.projectId || navigationData} onNavigate={handleModuleChange} />;
      case 'uploaded-images':
        return <UploadedImages projectId={navigationData.projectId} onNavigate={handleModuleChange} />;
      case 'uploaded-images-upload':
        return <UploadedImagesUpload projectId={navigationData.projectId} onNavigate={handleModuleChange} />;
      case 'uploaded-images-single':
        return <UploadedImagesSingle imageId={navigationData.imageId || navigationData} onNavigate={handleModuleChange} />;
      case 'project-timeline':
        return <ProjectTimeline projectId={navigationData.projectId || navigationData} onNavigate={handleModuleChange} />;
      case 'site-visit-log':
        return <SiteVisitLog projectId={navigationData.projectId || navigationData} onNavigate={handleModuleChange} />;
      case 'vslm-analytics':
        return <VSLMAnalytics onNavigate={handleModuleChange} />;
      case 'project-reports':
        return <ProjectReports onNavigate={handleModuleChange} />;
      case 'project-edit':
        return <ProjectEdit projectId={navigationData.projectId || navigationData} isNew={navigationData.isNew} onNavigate={handleModuleChange} />;
      case 'project-activity-feed':
        return <ProjectActivityFeed projectId={navigationData.projectId || navigationData} onNavigate={handleModuleChange} />;
      
      // Tasks Module
      case 'task-dashboard':
        return <TaskDashboard onNavigate={handleModuleChange} />;
      case 'task-projects':
        return <TaskProjects onNavigate={handleModuleChange} />;
      case 'task-kanban':
        return <TaskKanban onNavigate={handleModuleChange} />;
      case 'add-new-task':
        return <AddNewTask defaultStatus={navigationData.defaultStatus} onNavigate={handleModuleChange} />;
      case 'task-details':
        return <TaskDetails taskId={navigationData.taskId || navigationData} onNavigate={handleModuleChange} />;
      case 'subtasks-management':
        return <SubtasksManagement taskId={navigationData.taskId || navigationData} onNavigate={handleModuleChange} />;
      case 'task-dependencies':
        return <TaskDependencies taskId={navigationData.taskId || navigationData} onNavigate={handleModuleChange} />;
      case 'task-assignment':
        return <TaskAssignment onNavigate={handleModuleChange} />;
      case 'task-timeline':
        return <TaskTimeline onNavigate={handleModuleChange} />;
      case 'task-analytics':
        return <TaskAnalytics onNavigate={handleModuleChange} />;
      
      // VSLM Module
      case 'all-projects':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">All Projects</h1>
              <p className="text-[#666666]">Project grid view with filters will be displayed here.</p>
            </div>
          </div>
        );
      case 'uploaded-images':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Uploaded Images</h1>
              <p className="text-[#666666]">Image gallery with tags will be displayed here.</p>
            </div>
          </div>
        );
      
      // Tasks Module
      case 'task-projects':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Task Projects</h1>
              <p className="text-[#666666]">Project list with progress bars will be displayed here.</p>
            </div>
          </div>
        );
      case 'task-status':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Task Status (Kanban)</h1>
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="neu-card-inset p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-[#333333] mb-4">To Do</h3>
                  <div className="space-y-4">
                    <div className="neu-small p-4 rounded-2xl">
                      <h4 className="font-medium text-[#333333]">Task 1</h4>
                      <p className="text-sm text-[#666666]">Task description</p>
                    </div>
                  </div>
                </div>
                <div className="neu-card-inset p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-[#333333] mb-4">In Progress</h3>
                  <div className="space-y-4">
                    <div className="neu-small p-4 rounded-2xl">
                      <h4 className="font-medium text-[#333333]">Task 2</h4>
                      <p className="text-sm text-[#666666]">Task description</p>
                    </div>
                  </div>
                </div>
                <div className="neu-card-inset p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-[#333333] mb-4">Done</h3>
                  <div className="space-y-4">
                    <div className="neu-small p-4 rounded-2xl">
                      <h4 className="font-medium text-[#333333]">Task 3</h4>
                      <p className="text-sm text-[#666666]">Task description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'add-new-task':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Add New Task</h1>
              <p className="text-[#666666]">Task creation form with priority, assignee, and due date will be displayed here.</p>
            </div>
          </div>
        );
      
      // API Module
      case 'api-keys':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">API Keys</h1>
              <p className="text-[#666666]">API key management interface will be displayed here.</p>
            </div>
          </div>
        );
      case 'usage-analytics':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Usage Analytics</h1>
              <p className="text-[#666666]">API usage charts and analytics will be displayed here.</p>
            </div>
          </div>
        );
      case 'integration-settings':
        return (
          <div className="p-8 bg-[#ECF0F3] min-h-screen">
            <div className="neu-card p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-[#333333] mb-4">Integration Settings</h1>
              <p className="text-[#666666]">Third-party integration configuration will be displayed here.</p>
            </div>
          </div>
        );
      
      // Fallback
      default:
        return <NeumorphicDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#ECF0F3]">
      {/* Sidebar */}
      <NeumorphicSidebar activeModule={activeModule} onModuleChange={handleModuleChange} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <NeumorphicTopNavbar isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};