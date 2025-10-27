import React, { useState } from 'react';
import { Save, ArrowLeft, Upload, X, Plus } from 'lucide-react';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  employeeId: '',
  position: '',
  department: '',
  reportingManager: '',
  joinDate: '',
  employmentType: '',
  workLocation: '',
  shift: '',
  baseSalary: '',
  currency: 'USD',
  payFrequency: 'monthly',
  bankAccount: '',
  taxId: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: ''
};

export const AddNewEmployee = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(initialForm);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (fileName) => {
    setUploadedFiles(prev => [...prev, fileName]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileName));
  };

  const handleSave = () => {
    console.log('Saving employee data:', formData);
    // Handle save logic here
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'job', label: 'Job Profile', icon: '💼' },
    { id: 'payroll', label: 'Payroll', icon: '💰' },
    { id: 'documents', label: 'Documents', icon: '📁' }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Add New Employee</h1>
              <p className="text-[#666666]">Create a new employee profile with all necessary information</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="neu-primary px-8 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">Save Employee</span>
            </button>
          </div>
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

      {/* Form Content */}
      <div className="neu-card p-8 rounded-3xl">
        {activeTab === 'personal' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#333333] mb-6">Personal Information</h2>
              
              {/* Profile Picture Upload */}
              <div className="mb-8">
                <label className="block text-[#333333] font-medium mb-4">Profile Picture</label>
                <div className="flex items-center space-x-6">
                  <div className="neu-card-inset w-24 h-24 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-[#666666]" />
                  </div>
                  <button className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333]">
                    Upload Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">First Name *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Last Name *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Email Address *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Phone Number *</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Date of Birth</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Gender</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-[#333333] font-medium mb-3">Address</label>
                <div className="neu-input p-4 rounded-2xl">
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                    placeholder="Enter full address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">City</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">State</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">ZIP Code</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="ZIP"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Country</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="">Select country</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="neu-card-inset p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Contact Name</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Emergency contact name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Phone Number</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Relationship</label>
                  <div className="neu-input p-4 rounded-2xl">
                    <select
                      value={formData.emergencyContactRelation}
                      onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                      className="w-full bg-transparent outline-none text-[#333333]"
                    >
                      <option value="">Select relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="child">Child</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'job' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Job Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Employee ID *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Position *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter job position"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Department *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Reporting Manager</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.reportingManager}
                    onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="">Select manager</option>
                    <option value="john-doe">John Doe - Engineering Manager</option>
                    <option value="jane-smith">Jane Smith - Product Manager</option>
                    <option value="mike-wilson">Mike Wilson - Design Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Join Date *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Employment Type *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.employmentType}
                    onChange={(e) => handleInputChange('employmentType', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="">Select employment type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="intern">Intern</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Work Location</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="">Select work location</option>
                    <option value="office">Office</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Shift</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.shift}
                    onChange={(e) => handleInputChange('shift', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="">Select shift</option>
                    <option value="day">Day Shift (9:00 AM - 6:00 PM)</option>
                    <option value="evening">Evening Shift (2:00 PM - 11:00 PM)</option>
                    <option value="night">Night Shift (11:00 PM - 8:00 AM)</option>
                    <option value="flexible">Flexible Hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Payroll Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#333333] font-medium mb-3">Base Salary *</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="number"
                    value={formData.baseSalary}
                    onChange={(e) => handleInputChange('baseSalary', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Enter base salary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Currency</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Pay Frequency</label>
                <div className="neu-input p-4 rounded-2xl">
                  <select
                    value={formData.payFrequency}
                    onChange={(e) => handleInputChange('payFrequency', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333]"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Bank Account</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Bank account number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-medium mb-3">Tax ID / SSN</label>
                <div className="neu-input p-4 rounded-2xl">
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                    className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                    placeholder="Tax identification number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Document Upload</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-4">Resume / CV</label>
                  <div className="neu-card-inset p-8 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center">
                    <Upload className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                    <p className="text-[#666666] mb-4">Drag and drop or click to upload</p>
                    <button 
                      onClick={() => handleFileUpload('resume.pdf')}
                      className="neu-button px-6 py-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-4">ID Proof</label>
                  <div className="neu-card-inset p-8 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center">
                    <Upload className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                    <p className="text-[#666666] mb-4">Driver's license, passport, etc.</p>
                    <button 
                      onClick={() => handleFileUpload('id_proof.pdf')}
                      className="neu-button px-6 py-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-4">Address Proof</label>
                  <div className="neu-card-inset p-8 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center">
                    <Upload className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                    <p className="text-[#666666] mb-4">Utility bill, bank statement, etc.</p>
                    <button 
                      onClick={() => handleFileUpload('address_proof.pdf')}
                      className="neu-button px-6 py-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-4">Educational Certificates</label>
                  <div className="neu-card-inset p-8 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center">
                    <Upload className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                    <p className="text-[#666666] mb-4">Degree, diploma certificates</p>
                    <button 
                      onClick={() => handleFileUpload('certificates.pdf')}
                      className="neu-button px-6 py-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8]"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="neu-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-[#333333] mb-4">Uploaded Files</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="neu-small p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="neu-card-inset p-2 rounded-lg">
                          <Upload className="w-4 h-4 text-[#666666]" />
                        </div>
                        <span className="text-[#333333] font-medium">{file}</span>
                      </div>
                      <button 
                        onClick={() => removeFile(file)}
                        className="neu-button p-2 rounded-lg text-[#EF5226] hover:text-[#d4471f]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};