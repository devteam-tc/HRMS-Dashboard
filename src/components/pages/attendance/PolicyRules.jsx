import React, { useState } from 'react';
import { Settings, Clock, Shield, AlertCircle, CheckCircle, Edit3, Save, X, ToggleLeft, ToggleRight, Sliders } from 'lucide-react';

export const PolicyRules = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [editMode, setEditMode] = useState({});

  const [policies, setPolicies] = useState({
    general: {
      gracePeriod: 15,
      halfDayCutoff: 4,
      fullDayCutoff: 8,
      minimumWorkingHours: 8,
      maxContinuousWork: 12,
      breakTimeRequired: true,
      minimumBreakDuration: 30
    },
    overtime: {
      overtimeThreshold: 8,
      maxDailyOvertime: 4,
      maxWeeklyOvertime: 20,
      overtimeApprovalRequired: true,
      weekendOvertimeMultiplier: 2,
      holidayOvertimeMultiplier: 2.5,
      autoCalculateOvertime: true
    },
    leave: {
      advanceNoticeRequired: 2,
      maxConsecutiveLeaves: 10,
      carryForwardLimit: 5,
      encashmentAllowed: true,
      halfDayLeaveAllowed: true,
      leaveApprovalRequired: true,
      emergencyLeaveGracePeriod: 24
    },
    compliance: {
      laborLawCompliance: true,
      weeklyOffMandatory: true,
      maxWeeklyHours: 48,
      nightShiftRegulations: true,
      femaleNightShiftPolicy: true,
      underage18Restrictions: true,
      pregnancyLeavePolicy: true
    }
  });

  const handleEdit = (section, field) => {
    setEditMode({ ...editMode, [`${section}-${field}`]: true });
  };

  const handleSave = (section, field, value) => {
    setPolicies(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setEditMode({ ...editMode, [`${section}-${field}`]: false });
  };

  const handleCancel = (section, field) => {
    setEditMode({ ...editMode, [`${section}-${field}`]: false });
  };

  const handleToggle = (section, field) => {
    setPolicies(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
  };

  const PolicyField = ({ section, field, label, value, type = 'number', unit = '', description = '', min = 0, max = 100 }) => {
    const isEditing = editMode[`${section}-${field}`];
    const [tempValue, setTempValue] = useState(value);

    if (type === 'boolean') {
      return (
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-semibold text-[#333333] mb-1">{label}</div>
              {description && <div className="text-[#666666] text-sm">{description}</div>}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleToggle(section, field)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value 
                    ? 'bg-gradient-to-r from-[#EF5226] to-[#d4471f]' 
                    : 'bg-[#E8EBEF]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${value ? 'text-[#EF5226]' : 'text-[#666666]'}`}>
                {value ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'slider') {
      return (
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="font-semibold text-[#333333] mb-1">{label}</div>
              {description && <div className="text-[#666666] text-sm">{description}</div>}
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-bold text-[#EF5226] text-lg">{value}</span>
              {unit && <span className="text-[#666666] text-sm">{unit}</span>}
            </div>
          </div>
          <div className="neu-card-inset rounded-lg p-2">
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => handleSave(section, field, Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[#EF5226] to-[#d4471f] rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <div className="flex justify-between text-xs text-[#666666] mt-2">
            <span>{min}{unit}</span>
            <span>{max}{unit}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="font-semibold text-[#333333] mb-1">{label}</div>
            {description && <div className="text-[#666666] text-sm">{description}</div>}
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <input
                  type={type}
                  value={tempValue}
                  onChange={(e) => setTempValue(type === 'number' ? Number(e.target.value) : e.target.value)}
                  className="neu-input w-20 px-3 py-2 text-center rounded-xl focus:ring-2 focus:ring-[#EF5226]"
                />
                {unit && <span className="text-[#666666] text-sm">{unit}</span>}
                <button
                  onClick={() => handleSave(section, field, tempValue)}
                  className="neu-small p-2 rounded-lg hover:text-green-600 transition-colors"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={() => handleCancel(section, field)}
                  className="neu-small p-2 rounded-lg hover:text-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <span className="font-bold text-[#EF5226] text-lg">{value}</span>
                {unit && <span className="text-[#666666] text-sm">{unit}</span>}
                <button
                  onClick={() => handleEdit(section, field)}
                  className="neu-small p-2 rounded-lg hover:text-[#EF5226] transition-colors"
                >
                  <Edit3 size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGeneralPolicies = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">General Attendance Policies</h2>
          <p className="text-[#666666] text-sm mt-1">Configure basic attendance rules and requirements</p>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle size={16} className="text-green-600" />
          <span className="text-green-600 text-sm font-medium">All policies active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PolicyField
          section="general"
          field="gracePeriod"
          label="Grace Period for Late Arrival"
          value={policies.general.gracePeriod}
          type="slider"
          unit="minutes"
          description="Allowed delay without marking as late"
          min={0}
          max={60}
        />

        <PolicyField
          section="general"
          field="halfDayCutoff"
          label="Half Day Hours Cutoff"
          value={policies.general.halfDayCutoff}
          unit="hours"
          description="Minimum hours required to avoid half-day deduction"
        />

        <PolicyField
          section="general"
          field="fullDayCutoff"
          label="Full Day Hours Requirement"
          value={policies.general.fullDayCutoff}
          unit="hours"
          description="Hours required for full day attendance"
        />

        <PolicyField
          section="general"
          field="minimumWorkingHours"
          label="Minimum Daily Working Hours"
          value={policies.general.minimumWorkingHours}
          unit="hours"
          description="Minimum required working hours per day"
        />

        <PolicyField
          section="general"
          field="breakTimeRequired"
          label="Break Time Mandatory"
          value={policies.general.breakTimeRequired}
          type="boolean"
          description="Whether break time is mandatory for all employees"
        />

        <PolicyField
          section="general"
          field="minimumBreakDuration"
          label="Minimum Break Duration"
          value={policies.general.minimumBreakDuration}
          type="slider"
          unit="minutes"
          description="Minimum required break time per day"
          min={15}
          max={120}
        />
      </div>
    </div>
  );

  const renderOvertimePolicies = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Overtime Policies</h2>
          <p className="text-[#666666] text-sm mt-1">Configure overtime calculation and approval rules</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-[#05A7CC]" />
          <span className="text-[#05A7CC] text-sm font-medium">Auto-calculation enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PolicyField
          section="overtime"
          field="overtimeThreshold"
          label="Overtime Threshold"
          value={policies.overtime.overtimeThreshold}
          unit="hours"
          description="Hours after which overtime calculation begins"
        />

        <PolicyField
          section="overtime"
          field="maxDailyOvertime"
          label="Maximum Daily Overtime"
          value={policies.overtime.maxDailyOvertime}
          type="slider"
          unit="hours"
          description="Maximum allowed overtime hours per day"
          min={1}
          max={8}
        />

        <PolicyField
          section="overtime"
          field="overtimeApprovalRequired"
          label="Overtime Approval Required"
          value={policies.overtime.overtimeApprovalRequired}
          type="boolean"
          description="Whether overtime requires prior approval"
        />

        <PolicyField
          section="overtime"
          field="autoCalculateOvertime"
          label="Auto Calculate Overtime"
          value={policies.overtime.autoCalculateOvertime}
          type="boolean"
          description="Automatically calculate overtime based on hours worked"
        />

        <PolicyField
          section="overtime"
          field="weekendOvertimeMultiplier"
          label="Weekend Overtime Multiplier"
          value={policies.overtime.weekendOvertimeMultiplier}
          unit="x"
          description="Pay multiplier for weekend overtime"
        />

        <PolicyField
          section="overtime"
          field="holidayOvertimeMultiplier"
          label="Holiday Overtime Multiplier"
          value={policies.overtime.holidayOvertimeMultiplier}
          unit="x"
          description="Pay multiplier for holiday overtime"
        />
      </div>
    </div>
  );

  const renderCompliancePolicies = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Compliance & Legal Policies</h2>
          <p className="text-[#666666] text-sm mt-1">Ensure compliance with local labor laws and regulations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield size={16} className="text-green-600" />
          <span className="text-green-600 text-sm font-medium">Compliant with local laws</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PolicyField
          section="compliance"
          field="laborLawCompliance"
          label="Labor Law Compliance"
          value={policies.compliance.laborLawCompliance}
          type="boolean"
          description="Ensure all policies comply with local labor laws"
        />

        <PolicyField
          section="compliance"
          field="weeklyOffMandatory"
          label="Weekly Off Mandatory"
          value={policies.compliance.weeklyOffMandatory}
          type="boolean"
          description="Ensure employees get mandatory weekly off"
        />

        <PolicyField
          section="compliance"
          field="maxWeeklyHours"
          label="Maximum Weekly Hours"
          value={policies.compliance.maxWeeklyHours}
          type="slider"
          unit="hours"
          description="Maximum working hours allowed per week"
          min={40}
          max={60}
        />

        <PolicyField
          section="compliance"
          field="nightShiftRegulations"
          label="Night Shift Regulations"
          value={policies.compliance.nightShiftRegulations}
          type="boolean"
          description="Apply special regulations for night shift workers"
        />

        <PolicyField
          section="compliance"
          field="femaleNightShiftPolicy"
          label="Female Night Shift Policy"
          value={policies.compliance.femaleNightShiftPolicy}
          type="boolean"
          description="Special safety policies for female night shift workers"
        />

        <PolicyField
          section="compliance"
          field="pregnancyLeavePolicy"
          label="Pregnancy Leave Policy"
          value={policies.compliance.pregnancyLeavePolicy}
          type="boolean"
          description="Enable maternity and pregnancy-related leave policies"
        />
      </div>
    </div>
  );

  // Layout: Neumorphic Form UI with Toggle Switches and Sliders
  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Policy & Rules Setup</h1>
        <p className="text-[#666666]">Configure attendance policies with interactive controls</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600">24</h3>
              <p className="text-[#666666] text-sm">Active Policies</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
              <CheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#05A7CC]">8</h3>
              <p className="text-[#666666] text-sm">Auto-Calculated</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-[#05A7CC] to-[#048ba8]">
              <Sliders size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-yellow-600">3</h3>
              <p className="text-[#666666] text-sm">Need Review</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600">
              <AlertCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="neu-card p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-600">100%</h3>
              <p className="text-[#666666] text-sm">Compliance</p>
            </div>
            <div className="neu-small p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
              <Shield size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="neu-card rounded-2xl p-6 mb-8">
        <div className="flex space-x-1 neu-card-inset rounded-xl p-1">
          {[
            { id: 'general', label: 'General Policies', icon: Settings },
            { id: 'overtime', label: 'Overtime Rules', icon: Clock },
            { id: 'compliance', label: 'Compliance', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'neu-primary text-white shadow-lg'
                    : 'text-[#666666] hover:text-[#EF5226]'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="neu-card rounded-2xl p-8">
        {activeTab === 'general' && renderGeneralPolicies()}
        {activeTab === 'overtime' && renderOvertimePolicies()}
        {activeTab === 'compliance' && renderCompliancePolicies()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button className="neu-button px-8 py-3 rounded-xl hover:text-[#666666] transition-colors">
          Reset to Defaults
        </button>
        <button className="neu-primary px-8 py-3 rounded-xl hover:shadow-xl transition-all">
          Save All Changes
        </button>
        <button 
          onClick={() => onNavigate('attendance-reports')}
          className="neu-secondary px-8 py-3 rounded-xl hover:shadow-xl transition-all"
        >
          View Policy Impact
        </button>
      </div>

      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .slider::-webkit-slider-track {
          background: #E8EBEF;
          height: 8px;
          border-radius: 4px;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: #EF5226;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-track {
          background: #E8EBEF;
          height: 8px;
          border-radius: 4px;
        }
        .slider::-moz-range-thumb {
          background: #EF5226;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};