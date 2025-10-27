import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Edit3, BarChart3, Clock, Target, Zap, User } from 'lucide-react';

export const TaskAssignment = ({ onNavigate }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'workload'

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Frontend Lead',
      avatar: 'JD',
      email: 'john@company.com',
      department: 'Development',
      capacity: 40, // hours per week
      currentLoad: 32,
      skills: ['React', 'TypeScript', 'CSS', 'UI/UX'],
      taskCount: { active: 5, pending: 2, completed: 18 },
      performance: 95,
      availability: 'available',
      color: '#EF5226'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'UI/UX Designer',
      avatar: 'SW',
      email: 'sarah@company.com',
      department: 'Design',
      capacity: 40,
      currentLoad: 28,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      taskCount: { active: 4, pending: 1, completed: 22 },
      performance: 98,
      availability: 'available',
      color: '#05A7CC'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Backend Developer',
      avatar: 'MJ',
      email: 'mike@company.com',
      department: 'Development',
      capacity: 40,
      currentLoad: 38,
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
      taskCount: { active: 6, pending: 3, completed: 15 },
      performance: 88,
      availability: 'busy',
      color: '#4CAF50'
    },
    {
      id: 4,
      name: 'Emma Brown',
      role: 'QA Engineer',
      avatar: 'EB',
      email: 'emma@company.com',
      department: 'Quality Assurance',
      capacity: 40,
      currentLoad: 25,
      skills: ['Testing', 'Selenium', 'Jest', 'Cypress'],
      taskCount: { active: 3, pending: 1, completed: 20 },
      performance: 92,
      availability: 'available',
      color: '#9C27B0'
    },
    {
      id: 5,
      name: 'David Lee',
      role: 'DevOps Engineer',
      avatar: 'DL',
      email: 'david@company.com',
      department: 'Infrastructure',
      capacity: 40,
      currentLoad: 35,
      skills: ['AWS', 'Kubernetes', 'Docker', 'Jenkins'],
      taskCount: { active: 4, pending: 2, completed: 12 },
      performance: 94,
      availability: 'busy',
      color: '#FFC107'
    },
    {
      id: 6,
      name: 'Lisa Chen',
      role: 'Mobile Developer',
      avatar: 'LC',
      email: 'lisa@company.com',
      department: 'Development',
      capacity: 40,
      currentLoad: 20,
      skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
      taskCount: { active: 2, pending: 1, completed: 8 },
      performance: 90,
      availability: 'available',
      color: '#E91E63'
    }
  ];

  const unassignedTasks = [
    {
      id: 'TASK-009',
      title: 'API Rate Limiting Implementation',
      priority: 'high',
      estimatedHours: 12,
      skills: ['Backend', 'API', 'Security'],
      dueDate: '2024-03-30'
    },
    {
      id: 'TASK-010',
      title: 'Mobile App Push Notifications',
      priority: 'medium',
      estimatedHours: 8,
      skills: ['Mobile', 'Firebase', 'React Native'],
      dueDate: '2024-04-05'
    },
    {
      id: 'TASK-011',
      title: 'User Dashboard Analytics',
      priority: 'medium',
      estimatedHours: 16,
      skills: ['Frontend', 'Charts', 'React'],
      dueDate: '2024-04-10'
    },
    {
      id: 'TASK-012',
      title: 'Database Performance Optimization',
      priority: 'high',
      estimatedHours: 20,
      skills: ['Database', 'SQL', 'Performance'],
      dueDate: '2024-03-28'
    }
  ];

  const getAvailabilityColor = (availability) => {
    const colors = {
      'available': 'bg-green-100 text-green-800',
      'busy': 'bg-yellow-100 text-yellow-800',
      'unavailable': 'bg-red-100 text-red-800'
    };
    return colors[availability] || 'bg-gray-100 text-gray-800';
  };

  const getWorkloadColor = (currentLoad, capacity) => {
    const percentage = (currentLoad / capacity) * 100;
    if (percentage >= 95) return '#EF5226';
    if (percentage >= 80) return '#FFC107';
    if (percentage >= 60) return '#05A7CC';
    return '#4CAF50';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#EF5226',
      'medium': '#FFC107',
      'low': '#4CAF50'
    };
    return colors[priority] || '#666666';
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, memberId) => {
    e.preventDefault();
    if (draggedTask) {
      console.log(`Assigning task ${draggedTask.id} to member ${memberId}`);
      setDraggedTask(null);
    }
  };

  const getSkillMatch = (taskSkills, memberSkills) => {
    const matches = taskSkills.filter(skill => 
      memberSkills.some(memberSkill => 
        memberSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(memberSkill.toLowerCase())
      )
    );
    return (matches.length / taskSkills.length) * 100;
  };

  const TeamMemberCard = ({ member, isSelected, onClick }) => {
    const workloadPercentage = (member.currentLoad / member.capacity) * 100;
    const workloadColor = getWorkloadColor(member.currentLoad, member.capacity);

    return (
      <div
        onClick={() => onClick(member)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, member.id)}
        className={`neu-card p-6 rounded-2xl cursor-pointer transition-all duration-300 group ${
          isSelected ? 'ring-2 ring-[#EF5226] shadow-xl' : 'hover:shadow-lg'
        }`}
      >
        {/* Member Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div 
              className="neu-small w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform"
              style={{ backgroundColor: member.color }}
            >
              {member.avatar}
            </div>
            <div>
              <h3 className="font-bold text-[#333333] group-hover:text-[#EF5226] transition-colors">
                {member.name}
              </h3>
              <p className="text-[#666666] text-sm">{member.role}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(member.availability)}`}>
            {member.availability}
          </span>
        </div>

        {/* Workload Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#666666] text-sm">Workload</span>
            <span className="font-bold text-sm" style={{ color: workloadColor }}>
              {member.currentLoad}h / {member.capacity}h
            </span>
          </div>
          <div className="neu-card-inset rounded-lg p-1">
            <div 
              className="h-3 rounded-lg transition-all duration-500"
              style={{ 
                width: `${workloadPercentage}%`,
                backgroundColor: workloadColor
              }}
            ></div>
          </div>
          <div className="text-xs text-[#666666] mt-1">{Math.round(workloadPercentage)}% capacity</div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="neu-small p-2 rounded-xl text-center">
            <div className="text-lg font-bold text-[#05A7CC]">{member.taskCount.active}</div>
            <div className="text-xs text-[#666666]">Active</div>
          </div>
          <div className="neu-small p-2 rounded-xl text-center">
            <div className="text-lg font-bold text-[#FFC107]">{member.taskCount.pending}</div>
            <div className="text-xs text-[#666666]">Pending</div>
          </div>
          <div className="neu-small p-2 rounded-xl text-center">
            <div className="text-lg font-bold text-[#4CAF50]">{member.taskCount.completed}</div>
            <div className="text-xs text-[#666666]">Done</div>
          </div>
        </div>

        {/* Performance Score */}
        <div className="neu-small p-3 rounded-xl text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap size={16} className="text-[#EF5226] mr-1" />
            <span className="font-bold text-[#EF5226]">{member.performance}%</span>
          </div>
          <div className="text-xs text-[#666666]">Performance Score</div>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <div className="text-xs text-[#666666] mb-2">Top Skills</div>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2 py-1 bg-[#E8EBEF] text-[#666666] rounded text-xs">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="px-2 py-1 bg-[#E8EBEF] text-[#666666] rounded text-xs">
                +{member.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Drop Zone Indicator */}
        <div className="mt-4 neu-card-inset p-3 rounded-xl border-2 border-dashed border-[#E8EBEF] text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <User size={16} className="text-[#666666] mx-auto mb-1" />
          <p className="text-[#666666] text-xs">Drop tasks here to assign</p>
        </div>
      </div>
    );
  };

  const TaskCard = ({ task }) => {
    const skillMatch = selectedMember ? getSkillMatch(task.skills, selectedMember.skills) : 0;

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
        className="neu-card p-4 rounded-xl mb-4 cursor-move hover:shadow-lg transition-all duration-200 group"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-[#333333] text-sm mb-1 group-hover:text-[#EF5226] transition-colors">
              {task.title}
            </h4>
            <span className="text-xs text-[#666666] bg-[#E8EBEF] px-2 py-1 rounded">
              {task.id}
            </span>
          </div>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          ></div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#666666]">Estimate:</span>
            <span className="font-medium text-[#333333]">{task.estimatedHours}h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666666]">Due:</span>
            <span className="font-medium text-[#333333]">{task.dueDate}</span>
          </div>
          {selectedMember && (
            <div className="flex justify-between">
              <span className="text-[#666666]">Skill Match:</span>
              <span className={`font-medium ${skillMatch >= 70 ? 'text-[#4CAF50]' : skillMatch >= 40 ? 'text-[#FFC107]' : 'text-[#EF5226]'}`}>
                {Math.round(skillMatch)}%
              </span>
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="text-xs text-[#666666] mb-1">Required Skills</div>
          <div className="flex flex-wrap gap-1">
            {task.skills.map(skill => (
              <span 
                key={skill} 
                className={`px-2 py-1 rounded text-xs ${
                  selectedMember && selectedMember.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                    ? 'bg-[#4CAF50] text-white'
                    : 'bg-[#E8EBEF] text-[#666666]'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Layout: Grid with Drag & Drop Assignment
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Team Assignment</h1>
        <p className="text-[#666666]">Assign tasks to team members with workload management</p>
      </div>

      {/* Summary and Controls */}
      <div className="neu-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#EF5226] mb-1">{teamMembers.length}</div>
              <div className="text-[#666666] text-sm">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#05A7CC] mb-1">{unassignedTasks.length}</div>
              <div className="text-[#666666] text-sm">Unassigned Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#4CAF50] mb-1">
                {teamMembers.filter(m => m.availability === 'available').length}
              </div>
              <div className="text-[#666666] text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#333333] mb-1">
                {Math.round(teamMembers.reduce((sum, m) => sum + (m.currentLoad/m.capacity), 0) / teamMembers.length * 100)}%
              </div>
              <div className="text-[#666666] text-sm">Avg Utilization</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex neu-card-inset rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'neu-primary text-white shadow-md' 
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('workload')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'workload' 
                    ? 'neu-primary text-white shadow-md' 
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                Workload View
              </button>
            </div>
            <button 
              onClick={() => onNavigate('task-analytics')}
              className="neu-button px-6 py-3 rounded-xl flex items-center hover:text-[#EF5226] transition-colors"
            >
              <BarChart3 size={16} className="mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Team Members Grid */}
        <div className="lg:col-span-3">
          <div className="neu-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#333333] mb-6">Team Members</h2>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isSelected={selectedMember?.id === member.id}
                    onClick={setSelectedMember}
                  />
                ))}
              </div>
            ) : (
              /* Workload View */
              <div className="space-y-4">
                {teamMembers.map(member => {
                  const workloadPercentage = (member.currentLoad / member.capacity) * 100;
                  const workloadColor = getWorkloadColor(member.currentLoad, member.capacity);
                  
                  return (
                    <div key={member.id} className="neu-small p-4 rounded-xl hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div 
                            className="neu-small w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4"
                            style={{ backgroundColor: member.color }}
                          >
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-[#333333]">{member.name}</div>
                            <div className="text-[#666666] text-sm">{member.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(member.availability)}`}>
                            {member.availability}
                          </span>
                          <span className="text-sm font-bold" style={{ color: workloadColor }}>
                            {member.currentLoad}h / {member.capacity}h
                          </span>
                        </div>
                      </div>
                      <div className="neu-card-inset rounded-lg p-1">
                        <div 
                          className="h-4 rounded-lg transition-all duration-500"
                          style={{ 
                            width: `${workloadPercentage}%`,
                            backgroundColor: workloadColor
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#666666] mt-2">
                        <span>{Math.round(workloadPercentage)}% utilization</span>
                        <span>{member.capacity - member.currentLoad}h available</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Member Details */}
          {selectedMember && (
            <div className="neu-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Member Details</h3>
              <div className="space-y-4">
                <div className="neu-small p-3 rounded-xl text-center">
                  <div 
                    className="neu-small w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3"
                    style={{ backgroundColor: selectedMember.color }}
                  >
                    {selectedMember.avatar}
                  </div>
                  <div className="font-bold text-[#333333]">{selectedMember.name}</div>
                  <div className="text-[#666666] text-sm">{selectedMember.role}</div>
                  <div className="text-[#666666] text-xs mt-1">{selectedMember.department}</div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">All Skills</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedMember.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-[#EF5226] text-white rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="neu-small p-3 rounded-xl">
                  <div className="text-[#666666] text-sm">Contact</div>
                  <div className="text-[#333333] text-sm mt-1">{selectedMember.email}</div>
                </div>
              </div>
            </div>
          )}

          {/* Unassigned Tasks */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4 flex items-center">
              <Target size={18} className="mr-2 text-[#05A7CC]" />
              Unassigned Tasks
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {unassignedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
            <button 
              onClick={() => onNavigate('add-new-task')}
              className="w-full mt-4 neu-button py-3 rounded-xl flex items-center justify-center hover:text-[#EF5226] transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add New Task
            </button>
          </div>

          {/* Quick Stats */}
          <div className="neu-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Team Stats</h3>
            <div className="space-y-3">
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Overloaded</span>
                  <span className="font-bold text-[#EF5226]">
                    {teamMembers.filter(m => (m.currentLoad/m.capacity) > 0.9).length}
                  </span>
                </div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Underutilized</span>
                  <span className="font-bold text-[#4CAF50]">
                    {teamMembers.filter(m => (m.currentLoad/m.capacity) < 0.6).length}
                  </span>
                </div>
              </div>
              <div className="neu-small p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Avg Performance</span>
                  <span className="font-bold text-[#333333]">
                    {Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};