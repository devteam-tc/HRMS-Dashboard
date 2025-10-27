import React, { useState } from 'react';
import { Search, Filter, User, MapPin, Calendar, FileText, Eye, Download, Star, ArrowRight, MoreVertical, Mail, Phone } from 'lucide-react';

export const ApplicantsList = ({ jobId, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const applicants = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 123-4567',
      appliedFor: 'Senior Software Engineer',
      appliedDate: '2024-01-18',
      experience: '6 years',
      location: 'New York, NY',
      stage: 'Application',
      status: 'Under Review',
      source: 'LinkedIn',
      resume: 'alice_johnson_resume.pdf',
      coverLetter: 'alice_johnson_cover.pdf',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      education: 'MS Computer Science - Stanford University',
      rating: 4.5,
      notes: 'Strong technical background with excellent communication skills',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      appliedFor: 'Senior Software Engineer',
      appliedDate: '2024-01-17',
      experience: '8 years',
      location: 'San Francisco, CA',
      stage: 'Shortlisted',
      status: 'Shortlisted',
      source: 'Company Website',
      resume: 'michael_chen_resume.pdf',
      coverLetter: 'michael_chen_cover.pdf',
      skills: ['Java', 'Spring', 'AWS', 'Docker'],
      education: 'BS Computer Engineering - UC Berkeley',
      rating: 5.0,
      notes: 'Exceptional candidate with leadership experience',
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 345-6789',
      appliedFor: 'UX Designer',
      appliedDate: '2024-01-16',
      experience: '5 years',
      location: 'New York, NY',
      stage: 'Interview',
      status: 'Interview Scheduled',
      source: 'Referral',
      resume: 'sarah_williams_resume.pdf',
      coverLetter: 'sarah_williams_cover.pdf',
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
      education: 'BFA Design - Parsons School of Design',
      rating: 4.8,
      notes: 'Great portfolio demonstrating user-centered design approach',
      lastActivity: '3 hours ago'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      appliedFor: 'Product Manager',
      appliedDate: '2024-01-15',
      experience: '7 years',
      location: 'Austin, TX',
      stage: 'Offer',
      status: 'Offer Extended',
      source: 'Indeed',
      resume: 'david_rodriguez_resume.pdf',
      coverLetter: 'david_rodriguez_cover.pdf',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Stakeholder Management'],
      education: 'MBA - Wharton School',
      rating: 4.9,
      notes: 'Strong product sense with proven track record of successful launches',
      lastActivity: '4 hours ago'
    },
    {
      id: 5,
      name: 'Emma Thompson',
      email: 'emma.thompson@email.com',
      phone: '+1 (555) 567-8901',
      appliedFor: 'Marketing Specialist',
      appliedDate: '2024-01-14',
      experience: '3 years',
      location: 'Remote',
      stage: 'Application',
      status: 'Rejected',
      source: 'Glassdoor',
      resume: 'emma_thompson_resume.pdf',
      coverLetter: '',
      skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Social Media'],
      education: 'BA Marketing - University of Texas',
      rating: 3.2,
      notes: 'Limited experience in B2B marketing which is required for this role',
      lastActivity: '1 week ago'
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 678-9012',
      appliedFor: 'DevOps Engineer',
      appliedDate: '2024-01-13',
      experience: '6 years',
      location: 'Seattle, WA',
      stage: 'Interview',
      status: 'Technical Interview',
      source: 'Stack Overflow',
      resume: 'james_wilson_resume.pdf',
      coverLetter: 'james_wilson_cover.pdf',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins'],
      education: 'BS Information Systems - University of Washington',
      rating: 4.6,
      notes: 'Solid DevOps experience with cloud infrastructure expertise',
      lastActivity: '2 days ago'
    }
  ];

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Application': return 'text-blue-600 bg-blue-50';
      case 'Shortlisted': return 'text-green-600 bg-green-50';
      case 'Interview': return 'text-orange-600 bg-orange-50';
      case 'Offer': return 'text-purple-600 bg-purple-50';
      case 'Hired': return 'text-green-700 bg-green-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return 'text-yellow-600 bg-yellow-50';
      case 'Shortlisted': return 'text-green-600 bg-green-50';
      case 'Interview Scheduled': return 'text-blue-600 bg-blue-50';
      case 'Technical Interview': return 'text-blue-700 bg-blue-100';
      case 'Offer Extended': return 'text-purple-600 bg-purple-50';
      case 'Hired': return 'text-green-700 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.appliedFor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || applicant.appliedFor === filterRole;
    const matchesStage = filterStage === 'all' || applicant.stage === filterStage;
    const matchesSource = filterSource === 'all' || applicant.source === filterSource;
    const matchesStatus = filterStatus === 'all' || applicant.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStage && matchesSource && matchesStatus;
  });

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Applicants</h1>
          <p className="text-[#666666]">Manage and review job applications</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('applicant-progress', {})}
            className="neu-button px-6 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            Progress Tracker
          </button>
          <button className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all duration-200 hover:shadow-lg">
            <Download size={20} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
            <input
              type="text"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neu-input w-full pl-12 pr-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Roles</option>
            <option value="Senior Software Engineer">Senior Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UX Designer">UX Designer</option>
            <option value="Marketing Specialist">Marketing Specialist</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>

          {/* Stage Filter */}
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Stages</option>
            <option value="Application">Application</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
          </select>

          {/* Source Filter */}
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Sources</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Company Website">Company Website</option>
            <option value="Referral">Referral</option>
            <option value="Indeed">Indeed</option>
            <option value="Glassdoor">Glassdoor</option>
            <option value="Stack Overflow">Stack Overflow</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="neu-input px-4 py-3 text-[#333333] focus:outline-none appearance-none"
          >
            <option value="all">All Status</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="Offer Extended">Offer Extended</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Total Applicants</p>
              <p className="text-2xl font-bold text-[#333333]">{applicants.length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <User size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Under Review</p>
              <p className="text-2xl font-bold text-[#333333]">{applicants.filter(a => a.status === 'Under Review').length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <FileText size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Shortlisted</p>
              <p className="text-2xl font-bold text-[#333333]">{applicants.filter(a => a.status === 'Shortlisted').length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Star size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">In Interview</p>
              <p className="text-2xl font-bold text-[#333333]">{applicants.filter(a => a.stage === 'Interview').length}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Calendar size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-6">
        {filteredApplicants.map((applicant) => (
          <div key={applicant.id} className="neu-card p-8 rounded-3xl">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="neu-small w-16 h-16 rounded-3xl flex items-center justify-center">
                  <User size={32} className="text-[#666666]" />
                </div>

                {/* Applicant Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-1">{applicant.name}</h3>
                      <p className="text-[#EF5226] font-medium mb-2">{applicant.appliedFor}</p>
                      <div className="flex items-center space-x-4 text-sm text-[#666666] mb-3">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          <span>{applicant.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>Applied {applicant.appliedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>{applicant.experience} experience</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#666666]">
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          <span>{applicant.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" />
                          <span>{applicant.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < Math.floor(applicant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                          <span className="text-sm text-[#666666] ml-2">{applicant.rating}</span>
                        </div>
                        <p className="text-xs text-[#666666]">Last activity: {applicant.lastActivity}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="neu-small px-3 py-1 rounded-2xl text-sm text-[#333333]"
                        >
                          {skill}
                        </span>
                      ))}
                      {applicant.skills.length > 4 && (
                        <span className="neu-small px-3 py-1 rounded-2xl text-sm text-[#666666]">
                          +{applicant.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status and Stage */}
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(applicant.stage)}`}>
                      {applicant.stage}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                    <span className="text-xs text-[#666666] bg-[#E8EBEF] px-3 py-1 rounded-full">
                      Source: {applicant.source}
                    </span>
                  </div>

                  {/* Notes */}
                  {applicant.notes && (
                    <p className="text-sm text-[#666666] bg-[#F5F8FB] p-3 rounded-2xl">
                      "{applicant.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('applicant-details', { applicantId: applicant.id })}
                  className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
                  title="View Details"
                >
                  <Eye size={20} className="text-[#05A7CC]" />
                </button>
                
                <button
                  onClick={() => onNavigate('applicant-resume', { applicantId: applicant.id })}
                  className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200"
                  title="View Resume"
                >
                  <FileText size={20} className="text-[#EF5226]" />
                </button>

                <button
                  onClick={() => onNavigate('applicant-actions', { applicantId: applicant.id })}
                  className="neu-secondary px-4 py-3 rounded-2xl flex items-center space-x-2 text-white hover:shadow-lg transition-all duration-200"
                >
                  <span>Actions</span>
                  <ArrowRight size={16} />
                </button>

                <button className="neu-button p-3 rounded-2xl hover:shadow-md transition-all duration-200">
                  <MoreVertical size={20} className="text-[#666666]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplicants.length === 0 && (
        <div className="neu-card p-12 rounded-3xl text-center">
          <User size={48} className="text-[#666666] mx-auto mb-4" />
          <p className="text-[#666666] text-lg">No applicants found</p>
          <p className="text-[#666666] text-sm">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};