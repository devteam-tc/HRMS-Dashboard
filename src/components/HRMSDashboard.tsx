import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Dashboard } from './Dashboard';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { Onboarding } from './pages/Onboarding';
import { AttendanceHub } from './pages/AttendanceHub';
import { JobOpenings } from './pages/JobOpenings';
import { TaskStatus } from './pages/TaskStatus';

export const HRMSDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModuleChange = (module: string) => {
    setActiveModule(module);
    // Here you would typically handle navigation to different modules
    console.log(`Navigating to ${module} module`);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically toggle the dark mode class on the document
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      
      // Employee Module
      case 'employee-details':
        return <EmployeeDetails />;
      case 'onboarding':
        return <Onboarding />;
      case 'offboarding':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Offboarding</h1>
            <p className="text-gray-600">Employee offboarding process management will be displayed here.</p>
          </div>
        );
      
      // Attendance Module
      case 'attendance-hub':
        return <AttendanceHub />;
      case 'punch-in-out':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Punch In/Out</h1>
            <p className="text-gray-600">Employee punch in/out interface will be displayed here.</p>
          </div>
        );
      case 'shift-management':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Shift Management</h1>
            <p className="text-gray-600">Shift management and roster will be displayed here.</p>
          </div>
        );
      
      // Recruitment Module
      case 'job-openings':
        return <JobOpenings />;
      case 'applicants':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Applicants</h1>
            <p className="text-gray-600">Job applicant management will be displayed here.</p>
          </div>
        );
      case 'interviews':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Interviews</h1>
            <p className="text-gray-600">Interview management will be displayed here.</p>
          </div>
        );
      case 'interview-calendar':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Interview Calendar</h1>
            <p className="text-gray-600">Interview scheduling calendar will be displayed here.</p>
          </div>
        );
      
      // Meetings Module
      case 'all-meetings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">All Meetings (MOM)</h1>
            <p className="text-gray-600">Meeting records and minutes will be displayed here.</p>
          </div>
        );
      case 'new-meetings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">New Meetings</h1>
            <p className="text-gray-600">Create new meeting interface will be displayed here.</p>
          </div>
        );
      case 'meeting-calendar':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Meeting Calendar</h1>
            <p className="text-gray-600">Meeting calendar view will be displayed here.</p>
          </div>
        );
      
      // VSLM Module
      case 'all-projects':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">All Projects</h1>
            <p className="text-gray-600">Project management overview will be displayed here.</p>
          </div>
        );
      case 'uploaded-images':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Uploaded Images</h1>
            <p className="text-gray-600">Site image gallery will be displayed here.</p>
          </div>
        );
      
      // Tasks Module
      case 'task-projects':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Task Projects</h1>
            <p className="text-gray-600">Project task overview will be displayed here.</p>
          </div>
        );
      case 'task-status':
        return <TaskStatus />;
      
      // Fallback for parent modules or unknown routes
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar activeModule={activeModule} onModuleChange={handleModuleChange} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNavbar isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};