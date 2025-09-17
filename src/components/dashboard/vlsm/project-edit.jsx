import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2, Calendar, Users, Tag, FileText, AlertCircle } from 'lucide-react';

const ProjectEdit = ({ onNavigate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [project, setProject] = useState({
    id: '',
    name: '',
    description: '',
    status: 'planning',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    priority: 'medium',
    team: [],
    tags: [],
    budget: 0,
    progress: 0,
    notes: ''
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch project data if editing
  useEffect(() => {
    if (!isNew) {
      // Simulate API call
      const fetchProject = async () => {
        try {
          setLoading(true);
          // Mock data for now
          setTimeout(() => {
            setProject({
              id,
              name: `Project ${id}`,
              description: 'Project description goes here...',
              status: 'in-progress',
              startDate: '2024-01-01',
              endDate: '2024-12-31',
              priority: 'high',
              team: ['User 1', 'User 2'],
              tags: ['Web', 'Mobile'],
              budget: 50000,
              progress: 45,
              notes: 'Important notes about the project...'
            });
            setLoading(false);
          }, 500);
        } catch (err) {
          setError('Failed to load project');
          setLoading(false);
        }
      };
      
      fetchProject();
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to project list or details
      onNavigate('all-projects');
    } catch (err) {
      setError('Failed to save project. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        setSaving(true);
        onNavigate('all-projects');
      } catch (err) {
        setError('Failed to delete project');
        console.error(err);
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => onNavigate('all-projects')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
        
        <div className="flex space-x-3">
          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </button>
          )}
          
          <button
            type="submit"
            form="project-form"
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isNew ? 'Create New Project' : 'Edit Project'}
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={project.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={project.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
                min={project.startDate}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={project.priority}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={project.budget}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={project.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the project..."
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={project.notes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Any additional notes..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEdit;
