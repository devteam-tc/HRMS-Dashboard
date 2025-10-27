import React, { useState } from 'react';
import { ArrowLeft, Save, Send, Upload, Plus, Trash2, Calendar, User, Briefcase, Mail, Phone } from 'lucide-react';

export const AddNewOnboarding = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    personalEmail: '',
    dateOfBirth: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    
    // Employment Details
    position: '',
    department: '',
    manager: '',
    workLocation: '',
    employmentType: 'full-time',
    joinDate: '',
    salary: '',
    
    // Documents
    requiredDocuments: [
      { name: 'Resume/CV', uploaded: false, required: true },
      { name: 'Photo ID', uploaded: false, required: true },
      { name: 'Educational Certificates', uploaded: false, required: true },
      { name: 'Previous Employment Letter', uploaded: false, required: false },
      { name: 'Bank Details', uploaded: false, required: true }
    ],
    
    // Onboarding Settings
    sendWelcomeEmail: true,
    createSlackAccount: true,
    setupHardware: true,
    scheduleOrientation: true,
    assignBuddy: true,
    buddyId: ''
  });

  const [activeTab, setActiveTab] = useState('personal');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (index) => {
    const updatedDocuments = [...formData.requiredDocuments];
    updatedDocuments[index].uploaded = true;
    setFormData(prev => ({ ...prev, requiredDocuments: updatedDocuments }));
  };

  const addCustomDocument = () => {
    const newDoc = { name: 'Custom Document', uploaded: false, required: false };
    setFormData(prev => ({ 
      ...prev, 
      requiredDocuments: [...prev.requiredDocuments, newDoc] 
    }));
  };

  const removeDocument = (index) => {
    const updatedDocuments = formData.requiredDocuments.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, requiredDocuments: updatedDocuments }));
  };

  const handleSave = () => {
    console.log('Saving onboarding data:', formData);
    onNavigate('onboarding-list');
  };

  const handleSaveAndSend = () => {
    console.log('Saving and sending invitation:', formData);
    onNavigate('onboarding-list');
  };

  const tabs = [
    { id: 'personal', name: 'Personal Information', icon: User },
    { id: 'employment', name: 'Employment Details', icon: Briefcase },
    { id: 'documents', name: 'Documents', icon: Upload },
    { id: 'settings', name: 'Onboarding Settings', icon: Calendar }
  ];

  const managers = [
    { id: 1, name: 'John Smith', department: 'Engineering' },
    { id: 2, name: 'Sarah Davis', department: 'Product' },
    { id: 3, name: 'Mike Wilson', department: 'Design' },
    { id: 4, name: 'Lisa Brown', department: 'Analytics' }
  ];

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Analytics', 'HR', 'Finance'];
  const workLocations = ['San Francisco Office', 'New York Office', 'Remote', 'London Office'];

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
            <h1 className="mb-1 text-[#333333]">Add New Onboarding</h1>
            <p className="text-[#666666]">Create a new employee onboarding process</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            className="neu-button px-6 py-3 rounded-xl text-[#05A7CC] flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Save className="h-5 w-5" />
            Save Draft
          </button>
          <button 
            onClick={handleSaveAndSend}
            className="neu-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Send className="h-5 w-5" />
            Save & Send Invitation
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card p-2 rounded-2xl mb-8">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#05A7CC]'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="neu-card p-8 rounded-2xl">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">Work Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="john.doe@company.com"
                />
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Personal Email</label>
                <input
                  type="email"
                  value={formData.personalEmail}
                  onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="personal@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#333333] mb-2">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC] h-24 resize-none"
                placeholder="Enter complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">Emergency Contact Name</label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="Contact person name"
                />
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Emergency Contact Phone</label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employment' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-6">Employment Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">Position/Job Title *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">Reporting Manager *</label>
                <select
                  value={formData.manager}
                  onChange={(e) => handleInputChange('manager', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                >
                  <option value="">Select manager</option>
                  {managers.map(manager => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name} - {manager.department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Work Location *</label>
                <select
                  value={formData.workLocation}
                  onChange={(e) => handleInputChange('workLocation', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                >
                  <option value="">Select location</option>
                  {workLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#333333] mb-2">Employment Type *</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="intern">Intern</option>
                </select>
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Join Date *</label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                />
              </div>
              <div>
                <label className="block text-[#333333] mb-2">Salary (Annual)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                  placeholder="e.g. 80000"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#333333]">Required Documents</h2>
              <button 
                onClick={addCustomDocument}
                className="neu-button px-4 py-2 rounded-xl text-[#05A7CC] flex items-center gap-2 hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Custom Document
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.requiredDocuments.map((document, index) => (
                <div key={index} className="neu-small p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        document.uploaded ? 'neu-primary' : 'neu-button'
                      }`}>
                        <Upload className={`h-5 w-5 ${document.uploaded ? 'text-white' : 'text-[#05A7CC]'}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#333333]">{document.name}</h3>
                        <p className="text-sm text-[#666666]">
                          {document.required ? 'Required' : 'Optional'} • 
                          {document.uploaded ? ' Uploaded' : ' Pending'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!document.uploaded && (
                        <button 
                          onClick={() => handleDocumentUpload(index)}
                          className="neu-button px-4 py-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
                        >
                          Upload
                        </button>
                      )}
                      {!document.required && (
                        <button 
                          onClick={() => removeDocument(index)}
                          className="neu-button p-2 rounded-xl text-red-500 hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="neu-card-inset p-6 rounded-xl">
              <h3 className="font-medium text-[#333333] mb-2">Document Upload Instructions</h3>
              <ul className="text-sm text-[#666666] space-y-1">
                <li>• All documents should be in PDF format</li>
                <li>• Maximum file size: 5MB per document</li>
                <li>• Ensure documents are clear and readable</li>
                <li>• Required documents must be uploaded before onboarding can begin</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-6">Onboarding Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between neu-small p-4 rounded-xl">
                <div>
                  <h3 className="font-medium text-[#333333]">Send Welcome Email</h3>
                  <p className="text-sm text-[#666666]">Automatically send welcome email on join date</p>
                </div>
                <div className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                  formData.sendWelcomeEmail ? 'neu-toggle-active' : 'neu-toggle'
                }`} onClick={() => handleInputChange('sendWelcomeEmail', !formData.sendWelcomeEmail)}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-all duration-200 ${
                    formData.sendWelcomeEmail ? 'ml-6' : 'ml-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between neu-small p-4 rounded-xl">
                <div>
                  <h3 className="font-medium text-[#333333]">Create Slack Account</h3>
                  <p className="text-sm text-[#666666]">Automatically create Slack workspace account</p>
                </div>
                <div className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                  formData.createSlackAccount ? 'neu-toggle-active' : 'neu-toggle'
                }`} onClick={() => handleInputChange('createSlackAccount', !formData.createSlackAccount)}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-all duration-200 ${
                    formData.createSlackAccount ? 'ml-6' : 'ml-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between neu-small p-4 rounded-xl">
                <div>
                  <h3 className="font-medium text-[#333333]">Setup Hardware</h3>
                  <p className="text-sm text-[#666666]">Create hardware allocation request</p>
                </div>
                <div className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                  formData.setupHardware ? 'neu-toggle-active' : 'neu-toggle'
                }`} onClick={() => handleInputChange('setupHardware', !formData.setupHardware)}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-all duration-200 ${
                    formData.setupHardware ? 'ml-6' : 'ml-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between neu-small p-4 rounded-xl">
                <div>
                  <h3 className="font-medium text-[#333333]">Schedule Orientation</h3>
                  <p className="text-sm text-[#666666]">Automatically schedule orientation session</p>
                </div>
                <div className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                  formData.scheduleOrientation ? 'neu-toggle-active' : 'neu-toggle'
                }`} onClick={() => handleInputChange('scheduleOrientation', !formData.scheduleOrientation)}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-all duration-200 ${
                    formData.scheduleOrientation ? 'ml-6' : 'ml-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between neu-small p-4 rounded-xl">
                <div>
                  <h3 className="font-medium text-[#333333]">Assign Buddy</h3>
                  <p className="text-sm text-[#666666]">Assign an onboarding buddy to help new employee</p>
                </div>
                <div className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                  formData.assignBuddy ? 'neu-toggle-active' : 'neu-toggle'
                }`} onClick={() => handleInputChange('assignBuddy', !formData.assignBuddy)}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-all duration-200 ${
                    formData.assignBuddy ? 'ml-6' : 'ml-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>
            </div>

            {formData.assignBuddy && (
              <div>
                <label className="block text-[#333333] mb-2">Select Buddy</label>
                <select
                  value={formData.buddyId}
                  onChange={(e) => handleInputChange('buddyId', e.target.value)}
                  className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC]"
                >
                  <option value="">Select a buddy</option>
                  {managers.map(manager => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name} - {manager.department}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};