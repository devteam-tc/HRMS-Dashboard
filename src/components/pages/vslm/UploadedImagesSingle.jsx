import React, { useState } from 'react';
import { ArrowLeft, Download, Edit, Trash2, Tag, Calendar, User, MapPin, MessageSquare, Send, Heart, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const imageData = {
  id: '1',
  name: 'Foundation_Pour_Phase1.jpg',
  projectName: 'Downtown Office Complex',
  projectId: '1',
  uploadedBy: 'John Doe',
  uploadDate: '2024-01-18',
  size: '2.4 MB',
  dimensions: '1920x1080',
  format: 'JPEG',
  tags: ['foundation', 'concrete', 'phase1', 'structural'],
  description: 'First phase of foundation concrete pouring completed. Quality inspection passed with all specifications met.',
  location: 'Section A, Level B1-B2',
  camera: 'Canon EOS R5',
  settings: 'ISO 200, f/8, 1/125s',
  thumbnail: '/placeholder-construction.jpg',
  comments: [
    {
      id: '1',
      author: 'Alice Johnson',
      role: 'Site Engineer',
      time: '2 hours ago',
      content: 'Great progress on the foundation work. The concrete pour looks excellent.',
      likes: 3
    },
    {
      id: '2',
      author: 'Bob Smith',  
      role: 'Safety Officer',
      time: '1 hour ago',
      content: 'All safety protocols were followed during this phase. Good documentation.',
      likes: 2
    }
  ]
};

const taggedPeople = [
  { name: 'Alice Johnson', role: 'Site Engineer' },
  { name: 'Bob Smith', role: 'Safety Officer' },
  { name: 'Carol Davis', role: 'Quality Inspector' }
];

export const UploadedImagesSingle = ({ imageId, onNavigate }) => {
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(12);

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleTagPerson = (person) => {
    console.log('Tagging person:', person);
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
              <h1 className="text-3xl font-bold text-[#333333] mb-2">{imageData.name}</h1>
              <p className="text-[#666666]">{imageData.projectName}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
              <Share className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>
            <button className="neu-button px-6 py-3 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
              <span className="font-medium">Download</span>
            </button>
            <button className="neu-primary px-8 py-4 rounded-2xl flex items-center space-x-3 hover:scale-105 transition-transform">
              <Edit className="w-5 h-5" />
              <span className="font-medium">Edit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Image */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Display */}
          <div className="neu-card p-8 rounded-3xl">
            <div className="neu-card-inset h-96 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-[#E8EBEF] to-[#d1d9e6]">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 neu-small rounded-2xl flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-[#666666]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">{imageData.name}</h3>
                <p className="text-[#666666]">{imageData.dimensions} • {imageData.format}</p>
              </div>
            </div>

            {/* Image Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className={`neu-button p-3 rounded-2xl flex items-center space-x-2 transition-colors ${
                    isLiked ? 'text-[#EF5226]' : 'text-[#666666] hover:text-[#EF5226]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{likes}</span>
                </button>
                <button className="neu-button p-3 rounded-2xl flex items-center space-x-2 text-[#666666] hover:text-[#333333] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">{imageData.comments.length}</span>
                </button>
              </div>
              <button className="neu-button p-3 rounded-2xl text-[#EF5226] hover:text-[#d4471f] transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Comments</h3>
            
            {/* Add Comment */}
            <div className="neu-card-inset p-6 rounded-2xl mb-6">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-[#05A7CC] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="neu-input p-4 rounded-2xl mb-3">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full bg-transparent outline-none text-[#333333] placeholder-[#999999] resize-none"
                    />
                  </div>
                  <button 
                    onClick={handleAddComment}
                    className="neu-primary px-6 py-2 rounded-2xl flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post Comment</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {imageData.comments.map((comment) => (
                <div key={comment.id} className="neu-small p-6 rounded-2xl">
                  <div className="flex space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-[#05A7CC] text-white">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-[#333333]">{comment.author}</span>
                        <span className="text-sm text-[#05A7CC]">{comment.role}</span>
                        <span className="text-sm text-[#666666]">{comment.time}</span>
                      </div>
                      <p className="text-[#333333] mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button className="text-sm text-[#666666] hover:text-[#EF5226] transition-colors flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-sm text-[#666666] hover:text-[#05A7CC] transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Image Details */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Image Details</h3>
            
            <div className="space-y-4">
              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="w-4 h-4 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Uploaded by</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-[#05A7CC] text-white text-sm">
                      {imageData.uploadedBy.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[#666666]">{imageData.uploadedBy}</span>
                </div>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-4 h-4 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Upload Date</span>
                </div>
                <p className="text-[#666666]">{new Date(imageData.uploadDate).toLocaleDateString()}</p>
              </div>

              <div className="neu-small p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="w-4 h-4 text-[#05A7CC]" />
                  <span className="font-medium text-[#333333]">Location</span>
                </div>
                <p className="text-[#666666]">{imageData.location}</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Technical Info</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#666666]">File Size</span>
                <span className="font-medium text-[#333333]">{imageData.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Dimensions</span>
                <span className="font-medium text-[#333333]">{imageData.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Format</span>
                <span className="font-medium text-[#333333]">{imageData.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Camera</span>
                <span className="font-medium text-[#333333]">{imageData.camera}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Settings</span>
                <span className="font-medium text-[#333333]">{imageData.settings}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {imageData.tags.map((tag, index) => (
                <div key={index} className="neu-small px-3 py-2 rounded-xl flex items-center space-x-2">
                  <Tag className="w-3 h-3 text-[#05A7CC]" />
                  <span className="text-sm font-medium text-[#05A7CC]">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Description</h3>
            <div className="neu-card-inset p-4 rounded-2xl">
              <p className="text-[#666666] leading-relaxed">{imageData.description}</p>
            </div>
          </div>

          {/* Tagged People */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Tagged People</h3>
            <div className="space-y-3">
              {taggedPeople.map((person, index) => (
                <div key={index} className="neu-small p-4 rounded-2xl flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-[#05A7CC] text-white text-sm">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-[#333333]">{person.name}</div>
                    <div className="text-sm text-[#666666]">{person.role}</div>
                  </div>
                </div>
              ))}
              <button 
                className="w-full neu-button p-4 rounded-2xl flex items-center justify-center space-x-2 text-[#05A7CC] hover:text-[#048ba8] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Tag Someone</span>
              </button>
            </div>
          </div>

          {/* Related Images */}
          <div className="neu-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Related Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="neu-small rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="h-24 bg-gradient-to-br from-[#E8EBEF] to-[#d1d9e6] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#666666]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};