import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, X, Calendar, User, Building, Phone, Mail, MapPin, FileText, Camera } from 'lucide-react';

export const AddEmployee = ({ mode = 'add', employeeId, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    
    // Job Information
    employeeId: '',
    designation: '',
    department: '',
    team: '',
    joiningDate: '',
    workType: '',
    workLocation: '',
    manager: '',
    salary: '',
    shiftTime: '',
    
    // Documents
    resume: null,
    idProof: null,
    addressProof: null,
    photo: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting employee data:', formData);
    onNavigate?.('employee-directory');
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Job Details', icon: Building },
    { id: 3, title: 'Documents', icon: FileText },
    { id: 4, title: 'Review', icon: FileText }
  ];

  const departments = ['Engineering', 'Marketing', 'Design', 'Sales', 'HR', 'Finance', 'Operations'];
  const workTypes = ['Full-time', 'Part-time', 'Contract', 'Intern'];
  const workLocations = ['Office', 'Remote', 'Hybrid'];

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
              <h1 className="text-4xl font-bold text-[#333333] mb-2">
                {mode === 'edit' ? 'Edit Employee' : 'Add New Employee'}
              </h1>
              <p className="text-[#666666] text-lg">
                {mode === 'edit' ? 'Update employee information' : 'Create a new employee profile'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isActive ? 'neu-primary text-white' :
                  isCompleted ? 'neu-secondary text-white' :
                  'neu-small text-[#666666]'
                }`}>
                  <Icon size={20} />
                </div>
                <div className="ml-2 mr-4">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-[#EF5226]' :
                    isCompleted ? 'text-[#05A7CC]' :
                    'text-[#666666]'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 rounded-full mx-2 ${
                    isCompleted ? 'bg-[#05A7CC]' : 'bg-[#E8EBEF]'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="neu-card p-8 rounded-3xl">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Personal Information</h3>
            
            {/* Profile Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 neu-gradient rounded-full flex items-center justify-center">
                  {formData.photo ? (
                    <img src={URL.createObjectURL(formData.photo)} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Camera className="w-12 h-12 text-[#666666]" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 neu-primary p-2 rounded-full cursor-pointer hover:scale-105 transition-transform">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload('photo', e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter nationality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Marital Status</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#666666] mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyName}
                    onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Relationship</label>
                  <input
                    type="text"
                    value={formData.emergencyRelation}
                    onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="e.g. Spouse, Parent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Job Information</h3>
            
            {/* Job Details */}
            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Position Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Employee ID *</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="e.g. EMP001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Designation *</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Team</label>
                  <input
                    type="text"
                    value={formData.team}
                    onChange={(e) => handleInputChange('team', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="e.g. Frontend Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Joining Date *</label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Work Type *</label>
                  <select
                    value={formData.workType}
                    onChange={(e) => handleInputChange('workType', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  >
                    <option value="">Select Work Type</option>
                    {workTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Work Location</label>
                  <select
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                  >
                    <option value="">Select Location</option>
                    {workLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Reporting Manager</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="Select or enter manager name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Salary</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="e.g. $75,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">Shift Time</label>
                  <input
                    type="text"
                    value={formData.shiftTime}
                    onChange={(e) => handleInputChange('shiftTime', e.target.value)}
                    className="neu-input w-full px-4 py-3 rounded-2xl text-[#333333]"
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Document Upload</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'resume', label: 'Resume/CV', required: true },
                { key: 'idProof', label: 'ID Proof', required: true },
                { key: 'addressProof', label: 'Address Proof', required: false },
              ].map((doc) => (
                <div key={doc.key} className="neu-small p-6 rounded-2xl">
                  <h4 className="font-medium text-[#333333] mb-4">
                    {doc.label} {doc.required && <span className="text-[#EF5226]">*</span>}
                  </h4>
                  {formData[doc.key] ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 text-sm">{formData[doc.key].name}</span>
                      </div>
                      <button
                        onClick={() => handleFileUpload(doc.key, null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="neu-button w-full p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                      <Upload className="w-8 h-8 text-[#666666] mb-2" />
                      <span className="text-[#666666]">Click to upload {doc.label}</span>
                      <span className="text-xs text-[#999999] mt-1">PDF, DOC, DOCX (Max 5MB)</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Review & Submit</h3>
            
            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Employee Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-1">Full Name</label>
                  <p className="text-[#333333]">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-1">Email</label>
                  <p className="text-[#333333]">{formData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-1">Designation</label>
                  <p className="text-[#333333]">{formData.designation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-1">Department</label>
                  <p className="text-[#333333]">{formData.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-1">Joining Date</label>
                  <p className="text-[#333333]">{formData.joiningDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-1">Employee ID</label>
                  <p className="text-[#333333]">{formData.employeeId}</p>
                </div>
              </div>
            </div>

            <div className="neu-small p-6 rounded-2xl">
              <h4 className="font-bold text-[#333333] mb-4">Uploaded Documents</h4>
              <div className="space-y-2">
                {Object.entries(formData).filter(([key, value]) => value && typeof value === 'object' && value.name).map(([key, file]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#05A7CC]" />
                    <span className="text-[#333333] text-sm">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`neu-button px-6 py-3 rounded-2xl flex items-center space-x-2 ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            } transition-transform`}
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <span>Next</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Save size={16} />
              <span>{mode === 'edit' ? 'Update Employee' : 'Create Employee'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};