import React, { useState } from 'react';
import { ArrowLeft, Clock, Check, X, AlertCircle, User, Eye, MessageSquare, Filter } from 'lucide-react';

export const ApprovalRequests = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [approvalRequests, setApprovalRequests] = useState([
    {
      id: 1,
      employeeName: 'Alice Johnson',
      employeeId: 'EMP001',
      requestType: 'Document Verification',
      item: 'Background Check Authorization',
      description: 'Employee submitted background check authorization form with missing signature',
      requestedBy: 'HR Team',
      requestDate: '2024-01-13',
      dueDate: '2024-01-17',
      status: 'pending',
      priority: 'high',
      department: 'Engineering',
      comments: 'Form needs to be re-signed by employee',
      attachments: ['background_check_form.pdf']
    },
    {
      id: 2,
      employeeName: 'Bob Smith',
      employeeId: 'EMP002',
      requestType: 'IT Setup Approval',
      item: 'System Access Permissions',
      description: 'Requesting elevated access permissions for development environment',
      requestedBy: 'IT Team',
      requestDate: '2024-01-14',
      dueDate: '2024-01-16',
      status: 'pending',
      priority: 'medium',
      department: 'Product',
      comments: 'Manager approval required for admin access',
      attachments: ['access_request_form.pdf']
    },
    {
      id: 3,
      employeeName: 'Carol Davis',
      employeeId: 'EMP003',
      requestType: 'Training Completion',
      item: 'Security Training Certification',
      description: 'Employee completed security training and submitted certification',
      requestedBy: 'Training Team',
      requestDate: '2024-01-12',
      dueDate: '2024-01-15',
      status: 'approved',
      priority: 'medium',
      department: 'Design',
      comments: 'Training completed successfully with 95% score',
      attachments: ['security_cert.pdf'],
      approvedBy: 'Security Manager',
      approvedDate: '2024-01-14'
    },
    {
      id: 4,
      employeeName: 'David Wilson',
      employeeId: 'EMP004',
      requestType: 'Buddy Assignment',
      item: 'Mentor Assignment Request',
      description: 'Request to assign Sarah Davis as onboarding buddy',
      requestedBy: 'HR Team',
      requestDate: '2024-01-15',
      dueDate: '2024-01-18',
      status: 'pending',
      priority: 'low',
      department: 'Analytics',
      comments: 'Waiting for Sarah Davis confirmation',
      attachments: []
    },
    {
      id: 5,
      employeeName: 'Emma Brown',
      employeeId: 'EMP005',
      requestType: 'Hardware Allocation',
      item: 'MacBook Pro 16" Request',
      description: 'Requesting high-performance laptop for marketing design work',
      requestedBy: 'IT Team',
      requestDate: '2024-01-10',
      dueDate: '2024-01-14',
      status: 'rejected',
      priority: 'medium',
      department: 'Marketing',
      comments: 'Standard laptop sufficient for role requirements',
      attachments: ['hardware_specs.pdf'],
      rejectedBy: 'IT Manager',
      rejectedDate: '2024-01-12',
      rejectionReason: 'Role does not require high-performance hardware'
    },
    {
      id: 6,
      employeeName: 'Frank Miller',
      employeeId: 'EMP006',
      requestType: 'Document Verification',
      item: 'Educational Certificate Verification',
      description: 'Verifying authenticity of submitted degree certificates',
      requestedBy: 'HR Team',
      requestDate: '2024-01-11',
      dueDate: '2024-01-16',
      status: 'approved',
      priority: 'high',
      department: 'Engineering',
      comments: 'All certificates verified through university portal',
      attachments: ['degree_verification.pdf'],
      approvedBy: 'HR Manager',
      approvedDate: '2024-01-13'
    }
  ]);

  const filterOptions = [
    { id: 'all', name: 'All Requests', count: approvalRequests.length },
    { id: 'pending', name: 'Pending', count: approvalRequests.filter(req => req.status === 'pending').length },
    { id: 'approved', name: 'Approved', count: approvalRequests.filter(req => req.status === 'approved').length },
    { id: 'rejected', name: 'Rejected', count: approvalRequests.filter(req => req.status === 'rejected').length }
  ];

  const statusColors = {
    'pending': 'text-orange-600',
    'approved': 'text-green-600',
    'rejected': 'text-red-600'
  };

  const priorityColors = {
    'high': 'text-red-600',
    'medium': 'text-orange-600',
    'low': 'text-green-600'
  };

  const handleApproval = (requestId, action, comments = '') => {
    setApprovalRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const newStatus = action === 'approve' ? 'approved' : 'rejected';
        const updateData = {
          status: newStatus,
          [`${action}dBy`]: 'Current User',
          [`${action}dDate`]: new Date().toISOString().split('T')[0]
        };
        
        if (action === 'reject' && comments) {
          updateData.rejectionReason = comments;
        }
        
        return { ...req, ...updateData };
      }
      return req;
    }));
    setSelectedRequest(null);
  };

  const filteredRequests = activeFilter === 'all' 
    ? approvalRequests 
    : approvalRequests.filter(req => req.status === activeFilter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return Check;
      case 'rejected': return X;
      default: return Clock;
    }
  };

  const isOverdue = (dueDate, status) => {
    if (status !== 'pending') return false;
    return new Date(dueDate) < new Date();
  };

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
            <h1 className="mb-1 text-[#333333]">Approval Requests</h1>
            <p className="text-[#666666]">Review and approve onboarding requests</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {filterOptions.map((filter) => (
          <div key={filter.id} className="neu-card p-6 rounded-2xl text-center">
            <div className={`text-3xl font-bold mb-2 ${
              filter.id === 'pending' ? 'text-orange-600' :
              filter.id === 'approved' ? 'text-green-600' :
              filter.id === 'rejected' ? 'text-red-600' :
              'text-[#333333]'
            }`}>
              {filter.count}
            </div>
            <div className="text-sm text-[#666666]">{filter.name}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="neu-card p-6 rounded-2xl">
          <h3 className="font-semibold text-[#333333] mb-4">Filter Requests</h3>
          <div className="space-y-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                  activeFilter === filter.id 
                    ? 'neu-primary text-white' 
                    : 'neu-small text-[#333333] hover:scale-102'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{filter.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeFilter === filter.id 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'neu-card-inset text-[#666666]'
                  }`}>
                    {filter.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-[#E8EBEF]">
            <h4 className="font-medium text-[#333333] mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-102 transition-all duration-200">
                Approve All Low Priority
              </button>
              <button className="w-full neu-button p-3 rounded-xl text-[#05A7CC] hover:scale-102 transition-all duration-200">
                View Overdue Requests
              </button>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-3 neu-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#333333]">
              {filterOptions.find(f => f.id === activeFilter)?.name} ({filteredRequests.length})
            </h2>
          </div>

          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              const overdue = isOverdue(request.dueDate, request.status);
              
              return (
                <div key={request.id} className={`neu-small p-6 rounded-xl ${overdue ? 'border-l-4 border-red-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        request.status === 'approved' ? 'neu-primary' :
                        request.status === 'rejected' ? 'neu-secondary' :
                        overdue ? 'bg-red-100' : 'bg-orange-100'
                      }`}>
                        {overdue ? (
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <StatusIcon className={`h-6 w-6 ${
                            request.status === 'approved' || request.status === 'rejected' ? 'text-white' :
                            'text-orange-600'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-[#333333]">{request.item}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full neu-card ${priorityColors[request.priority]}`}>
                            {request.priority}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full neu-card ${statusColors[request.status]}`}>
                            {request.status}
                          </span>
                          {overdue && (
                            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                              OVERDUE
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-[#666666] mb-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{request.employeeName}</span>
                          </div>
                          <span>•</span>
                          <span>{request.department}</span>
                          <span>•</span>
                          <span>{request.requestType}</span>
                        </div>
                        
                        <p className="text-sm text-[#666666] mb-3">{request.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-[#666666] mb-3">
                          <div>
                            <span>Requested: {request.requestDate}</span>
                            <span className="mx-2">•</span>
                            <span>Due: {request.dueDate}</span>
                          </div>
                          <div>
                            Requested by: {request.requestedBy}
                          </div>
                        </div>
                        
                        {request.comments && (
                          <div className="neu-card-inset p-3 rounded-xl mb-3">
                            <p className="text-sm text-[#666666]">{request.comments}</p>
                          </div>
                        )}
                        
                        {request.attachments.length > 0 && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-[#666666]">Attachments:</span>
                            {request.attachments.map((attachment, index) => (
                              <span key={index} className="text-xs px-2 py-1 neu-card rounded text-[#05A7CC] cursor-pointer">
                                {attachment}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {request.status === 'approved' && (
                          <div className="text-sm text-green-600">
                            Approved by {request.approvedBy} on {request.approvedDate}
                          </div>
                        )}
                        
                        {request.status === 'rejected' && (
                          <div className="text-sm text-red-600">
                            Rejected by {request.rejectedBy} on {request.rejectedDate}
                            {request.rejectionReason && (
                              <div className="mt-1 text-[#666666]">Reason: {request.rejectionReason}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => setSelectedRequest(request)}
                        className="neu-button px-3 py-2 rounded-xl text-[#05A7CC] hover:scale-105 transition-all duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {request.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproval(request.id, 'approve')}
                            className="neu-button px-3 py-2 rounded-xl text-green-600 hover:scale-105 transition-all duration-200"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setSelectedRequest({...request, action: 'reject'})}
                            className="neu-button px-3 py-2 rounded-xl text-red-600 hover:scale-105 transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      <button className="neu-button px-3 py-2 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-[#666666] mx-auto mb-4" />
              <p className="text-[#666666]">No approval requests found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neu-card p-8 rounded-3xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#333333]">Request Details</h2>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="neu-button p-2 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#666666]">Employee</label>
                  <p className="text-[#333333]">{selectedRequest.employeeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#666666]">Request Type</label>
                  <p className="text-[#333333]">{selectedRequest.requestType}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#666666]">Description</label>
                <p className="text-[#333333]">{selectedRequest.description}</p>
              </div>
              
              {selectedRequest.action === 'reject' && (
                <div>
                  <label className="text-sm font-medium text-[#666666] mb-2 block">Rejection Reason</label>
                  <textarea
                    className="w-full neu-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#05A7CC] h-24 resize-none"
                    placeholder="Please provide a reason for rejection..."
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3 pt-4">
                {selectedRequest.action === 'reject' ? (
                  <>
                    <button 
                      onClick={() => handleApproval(selectedRequest.id, 'reject', 'Rejection reason provided')}
                      className="neu-secondary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200"
                    >
                      <X className="h-5 w-5" />
                      Confirm Rejection
                    </button>
                    <button 
                      onClick={() => setSelectedRequest(prev => ({...prev, action: undefined}))}
                      className="neu-button px-6 py-3 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {selectedRequest.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApproval(selectedRequest.id, 'approve')}
                          className="neu-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200"
                        >
                          <Check className="h-5 w-5" />
                          Approve
                        </button>
                        <button 
                          onClick={() => setSelectedRequest(prev => ({...prev, action: 'reject'}))}
                          className="neu-secondary px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200"
                        >
                          <X className="h-5 w-5" />
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => setSelectedRequest(null)}
                      className="neu-button px-6 py-3 rounded-xl text-[#666666] hover:scale-105 transition-all duration-200"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};