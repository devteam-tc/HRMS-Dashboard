import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Plus, Filter, User, Briefcase, FileText, Clock, Phone, Mail, MapPin } from 'lucide-react';

const employees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2022-03-15',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP001',
    location: 'New York, NY'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Product Manager',
    department: 'Product',
    status: 'Active',
    joinDate: '2021-08-20',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP002',
    location: 'San Francisco, CA'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 345-6789',
    position: 'UX Designer',
    department: 'Design',
    status: 'On Leave',
    joinDate: '2023-01-10',
    avatar: '/placeholder-avatar.jpg',
    employeeId: 'EMP003',
    location: 'Austin, TX'
  }
];

export const EmployeeDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Employee Details</h1>
          <p className="text-gray-600 mt-1">Manage and view employee information</p>
        </div>
        <Button className="bg-[#05A7CC] hover:bg-[#048ba8] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">All Employees</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee)}
                  className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${
                    selectedEmployee.id === employee.id
                      ? 'border-l-[#05A7CC] bg-blue-50'
                      : 'border-l-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{employee.name}</p>
                      <p className="text-xs text-gray-500 truncate">{employee.position}</p>
                      <div className="flex items-center mt-1">
                        <Badge className={`text-xs ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Profile */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEmployee.avatar} />
                  <AvatarFallback className="text-xl">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedEmployee.name}</h2>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <Badge className={`mt-1 ${getStatusColor(selectedEmployee.status)}`}>
                    {selectedEmployee.status}
                  </Badge>
                </div>
              </div>
              <Button variant="outline">
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="job">Job Profile</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Employee ID:</span>
                      <span className="font-medium">{selectedEmployee.employeeId}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedEmployee.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedEmployee.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Join Date:</span>
                      <span className="font-medium">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="job" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Position:</span>
                      <span className="font-medium">{selectedEmployee.position}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedEmployee.department}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Reporting Manager:</span>
                      <span className="font-medium">Sarah Wilson</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Employment Type:</span>
                      <span className="font-medium">Full-time</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Shift:</span>
                      <span className="font-medium">Day Shift (9:00 AM - 6:00 PM)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Work Location:</span>
                      <span className="font-medium">Office</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 mt-6">
                <div className="space-y-3">
                  {['Resume.pdf', 'ID_Proof.pdf', 'Address_Proof.pdf', 'Educational_Certificates.pdf'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                <div className="space-y-4">
                  {[
                    { date: '2024-01-15', event: 'Promotion to Senior Software Engineer', type: 'promotion' },
                    { date: '2023-06-01', event: 'Annual Performance Review - Exceeds Expectations', type: 'review' },
                    { date: '2022-03-15', event: 'Joined as Software Engineer', type: 'joining' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-[#05A7CC] rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.event}</p>
                        <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};