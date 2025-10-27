import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Trash2, Upload, FileText, Image, File, Grid, List } from 'lucide-react';

const attachments = [
  {
    id: '1',
    name: 'Sprint_Planning_Q1_2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'John Doe',
    uploadDate: '2024-01-15',
    meetingTitle: 'Weekly Team Standup',
    meetingDate: '2024-01-15',
    category: 'document',
    thumbnail: '/placeholder-pdf.jpg'
  },
  {
    id: '2',
    name: 'Team_Progress_Report.xlsx',
    type: 'Excel',
    size: '1.8 MB',
    uploadedBy: 'Jane Smith',
    uploadDate: '2024-01-15',
    meetingTitle: 'Weekly Team Standup',
    meetingDate: '2024-01-15',
    category: 'document',
    thumbnail: '/placeholder-excel.jpg'
  },
  {
    id: '3',
    name: 'Product_Roadmap_Presentation.pptx',
    type: 'PowerPoint',
    size: '5.2 MB',
    uploadedBy: 'Alice Johnson',
    uploadDate: '2024-01-16',
    meetingTitle: 'Product Planning Q1 2024',
    meetingDate: '2024-01-16',
    category: 'presentation',
    thumbnail: '/placeholder-ppt.jpg'
  },
  {
    id: '4',
    name: 'UI_Mockups_Dashboard.png',
    type: 'Image',
    size: '890 KB',
    uploadedBy: 'Bob Brown',
    uploadDate: '2024-01-16',
    meetingTitle: 'Product Planning Q1 2024',
    meetingDate: '2024-01-16',
    category: 'image',
    thumbnail: '/placeholder-image.jpg'
  },
  {
    id: '5',
    name: 'HR_Policy_Updates.docx',
    type: 'Word',
    size: '1.2 MB',
    uploadedBy: 'Sarah Wilson',
    uploadDate: '2024-01-14',
    meetingTitle: 'HR Policy Review',
    meetingDate: '2024-01-14',
    category: 'document',
    thumbnail: '/placeholder-doc.jpg'
  },
  {
    id: '6',
    name: 'Budget_Analysis_Charts.pdf',
    type: 'PDF',
    size: '3.1 MB',
    uploadedBy: 'Carol Davis',
    uploadDate: '2024-01-17',
    meetingTitle: 'Marketing Campaign Review',
    meetingDate: '2024-01-17',
    category: 'document',
    thumbnail: '/placeholder-pdf.jpg'
  },
  {
    id: '7',
    name: 'Team_Photo_Retreat.jpg',
    type: 'Image',
    size: '2.5 MB',
    uploadedBy: 'Mike Johnson',
    uploadDate: '2024-01-13',
    meetingTitle: 'Client Project Kickoff',
    meetingDate: '2024-01-13',
    category: 'image',
    thumbnail: '/placeholder-image.jpg'
  },
  {
    id: '8',
    name: 'Meeting_Recording_Audio.mp3',
    type: 'Audio',
    size: '45.2 MB',
    uploadedBy: 'David Miller',
    uploadDate: '2024-01-16',
    meetingTitle: 'Product Planning Q1 2024',
    meetingDate: '2024-01-16',
    category: 'media',
    thumbnail: '/placeholder-audio.jpg'
  }
];

export const MeetingAttachments = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date');

  const filteredAttachments = attachments.filter(attachment => {
    const matchesSearch = attachment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attachment.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attachment.meetingTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attachment.category === selectedCategory;
    const matchesMeeting = selectedMeeting === 'all' || attachment.meetingTitle === selectedMeeting;
    
    return matchesSearch && matchesCategory && matchesMeeting;
  });

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-[#EF5226]" />;
      case 'image':
      case 'jpg':
      case 'png':
        return <Image className="w-8 h-8 text-[#4CAF50]" />;
      default:
        return <File className="w-8 h-8 text-[#666666]" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'document':
        return 'bg-[#05A7CC] text-white';
      case 'presentation':
        return 'bg-[#9C27B0] text-white';
      case 'image':
        return 'bg-[#4CAF50] text-white';
      case 'media':
        return 'bg-[#FF9800] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const uniqueMeetings = [...new Set(attachments.map(att => att.meetingTitle))];

  const sortedAttachments = [...filteredAttachments].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'date':
      default:
        return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      {/* Header */}
      <div className="neu-card p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Meeting Attachments</h1>
            <p className="text-[#666666]">Browse and manage all meeting documents and files</p>
          </div>
          <button 
            onClick={() => onNavigate('new-meeting')}
            className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <Upload className="w-5 h-5" />
            <span className="font-medium">Upload Files</span>
          </button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="neu-card p-6 rounded-3xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="neu-input p-4 rounded-2xl flex items-center">
                <Search className="text-[#666666] mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Search files by name, uploader, or meeting..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="all">All Categories</option>
                  <option value="document">Documents</option>
                  <option value="presentation">Presentations</option>
                  <option value="image">Images</option>
                  <option value="media">Media</option>
                </select>
              </div>
            </div>

            {/* Meeting Filter */}
            <div>
              <div className="neu-input p-4 rounded-2xl">
                <select
                  value={selectedMeeting}
                  onChange={(e) => setSelectedMeeting(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#333333]"
                >
                  <option value="all">All Meetings</option>
                  {uniqueMeetings.map(meeting => (
                    <option key={meeting} value={meeting}>{meeting}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
                <option value="type">Sort by Type</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="neu-card-inset p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' 
                    ? 'neu-primary text-white' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#333333] mb-2">{attachments.length}</div>
          <div className="text-[#666666]">Total Files</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#05A7CC] mb-2">
            {attachments.filter(att => att.category === 'document').length}
          </div>
          <div className="text-[#666666]">Documents</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">
            {attachments.filter(att => att.category === 'image').length}
          </div>
          <div className="text-[#666666]">Images</div>
        </div>
        <div className="neu-card p-6 rounded-3xl text-center">
          <div className="text-3xl font-bold text-[#9C27B0] mb-2">
            {(attachments.reduce((total, att) => total + parseFloat(att.size), 0)).toFixed(1)} MB
          </div>
          <div className="text-[#666666]">Total Size</div>
        </div>
      </div>

      {/* Files Display */}
      <div className="neu-card p-8 rounded-3xl">
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAttachments.map((attachment) => (
              <div key={attachment.id} className="neu-small p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
                <div className="space-y-4">
                  {/* File Icon/Thumbnail */}
                  <div className="neu-card-inset w-full h-32 rounded-2xl flex items-center justify-center">
                    {getFileIcon(attachment.type)}
                  </div>

                  {/* File Info */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getCategoryColor(attachment.category)}`}>
                        {attachment.category.toUpperCase()}
                      </div>
                      <span className="text-xs text-[#666666]">{attachment.size}</span>
                    </div>
                    
                    <h3 className="font-bold text-[#333333] mb-2 truncate" title={attachment.name}>
                      {attachment.name}
                    </h3>
                    
                    <div className="text-sm text-[#666666] space-y-1">
                      <div>From: {attachment.meetingTitle}</div>
                      <div>By: {attachment.uploadedBy}</div>
                      <div>{new Date(attachment.uploadDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 neu-button p-3 rounded-2xl text-[#05A7CC] hover:text-[#048ba8] transition-colors">
                      <Eye className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="flex-1 neu-button p-3 rounded-2xl text-[#666666] hover:text-[#333333] transition-colors">
                      <Download className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="flex-1 neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
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
                <div className="col-span-4">File Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Uploaded By</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {sortedAttachments.map((attachment) => (
              <div key={attachment.id} className="neu-small p-4 rounded-2xl hover:scale-105 transition-transform duration-200">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="neu-card-inset p-2 rounded-lg">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div>
                      <div className="font-medium text-[#333333] truncate">{attachment.name}</div>
                      <div className="text-sm text-[#666666] truncate">{attachment.meetingTitle}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className={`neu-small px-3 py-1 rounded-xl text-xs font-medium ${getCategoryColor(attachment.category)} inline-block`}>
                      {attachment.type}
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-[#333333] font-medium">{attachment.size}</div>
                  
                  <div className="col-span-2 text-[#666666]">{attachment.uploadedBy}</div>
                  
                  <div className="col-span-1 text-[#666666] text-sm">
                    {new Date(attachment.uploadDate).toLocaleDateString()}
                  </div>
                  
                  <div className="col-span-1 flex items-center space-x-2">
                    <button className="neu-button p-2 rounded-xl text-[#05A7CC] hover:text-[#048ba8] transition-colors">
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

        {sortedAttachments.length === 0 && (
          <div className="text-center py-12">
            <div className="neu-card-inset p-8 rounded-3xl inline-block">
              <Upload className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#333333] mb-2">No attachments found</h3>
              <p className="text-[#666666]">Try adjusting your search filters or upload new files.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedAttachments.length > 0 && (
        <div className="neu-card p-6 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="text-[#666666]">
              Showing {sortedAttachments.length} of {attachments.length} files
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