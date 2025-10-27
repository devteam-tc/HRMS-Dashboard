import React, { useState } from 'react';
import { ArrowLeft, Upload, Check, X, Eye, Download, Plus, Trash2, AlertCircle } from 'lucide-react';

export const DocumentUploads = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState({});

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Resume/CV',
      category: 'personal',
      required: true,
      status: 'approved',
      uploadDate: '2024-01-08',
      reviewer: 'HR Team',
      reviewDate: '2024-01-09',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      comments: 'Document approved successfully'
    },
    {
      id: 2,
      name: 'Photo ID',
      category: 'personal',
      required: true,
      status: 'approved',
      uploadDate: '2024-01-08',
      reviewer: 'HR Team',
      reviewDate: '2024-01-09',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      comments: 'Clear and valid ID document'
    },
    {
      id: 3,
      name: 'Educational Certificates',
      category: 'personal',
      required: true,
      status: 'approved',
      uploadDate: '2024-01-09',
      reviewer: 'HR Team',
      reviewDate: '2024-01-10',
      fileSize: '3.2 MB',
      fileType: 'PDF',
      comments: 'All certificates verified'
    },
    {
      id: 4,
      name: 'Bank Details',
      category: 'financial',
      required: true,
      status: 'pending_review',
      uploadDate: '2024-01-10',
      reviewer: 'Finance Team',
      reviewDate: null,
      fileSize: '1.1 MB',
      fileType: 'PDF',
      comments: 'Under review by finance team'
    },
    {
      id: 5,
      name: 'I-9 Form',
      category: 'legal',
      required: true,
      status: 'completed',
      uploadDate: '2024-01-15',
      reviewer: 'HR Team',
      reviewDate: '2024-01-15',
      fileSize: '0.8 MB',
      fileType: 'PDF',
      comments: 'Form completed and signed'
    },
    {
      id: 6,
      name: 'W-4 Form',
      category: 'legal',
      required: true,
      status: 'completed',
      uploadDate: '2024-01-15',
      reviewer: 'Finance Team',
      reviewDate: '2024-01-15',
      fileSize: '0.6 MB',
      fileType: 'PDF',
      comments: 'Tax form processed'
    },
    {
      id: 7,
      name: 'Emergency Contact Form',
      category: 'personal',
      required: true,
      status: 'completed',
      uploadDate: '2024-01-15',
      reviewer: 'HR Team',
      reviewDate: '2024-01-15',
      fileSize: '0.4 MB',
      fileType: 'PDF',
      comments: 'Contact information updated'
    },
    {
      id: 8,
      name: 'Previous Employment Letter',
      category: 'employment',
      required: false,
      status: 'missing',
      uploadDate: null,
      reviewer: null,
      reviewDate: null,
      fileSize: null,
      fileType: null,
      comments: 'Optional document not provided'
    },
    {
      id: 9,
      name: 'Background Check Authorization',
      category: 'legal',
      required: true,
      status: 'rejected',
      uploadDate: '2024-01-12',
      reviewer: 'HR Team',
      reviewDate: '2024-01-13',
      fileSize: '0.9 MB',
      fileType: 'PDF',
      comments: 'Signature missing. Please re-upload with signature.'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'personal', name: 'Personal', count: documents.filter(d => d.category === 'personal').length },
    { id: 'legal', name: 'Legal', count: documents.filter(d => d.category === 'legal').length },
    { id: 'financial', name: 'Financial', count: documents.filter(d => d.category === 'financial').length },
    { id: 'employment', name: 'Employment', count: documents.filter(d => d.category === 'employment').length }
  ];

  const statusColors = {
    'approved': 'text-green-600',
    'completed': 'text-green-700',
    'pending_review': 'text-orange-600',
    'rejected': 'text-red-600',
    'missing': 'text-gray-600'
  };

  const statusLabels = {
    'approved': 'Approved',
    'completed': 'Completed',
    'pending_review': 'Pending Review',
    'rejected': 'Rejected',
    'missing': 'Missing'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
      case 'completed': return Check;
      case 'rejected': return X;
      case 'pending_review': return AlertCircle;
      default: return Upload;
    }
  };

  const handleFileUpload = (documentId) => {
    // Simulate file upload
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[documentId] + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Update document status after upload
          setDocuments(prevDocs => prevDocs.map(doc => 
            doc.id === documentId 
              ? { ...doc, status: 'pending_review', uploadDate: new Date().toISOString().split('T')[0] }
              : doc
          ));
          const { [documentId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [documentId]: newProgress };
      });
    }, 200);
  };

  const handleDocumentAction = (documentId, action) => {
    switch (action) {
      case 'approve':
        setDocuments(prevDocs => prevDocs.map(doc =>
          doc.id === documentId 
            ? { ...doc, status: 'approved', reviewDate: new Date().toISOString().split('T')[0] }
            : doc
        ));
        break;
      case 'reject':
        setDocuments(prevDocs => prevDocs.map(doc =>
          doc.id === documentId 
            ? { ...doc, status: 'rejected', reviewDate: new Date().toISOString().split('T')[0] }
            : doc
        ));
        break;
      case 'delete':
        setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
        break;
    }
  };

  const addCustomDocument = () => {
    const newDoc = {
      id: Date.now(),
      name: 'Custom Document',
      category: 'personal',
      required: false,
      status: 'missing',
      uploadDate: null,
      reviewer: null,
      reviewDate: null,
      fileSize: null,
      fileType: null,
      comments: 'Custom document added'
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const filteredDocuments = activeCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  const getDocumentStats = () => {
    const total = documents.length;
    const approved = documents.filter(d => d.status === 'approved' || d.status === 'completed').length;
    const pending = documents.filter(d => d.status === 'pending_review').length;
    const missing = documents.filter(d => d.status === 'missing').length;
    const rejected = documents.filter(d => d.status === 'rejected').length;
    
    return { total, approved, pending, missing, rejected };
  };

  const stats = getDocumentStats();

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
            <h1 className="mb-1 text-[#333333]">Document Management</h1>
            <p className="text-[#666666]">Upload and verify onboarding documents</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={addCustomDocument}
            className="neu-button px-4 py-3 rounded-xl text-[#05A7CC] flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Document
          </button>
          <button className="neu-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200">
            <Download className="h-5 w-5" />
            Download All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="neu-card p-4 rounded-2xl text-center">
          <div className="text-2xl font-bold text-[#333333] mb-1">{stats.total}</div>
          <div className="text-sm text-[#666666]">Total Documents</div>
        </div>
        <div className="neu-card p-4 rounded-2xl text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.approved}</div>
          <div className="text-sm text-[#666666]">Approved</div>
        </div>
        <div className="neu-card p-4 rounded-2xl text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats.pending}</div>
          <div className="text-sm text-[#666666]">Pending Review</div>
        </div>
        <div className="neu-card p-4 rounded-2xl text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">{stats.rejected}</div>
          <div className="text-sm text-[#666666]">Rejected</div>
        </div>
        <div className="neu-card p-4 rounded-2xl text-center">
          <div className="text-2xl font-bold text-gray-600 mb-1">{stats.missing}</div>
          <div className="text-sm text-[#666666]">Missing</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Filter */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="font-semibold text-[#333333] mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                  activeCategory === category.id 
                    ? 'neu-primary text-white' 
                    : 'neu-small text-[#333333] hover:scale-102'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeCategory === category.id 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'neu-card-inset text-[#666666]'
                  }`}>
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3 neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#333333]">
              {activeCategory === 'all' ? 'All Documents' : 
               categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-sm text-[#666666]">
              {filteredDocuments.length} documents
            </div>
          </div>

          <div className="space-y-4">
            {filteredDocuments.map((document) => {
              const StatusIcon = getStatusIcon(document.status);
              const isUploading = uploadProgress[document.id] !== undefined;
              
              return (
                <div key={document.id} className="neu-small p-6 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        document.status === 'approved' || document.status === 'completed' ? 'neu-primary' :
                        document.status === 'rejected' ? 'neu-secondary' :
                        document.status === 'pending_review' ? 'bg-orange-100' :
                        'neu-button'
                      }`}>
                        <StatusIcon className={`h-6 w-6 ${
                          document.status === 'approved' || document.status === 'completed' || document.status === 'rejected' ? 'text-white' :
                          document.status === 'pending_review' ? 'text-orange-600' :
                          'text-[#05A7CC]'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-[#333333]">{document.name}</h3>
                          {document.required && (
                            <span className="text-xs px-2 py-1 rounded-full neu-secondary text-white">
                              Required
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full neu-card capitalize ${statusColors[document.status]}`}>
                            {statusLabels[document.status]}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#666666] mb-3">
                          <div>
                            <p><span className="font-medium">Category:</span> {document.category}</p>
                            {document.uploadDate && (
                              <p><span className="font-medium">Uploaded:</span> {document.uploadDate}</p>
                            )}
                          </div>
                          <div>
                            {document.fileSize && (
                              <p><span className="font-medium">Size:</span> {document.fileSize}</p>
                            )}
                            {document.reviewer && (
                              <p><span className="font-medium">Reviewer:</span> {document.reviewer}</p>
                            )}
                          </div>
                        </div>
                        
                        {document.comments && (
                          <div className="neu-card-inset p-3 rounded-xl mb-3">
                            <p className="text-sm text-[#666666]">{document.comments}</p>
                          </div>
                        )}

                        {/* Upload Progress */}
                        {isUploading && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm text-[#666666] mb-2">
                              <span>Uploading...</span>
                              <span>{uploadProgress[document.id]}%</span>
                            </div>
                            <div className="w-full neu-card-inset rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-gradient-to-r from-[#05A7CC] to-[#048ba8]"
                                style={{ width: `${uploadProgress[document.id]}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {document.status === 'missing' && (
                        <button 
                          onClick={() => handleFileUpload(document.id)}
                          disabled={isUploading}
                          className="neu-button px-4 py-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200 disabled:opacity-50"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                      
                      {document.status === 'pending_review' && (
                        <>
                          <button 
                            onClick={() => handleDocumentAction(document.id, 'approve')}
                            className="neu-button px-3 py-2 rounded-xl text-green-600 hover:scale-105 transition-all duration-200"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDocumentAction(document.id, 'reject')}
                            className="neu-button px-3 py-2 rounded-xl text-red-600 hover:scale-105 transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      {document.uploadDate && (
                        <button className="neu-button px-3 py-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200">
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      
                      {!document.required && (
                        <button 
                          onClick={() => handleDocumentAction(document.id, 'delete')}
                          className="neu-button px-3 py-2 rounded-xl text-red-500 hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-[#666666] mx-auto mb-4" />
              <p className="text-[#666666]">No documents found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};