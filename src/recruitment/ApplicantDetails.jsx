import React, { useState } from 'react';
import { ArrowLeft, Download, Star, Mail, Phone, MapPin, Calendar, User, FileText, ExternalLink, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';

export const ApplicantDetails = ({ applicantId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock applicant data
  const applicant = {
    id: applicantId || 1,
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
    portfolio: 'https://alicejohnson.dev',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Git'],
    education: [
      {
        degree: 'Master of Science in Computer Science',
        institution: 'Stanford University',
        year: '2018',
        gpa: '3.8/4.0'
      },
      {
        degree: 'Bachelor of Science in Computer Engineering',
        institution: 'UC Berkeley',
        year: '2016',
        gpa: '3.9/4.0'
      }
    ],
    workExperience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        duration: '2020 - Present',
        description: 'Led development of microservices architecture serving 1M+ users daily. Mentored junior developers and implemented CI/CD pipelines.'
      },
      {
        title: 'Software Engineer',
        company: 'StartupXYZ',
        duration: '2018 - 2020',
        description: 'Developed full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time.'
      },
      {
        title: 'Software Engineering Intern',
        company: 'Google',
        duration: 'Summer 2017',
        description: 'Worked on the Search team to optimize query performance. Contributed to reducing search latency by 15%.'
      }
    ],
    rating: 4.5,
    notes: [
      {
        id: 1,
        author: 'John Smith',
        date: '2024-01-18',
        content: 'Strong technical background with excellent communication skills. Impressive work experience at top-tier companies.',
        type: 'review'
      },
      {
        id: 2,
        author: 'Sarah Wilson',
        date: '2024-01-19',
        content: 'Resume shows consistent growth and leadership experience. Good fit for senior role requirements.',
        type: 'note'
      }
    ],
    interviews: [
      {
        id: 1,
        type: 'Phone Screening',
        interviewer: 'John Smith',
        date: '2024-01-20',
        status: 'Scheduled',
        notes: ''
      }
    ],
    personalInfo: {
      linkedIn: 'https://linkedin.com/in/alicejohnson',
      github: 'https://github.com/alicejohnson',
      website: 'https://alicejohnson.dev',
      availableFrom: '2024-02-15',
      salaryExpectation: '$110,000 - $130,000',
      workAuthorization: 'US Citizen',
      willingToRelocate: 'Yes'
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return 'text-yellow-600 bg-yellow-50';
      case 'Shortlisted': return 'text-green-600 bg-green-50';
      case 'Interview Scheduled': return 'text-blue-600 bg-blue-50';
      case 'Offer Extended': return 'text-purple-600 bg-purple-50';
      case 'Hired': return 'text-green-700 bg-green-100';
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
            onClick={() => onNavigate('applicants-list')}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div className="flex items-center space-x-6">
            <div className="neu-small w-16 h-16 rounded-3xl flex items-center justify-center">
              <User size={32} className="text-[#666666]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">{applicant.name}</h1>
              <div className="flex items-center space-x-4 text-[#666666]">
                <div className="flex items-center">
                  <Mail size={16} className="mr-1" />
                  <span>{applicant.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-1" />
                  <span>{applicant.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{applicant.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('applicant-actions', { applicantId: applicant.id })}
            className="neu-primary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
          >
            Take Action
          </button>
          <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#05A7CC] transition-all duration-200">
            <Download size={20} />
            <span>Download Resume</span>
          </button>
        </div>
      </div>

      {/* Application Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Applied For</p>
              <p className="text-lg font-bold text-[#333333]">{applicant.appliedFor}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <FileText size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Experience</p>
              <p className="text-lg font-bold text-[#333333]">{applicant.experience}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <User size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Applied Date</p>
              <p className="text-lg font-bold text-[#333333]">{applicant.appliedDate}</p>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Calendar size={24} className="text-[#EF5226]" />
            </div>
          </div>
        </div>

        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#666666] text-sm mb-1">Rating</p>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(applicant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-[#333333]">{applicant.rating}</span>
              </div>
            </div>
            <div className="neu-small p-4 rounded-2xl">
              <Star size={24} className="text-[#05A7CC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-[#333333] font-medium">Current Status:</span>
            <span className={`px-4 py-2 rounded-2xl text-sm font-medium ${getStatusColor(applicant.status)}`}>
              {applicant.status}
            </span>
            <span className="text-[#666666] text-sm">Source: {applicant.source}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('applicant-progress', { applicantId: applicant.id })}
              className="neu-button px-4 py-2 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
            >
              View Progress
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card p-2 rounded-3xl mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'notes', label: 'Notes & Reviews' },
            { id: 'interviews', label: 'Interviews' }
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
                <h3 className="text-xl font-bold text-[#333333] mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Email:</span>
                    <span className="text-[#333333]">{applicant.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Phone:</span>
                    <span className="text-[#333333]">{applicant.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Location:</span>
                    <span className="text-[#333333]">{applicant.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Available From:</span>
                    <span className="text-[#333333]">{applicant.personalInfo.availableFrom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Salary Expectation:</span>
                    <span className="text-[#333333]">{applicant.personalInfo.salaryExpectation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Work Authorization:</span>
                    <span className="text-[#333333]">{applicant.personalInfo.workAuthorization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Willing to Relocate:</span>
                    <span className="text-[#333333]">{applicant.personalInfo.willingToRelocate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#333333] mb-6">Online Presence</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">LinkedIn:</span>
                    <a href={applicant.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#05A7CC] hover:underline flex items-center">
                      View Profile <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">GitHub:</span>
                    <a href={applicant.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-[#05A7CC] hover:underline flex items-center">
                      View Profile <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Portfolio:</span>
                    <a href={applicant.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-[#05A7CC] hover:underline flex items-center">
                      View Website <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#333333] mb-6 mt-8">Documents</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('applicant-resume', { applicantId: applicant.id })}
                    className="neu-small w-full p-4 rounded-2xl flex items-center justify-between hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <FileText size={20} className="text-[#EF5226] mr-3" />
                      <span className="text-[#333333]">{applicant.resume}</span>
                    </div>
                    <Download size={16} className="text-[#666666]" />
                  </button>
                  {applicant.coverLetter && (
                    <button className="neu-small w-full p-4 rounded-2xl flex items-center justify-between hover:shadow-md transition-all duration-200">
                      <div className="flex items-center">
                        <FileText size={20} className="text-[#05A7CC] mr-3" />
                        <span className="text-[#333333]">{applicant.coverLetter}</span>
                      </div>
                      <Download size={16} className="text-[#666666]" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {applicant.skills.map((skill, index) => (
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

        {activeTab === 'experience' && (
          <div>
            <h3 className="text-xl font-bold text-[#333333] mb-6">Work Experience</h3>
            <div className="space-y-6">
              {applicant.workExperience.map((job, index) => (
                <div key={index} className="neu-small p-6 rounded-3xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#333333] mb-1">{job.title}</h4>
                      <p className="text-[#EF5226] font-medium mb-2">{job.company}</p>
                      <p className="text-[#666666] text-sm">{job.duration}</p>
                    </div>
                  </div>
                  <p className="text-[#333333] leading-relaxed">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div>
            <h3 className="text-xl font-bold text-[#333333] mb-6">Education</h3>
            <div className="space-y-6">
              {applicant.education.map((edu, index) => (
                <div key={index} className="neu-small p-6 rounded-3xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-[#333333] mb-1">{edu.degree}</h4>
                      <p className="text-[#EF5226] font-medium mb-2">{edu.institution}</p>
                      <div className="flex items-center space-x-4 text-[#666666] text-sm">
                        <span>Graduated: {edu.year}</span>
                        <span>•</span>
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Notes & Reviews</h3>
              <button className="neu-primary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200">
                Add Note
              </button>
            </div>
            
            <div className="space-y-4">
              {applicant.notes.map((note) => (
                <div key={note.id} className="neu-small p-6 rounded-3xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="neu-small w-10 h-10 rounded-2xl flex items-center justify-center">
                        <User size={20} className="text-[#666666]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#333333]">{note.author}</p>
                        <p className="text-sm text-[#666666]">{note.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      note.type === 'review' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50'
                    }`}>
                      {note.type}
                    </span>
                  </div>
                  <p className="text-[#333333] leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Interview History</h3>
              <button
                onClick={() => onNavigate('new-interview', { applicantId: applicant.id })}
                className="neu-primary px-6 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
              >
                Schedule Interview
              </button>
            </div>
            
            <div className="space-y-4">
              {applicant.interviews.map((interview) => (
                <div key={interview.id} className="neu-small p-6 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#333333] mb-1">{interview.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-[#666666]">
                        <span>Interviewer: {interview.interviewer}</span>
                        <span>•</span>
                        <span>Date: {interview.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        interview.status === 'Scheduled' ? 'text-blue-600 bg-blue-50' : 
                        interview.status === 'Completed' ? 'text-green-600 bg-green-50' : 
                        'text-gray-600 bg-gray-50'
                      }`}>
                        {interview.status}
                      </span>
                      <button
                        onClick={() => onNavigate('interview-details', { interviewId: interview.id })}
                        className="neu-button p-2 rounded-xl hover:shadow-md transition-all duration-200"
                      >
                        <ExternalLink size={16} className="text-[#05A7CC]" />
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