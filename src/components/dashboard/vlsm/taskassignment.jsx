import React, { useState } from 'react';
import { Users, Plus, X, Search, UserPlus, UserMinus, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const employeesData = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'UI/UX Designer',
    department: 'Design',
    availability: 'available',
    currentTasks: 3,
    maxTasks: 5,
    skills: ['UI Design', 'Prototyping', 'User Research'],
    hourlyRate: 75,
    avatar: 'AJ'
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Frontend Developer',
    department: 'Engineering',
    availability: 'busy',
    currentTasks: 4,
    maxTasks: 4,
    skills: ['React', 'TypeScript', 'CSS'],
    hourlyRate: 85,
    avatar: 'BS'
  },
  {
    id: '3',
    name: 'Carol Davis',
    role: 'Marketing Manager',
    department: 'Marketing',
    availability: 'available',
    currentTasks: 2,
    maxTasks: 6,
    skills: ['Content Strategy', 'SEO', 'Analytics'],
    hourlyRate: 70,
    avatar: 'CD'
  },
  {
    id: '4',
    name: 'David Brown',
    role: 'Backend Developer',
    department: 'Engineering',
    availability: 'available',
    currentTasks: 3,
    maxTasks: 5,
    skills: ['Node.js', 'Database Design', 'API Development'],
    hourlyRate: 90,
    avatar: 'DB'
  },
  {
    id: '5',
    name: 'Emma Garcia',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    availability: 'away',
    currentTasks: 1,
    maxTasks: 4,
    skills: ['Manual Testing', 'Automation', 'Bug Tracking'],
    hourlyRate: 65,
    avatar: 'EG'
  },
  {
    id: '6',
    name: 'Frank Wilson',
    role: 'DevOps Engineer',
    department: 'Engineering',
    availability: 'available',
    currentTasks: 2,
    maxTasks: 3,
    skills: ['AWS', 'Docker', 'CI/CD'],
    hourlyRate: 95,
    avatar: 'FW'
  }
];

const taskData = {
  id: '1',
  title: 'Design Homepage Mockup',
  project: 'Website Redesign',
  priority: 'high',
  estimatedHours: 40,
  deadline: '2024-02-20',
  requiredSkills: ['UI Design', 'Prototyping'],
  currentAssignees: ['1', '2'], // Alice and Bob
  budget: 3000
};

export const TaskAssignment = ({ taskId, onNavigate }) => {
  const [task] = useState(taskData);
  const [employees] = useState(employeesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchesAvailability = selectedAvailability === 'all' || emp.availability === selectedAvailability;
    
    return matchesSearch && matchesDepartment && matchesAvailability;
  });

  const assignedEmployees = employees.filter(emp => task.currentAssignees.includes(emp.id));
  const unassignedEmployees = filteredEmployees.filter(emp => !task.currentAssignees.includes(emp.id));

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':
        return 'bg-[#4CAF50] text-white';
      case 'busy':
        return 'bg-[#FFC107] text-white';
      case 'away':
        return 'bg-[#EF5226] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getWorkloadColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-[#EF5226]';
    if (percentage >= 70) return 'text-[#FFC107]';
    return 'text-[#4CAF50]';
  };

  const calculateTaskCost = () => {
    return assignedEmployees.reduce((total, emp) => {
      const hoursPerEmployee = task.estimatedHours / assignedEmployees.length;
      return total + (hoursPerEmployee * emp.hourlyRate);
    }, 0);
  };

  const assignEmployee = (employeeId) => {
    if (!task.currentAssignees.includes(employeeId)) {
      task.currentAssignees.push(employeeId);
    }
  };

  const unassignEmployee = (employeeId) => {
    const index = task.currentAssignees.indexOf(employeeId);
    if (index > -1) {
      task.currentAssignees.splice(index, 1);
    }
  };

  const hasRequiredSkills = (employee) => {
    return task.requiredSkills.some(skill => employee.skills.includes(skill));
  };

  const isOverloaded = (employee) => {
    return employee.currentTasks >= employee.maxTasks;
  };

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Task Assignment</h1>
            <p className="text-[#666666]">Assign team members to tasks based on skills and availability</p>
            <div className="mt-4 neu-small p-4 rounded-2xl inline-block">
              <div className="flex items-center space-x-4">
                <span className="text-[#666666]">Task:</span>
                <span className="font-medium text-[#333333]">{task.title}</span>
                <div className="neu-small px-3 py-1 rounded-xl text-xs font-medium bg-[#EF5226] text-white">
                  {task.priority.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#333333] mb-1">{assignedEmployees.length}</div>
              <div className="text-sm text-[#666666]">Assigned</div>
            </div>
            <button 
              onClick={() => setShowAssignForm(true)}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Assign Members</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task Requirements */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Task Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="neu-small p-4 rounded-2xl text-center">
            <Clock className="w-8 h-8 text-[#05A7CC] mx-auto mb-2" />
            <div className="text-lg font-bold text-[#333333] mb-1">{task.estimatedHours}h</div>
            <div className="text-sm text-[#666666]">Estimated Hours</div>
          </div>
          
          <div className="neu-small p-4 rounded-2xl text-center">
            <Calendar className="w-8 h-8 text-[#FFC107] mx-auto mb-2" />
            <div className="text-lg font-bold text-[#333333] mb-1">
              {new Date(task.deadline).toLocaleDateString()}
            </div>
            <div className="text-sm text-[#666666]">Deadline</div>
          </div>
          
          <div className="neu-small p-4 rounded-2xl text-center">
            <div className="text-lg font-bold text-[#4CAF50] mb-1">${calculateTaskCost().toFixed(0)}</div>
            <div className="text-sm text-[#666666]">Estimated Cost</div>
          </div>
          
          <div className="neu-small p-4 rounded-2xl text-center">
            <div className="text-lg font-bold text-[#9C27B0] mb-1">${task.budget}</div>
            <div className="text-sm text-[#666666]">Budget</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold text-[#333333] mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {task.requiredSkills.map((skill, index) => (
              <div key={index} className="neu-card-inset px-4 py-2 rounded-2xl">
                <span className="text-sm font-medium text-[#05A7CC]">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assigned Team Members */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#333333]">Assigned Team Members ({assignedEmployees.length})</h3>
          <div className="text-sm text-[#666666]">
            Workload: {assignedEmployees.length > 0 ? Math.round(task.estimatedHours / assignedEmployees.length) : 0}h per person
          </div>
        </div>
        
        {assignedEmployees.length === 0 ? (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <Users className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No team members assigned</h3>
              <p className="text-[#666666] mb-4">Assign team members to start working on this task.</p>
              <button 
                onClick={() => setShowAssignForm(true)}
                className="neu-primary px-6 py-3 rounded-2xl"
              >
                Assign First Member
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedEmployees.map((employee) => (
              <div key={employee.id} className="neu-small p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white">
                        {employee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-[#333333]">{employee.name}</h4>
                      <p className="text-sm text-[#666666]">{employee.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => unassignEmployee(employee.id)}
                    className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f] transition-colors"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Availability</span>
                    <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getAvailabilityColor(employee.availability)}`}>
                      {employee.availability.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Workload</span>
                    <span className={`text-sm font-medium ${getWorkloadColor(employee.currentTasks, employee.maxTasks)}`}>
                      {employee.currentTasks}/{employee.maxTasks}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Rate</span>
                    <span className="text-sm font-medium text-[#333333]">${employee.hourlyRate}/h</span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-[#666666] mb-2 block">Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 2).map((skill, index) => (
                        <div key={index} className={`neu-card-inset px-2 py-1 rounded-lg ${task.requiredSkills.includes(skill) ? 'bg-[#E8F5E8]' : ''}`}>
                          <span className={`text-xs font-medium ${task.requiredSkills.includes(skill) ? 'text-[#4CAF50]' : 'text-[#666666]'}`}>
                            {skill}
                          </span>
                        </div>
                      ))}
                      {employee.skills.length > 2 && (
                        <div className="neu-card-inset px-2 py-1 rounded-lg">
                          <span className="text-xs text-[#666666]">+{employee.skills.length - 2}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Team Members */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#333333]">Available Team Members</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-[#666666]">
              {unassignedEmployees.length} available members
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="neu-input p-4 rounded-2xl flex items-center">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search by name, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>
          
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Departments</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <div className="neu-input p-4 rounded-2xl">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-transparent outline-none text-[#333333]"
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="away">Away</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unassignedEmployees.map((employee) => {
            const hasSkills = hasRequiredSkills(employee);
            const overloaded = isOverloaded(employee);
            
            return (
              <div key={employee.id} className={`neu-small p-6 rounded-2xl ${hasSkills ? 'border-2 border-[#4CAF50]' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#666666] text-white">
                        {employee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-[#333333]">{employee.name}</h4>
                      <p className="text-sm text-[#666666]">{employee.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {hasSkills && (
                      <div className="w-2 h-2 bg-[#4CAF50] rounded-full" title="Has required skills" />
                    )}
                    {overloaded && (
                      <AlertTriangle className="w-4 h-4 text-[#EF5226]" title="Overloaded" />
                    )}
                    <button 
                      onClick={() => assignEmployee(employee.id)}
                      disabled={employee.availability === 'away'}
                      className={`neu-button p-2 rounded-xl transition-colors ${
                        employee.availability === 'away' 
                          ? 'text-[#999999] cursor-not-allowed' 
                          : 'text-[#4CAF50] hover:text-[#45a049]'
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Department</span>
                    <span className="text-sm font-medium text-[#333333]">{employee.department}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Availability</span>
                    <div className={`neu-small px-2 py-1 rounded-lg text-xs font-medium ${getAvailabilityColor(employee.availability)}`}>
                      {employee.availability.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Workload</span>
                    <span className={`text-sm font-medium ${getWorkloadColor(employee.currentTasks, employee.maxTasks)}`}>
                      {employee.currentTasks}/{employee.maxTasks}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Rate</span>
                    <span className="text-sm font-medium text-[#333333]">${employee.hourlyRate}/h</span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-[#666666] mb-2 block">Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <div key={index} className={`neu-card-inset px-2 py-1 rounded-lg ${task.requiredSkills.includes(skill) ? 'bg-[#E8F5E8]' : ''}`}>
                          <span className={`text-xs font-medium ${task.requiredSkills.includes(skill) ? 'text-[#4CAF50]' : 'text-[#666666]'}`}>
                            {skill}
                          </span>
                        </div>
                      ))}
                      {employee.skills.length > 3 && (
                        <div className="neu-card-inset px-2 py-1 rounded-lg">
                          <span className="text-xs text-[#666666]">+{employee.skills.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {unassignedEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <Search className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No available members found</h3>
              <p className="text-[#666666]">Try adjusting your search filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskAssignment;  