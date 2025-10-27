import React from 'react';

interface FeatureItem {
  name: string;
}

interface SubModule {
  name: string;
  features: FeatureItem[];
}

interface MainModule {
  name: string;
  color: {
    dark: string;
    medium: string;
    light: string;
  };
  subModules: SubModule[];
}

const hrmsData: MainModule[] = [
  {
    name: "Employee Management",
    color: {
      dark: "bg-blue-800",
      medium: "bg-blue-500",
      light: "bg-blue-200"
    },
    subModules: [
      {
        name: "Employee Profile",
        features: [
          { name: "Personal Details" },
          { name: "Job Profile" },
          { name: "Wage Details" },
          { name: "Documents" },
          { name: "Employment History" }
        ]
      },
      {
        name: "Onboarding Module",
        features: [
          { name: "Pre-Onboarding Forms" },
          { name: "Document Check" },
          { name: "Workflow" },
          { name: "Training Schedules" }
        ]
      },
      {
        name: "Offboarding Module",
        features: [
          { name: "Clearance Checklist" },
          { name: "Exit Interviews" },
          { name: "Final Settlement" }
        ]
      },
      {
        name: "Digital Document Repository",
        features: [
          { name: "Employee Contracts" },
          { name: "Past Performance Letters" },
          { name: "Experience Letters" }
        ]
      },
      {
        name: "ID Card Management",
        features: [
          { name: "Generate ID Cards" },
          { name: "Print & Reprint ID Cards" }
        ]
      }
    ]
  },
  {
    name: "Attendance & Time Tracking",
    color: {
      dark: "bg-green-800",
      medium: "bg-green-500",
      light: "bg-green-200"
    },
    subModules: [
      {
        name: "Attendance Dashboard",
        features: [
          { name: "Monthly Calendar" },
          { name: "Holidays" },
          { name: "Leave Records" }
        ]
      },
      {
        name: "Punch-In/Out",
        features: [
          { name: "Biometric Integration" },
          { name: "Mobile App Punch-In" }
        ]
      },
      {
        name: "Shift Management",
        features: [
          { name: "Create/Edit Shifts" },
          { name: "Shift Assignment" }
        ]
      },
      {
        name: "Geo-fencing & Geo-tracking",
        features: [
          { name: "Real-Time Location" },
          { name: "Location Logs" }
        ]
      },
      {
        name: "Overtime Tracking",
        features: [
          { name: "OT Hours" },
          { name: "Auto OT Calculation" }
        ]
      }
    ]
  },
  {
    name: "Payroll & Compliance",
    color: {
      dark: "bg-yellow-700",
      medium: "bg-yellow-500",
      light: "bg-yellow-200"
    },
    subModules: [
      {
        name: "Run Payroll",
        features: [
          { name: "Salary" },
          { name: "Allowances" },
          { name: "Deductions" }
        ]
      },
      {
        name: "Statutory Compliance",
        features: [
          { name: "PF/ESI" },
          { name: "Form 16" },
          { name: "Tax Reports" }
        ]
      },
      {
        name: "Loan & Advance Management",
        features: [
          { name: "Employee Loan Applications" },
          { name: "Approvals" }
        ]
      },
      {
        name: "Bonus/Incentive Management",
        features: [
          { name: "Performance Bonuses" },
          { name: "Commission Rules" }
        ]
      }
    ]
  },
  {
    name: "Recruitment & Talent Acquisition",
    color: {
      dark: "bg-orange-800",
      medium: "bg-orange-500",
      light: "bg-orange-200"
    },
    subModules: [
      {
        name: "Job Openings",
        features: [
          { name: "Career Page" },
          { name: "Internal Jobs" }
        ]
      },
      {
        name: "Applicant Tracking",
        features: [
          { name: "Candidate Profiles" },
          { name: "Resume Screening" }
        ]
      },
      {
        name: "Interview Scheduling",
        features: [
          { name: "Calendar" },
          { name: "Technical Test Forms" }
        ]
      }
    ]
  },
  {
    name: "Performance & L&D",
    color: {
      dark: "bg-purple-800",
      medium: "bg-purple-500",
      light: "bg-purple-200"
    },
    subModules: [
      {
        name: "Appraisal Management",
        features: [
          { name: "Performance Reviews" },
          { name: "Salary Revision Records" }
        ]
      },
      {
        name: "Learning Management System (LMS)",
        features: [
          { name: "Courses" },
          { name: "Progress Tracking" },
          { name: "Exams" }
        ]
      },
      {
        name: "Skill Gap Analysis",
        features: [
          { name: "Identify Missing Skills" },
          { name: "Upskilling Recommendations" }
        ]
      }
    ]
  },
  {
    name: "Meeting Management",
    color: {
      dark: "bg-indigo-800",
      medium: "bg-indigo-500",
      light: "bg-indigo-200"
    },
    subModules: [
      {
        name: "Meeting Dashboard",
        features: [
          { name: "Upcoming Meetings" },
          { name: "Recent Meetings" }
        ]
      },
      {
        name: "Agenda & Docs",
        features: [
          { name: "Attach Documents" },
          { name: "Share Notes" }
        ]
      },
      {
        name: "Calendar Integration",
        features: [
          { name: "Google/Outlook Calendar" }
        ]
      },
      {
        name: "Video Integration",
        features: [
          { name: "Zoom, Teams, Meet" }
        ]
      },
      {
        name: "Minutes of Meeting",
        features: [
          { name: "Decisions" },
          { name: "Action Items" },
          { name: "Attachments" }
        ]
      }
    ]
  },
  {
    name: "Visual Site & Location Management (VSLM)",
    color: {
      dark: "bg-teal-800",
      medium: "bg-teal-500",
      light: "bg-teal-200"
    },
    subModules: [
      {
        name: "Project/Site Gallery",
        features: [
          { name: "Upload Site Photos" },
          { name: "Project Tracking" }
        ]
      },
      {
        name: "Image Upload",
        features: [
          { name: "GPS-Tagged Photos" },
          { name: "Compliance Proof" }
        ]
      },
      {
        name: "Phase Tracking",
        features: [
          { name: "Milestone Completion" },
          { name: "Work Stages" }
        ]
      }
    ]
  },
  {
    name: "Task Management",
    color: {
      dark: "bg-slate-800",
      medium: "bg-slate-500",
      light: "bg-slate-200"
    },
    subModules: [
      {
        name: "Project Overview",
        features: [
          { name: "Project Plans" },
          { name: "Progress Status" }
        ]
      },
      {
        name: "Task & Sub-Tasks",
        features: [
          { name: "Assign" },
          { name: "Track" },
          { name: "Close Tasks" }
        ]
      },
      {
        name: "Task Status Tracking",
        features: [
          { name: "Pending" },
          { name: "In Progress" },
          { name: "Completed" }
        ]
      },
      {
        name: "Reports & Analytics",
        features: [
          { name: "Task Performance Reports" }
        ]
      }
    ]
  },
  {
    name: "Integrations",
    color: {
      dark: "bg-cyan-800",
      medium: "bg-cyan-500",
      light: "bg-cyan-200"
    },
    subModules: [
      {
        name: "HR Chatbot Configuration",
        features: []
      },
      {
        name: "API Access & Management",
        features: []
      }
    ]
  },
  {
    name: "Mobile App",
    color: {
      dark: "bg-red-800",
      medium: "bg-red-500",
      light: "bg-red-200"
    },
    subModules: [
      {
        name: "Employee Self-Service",
        features: []
      },
      {
        name: "Mobile Punch-In/Out",
        features: []
      },
      {
        name: "Push Notifications",
        features: []
      },
      {
        name: "Digital Payslip Access",
        features: []
      },
      {
        name: "Leave Application",
        features: []
      },
      {
        name: "Real-Time Chat with HR",
        features: []
      }
    ]
  }
];

const HRMSFlowchart = () => {
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-4">HRMS Information Architecture</h1>
          <p className="text-gray-600">Comprehensive flowchart showing the hierarchical structure of HRMS modules, sub-modules, and features</p>
        </div>

        <div className="space-y-8">
          {hrmsData.map((module, moduleIndex) => (
            <div key={moduleIndex} className="w-full">
              {/* Module Header */}
              <div className={`${module.color.dark} text-white p-4 rounded-lg mb-4 shadow-lg`}>
                <h2 className="text-white">{module.name}</h2>
              </div>

              {/* Sub-modules and Features Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ml-8">
                {module.subModules.map((subModule, subIndex) => (
                  <div key={subIndex} className="space-y-3">
                    {/* Sub-module */}
                    <div className={`${module.color.medium} text-black p-3 rounded-md shadow-md border-l-4 border-gray-400`}>
                      <h3 className="text-black">{subModule.name}</h3>
                    </div>

                    {/* Features */}
                    {subModule.features.length > 0 && (
                      <div className="ml-6 space-y-2">
                        {subModule.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className={`${module.color.light} text-black p-2 rounded text-sm shadow-sm border-l-2 border-gray-300`}
                          >
                            <span className="text-black">{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Separator between modules */}
              {moduleIndex < hrmsData.length - 1 && (
                <div className="border-b border-gray-300 mt-8"></div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-800 rounded"></div>
              <span className="text-sm">Main Modules (Dark Background)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Sub-Modules (Medium Shade)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-200 rounded"></div>
              <span className="text-sm">Features (Light Shade)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSFlowchart;