import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Upload, 
  User, 
  Calendar,
  Mail,
  Phone
} from 'lucide-react';

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  dueDate: string;
  category: 'documents' | 'training' | 'setup' | 'orientation';
}

interface NewHire {
  id: string;
  name: string;
  position: string;
  department: string;
  startDate: string;
  email: string;
  phone: string;
  avatar: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

const newHires: NewHire[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    position: 'Frontend Developer',
    department: 'Engineering',
    startDate: '2024-01-15',
    email: 'alice.johnson@company.com',
    phone: '+1 (555) 123-4567',
    avatar: '/placeholder-avatar.jpg',
    progress: 75,
    status: 'in-progress'
  },
  {
    id: '2',
    name: 'Bob Smith',
    position: 'Product Designer',
    department: 'Design',
    startDate: '2024-01-20',
    email: 'bob.smith@company.com',
    phone: '+1 (555) 234-5678',
    avatar: '/placeholder-avatar.jpg',
    progress: 30,
    status: 'in-progress'
  },
  {
    id: '3',
    name: 'Carol Davis',
    position: 'Marketing Manager',
    department: 'Marketing',
    startDate: '2024-01-25',
    email: 'carol.davis@company.com',
    phone: '+1 (555) 345-6789',
    avatar: '/placeholder-avatar.jpg',
    progress: 0,
    status: 'not-started'
  }
];

const onboardingTasks: OnboardingTask[] = [
  {
    id: '1',
    title: 'Complete Personal Information',
    description: 'Fill out personal details and emergency contacts',
    status: 'completed',
    dueDate: '2024-01-12',
    category: 'documents'
  },
  {
    id: '2',
    title: 'Upload Required Documents',
    description: 'Submit ID proof, address proof, and educational certificates',
    status: 'completed',
    dueDate: '2024-01-12',
    category: 'documents'
  },
  {
    id: '3',
    title: 'IT Setup and Account Creation',
    description: 'Laptop allocation, email setup, and system access',
    status: 'completed',
    dueDate: '2024-01-15',
    category: 'setup'
  },
  {
    id: '4',
    title: 'Complete Compliance Training',
    description: 'Mandatory training modules on company policies',
    status: 'in-progress',
    dueDate: '2024-01-20',
    category: 'training'
  },
  {
    id: '5',
    title: 'Department Orientation',
    description: 'Meet team members and understand role responsibilities',
    status: 'pending',
    dueDate: '2024-01-22',
    category: 'orientation'
  },
  {
    id: '6',
    title: 'Security Clearance',
    description: 'Complete security verification and badge collection',
    status: 'pending',
    dueDate: '2024-01-25',
    category: 'setup'
  }
];

export const Onboarding: React.FC = () => {
  const [selectedHire, setSelectedHire] = useState(newHires[0]);
  const [tasks, setTasks] = useState(onboardingTasks);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'documents':
        return <FileText className="w-4 h-4" />;
      case 'setup':
        return <User className="w-4 h-4" />;
      case 'training':
        return <Calendar className="w-4 h-4" />;
      case 'orientation':
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Onboarding</h1>
          <p className="text-gray-600 mt-1">Manage new hire onboarding process</p>
        </div>
        <Button className="bg-[#05A7CC] hover:bg-[#048ba8] text-white">
          Add New Hire
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Hires List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">New Hires</CardTitle>
            <p className="text-sm text-gray-600">Recent joiners and upcoming hires</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {newHires.map((hire) => (
                <button
                  key={hire.id}
                  onClick={() => setSelectedHire(hire)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-l-4 ${
                    selectedHire.id === hire.id
                      ? 'border-l-[#05A7CC] bg-blue-50'
                      : 'border-l-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={hire.avatar} />
                      <AvatarFallback>{hire.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{hire.name}</p>
                      <p className="text-xs text-gray-500 truncate">{hire.position}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge className={`text-xs ${getStatusColor(hire.status)}`}>
                          {hire.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">{hire.progress}%</span>
                      </div>
                      <Progress value={hire.progress} className="h-1 mt-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Checklist */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedHire.avatar} />
                  <AvatarFallback>
                    {selectedHire.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedHire.name}</h2>
                  <p className="text-gray-600">{selectedHire.position} • {selectedHire.department}</p>
                  <p className="text-sm text-gray-500">Start Date: {new Date(selectedHire.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#05A7CC]">{selectedHire.progress}%</div>
                <p className="text-sm text-gray-500">Complete</p>
              </div>
            </div>
            <Progress value={selectedHire.progress} className="h-2 mt-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Onboarding Checklist</h3>
                <Button variant="outline" size="sm">
                  Send Reminder
                </Button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(task.category)}
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        {getStatusIcon(task.status)}
                        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        {task.category === 'documents' && task.status !== 'completed' && (
                          <Button variant="outline" size="sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-[#05A7CC]" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-gray-500">{selectedHire.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-[#05A7CC]" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-xs text-gray-500">{selectedHire.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-[#05A7CC]" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-xs text-gray-500">{new Date(selectedHire.startDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};