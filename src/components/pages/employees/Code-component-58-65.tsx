import React, { useState } from 'react';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, User, Building, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const EmployeeProfile = ({ employeeId, onNavigate }) => {
  // Mock comprehensive employee data
  const employee = {
    id: 1,
    name: 'John Smith',
    designation: 'Senior Software Engineer',
    department: 'Engineering',
    team: 'Frontend Development',
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
      emergencyContact: {
        name: 'Jane Smith',
        relationship: 'Spouse',
        phone: '+1 234-567-8902'
      }
    },

    jobInfo: {
      salary: '$85,000',
      workType: 'Full-time',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git'],
      reportingTo: 'Sarah Wilson',
      directReports: ['Alice Johnson', 'Bob Davis'],
      workLocation: 'Hybrid',
      shiftTime: '9:00 AM - 6:00 PM'
    },

    performance: {
      currentRating: 4.5,
      lastReviewDate: '2023-12-15',
      goals: [
        { title: 'Complete React Certification', progress: 80, deadline: '2024-03-01' },
        { title: 'Lead New Project Implementation', progress: 60, deadline: '2024-04-15' },
        { title: 'Mentor 2 Junior Developers', progress: 100, deadline: '2024-02-01' }
      ]
    },

    attendance: {
      thisMonth: {
        present: 18,
        absent: 2,
        late: 1,
        overtime: 5
      },
      yearToDate: {
        totalDays: 240,
        present: 220,
        absent: 8,
        leaves: 12
      }
    },

    recentActivities: [
      { date: '2024-01-20', activity: 'Completed Q4 Performance Review', type: 'achievement' },
      { date: '2024-01-18', activity: 'Started mentoring Alice Johnson', type: 'responsibility' },
      { date: '2024-01-15', activity: 'Submitted React project proposal', type: 'project' },
      { date: '2024-01-12', activity: 'Attended leadership training', type: 'training' },
      { date: '2024-01-10', activity: 'Received client appreciation', type: 'achievement' }
    ]
  };

  const performanceData = [
    { month: 'Jul', rating: 4.2, productivity: 85 },
    { month: 'Aug', rating: 4.3, productivity: 88 },
    { month: 'Sep', rating: 4.4, productivity: 90 },
    { month: 'Oct', rating: 4.3, productivity: 87 },
    { month: 'Nov', rating: 4.5, productivity: 92 },
    { month: 'Dec', rating: 4.5, productivity: 94 }
  ];

  const attendanceData = [
    { month: 'Jul', present: 22, absent: 1, late: 0 },
    { month: 'Aug', present: 21, absent: 2, late: 1 },
    { month: 'Sep', present: 23, absent: 0, late: 0 },
    { month: 'Oct', present: 22, absent: 1, late: 1 },
    { month: 'Nov', present: 20, absent: 3, late: 2 },
    { month: 'Dec', present: 18, absent: 2, late: 1 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'achievement': return <Award className="w-4 h-4 text-[#4CAF50]" />;
      case 'responsibility': return <User className="w-4 h-4 text-[#05A7CC]" />;
      case 'project': return <Building className="w-4 h-4 text-[#EF5226]" />;
      case 'training': return <CheckCircle className="w-4 h-4 text-[#9C27B0]" />;
      default: return <Clock className="w-4 h-4 text-[#666666]" />;
    }
  };

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
              <h1 className="text-4xl font-bold text-[#333333] mb-2">Employee Profile</h1>
              <p className="text-[#666666] text-lg">Comprehensive employee information and performance overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate?.('employee-details', { employeeId: employee.id })}
              className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 hover:text-[#05A7CC] transition-colors"
            >
              <Edit size={20} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Employee Header Card */}
        <div className="neu-small p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 neu-gradient rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-[#05A7CC]">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#333333] mb-2">{employee.name}</h2>
                <p className="text-xl text-[#666666] mb-2">{employee.designation}</p>
                <div className="flex items-center space-x-6 text-sm text-[#999999]">
                  <span className="flex items-center">
                    <Building size={14} className="mr-1" />
                    {employee.department} • {employee.team}
                  </span>
                  <span className="flex items-center">
                    <User size={14} className="mr-1" />
                    {employee.employeeId}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {Math.floor((Date.now() - new Date(employee.joiningDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years at company
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="flex items-center text-sm text-[#666666]">
                    <Phone size={14} className="mr-1" />
                    {employee.personalInfo.phone}
                  </span>
                  <span className="flex items-center text-sm text-[#666666]">
                    <Mail size={14} className="mr-1" />
                    {employee.personalInfo.email}
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
              <p className="text-sm text-[#666666] mt-2">Reports to: {employee.manager}</p>
              <p className="text-sm text-[#666666]">Location: {employee.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="w-16 h-16 neu-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">{employee.performance.currentRating}/5</div>
          <div className="text-sm text-[#666666]">Performance Rating</div>
          <div className="text-xs text-[#4CAF50] mt-1">Last reviewed: {new Date(employee.performance.lastReviewDate).toLocaleDateString()}</div>
        </div>

        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="w-16 h-16 neu-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">{employee.attendance.thisMonth.present}</div>
          <div className="text-sm text-[#666666]">Days Present (This Month)</div>
          <div className="text-xs text-[#05A7CC] mt-1">{Math.round((employee.attendance.thisMonth.present / (employee.attendance.thisMonth.present + employee.attendance.thisMonth.absent)) * 100)}% Attendance</div>
        </div>

        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="w-16 h-16 bg-[#4CAF50] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">{employee.performance.goals.filter(g => g.progress === 100).length}</div>
          <div className="text-sm text-[#666666]">Goals Completed</div>
          <div className="text-xs text-[#4CAF50] mt-1">Out of {employee.performance.goals.length} total goals</div>
        </div>

        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="w-16 h-16 bg-[#9C27B0] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">{employee.jobInfo.directReports.length}</div>
          <div className="text-sm text-[#666666]">Direct Reports</div>
          <div className="text-xs text-[#666666] mt-1">Team leadership role</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trends */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Performance Trends</h3>
            <p className="text-[#666666]">Monthly performance rating and productivity</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#EF5226" 
                  strokeWidth={3}
                  dot={{ fill: '#EF5226', strokeWidth: 2, r: 6 }}
                  name="Rating"
                />
                <Line 
                  type="monotone" 
                  dataKey="productivity" 
                  stroke="#05A7CC" 
                  strokeWidth={3}
                  dot={{ fill: '#05A7CC', strokeWidth: 2, r: 6 }}
                  name="Productivity %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Attendance Overview</h3>
            <p className="text-[#666666]">Monthly attendance pattern</p>
          </div>
          <div className="neu-card-inset p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d9e6" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ECF0F3',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                  }}
                />
                <Bar dataKey="present" fill="#4CAF50" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="absent" fill="#EF5226" radius={[4, 4, 0, 0]} name="Absent" />
                <Bar dataKey="late" fill="#FFC107" radius={[4, 4, 0, 0]} name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Goals */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Current Goals</h3>
            <p className="text-[#666666]">Active performance objectives</p>
          </div>
          
          <div className="space-y-4">
            {employee.performance.goals.map((goal, index) => (
              <div key={index} className="neu-small p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#333333] text-sm">{goal.title}</h4>
                  <span className="text-xs text-[#666666]">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#E8EBEF] rounded-full mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.progress === 100 ? 'bg-[#4CAF50]' : 'bg-[#05A7CC]'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#999999]">
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  {goal.progress === 100 && (
                    <span className="text-[#4CAF50] flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Skills & Expertise</h3>
            <p className="text-[#666666]">Technical competencies</p>
          </div>
          
          <div className="space-y-3">
            {employee.jobInfo.skills.map((skill, index) => (
              <div key={index} className="neu-small p-3 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#333333]">{skill}</span>
                  <span className="px-2 py-1 bg-[#05A7CC] text-white rounded-full text-xs">
                    Expert
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full neu-button p-3 rounded-2xl mt-4 hover:text-[#EF5226] transition-colors">
            Update Skills
          </button>
        </div>

        {/* Recent Activities */}
        <div className="neu-card p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] mb-2">Recent Activities</h3>
            <p className="text-[#666666]">Latest achievements and activities</p>
          </div>
          
          <div className="space-y-3">
            {employee.recentActivities.map((activity, index) => (
              <div key={index} className="neu-small p-4 rounded-2xl">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#333333]">{activity.activity}</p>
                    <p className="text-xs text-[#666666]">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full neu-button p-3 rounded-2xl mt-4 hover:text-[#05A7CC] transition-colors">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};