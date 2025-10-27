import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Upload, Calendar, DollarSign } from 'lucide-react';

export const NewJobOpening = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'Full-time',
    workModel: 'Hybrid',
    experienceLevel: 'Mid-level',
    openings: 1,
    hiringManager: '',
    salaryMin: '',
    salaryMax: '',
    priority: 'Medium',
    description: '',
    requirements: [''],
    skills: [''],
    benefits: [''],
    expiryDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.hiringManager.trim()) newErrors.hiringManager = 'Hiring manager is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (formData.salaryMin && formData.salaryMax && parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
      newErrors.salary = 'Maximum salary must be greater than minimum salary';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process form data
      const jobData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        skills: formData.skills.filter(skill => skill.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim()),
        id: Date.now(), // Generate temporary ID
        status: 'Open',
        applications: 0,
        postedDate: new Date().toISOString().split('T')[0]
      };

      console.log('Creating job:', jobData);
      
      // Navigate to job details page
      onNavigate('job-opening-details', { jobId: jobData.id });
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    // Save as draft logic here
  };

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('job-openings-list')}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Create New Job Opening</h1>
            <p className="text-[#666666]">Add details for the new position</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            className="neu-button px-6 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
          >
            <Save size={20} />
            <span>Publish Job</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.title ? 'border-red-300' : ''}`}
                    placeholder="e.g. Senior Software Engineer"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none ${errors.department ? 'border-red-300' : ''}`}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                  </select>
                  {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.location ? 'border-red-300' : ''}`}
                    placeholder="e.g. New York, Remote"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Work Model</label>
                  <select
                    value={formData.workModel}
                    onChange={(e) => handleInputChange('workModel', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="Entry-level">Entry-level</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Job Description</h3>
              
              <div>
                <label className="block text-[#333333] font-medium mb-3">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={10}
                  className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none resize-none ${errors.description ? 'border-red-300' : ''}`}
                  placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Requirements */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Requirements</h3>
              
              <div className="space-y-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                      className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="Enter a requirement"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('requirements', index)}
                        className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('requirements')}
                  className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:shadow-md transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Requirement</span>
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Required Skills</h3>
              
              <div className="space-y-4">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayFieldChange('skills', index, e.target.value)}
                      className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="Enter a skill"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('skills', index)}
                        className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('skills')}
                  className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:shadow-md transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Benefits & Perks</h3>
              
              <div className="space-y-4">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                      className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="Enter a benefit"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('benefits', index)}
                        className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('benefits')}
                  className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:shadow-md transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Benefit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Hiring Details */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-6">Hiring Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Number of Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.openings}
                    onChange={(e) => handleInputChange('openings', parseInt(e.target.value))}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Hiring Manager *</label>
                  <input
                    type="text"
                    value={formData.hiringManager}
                    onChange={(e) => handleInputChange('hiringManager', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none ${errors.hiringManager ? 'border-red-300' : ''}`}
                    placeholder="Enter hiring manager name"
                  />
                  {errors.hiringManager && <p className="text-red-500 text-sm mt-1">{errors.hiringManager}</p>}
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="neu-input w-full px-4 py-3 text-[#333333] focus:outline-none appearance-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Application Deadline *</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className={`neu-input w-full px-4 py-3 text-[#333333] focus:outline-none ${errors.expiryDate ? 'border-red-300' : ''}`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                </div>
              </div>
            </div>

            {/* Salary Information */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-6">Salary Range</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Minimum Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                      className="neu-input w-full pl-12 pr-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Maximum Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                      className="neu-input w-full pl-12 pr-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="80000"
                    />
                  </div>
                </div>
                {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
              </div>
            </div>

            {/* Preview */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Preview</h3>
              <p className="text-[#666666] text-sm mb-4">
                Job will be visible to candidates once published
              </p>
              <button
                type="button"
                className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
              >
                Preview Job Posting
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};