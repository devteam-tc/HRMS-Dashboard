import React, { useState } from 'react';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, User, Building, Clock, Download, Upload, FileText, Trash2, Eye, History, Award, Target } from 'lucide-react';

export const EmployeeDetails = ({ employeeId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('personal');

  // Mock employee data
  const employee = {
    id: 1,
    name: 'John Smith',
    designation: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'Active',
    joiningDate: '2022-03-15',
    probationEnd: '2022-09-15',
    location: 'New York Office',
    manager: 'Sarah Wilson',
    employeeId: 'EMP001',
    avatar: '/placeholder-avatar.jpg',
    personalInfo: {
      phone: '+1 234-567-8901',
      email: 'john.smith@company.com',
      address: '123 Main Street, Apt 4B, New York, NY 10001',
      dateOfBirth: '1990-05-15',
      nationality: 'American',
      maritalStatus: 'Married',
      emergencyContact: {
        name: 'Jane Smith',
        relationship: 'Spouse',
        phone: '+1 234-567-8902'
      },
      idNumbers: {
        ssn: '***-**-1234',
        drivingLicense: 'NY123456789',
        passport: 'US123456789'
      }
    },
    jobInfo: {
      salary: '$85,000',
      workType: 'Full-time',
      team: 'Frontend Development',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git'],
      reportingTo: 'Sarah Wilson',
      directReports: ['Alice Johnson', 'Bob Davis'],
      workLocation: 'Hybrid',
      shiftTime: '9:00 AM - 6:00 PM'
    },
    documents: [
      { id: 1, name: 'Resume.pdf', type: 'Resume', uploadDate: '2022-03-10', size: '2.5 MB' },
      { id: 2, name: 'Contract.pdf', type: 'Contract', uploadDate: '2022-03-15', size: '1.2 MB' },
      { id: 3, name: 'ID_Proof.pdf', type: 'ID Proof', uploadDate: '2022-03-12', size: '800 KB' },
      { id: 4, name: 'Background_Check.pdf', type: 'Background Check', uploadDate: '2022-03-14', size: '1.8 MB' },
      { id: 5, name: 'Tax_Forms.pdf', type: 'Tax Forms', uploadDate: '2022-03-16', size: '1.1 MB' }
    ],
    history: [
      {
        id: 1,
        date: '2023-06-01',
        type: 'Promotion',
        description: 'Promoted to Senior Software Engineer',
        previousValue: 'Software Engineer',
        newValue: 'Senior Software Engineer',
        approvedBy: 'Sarah Wilson'
      },
      {
        id: 2,
        date: '2023-01-15',
        type: 'Salary Update',
        description: 'Annual salary increase',
        previousValue: '$75,000',
        newValue: '$85,000',
        approvedBy: 'HR Department'
      },
      {
        id: 3,
        date: '2022-09-15',
        type: 'Probation Complete',
        description: 'Successfully completed probation period',
        previousValue: 'Probationary',
        newValue: 'Confirmed',
        approvedBy: 'Sarah Wilson'
      },
      {
        id: 4,
        date: '2022-03-15',
        type: 'Joining',
        description: 'Joined as Software Engineer',
        previousValue: '-',
        newValue: 'Software Engineer',
        approvedBy: 'HR Department'
      }
    ]
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'job', label: 'Job Info', icon: Building },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'history', label: 'History', icon: History }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('employee-directory')}
              className="neu-button p-3 rounded-2xl hover:text-[#05A7CC] transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-[#333333] mb-2">Employee Details</h1>
              <p className="text-[#666666] text-lg">Complete employee information and records</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('add-employee', { mode: 'edit', employeeId: employee.id })}
              className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Edit size={20} />
              <span>Edit Employee</span>
            </button>
          </div>
        </div>

        {/* Employee Summary Card */}
        <div className="neu-small p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 neu-gradient rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-[#05A7CC]">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#333333] mb-1">{employee.name}</h2>
                <p className="text-lg text-[#666666] mb-2">{employee.designation}</p>
                <div className="flex items-center space-x-4 text-sm text-[#999999]">
                  <span className="flex items-center">
                    <Building size={14} className="mr-1" />
                    {employee.department}
                  </span>
                  <span className="flex items-center">
                    <User size={14} className="mr-1" />
                    {employee.employeeId}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Joined {new Date(employee.joiningDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                employee.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {employee.status}
              </span>
              <p className="text-sm text-[#666666] mt-2">Manager: {employee.manager}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex space-x-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all ${
                  activeTab === tab.id
                    ? 'neu-primary text-white'
                    : 'neu-button text-[#666666] hover:text-[#333333]'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="neu-card-inset p-6 rounded-2xl">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#333333] mb-4">Personal Information</h3>
              
              {/* Contact Information */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4 flex items-center">
                  <Phone size={18} className="mr-2 text-[#05A7CC]" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Phone</label>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-[#666666]" />
                      <span className="text-[#333333]">{employee.personalInfo.phone}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Email</label>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-[#666666]" />
                      <span className="text-[#333333]">{employee.personalInfo.email}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#666666] mb-2">Address</label>
                    <div className="flex items-start space-x-2">
                      <MapPin size={16} className="text-[#666666] mt-1" />
                      <span className="text-[#333333]">{employee.personalInfo.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4 flex items-center">
                  <User size={18} className="mr-2 text-[#EF5226]" />
                  Personal Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Date of Birth</label>
                    <p className="text-[#333333]">{new Date(employee.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Nationality</label>
                    <p className="text-[#333333]">{employee.personalInfo.nationality}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Marital Status</label>
                    <p className="text-[#333333]">{employee.personalInfo.maritalStatus}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Name</label>
                    <p className="text-[#333333]">{employee.personalInfo.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Relationship</label>
                    <p className="text-[#333333]">{employee.personalInfo.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Phone</label>
                    <p className="text-[#333333]">{employee.personalInfo.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>

              {/* ID Numbers */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4">Identification Numbers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">SSN</label>
                    <p className="text-[#333333]">{employee.personalInfo.idNumbers.ssn}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Driving License</label>
                    <p className="text-[#333333]">{employee.personalInfo.idNumbers.drivingLicense}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Passport</label>
                    <p className="text-[#333333]">{employee.personalInfo.idNumbers.passport}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'job' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#333333] mb-4">Job Information</h3>
              
              {/* Role Information */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4 flex items-center">
                  <Building size={18} className="mr-2 text-[#05A7CC]" />
                  Role Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Designation</label>
                    <p className="text-[#333333] font-medium">{employee.designation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Department</label>
                    <p className="text-[#333333]">{employee.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Team</label>
                    <p className="text-[#333333]">{employee.jobInfo.team}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Work Type</label>
                    <p className="text-[#333333]">{employee.jobInfo.workType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Work Location</label>
                    <p className="text-[#333333]">{employee.jobInfo.workLocation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Shift Time</label>
                    <p className="text-[#333333]">{employee.jobInfo.shiftTime}</p>
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4 flex items-center">
                  <Calendar size={18} className="mr-2 text-[#EF5226]" />
                  Employment Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Joining Date</label>
                    <p className="text-[#333333]">{new Date(employee.joiningDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Probation End</label>
                    <p className="text-[#333333]">{new Date(employee.probationEnd).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Reporting To</label>
                    <p className="text-[#333333]">{employee.jobInfo.reportingTo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-2">Salary</label>
                    <p className="text-[#333333] font-medium">{employee.jobInfo.salary}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {employee.jobInfo.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#05A7CC] text-white rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Reports */}
              <div className="neu-small p-6 rounded-2xl">
                <h4 className="font-bold text-[#333333] mb-4">Direct Reports</h4>
                <div className="space-y-2">
                  {employee.jobInfo.directReports.map((report, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <User size={16} className="text-[#666666]" />
                      <span className="text-[#333333]">{report}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#333333]">Documents</h3>
                <button className="neu-primary px-4 py-2 rounded-2xl flex items-center space-x-2">
                  <Upload size={16} />
                  <span>Upload Document</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {employee.documents.map((doc) => (
                  <div key={doc.id} className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 neu-gradient rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#05A7CC]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#333333]">{doc.name}</h4>
                          <p className="text-sm text-[#666666]">{doc.type}</p>
                          <p className="text-xs text-[#999999]">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="neu-button p-2 rounded-xl hover:text-[#05A7CC] transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="neu-button p-2 rounded-xl hover:text-[#4CAF50] transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="neu-button p-2 rounded-xl hover:text-[#dc2626] transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#333333] mb-4">Employment History</h3>
              
              <div className="space-y-4">
                {employee.history.map((item) => (
                  <div key={item.id} className="neu-small p-6 rounded-2xl">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          item.type === 'Promotion' ? 'neu-primary' :
                          item.type === 'Salary Update' ? 'neu-secondary' :
                          item.type === 'Probation Complete' ? 'bg-green-500' :
                          'neu-gradient'
                        }`}>
                          {item.type === 'Promotion' && <Award className="w-6 h-6 text-white" />}
                          {item.type === 'Salary Update' && <Target className="w-6 h-6 text-white" />}
                          {item.type === 'Probation Complete' && <Award className="w-6 h-6 text-white" />}
                          {item.type === 'Joining' && <User className="w-6 h-6 text-[#05A7CC]" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#333333] mb-1">{item.type}</h4>
                          <p className="text-[#666666] mb-2">{item.description}</p>
                          {item.previousValue !== '-' && (
                            <div className="text-sm">
                              <span className="text-[#999999]">From: </span>
                              <span className="text-[#333333]">{item.previousValue}</span>
                              <span className="text-[#999999] mx-2">→</span>
                              <span className="text-[#333333] font-medium">{item.newValue}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#333333]">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-[#666666]">by {item.approvedBy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};