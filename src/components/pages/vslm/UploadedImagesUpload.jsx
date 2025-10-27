import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Plus, Tag, Image as ImageIcon, CheckCircle } from 'lucide-react';

const projects = [
  { id: '1', name: 'Downtown Office Complex' },
  { id: '2', name: 'Residential Tower Phase 2' },
  { id: '3', name: 'Shopping Mall Renovation' },
  { id: '4', name: 'Industrial Warehouse' },
  { id: '5', name: 'Medical Center Expansion' },
  { id: '6', name: 'University Library' }
];

export const UploadedImagesUpload = ({ onNavigate, projectId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedProject, setSelectedProject] = useState(projectId || '');
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      tags: [],
      description: '',
      project: selectedProject
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const updateFileField = (fileId, field, value) => {
    setSelectedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, [field]: value } : file
    ));
  };

  const addTag = (fileId, tag) => {
    if (tag.trim()) {
      setSelectedFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, tags: [...new Set([...file.tags, tag.trim().toLowerCase()])] }
          : file
      ));
    }
  };

  const removeTag = (fileId, tagToRemove) => {
    setSelectedFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, tags: file.tags.filter(tag => tag !== tagToRemove) }
        : file
    ));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !selectedProject) return;

    setIsUploading(true);
    
    // Simulate upload progress
    for (const file of selectedFiles) {
      setUploadProgress(prev => ({ ...prev, [file.id]: 0 }));
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
      }
      
      setUploadedFiles(prev => [...prev, file.id]);
    }

    // Reset after completion
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFiles([]);
      setUploadProgress({});
      setUploadedFiles([]);
      // Navigate back to images gallery
      onNavigate('uploaded-images');
    }, 1000);
  };

  const TagInput = ({ fileId, tags }) => {
    const [newTag, setNewTag] = useState('');

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(fileId, newTag);
        setNewTag('');
      }
    };

    return (
      <div>
        <label className="block text-[#333333] font-medium mb-2">Tags</label>
        <div className="neu-input p-3 rounded-2xl">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div key={index} className="neu-small px-3 py-1 rounded-xl flex items-center space-x-2">
                <span className="text-sm text-[#05A7CC]">{tag}</span>
                <button 
                  onClick={() => removeTag(fileId, tag)}
                  className="text-[#EF5226] hover:text-[#d4471f]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add tags (press Enter or comma to add)"
            className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999]"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('uploaded-images')}
              className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Upload Images</h1>
              <p className="text-[#666666]">Upload and organize site construction images</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => onNavigate('uploaded-images')}
              className="neu-button px-6 py-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || !selectedProject || isUploading}
              className={`px-8 py-3 rounded-2xl flex items-center space-x-3 transition-all ${
                selectedFiles.length > 0 && selectedProject && !isUploading
                  ? 'neu-primary hover:scale-105'
                  : 'neu-button text-[#999999] cursor-not-allowed'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span className="font-medium">
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Selection */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Select Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={`p-4 rounded-2xl text-left transition-all ${
                selectedProject === project.id
                  ? 'neu-primary text-white'
                  : 'neu-button text-[#333333] hover:text-[#05A7CC]'
              }`}
            >
              <div className="font-medium">{project.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Upload Files</h3>
        
        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="neu-card-inset p-12 rounded-2xl border-2 border-dashed border-[#d1d9e6] text-center mb-6"
        >
          <Upload className="w-16 h-16 text-[#666666] mx-auto mb-4" />
          <h4 className="text-xl font-medium text-[#333333] mb-2">Drag and drop your images here</h4>
          <p className="text-[#666666] mb-6">or click to browse files</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="neu-button px-8 py-4 rounded-2xl cursor-pointer inline-flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Browse Files</span>
          </label>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-[#333333]">Selected Files ({selectedFiles.length})</h4>
            <div className="space-y-4">
              {selectedFiles.map((file) => (
                <div key={file.id} className="neu-small p-6 rounded-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* File Info */}
                    <div>
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="neu-card-inset p-3 rounded-xl">
                          <ImageIcon className="w-8 h-8 text-[#05A7CC]" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-[#333333] mb-1">{file.name}</h5>
                          <p className="text-sm text-[#666666]">Size: {file.size}</p>
                          {uploadProgress[file.id] !== undefined && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-[#666666]">
                                  {uploadedFiles.includes(file.id) ? 'Uploaded' : 'Uploading...'}
                                </span>
                                <span className="text-sm font-medium text-[#333333]">
                                  {uploadProgress[file.id]}%
                                </span>
                              </div>
                              <div className="neu-card-inset rounded-full h-2 overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${
                                    uploadedFiles.includes(file.id) 
                                      ? 'bg-gradient-to-r from-[#4CAF50] to-[#45a049]'
                                      : 'bg-gradient-to-r from-[#05A7CC] to-[#048ba8]'
                                  }`}
                                  style={{ width: `${uploadProgress[file.id]}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        {!isUploading && (
                          <button 
                            onClick={() => removeFile(file.id)}
                            className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f]"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[#333333] font-medium mb-2">Description</label>
                      <div className="neu-input p-3 rounded-2xl">
                        <textarea
                          value={file.description}
                          onChange={(e) => updateFileField(file.id, 'description', e.target.value)}
                          rows={3}
                          placeholder="Add a description for this image..."
                          className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                          disabled={isUploading}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <TagInput fileId={file.id} tags={file.tags} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Guidelines */}
      <div className="neu-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-[#333333] mb-6">Upload Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-3">📷 Image Requirements</h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Supported formats: JPG, PNG, GIF, WebP</li>
              <li>• Maximum file size: 10 MB per image</li>
              <li>• Recommended resolution: 1920x1080 or higher</li>
              <li>• Up to 20 images per upload session</li>
            </ul>
          </div>
          
          <div className="neu-small p-6 rounded-2xl">
            <h4 className="font-bold text-[#333333] mb-3">🏷️ Tagging Best Practices</h4>
            <ul className="space-y-2 text-[#666666]">
              <li>• Use descriptive tags (foundation, steel, concrete)</li>
              <li>• Include phase information (phase1, phase2)</li>
              <li>• Add safety-related tags if applicable</li>
              <li>• Use consistent naming conventions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {uploadedFiles.length > 0 && uploadedFiles.length === selectedFiles.length && (
        <div className="neu-card p-8 rounded-3xl text-center">
          <div className="neu-small w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <h3 className="text-2xl font-bold text-[#333333] mb-2">Upload Complete!</h3>
          <p className="text-[#666666]">All {uploadedFiles.length} images have been uploaded successfully.</p>
        </div>
      )}
    </div>
  );
};