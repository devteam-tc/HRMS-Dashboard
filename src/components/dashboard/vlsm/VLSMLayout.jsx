import React, { lazy, Suspense } from 'react';
import { useNavigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import { AllProjectsGrid } from './all-project';
import { AllProjectsList } from './project-list';

// Lazy load components
const UploadedImages = lazy(() => import('./uploaded-images'));
const TaskDetails = lazy(() => import('./taskdetails'));
const Subtasks = lazy(() => import('./subtasks'));
const Dependencies = lazy(() => import('./dependencies'));
const TaskAssignment = lazy(() => import('./taskassignment'));
const Timeline = lazy(() => import('./timeline'));
const Analytics = lazy(() => import('./analytics'));
const Reports = lazy(() => import('./reports'));
const NewProject = lazy(() => import('./new-project'));
const ProjectEdit = lazy(() => import('./project-edit'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function VLSMLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path, params) => {
    if (path.startsWith('/')) {
      navigate(path);
      return;
    }
    
    const routes = {
      'all-projects': '/vlsm',
      'project-list': '/vlsm/project-list',
      'new-project': '/vlsm/new-project',
      'project-edit': `/vlsm/project/${params?.id || 'new'}`,
      'all-projects-list': '/vlsm/all-projects?view=list',
      'task-details': `/vlsm/task/${params?.id}`,
      'subtasks': '/vlsm/subtasks',
      'dependencies': '/vlsm/dependencies',
      'task-assignment': '/vlsm/task-assignment',
      'timeline': '/vlsm/timeline',
      'analytics': '/vlsm/analytics',
      'reports': '/vlsm/reports',
      'uploaded-images': '/vlsm/uploaded-images'
    };
    
    navigate(routes[path] || '/vlsm');
  };

  return (
    <div className="vlsm-layout">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route index element={<AllProjectsGrid onNavigate={handleNavigate} />} />
          <Route path="all-projects" element={
            new URLSearchParams(location.search).get('view') === 'list' ? 
              <AllProjectsList onNavigate={handleNavigate} /> : 
              <AllProjectsGrid onNavigate={handleNavigate} />
          } />
          <Route path="project-list" element={<AllProjectsList onNavigate={handleNavigate} />} />
          <Route path="new-project" element={<NewProject onNavigate={handleNavigate} />} />
          <Route path="task/:id" element={<TaskDetails onNavigate={handleNavigate} />} />
          <Route path="subtasks" element={<Subtasks onNavigate={handleNavigate} />} />
          <Route path="dependencies" element={<Dependencies onNavigate={handleNavigate} />} />
          <Route path="task-assignment" element={<TaskAssignment onNavigate={handleNavigate} />} />
          <Route path="timeline" element={<Timeline onNavigate={handleNavigate} />} />
          <Route path="analytics" element={<Analytics onNavigate={handleNavigate} />} />
          <Route path="reports" element={<Reports onNavigate={handleNavigate} />} />
          <Route path="uploaded-images" element={<UploadedImages onNavigate={handleNavigate} />} />
          <Route path="project/:id" element={<ProjectEdit onNavigate={handleNavigate} />} />
        </Routes>
      </Suspense>
      <Outlet />
    </div>
  );
}

export default VLSMLayout;