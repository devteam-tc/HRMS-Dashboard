import React, { useState } from 'react';
import { Save, ArrowLeft, Calendar, Users, MapPin, DollarSign, Plus, X, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const existingProjectData = {
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
  description: 'A modern 15-story office complex featuring sustainable design elements, state-of-the-art facilities, and LEED Gold certification targets.',
  team: [
    { id: '1', name: 'John Doe', role: 'Project Manager', email: 'john.doe@company.com' },
    { id: '2', name: 'Alice Johnson', role: 'Site Engineer', email: 'alice.johnson@company.com' },
    { id: '3', name: 'Bob Smith', role: 'Safety Officer', email: 'bob.smith@company.com' },
    { id: '4', name: 'Carol Davis', role: 'Quality Inspector', email: 'carol.davis@company.com' }
  ],
  milestones: [
    { id: 1, title: 'Foundation Work', date: '2024-02-15', status: 'completed' },
    { id: 2, title: 'Structural Framework', date: '2024-03-30', status: 'completed' },
    { id: 3, title: 'Exterior Cladding', date: '2024-05-15', status: 'in-progress' },
    { id: 4, title: 'Interior Fit-out', date: '2024-06-01', status: 'pending' },
    { id: 5, title: 'Final Inspection', date: '2024-06-30', status: 'pending' }
  ]
};

const availableTeamMembers = [
  { id: '5', name: 'David Brown', role: 'Architect', email: 'david.brown@company.com' },
  { id: '6', name: 'Emma Garcia', role: 'Structural Engineer', email: 'emma.garcia@company.com' },
  { id: '7', name: 'Frank Wilson', role: 'Mechanical Engineer', email: 'frank.wilson@company.com' },
  { id: '8', name: 'Grace Lee', role: 'Electrical Engineer', email: 'grace.lee@company.com' }
];

export const ProjectEdit = ({ projectId, isNew, onNavigate }) => {
  const [formData, setFormData] = useState(isNew ? {
    name: '',
    client: '',
    location: '',
    address: '',
    status: 'pending',
    startDate: '',
    endDate: '',
    manager: '',
    budget: '',
    description: '',
    team: [],
    milestones: []
  } : existingProjectData);

  const [hasChanges, setHasChanges] = useState(false);
  const [showTeamSearch, setShowTeamSearch] = useState(false);
  const [teamSearch, setTeamSearch] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const addTeamMember = (member) => {
    if (!formData.team.find(t => t.id === member.id)) {
      setFormData(prev => ({
        ...prev,
        team: [...prev.team, member]
      }));
      setHasChanges(true);
    }
    setTeamSearch('');
    setShowTeamSearch(false);
  };

  const removeTeamMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter(t => t.id !== memberId)
    }));
    setHasChanges(true);
  };

  const addMilestone = () => {
    const newMilestone = {
      id: Date.now(),
      title: '',
      date: '',
      status: 'pending'
    };
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
    setHasChanges(true);
  };

  const updateMilestone = (milestoneId, field, value) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(milestone =>
        milestone.id === milestoneId ? { ...milestone, [field]: value } : milestone
      )
    }));
    setHasChanges(true);
  };

  const removeMilestone = (milestoneId) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== milestoneId)
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving project:', formData);
    if (isNew) {
      onNavigate('project-details', 'new-project-id');
    } else {
      onNavigate('project-details', projectId);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        if (isNew) {
          onNavigate('all-projects');
        } else {
          onNavigate('project-details', projectId);
        }
      }
    } else {
      if (isNew) {
        onNavigate('all-projects');
      } else {
        onNavigate('project-details', projectId);
      }
    }
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      console.log('Deleting project:', projectId);
      onNavigate('all-projects');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-[#05A7CC] text-white';
      case 'completed':
        return 'bg-[#4CAF50] text-white';
      case 'on-hold':
        return 'bg-[#FFC107] text-white';
      case 'pending':
        return 'bg-[#666666] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const filteredTeamMembers = availableTeamMembers.filter(member =>
    member.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    member.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
    member.email.toLowerCase().includes(teamSearch.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCancel}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#333333]">
                  {isNew ? 'New Project' : 'Edit Project'}
                </h1>
                {!isNew && (
                  <div className={`neu-small px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(formData.status)}`}>
                    {formData.status.replace('-', ' ').toUpperCase()}
                  </div>
                )}
                {hasChanges && (
                  <div className="neu-small px-3 py-1 rounded-xl text-xs font-medium bg-[#FFC107] text-white">
                    UNSAVED
                  </div>
                )}
              </div>
              <p className="text-[#666666]">
                {isNew ? 'Create a new construction project' : 'Modify project details and settings'}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            {!isNew && (
              <button 
                onClick={handleDeleteProject}
                className="neu-button px-6 py-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </button>
            )}
            <button 
              onClick={handleCancel}
              className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="neu-primary px-8 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">{isNew ? 'Create Project' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Project Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Project Name *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter project name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Client *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Enter client name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Project Manager *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.manager}
                      onChange={(e) => handleInputChange('manager', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="">Select manager</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Alice Johnson">Alice Johnson</option>
                      <option value="Bob Smith">Bob Smith</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Location *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter location (City, State)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Site Address</label>
                <div className="neu-input p-4 rounded-2xl">
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                    placeholder="Enter full site address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Description</label>
                <div className="neu-input p-4 rounded-2xl">
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                    placeholder="Enter project description and objectives"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="neu-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Timeline & Budget</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Start Date *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">End Date *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Status</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#333333] font-medium mb-3">Budget *</label>
              <div className="neu-input p-4 rounded-2xl">
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                  placeholder="Enter total project budget"
                />
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#333333]">Project Milestones</h2>
              <button 
                onClick={addMilestone}
                className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.milestones.map((milestone, index) => (
                <div key={milestone.id} className="neu-small p-6 rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <label className="block text-[#333333] font-medium mb-2">Milestone Title</label>
                      <div className="neu-input p-3 rounded-2xl">
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                          className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                          placeholder="Milestone name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#333333] font-medium mb-2">Target Date</label>
                      <div className="neu-input p-3 rounded-2xl">
                        <input
                          type="date"
                          value={milestone.date}
                          onChange={(e) => updateMilestone(milestone.id, 'date', e.target.value)}
                          className="w-full bg-transparent outline-none text-[#333333]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#333333] font-medium mb-2">Status</label>
                      <div className="neu-input p-3 rounded-2xl">
                        <select
                          value={milestone.status}
                          onChange={(e) => updateMilestone(milestone.id, 'status', e.target.value)}
                          className="w-full bg-transparent outline-none text-[#333333]"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-end">
                      <button 
                        onClick={() => removeMilestone(milestone.id)}
                        className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {formData.milestones.length === 0 && (
                <div className="neu-card-inset p-8 rounded-2xl text-center">
                  <Calendar className="w-12 h-12 text-[#666666] mx-auto mb-3" />
                  <p className="text-[#666666]">No milestones added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Team Members */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#333333]">Team Members</h3>
              <button 
                onClick={() => setShowTeamSearch(!showTeamSearch)}
                className="neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Search Team Members */}
            {showTeamSearch && (
              <div className="mb-4">
                <div className="neu-input p-4 rounded-2xl mb-3">
                  <input
                    type="text"
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Search team members..."
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredTeamMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => addTeamMember(member)}
                      className="w-full neu-small p-3 rounded-2xl text-left hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-[#05A7CC] text-white text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-[#333333] text-sm">{member.name}</div>
                          <div className="text-xs text-[#666666]">{member.role}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Current Team Members */}
            <div className="space-y-3">
              {formData.team.map((member) => (
                <div key={member.id} className="neu-small p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-[#05A7CC] text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#333333]">{member.name}</div>
                        <div className="text-sm text-[#666666]">{member.role}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeTeamMember(member.id)}
                      className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {formData.team.length === 0 && (
                <div className="neu-card-inset p-6 rounded-2xl text-center">
                  <Users className="w-12 h-12 text-[#666666] mx-auto mb-3" />
                  <p className="text-[#666666]">No team members assigned</p>
                </div>
              )}
            </div>
          </div>

          {/* Project Summary */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Project Summary</h3>
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Duration</div>
                    <div className="font-medium text-[#333333]">
                      {formData.startDate && formData.endDate 
                        ? `${Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days`
                        : 'Not set'
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Budget</div>
                    <div className="font-medium text-[#333333]">
                      {formData.budget ? `$${(formData.budget / 1000000).toFixed(1)}M` : 'Not set'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Team Size</div>
                    <div className="font-medium text-[#333333]">
                      {formData.team.length} members
                    </div>
                  </div>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#05A7CC]" />
                  <div>
                    <div className="text-sm text-[#666666]">Milestones</div>
                    <div className="font-medium text-[#333333]">
                      {formData.milestones.length} defined
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Import Timeline</span>
                </div>
              </button>
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Copy Team from Template</span>
                </div>
              </button>
              <button className="w-full neu-button p-4 rounded-2xl text-left hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Add to Map</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};