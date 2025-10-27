import React from 'react';
import { MapPin, Image, Calendar, BarChart3, FileText, Users, CheckCircle, TrendingUp } from 'lucide-react';

export const VSLMSummary = ({ onNavigate }) => {
  const vslmPages = [
    {
      id: 'all-projects',
      title: 'All Projects (Grid View)',
      description: 'Visual grid display of all construction projects with status, progress, and key metrics',
      icon: TrendingUp,
      color: 'neu-primary',
      features: ['Project grid cards', 'Status filtering', 'Progress indicators', 'Budget overview', 'Team member preview']
    },
    {
      id: 'all-projects-list',
      title: 'All Projects (List View)',
      description: 'Detailed table view with sortable columns and comprehensive project information',
      icon: FileText,
      color: 'neu-gradient',
      features: ['Sortable table columns', 'Advanced filtering', 'Budget tracking', 'Manager assignments', 'Quick actions']
    },
    {
      id: 'project-details',
      title: 'Project Details',
      description: 'Comprehensive project overview with timeline, team, budget breakdown, and progress charts',
      icon: MapPin,
      color: 'neu-primary',
      features: ['Project overview', 'Progress charts', 'Team management', 'Milestone tracking', 'Budget visualization']
    },
    {
      id: 'uploaded-images',
      title: 'Uploaded Images Gallery',
      description: 'Visual gallery of all project images with filtering, tagging, and preview options',
      icon: Image,
      color: 'neu-secondary',
      features: ['Grid/List views', 'Tag-based filtering', 'Project association', 'Bulk operations', 'Image metadata']
    },
    {
      id: 'uploaded-images-upload',
      title: 'Image Upload Interface',
      description: 'Drag-and-drop upload with tagging, project association, and metadata management',
      icon: Image,
      color: 'neu-gradient',
      features: ['Drag & drop upload', 'Tag management', 'Project selection', 'Upload progress', 'Batch processing']
    },
    {
      id: 'uploaded-images-single',
      title: 'Single Image View',
      description: 'Detailed image view with comments, metadata, tagging, and download options',
      icon: Image,
      color: 'neu-primary',
      features: ['Large image preview', 'Comment system', 'Technical metadata', 'People tagging', 'Related images']
    },
    {
      id: 'project-timeline',
      title: 'Project Timeline (Gantt)',
      description: 'Interactive Gantt chart with timeline view, milestones, and progress tracking',
      icon: Calendar,
      color: 'neu-secondary',
      features: ['Gantt chart view', 'Timeline visualization', 'Milestone markers', 'Phase tracking', 'Zoom controls']
    },
    {
      id: 'site-visit-log',
      title: 'Site Visit Log',
      description: 'Comprehensive log of all site visits with findings, documentation, and follow-ups',
      icon: MapPin,
      color: 'neu-gradient',
      features: ['Visit logging', 'Findings tracking', 'Photo attachments', 'Weather conditions', 'Follow-up scheduling']
    },
    {
      id: 'vslm-analytics',
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics with KPIs, charts, and performance metrics for all projects',
      icon: BarChart3,
      color: 'neu-primary',
      features: ['KPI dashboard', 'Project status charts', 'Budget analysis', 'Quality metrics', 'Performance trends']
    },
    {
      id: 'project-reports',
      title: 'Project Reports',
      description: 'Generate and export detailed project reports in multiple formats with scheduling',
      icon: FileText,
      color: 'neu-secondary',
      features: ['Report templates', 'Custom report builder', 'Multiple formats', 'Scheduled reports', 'Export options']
    },
    {
      id: 'project-edit',
      title: 'Project Edit Interface',
      description: 'Comprehensive project editing with team management, milestones, and configuration',
      icon: MapPin,
      color: 'neu-gradient',
      features: ['Project configuration', 'Team assignment', 'Milestone management', 'Budget settings', 'Status updates']
    },
    {
      id: 'project-activity-feed',
      title: 'Project Activity Feed',
      description: 'Real-time activity timeline showing all project changes, updates, and interactions',
      icon: Users,
      color: 'neu-primary',
      features: ['Real-time updates', 'Activity timeline', 'User interactions', 'Change tracking', 'Filtering options']
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl text-center">
        <h1 className="text-4xl font-bold text-[#333333] mb-4">🏗️ VSLM Module Complete!</h1>
        <p className="text-[#666666] text-lg max-w-3xl mx-auto">
          Visual Site & Location Management module with 12 comprehensive screens covering all aspects 
          of construction project management in beautiful neumorphic design.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">12</div>
          <div className="text-[#666666]">Screens Created</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">100%</div>
          <div className="text-[#666666]">JSX Components</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">60+</div>
          <div className="text-[#666666]">Features Built</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#FF9800] mb-2">✓</div>
          <div className="text-[#666666]">Neumorphic Design</div>
        </div>
      </div>

      {/* All Pages Overview */}
      <div className="neu-card p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-[#333333] mb-6">All VSLM Screens</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vslmPages.map((page) => {
            const Icon = page.icon;
            return (
              <div key={page.id} className="neu-small p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
                <div className="flex items-start space-x-4">
                  <div className={`${page.color} p-4 rounded-2xl flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#333333]">{page.title}</h3>
                      <button 
                        onClick={() => onNavigate(page.id)}
                        className="neu-button px-4 py-2 rounded-xl text-sm text-[#05A7CC] hover:text-[#048ba8]"
                      >
                        View
                      </button>
                    </div>
                    <p className="text-[#666666] mb-3">{page.description}</p>
                    <div className="space-y-1">
                      {page.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                          <span className="text-sm text-[#666666]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">🏗️ Project Management</h3>
          <div className="space-y-3">
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Visual Project Tracking</div>
              <div className="text-sm text-[#666666]">Grid and list views with progress indicators</div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Timeline Management</div>
              <div className="text-sm text-[#666666]">Gantt charts and milestone tracking</div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Team Collaboration</div>
              <div className="text-sm text-[#666666]">Team assignment and activity feeds</div>
            </div>
          </div>
        </div>

        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">📸 Visual Documentation</h3>
          <div className="space-y-3">
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Image Gallery</div>
              <div className="text-sm text-[#666666]">Organized photo management with tagging</div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Upload Interface</div>
              <div className="text-sm text-[#666666]">Drag-and-drop with metadata management</div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Site Visit Logging</div>
              <div className="text-sm text-[#666666]">Comprehensive visit documentation</div>
            </div>
          </div>
        </div>

        <div className="neu-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-[#333333] mb-6">📊 Analytics & Reports</h3>
          <div className="space-y-3">
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Performance Analytics</div>
              <div className="text-sm text-[#666666]">KPI dashboards and trend analysis</div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Custom Reports</div>
              <div className="text-sm text-[#666666]">Flexible report builder with multiple formats</div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <div className="font-medium text-[#333333]">Real-time Updates</div>
              <div className="text-sm text-[#666666]">Activity feeds and change tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Statistics */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Module Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="neu-small w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-[#05A7CC]" />
            </div>
            <div className="text-2xl font-bold text-[#333333] mb-2">6 Projects</div>
            <div className="text-[#666666]">Active construction sites managed</div>
          </div>
          
          <div className="text-center">
            <div className="neu-small w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Image className="w-10 h-10 text-[#4CAF50]" />
            </div>
            <div className="text-2xl font-bold text-[#333333] mb-2">160+ Images</div>
            <div className="text-[#666666]">Visual documentation captured</div>
          </div>
          
          <div className="text-center">
            <div className="neu-small w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-[#9C27B0]" />
            </div>
            <div className="text-2xl font-bold text-[#333333] mb-2">$20M+</div>
            <div className="text-[#666666]">Total project value tracked</div>
          </div>
        </div>
      </div>

      {/* Navigation Helper */}
      <div className="neu-card p-8 rounded-3xl text-center">
        <h3 className="text-xl font-bold text-[#333333] mb-4">🧭 Quick Navigation</h3>
        <p className="text-[#666666] mb-6">Explore the complete VSLM module through the sidebar or use these quick links</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'all-projects', label: 'Projects', icon: MapPin },
            { id: 'uploaded-images', label: 'Images', icon: Image },
            { id: 'vslm-analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'project-reports', label: 'Reports', icon: FileText }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="neu-button px-6 py-4 rounded-2xl flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
              >
                <Icon className="w-8 h-8 text-[#05A7CC]" />
                <span className="font-medium text-[#333333]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Implementation Highlights */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-[#333333] mb-6">Implementation Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#333333] flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span>Technical Features</span>
            </h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Pure JSX components (no TypeScript)</li>
              <li>• Recharts integration for data visualization</li>
              <li>• Responsive design for all screen sizes</li>
              <li>• State management with React hooks</li>
              <li>• Consistent neumorphic styling throughout</li>
              <li>• Advanced filtering and search functionality</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#333333] flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#05A7CC]" />
              <span>Business Features</span>
            </h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Complete project lifecycle management</li>
              <li>• Visual progress tracking and reporting</li>
              <li>• Team collaboration and communication</li>
              <li>• Document and image management</li>
              <li>• Quality and safety compliance tracking</li>
              <li>• Budget monitoring and analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};