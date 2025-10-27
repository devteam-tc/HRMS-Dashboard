import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Download, Trash2, Image as ImageIcon, Grid, List, Tag, Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const images = [
  {
    id: '1',
    name: 'Foundation_Pour_Phase1.jpg',
    projectName: 'Downtown Office Complex',
    projectId: '1',
    uploadedBy: 'John Doe',
    uploadDate: '2024-01-18',
    size: '2.4 MB',
    tags: ['foundation', 'concrete', 'phase1'],
    description: 'First phase of foundation concrete pouring completed',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '2',
    name: 'Steel_Framework_Progress.jpg',
    projectName: 'Downtown Office Complex',
    projectId: '1',
    uploadedBy: 'Alice Johnson',
    uploadDate: '2024-01-17',
    size: '3.1 MB',
    tags: ['steel', 'framework', 'structural'],
    description: 'Steel framework installation progress on floors 5-8',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '3',
    name: 'Site_Safety_Inspection.jpg',
    projectName: 'Residential Tower Phase 2',
    projectId: '2',
    uploadedBy: 'Bob Smith',
    uploadDate: '2024-01-16',
    size: '1.8 MB',
    tags: ['safety', 'inspection', 'compliance'],
    description: 'Weekly safety inspection documentation',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '4',
    name: 'Exterior_Cladding_Detail.jpg',
    projectName: 'Shopping Mall Renovation',
    projectId: '3',
    uploadedBy: 'Carol Davis',
    uploadDate: '2024-01-15',
    size: '2.7 MB',
    tags: ['exterior', 'cladding', 'renovation'],
    description: 'Detailed view of new exterior cladding installation',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '5',
    name: 'Interior_MEP_Systems.jpg',
    projectName: 'Industrial Warehouse',
    projectId: '4',
    uploadedBy: 'David Brown',
    uploadDate: '2024-01-14',
    size: '2.2 MB',
    tags: ['interior', 'mep', 'electrical', 'plumbing'],
    description: 'MEP systems installation in warehouse main area',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '6',
    name: 'Quality_Control_Check.jpg',
    projectName: 'Medical Center Expansion',
    projectId: '5',
    uploadedBy: 'Emma Garcia',
    uploadDate: '2024-01-13',
    size: '1.9 MB',
    tags: ['quality', 'control', 'inspection'],
    description: 'Quality control inspection of medical equipment installation',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '7',
    name: 'Site_Progress_Aerial.jpg',
    projectName: 'University Library',
    projectId: '6',
    uploadedBy: 'Frank Wilson',
    uploadDate: '2024-01-12',
    size: '4.5 MB',
    tags: ['aerial', 'progress', 'overview'],
    description: 'Aerial view of completed university library project',
    thumbnail: '/placeholder-construction.jpg'
  },
  {
    id: '8',
    name: 'Material_Delivery_Log.jpg',
    projectName: 'Downtown Office Complex',
    projectId: '1',
    uploadedBy: 'John Doe',
    uploadDate: '2024-01-11',
    size: '1.5 MB',
    tags: ['materials', 'delivery', 'logistics'],
    description: 'Material delivery documentation and verification',
    thumbnail: '/placeholder-construction.jpg'
  }
];

export const UploadedImages = ({ onNavigate, projectId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(projectId || 'all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === 'all' || image.projectId === selectedProject;
    const matchesTag = selectedTag === 'all' || image.tags.includes(selectedTag);
    
    return matchesSearch && matchesProject && matchesTag;
  });

  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      case 'uploader':
        return a.uploadedBy.localeCompare(b.uploadedBy);
      default:
        return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  // Get unique projects properly by creating a Map to avoid duplicate keys
  const projectMap = new Map();
  images.forEach(img => {
    if (!projectMap.has(img.projectId)) {
      projectMap.set(img.projectId, { id: img.projectId, name: img.projectName });
    }
  });
  const uniqueProjects = Array.from(projectMap.values());
  const uniqueTags = [...new Set(images.flatMap(img => img.tags))];

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Uploaded Images</h1>
            <p className="text-[#666666]">Browse and manage all project site images</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={() => onNavigate('uploaded-images-upload')}
              className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Upload Images</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="neu-input p-4 rounded-2xl flex items-center">
                <Search className="text-[#666666] mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Search images by name, description, or uploader..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                />
              </div>
            </div>

            {/* Project Filter */}
            <div>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="all">All Projects</option>
                  {uniqueProjects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="all">All Tags</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="neu-input p-3 rounded-2xl">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-[#333333]"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="uploader">Sort by Uploader</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{images.length}</div>
          <div className="text-[#666666]">Total Images</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {uniqueProjects.length}
          </div>
          <div className="text-[#666666]">Projects</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {(images.reduce((total, img) => total + parseFloat(img.size), 0)).toFixed(1)} MB
          </div>
          <div className="text-[#666666]">Total Size</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">
            {uniqueTags.length}
          </div>
          <div className="text-[#666666]">Unique Tags</div>
        </div>
      </div>

      {/* Images Display */}
      <div className="neu-card p-8 rounded-3xl">
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedImages.map((image) => (
              <div key={image.id} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
                {/* Image Thumbnail */}
                <div className="neu-card-inset h-48 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br from-[#E8EBEF] to-[#d1d9e6]">
                  <ImageIcon className="w-12 h-12 text-[#666666]" />
                </div>

                {/* Image Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1 truncate" title={image.name}>
                      {image.name}
                    </h3>
                    <p className="text-sm text-[#666666] truncate">{image.projectName}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-[#666666]" />
                      <span className="text-[#666666]">{image.uploadedBy}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3 text-[#666666]" />
                      <span className="text-[#666666]">{new Date(image.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-[#666666]">Size: {image.size}</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {image.tags.slice(0, 3).map((tag, index) => (
                      <div key={index} className="neu-card-inset px-2 py-1 rounded-lg">
                        <span className="text-xs text-[#05A7CC] font-medium">{tag}</span>
                      </div>
                    ))}
                    {image.tags.length > 3 && (
                      <div className="neu-card-inset px-2 py-1 rounded-lg">
                        <span className="text-xs text-[#666666]">+{image.tags.length - 3}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onNavigate('uploaded-images-single', image.id)}
                      className="flex-1 neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                    >
                      <Eye className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="flex-1 neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors">
                      <Download className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="flex-1 neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            <div className="neu-small p-4 rounded-2xl">
              <div className="grid grid-cols-12 gap-4 font-medium text-[#666666] text-sm">
                <div className="col-span-4">Image Name</div>
                <div className="col-span-2">Project</div>
                <div className="col-span-2">Uploaded By</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-1">Tags</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {sortedImages.map((image) => (
              <div key={image.id} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="neu-card-inset w-12 h-12 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-[#666666]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#333333] truncate">{image.name}</div>
                      <div className="text-sm text-[#666666] truncate">{image.description}</div>
                    </div>
                  </div>

                  <div className="col-span-2 text-[#333333]">{image.projectName}</div>

                  <div className="col-span-2 flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white text-xs">
                        {image.uploadedBy.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[#333333] text-sm">{image.uploadedBy}</span>
                  </div>

                  <div className="col-span-1 text-[#666666] text-sm">
                    {new Date(image.uploadDate).toLocaleDateString()}
                  </div>

                  <div className="col-span-1 text-[#333333] font-medium">{image.size}</div>

                  <div className="col-span-1">
                    <div className="flex flex-wrap gap-1">
                      {image.tags.slice(0, 2).map((tag, index) => (
                        <div key={index} className="neu-card-inset px-2 py-1 rounded-lg">
                          <span className="text-xs text-[#05A7CC]">{tag}</span>
                        </div>
                      ))}
                      {image.tags.length > 2 && (
                        <span className="text-xs text-[#666666]">+{image.tags.length - 2}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center space-x-1">
                    <button 
                      onClick={() => onNavigate('uploaded-images-single', image.id)}
                      className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="neu-button p-2 rounded-xl text-[#666666] hover:text-[#333333] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="neu-button p-2 rounded-xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedImages.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <ImageIcon className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No images found</h3>
              <p className="text-[#666666]">Try adjusting your search filters or upload new images.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedImages.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {sortedImages.length} of {images.length} images
            </div>
            <div className="flex items-center space-x-2">
              <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#333333]">
                Previous
              </button>
              <div className="neu-card-inset px-4 py-2 rounded-xl">
                <span className="font-medium text-[#333333]">1</span>
              </div>
              <button className="neu-button px-4 py-2 rounded-xl text-[#666666] hover:text-[#333333]">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};