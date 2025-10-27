import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, Eye, Printer, Share2, Star, User, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const ApplicantResume = ({ applicantId, onNavigate }) => {
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'raw'

  // Mock applicant data
  const applicant = {
    id: applicantId || 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    appliedFor: 'Senior Software Engineer',
    resume: 'alice_johnson_resume.pdf',
    coverLetter: 'alice_johnson_cover.pdf',
    resumeData: {
      personalInfo: {
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        linkedIn: 'linkedin.com/in/alicejohnson',
        github: 'github.com/alicejohnson',
        website: 'alicejohnson.dev'
      },
      summary: 'Experienced Senior Software Engineer with 6+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable web applications serving millions of users. Passionate about mentoring junior developers and implementing best practices.',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Solutions Inc.',
          location: 'New York, NY',
          duration: 'Jan 2020 - Present (4 years)',
          achievements: [
            'Led development of microservices architecture serving 1M+ users daily',
            'Reduced system latency by 40% through performance optimization',
            'Mentored 5 junior developers and implemented code review processes',
            'Architected CI/CD pipelines reducing deployment time by 60%',
            'Collaborated with product team to deliver 15+ features on schedule'
          ]
        },
        {
          title: 'Software Engineer',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          duration: 'Mar 2018 - Dec 2019 (1 year 10 months)',
          achievements: [
            'Developed full-stack web applications using React and Node.js',
            'Built REST APIs handling 100k+ requests per day',
            'Implemented responsive UI components improving user engagement by 25%',
            'Integrated third-party payment systems and analytics tools',
            'Participated in agile development and sprint planning'
          ]
        },
        {
          title: 'Software Engineering Intern',
          company: 'Google',
          location: 'Mountain View, CA',
          duration: 'Jun 2017 - Aug 2017 (3 months)',
          achievements: [
            'Worked on Search team to optimize query performance',
            'Contributed to reducing search latency by 15%',
            'Implemented A/B testing framework for feature rollouts',
            'Collaborated with senior engineers on large-scale systems'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Science in Computer Science',
          institution: 'Stanford University',
          location: 'Stanford, CA',
          duration: '2016 - 2018',
          gpa: '3.8/4.0',
          relevant: 'Machine Learning, Distributed Systems, Software Engineering'
        },
        {
          degree: 'Bachelor of Science in Computer Engineering',
          institution: 'UC Berkeley',
          location: 'Berkeley, CA',
          duration: '2012 - 2016',
          gpa: '3.9/4.0',
          relevant: 'Data Structures, Algorithms, Computer Networks'
        }
      ],
      skills: {
        'Programming Languages': ['JavaScript', 'Python', 'Java', 'TypeScript', 'Go'],
        'Frontend': ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'Sass'],
        'Backend': ['Node.js', 'Express', 'Django', 'Spring Boot', 'GraphQL'],
        'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
        'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
        'Tools': ['Git', 'Jira', 'Slack', 'Figma', 'Postman']
      },
      certifications: [
        'AWS Certified Solutions Architect - Associate (2023)',
        'Certified Kubernetes Administrator (2022)',
        'Google Cloud Professional Developer (2021)'
      ]
    }
  };

  const handleDownload = () => {
    console.log('Downloading resume:', applicant.resume);
    // Download logic here
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    console.log('Sharing resume');
    // Share logic here
  };

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('applicant-details', { applicantId: applicant.id })}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Resume Preview</h1>
            <p className="text-[#666666]">{applicant.name} - {applicant.appliedFor}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 neu-card p-2 rounded-2xl">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                viewMode === 'preview' ? 'neu-primary text-white' : 'text-[#666666]'
              }`}
            >
              <Eye size={16} className="mr-2 inline" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                viewMode === 'raw' ? 'neu-primary text-white' : 'text-[#666666]'
              }`}
            >
              <FileText size={16} className="mr-2 inline" />
              Raw
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            <Printer size={20} />
            <span>Print</span>
          </button>
          <button
            onClick={handleShare}
            className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
          <button
            onClick={handleDownload}
            className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
          >
            <Download size={20} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Resume Content */}
      {viewMode === 'preview' ? (
        <div className="neu-card p-12 rounded-3xl max-w-4xl mx-auto bg-white">
          {/* Header */}
          <div className="text-center mb-8 pb-8 border-b-2 border-[#E8EBEF]">
            <h1 className="text-4xl font-bold text-[#333333] mb-4">{applicant.resumeData.personalInfo.name}</h1>
            <div className="flex items-center justify-center space-x-6 text-[#666666] mb-4">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>{applicant.resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>{applicant.resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{applicant.resumeData.personalInfo.location}</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-[#05A7CC]">
              <a href={`https://${applicant.resumeData.personalInfo.linkedIn}`} className="hover:underline flex items-center">
                LinkedIn <ExternalLink size={14} className="ml-1" />
              </a>
              <a href={`https://${applicant.resumeData.personalInfo.github}`} className="hover:underline flex items-center">
                GitHub <ExternalLink size={14} className="ml-1" />
              </a>
              <a href={`https://${applicant.resumeData.personalInfo.website}`} className="hover:underline flex items-center">
                Portfolio <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b border-[#E8EBEF] pb-2">Professional Summary</h2>
            <p className="text-[#333333] leading-relaxed">{applicant.resumeData.summary}</p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b border-[#E8EBEF] pb-2">Professional Experience</h2>
            <div className="space-y-6">
              {applicant.resumeData.experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#333333]">{job.title}</h3>
                      <p className="text-[#EF5226] font-medium">{job.company} • {job.location}</p>
                    </div>
                    <span className="text-[#666666] font-medium">{job.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#05A7CC] mr-3 mt-2">•</span>
                        <span className="text-[#333333]">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b border-[#E8EBEF] pb-2">Education</h2>
            <div className="space-y-4">
              {applicant.resumeData.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-[#333333]">{edu.degree}</h3>
                      <p className="text-[#EF5226] font-medium">{edu.institution} • {edu.location}</p>
                      <p className="text-[#666666]">Relevant Coursework: {edu.relevant}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#666666] font-medium">{edu.duration}</span>
                      <p className="text-[#333333] font-medium">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b border-[#E8EBEF] pb-2">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(applicant.resumeData.skills).map(([category, skills], index) => (
                <div key={index}>
                  <h3 className="font-bold text-[#333333] mb-2">{category}:</h3>
                  <p className="text-[#666666]">{skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-4 border-b border-[#E8EBEF] pb-2">Certifications</h2>
            <ul className="space-y-2">
              {applicant.resumeData.certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#05A7CC] mr-3 mt-2">•</span>
                  <span className="text-[#333333]">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Raw File View */
        <div className="neu-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#333333]">Document Information</h3>
            <span className="text-[#666666] text-sm">File: {applicant.resume}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-[#333333] mb-4">File Properties</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666666]">File Name:</span>
                  <span className="text-[#333333]">{applicant.resume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">File Size:</span>
                  <span className="text-[#333333]">2.4 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Format:</span>
                  <span className="text-[#333333]">PDF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Pages:</span>
                  <span className="text-[#333333]">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Uploaded:</span>
                  <span className="text-[#333333]">2024-01-18 10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Last Modified:</span>
                  <span className="text-[#333333]">2024-01-15 3:45 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#333333] mb-4">Document Analysis</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Word Count:</span>
                  <span className="text-[#333333]">847 words</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Keywords Matched:</span>
                  <span className="text-green-600]">18/25 (72%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">ATS Score:</span>
                  <span className="text-[#05A7CC]">8.5/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Readability:</span>
                  <span className="text-[#333333]">Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Contact Info:</span>
                  <span className="text-green-600">Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Formatting:</span>
                  <span className="text-green-600">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Viewer Placeholder */}
          <div className="mt-8">
            <h4 className="font-bold text-[#333333] mb-4">Document Preview</h4>
            <div className="neu-card-inset p-12 rounded-3xl text-center">
              <FileText size={48} className="text-[#666666] mx-auto mb-4" />
              <p className="text-[#666666] text-lg mb-2">PDF Document</p>
              <p className="text-[#666666] text-sm">{applicant.resume}</p>
              <button
                onClick={handleDownload}
                className="neu-primary px-6 py-3 rounded-2xl mt-6 flex items-center space-x-2 mx-auto hover:shadow-lg transition-all duration-200"
              >
                <Download size={20} />
                <span>Download to View</span>
              </button>
            </div>
          </div>

          {/* Cover Letter */}
          {applicant.coverLetter && (
            <div className="mt-8">
              <h4 className="font-bold text-[#333333] mb-4">Cover Letter</h4>
              <div className="neu-small p-6 rounded-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText size={20} className="text-[#05A7CC] mr-3" />
                    <span className="text-[#333333]">{applicant.coverLetter}</span>
                  </div>
                  <button className="neu-button p-2 rounded-xl hover:shadow-md transition-all duration-200">
                    <Download size={16} className="text-[#666666]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};