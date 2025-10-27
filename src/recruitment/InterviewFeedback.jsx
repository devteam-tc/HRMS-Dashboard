import React, { useState } from 'react';
import { ArrowLeft, Save, Star, User, CheckCircle, XCircle, FileText, Plus, X } from 'lucide-react';

export const InterviewFeedback = ({ interviewId, onNavigate }) => {
  const [formData, setFormData] = useState({
    overallRating: 0,
    technicalSkills: 0,
    communication: 0,
    problemSolving: 0,
    culturalFit: 0,
    recommendation: '',
    summary: '',
    strengths: [''],
    areasForImprovement: [''],
    specificFeedback: '',
    nextSteps: '',
    attachments: []
  });

  // Mock interview data
  const interview = {
    id: interviewId || 1,
    candidateName: 'Alice Johnson',
    jobTitle: 'Senior Software Engineer',
    type: 'Technical Interview',
    date: '2024-01-25',
    time: '3:00 PM',
    interviewer: 'Michael Chen'
  };

  const recommendations = [
    { value: 'hire', label: 'Recommend for Hire', color: 'text-green-600 bg-green-50' },
    { value: 'maybe', label: 'Maybe - Need More Assessment', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'no-hire', label: 'Do Not Recommend', color: 'text-red-600 bg-red-50' }
  ];

  const handleRatingChange = (category, rating) => {
    setFormData(prev => ({
      ...prev,
      [category]: rating
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const feedbackData = {
      ...formData,
      interviewId: interview.id,
      interviewer: interview.interviewer,
      submittedDate: new Date().toISOString(),
      strengths: formData.strengths.filter(s => s.trim()),
      areasForImprovement: formData.areasForImprovement.filter(a => a.trim())
    };

    console.log('Submitting feedback:', feedbackData);
    
    // Navigate back to interview details
    onNavigate('interview-details', { interviewId: interview.id });
  };

  const averageRating = (formData.technicalSkills + formData.communication + formData.problemSolving + formData.culturalFit) / 4;

  return (
    <div className="p-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('interview-details', { interviewId: interview.id })}
            className="neu-button p-3 rounded-2xl mr-4 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#666666]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Interview Feedback</h1>
            <p className="text-[#666666]">{interview.candidateName} - {interview.type}</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="neu-primary px-6 py-3 rounded-2xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
        >
          <Save size={20} />
          <span>Submit Feedback</span>
        </button>
      </div>

      {/* Interview Summary */}
      <div className="neu-card p-6 rounded-3xl mb-8">
        <div className="flex items-center space-x-4">
          <div className="neu-small w-12 h-12 rounded-3xl flex items-center justify-center">
            <User size={24} className="text-[#666666]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#333333] mb-1">{interview.candidateName}</h3>
            <p className="text-[#EF5226] font-medium mb-1">{interview.jobTitle}</p>
            <p className="text-[#666666] text-sm">{interview.type} • {interview.date} at {interview.time}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Assessment */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Overall Assessment</h3>
              
              <div className="space-y-6">
                {/* Overall Rating */}
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Overall Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange('overallRating', rating)}
                        className="transition-colors duration-200"
                      >
                        <Star
                          size={32}
                          className={rating <= formData.overallRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                    <span className="text-[#666666] ml-4">
                      {formData.overallRating > 0 ? `${formData.overallRating}/5` : 'No rating'}
                    </span>
                  </div>
                </div>

                {/* Recommendation */}
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Recommendation</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.map((rec) => (
                      <button
                        key={rec.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, recommendation: rec.value }))}
                        className={`neu-small p-4 rounded-2xl transition-all duration-200 text-left ${
                          formData.recommendation === rec.value ? 'ring-2 ring-[#EF5226]' : 'hover:shadow-lg'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${rec.color}`}>
                          {rec.value === 'hire' && <CheckCircle size={20} />}
                          {rec.value === 'maybe' && <Star size={20} />}
                          {rec.value === 'no-hire' && <XCircle size={20} />}
                        </div>
                        <p className="text-[#333333] font-medium">{rec.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Ratings */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Detailed Assessment</h3>
              
              <div className="space-y-6">
                {[
                  { key: 'technicalSkills', label: 'Technical Skills' },
                  { key: 'communication', label: 'Communication' },
                  { key: 'problemSolving', label: 'Problem Solving' },
                  { key: 'culturalFit', label: 'Cultural Fit' }
                ].map((category) => (
                  <div key={category.key}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[#333333] font-medium">{category.label}</label>
                      <span className="text-[#666666]">
                        {formData[category.key] > 0 ? `${formData[category.key]}/5` : 'No rating'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(category.key, rating)}
                          className="transition-colors duration-200"
                        >
                          <Star
                            size={24}
                            className={rating <= formData[category.key] ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Average Rating Display */}
                <div className="pt-4 border-t border-[#E8EBEF]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#333333] font-medium">Average Rating:</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            size={20}
                            className={rating <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-[#333333] font-medium">
                        {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Written Feedback */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Written Feedback</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#333333] font-medium mb-3">Summary</label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none resize-none"
                    placeholder="Provide an overall summary of the interview and candidate performance..."
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-3">Specific Feedback</label>
                  <textarea
                    value={formData.specificFeedback}
                    onChange={(e) => setFormData(prev => ({ ...prev, specificFeedback: e.target.value }))}
                    rows={6}
                    className="neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none resize-none"
                    placeholder="Provide detailed feedback on performance, answers to questions, technical skills demonstrated..."
                  />
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Strengths</h3>
              
              <div className="space-y-4">
                {formData.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                    <input
                      type="text"
                      value={strength}
                      onChange={(e) => handleArrayFieldChange('strengths', index, e.target.value)}
                      className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="Enter a strength demonstrated by the candidate"
                    />
                    {formData.strengths.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('strengths', index)}
                        className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('strengths')}
                  className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#05A7CC] hover:shadow-md transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Strength</span>
                </button>
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Areas for Improvement</h3>
              
              <div className="space-y-4">
                {formData.areasForImprovement.map((area, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="neu-small w-6 h-6 rounded-full flex items-center justify-center">
                      <XCircle size={14} className="text-yellow-500" />
                    </div>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => handleArrayFieldChange('areasForImprovement', index, e.target.value)}
                      className="neu-input flex-1 px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none"
                      placeholder="Enter an area where the candidate could improve"
                    />
                    {formData.areasForImprovement.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('areasForImprovement', index)}
                        className="neu-button p-3 rounded-2xl text-red-500 hover:shadow-md transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('areasForImprovement')}
                  className="neu-button px-4 py-3 rounded-2xl flex items-center space-x-2 text-[#EF5226] hover:shadow-md transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Area for Improvement</span>
                </button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="neu-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Next Steps</h3>
              
              <textarea
                value={formData.nextSteps}
                onChange={(e) => setFormData(prev => ({ ...prev, nextSteps: e.target.value }))}
                rows={4}
                className="neu-input w-full px-4 py-3 text-[#333333] placeholder-[#666666] focus:outline-none resize-none"
                placeholder="Recommend next steps in the hiring process for this candidate..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Summary */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Overall Rating:</span>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="text-[#333333] font-medium">
                      {formData.overallRating > 0 ? `${formData.overallRating}/5` : 'Not rated'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Average Score:</span>
                  <span className="text-[#333333] font-medium">
                    {averageRating > 0 ? `${averageRating.toFixed(1)}/5` : 'Not rated'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Recommendation:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.recommendation === 'hire' ? 'text-green-600 bg-green-50' :
                    formData.recommendation === 'maybe' ? 'text-yellow-600 bg-yellow-50' :
                    formData.recommendation === 'no-hire' ? 'text-red-600 bg-red-50' :
                    'text-gray-600 bg-gray-50'
                  }`}>
                    {formData.recommendation ? 
                      recommendations.find(r => r.value === formData.recommendation)?.label.split(' - ')[0] || 'Not set' 
                      : 'Not set'}
                  </span>
                </div>
              </div>
            </div>

            {/* Interview Info */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Interview Information</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Candidate:</span>
                  <span className="text-[#333333]">{interview.candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Position:</span>
                  <span className="text-[#333333]">{interview.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Interview Type:</span>
                  <span className="text-[#333333]">{interview.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Date:</span>
                  <span className="text-[#333333]">{interview.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Interviewer:</span>
                  <span className="text-[#333333]">{interview.interviewer}</span>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Attachments</h3>
              
              <div className="space-y-3">
                <button
                  type="button"
                  className="neu-button w-full px-4 py-3 rounded-2xl flex items-center justify-center space-x-2 text-[#333333] hover:text-[#05A7CC] transition-all duration-200"
                >
                  <FileText size={16} />
                  <span>Add File</span>
                </button>
                
                {formData.attachments.length === 0 && (
                  <p className="text-[#666666] text-sm text-center">No attachments added</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="neu-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button
                  type="submit"
                  className="neu-primary w-full px-4 py-3 rounded-2xl text-white hover:shadow-lg transition-all duration-200"
                >
                  Submit Feedback
                </button>
                <button
                  type="button"
                  className="neu-button w-full px-4 py-3 rounded-2xl text-[#333333] hover:text-[#666666] transition-all duration-200"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};