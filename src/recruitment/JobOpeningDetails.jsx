import React, { useState } from 'react';
import { ArrowLeft, Edit, Share2, Archive, Trash2, MapPin, Calendar, Clock, DollarSign, Users, Building2, Star, Eye, MessageSquare, User } from 'lucide-react';

export const JobOpeningDetails = ({ jobId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock job data
  const jobDetails = {
    id: jobId || 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'New York',
    jobType: 'Full-time',
    workModel: 'Hybrid',
    experienceLevel: 'Senior',
    openings: 3,
    applications: 24,
    status: 'Open',
    postedDate: '2024-01-15',
    expiryDate: '2024-03-15',
    hiringManager: 'John Smith',
    salaryRange: '$90,000 - $130,000',
    priority: 'High',
    description: `We are looking for a Senior Software Engineer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining high-quality software solutions that drive our business forward.

Key Responsibilities:
• Design and develop scalable web applications using modern technologies
• Collaborate with cross-functional teams to define and implement new features
• Write clean, maintainable, and well-documented code
• Participate in code reviews and provide constructive feedback
• Mentor junior developers and contribute to team growth
• Troubleshoot and debug complex technical issues
• Stay up-to-date with industry trends and best practices`,
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in software development',
      'Proficiency in JavaScript, React, Node.js',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Strong understanding of database design and SQL',
      'Experience with version control systems (Git)',
      'Excellent problem-solving and communication skills',
      'Experience with Agile development methodologies'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Git'],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible working hours and remote work options',
      'Professional development budget',
      '401(k) with company matching',
      'Unlimited PTO policy',
      'Modern office with free snacks and drinks',
      'Team building events and company retreats'
    ]
  };

  const recentApplications = [
    {
      id: 1,
      candidateName: 'Alice Johnson',
      appliedDate: '2024-01-18',
      status: 'Under Review',
      experience: '6 years',
      location: 'New York',
      resume: 'alice_johnson_resume.pdf'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      appliedDate: '2024-01-17',
      status: 'Shortlisted',
      experience: '8 years',
      location: 'San Francisco',
      resume: 'michael_chen_resume.pdf'
    },
    {
      id: 3,
      candidateName: 'Sarah Williams',
      appliedDate: '2024-01-16',
      status: 'Interview Scheduled',
      experience: '5 years',
      location: 'New York',
      resume: 'sarah_williams_resume.pdf'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Closed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return 'text-yellow-600 bg-yellow-50';
      case 'Shortlisted': return 'text-blue-600 bg-blue-50';
      case 'Interview Scheduled': return 'text-green-600 bg-green-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('job-openings-list')}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">{jobDetails.title}</h1>
            <div className="flex items-center space-x-4 text-[#666666]">
              <div className="flex items-center">
                <Building2 size={16} className="mr-1" />
                <span>{jobDetails.department}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{jobDetails.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{jobDetails.jobType}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('edit-job-opening', { jobId: jobDetails.id })}
            className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#EF5226] transition-all duration-200"
          >
            <Edit size={20} />
            <span>Edit</span>
          </button>
          <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#05A7CC] transition-all duration-200">
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Job Status and Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(jobDetails.status)}`}>
                {jobDetails.status}
              </span>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Star size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Applications</p>
              <p className="text-2xl font-bold text-[#333333]">{jobDetails.applications}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Users size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Openings</p>
              <p className="text-2xl font-bold text-[#333333]">{jobDetails.openings}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Building2 size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Days Posted</p>
              <p className="text-2xl font-bold text-[#333333]">3</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Calendar size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card p-2 rounded-3xl mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'description', label: 'Job Description' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'applications', label: 'Recent Applications' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'neu-primary text-white'
                  : 'text-[#666666] hover:text-[#333333]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="neu-card p-8 rounded-3xl">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Department:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Location:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Job Type:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.jobType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Work Model:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.workModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Experience Level:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.experienceLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Salary Range:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.salaryRange}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-4">Hiring Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Hiring Manager:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.hiringManager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Posted Date:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.postedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Expiry Date:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Priority:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Available Positions:</span>
                    <span className="text-[#333333] font-medium">{jobDetails.openings}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                {jobDetails.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="neu-small px-4 py-2 rounded-2xl text-[#333333] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'description' && (
          <div>
            <h3 className="text-xl font-bold text-[#333333] mb-6">Job Description</h3>
            <div className="prose prose-gray max-w-none">
              <div className="text-[#333333] leading-relaxed whitespace-pre-line">
                {jobDetails.description}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Requirements</h3>
              <ul className="space-y-3">
                {jobDetails.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-[#EF5226] rounded-full"></div>
                    </div>
                    <span className="text-[#333333]">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Benefits</h3>
              <ul className="space-y-3">
                {jobDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-[#05A7CC] rounded-full"></div>
                    </div>
                    <span className="text-[#333333]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Recent Applications</h3>
              <button
                onClick={() => onNavigate('applicants-list', { jobId: jobDetails.id })}
                className="neu-secondary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
              >
                View All Applications
              </button>
            </div>
            
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="neu-small p-6 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="neu-small w-12 h-12 rounded-2xl flex items-center justify-center">
                        <User size={24} className="text-[#666666]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#333333] mb-1">{application.candidateName}</h4>
                        <div className="flex items-center space-x-4 text-sm text-[#666666]">
                          <span>{application.experience} experience</span>
                          <span>•</span>
                          <span>{application.location}</span>
                          <span>•</span>
                          <span>Applied on {application.appliedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                      <button
                        onClick={() => onNavigate('applicant-details', { applicantId: application.id })}
                        className="neu-button p-2 rounded-xl hover:shadow-md transition-all duration-200"
                      >
                        <Eye size={16} className="text-[#05A7CC]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};