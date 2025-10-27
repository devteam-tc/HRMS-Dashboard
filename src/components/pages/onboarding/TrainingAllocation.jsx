import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Users, Play, CheckCircle, AlertCircle, Plus, Search, Filter } from 'lucide-react';

export const TrainingAllocation = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Software Engineer',
      department: 'Engineering',
      joinDate: '2024-01-15',
      status: 'Active',
      completedTrainings: 3,
      totalTrainings: 8,
      progress: 38
    },
    {
      id: 2,
      name: 'Bob Smith',
      position: 'Product Manager',
      department: 'Product',
      joinDate: '2024-01-20',
      status: 'Active',
      completedTrainings: 2,
      totalTrainings: 6,
      progress: 33
    },
    {
      id: 3,
      name: 'Carol Davis',
      position: 'UX Designer',
      department: 'Design',
      joinDate: '2024-01-25',
      status: 'Active',
      completedTrainings: 5,
      totalTrainings: 7,
      progress: 71
    }
  ];

  const [trainingPrograms, setTrainingPrograms] = useState([
    {
      id: 1,
      title: 'Company Overview & Culture',
      description: 'Introduction to company history, values, and culture',
      type: 'mandatory',
      category: 'general',
      duration: 120,
      format: 'video',
      difficulty: 'beginner',
      assignedTo: [1, 2, 3],
      completedBy: [3],
      deadline: '2024-01-20',
      instructor: 'HR Team',
      prerequisites: []
    },
    {
      id: 2,
      title: 'Security & Compliance Training',
      description: 'Data security, privacy policies, and compliance requirements',
      type: 'mandatory',
      category: 'security',
      duration: 90,
      format: 'interactive',
      difficulty: 'intermediate',
      assignedTo: [1, 2, 3],
      completedBy: [1, 3],
      deadline: '2024-01-22',
      instructor: 'Security Team',
      prerequisites: [1]
    },
    {
      id: 3,
      title: 'IT Systems & Tools',
      description: 'Overview of internal systems, tools, and software',
      type: 'mandatory',
      category: 'technical',
      duration: 150,
      format: 'hands-on',
      difficulty: 'intermediate',
      assignedTo: [1, 2],
      completedBy: [1],
      deadline: '2024-01-25',
      instructor: 'IT Team',
      prerequisites: [2]
    },
    {
      id: 4,
      title: 'Role-Specific Training: Engineering',
      description: 'Technical training specific to engineering roles',
      type: 'role-specific',
      category: 'technical',
      duration: 240,
      format: 'workshop',
      difficulty: 'advanced',
      assignedTo: [1],
      completedBy: [],
      deadline: '2024-02-05',
      instructor: 'Engineering Lead',
      prerequisites: [3]
    },
    {
      id: 5,
      title: 'Project Management Fundamentals',
      description: 'Basic project management principles and methodologies',
      type: 'role-specific',
      category: 'management',
      duration: 180,
      format: 'online',
      difficulty: 'intermediate',
      assignedTo: [2],
      completedBy: [],
      deadline: '2024-02-01',
      instructor: 'PM Team',
      prerequisites: [1]
    },
    {
      id: 6,
      title: 'Design System & Guidelines',
      description: 'Company design system, brand guidelines, and best practices',
      type: 'role-specific',
      category: 'design',
      duration: 120,
      format: 'workshop',
      difficulty: 'intermediate',
      assignedTo: [3],
      completedBy: [3],
      deadline: '2024-01-30',
      instructor: 'Design Lead',
      prerequisites: [1]
    },
    {
      id: 7,
      title: 'Soft Skills Development',
      description: 'Communication, teamwork, and professional development',
      type: 'optional',
      category: 'soft-skills',
      duration: 90,
      format: 'seminar',
      difficulty: 'beginner',
      assignedTo: [],
      completedBy: [],
      deadline: '2024-02-15',
      instructor: 'HR Team',
      prerequisites: []
    }
  ]);

  const categories = ['all', 'general', 'security', 'technical', 'management', 'design', 'soft-skills'];
  const trainingTypes = ['all', 'mandatory', 'role-specific', 'optional'];

  const assignTraining = (trainingId, employeeId) => {
    setTrainingPrograms(prev => prev.map(training => {
      if (training.id === trainingId && !training.assignedTo.includes(employeeId)) {
        return { ...training, assignedTo: [...training.assignedTo, employeeId] };
      }
      return training;
    }));
  };

  const markCompleted = (trainingId, employeeId) => {
    setTrainingPrograms(prev => prev.map(training => {
      if (training.id === trainingId && !training.completedBy.includes(employeeId)) {
        return { ...training, completedBy: [...training.completedBy, employeeId] };
      }
      return training;
    }));
  };

  const getEmployeeTrainings = (employeeId) => {
    return trainingPrograms.filter(training => training.assignedTo.includes(employeeId));
  };

  const getTrainingStatus = (training, employeeId) => {
    if (training.completedBy.includes(employeeId)) return 'completed';
    if (training.assignedTo.includes(employeeId)) {
      const deadline = new Date(training.deadline);
      const today = new Date();
      if (deadline < today) return 'overdue';
      return 'assigned';
    }
    return 'not-assigned';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'assigned': return 'text-blue-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'overdue': return AlertCircle;
      case 'assigned': return Clock;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-orange-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'mandatory': return 'text-red-600';
      case 'role-specific': return 'text-blue-600';
      case 'optional': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'all', name: 'All Trainings', count: trainingPrograms.length },
    { id: 'mandatory', name: 'Mandatory', count: trainingPrograms.filter(t => t.type === 'mandatory').length },
    { id: 'role-specific', name: 'Role Specific', count: trainingPrograms.filter(t => t.type === 'role-specific').length },
    { id: 'optional', name: 'Optional', count: trainingPrograms.filter(t => t.type === 'optional').length }
  ];

  const filteredTrainings = activeTab === 'all' 
    ? trainingPrograms 
    : trainingPrograms.filter(training => training.type === activeTab);

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('onboarding-list')}
            className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="mb-1 text-[#333333]">Training Allocation</h1>
            <p className="text-[#666666]">Assign and manage onboarding training programs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200">
            <Filter className="h-5 w-5" />
          </button>
          <button className="neu-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200">
            <Plus className="h-5 w-5" />
            Add Training
          </button>
        </div>
      </div>

      {/* Employee Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {employees.map((employee) => (
          <div key={employee.id} className="neu-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#333333]">{employee.name}</h3>
                <p className="text-sm text-[#666666]">{employee.position}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#05A7CC]">{employee.progress}%</div>
                <div className="text-xs text-[#666666]">{employee.completedTrainings}/{employee.totalTrainings}</div>
              </div>
            </div>
            <div className="w-full neu-card-inset rounded-full h-2 mb-3">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                style={{ width: `${employee.progress}%` }}
              ></div>
            </div>
            <button 
              onClick={() => setSelectedEmployee(employee)}
              className="w-full neu-button p-2 rounded-xl text-[#05A7CC] hover:scale-102 transition-all duration-200"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Training Management */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Employee List Sidebar */}
        <div className="neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#333333]">Employees</h3>
            <span className="text-sm text-[#666666]">{employees.length}</span>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 neu-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
            />
          </div>

          <div className="space-y-2">
            {filteredEmployees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                  selectedEmployee?.id === employee.id 
                    ? 'neu-primary text-white' 
                    : 'neu-small text-[#333333] hover:scale-102'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-xs opacity-75">{employee.position}</div>
                  </div>
                  <div className="text-xs">
                    {employee.progress}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="lg:col-span-3">
          {/* Tab Navigation */}
          <div className="neu-card p-2 rounded-2xl mb-6">
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 text-sm ${
                    activeTab === tab.id 
                      ? 'neu-primary text-white' 
                      : 'text-[#666666] hover:text-[#05A7CC]'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Training Programs List */}
          <div className="neu-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#333333]">Training Programs</h2>
              <div className="text-sm text-[#666666]">
                {filteredTrainings.length} programs
              </div>
            </div>

            <div className="space-y-4">
              {filteredTrainings.map((training) => (
                <div key={training.id} className="neu-small p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[#333333]">{training.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full neu-card capitalize ${getTypeColor(training.type)}`}>
                          {training.type.replace('-', ' ')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full neu-card capitalize ${getDifficultyColor(training.difficulty)}`}>
                          {training.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-[#666666] mb-3">{training.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#666666] mb-3">
                        <div>
                          <span className="font-medium">Duration:</span> {training.duration} min
                        </div>
                        <div>
                          <span className="font-medium">Format:</span> {training.format}
                        </div>
                        <div>
                          <span className="font-medium">Deadline:</span> {training.deadline}
                        </div>
                        <div>
                          <span className="font-medium">Instructor:</span> {training.instructor}
                        </div>
                      </div>

                      {/* Assignment Status for Selected Employee */}
                      {selectedEmployee && (
                        <div className="neu-card-inset p-3 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const status = getTrainingStatus(training, selectedEmployee.id);
                                const StatusIcon = getStatusIcon(status);
                                return (
                                  <>
                                    <StatusIcon className={`h-4 w-4 ${getStatusColor(status)}`} />
                                    <span className={`text-sm capitalize ${getStatusColor(status)}`}>
                                      {status.replace('-', ' ')} for {selectedEmployee.name}
                                    </span>
                                  </>
                                );
                              })()}
                            </div>
                            <div className="flex items-center gap-2">
                              {!training.assignedTo.includes(selectedEmployee.id) && (
                                <button 
                                  onClick={() => assignTraining(training.id, selectedEmployee.id)}
                                  className="neu-button px-3 py-1 rounded-lg text-xs text-[#05A7CC] hover:scale-105 transition-all duration-200"
                                >
                                  Assign
                                </button>
                              )}
                              {training.assignedTo.includes(selectedEmployee.id) && !training.completedBy.includes(selectedEmployee.id) && (
                                <button 
                                  onClick={() => markCompleted(training.id, selectedEmployee.id)}
                                  className="neu-button px-3 py-1 rounded-lg text-xs text-green-600 hover:scale-105 transition-all duration-200"
                                >
                                  Mark Complete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Assignment Summary */}
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-[#666666]" />
                        <span className="text-sm text-[#666666]">
                          {training.assignedTo.length} assigned
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          {training.completedBy.length} completed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {training.prerequisites.length > 0 && (
                    <div className="border-t border-[#E8EBEF] pt-3">
                      <div className="flex items-center gap-2 text-sm text-[#666666]">
                        <span className="font-medium">Prerequisites:</span>
                        {training.prerequisites.map((prereqId, index) => {
                          const prereq = trainingPrograms.find(t => t.id === prereqId);
                          return (
                            <span key={prereqId} className="neu-card px-2 py-1 rounded text-xs text-[#05A7CC]">
                              {prereq?.title}
                              {index < training.prerequisites.length - 1 && ', '}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-3xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#333333]">
                Training Progress - {selectedEmployee.name}
              </h2>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="neu-button p-2 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {getEmployeeTrainings(selectedEmployee.id).map((training) => {
                const status = getTrainingStatus(training, selectedEmployee.id);
                const StatusIcon = getStatusIcon(status);
                
                return (
                  <div key={training.id} className="neu-small p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(status)}`} />
                        <div>
                          <h4 className="font-medium text-[#333333]">{training.title}</h4>
                          <p className="text-sm text-[#666666]">{training.duration} min • Due: {training.deadline}</p>
                        </div>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full neu-card capitalize ${getStatusColor(status)}`}>
                        {status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};