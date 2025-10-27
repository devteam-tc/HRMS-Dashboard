import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Edit, Image, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const projectData = {
  id: '1',
  name: 'Downtown Office Complex',
  client: 'Alpha Construction Ltd.',
  location: 'New York, NY',
  address: '123 Downtown Ave, New York, NY 10001',
  status: 'ongoing',
  progress: 75,
  startDate: '2024-01-15',
  endDate: '2024-06-30',
  manager: 'John Doe',
  budget: 2500000,
  spent: 1875000,
  team: [
    { name: 'John Doe', role: 'Project Manager', email: 'john.doe@company.com' },
    { name: 'Alice Johnson', role: 'Site Engineer', email: 'alice.johnson@company.com' },
    { name: 'Bob Smith', role: 'Safety Officer', email: 'bob.smith@company.com' },
    { name: 'Carol Davis', role: 'Quality Inspector', email: 'carol.davis@company.com' }
  ],
  description: 'A modern 15-story office complex featuring sustainable design elements, state-of-the-art facilities, and LEED Gold certification targets.',
  milestones: [
    { id: 1, title: 'Foundation Work', date: '2024-02-15', status: 'completed', progress: 100 },
    { id: 2, title: 'Structural Framework', date: '2024-03-30', status: 'completed', progress: 100 },
    { id: 3, title: 'Exterior Cladding', date: '2024-05-15', status: 'in-progress', progress: 80 },
    { id: 4, title: 'Interior Fit-out', date: '2024-06-01', status: 'pending', progress: 0 },
    { id: 5, title: 'Final Inspection', date: '2024-06-30', status: 'pending', progress: 0 }
  ],
  recentVisits: [
    { id: 1, date: '2024-01-18', visitor: 'John Doe', purpose: 'Weekly inspection', notes: 'Foundation work progressing well, no issues found.' },
    { id: 2, date: '2024-01-16', visitor: 'Alice Johnson', purpose: 'Quality check', notes: 'Concrete pour quality meets specifications.' },
    { id: 3, date: '2024-01-14', visitor: 'Bob Smith', purpose: 'Safety audit', notes: 'All safety protocols being followed.' }
  ]
};

const progressData = [
  { month: 'Jan', planned: 20, actual: 18 },
  { month: 'Feb', planned: 35, actual: 32 },
  { month: 'Mar', planned: 50, actual: 48 },
  { month: 'Apr', planned: 65, actual: 62 },
  { month: 'May', planned: 80, actual: 75 },
  { month: 'Jun', planned: 100, actual: 75 }
];

const budgetData = [
  { name: 'Materials', value: 40, amount: 1000000, color: '#05A7CC' },
  { name: 'Labor', value: 35, amount: 875000, color: '#4CAF50' },
  { name: 'Equipment', value: 15, amount: 375000, color: '#FFC107' },
  { name: 'Other', value: 10, amount: 250000, color: '#EF5226' }
];

export const ProjectDetails = ({ projectId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      case 'in-progress':
        return 'bg-[#05A7CC] text-white';
      case 'pending':
        return 'bg-[#666666] text-white';
      case 'ongoing':
        return 'bg-[#05A7CC] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getMilestoneIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#4CAF50]" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-[#05A7CC]" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-[#666666]" />;
      default:
        return <Clock className="w-5 h-5 text-[#666666]" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'visits', label: 'Site Visits', icon: '🏗️' }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('all-projects')}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#333333]">{projectData.name}</h1>
                <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(projectData.status)}`}>
                  {projectData.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>
              <p className="text-[#666666]">{projectData.client} • {projectData.location}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => onNavigate('uploaded-images', { projectId })}
              className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Image className="w-5 h-5" />
              <span className="font-medium">View Images</span>
            </button>
            <button 
              onClick={() => onNavigate('project-edit', projectId)}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Edit className="w-5 h-5" />
              <span className="font-medium">Edit Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="neu-small p-3 rounded-2xl inline-block mb-4">
            <TrendingUp className="w-8 h-8 text-[#05A7CC]" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">{projectData.progress}%</div>
          <div className="text-[#666666]">Completion</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="neu-small p-3 rounded-2xl inline-block mb-4">
            <DollarSign className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">${(projectData.spent / 1000000).toFixed(1)}M</div>
          <div className="text-[#666666]">Spent of ${(projectData.budget / 1000000).toFixed(1)}M</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="neu-small p-3 rounded-2xl inline-block mb-4">
            <Calendar className="w-8 h-8 text-[#9C27B0]" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">
            {Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-[#666666]">Days Remaining</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="neu-small p-3 rounded-2xl inline-block mb-4">
            <Users className="w-8 h-8 text-[#FF9800]" />
          </div>
          <div className="text-3xl font-bold text-[#333333] mb-2">{projectData.team.length}</div>
          <div className="text-[#666666]">Team Members</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card p-2 rounded-3xl">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'neu-primary text-white'
                  : 'text-[#666666] hover:text-[#333333]'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Project Description */}
              <div className="neu-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#333333] mb-6">Project Overview</h3>
                <div className="neu-card-inset p-6 rounded-2xl mb-6">
                  <p className="text-[#666666] leading-relaxed">{projectData.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <MapPin className="w-5 h-5 text-[#05A7CC]" />
                      <span className="font-medium text-[#333333]">Site Address</span>
                    </div>
                    <p className="text-[#666666]">{projectData.address}</p>
                  </div>
                  <div className="neu-small p-4 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="w-5 h-5 text-[#05A7CC]" />
                      <span className="font-medium text-[#333333]">Project Duration</span>
                    </div>
                    <p className="text-[#666666]">
                      {new Date(projectData.startDate).toLocaleDateString()} - {new Date(projectData.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="neu-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#333333] mb-6">Progress Tracking</h3>
                <div className="neu-card-inset p-4 rounded-2xl">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
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
                        formatter={(value) => [`${value}%`, 'Progress']} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="planned" 
                        stroke="#05A7CC" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Planned"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#4CAF50" 
                        strokeWidth={3}
                        name="Actual"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab === 'timeline' && (
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Project Milestones</h3>
              <div className="space-y-6">
                {projectData.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="neu-small p-6 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="neu-card-inset p-3 rounded-xl">
                        {getMilestoneIcon(milestone.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-[#333333]">{milestone.title}</h4>
                          <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(milestone.status)}`}>
                            {milestone.status.replace('-', ' ').toUpperCase()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-[#666666]" />
                            <span className="text-[#666666]">{new Date(milestone.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-[#666666]">Progress: {milestone.progress}%</div>
                        </div>
                        <div className="neu-card-inset rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8] transition-all duration-500"
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Project Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.team.map((member, index) => (
                  <div key={index} className="neu-small p-6 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white text-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-bold text-[#333333]">{member.name}</h4>
                        <p className="text-[#666666] mb-1">{member.role}</p>
                        <p className="text-sm text-[#999999]">{member.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'visits' && (
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Recent Site Visits</h3>
              <div className="space-y-4">
                {projectData.recentVisits.map((visit) => (
                  <div key={visit.id} className="neu-small p-6 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white">
                          {visit.visitor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-[#333333]">{visit.visitor}</h4>
                          <span className="text-sm text-[#666666]">{new Date(visit.date).toLocaleDateString()}</span>
                        </div>
                        <div className="neu-card-inset px-3 py-1 rounded-xl inline-block mb-3">
                          <span className="text-sm font-medium text-[#05A7CC]">{visit.purpose}</span>
                        </div>
                        <p className="text-[#666666]">{visit.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Budget Breakdown */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Budget Breakdown</h3>
            <div className="neu-card-inset p-4 rounded-2xl mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ECF0F3',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff'
                    }}
                    formatter={(value, name) => [`$${budgetData.find(d => d.name === name)?.amount?.toLocaleString()}`, name]} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {budgetData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-[#666666]">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#333333]">${(item.amount / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Site Location</h3>
            <div className="neu-card-inset h-48 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#666666] mx-auto mb-3" />
                <p className="text-[#666666]">Interactive Map</p>
                <p className="text-sm text-[#999999]">{projectData.location}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('site-visit-log', projectId)}
                className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Log Site Visit</span>
                </div>
              </button>
              <button 
                onClick={() => onNavigate('uploaded-images-upload', { projectId })}
                className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <Image className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Upload Images</span>
                </div>
              </button>
              <button 
                onClick={() => onNavigate('project-timeline', projectId)}
                className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">View Timeline</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};