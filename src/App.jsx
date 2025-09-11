import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './components/attendence/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import AllMeetings from './components/dashboard/meetings/Meetings';
import NewMeeting from './components/dashboard/meetings/new-meeting';
import MeetingConfirmation from './components/dashboard/meetings/MeetingConfirmation';
import MeetingDetails from './components/dashboard/meetings/MeetingDetails';
import EditMeeting from './components/dashboard/meetings/EditMeeting';
import MeetingCalendar from './components/dashboard/meetings/MeetingCalendar';
import Header from './components/Header';
import ShiftManagement from './components/attendence/ShiftManagement';
import { OvertimeHours } from './components/attendence/OvertimeHours';
import { HolidayManagement } from './components/attendence/HolidayManagement';
import { PunchRecords } from './components/attendence/PunchRecords';
import { PolicyRules } from './components/attendence/PolicyRules';
import { LeaveTracking } from './components/attendence/LeaveTracking';
import { EmployeeAttendanceProfile } from './components/attendence/EmployeeAttendanceProfile';
import { AttendanceCalendar } from './components/attendence/AttendanceCalendar';

function MeetingsLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path, id) => {
    if (path === 'all') {
      navigate('/meetings');
    } else if (path === 'new') {
      navigate('/meetings/new');
    } else if (path === 'confirmation') {
      navigate('/meetings/confirmation');
    } else if (path === 'meeting-details' && id) {
      navigate(`/meetings/${id}`);
    } else if (path === 'edit-meeting' && id) {
      navigate(`/meetings/edit/${id}`);
    } else if (path === 'calendar' || path === 'calendar-add-meeting') {
      navigate('/meetings/calendar');
    } else {
      console.warn(`Unknown navigation path: ${path}`);
    }
  };

  return React.cloneElement(children, { onNavigate: handleNavigate });
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Close mobile sidebar when clicking outside
  const handleClickOutside = (e) => {
    if (isMobileSidebarOpen && !e.target.closest('.sidebar-container')) {
      setIsMobileSidebarOpen(false);
    }
  };

  // Add click outside listener
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}
      
      {/* Sidebar - sticky */}
      <div className={`sidebar-container fixed lg:sticky top-0 left-0 h-screen z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar 
          collapsed={!sidebarOpen} 
          onToggle={toggleSidebar} 
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - sticky */}
        <div className="sticky top-0 z-10">
          <Header 
            toggleSidebar={toggleSidebar} 
            onToggleMobileSidebar={toggleMobileSidebar}
            darkMode={false} // Add this if you're implementing dark mode
            onToggleDarkMode={() => {}} // Add your dark mode toggle function here
          />
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/shifts" element={<ShiftManagement/>} />
            <Route path="/attendance/overtime" element={<OvertimeHours/>} />
            <Route path="/attendance/holidays" element={<HolidayManagement/>} />
            <Route path="/attendance/punch" element={<PunchRecords/>} />
            <Route path="/attendance/policy" element={<PolicyRules/>} />
            <Route path="/attendance/leave" element={<LeaveTracking/>} />
            <Route path="/attendance/employee-profile" element={<EmployeeAttendanceProfile />}/>
            <Route path="/attendance/calendar" element={<AttendanceCalendar/>}/>
            <Route path="/leave" element={<Leave />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/meetings" element={
              <MeetingsLayout>
                <AllMeetings />
              </MeetingsLayout>
            } />
            <Route path="/meetings/new" element={
              <MeetingsLayout>
                <NewMeeting />
              </MeetingsLayout>
            } />
            <Route path="/meetings/confirmation" element={
              <MeetingsLayout>
                <MeetingConfirmation />
              </MeetingsLayout>
            } />
            <Route path="/meetings/:meetingId" element={
              <MeetingsLayout>
                <MeetingDetails />
              </MeetingsLayout>
            } />
            <Route path="/meetings/edit/:meetingId" element={
              <MeetingsLayout>
                <EditMeeting />
              </MeetingsLayout>
            } />
            <Route path="/meetings/edit/:meetingId" element={
              <MeetingsLayout>
                <EditMeeting />
              </MeetingsLayout>
            } />
            <Route path="/meetings/calendar" element={
              <MeetingsLayout>
                <MeetingCalendar />
              </MeetingsLayout>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
